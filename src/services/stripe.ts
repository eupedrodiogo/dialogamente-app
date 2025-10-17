import { supabase } from "@/integrations/supabase/client";

export type PlanType = "free" | "premium" | "vip";

export const PLANS = {
  free: { id: "free", name: "Gratuito", price: 0, priceId: null, features: ["1 teste gratuito"] },
  premium: { id: "premium", name: "Premium", price: 29.90, priceId: "price_premium", features: ["Testes ilimitados", "PDF profissional"] },
  vip: { id: "vip", name: "VIP", price: 49.90, priceId: "price_vip", features: ["Tudo do Premium", "Suporte 24/7"] },
};

export const redirectToCheckout = async (planType: PlanType, userId: string) => {
  const plan = PLANS[planType];
  if (!plan.priceId) throw new Error("Plano gratuito");
  const { data } = await supabase.functions.invoke("create-checkout-session", {
    body: { priceId: plan.priceId, userId, planType, successUrl: window.location.origin + "/payment-success", cancelUrl: window.location.origin + "/pricing" },
  });
  if (data?.url) window.location.href = data.url;
};

export const formatPrice = (price: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price);
