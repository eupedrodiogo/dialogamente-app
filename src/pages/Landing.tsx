import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Target, TrendingUp, Users, Sparkles, ArrowRight, CheckCircle2, Star, Eye, Ear, Hand, Quote, AlertCircle, Lightbulb, Heart, Briefcase, Save } from "lucide-react";
import logo from "@/assets/comunicapro-logo.png";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Footer } from "@/components/Footer";

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  result_type: string;
  created_at: string;
}

const Landing = () => {
  const navigate = useNavigate();
  const [topReviews, setTopReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchTopReviews();
  }, []);

  const fetchTopReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .gte("rating", 4)
      .not("comment", "is", null)
      .order("rating", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(6);

    if (data) {
      setTopReviews(data);
    }
  };

  const typeConfig = {
    visual: { name: "Visual", icon: Eye, color: "text-purple-600" },
    auditivo: { name: "Auditivo", icon: Ear, color: "text-cyan-600" },
    cinestesico: { name: "Cinestésico", icon: Hand, color: "text-orange-600" },
  };

  const features = [
    {
      icon: MessageSquare,
      title: "Autoconhecimento",
      description: "Entenda profundamente como você se expressa e interage com o mundo",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Relações Melhores",
      description: "Aprimore sua comunicação e conexões com diferentes perfis",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: Target,
      title: "Resultados Precisos",
      description: "Análise baseada em metodologias comprovadas e cientificamente validadas",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: TrendingUp,
      title: "Desenvolvimento",
      description: "Receba insights práticos para crescimento contínuo e evolução pessoal",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  const benefits = [
    "Perfil de comunicação detalhado",
    "Análise de pontos fortes e áreas de melhoria",
    "Estratégias práticas de desenvolvimento",
    "Guia de interação com outros estilos",
    "Progresso salvo automaticamente - pause e retome quando quiser",
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-purple-50/30 to-cyan-50/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <section className="text-center mb-24 md:mb-32">
          <div className="flex justify-center mb-8 md:mb-12 animate-scale-in">
            <div className="relative group">
              {/* Premium Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-all duration-700 scale-150 animate-glow"></div>
              
              {/* Logo Container */}
              <div className="relative backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 p-10 md:p-12 rounded-[2rem] border border-purple-200/50 dark:border-purple-800/50 shadow-[0_30px_90px_-20px_rgba(168,85,247,0.4)] hover:shadow-[0_40px_120px_-25px_rgba(168,85,247,0.5)] transition-all duration-700 hover:scale-105">
                <img 
                  src={logo} 
                  alt="DialogaMente Logo" 
                  className="w-32 h-32 md:w-40 md:h-40 relative z-10"
                />
              </div>
              
              {/* Orbiting Sparkles */}
              <div className="absolute -top-3 -right-3 animate-float">
                <Sparkles className="w-6 h-6 text-purple-500" />
              </div>
              <div className="absolute -bottom-3 -left-3 animate-float" style={{ animationDelay: "1.5s" }}>
                <Sparkles className="w-5 h-5 text-cyan-500" />
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 animate-fade-up">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent bg-300% animate-gradient-shift">
                DialogaMente
              </span>
            </h1>
            
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground/90 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Comunique-se Conscientemente!
            </h2>
            
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-up font-light" style={{ animationDelay: "0.2s" }}>
              Descubra seu perfil comunicativo e desenvolva uma comunicação mais consciente, autêntica e eficaz
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Button 
                size="lg" 
                onClick={() => navigate("/instrucoes")}
                className="text-lg px-10 py-7 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-[0_20px_60px_-15px_rgba(168,85,247,0.5)] hover:shadow-[0_25px_80px_-15px_rgba(168,85,247,0.6)] transition-all duration-500 hover:scale-105 group"
              >
                Começar Teste Grátis
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate("/pricing")}
                className="text-lg px-10 py-7 rounded-2xl border-2 border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/30 hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300"
              >
                <Sparkles className="mr-2 w-5 h-5" />
                Planos Premium
              </Button>
            </div>
          </div>
        </section>

        {/* Problem/Solution Section - Social Connection */}
        <section id="challenges" className="mb-24 md:mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 animate-fade-up">
              Você Enfrenta Esses Desafios?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Transforme obstáculos em oportunidades de crescimento
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Problem 1 */}
            <Card className="relative overflow-hidden group hover:shadow-[0_30px_90px_-20px_rgba(239,68,68,0.3)] transition-all duration-500 border-red-200/50 dark:border-red-800/50 backdrop-blur-sm bg-white/60 dark:bg-gray-900/60 animate-fade-up">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10 p-8 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 p-0.5 group-hover:scale-110 transition-transform duration-500">
                  <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center">
                    <AlertCircle className="w-7 h-7 text-red-600" />
                  </div>
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground/90">
                  Dificuldade em Se Expressar
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sente que as pessoas não entendem o que você está tentando comunicar? Suas ideias se perdem no meio do caminho?
                </p>
              </div>
            </Card>

            {/* Solution 1 */}
            <Card className="relative overflow-hidden group hover:shadow-[0_30px_90px_-20px_rgba(34,197,94,0.3)] transition-all duration-500 border-green-200/50 dark:border-green-800/50 backdrop-blur-sm bg-white/60 dark:bg-gray-900/60 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10 p-8 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 p-0.5 group-hover:scale-110 transition-transform duration-500">
                  <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center">
                    <Lightbulb className="w-7 h-7 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground/90">
                  Clareza e Autoconhecimento
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Descubra seu estilo natural de comunicação e aprenda a transmitir suas mensagens de forma clara, autêntica e impactante.
                </p>
              </div>
            </Card>

            {/* Problem 2 */}
            <Card className="relative overflow-hidden group hover:shadow-[0_30px_90px_-20px_rgba(239,68,68,0.3)] transition-all duration-500 border-red-200/50 dark:border-red-800/50 backdrop-blur-sm bg-white/60 dark:bg-gray-900/60 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10 p-8 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 p-0.5 group-hover:scale-110 transition-transform duration-500">
                  <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center">
                    <Heart className="w-7 h-7 text-red-600" />
                  </div>
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground/90">
                  Conflitos e Mal-Entendidos
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Enfrenta conflitos frequentes em relacionamentos pessoais ou profissionais? Parece que falam idiomas diferentes?
                </p>
              </div>
            </Card>

            {/* Solution 2 */}
            <Card className="relative overflow-hidden group hover:shadow-[0_30px_90px_-20px_rgba(34,197,94,0.3)] transition-all duration-500 border-green-200/50 dark:border-green-800/50 backdrop-blur-sm bg-white/60 dark:bg-gray-900/60 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10 p-8 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 p-0.5 group-hover:scale-110 transition-transform duration-500">
                  <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center">
                    <Users className="w-7 h-7 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground/90">
                  Conexões Genuínas
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Compreenda os diferentes estilos de comunicação e aprenda a adaptar sua abordagem para criar relacionamentos mais harmoniosos.
                </p>
              </div>
            </Card>

            {/* Problem 3 */}
            <Card className="relative overflow-hidden group hover:shadow-[0_30px_90px_-20px_rgba(239,68,68,0.3)] transition-all duration-500 border-red-200/50 dark:border-red-800/50 backdrop-blur-sm bg-white/60 dark:bg-gray-900/60 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10 p-8 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 p-0.5 group-hover:scale-110 transition-transform duration-500">
                  <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center">
                    <Briefcase className="w-7 h-7 text-red-600" />
                  </div>
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground/90">
                  Estagnação Profissional
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sente que sua comunicação está impedindo seu crescimento na carreira? Dificuldade em liderar ou influenciar?
                </p>
              </div>
            </Card>

            {/* Solution 3 */}
            <Card className="relative overflow-hidden group hover:shadow-[0_30px_90px_-20px_rgba(34,197,94,0.3)] transition-all duration-500 border-green-200/50 dark:border-green-800/50 backdrop-blur-sm bg-white/60 dark:bg-gray-900/60 animate-fade-up" style={{ animationDelay: "0.5s" }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10 p-8 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 p-0.5 group-hover:scale-110 transition-transform duration-500">
                  <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground/90">
                  Crescimento Acelerado
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Desenvolva habilidades comunicativas estratégicas que impulsionam sua liderança, influência e resultados profissionais.
                </p>
              </div>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center mt-16 animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-lg md:text-xl text-foreground/80 font-medium">
                Não deixe que a comunicação seja uma barreira para o seu sucesso
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/instrucoes")}
                  className="text-lg px-12 py-7 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-[0_20px_60px_-15px_rgba(168,85,247,0.5)] hover:shadow-[0_25px_80px_-15px_rgba(168,85,247,0.6)] transition-all duration-500 hover:scale-105 group"
                >
                  Fazer Teste Grátis
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/pricing")}
                  className="text-lg px-12 py-7 rounded-2xl border-2 border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-all duration-300"
                >
                  Conhecer Premium
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="mb-24 md:mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 animate-fade-up">
              Por Que Escolher o DialogaMente?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Recursos premium para seu desenvolvimento
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className="group p-8 text-center hover:shadow-[0_30px_90px_-20px_rgba(168,85,247,0.4)] transition-all duration-500 border-purple-200/50 dark:border-purple-800/50 backdrop-blur-sm bg-white/60 dark:bg-gray-900/60 hover:scale-105 hover:-translate-y-2 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} p-0.5 group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6`}>
                  <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center">
                    <feature.icon className="w-10 h-10 text-purple-600" />
                  </div>
                </div>
                <h3 className="font-display font-semibold text-xl mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Social Proof - Reviews Section */}
        {topReviews.length > 0 && (
          <section className="mb-24 md:mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 animate-fade-up">
                O Que Nossos Usuários Dizem
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground animate-fade-up" style={{ animationDelay: "0.1s" }}>
                Transformações reais de pessoas que descobriram seu perfil de comunicação
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {topReviews.map((review, index) => {
                const config = typeConfig[review.result_type as keyof typeof typeConfig];
                const Icon = config.icon;
                
                return (
                  <Card 
                    key={review.id}
                    className="group relative p-8 hover:shadow-[0_30px_90px_-20px_rgba(168,85,247,0.4)] transition-all duration-500 border-purple-200/50 dark:border-purple-800/50 backdrop-blur-sm bg-white/60 dark:bg-gray-900/60 hover:scale-105 hover:-translate-y-2 animate-fade-up overflow-hidden"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Quote Icon Background */}
                    <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                      <Quote className="w-16 h-16 text-purple-500" />
                    </div>

                    <div className="relative z-10 space-y-4">
                      {/* Rating Stars */}
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Comment */}
                      <p className="text-sm md:text-base text-foreground/80 leading-relaxed italic min-h-[4rem]">
                        "{review.comment}"
                      </p>

                      {/* Profile Badge */}
                      <div className="flex items-center gap-2 pt-4 border-t border-purple-200/30 dark:border-purple-800/30">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${
                          review.result_type === "visual" ? "from-purple-500 to-pink-500" :
                          review.result_type === "auditivo" ? "from-cyan-500 to-blue-500" :
                          "from-orange-500 to-red-500"
                        } p-0.5 flex items-center justify-center`}>
                          <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                            <Icon className={`w-5 h-5 ${config.color}`} />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground/90">
                            Perfil {config.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Usuário verificado
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* CTA to see all reviews */}
            <div className="text-center mt-12 animate-fade-up" style={{ animationDelay: "0.6s" }}>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/reviews")}
                className="text-base px-8 py-6 rounded-2xl border-2 border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/30 hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300 group"
              >
                Ver Mais Avaliações
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </section>
        )}

        {/* How It Works Section */}
        <section className="mb-24 md:mb-32">
          <div className="max-w-6xl mx-auto">
            <Card className="relative overflow-hidden p-10 md:p-16 backdrop-blur-xl bg-gradient-to-br from-white/80 to-purple-50/80 dark:from-gray-900/80 dark:to-purple-950/80 border-purple-200/50 dark:border-purple-800/50 shadow-[0_30px_90px_-20px_rgba(168,85,247,0.4)]">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 animate-fade-up">
                    Como Funciona Nossa Análise?
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
                    Um processo científico cuidadosamente elaborado que mapeia sua forma única de se comunicar através de situações cotidianas reais
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
                  <div className="space-y-6 animate-slide-in">
                    <h3 className="text-2xl font-display font-semibold mb-6">O Que Você Receberá</h3>
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-4 group">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-base text-foreground/80 leading-relaxed pt-1">{benefit}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6 animate-slide-in" style={{ animationDelay: "0.2s" }}>
                    <h3 className="text-2xl font-display font-semibold mb-6">Metodologia Comprovada</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Nosso teste identifica padrões de comunicação através de um questionário estruturado baseado em pesquisas científicas e metodologias validadas.
                    </p>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Você responderá a situações práticas do dia a dia, e nossa análise revelará como você naturalmente se expressa, processa informações e se relaciona.
                    </p>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-green-100/50 to-emerald-100/50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-700/50">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                        <Save className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-1">
                          Progresso Salvo Automaticamente
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Pause a qualquer momento e retome de onde parou. Seu progresso é mantido com segurança.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-8 animate-scale-in" style={{ animationDelay: "0.4s" }}>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      onClick={() => navigate("/instrucoes")}
                      className="text-lg px-12 py-7 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-[0_20px_60px_-15px_rgba(168,85,247,0.5)] hover:shadow-[0_25px_80px_-15px_rgba(168,85,247,0.6)] transition-all duration-500 hover:scale-105 group"
                    >
                      Iniciar Agora Grátis
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      onClick={() => navigate("/pricing")}
                      className="text-lg px-12 py-7 rounded-2xl border-2 border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-all duration-300"
                    >
                      <Sparkles className="mr-2 w-5 h-5" />
                      Ver Planos
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Premium Footer */}
        <footer className="text-center">
          <div className="relative inline-block group animate-fade-in">
            {/* Premium Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-700"></div>
            
            {/* Footer Content */}
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/90 to-purple-50/90 dark:from-gray-900/90 dark:to-purple-950/90 px-10 py-8 rounded-3xl border border-purple-200/50 dark:border-purple-800/50 shadow-[0_20px_60px_-15px_rgba(168,85,247,0.3)] hover:shadow-[0_25px_80px_-15px_rgba(168,85,247,0.4)] transition-all duration-700 hover:scale-105">
              <h3 className="text-xl md:text-2xl font-display font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent mb-3">
                DialogaMente
              </h3>
              <p className="text-sm font-medium text-foreground/70 mb-2">
                Análise Profissional de Perfil Comunicativo
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-glow"></div>
                <p className="text-xs font-semibold text-foreground/60">
                  Desenvolvida por Pedro Diogo - Soluções Tecnológicas
                </p>
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 animate-glow" style={{ animationDelay: "1s" }}></div>
              </div>
            </div>
          </div>
        </footer>
        
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
