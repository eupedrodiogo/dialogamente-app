import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileDown, Printer, ArrowLeft, Eye, Ear, Hand, Sparkles, TrendingUp, Target, CheckCircle2, Share2, Clock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ReviewForm } from "@/components/ReviewForm";
import { ShareResultButton } from "@/components/ShareResultButton";
import { supabase } from "@/integrations/supabase/client";
import "../styles/print.css";

interface Question {
  id: number;
  text: string;
  options: {
    value: string;
    label: string;
    type: "visual" | "auditivo" | "cinestesico";
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Quando você está aprendendo algo novo, você prefere:",
    options: [
      { value: "a", label: "Ver diagramas, gráficos ou vídeos", type: "visual" },
      { value: "b", label: "Ouvir explicações ou palestras", type: "auditivo" },
      { value: "c", label: "Praticar e experimentar diretamente", type: "cinestesico" },
    ],
  },
  {
    id: 2,
    text: "Ao receber instruções, você prefere:",
    options: [
      { value: "a", label: "Ler um manual ou ver imagens", type: "visual" },
      { value: "b", label: "Que alguém explique verbalmente", type: "auditivo" },
      { value: "c", label: "Tentar fazer sozinho e aprender fazendo", type: "cinestesico" },
    ],
  },
  {
    id: 3,
    text: "Durante uma reunião, você tende a:",
    options: [
      { value: "a", label: "Prestar atenção em slides e apresentações visuais", type: "visual" },
      { value: "b", label: "Focar no que está sendo dito", type: "auditivo" },
      { value: "c", label: "Tomar notas ou rabiscar", type: "cinestesico" },
    ],
  },
  {
    id: 4,
    text: "Para lembrar de algo importante, você:",
    options: [
      { value: "a", label: "Cria uma imagem mental ou visualiza", type: "visual" },
      { value: "b", label: "Repete em voz alta ou para si mesmo", type: "auditivo" },
      { value: "c", label: "Associa com uma ação ou sensação", type: "cinestesico" },
    ],
  },
  {
    id: 5,
    text: "Ao explicar algo para alguém, você:",
    options: [
      { value: "a", label: "Desenha ou mostra exemplos visuais", type: "visual" },
      { value: "b", label: "Explica verbalmente com detalhes", type: "auditivo" },
      { value: "c", label: "Demonstra fazendo ou usando gestos", type: "cinestesico" },
    ],
  },
  {
    id: 6,
    text: "Você se concentra melhor quando:",
    options: [
      { value: "a", label: "O ambiente está organizado e visualmente limpo", type: "visual" },
      { value: "b", label: "Há silêncio ou música de fundo apropriada", type: "auditivo" },
      { value: "c", label: "Pode se movimentar ou tem objetos para manipular", type: "cinestesico" },
    ],
  },
  {
    id: 7,
    text: "Ao resolver um problema, você prefere:",
    options: [
      { value: "a", label: "Ver o problema escrito ou em diagrama", type: "visual" },
      { value: "b", label: "Discutir o problema com outras pessoas", type: "auditivo" },
      { value: "c", label: "Testar diferentes soluções na prática", type: "cinestesico" },
    ],
  },
  {
    id: 8,
    text: "Quando está entediado, você tende a:",
    options: [
      { value: "a", label: "Olhar pela janela ou observar ao redor", type: "visual" },
      { value: "b", label: "Conversar ou ouvir música", type: "auditivo" },
      { value: "c", label: "Se movimentar ou mexer em algo", type: "cinestesico" },
    ],
  },
  {
    id: 9,
    text: "Ao comprar algo novo, você:",
    options: [
      { value: "a", label: "Analisa visualmente o produto", type: "visual" },
      { value: "b", label: "Procura opiniões e avaliações", type: "auditivo" },
      { value: "c", label: "Precisa tocar e experimentar o produto", type: "cinestesico" },
    ],
  },
  {
    id: 10,
    text: "Seu estilo de anotações é:",
    options: [
      { value: "a", label: "Usar cores, destaques e esquemas visuais", type: "visual" },
      { value: "b", label: "Escrever frases completas e detalhadas", type: "auditivo" },
      { value: "c", label: "Breve, com ênfase em fazer e praticar", type: "cinestesico" },
    ],
  },
  {
    id: 11,
    text: "Ao estudar para uma prova, você:",
    options: [
      { value: "a", label: "Revisa materiais visuais como gráficos e slides", type: "visual" },
      { value: "b", label: "Lê em voz alta ou discute o conteúdo", type: "auditivo" },
      { value: "c", label: "Faz exercícios práticos e simulados", type: "cinestesico" },
    ],
  },
  {
    id: 12,
    text: "Em uma viagem, você se guia melhor por:",
    options: [
      { value: "a", label: "Mapas visuais e placas de sinalização", type: "visual" },
      { value: "b", label: "Instruções verbais de alguém", type: "auditivo" },
      { value: "c", label: "Sua intuição e sentido de direção", type: "cinestesico" },
    ],
  },
  {
    id: 13,
    text: "Quando precisa memorizar informações, você:",
    options: [
      { value: "a", label: "Cria esquemas e diagramas coloridos", type: "visual" },
      { value: "b", label: "Repete as informações em voz alta", type: "auditivo" },
      { value: "c", label: "Escreve várias vezes ou cria associações práticas", type: "cinestesico" },
    ],
  },
  {
    id: 14,
    text: "Ao assistir um filme, você prefere:",
    options: [
      { value: "a", label: "Filmes com belos cenários e efeitos visuais", type: "visual" },
      { value: "b", label: "Filmes com bons diálogos e trilha sonora", type: "auditivo" },
      { value: "c", label: "Filmes de ação com muitas cenas dinâmicas", type: "cinestesico" },
    ],
  },
  {
    id: 15,
    text: "Para relaxar, você geralmente:",
    options: [
      { value: "a", label: "Assiste vídeos ou contempla paisagens", type: "visual" },
      { value: "b", label: "Ouve música ou podcasts", type: "auditivo" },
      { value: "c", label: "Pratica exercícios físicos ou hobbies manuais", type: "cinestesico" },
    ],
  },
  {
    id: 16,
    text: "Ao montar um móvel novo, você:",
    options: [
      { value: "a", label: "Segue as ilustrações do manual passo a passo", type: "visual" },
      { value: "b", label: "Pede ajuda ou assiste tutoriais com explicações", type: "auditivo" },
      { value: "c", label: "Tenta montar diretamente, testando as peças", type: "cinestesico" },
    ],
  },
  {
    id: 17,
    text: "Em uma conversa importante, você presta mais atenção em:",
    options: [
      { value: "a", label: "Expressões faciais e linguagem corporal", type: "visual" },
      { value: "b", label: "Tom de voz e palavras utilizadas", type: "auditivo" },
      { value: "c", label: "Sensações e energia da pessoa", type: "cinestesico" },
    ],
  },
  {
    id: 18,
    text: "Ao planejar seu dia, você prefere:",
    options: [
      { value: "a", label: "Usar agendas coloridas ou aplicativos visuais", type: "visual" },
      { value: "b", label: "Fazer listas mentais ou usar lembretes de voz", type: "auditivo" },
      { value: "c", label: "Ir fazendo conforme sente necessidade", type: "cinestesico" },
    ],
  },
  {
    id: 19,
    text: "Quando conhece alguém novo, você tende a lembrar:",
    options: [
      { value: "a", label: "Do rosto e aparência da pessoa", type: "visual" },
      { value: "b", label: "Do nome e do que foi conversado", type: "auditivo" },
      { value: "c", label: "Das sensações e do contexto do encontro", type: "cinestesico" },
    ],
  },
  {
    id: 20,
    text: "Seu ambiente de trabalho ideal tem:",
    options: [
      { value: "a", label: "Boa iluminação e decoração inspiradora", type: "visual" },
      { value: "b", label: "Boa acústica e ambiente tranquilo", type: "auditivo" },
      { value: "c", label: "Espaço para se movimentar e conforto físico", type: "cinestesico" },
    ],
  },
  {
    id: 21,
    text: "Quando você está estressado, você prefere:",
    options: [
      { value: "a", label: "Ver imagens relaxantes ou assistir algo inspirador", type: "visual" },
      { value: "b", label: "Ouvir música calmante ou conversar sobre o problema", type: "auditivo" },
      { value: "c", label: "Fazer atividade física ou trabalhos manuais", type: "cinestesico" },
    ],
  },
  {
    id: 22,
    text: "Ao organizar sua casa ou escritório, você:",
    options: [
      { value: "a", label: "Prioriza a estética e harmonia visual", type: "visual" },
      { value: "b", label: "Prefere que tudo tenha seu lugar lógico e funcional", type: "auditivo" },
      { value: "c", label: "Organiza baseado no que é mais prático e acessível", type: "cinestesico" },
    ],
  },
  {
    id: 23,
    text: "Durante uma apresentação, você se sente mais confortável:",
    options: [
      { value: "a", label: "Usando slides visuais bem elaborados", type: "visual" },
      { value: "b", label: "Falando e contando histórias", type: "auditivo" },
      { value: "c", label: "Fazendo demonstrações práticas", type: "cinestesico" },
    ],
  },
  {
    id: 24,
    text: "Ao escolher um restaurante, você decide por:",
    options: [
      { value: "a", label: "Como o lugar parece nas fotos", type: "visual" },
      { value: "b", label: "Recomendações que ouviu de amigos", type: "auditivo" },
      { value: "c", label: "Memórias de como se sentiu quando esteve lá", type: "cinestesico" },
    ],
  },
  {
    id: 25,
    text: "Para tomar decisões importantes, você:",
    options: [
      { value: "a", label: "Visualiza os cenários possíveis e faz listas", type: "visual" },
      { value: "b", label: "Conversa com pessoas e ouve diferentes opiniões", type: "auditivo" },
      { value: "c", label: "Segue sua intuição e o que sente ser certo", type: "cinestesico" },
    ],
  },
  {
    id: 26,
    text: "Ao aprender um novo idioma, você prefere:",
    options: [
      { value: "a", label: "Ver flashcards e material visual escrito", type: "visual" },
      { value: "b", label: "Ouvir áudios e praticar conversação", type: "auditivo" },
      { value: "c", label: "Usar o idioma em situações práticas reais", type: "cinestesico" },
    ],
  },
  {
    id: 27,
    text: "Em seu tempo livre, você mais gosta de:",
    options: [
      { value: "a", label: "Ver exposições de arte, museus ou galerias", type: "visual" },
      { value: "b", label: "Ir a shows, concertos ou ouvir podcasts", type: "auditivo" },
      { value: "c", label: "Praticar esportes, dançar ou fazer artesanato", type: "cinestesico" },
    ],
  },
  {
    id: 28,
    text: "Ao dar feedback para alguém, você:",
    options: [
      { value: "a", label: "Mostra exemplos visuais do que pode melhorar", type: "visual" },
      { value: "b", label: "Explica verbalmente com detalhes e clareza", type: "auditivo" },
      { value: "c", label: "Demonstra fisicamente ou usa metáforas práticas", type: "cinestesico" },
    ],
  },
  {
    id: 29,
    text: "Quando está feliz, você expressa isso:",
    options: [
      { value: "a", label: "Com sorrisos amplos e expressões faciais", type: "visual" },
      { value: "b", label: "Falando animadamente e rindo alto", type: "auditivo" },
      { value: "c", label: "Com gestos, abraços e movimento", type: "cinestesico" },
    ],
  },
  {
    id: 30,
    text: "Para entender um conceito abstrato, você:",
    options: [
      { value: "a", label: "Precisa ver representações visuais e diagramas", type: "visual" },
      { value: "b", label: "Precisa que alguém explique com palavras", type: "auditivo" },
      { value: "c", label: "Precisa aplicar em exemplos práticos concretos", type: "cinestesico" },
    ],
  },
];

