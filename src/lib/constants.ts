export const SUPPORT_CONFIG = {
  whatsapp: {
    number: "+5521972525151",
    displayNumber: "(21) 97252-5151",
    link: "https://wa.me/5521972525151?text=Olá!%20Preciso%20de%20ajuda%20com%20o%20DialogaMente...",
  },
  email: "pedrodiogo.suporte@gmail.com",
  hours: {
    days: "Segunda a Sexta",
    time: "9h às 18h",
    full: "Segunda a Sexta, 9h às 18h",
    short: "Seg-Sex, 9h-18h",
  },
  responseTime: "24 horas úteis",
};

export const SUPPORT_SUBJECTS = [
  "Dúvida Técnica",
  "Pagamento",
  "Resultado do Teste",
  "Sugestão",
  "Outro",
] as const;

export const FAQ_DATA = [
  {
    category: "Conta",
    questions: [
      {
        q: "Como criar uma conta?",
        a: "Não é necessário criar conta! O teste é 100% gratuito e anônimo. Seu progresso é salvo automaticamente no navegador.",
      },
      {
        q: "Preciso fazer login?",
        a: "Não! Basta acessar o teste e começar. Seu progresso é salvo automaticamente e você pode continuar de onde parou.",
      },
    ],
  },
  {
    category: "Testes",
    questions: [
      {
        q: "Quanto tempo dura o teste?",
        a: "O teste completo leva entre 15 a 20 minutos. Você pode pausar e continuar depois sem perder seu progresso.",
      },
      {
        q: "Posso pausar e continuar depois?",
        a: "Sim! Seu progresso é salvo automaticamente. Você pode fechar o navegador e voltar quando quiser.",
      },
      {
        q: "Quantas perguntas são?",
        a: "São 60 questões distribuídas em 6 categorias diferentes para mapear seu perfil completo de comunicação.",
      },
    ],
  },
  {
    category: "Resultados",
    questions: [
      {
        q: "Quando recebo o resultado?",
        a: "Seu resultado é gerado imediatamente após finalizar o teste! Você pode visualizar, baixar em PDF e compartilhar na hora.",
      },
      {
        q: "Posso refazer o teste?",
        a: "Sim! Você pode fazer o teste quantas vezes quiser para acompanhar sua evolução.",
      },
      {
        q: "Como compartilhar meu resultado?",
        a: "Use o botão 'Compartilhar' na página de resultados para gerar um link único ou baixe o PDF para enviar.",
      },
    ],
  },
  {
    category: "Pagamentos",
    questions: [
      {
        q: "O teste é realmente grátis?",
        a: "Sim! O teste básico é 100% gratuito, sem período de teste ou cartão de crédito. Você só paga se quiser acessar análises avançadas.",
      },
      {
        q: "O que é o plano PRO?",
        a: "O plano PRO oferece análises mais detalhadas, comparação de perfis, relatórios avançados e suporte prioritário.",
      },
      {
        q: "Como usar um cupom?",
        a: "Na página de planos, procure pelo campo 'Cupom VIP' e insira seu código antes de finalizar a compra.",
      },
    ],
  },
  {
    category: "Suporte",
    questions: [
      {
        q: "Qual o horário de atendimento?",
        a: "Nossa equipe está disponível de Segunda a Sexta, das 9h às 18h. Mensagens recebidas fora desse horário serão respondidas no próximo dia útil.",
      },
      {
        q: "Como entrar em contato?",
        a: "Você pode nos contatar via WhatsApp (resposta mais rápida), email ou pelo formulário de contato. Todos os canais são monitorados pela nossa equipe.",
      },
    ],
  },
  {
    category: "Técnico",
    questions: [
      {
        q: "Funciona em celular?",
        a: "Sim! O DialogaMente é totalmente responsivo e funciona perfeitamente em smartphones, tablets e computadores.",
      },
      {
        q: "Meus dados estão seguros?",
        a: "Absolutamente! Utilizamos criptografia de ponta e não compartilhamos seus dados com terceiros. Suas respostas são anônimas.",
      },
    ],
  },
];
