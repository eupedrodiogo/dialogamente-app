import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SupportContactCard } from "@/components/SupportContactCard";
import { SupportFAQ } from "@/components/SupportFAQ";
import { SUPPORT_CONFIG, SUPPORT_SUBJECTS } from "@/lib/constants";
import {
  MessageCircle,
  Mail,
  MessagesSquare,
  Send,
  Clock,
  Headphones,
} from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Support = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-support-email", {
        body: formData,
      });

      if (error) throw error;

      toast.success("Mensagem enviada!", {
        description: `Responderemos em até ${SUPPORT_CONFIG.responseTime}`,
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      toast.error("Erro ao enviar mensagem", {
        description: error.message || "Tente novamente ou use outro canal",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-purple-50/30 to-cyan-50/20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            ← Voltar para Home
          </Button>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium">
            <Headphones className="w-4 h-4" />
            <span>Suporte DialogaMente</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold">
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              Como Podemos Ajudar?
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Nossa equipe está pronta para te atender. Escolha o canal que preferir!
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Atendimento: {SUPPORT_CONFIG.hours.full}</span>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-24 max-w-5xl mx-auto">
          {/* WhatsApp Card */}
          <SupportContactCard
            icon={MessageCircle}
            title="WhatsApp Business"
            description={`Atendimento rápido e personalizado. ${SUPPORT_CONFIG.hours.short}`}
            badge="Mais Rápido"
            badgeVariant="default"
          >
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground/80">
                📱 {SUPPORT_CONFIG.whatsapp.displayNumber}
              </p>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <a
                  href={SUPPORT_CONFIG.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Abrir WhatsApp
                </a>
              </Button>
            </div>
          </SupportContactCard>

          {/* Email Card */}
          <SupportContactCard
            icon={Mail}
            title="E-mail Suporte"
            description={`Envie sua dúvida detalhada. Resposta em até ${SUPPORT_CONFIG.responseTime}.`}
            badge={`Resposta em ${SUPPORT_CONFIG.responseTime}`}
            badgeVariant="secondary"
          >
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground/80">
                📧 {SUPPORT_CONFIG.email}
              </p>
              <Button
                onClick={() => {
                  document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
                }}
                variant="outline"
                className="w-full border-2"
              >
                <Mail className="mr-2 w-5 h-5" />
                Preencher Formulário
              </Button>
            </div>
          </SupportContactCard>

          {/* Chat Online Card - PREPARADO MAS INATIVO */}
          <SupportContactCard
            icon={MessagesSquare}
            title="Chat Online"
            description="Chat ao vivo com nossa equipe. Em breve disponível!"
            badge="Em breve"
            badgeVariant="outline"
            isDisabled={true}
            className="md:col-span-2"
          >
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground italic">
                💬 Estamos preparando esta funcionalidade. Use WhatsApp ou Email enquanto isso!
              </p>
            </div>
          </SupportContactCard>
        </div>

        {/* Contact Form */}
        <div id="contact-form" className="max-w-3xl mx-auto mb-24">
          <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 p-8 md:p-12 rounded-3xl border border-purple-200/50 dark:border-purple-800/50 shadow-[0_30px_90px_-20px_rgba(168,85,247,0.4)]">
            <h2 className="text-3xl font-display font-bold mb-6 text-center">
              Formulário de Contato
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    minLength={2}
                    maxLength={100}
                    placeholder="Seu nome"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    maxLength={255}
                    placeholder="seu@email.com"
                    className="h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Assunto *</Label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) => setFormData({ ...formData, subject: value })}
                  required
                >
                  <SelectTrigger id="subject" className="h-12">
                    <SelectValue placeholder="Selecione o assunto" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPORT_SUBJECTS.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensagem *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  minLength={10}
                  maxLength={1000}
                  placeholder="Descreva sua dúvida ou sugestão..."
                  className="min-h-[150px] resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {formData.message.length}/1000 caracteres
                </p>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="mr-2 w-5 h-5" />
                    Enviar Mensagem
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Responderemos em até {SUPPORT_CONFIG.responseTime} • {SUPPORT_CONFIG.hours.full}
              </p>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-muted-foreground">
              Respostas rápidas para as dúvidas mais comuns
            </p>
          </div>

          <SupportFAQ />
        </div>
      </div>
    </div>
  );
};

export default Support;