interface Result {
  primary: "visual" | "auditivo" | "cinestesico";
  scores: {
    visual: number;
    auditivo: number;
    cinestesico: number;
  };
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Test = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<Result | null>(null);
  const [sessionId, setSessionId] = useState<string>("");
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);

  // Gera ou recupera session ID
  useEffect(() => {
    let id = localStorage.getItem("test_session_id");
    if (!id) {
      id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("test_session_id", id);
    }
    setSessionId(id);
    loadProgress(id);
  }, []);

  const shuffledQuestions = useMemo(() => {
    return shuffleArray(questions).map(question => ({
      ...question,
      options: shuffleArray(question.options)
    }));
  }, []);
  
  const progress = ((currentQuestion + 1) / shuffledQuestions.length) * 100;

  // Formata o tempo decorrido
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer effect
  useEffect(() => {
    if (!result && startTime) {
      const interval = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        setElapsedTime(elapsed);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [result, startTime]);

  // Carrega o progresso salvo
  const loadProgress = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("test_progress")
        .select("*")
        .eq("session_id", id)
        .maybeSingle();

      if (data && !error) {
        setCurrentQuestion(data.current_question);
        setAnswers(data.answers as Record<number, string>);
        
        // Calcula o tempo decorrido desde o início
        if (data.start_time) {
          const start = new Date(data.start_time);
          setStartTime(start);
          const now = new Date();
          const elapsed = Math.floor((now.getTime() - start.getTime()) / 1000);
          setElapsedTime(elapsed);
        }
      } else {
        // Se não há progresso salvo, define o tempo de início como agora
        const now = new Date();
        setStartTime(now);
      }
    } catch (error) {
      console.error("Erro ao carregar progresso:", error);
    } finally {
      setIsLoadingProgress(false);
    }
  };

  // Salva o progresso automaticamente
  const saveProgress = async (question: number, currentAnswers: Record<number, string>) => {
    if (!sessionId) return;

    try {
      const { error } = await supabase
        .from("test_progress")
        .upsert({
          session_id: sessionId,
          current_question: question,
          answers: currentAnswers,
          start_time: startTime?.toISOString(),
        }, {
          onConflict: "session_id"
        });

      if (error) {
        console.error("Erro ao salvar progresso:", error);
      }
    } catch (error) {
      console.error("Erro ao salvar progresso:", error);
    }
  };

  // Limpa o progresso ao finalizar
  const clearProgress = async () => {
    if (!sessionId) return;

    try {
      await supabase
        .from("test_progress")
        .delete()
        .eq("session_id", sessionId);
      
      localStorage.removeItem("test_session_id");
    } catch (error) {
      console.error("Erro ao limpar progresso:", error);
    }
  };

  const handleAnswer = (questionId: number, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    
    // Avança automaticamente após selecionar uma resposta
    setTimeout(() => {
      if (currentQuestion < shuffledQuestions.length - 1) {
        const nextQuestion = currentQuestion + 1;
        setCurrentQuestion(nextQuestion);
        saveProgress(nextQuestion, newAnswers);
      } else {
        calculateResult(newAnswers);
      }
    }, 400); // Delay de 400ms para dar feedback visual
  };

  const handleNext = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      saveProgress(nextQuestion, answers);
    } else {
      calculateResult(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const prevQuestion = currentQuestion - 1;
      setCurrentQuestion(prevQuestion);
      saveProgress(prevQuestion, answers);
    }
  };

  const calculateResult = async (currentAnswers: Record<number, string> = answers) => {
    const scores = { visual: 0, auditivo: 0, cinestesico: 0 };

    shuffledQuestions.forEach((question) => {
      const answer = currentAnswers[question.id];
      if (answer) {
        const option = question.options.find((opt) => opt.value === answer);
        if (option) {
          scores[option.type]++;
        }
      }
    });

    const primary = Object.entries(scores).reduce((a, b) => (b[1] > a[1] ? b : a))[0] as
      | "visual"
      | "auditivo"
      | "cinestesico";

    setResult({ primary, scores });
    
    // Limpa o progresso após finalizar
    await clearProgress();
  };

  const generatePDF = async () => {
    if (!result) return;

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

    // Configuração de cores
    const colors = {
      primary: [147, 51, 234] as [number, number, number], // purple-600
      secondary: [236, 72, 153] as [number, number, number], // pink-500
      accent: [6, 182, 212] as [number, number, number], // cyan-500
      dark: [31, 41, 55] as [number, number, number], // gray-800
      light: [243, 244, 246] as [number, number, number], // gray-100
      visual: [168, 85, 247] as [number, number, number], // purple-500
      auditivo: [6, 182, 212] as [number, number, number], // cyan-500
      cinestesico: [249, 115, 22] as [number, number, number], // orange-500
    };

    const profileConfig = {
      visual: { name: "Visual", color: colors.visual, emoji: "👁️" },
      auditivo: { name: "Auditivo", color: colors.auditivo, emoji: "👂" },
      cinestesico: { name: "Cinestésico", color: colors.cinestesico, emoji: "✋" },
    };

    const config = profileConfig[result.primary];
    const total = shuffledQuestions.length;
    const percentages = {
      visual: Math.round((result.scores.visual / total) * 100),
      auditivo: Math.round((result.scores.auditivo / total) * 100),
      cinestesico: Math.round((result.scores.cinestesico / total) * 100),
    };

    // ============= PÁGINA 1: CAPA =============
    // Gradiente de fundo (simulado com retângulos)
    doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.rect(0, 0, pageWidth, 80, "F");
    
    doc.setFillColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
    doc.circle(pageWidth - 20, 60, 40, "F");
    
    doc.setFillColor(colors.accent[0], colors.accent[1], colors.accent[2]);
    doc.circle(20, pageHeight - 40, 50, "F");

    // Logo/Título principal
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(36);
    doc.setFont("Roboto", "bold");
    doc.text("DialogaMente", pageWidth / 2, 40, { align: "center" });

    doc.setFontSize(14);
    doc.setFont("Roboto", "normal");
    doc.text("Relatório de Análise de Perfil de Comunicação", pageWidth / 2, 55, { align: "center" });

    // Card central com resultado
    yPos = 100;
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(20, yPos, pageWidth - 40, 70, 5, 5, "F");
    
    // Sombra do card (simulada)
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

    // Data e informações
    yPos = 185;
    doc.setFontSize(10);
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    doc.text(`Data da Avaliação: ${new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}`, pageWidth / 2, yPos, { align: "center" });
    doc.text(`Total de Questões: ${total}`, pageWidth / 2, yPos + 7, { align: "center" });

    // Rodapé decorativo
    doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.rect(0, pageHeight - 15, pageWidth, 15, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text("Desenvolvido por Pedro Diogo - Soluções Tecnológicas", pageWidth / 2, pageHeight - 8, { align: "center" });

    // ============= PÁGINA 2: ANÁLISE DETALHADA =============
    doc.addPage();
    yPos = 20;

    // Cabeçalho
    doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.rect(0, 0, pageWidth, 35, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("Roboto", "bold");
    doc.text("Análise Detalhada dos Resultados", pageWidth / 2, 22, { align: "center" });

    yPos = 50;

    // Gráfico de barras horizontais
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
    ].forEach((item, index) => {
      const barWidth = (percentages[item.key] / 100) * maxBarWidth;
      
      // Label
      doc.setFontSize(11);
      doc.setFont("Roboto", "bold");
      doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
      doc.text(item.label, 20, yPos + 8);

      // Barra de fundo
      doc.setFillColor(colors.light[0], colors.light[1], colors.light[2]);
      doc.roundedRect(60, yPos, maxBarWidth, barHeight, 2, 2, "F");

      // Barra de progresso
      doc.setFillColor(item.color[0], item.color[1], item.color[2]);
      doc.roundedRect(60, yPos, barWidth, barHeight, 2, 2, "F");

      // Porcentagem
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      if (barWidth > 15) {
        doc.text(`${percentages[item.key]}%`, 65, yPos + 8);
      } else {
        doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
        doc.text(`${percentages[item.key]}%`, 65 + barWidth, yPos + 8);
      }

      // Pontuação
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(9);
      doc.text(`${result.scores[item.key]}/${total}`, pageWidth - 25, yPos + 8);

      yPos += barHeight + 8;
    });

    yPos += 10;

    // Tabela de resultados detalhados
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

    // ============= PÁGINA 3: SOBRE O PERFIL =============
    doc.addPage();
    yPos = 20;

    // Cabeçalho
    doc.setFillColor(config.color[0], config.color[1], config.color[2]);
    doc.rect(0, 0, pageWidth, 35, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(`Perfil ${config.name}`, pageWidth / 2, 22, { align: "center" });

    yPos = 50;

    // Descrição do perfil
    doc.setFontSize(12);
     doc.setFont("Roboto", "bold");
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    doc.text("Características do seu perfil:", 20, yPos);

    yPos += 8;
    doc.setFontSize(10);
     doc.setFont("Roboto", "normal");
    
    const descriptions = {
      visual: "Você aprende melhor através de imagens, gráficos, diagramas e representações visuais. Prefere ver as informações organizadas espacialmente e tem facilidade para lembrar rostos e lugares.",
      auditivo: "Você aprende melhor ouvindo explicações, discussões e instruções verbais. Prefere processar informações através da escuta e tem facilidade para lembrar conversas e sons.",
      cinestesico: "Você aprende melhor através da prática, movimento e experiência direta. Prefere aprender fazendo e tem facilidade para lembrar sensações e experiências vividas.",
    };

    const splitDescription = doc.splitTextToSize(descriptions[result.primary], pageWidth - 40);
    doc.text(splitDescription, 20, yPos);

    yPos += splitDescription.length * 5 + 10;

    // Pontos fortes
    doc.setFillColor(colors.light[0], colors.light[1], colors.light[2]);
    doc.roundedRect(20, yPos, pageWidth - 40, 50, 3, 3, "F");
    
    doc.setFontSize(11);
     doc.setFont("Roboto", "bold");
    doc.setTextColor(config.color[0], config.color[1], config.color[2]);
    doc.text("✓ Pontos Fortes", 25, yPos + 10);

    doc.setFontSize(9);
     doc.setFont("Roboto", "normal");
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);

    const strengths = {
      visual: [
        "• Excelente memória visual",
        "• Facilidade com gráficos e diagramas",
        "• Boa organização espacial",
        "• Atenção aos detalhes visuais",
      ],
      auditivo: [
        "• Excelente comunicação verbal",
        "• Boa capacidade de escuta",
        "• Facilidade com idiomas",
        "• Memória auditiva desenvolvida",
      ],
      cinestesico: [
        "• Aprendizado através da prática",
        "• Boa coordenação motora",
        "• Facilidade com atividades físicas",
        "• Memória de experiências",
      ],
    };

    let strengthY = yPos + 18;
    strengths[result.primary].forEach((strength) => {
      doc.text(strength, 25, strengthY);
      strengthY += 6;
    });

    yPos += 60;

    // Pontos fracos a serem melhorados
    doc.setFillColor(255, 245, 240);
    doc.roundedRect(20, yPos, pageWidth - 40, 50, 3, 3, "F");
    
    doc.setFontSize(11);
     doc.setFont("Roboto", "bold");
    doc.setTextColor(config.color[0], config.color[1], config.color[2]);
    doc.text("⚠ Pontos Fracos a Serem Melhorados", 25, yPos + 10);

    doc.setFontSize(9);
     doc.setFont("Roboto", "normal");
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);

    const weaknesses = {
      visual: [
        "• Pode ter dificuldade em processar informações puramente verbais",
        "• Pode perder foco em apresentações sem recursos visuais",
        "• Pode precisar de mais tempo em situações que exigem apenas escuta",
        "• Pode ter desafios em ambientes com muitos estímulos visuais",
      ],
      auditivo: [
        "• Pode ter dificuldade em ambientes barulhentos ou muito silenciosos",
        "• Pode perder informações importantes em materiais puramente visuais",
        "• Pode ter desafios com atividades que exigem leitura extensiva",
        "• Pode precisar de apoio para organização espacial e visual",
      ],
      cinestesico: [
        "• Pode ter dificuldade em permanecer sentado por longos períodos",
        "• Pode perder foco em aulas teóricas sem atividades práticas",
        "• Pode ter desafios em situações que exigem apenas observação",
        "• Pode precisar de mais tempo para processar informações abstratas",
      ],
    };

    let weaknessY = yPos + 18;
    weaknesses[result.primary].forEach((weakness) => {
      doc.text(weakness, 25, weaknessY);
      weaknessY += 6;
    });

    // Rodapé
    doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.rect(0, pageHeight - 15, pageWidth, 15, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text("DialogaMente - Relatório Profissional", pageWidth / 2, pageHeight - 8, { align: "center" });

    // ============= PÁGINA 4-5: DICAS PERSONALIZADAS =============
    const tips = {
      visual: [
        "Use mapas mentais e diagramas para organizar informações complexas e hierarquizar conceitos",
        "Destaque informações importantes com cores e marcadores visuais diferentes para cada categoria",
        "Assista vídeos educativos, tutoriais visuais e demonstrações práticas sempre que possível",
        "Organize seu espaço de trabalho de forma visualmente agradável com quadros, gráficos e referências visuais",
        "Crie esquemas e fluxogramas para processos complexos, facilitando a compreensão do todo",
        "Utilize ferramentas como Miro, Canva ou Lucidchart para criar visualizações profissionais",
        "Prefira apresentações com slides bem estruturados, imagens de alta qualidade e infográficos",
        "Faça anotações usando técnicas visuais como sketchnotes e desenhos explicativos",
        "Use códigos de cores consistentes para categorizar e organizar informações no seu dia a dia",
        "Transforme listas de tarefas em quadros Kanban visuais (tipo Trello) para melhor acompanhamento",
      ],
      auditivo: [
        "Grave aulas, reuniões e palestras importantes para revisar e consolidar o aprendizado",
        "Participe ativamente de discussões em grupo, seminários e debates sobre os temas estudados",
        "Leia textos em voz alta para melhor retenção e compreensão do conteúdo",
        "Use podcasts, audiobooks e aulas em áudio como principais ferramentas de aprendizado",
        "Explique conceitos verbalmente para outras pessoas ou grave áudios explicando para você mesmo",
        "Crie músicas, rimas ou mnemônicos sonoros para memorizar informações importantes",
          "Prefira ambientes de estudo com música ambiente apropriada ou utilize áudios binaurais para concentração",
        "Participe de grupos de estudo onde você possa discutir e verbalizar suas dúvidas",
        "Use aplicativos de notas de voz para registrar ideias e insights no momento que surgem",
        "Assista a videoaulas com áudio de qualidade e preste atenção especial às explicações verbais",
      ],
      cinestesico: [
        "Pratique ativamente o que está aprendendo através de exercícios, simulações e aplicações reais",
        "Use exemplos concretos do mundo real e crie conexões com experiências práticas do seu cotidiano",
        "Faça pausas regulares a cada 25-30 minutos para se movimentar e reativar a concentração",
        "Crie projetos hands-on, experimentos práticos e protótipos para fixar conceitos teóricos",
        "Tome notas manuscritas durante o aprendizado, pois o ato físico de escrever ajuda na memorização",
        "Use objetos manipuláveis como blocos, post-its e materiais tácteis para organizar ideias",
        "Experimente estudar caminhando ou em movimento, combinando atividade física com aprendizado",
        "Participe de workshops, laboratórios práticos e atividades que envolvam fazer e experimentar",
        "Crie modelos físicos, maquetes ou representações tridimensionais de conceitos abstratos",
        "Utilize técnicas como role-playing e simulações para vivenciar situações de aprendizado",
      ],
    };

    doc.addPage();
    yPos = 20;

    // Cabeçalho
    doc.setFillColor(config.color[0], config.color[1], config.color[2]);
    doc.rect(0, 0, pageWidth, 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
     doc.setFont("Roboto", "bold");
    doc.text("Dicas Para Otimizar Sua Comunicação", pageWidth / 2, 19, { align: "center" });

    yPos = 42;

    tips[result.primary].forEach((tip, index) => {
      // Card da dica - mais compacto
      doc.setFillColor(250, 250, 250);
      doc.roundedRect(20, yPos, pageWidth - 40, 16, 2, 2, "F");

      // Número da dica - menor
      doc.setFillColor(config.color[0], config.color[1], config.color[2]);
      doc.circle(26, yPos + 8, 3.5, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(7);
       doc.setFont("Roboto", "bold");
      doc.text(`${index + 1}`, 26, yPos + 9, { align: "center" });

      // Texto da dica - menor fonte e mais compacto
      doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
      doc.setFontSize(7.5);
       doc.setFont("Roboto", "normal");
      const splitTip = doc.splitTextToSize(tip, pageWidth - 55);
      doc.text(splitTip, 33, yPos + 6);

      yPos += 19;
    });

    // Rodapé em todas as páginas de dicas
    doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.rect(0, pageHeight - 15, pageWidth, 15, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text("DialogaMente - Relatório Profissional", pageWidth / 2, pageHeight - 8, { align: "center" });

    // ============= PÁGINA FINAL: CONCLUSÃO =============
    doc.addPage();
    yPos = 20;

    // Cabeçalho
    doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.rect(0, 0, pageWidth, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
     doc.setFont("Roboto", "bold");
    doc.text("Próximos Passos", pageWidth / 2, 28, { align: "center" });

    yPos = 60;

    // Card de conclusão
    doc.setFillColor(250, 250, 255);
    doc.roundedRect(20, yPos, pageWidth - 40, 80, 5, 5, "F");
    doc.setDrawColor(config.color[0], config.color[1], config.color[2]);
    doc.setLineWidth(1);
    doc.roundedRect(20, yPos, pageWidth - 40, 80, 5, 5, "S");

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(config.color[0], config.color[1], config.color[2]);
    doc.text("Parabéns por concluir a avaliação!", pageWidth / 2, yPos + 15, { align: "center" });

    doc.setFontSize(10);
     doc.setFont("Roboto", "normal");
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    const conclusionText = [
      "Agora que você conhece seu perfil de comunicação predominante,",
      "utilize estas informações para:",
      "",
      "✓ Melhorar sua forma de aprender e absorver novos conhecimentos",
      "✓ Comunicar-se de forma mais efetiva com diferentes pessoas",
      "✓ Adaptar suas estratégias de estudo e trabalho",
      "✓ Desenvolver suas habilidades de comunicação",
    ];

    let textY = yPos + 30;
    conclusionText.forEach((line) => {
      doc.text(line, pageWidth / 2, textY, { align: "center" });
      textY += 6;
    });

    // Marca d'água / Logo final
    yPos = 160;
    doc.setFillColor(config.color[0], config.color[1], config.color[2]);
    doc.setGState(doc.GState({ opacity: 0.1 }));
    doc.circle(pageWidth / 2, yPos + 30, 40, "F");
    doc.setGState(doc.GState({ opacity: 1 }));

    doc.setFontSize(48);
     doc.setFont("Roboto", "bold");
    doc.setTextColor(config.color[0], config.color[1], config.color[2]);
    doc.text(config.name, pageWidth / 2, yPos + 40, { align: "center" });

    // Rodapé final premium
    yPos = pageHeight - 50;
    doc.setFillColor(colors.dark[0], colors.dark[1], colors.dark[2]);
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

    // Salvar PDF
    doc.save(`DialogaMente-resultado-${result.primary}-${new Date().getTime()}.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = async () => {
    if (!result) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const colors = {
      primary: [147, 51, 234] as [number, number, number],
      secondary: [236, 72, 153] as [number, number, number],
      accent: [6, 182, 212] as [number, number, number],
      dark: [88, 28, 135] as [number, number, number],
    };

    doc.addFont("/fonts/Roboto-Regular.ttf", "Roboto", "normal");
    doc.addFont("/fonts/Roboto-Bold.ttf", "Roboto", "bold");

    const config = {
      visual: { name: "Visual" },
      auditivo: { name: "Auditivo" },
      cinestesico: { name: "Cinestésico" },
    };

    const total = shuffledQuestions.length;
    const percentages = {
      visual: Math.round((result.scores.visual / total) * 100),
      auditivo: Math.round((result.scores.auditivo / total) * 100),
      cinestesico: Math.round((result.scores.cinestesico / total) * 100),
    };

    doc.setFillColor(...colors.primary);
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
    
    doc.setTextColor(...colors.primary);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Seu Perfil Comunicativo", 20, 30);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("Roboto", "normal");
    doc.text(`Perfil Predominante: ${result.primary.toUpperCase()}`, 20, 45);
    doc.text(`Força do Perfil: ${percentages[result.primary]}%`, 20, 55);

    autoTable(doc, {
      startY: 70,
      head: [["Perfil", "Pontuação", "Porcentagem"]],
      body: [
        ["Visual", result.scores.visual.toString(), `${percentages.visual}%`],
        ["Auditivo", result.scores.auditivo.toString(), `${percentages.auditivo}%`],
        ["Cinestésico", result.scores.cinestesico.toString(), `${percentages.cinestesico}%`],
      ],
      theme: "grid",
      headStyles: { fillColor: colors.primary },
    });

    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      const yPos = pageHeight - 50;

      doc.setFillColor(...colors.dark);
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
    const fileName = `DialogaMente-resultado-${result.primary}-${new Date().getTime()}.pdf`;

    // Try native Web Share API first
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([pdfBlob], fileName, { type: 'application/pdf' })] })) {
      try {
        const file = new File([pdfBlob], fileName, { type: 'application/pdf' });
        await navigator.share({
          title: 'Meu Resultado DialogaMente',
          text: `Confira meu perfil comunicativo: ${config[result.primary].name} (${percentages[result.primary]}%)`,
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
      `Perfil Predominante: ${config[result.primary].name}\n` +
      `Força: ${percentages[result.primary]}%\n\n` +
      `📊 Pontuações:\n` +
      `👁️ Visual: ${result.scores.visual} (${percentages.visual}%)\n` +
      `👂 Auditivo: ${result.scores.auditivo} (${percentages.auditivo}%)\n` +
      `✋ Cinestésico: ${result.scores.cinestesico} (${percentages.cinestesico}%)\n\n` +
      `Análise Profissional de Perfil Comunicativo`
    );
    
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  if (result) {
    const profileConfig = {
      visual: {
        name: "Visual",
        icon: Eye,
        gradient: "from-purple-500 to-pink-500",
        description: "Você aprende melhor através de imagens, gráficos, diagramas e representações visuais. Prefere ver as informações organizadas espacialmente e tem facilidade para lembrar rostos e lugares.",
        tips: [
          "Use mapas mentais e diagramas para organizar informações complexas e hierarquizar conceitos",
          "Destaque informações importantes com cores e marcadores visuais diferentes para cada categoria",
          "Assista vídeos educativos, tutoriais visuais e demonstrações práticas sempre que possível",
          "Organize seu espaço de trabalho de forma visualmente agradável com quadros, gráficos e referências visuais",
          "Crie esquemas e fluxogramas para processos complexos, facilitando a compreensão do todo",
          "Utilize ferramentas como Miro, Canva ou Lucidchart para criar visualizações profissionais",
          "Prefira apresentações com slides bem estruturados, imagens de alta qualidade e infográficos",
          "Faça anotações usando técnicas visuais como sketchnotes e desenhos explicativos",
          "Use códigos de cores consistentes para categorizar e organizar informações no seu dia a dia",
          "Transforme listas de tarefas em quadros Kanban visuais (tipo Trello) para melhor acompanhamento",
        ],
      },
      auditivo: {
        name: "Auditivo",
        icon: Ear,
        gradient: "from-cyan-500 to-blue-500",
        description: "Você aprende melhor ouvindo explicações, discussões e instruções verbais. Prefere processar informações através da escuta e tem facilidade para lembrar conversas e sons.",
        tips: [
          "Grave aulas, reuniões e palestras importantes para revisar e consolidar o aprendizado",
          "Participe ativamente de discussões em grupo, seminários e debates sobre os temas estudados",
          "Leia textos em voz alta para melhor retenção e compreensão do conteúdo",
          "Use podcasts, audiobooks e aulas em áudio como principais ferramentas de aprendizado",
          "Explique conceitos verbalmente para outras pessoas ou grave áudios explicando para você mesmo",
          "Crie músicas, rimas ou mnemônicos sonoros para memorizar informações importantes",
          "Prefira ambientes de estudo com música ambiente apropriada ou utilize áudios binaurais para concentração",
          "Participe de grupos de estudo onde você possa discutir e verbalizar suas dúvidas",
          "Use aplicativos de notas de voz para registrar ideias e insights no momento que surgem",
          "Assista a videoaulas com áudio de qualidade e preste atenção especial às explicações verbais",
        ],
      },
      cinestesico: {
        name: "Cinestésico",
        icon: Hand,
        gradient: "from-orange-500 to-red-500",
        description: "Você aprende melhor através da prática, movimento e experiência direta. Prefere aprender fazendo e tem facilidade para lembrar sensações e experiências vividas.",
        tips: [
          "Pratique ativamente o que está aprendendo através de exercícios, simulações e aplicações reais",
          "Use exemplos concretos do mundo real e crie conexões com experiências práticas do seu cotidiano",
          "Faça pausas regulares a cada 25-30 minutos para se movimentar e reativar a concentração",
          "Crie projetos hands-on, experimentos práticos e protótipos para fixar conceitos teóricos",
          "Tome notas manuscritas durante o aprendizado, pois o ato físico de escrever ajuda na memorização",
          "Use objetos manipuláveis como blocos, post-its e materiais tácteis para organizar ideias",
          "Experimente estudar caminhando ou em movimento, combinando atividade física com aprendizado",
          "Participe de workshops, laboratórios práticos e atividades que envolvam fazer e experimentar",
          "Crie modelos físicos, maquetes ou representações tridimensionais de conceitos abstratos",
          "Utilize técnicas como role-playing e simulações para vivenciar situações de aprendizado",
        ],
      },
    };

    const config = profileConfig[result.primary];
    const total = shuffledQuestions.length;
    const percentages = {
      visual: Math.round((result.scores.visual / total) * 100),
      auditivo: Math.round((result.scores.auditivo / total) * 100),
      cinestesico: Math.round((result.scores.cinestesico / total) * 100),
    };

    const IconComponent = config.icon;

    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-purple-50/30 to-cyan-50/20">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 py-12 max-w-5xl">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")} 
            className="mb-6 no-print hover:bg-purple-50 dark:hover:bg-purple-950/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Início
          </Button>

          <div className="space-y-8">
            {/* Header Card */}
            <Card className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-purple-50/80 dark:from-gray-900/80 dark:to-purple-950/80 border-purple-200/50 dark:border-purple-800/50 shadow-[0_30px_90px_-20px_rgba(168,85,247,0.4)] animate-scale-in">
              <CardHeader className="text-center space-y-4 pb-8">
                <div className="flex justify-center mb-6">
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-700 scale-150 animate-glow`}></div>
                    <div className="relative backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 p-10 rounded-[2rem] border border-purple-200/50 dark:border-purple-800/50">
                      <IconComponent className="w-20 h-20 text-purple-600" />
                    </div>
                  </div>
                </div>

                <CardTitle className="text-4xl md:text-5xl font-display font-bold">
                  <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                    Seu Resultado
                  </span>
                </CardTitle>
                <CardDescription className="text-lg">
                  Teste concluído em {new Date().toLocaleDateString("pt-BR")}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Profile Badge */}
                <div className="text-center p-8 backdrop-blur-xl bg-gradient-to-br from-white/60 to-purple-50/60 dark:from-gray-900/60 dark:to-purple-950/60 rounded-2xl border border-purple-200/50 dark:border-purple-800/50 animate-fade-up">
                  <h2 className="text-xl font-display font-semibold mb-3 text-muted-foreground">Perfil Predominante</h2>
                  <p className={`text-5xl md:text-6xl font-display font-bold mb-4 bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
                    {config.name}
                  </p>
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <span className="text-3xl font-bold text-purple-600">{percentages[result.primary]}%</span>
                    <span className="text-sm text-muted-foreground">de afinidade</span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
                  <h3 className="text-2xl font-display font-semibold flex items-center gap-2">
                    <Target className="w-6 h-6 text-purple-600" />
                    Sobre Seu Perfil
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{config.description}</p>
                </div>

                {/* Scores */}
                <div className="space-y-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                  <h3 className="text-2xl font-display font-semibold flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                    Pontuação Detalhada
                  </h3>
                  <div className="space-y-4">
                    {[
                      { key: "visual" as const, label: "Visual", icon: Eye },
                      { key: "auditivo" as const, label: "Auditivo", icon: Ear },
                      { key: "cinestesico" as const, label: "Cinestésico", icon: Hand },
                    ].map(({ key, label, icon: ScoreIcon }) => (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <ScoreIcon className="w-5 h-5 text-purple-600" />
                            <span className="font-semibold">{label}</span>
                          </div>
                          <span className="text-muted-foreground font-medium">
                            {result.scores[key]}/{total} ({percentages[key]}%)
                          </span>
                        </div>
                        <div className="relative h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div 
                            className={`absolute inset-y-0 left-0 bg-gradient-to-r ${profileConfig[key].gradient} rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: `${percentages[key]}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strengths */}
                <div className="strengths-section space-y-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-display font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Pontos Fortes
                    </h3>
                  </div>
                  <div className="grid gap-4">
                    {result.primary === "visual" && (
                      <>
                        <div className="flex items-start gap-4 p-5 backdrop-blur-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200/50 dark:border-green-700/50 hover:shadow-[0_10px_30px_-10px_rgba(34,197,94,0.3)] transition-all duration-300 group">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mt-2 group-hover:scale-125 transition-transform"></div>
                          <p className="text-base text-foreground/90 leading-relaxed">Excelente memória visual para rostos, lugares e detalhes</p>
                        </div>
                        <div className="flex items-start gap-4 p-5 backdrop-blur-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200/50 dark:border-green-700/50 hover:shadow-[0_10px_30px_-10px_rgba(34,197,94,0.3)] transition-all duration-300 group">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mt-2 group-hover:scale-125 transition-transform"></div>
                          <p className="text-base text-foreground/90 leading-relaxed">Capacidade de organizar informações espacialmente</p>
                        </div>
                        <div className="flex items-start gap-4 p-5 backdrop-blur-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200/50 dark:border-green-700/50 hover:shadow-[0_10px_30px_-10px_rgba(34,197,94,0.3)] transition-all duration-300 group">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mt-2 group-hover:scale-125 transition-transform"></div>
                          <p className="text-base text-foreground/90 leading-relaxed">Habilidade para criar e interpretar diagramas e gráficos</p>
                        </div>
                        <div className="flex items-start gap-4 p-5 backdrop-blur-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200/50 dark:border-green-700/50 hover:shadow-[0_10px_30px_-10px_rgba(34,197,94,0.3)] transition-all duration-300 group">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mt-2 group-hover:scale-125 transition-transform"></div>
                          <p className="text-base text-foreground/90 leading-relaxed">Facilidade para visualizar conceitos abstratos</p>
                        </div>
                      </>
                    )}
                    {result.primary === "auditivo" && (
                      <>
                        <div className="flex items-start gap-4 p-5 backdrop-blur-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200/50 dark:border-green-700/50 hover:shadow-[0_10px_30px_-10px_rgba(34,197,94,0.3)] transition-all duration-300 group">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mt-2 group-hover:scale-125 transition-transform"></div>
                          <p className="text-base text-foreground/90 leading-relaxed">Excelente capacidade de compreensão através da escuta</p>
                        </div>
                        <div className="flex items-start gap-4 p-5 backdrop-blur-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200/50 dark:border-green-700/50 hover:shadow-[0_10px_30px_-10px_rgba(34,197,94,0.3)] transition-all duration-300 group">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mt-2 group-hover:scale-125 transition-transform"></div>
                          <p className="text-base text-foreground/90 leading-relaxed">Memória forte para conversas e instruções verbais</p>
                        </div>
                        <div className="flex items-start gap-4 p-5 backdrop-blur-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200/50 dark:border-green-700/50 hover:shadow-[0_10px_30px_-10px_rgba(34,197,94,0.3)] transition-all duration-300 group">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mt-2 group-hover:scale-125 transition-transform"></div>
                          <p className="text-base text-foreground/90 leading-relaxed">Habilidade para expressar ideias verbalmente</p>
                        </div>
                        <div className="flex items-start gap-4 p-5 backdrop-blur-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200/50 dark:border-green-700/50 hover:shadow-[0_10px_30px_-10px_rgba(34,197,94,0.3)] transition-all duration-300 group">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mt-2 group-hover:scale-125 transition-transform"></div>
                          <p className="text-base text-foreground/90 leading-relaxed">Facilidade para aprender através de discussões</p>
                        </div>
                      </>
                    )}
                    {result.primary === "cinestesico" && (
                      <>
                        <div className="flex items-start gap-4 p-5 backdrop-blur-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200/50 dark:border-green-700/50 hover:shadow-[0_10px_30px_-10px_rgba(34,197,94,0.3)] transition-all duration-300 group">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mt-2 group-hover:scale-125 transition-transform"></div>
                          <p className="text-base text-foreground/90 leading-relaxed">Excelente aprendizado através da prática hands-on</p>
                        </div>
                        <div className="flex items-start gap-4 p-5 backdrop-blur-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200/50 dark:border-green-700/50 hover:shadow-[0_10px_30px_-10px_rgba(34,197,94,0.3)] transition-all duration-300 group">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mt-2 group-hover:scale-125 transition-transform"></div>
                          <p className="text-base text-foreground/90 leading-relaxed">Memória forte para experiências vividas</p>
                        </div>
                        <div className="flex items-start gap-4 p-5 backdrop-blur-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200/50 dark:border-green-700/50 hover:shadow-[0_10px_30px_-10px_rgba(34,197,94,0.3)] transition-all duration-300 group">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mt-2 group-hover:scale-125 transition-transform"></div>
                          <p className="text-base text-foreground/90 leading-relaxed">Habilidade para aplicar conhecimento na prática</p>
                        </div>
                        <div className="flex items-start gap-4 p-5 backdrop-blur-xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200/50 dark:border-green-700/50 hover:shadow-[0_10px_30px_-10px_rgba(34,197,94,0.3)] transition-all duration-300 group">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mt-2 group-hover:scale-125 transition-transform"></div>
                          <p className="text-base text-foreground/90 leading-relaxed">Facilidade para tarefas que envolvem movimento</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Weaknesses */}
                <div className="weaknesses-section space-y-6 animate-fade-up" style={{ animationDelay: "0.35s" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-display font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      Áreas de Desenvolvimento
                    </h3>
                  </div>
                  <div className="grid gap-4">
                    {result.primary === "visual" && (
                      <>
                        <div className="flex items-start gap-4 p-5 backdrop-blur-xl bg-gradient-to-br from-orange-50/80 to-red-50/80 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200/50 dark:border-orange-700/50 hover:shadow-[0_10px_30px_-10px_rgba(249,115,22,0.3)] transition-all duration-300 group">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-orange-500 to-red-500 mt-2 group-hover:scale-125 transition-transform"></div>
                          <p className="text-base text-foreground/90 leading-relaxed">Pode ter dificuldade em processar informações puramente verbais</p>
                        </div>
                        <div className="flex items-start gap-4 p-5 backdrop-blur-xl bg-gradient-to-br from-orange-50/80 to-red-50/80 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200/50 dark:border-orange-700/50 hover:shadow-[0_10px_30px_-10px_rgba(249,115,22,0.3)] transition-all duration-300 group">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-orange-500 to-red-500 mt-2 group-hover:scale-125 transition-transform"></div>
                          <p className="text-base text-foreground/90 leading-relaxed">Pode perder foco em apresentações sem recursos visuais</p>
                        </div>
                        <div className="flex items-start gap-4 p-5 backdrop-blur-xl bg-gradient-to-br from-orange-50/80 to-red-50/80 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200/50 dark:border-orange-700/50 hover:shadow-[0_10px_30px_-10px_rgba(249,115,22,0.3)] transition-all duration-300 group">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-orange-500 to-red-500 mt-2 group-hover:scale-125 transition-transform"></div>
                          <p className="text-base text-foreground/90 leading-relaxed">Pode precisar de mais tempo em situações que exigem apenas escuta</p>
                        </div>
                        <div className="flex items-start gap-4 p-5 backdrop-blur-xl bg-gradient-to-br from-orange-50/80 to-red-50/80 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200/50 dark:border-orange-700/50 hover:shadow-[0_10px_30px_-10px_rgba(249,115,22,0.3)] transition-all duration-300 group">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-orange-500 to-red-500 mt-2 group-hover:scale-125 transition-transform"></div>
                          <p className="text-base text-foreground/90 leading-relaxed">Pode ter desafios em ambientes com muitos estímulos visuais</p>
                        </div>
                      </>
                    )}
                    {result.primary === "auditivo" && (
                      <>
                        <div className="flex items-start gap-4 p-5 backdrop-blur-xl bg-gradient-to-br from-orange-50/80 to-red-50/80 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200/50 dark:border-orange-700/50 hover:shadow-[0_10px_30px_-10px_rgba(249,115,22,0.3)] transition-all duration-300 group">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-orange-500 to-red-500 mt-2 group-hover:scale-125 transition-transform"></div>
                          <p className="text-base text-foreground/90 leading-relaxed">Pode ter dificuldade em ambientes barulhentos ou muito silenciosos</p>
                        </div>
                        <div className="flex items-start gap-4 p-5 backdrop-blur-xl bg-gradient-to-br from-orange-50/80 to-red-50/80 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200/50 dark:border-orange-700/50 hover:shadow-[0_10px_30px_-10px_rgba(249,115,22,0.3)] transition-all duration-300 group">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-orange-500 to-red-500 mt-2 group-hover:scale-125 transition-transform"></div>
                          <p className="text-base text-foreground/90 leading-relaxed">Pode perder informações importantes em materiais puramente visuais</p>
                        </div>
                        <div className="flex items-start gap-4 p-5 backdrop-blur-xl bg-gradient-to-br from-orange-50/80 to-red-50/80 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200/50 dark:border-orange-700/50 hover:shadow-[0_10px_30px_-10px_rgba(249,115,22,0.3)] transition-all duration-300 group">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-orange-500 to-red-500 mt-2 group-hover:scale-125 transition-transform"></div>
                          <p className="text-base text-foreground/90 leading-relaxed">Pode ter desafios com atividades que exigem leitura extensiva</p>
                        </div>
                        <div className="flex items-start gap-4 p-5 backdrop-blur-xl bg-gradient-to-br from-orange-50/80 to-red-50/80 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200/50 dark:border-orange-700/50 hover:shadow-[0_10px_30px_-10px_rgba(249,115,22,0.3)] transition-all duration-300 group">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-orange-500 to-red-500 mt-2 group-hover:scale-125 transition-transform"></div>
                          <p className="text-base text-foreground/90 leading-relaxed">Pode precisar de apoio para organização espacial e visual</p>
                        </div>
                      </>
                    )}
                    {result.primary === "cinestesico" && (
                      <>
                        <div className="flex items-start gap-4 p-5 backdrop-blur-xl bg-gradient-to-br from-orange-50/80 to-red-50/80 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200/50 dark:border-orange-700/50 hover:shadow-[0_10px_30px_-10px_rgba(249,115,22,0.3)] transition-all duration-300 group">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-orange-500 to-red-500 mt-2 group-hover:scale-125 transition-transform"></div>
                          <p className="text-base text-foreground/90 leading-relaxed">Pode ter dificuldade em permanecer sentado por longos períodos</p>
                        </div>
                        <div className="flex items-start gap-4 p-5 backdrop-blur-xl bg-gradient-to-br from-orange-50/80 to-red-50/80 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200/50 dark:border-orange-700/50 hover:shadow-[0_10px_30px_-10px_rgba(249,115,22,0.3)] transition-all duration-300 group">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-orange-500 to-red-500 mt-2 group-hover:scale-125 transition-transform"></div>
                          <p className="text-base text-foreground/90 leading-relaxed">Pode perder foco em aulas teóricas sem atividades práticas</p>
                        </div>
                        <div className="flex items-start gap-4 p-5 backdrop-blur-xl bg-gradient-to-br from-orange-50/80 to-red-50/80 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200/50 dark:border-orange-700/50 hover:shadow-[0_10px_30px_-10px_rgba(249,115,22,0.3)] transition-all duration-300 group">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-orange-500 to-red-500 mt-2 group-hover:scale-125 transition-transform"></div>
                          <p className="text-base text-foreground/90 leading-relaxed">Pode ter desafios em situações que exigem apenas observação</p>
                        </div>
                        <div className="flex items-start gap-4 p-5 backdrop-blur-xl bg-gradient-to-br from-orange-50/80 to-red-50/80 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200/50 dark:border-orange-700/50 hover:shadow-[0_10px_30px_-10px_rgba(249,115,22,0.3)] transition-all duration-300 group">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-orange-500 to-red-500 mt-2 group-hover:scale-125 transition-transform"></div>
                          <p className="text-base text-foreground/90 leading-relaxed">Pode precisar de mais tempo para processar informações abstratas</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Tips */}
                <div className="tips-section space-y-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
                  <h3 className="text-2xl font-display font-semibold flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                    Dicas Para Otimizar Sua Comunicação
                  </h3>
                  <div className="grid gap-3">
                    {config.tips.map((tip, index) => (
                      <div 
                        key={index} 
                        className="tip-item flex items-start gap-4 p-4 backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-xl border border-purple-200/50 dark:border-purple-800/50 hover:shadow-[0_10px_30px_-10px_rgba(168,85,247,0.3)] transition-all duration-300 group"
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-foreground/80 leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 no-print animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <ShareResultButton 
                result={result} 
                totalQuestions={shuffledQuestions.length}
              />
              <Button 
                onClick={generatePDF} 
                size="lg"
                className="flex-1 text-lg py-6 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-[0_20px_60px_-15px_rgba(168,85,247,0.5)] hover:shadow-[0_25px_80px_-15px_rgba(168,85,247,0.6)] transition-all duration-500 hover:scale-105"
              >
                <FileDown className="mr-2 h-5 w-5" />
                Baixar PDF
              </Button>
              <Button 
                onClick={handlePrint} 
                variant="outline" 
                size="lg"
                className="flex-1 text-lg py-6 rounded-xl border-2 hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-all duration-300"
              >
                <Printer className="mr-2 h-5 w-5" />
                Imprimir
              </Button>
            </div>

            <div className="text-center no-print animate-fade-up" style={{ animationDelay: "0.5s" }}>
              <Button 
                variant="ghost" 
                onClick={() => window.location.reload()}
                className="hover:bg-purple-50 dark:hover:bg-purple-950/20"
              >
                Refazer o Teste
              </Button>
            </div>

            {/* Review Form */}
            <div className="mt-12 no-print animate-fade-up" style={{ animationDelay: "0.6s" }}>
              <ReviewForm resultType={result.primary} />
            </div>

            {/* Premium Footer */}
            <footer className="text-center mt-8 animate-fade-up" style={{ animationDelay: "0.8s" }}>
              <div className="relative inline-block group">
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
          </div>
        </div>
      </div>
    );
  }

  const currentQ = shuffledQuestions[currentQuestion];

  // Mostra loading enquanto carrega o progresso
  if (isLoadingProgress) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-purple-50/30 to-cyan-50/20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
        </div>
        <div className="container relative z-10 mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
          <Card className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-purple-50/80 dark:from-gray-900/80 dark:to-purple-950/80 border-purple-200/50 dark:border-purple-800/50 shadow-[0_30px_90px_-20px_rgba(168,85,247,0.4)] p-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-lg text-muted-foreground">Carregando seu progresso...</p>
            </div>
          </Card>
        </div>
      </div>
    );
  }
  const isAnswered = !!answers[currentQ.id];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-purple-50/30 to-cyan-50/20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")} 
          className="mb-6 hover:bg-purple-50 dark:hover:bg-purple-950/20 animate-fade-in"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao Início
        </Button>

        <Card className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-purple-50/80 dark:from-gray-900/80 dark:to-purple-950/80 border-purple-200/50 dark:border-purple-800/50 shadow-[0_30px_90px_-20px_rgba(168,85,247,0.4)] animate-scale-in">
          <CardHeader className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <CardTitle className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Teste de Perfil de Comunicação
              </CardTitle>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30">
                  <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                    {formatTime(elapsedTime)}
                  </span>
                </div>
                <span className="text-sm font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300">
                  {currentQuestion + 1} / {shuffledQuestions.length}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground flex items-center gap-2 animate-fade-in">
              <Sparkles className="w-4 h-4 text-purple-500" />
              Seu progresso é salvo automaticamente. Relaxe e responda com calma!
            </p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progresso</span>
                <span className="font-semibold">{Math.round(progress)}%</span>
              </div>
              <div className="relative h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1 flex-wrap animate-fade-in">
                <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Salvo automaticamente
                </Badge>
                <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
                  <Clock className="w-3 h-3 mr-1" />
                  O contador é apenas informativo. Faça o teste no seu ritmo!
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="space-y-6 animate-fade-up">
              <h3 className="text-xl md:text-2xl font-display font-semibold leading-relaxed">{currentQ.text}</h3>

              <RadioGroup
                value={answers[currentQ.id] || ""}
                onValueChange={(value) => handleAnswer(currentQ.id, value)}
                className="space-y-3"
              >
                {currentQ.options.map((option, index) => (
                  <div
                    key={option.value}
                    className={`group relative flex items-start space-x-4 p-5 rounded-xl border-2 transition-all duration-300 cursor-pointer animate-slide-in ${
                      answers[currentQ.id] === option.value
                        ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 shadow-[0_10px_30px_-10px_rgba(168,85,247,0.3)]"
                        : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50/50 dark:hover:bg-purple-950/20"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <RadioGroupItem value={option.value} id={`q${currentQ.id}-${option.value}`} className="mt-1" />
                    <Label
                      htmlFor={`q${currentQ.id}-${option.value}`}
                      className="flex-1 cursor-pointer text-base leading-relaxed"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-between pt-6 gap-4">
              <Button 
                variant="outline" 
                onClick={handlePrevious} 
                disabled={currentQuestion === 0}
                size="lg"
                className="px-8 rounded-xl border-2 hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-all duration-300 disabled:opacity-50"
              >
                Anterior
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Test;
