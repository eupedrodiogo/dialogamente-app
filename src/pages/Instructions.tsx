import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, CheckCircle2, Lightbulb, Target, Clock, Save } from "lucide-react";

const Instructions = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const instructions = [
    {
      icon: Target,
      title: "Responda com Sinceridade",
      description: "Para cada questão, escolha a alternativa (A, B ou C) que descreve com mais precisão sua reação ou preferência mais imediata e natural.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Lightbulb,
      title: "Não Pense Demais",
      description: "Não se preocupe com a resposta 'correta'. Escolha apenas a alternativa que melhor representa seu comportamento habitual e espontâneo.",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: Clock,
      title: "Reserve Seu Tempo",
      description: "O teste leva aproximadamente 10-15 minutos. Um contador será exibido durante o teste apenas para seu conhecimento - não há pressa! Escolha um momento tranquilo onde você possa se concentrar sem interrupções.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Save,
      title: "Progresso Automático",
      description: "Seu progresso é salvo automaticamente. Você pode pausar e retomar o teste a qualquer momento, exatamente de onde parou.",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const importantPoints = [
    "Não existem respostas certas ou erradas",
    "Seja honesto consigo mesmo",
    "Confie na sua primeira impressão",
    "Responda todas as 30 questões",
    "O contador de tempo é apenas informativo - faça o teste no seu próprio ritmo",
    "Você receberá um relatório completo ao final"
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-purple-50/30 to-cyan-50/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12 md:py-20 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 mb-6">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
              Teste de Perfil Comunicativo
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
            Instruções Importantes
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Leia atentamente antes de iniciar sua jornada de autoconhecimento
          </p>
        </div>

        {/* Main Instructions Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-scale-in" style={{ animationDelay: "0.1s" }}>
          {instructions.map((instruction, index) => (
            <Card 
              key={instruction.title}
              className="group hover:shadow-[0_30px_90px_-20px_rgba(168,85,247,0.4)] transition-all duration-500 border-purple-200/50 dark:border-purple-800/50 backdrop-blur-sm bg-white/60 dark:bg-gray-900/60 hover:scale-105 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${instruction.gradient} p-0.5 group-hover:scale-110 transition-transform duration-500`}>
                  <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center">
                    <instruction.icon className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <CardTitle className="text-xl text-center font-display">
                  {instruction.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center leading-relaxed">
                  {instruction.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Important Points */}
        <Card className="mb-12 backdrop-blur-xl bg-gradient-to-br from-purple-50/90 to-pink-50/90 dark:from-purple-950/90 dark:to-pink-950/90 border-2 border-purple-300/50 dark:border-purple-700/50 shadow-[0_20px_60px_-15px_rgba(168,85,247,0.35)] animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Pontos Essenciais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {importantPoints.map((point, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-xl border border-purple-200/50 dark:border-purple-800/50 hover:shadow-[0_10px_30px_-10px_rgba(168,85,247,0.3)] transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <p className="text-base text-foreground/90 leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* What You'll Receive */}
        <Card className="mb-12 backdrop-blur-xl bg-gradient-to-br from-white/80 to-purple-50/80 dark:from-gray-900/80 dark:to-purple-950/80 border-purple-200/50 dark:border-purple-800/50 shadow-[0_30px_90px_-20px_rgba(168,85,247,0.4)] animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center gap-2 mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <CardTitle className="text-2xl md:text-3xl font-display font-bold">
                O Que Você Receberá
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-gradient-to-br from-purple-100/50 to-pink-100/50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200/30 dark:border-purple-700/30">
                <h3 className="font-semibold text-lg mb-2 text-purple-700 dark:text-purple-300">
                  Análise Detalhada
                </h3>
                <p className="text-sm text-muted-foreground">
                  Descubra seu perfil predominante (Visual, Auditivo ou Cinestésico) com percentuais precisos
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-100/50 to-blue-100/50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-200/30 dark:border-cyan-700/30">
                <h3 className="font-semibold text-lg mb-2 text-cyan-700 dark:text-cyan-300">
                  Pontos Fortes e Fracos
                </h3>
                <p className="text-sm text-muted-foreground">
                  Identifique suas características comunicacionais mais marcantes e áreas para desenvolver
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-gradient-to-br from-orange-100/50 to-red-100/50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200/30 dark:border-orange-700/30">
                <h3 className="font-semibold text-lg mb-2 text-orange-700 dark:text-orange-300">
                  Dicas Personalizadas
                </h3>
                <p className="text-sm text-muted-foreground">
                  Estratégias práticas e específicas para otimizar sua comunicação no dia a dia
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-gradient-to-br from-green-100/50 to-emerald-100/50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/30 dark:border-green-700/30">
                <h3 className="font-semibold text-lg mb-2 text-green-700 dark:text-green-300">
                  Relatório Completo
                </h3>
                <p className="text-sm text-muted-foreground">
                  Baixe ou compartilhe seu relatório em PDF para consultar sempre que precisar
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Button */}
        <div className="text-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-foreground/80 font-medium">
              Pronto para descobrir seu perfil único de comunicação?
            </p>
            <Button 
              size="lg"
              onClick={() => navigate("/test")}
              className="text-xl px-16 py-8 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-[0_20px_60px_-15px_rgba(168,85,247,0.5)] hover:shadow-[0_25px_80px_-15px_rgba(168,85,247,0.6)] transition-all duration-500 hover:scale-105 group"
            >
              Iniciar Teste Agora
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Button>
            
            <p className="text-sm text-muted-foreground">
              100% gratuito • Sem necessidade de cadastro • Resultados imediatos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
