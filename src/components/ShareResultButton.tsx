import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Share2, MessageCircle, Copy, Check, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface ShareResultButtonProps {
  result: {
    primary: "visual" | "auditivo" | "cinestesico";
    scores: {
      visual: number;
      auditivo: number;
      cinestesico: number;
    };
    percentage?: number;
  };
  totalQuestions: number;
}

export const ShareResultButton = ({ result, totalQuestions }: ShareResultButtonProps) => {
  const [copied, setCopied] = useState(false);

  const percentage = result.percentage || Math.round((result.scores[result.primary] / totalQuestions) * 100);

  const profileNames = {
    visual: "Visual",
    auditivo: "Auditivo",
    cinestesico: "Cinestésico",
  };

  const profileEmojis = {
    visual: "👁️",
    auditivo: "👂",
    cinestesico: "✋",
  };

  const shareText = `🎯 Meu Resultado DialogaMente

Perfil Predominante: ${profileEmojis[result.primary]} ${profileNames[result.primary]}
Força: ${percentage}%

📊 Pontuações Detalhadas:
👁️ Visual: ${result.scores.visual} (${Math.round((result.scores.visual / totalQuestions) * 100)}%)
👂 Auditivo: ${result.scores.auditivo} (${Math.round((result.scores.auditivo / totalQuestions) * 100)}%)
✋ Cinestésico: ${result.scores.cinestesico} (${Math.round((result.scores.cinestesico / totalQuestions) * 100)}%)

✨ Descubra seu perfil comunicativo em DialogaMente!`;

  const shareUrl = window.location.origin;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n🔗 ${shareUrl}`);
      setCopied(true);
      toast({
        title: "Link copiado!",
        description: "O resultado foi copiado para a área de transferência.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link.",
        variant: "destructive",
      });
    }
  };

  const handleShareWhatsApp = () => {
    const message = encodeURIComponent(`${shareText}\n\n🔗 ${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${message}`, "_blank");
  };

  const generatePDF = async () => {
    const doc = new jsPDF();

    const loadFont = async (path: string) => {
      const resp = await fetch(path);
      const buf = await resp.arrayBuffer();
      let binary = "";
      const bytes = new Uint8Array(buf);
      const chunkSize = 0x8000;
      for (let i = 0; i < bytes.length; i += chunkSize) {
        const chunk = bytes.subarray(i, i + chunkSize);
        binary += String.fromCharCode(...Array.from(chunk));
      }
      return btoa(binary);
    };

    const [robotoRegular, robotoBold] = await Promise.all([
      loadFont("/fonts/Roboto-Regular.ttf"),
      loadFont("/fonts/Roboto-Bold.ttf"),
    ]);

    doc.addFileToVFS("Roboto-Regular.ttf", robotoRegular);
    doc.addFileToVFS("Roboto-Bold.ttf", robotoBold);
    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    doc.addFont("Roboto-Bold.ttf", "Roboto", "bold");
    doc.setFont("Roboto", "normal");

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPos = 20;

    const colors = {
      primary: [147, 51, 234] as [number, number, number],
      secondary: [236, 72, 153] as [number, number, number],
      accent: [6, 182, 212] as [number, number, number],
      dark: [31, 41, 55] as [number, number, number],
      light: [243, 244, 246] as [number, number, number],
      visual: [168, 85, 247] as [number, number, number],
      auditivo: [6, 182, 212] as [number, number, number],
      cinestesico: [249, 115, 22] as [number, number, number],
    };

    const profileConfig = {
      visual: { name: "Visual", color: colors.visual, emoji: "👁️" },
      auditivo: { name: "Auditivo", color: colors.auditivo, emoji: "👂" },
      cinestesico: { name: "Cinestésico", color: colors.cinestesico, emoji: "✋" },
    };

    const config = profileConfig[result.primary];
    const total = totalQuestions;
    const percentages = {
      visual: Math.round((result.scores.visual / total) * 100),
      auditivo: Math.round((result.scores.auditivo / total) * 100),
      cinestesico: Math.round((result.scores.cinestesico / total) * 100),
    };

    // Página 1: CAPA
    doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.rect(0, 0, pageWidth, 80, "F");
    
    doc.setFillColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
    doc.circle(pageWidth - 20, 60, 40, "F");
    
    doc.setFillColor(colors.accent[0], colors.accent[1], colors.accent[2]);
    doc.circle(20, pageHeight - 40, 50, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(36);
    doc.setFont("Roboto", "bold");
    doc.text("DialogaMente", pageWidth / 2, 40, { align: "center" });

    doc.setFontSize(14);
    doc.setFont("Roboto", "normal");
    doc.text("Relatório de Análise de Perfil de Comunicação", pageWidth / 2, 55, { align: "center" });

    yPos = 100;
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(20, yPos, pageWidth - 40, 70, 5, 5, "F");
    
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.roundedRect(20, yPos, pageWidth - 40, 70, 5, 5, "S");

    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    doc.setFontSize(12);
    doc.text("SEU PERFIL PREDOMINANTE", pageWidth / 2, yPos + 15, { align: "center" });

    doc.setFontSize(32);
    doc.setFont("Roboto", "bold");
    doc.setTextColor(config.color[0], config.color[1], config.color[2]);
    doc.text(`${config.name.toUpperCase()}`, pageWidth / 2, yPos + 35, { align: "center" });

    doc.setFontSize(24);
    doc.text(`${percentages[result.primary]}%`, pageWidth / 2, yPos + 55, { align: "center" });

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("de afinidade com este perfil", pageWidth / 2, yPos + 63, { align: "center" });

    yPos = 185;
    doc.setFontSize(10);
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    doc.text(`Data da Avaliação: ${new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}`, pageWidth / 2, yPos, { align: "center" });
    doc.text(`Total de Questões: ${total}`, pageWidth / 2, yPos + 7, { align: "center" });

    doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.rect(0, pageHeight - 15, pageWidth, 15, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text("Desenvolvido por Pedro Diogo - Soluções Tecnológicas", pageWidth / 2, pageHeight - 8, { align: "center" });

    // Página 2: ANÁLISE DETALHADA
    doc.addPage();
    yPos = 20;

    doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.rect(0, 0, pageWidth, 35, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("Roboto", "bold");
    doc.text("Análise Detalhada dos Resultados", pageWidth / 2, 22, { align: "center" });

    yPos = 50;

    doc.setFontSize(14);
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    doc.setFont("Roboto", "bold");
    doc.text("Distribuição dos Perfis", 20, yPos);

    yPos += 10;
    const barHeight = 12;
    const maxBarWidth = pageWidth - 80;

    [
      { key: "visual" as const, label: "Visual", color: colors.visual },
      { key: "auditivo" as const, label: "Auditivo", color: colors.auditivo },
      { key: "cinestesico" as const, label: "Cinestésico", color: colors.cinestesico },
    ].forEach((item) => {
      const barWidth = (percentages[item.key] / 100) * maxBarWidth;
      
      doc.setFontSize(11);
      doc.setFont("Roboto", "bold");
      doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
      doc.text(item.label, 20, yPos + 8);

      doc.setFillColor(colors.light[0], colors.light[1], colors.light[2]);
      doc.roundedRect(60, yPos, maxBarWidth, barHeight, 2, 2, "F");

      doc.setFillColor(item.color[0], item.color[1], item.color[2]);
      doc.roundedRect(60, yPos, barWidth, barHeight, 2, 2, "F");

      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      if (barWidth > 15) {
        doc.text(`${percentages[item.key]}%`, 65, yPos + 8);
      } else {
        doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
        doc.text(`${percentages[item.key]}%`, 65 + barWidth, yPos + 8);
      }

      doc.setTextColor(100, 100, 100);
      doc.setFontSize(9);
      doc.text(`${result.scores[item.key]}/${total}`, pageWidth - 25, yPos + 8);

      yPos += barHeight + 8;
    });

    yPos += 10;

    autoTable(doc, {
      startY: yPos,
      head: [["Perfil", "Pontuação", "Percentual", "Nível"]],
      body: [
        [
          "Visual",
          `${result.scores.visual}/${total}`,
          `${percentages.visual}%`,
          percentages.visual >= 50 ? "Alto" : percentages.visual >= 30 ? "Médio" : "Baixo",
        ],
        [
          "Auditivo",
          `${result.scores.auditivo}/${total}`,
          `${percentages.auditivo}%`,
          percentages.auditivo >= 50 ? "Alto" : percentages.auditivo >= 30 ? "Médio" : "Baixo",
        ],
        [
          "Cinestésico",
          `${result.scores.cinestesico}/${total}`,
          `${percentages.cinestesico}%`,
          percentages.cinestesico >= 50 ? "Alto" : percentages.cinestesico >= 30 ? "Médio" : "Baixo",
        ],
      ],
      theme: "grid",
      headStyles: {
        fillColor: colors.primary,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: "center",
      },
      bodyStyles: {
        halign: "center",
      },
      alternateRowStyles: {
        fillColor: [250, 250, 250],
      },
      margin: { left: 20, right: 20 },
    });

    return doc.output('blob');
  };

  const handleSharePDF = async () => {
    try {
      toast({
        title: "Gerando PDF...",
        description: "Por favor, aguarde.",
      });

      const pdfBlob = await generatePDF();
      const pdfFile = new File([pdfBlob], "DialogaMente-Resultado.pdf", { type: "application/pdf" });

      if (navigator.share && navigator.canShare?.({ files: [pdfFile] })) {
        await navigator.share({
          title: "Meu Resultado DialogaMente",
          text: `${shareText}\n\n🔗 ${shareUrl}`,
          files: [pdfFile],
        });
      } else {
        // Fallback: baixar o PDF
        const url = URL.createObjectURL(pdfBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "DialogaMente-Resultado.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast({
          title: "PDF baixado!",
          description: "O PDF foi baixado. Você pode compartilhá-lo manualmente.",
        });
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        toast({
          title: "Erro ao gerar PDF",
          description: "Não foi possível gerar o PDF.",
          variant: "destructive",
        });
      }
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Meu Resultado DialogaMente",
          text: `${shareText}\n\n🔗 ${shareUrl}`,
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          toast({
            title: "Erro ao compartilhar",
            description: "Não foi possível compartilhar o resultado.",
            variant: "destructive",
          });
        }
      }
    }
  };

  const showNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="lg"
          className="gap-2 bg-gradient-to-r from-primary via-[hsl(var(--accent-pink))] to-[hsl(var(--accent-cyan))] hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-primary-foreground font-semibold"
        >
          <Share2 className="w-5 h-5" />
          Compartilhar Resultado
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 backdrop-blur-xl bg-background/95 border-primary/20">
        <div className="px-2 py-2">
          <p className="text-xs font-semibold text-muted-foreground mb-1">Compartilhar via:</p>
        </div>
        <DropdownMenuSeparator className="bg-primary/10" />
        
        {showNativeShare && (
          <>
            <DropdownMenuItem
              onClick={handleNativeShare}
              className="gap-3 cursor-pointer hover:bg-accent focus:bg-accent"
            >
              <div className="p-1.5 rounded-md bg-gradient-to-br from-primary/20 to-primary/10">
                <Share2 className="w-4 h-4 text-primary" />
              </div>
              <span className="font-medium">Compartilhar...</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-primary/10" />
          </>
        )}
        
        <DropdownMenuItem
          onClick={handleShareWhatsApp}
          className="gap-3 cursor-pointer hover:bg-accent focus:bg-accent"
        >
          <div className="p-1.5 rounded-md bg-gradient-to-br from-green-500/20 to-green-600/10">
            <MessageCircle className="w-4 h-4 text-green-600" />
          </div>
          <span className="font-medium">WhatsApp</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={handleSharePDF}
          className="gap-3 cursor-pointer hover:bg-accent focus:bg-accent"
        >
          <div className="p-1.5 rounded-md bg-gradient-to-br from-red-500/20 to-red-600/10">
            <FileText className="w-4 h-4 text-red-600" />
          </div>
          <span className="font-medium">Compartilhar PDF</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-primary/10" />
        
        <DropdownMenuItem
          onClick={handleCopyLink}
          className="gap-3 cursor-pointer hover:bg-accent focus:bg-accent"
        >
          <div className="p-1.5 rounded-md bg-gradient-to-br from-primary/20 to-primary/10">
            {copied ? (
              <Check className="w-4 h-4 text-primary" />
            ) : (
              <Copy className="w-4 h-4 text-primary" />
            )}
          </div>
          <span className="font-medium">{copied ? "Copiado!" : "Copiar Texto"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
