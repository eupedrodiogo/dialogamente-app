import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Printer, ArrowLeft, Share2 } from "lucide-react";
import { ReviewForm } from "@/components/ReviewForm";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Mock data para visualização
const mockResults = {
  visual: 8,
  auditivo: 5,
  cinestesico: 3,
  primary: "visual" as const,
  percentage: 50
};

const Results = () => {
  const navigate = useNavigate();

  const generatePDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Adicionar fontes
    doc.addFont("/fonts/Roboto-Regular.ttf", "Roboto", "normal");
    doc.addFont("/fonts/Roboto-Bold.ttf", "Roboto", "bold");

    // Página de Capa
    doc.setFillColor(147, 51, 234);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(32);
    doc.setFont("helvetica", "bold");
    doc.text("Resultado da Análise", pageWidth / 2, 80, { align: "center" });

    doc.setFontSize(24);
    doc.text("DialogaMente", pageWidth / 2, 100, { align: "center" });

    doc.setFontSize(16);
    doc.setFont("Roboto", "normal");
    doc.text("Análise Profissional de Perfil Comunicativo", pageWidth / 2, 120, { align: "center" });

    // Nova página - Resultados
    doc.addPage();
    
    doc.setTextColor(147, 51, 234);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Seu Perfil Comunicativo", 20, 30);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("Roboto", "normal");
    doc.text(`Perfil Predominante: ${mockResults.primary.toUpperCase()}`, 20, 45);
    doc.text(`Força do Perfil: ${mockResults.percentage}%`, 20, 55);

    // Tabela de pontuações
    autoTable(doc, {
      startY: 70,
      head: [["Perfil", "Pontuação"]],
      body: [
        ["Visual", mockResults.visual.toString()],
        ["Auditivo", mockResults.auditivo.toString()],
        ["Cinestésico", mockResults.cinestesico.toString()],
      ],
      theme: "grid",
      headStyles: { fillColor: [147, 51, 234] },
    });

    // Rodapé em todas as páginas
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      const yPos = pageHeight - 50;

      doc.setFillColor(147, 51, 234);
      doc.rect(0, yPos, pageWidth, 50, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("DialogaMente", pageWidth / 2, yPos + 18, { align: "center" });

      doc.setFontSize(10);
      doc.setFont("Roboto", "normal");
      doc.text("Análise Profissional de Perfil Comunicativo", pageWidth / 2, yPos + 27, { align: "center" });

      doc.setFontSize(8);
      doc.text("Desenvolvido por Pedro Diogo - Soluções Tecnológicas", pageWidth / 2, yPos + 37, { align: "center" });
      doc.text(`© ${new Date().getFullYear()} - Todos os direitos reservados`, pageWidth / 2, yPos + 43, { align: "center" });
    }

    doc.save(`DialogaMente-resultado-${mockResults.primary}-${new Date().getTime()}.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.addFont("/fonts/Roboto-Regular.ttf", "Roboto", "normal");
    doc.addFont("/fonts/Roboto-Bold.ttf", "Roboto", "bold");

    doc.setFillColor(147, 51, 234);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(32);
    doc.setFont("helvetica", "bold");
    doc.text("Resultado da Análise", pageWidth / 2, 80, { align: "center" });

    doc.setFontSize(24);
    doc.text("DialogaMente", pageWidth / 2, 100, { align: "center" });

    doc.setFontSize(16);
    doc.setFont("Roboto", "normal");
    doc.text("Análise Profissional de Perfil Comunicativo", pageWidth / 2, 120, { align: "center" });

    doc.addPage();
    
    doc.setTextColor(147, 51, 234);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Seu Perfil Comunicativo", 20, 30);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("Roboto", "normal");
    doc.text(`Perfil Predominante: ${mockResults.primary.toUpperCase()}`, 20, 45);
    doc.text(`Força do Perfil: ${mockResults.percentage}%`, 20, 55);

    autoTable(doc, {
      startY: 70,
      head: [["Perfil", "Pontuação"]],
      body: [
        ["Visual", mockResults.visual.toString()],
        ["Auditivo", mockResults.auditivo.toString()],
        ["Cinestésico", mockResults.cinestesico.toString()],
      ],
      theme: "grid",
      headStyles: { fillColor: [147, 51, 234] },
    });

    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      const yPos = pageHeight - 50;

      doc.setFillColor(147, 51, 234);
      doc.rect(0, yPos, pageWidth, 50, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("DialogaMente", pageWidth / 2, yPos + 18, { align: "center" });

      doc.setFontSize(10);
      doc.setFont("Roboto", "normal");
      doc.text("Análise Profissional de Perfil Comunicativo", pageWidth / 2, yPos + 27, { align: "center" });

      doc.setFontSize(8);
      doc.text("Desenvolvido por Pedro Diogo - Soluções Tecnológicas", pageWidth / 2, yPos + 37, { align: "center" });
      doc.text(`© ${new Date().getFullYear()} - Todos os direitos reservados`, pageWidth / 2, yPos + 43, { align: "center" });
    }

    const pdfBlob = doc.output('blob');
    const fileName = `DialogaMente-resultado-${mockResults.primary}-${new Date().getTime()}.pdf`;

    // Try native Web Share API first
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([pdfBlob], fileName, { type: 'application/pdf' })] })) {
      try {
        const file = new File([pdfBlob], fileName, { type: 'application/pdf' });
        await navigator.share({
          title: 'Meu Resultado DialogaMente',
          text: `Confira meu perfil comunicativo: ${mockResults.primary.toUpperCase()} (${mockResults.percentage}%)`,
          files: [file]
        });
        return;
      } catch (error) {
        console.log('Share cancelled or failed:', error);
      }
    }

    // Fallback to WhatsApp Web with message
    const message = encodeURIComponent(
      `🎯 Meu Resultado DialogaMente\n\n` +
      `Perfil Predominante: ${mockResults.primary.toUpperCase()}\n` +
      `Força: ${mockResults.percentage}%\n\n` +
      `📊 Pontuações:\n` +
      `👁️ Visual: ${mockResults.visual}\n` +
      `👂 Auditivo: ${mockResults.auditivo}\n` +
      `✋ Cinestésico: ${mockResults.cinestesico}\n\n` +
      `Análise Profissional de Perfil Comunicativo`
    );
    
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  const profileDescriptions = {
    visual: {
      title: "Perfil Visual Predominante",
      description: "Pessoas com perfil visual predominante tendem a processar informações através de imagens e representações visuais.",
      strengths: [
        "Excelente memória visual",
        "Facilidade com gráficos e diagramas",
        "Boa organização espacial",
        "Criatividade visual"
      ],
      weaknesses: [
        "Pode ter dificuldade com instruções apenas verbais",
        "Pode se distrair facilmente com estímulos visuais",
        "Pode ter dificuldade em ambientes sem referências visuais"
      ],
      tips: [
        "Use mapas mentais e diagramas para estudar",
        "Faça anotações com cores e destaques",
        "Utilize vídeos e apresentações visuais",
        "Organize seu espaço de forma visualmente clara"
      ]
    },
    auditivo: {
      title: "Perfil Auditivo Predominante",
      description: "Pessoas com perfil auditivo predominante aprendem melhor através de sons, músicas e discussões verbais.",
      strengths: [
        "Boa memória para informações verbais",
        "Facilidade com idiomas e música",
        "Excelente em comunicação oral",
        "Aprende bem através de discussões"
      ],
      weaknesses: [
        "Pode ter dificuldade com material puramente visual",
        "Pode se distrair com ruídos ambientes",
        "Pode ter dificuldade em ambientes silenciosos"
      ],
      tips: [
        "Grave aulas e ouça novamente",
        "Participe de grupos de discussão",
        "Leia em voz alta ao estudar",
        "Use música ou podcasts para aprender"
      ]
    },
    cinestesico: {
      title: "Perfil Cinestésico Predominante",
      description: "Pessoas com perfil cinestésico predominante aprendem melhor através da prática e do movimento.",
      strengths: [
        "Excelente coordenação motora",
        "Aprende fazendo",
        "Boa memória muscular",
        "Habilidades práticas desenvolvidas"
      ],
      weaknesses: [
        "Pode ter dificuldade com teoria abstrata",
        "Pode se frustrar em ambientes muito teóricos",
        "Necessita de movimento para manter foco"
      ],
      tips: [
        "Pratique exercícios e experimentos",
        "Use objetos físicos para estudar",
        "Faça pausas frequentes para movimento",
        "Aprenda através de atividades práticas"
      ]
    }
  };

  const profile = profileDescriptions[mockResults.primary];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 dark:from-gray-950 dark:via-purple-950 dark:to-cyan-950">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-500 py-16 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="mb-6 text-white hover:text-white/80 hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Início
          </Button>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 drop-shadow-lg">
            Resultados da Análise
          </h1>
          <p className="text-xl text-white/95 font-light">
            Visualização de Resultados - Área Administrativa
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center print:hidden">
          <Button
            onClick={generatePDF}
            size="lg"
            className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Download className="w-5 h-5" />
            Baixar PDF
          </Button>
          <Button
            onClick={handleShareWhatsApp}
            size="lg"
            className="gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
          >
            <Share2 className="w-5 h-5" />
            Compartilhar no WhatsApp
          </Button>
          <Button
            onClick={handlePrint}
            size="lg"
            variant="outline"
            className="gap-2"
          >
            <Printer className="w-5 h-5" />
            Imprimir
          </Button>
        </div>

        {/* Results Card */}
        <Card className="p-8 bg-white/80 backdrop-blur-xl border-2 border-purple-200 dark:bg-gray-900/80 dark:border-purple-800">
          <h2 className="text-3xl font-display font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent mb-6">
            {profile.title}
          </h2>
          
          <p className="text-lg text-foreground/80 mb-8">
            {profile.description}
          </p>

          {/* Scores */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-950 dark:to-purple-900 rounded-xl border border-purple-200 dark:border-purple-800">
              <h3 className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-2">Visual</h3>
              <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">{mockResults.visual}</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-pink-100 to-pink-50 dark:from-pink-950 dark:to-pink-900 rounded-xl border border-pink-200 dark:border-pink-800">
              <h3 className="text-sm font-semibold text-pink-600 dark:text-pink-400 mb-2">Auditivo</h3>
              <p className="text-3xl font-bold text-pink-700 dark:text-pink-300">{mockResults.auditivo}</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-cyan-100 to-cyan-50 dark:from-cyan-950 dark:to-cyan-900 rounded-xl border border-cyan-200 dark:border-cyan-800">
              <h3 className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-2">Cinestésico</h3>
              <p className="text-3xl font-bold text-cyan-700 dark:text-cyan-300">{mockResults.cinestesico}</p>
            </div>
          </div>

          {/* Strengths */}
          <div className="mb-8">
            <h3 className="text-2xl font-display font-bold text-foreground mb-4">Pontos Fortes</h3>
            <ul className="space-y-2">
              {profile.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-foreground/80">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="mb-8">
            <h3 className="text-2xl font-display font-bold text-foreground mb-4">Áreas de Atenção</h3>
            <ul className="space-y-2">
              {profile.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">⚠</span>
                  <span className="text-foreground/80">{weakness}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tips */}
          <div>
            <h3 className="text-2xl font-display font-bold text-foreground mb-4">Dicas Personalizadas</h3>
            <ul className="space-y-2">
              {profile.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">💡</span>
                  <span className="text-foreground/80">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Review Form */}
        <ReviewForm resultType={mockResults.primary} />

        {/* Footer */}
        <footer className="relative group mt-16">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-700"></div>
          
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
        </footer>
      </main>
    </div>
  );
};

export default Results;
