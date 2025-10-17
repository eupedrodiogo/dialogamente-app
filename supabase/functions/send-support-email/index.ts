import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SupportEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Rate limiting map (IP -> timestamps array)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutos
const MAX_REQUESTS = 3;

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

serve(async (req: Request): Promise<Response> => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP
    const clientIP = req.headers.get("x-forwarded-for") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Rate limiting check
    const now = Date.now();
    const ipRequests = rateLimitMap.get(clientIP) || [];
    const recentRequests = ipRequests.filter((time) => now - time < RATE_LIMIT_WINDOW);

    if (recentRequests.length >= MAX_REQUESTS) {
      console.log(`[RATE_LIMIT] IP ${clientIP} exceeded limit`);
      return new Response(
        JSON.stringify({
          error: "Limite de requisições excedido. Tente novamente em alguns minutos.",
        }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Parse request
    const { name, email, subject, message }: SupportEmailRequest = await req.json();

    // Validation
    if (!name || name.trim().length < 2 || name.trim().length > 100) {
      throw new Error("Nome deve ter entre 2 e 100 caracteres");
    }
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error("Email inválido");
    }
    if (!subject || !["Dúvida Técnica", "Pagamento", "Resultado do Teste", "Sugestão", "Outro"].includes(subject)) {
      throw new Error("Assunto inválido");
    }
    if (!message || message.trim().length < 10 || message.trim().length > 1000) {
      throw new Error("Mensagem deve ter entre 10 e 1000 caracteres");
    }

    // Sanitize
    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedMessage = message.trim();

    // Save to database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: ticket, error: dbError } = await supabase
      .from("support_tickets")
      .insert({
        name: sanitizedName,
        email: sanitizedEmail,
        subject,
        message: sanitizedMessage,
        ip_address: clientIP,
        user_agent: userAgent,
      })
      .select()
      .single();

    if (dbError) {
      console.error("[DB_ERROR]", dbError);
      throw new Error("Erro ao salvar ticket");
    }

    console.log(`[TICKET_CREATED] ID: ${ticket.id} | Email: ${sanitizedEmail}`);

    // Send email to support team
    const teamEmailResponse = await resend.emails.send({
      from: "ComunicaPro Suporte <onboarding@resend.dev>",
      to: ["pedrodiogo.suporte@gmail.com"],
      subject: `🎯 Novo Ticket de Suporte - ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); color: white; padding: 30px; border-radius: 12px; margin-bottom: 30px; }
            .content { background: #f9fafb; padding: 25px; border-radius: 12px; margin-bottom: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #9333ea; margin-bottom: 5px; }
            .value { background: white; padding: 12px; border-radius: 8px; border-left: 4px solid #9333ea; }
            .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">🎯 Novo Ticket de Suporte</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">ComunicaPro</p>
            </div>
            
            <div class="content">
              <div class="field">
                <div class="label">👤 Nome</div>
                <div class="value">${sanitizedName}</div>
              </div>
              
              <div class="field">
                <div class="label">📧 Email</div>
                <div class="value"><a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></div>
              </div>
              
              <div class="field">
                <div class="label">🏷️ Assunto</div>
                <div class="value">${subject}</div>
              </div>
              
              <div class="field">
                <div class="label">📝 Mensagem</div>
                <div class="value">${sanitizedMessage.replace(/\n/g, '<br>')}</div>
              </div>
              
              <div class="field">
                <div class="label">🆔 Ticket ID</div>
                <div class="value">${ticket.id}</div>
              </div>
              
              <div class="field">
                <div class="label">🕐 Recebido em</div>
                <div class="value">${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</div>
              </div>
            </div>
            
            <div class="footer">
              <p><strong>⏰ Responda em até 24 horas úteis</strong></p>
              <p style="font-size: 12px; margin-top: 20px;">Horário de atendimento: Segunda a Sexta, 9h às 18h</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (teamEmailResponse.error) {
      console.error("[EMAIL_ERROR_TEAM]", teamEmailResponse.error);
    } else if (teamEmailResponse.data) {
      console.log(`[EMAIL_SENT_TEAM] ID: ${teamEmailResponse.data.id}`);
    }

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: "ComunicaPro Suporte <onboarding@resend.dev>",
      to: [sanitizedEmail],
      subject: "✅ Recebemos seu contato - ComunicaPro",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); color: white; padding: 30px; border-radius: 12px; margin-bottom: 30px; text-align: center; }
            .content { background: #f9fafb; padding: 25px; border-radius: 12px; margin-bottom: 20px; }
            .summary { background: white; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #9333ea; }
            .footer { background: linear-gradient(135deg, #f3e8ff 0%, #fce7f3 100%); padding: 20px; border-radius: 12px; text-align: center; }
            .button { display: inline-block; background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">✅ Recebemos seu Contato!</h1>
            </div>
            
            <div class="content">
              <p>Olá <strong>${sanitizedName}</strong>!</p>
              
              <p>Recebemos sua mensagem e nossa equipe já está trabalhando nisso.</p>
              
              <div class="summary">
                <p style="margin: 0 0 10px 0;"><strong>📋 Resumo do seu contato:</strong></p>
                <p style="margin: 5px 0;"><strong>Assunto:</strong> ${subject}</p>
                <p style="margin: 5px 0;"><strong>Mensagem:</strong> ${sanitizedMessage.substring(0, 100)}${sanitizedMessage.length > 100 ? '...' : ''}</p>
              </div>
              
              <p><strong>⏰ Responderemos em até 24 horas úteis.</strong></p>
              
              <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
                <strong>Horário de atendimento:</strong><br>
                Segunda a Sexta, 9h às 18h
              </p>
            </div>
            
            <div class="footer">
              <p style="margin: 0 0 15px 0; font-weight: bold;">Precisa de ajuda urgente?</p>
              <p style="margin: 5px 0;"><strong>📱 WhatsApp:</strong> (21) 97252-5151</p>
              <p style="margin: 5px 0;"><strong>📧 Email:</strong> pedrodiogo.suporte@gmail.com</p>
              
              <a href="https://wa.me/5521972525151?text=Olá!%20Preciso%20de%20ajuda%20com%20o%20ComunicaPro..." class="button">
                Falar no WhatsApp
              </a>
            </div>
            
            <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 30px;">
              Atenciosamente,<br>
              <strong>Equipe ComunicaPro</strong>
            </p>
          </div>
        </body>
        </html>
      `,
    });

    if (userEmailResponse.error) {
      console.error("[EMAIL_ERROR_USER]", userEmailResponse.error);
    } else {
      console.log(`[EMAIL_SENT_USER] To: ${sanitizedEmail}`);
    }

    // Update rate limit
    recentRequests.push(now);
    rateLimitMap.set(clientIP, recentRequests);

    return new Response(
      JSON.stringify({
        success: true,
        ticketId: ticket.id,
        message: "Ticket criado e emails enviados com sucesso",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("[HANDLER_ERROR]", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Erro interno do servidor",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
