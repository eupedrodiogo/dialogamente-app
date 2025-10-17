import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, coupon_code } = await req.json();
    
    console.log('Resgatando cupom:', { email, coupon_code });

    // Cliente Supabase com service role para acessar cupons secretos
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // 1. Validar cupom
    const { data: coupon, error: couponError } = await supabaseAdmin
      .from('coupons')
      .select('*')
      .eq('code', coupon_code.toUpperCase())
      .eq('is_active', true)
      .maybeSingle();

    if (couponError) {
      console.error('Erro ao buscar cupom:', couponError);
      throw new Error('Erro ao validar cupom');
    }

    if (!coupon) {
      throw new Error('Cupom inválido ou inativo');
    }

    // Verificar limite de usos
    if (coupon.current_uses >= coupon.max_uses) {
      throw new Error('Cupom esgotado');
    }

    // Verificar expiração
    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      throw new Error('Cupom expirado');
    }

    // 2. Verificar se email já tem assinatura ativa
    const { data: existingSub } = await supabaseAdmin
      .from('user_subscriptions')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('status', 'active')
      .maybeSingle();

    if (existingSub) {
      throw new Error('Este email já possui uma assinatura ativa');
    }

    // 3. Criar assinatura
    const nextBillingDate = new Date();
    nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

    const { data: subscription, error: subError } = await supabaseAdmin
      .from('user_subscriptions')
      .insert({
        email: email.toLowerCase(),
        plan_type: 'pro',
        status: 'active',
        current_price: 0.00,
        next_billing_date: nextBillingDate.toISOString(),
        coupon_used: coupon.code
      })
      .select()
      .single();

    if (subError) {
      console.error('Erro ao criar assinatura:', subError);
      throw new Error('Erro ao criar assinatura');
    }

    // 4. Criar registro de resgate
    const nextChargeDate = new Date();
    nextChargeDate.setMonth(nextChargeDate.getMonth() + 1);

    const { error: redemptionError } = await supabaseAdmin
      .from('coupon_redemptions')
      .insert({
        coupon_id: coupon.id,
        email: email.toLowerCase(),
        subscription_id: subscription.id,
        month_1_free: true,
        month_2_promo: false,
        month_3_normal: false,
        current_month: 1,
        next_charge_date: nextChargeDate.toISOString(),
        next_charge_amount: 9.90
      });

    if (redemptionError) {
      console.error('Erro ao criar resgate:', redemptionError);
      throw new Error('Erro ao registrar resgate');
    }

    // 5. Incrementar contador de usos do cupom
    const { error: updateError } = await supabaseAdmin
      .from('coupons')
      .update({ current_uses: coupon.current_uses + 1 })
      .eq('id', coupon.id);

    if (updateError) {
      console.error('Erro ao atualizar cupom:', updateError);
    }

    console.log('Cupom resgatado com sucesso:', subscription.id);

    return new Response(
      JSON.stringify({
        success: true,
        subscription_id: subscription.id,
        expires_at: nextBillingDate.toISOString(),
        message: 'Cupom resgatado com sucesso! Mês 1 GRÁTIS.'
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error('Erro no resgate de cupom:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Erro ao resgatar cupom' }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
