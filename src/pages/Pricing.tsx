import { useState, useEffect } from "react";
import { Check, Sparkles, Lock, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const [couponCode, setCouponCode] = useState("");
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [validatingCoupon, setValidatingCoupon] = useState(false);
  const [validCoupon, setValidCoupon] = useState<any>(null);
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Detectar cupom na URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlCoupon = params.get('coupon') || params.get('c');
    if (urlCoupon) {
      setCouponCode(urlCoupon);
      setShowCouponInput(true);
      validateCoupon(urlCoupon);
    }
  }, []);

  const validateCoupon = async (code: string) => {
    if (!code.trim()) return;
    
    setValidatingCoupon(true);
    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', code.toUpperCase())
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        toast({
          title: "Cupom inválido",
          description: "Código não encontrado ou inativo",
          variant: "destructive"
        });
        setValidCoupon(null);
        return;
      }

      // Verificar usos
      if (data.current_uses >= data.max_uses) {
        toast({
          title: "Cupom esgotado",
          description: "Este cupom já atingiu o limite de usos",
          variant: "destructive"
        });
        setValidCoupon(null);
        return;
      }

      // Verificar expiração
      if (data.expires_at && new Date(data.expires_at) < new Date()) {
        toast({
          title: "Cupom expirado",
          description: "Este cupom não é mais válido",
          variant: "destructive"
        });
        setValidCoupon(null);
        return;
      }

      setValidCoupon(data);
      toast({
        title: "✅ Cupom VIP Aplicado!",
        description: "Mês 1 GRÁTIS + Benefícios exclusivos",
      });
    } catch (error: any) {
      console.error("Erro ao validar cupom:", error);
      toast({
        title: "Erro",
        description: "Não foi possível validar o cupom",
        variant: "destructive"
      });
    } finally {
      setValidatingCoupon(false);
    }
  };

  const handleRedeemCoupon = async () => {
    if (!email.trim()) {
      toast({
        title: "Email necessário",
        description: "Por favor, insira seu email",
        variant: "destructive"
      });
      return;
    }

    if (!validCoupon) {
      toast({
        title: "Cupom inválido",
        description: "Valide o cupom antes de resgatar",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('redeem-coupon', {
        body: { email: email.toLowerCase(), coupon_code: validCoupon.code }
      });

      if (error) throw error;

      toast({
        title: "🎉 Cupom resgatado com sucesso!",
        description: "Acesso PRO ativado. Redirecionando...",
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error: any) {
      console.error("Erro ao resgatar cupom:", error);
      toast({
        title: "Erro ao resgatar",
        description: error.message || "Tente novamente",
        variant: "destructive"
      });
    }
  };

  const handleCheckout = async (priceId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { price_id: priceId, email }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error: any) {
      console.error("Erro no checkout:", error);
      toast({
        title: "Erro",
        description: "Não foi possível iniciar o checkout",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
              Oferta de Lançamento
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Desbloqueie Seu Potencial
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Acesse análises profundas, conteúdo exclusivo e ferramentas premium
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Free Plan */}
          <Card className="p-8 relative">
            <h3 className="text-2xl font-bold mb-2">Gratuito</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">R$ 0</span>
              <span className="text-muted-foreground">/sempre</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 mt-0.5" />
                <span>Teste básico de personalidade</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 mt-0.5" />
                <span>Resultado em PDF simples</span>
              </li>
              <li className="flex items-start gap-2 opacity-50">
                <Lock className="w-5 h-5 mt-0.5" />
                <span>Histórico limitado</span>
              </li>
            </ul>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/')}
            >
              Começar Grátis
            </Button>
          </Card>

          {/* Promo Plan */}
          <Card className="p-8 relative border-2 border-purple-500 shadow-2xl scale-105 overflow-hidden">
            {/* Overlay sutil para indicar disponibilidade em breve */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/20 via-pink-50/10 to-blue-50/20 dark:from-purple-900/5 dark:via-pink-900/5 dark:to-blue-900/5"></div>
            
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-full">
              MAIS POPULAR
            </div>

            {/* Badge "Lançamento em breve" */}
            <div className="absolute top-6 right-6 px-3 py-1.5 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/50 dark:to-yellow-900/50 border border-orange-200 dark:border-orange-700 rounded-full shadow-sm">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-orange-700 dark:text-orange-300">Lançamento em breve</span>
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">PRO - Lançamento</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">R$ 9,90</span>
                <span className="text-muted-foreground">/mês</span>
                <div className="text-sm text-muted-foreground mt-1">
                  Preço promocional por tempo limitado
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-500 mt-0.5" />
                  <span className="font-semibold">Tudo do plano gratuito</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-500 mt-0.5" />
                  <span>Relatório PDF Premium (15-20 páginas)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-500 mt-0.5" />
                  <span>Dashboard de evolução</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-500 mt-0.5" />
                  <span>Histórico ilimitado</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-500 mt-0.5" />
                  <span>Conteúdo exclusivo mensal</span>
                </li>
              </ul>

              {/* Mensagem de disponibilidade em breve */}
              <div className="mb-4 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <span className="font-semibold text-orange-700 dark:text-orange-300">Lançamento em breve</span>
                </div>
                <p className="text-sm text-center text-orange-600 dark:text-orange-400">
                  Seja notificado quando esta oferta especial estiver disponível
                </p>
              </div>

              <Input
                type="email"
                placeholder="Seu melhor email para ser notificado"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-3"
              />
              <Button 
                variant="outline"
                className="w-full border-orange-200 dark:border-orange-700 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                disabled
              >
                <Lock className="w-4 h-4 mr-2" />
                Notificar quando disponível
              </Button>
            </div>
          </Card>

          {/* Normal Plan */}
          <Card className="p-8 relative overflow-hidden">
            {/* Overlay com gradiente sutil */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-blue-50/50 dark:from-purple-900/10 dark:via-pink-900/10 dark:to-blue-900/10"></div>
            
            {/* Badge "Em breve" redesenhado */}
            <div className="absolute top-6 right-6 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 border border-purple-200 dark:border-purple-700 rounded-full shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-purple-700 dark:text-purple-300">Em breve</span>
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2 text-gray-700 dark:text-gray-300">PRO - Normal</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-600 dark:text-gray-400">R$ 29,90</span>
                <span className="text-muted-foreground">/mês</span>
                <div className="text-sm text-muted-foreground mt-1">
                  Preço regular após promoção
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-400">Todos os benefícios PRO</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-400">Suporte prioritário</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-400">Acesso antecipado a novos recursos</span>
                </li>
              </ul>

              {/* Mensagem "Estará disponível em breve" redesenhada */}
              <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="font-semibold text-purple-700 dark:text-purple-300">Estará disponível em breve</span>
                </div>
                <p className="text-sm text-center text-purple-600 dark:text-purple-400">
                  Aguarde o lançamento desta modalidade premium
                </p>
              </div>

              <Button 
                variant="outline" 
                className="w-full border-purple-200 dark:border-purple-700 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20" 
                disabled
              >
                <Lock className="w-4 h-4 mr-2" />
                Disponível em breve
              </Button>
            </div>
          </Card>
        </div>

        {/* Coupon Section */}
        <div className="max-w-md mx-auto">
          {!showCouponInput ? (
            <button
              onClick={() => setShowCouponInput(true)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto"
            >
              Tem um código especial? Clique aqui
              <ChevronDown className="w-4 h-4" />
            </button>
          ) : (
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
              <div className="text-center mb-4">
                <Sparkles className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-bold text-lg">Cupom VIP</h3>
                <p className="text-sm text-muted-foreground">
                  Insira seu código exclusivo
                </p>
              </div>
              
              {!validCoupon ? (
                <>
                  <Input
                    placeholder="CODIGO-VIP"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="mb-3"
                  />
                  <Button
                    onClick={() => validateCoupon(couponCode)}
                    disabled={validatingCoupon || !couponCode.trim()}
                    className="w-full"
                    variant="outline"
                  >
                    {validatingCoupon ? "Validando..." : "Validar Cupom"}
                  </Button>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-green-700 dark:text-green-300 font-semibold text-center">
                      ✅ Cupom Válido!
                    </p>
                    <p className="text-sm text-center mt-1 text-green-600 dark:text-green-400">
                      Mês 1: GRÁTIS<br />
                      Mês 2: R$ 9,90<br />
                      Mês 3+: R$ 29,90
                    </p>
                  </div>
                  <Input
                    type="email"
                    placeholder="Seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-2"
                  />
                  <Button
                    onClick={handleRedeemCoupon}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                    disabled={!email.trim()}
                  >
                    🎉 Resgatar Acesso VIP
                  </Button>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
