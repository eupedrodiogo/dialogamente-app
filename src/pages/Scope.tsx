import { ScopeHeader } from "@/components/ScopeHeader";
import { ScopeSection } from "@/components/ScopeSection";
import { TableOfContents } from "@/components/TableOfContents";
import { Eye, Users, Route, Zap, Database, Lock, BarChart3, FileDown, Code, Server, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  const handleExport = () => {
    window.print();
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-purple-50/30 to-cyan-50/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }}></div>
      </div>

      <ScopeHeader onExport={handleExport} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="backdrop-blur-xl bg-gradient-to-br from-purple-600/90 to-pink-600/90 text-white rounded-3xl p-10 md:p-12 shadow-[0_30px_90px_-20px_rgba(168,85,247,0.5)] mb-12 animate-scale-in border border-purple-400/30">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Pronto para descobrir seu perfil de comunicação?</h2>
          <p className="text-lg md:text-xl mb-8 opacity-95 font-light">Faça o teste interativo e receba seu resultado personalizado em PDF.</p>
          <Button 
            onClick={() => navigate("/test")} 
            size="lg" 
            className="gap-2 bg-white text-purple-600 hover:bg-white/90 shadow-[0_20px_60px_-15px_rgba(255,255,255,0.5)] hover:shadow-[0_25px_80px_-15px_rgba(255,255,255,0.6)] transition-all duration-500 hover:scale-105 rounded-xl px-10 py-7 text-lg font-semibold"
          >
            Iniciar Teste Agora
          </Button>
        </div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <TableOfContents />
          </aside>

          <main className="lg:col-span-3 space-y-8">
            <ScopeSection 
              id="visao-geral" 
              title="1. Visão Geral do Produto"
              icon={Eye}
            >
              <h3 className="text-2xl font-semibold mb-4">Conceito</h3>
              <p className="mb-4">
                A plataforma <strong>Comunica-Visualiza</strong> é uma solução web inovadora que permite aos usuários 
                descobrir seu perfil de comunicação predominante através de um questionário interativo e baseado em 
                evidências científicas sobre processamento de informação.
              </p>
              
              <h3 className="text-2xl font-semibold mb-4 mt-6">Público-Alvo</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Estudantes:</strong> Buscando otimizar seus métodos de estudo e aprendizagem</li>
                <li><strong>Profissionais:</strong> Interessados em melhorar sua comunicação no ambiente de trabalho</li>
                <li><strong>Equipes Corporativas:</strong> Visando melhorar a colaboração e reduzir ruídos de comunicação</li>
                <li><strong>Educadores e Coaches:</strong> Querendo personalizar abordagens de ensino e mentoria</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4 mt-6">Problema Resolvido</h3>
              <p className="mb-4">
                Muitas pessoas e organizações enfrentam desafios de comunicação devido à falta de compreensão sobre 
                como preferem processar e compartilhar informação. A plataforma resolve este problema oferecendo:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Autoconhecimento sobre preferências de comunicação pessoal</li>
                <li>Insights práticos para melhorar interações profissionais e acadêmicas</li>
                <li>Redução de mal-entendidos em equipes com estilos diversos</li>
                <li>Direcionamento para escolha de ferramentas e métodos de comunicação mais eficazes</li>
              </ul>
            </ScopeSection>

            <ScopeSection 
              id="jornada" 
              title="2. Jornada do Usuário" 
              icon={Route}
            >
              <div className="space-y-6">
                <div className="bg-accent/20 p-6 rounded-lg border-l-4 border-primary">
                  <h4 className="font-bold text-lg mb-2">Etapa 1: Descoberta e Cadastro</h4>
                  <p className="mb-2">O usuário acessa a landing page e é apresentado ao valor da plataforma.</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Visualiza benefícios claros e exemplos de resultados</li>
                    <li>Clica em "Começar Teste" ou "Criar Conta"</li>
                    <li>Escolhe entre cadastro por email/senha ou login social (Google)</li>
                    <li>Recebe confirmação por email (opcional, mas recomendado)</li>
                  </ul>
                </div>

                <div className="bg-accent/20 p-6 rounded-lg border-l-4 border-primary">
                  <h4 className="font-bold text-lg mb-2">Etapa 2: Realização do Questionário</h4>
                  <p className="mb-2">Após login, o usuário inicia o teste interativo.</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Interface apresenta perguntas de múltipla escolha, uma por vez</li>
                    <li>Barra de progresso indica o avanço (ex: "Pergunta 5 de 20")</li>
                    <li>Possibilidade de voltar e revisar respostas anteriores</li>
                    <li>Tempo estimado exibido (ex: "~10 minutos")</li>
                    <li>Sistema salva progresso automaticamente (continuar depois)</li>
                  </ul>
                </div>

                <div className="bg-accent/20 p-6 rounded-lg border-l-4 border-primary">
                  <h4 className="font-bold text-lg mb-2">Etapa 3: Processamento e Resultados</h4>
                  <p className="mb-2">Ao concluir o questionário, o sistema processa as respostas.</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Animação de carregamento enquanto analisa respostas (2-3 segundos)</li>
                    <li>Redirecionamento automático para o Dashboard de Resultados</li>
                    <li>Exibição de perfil primário (Visual/Auditivo/Escrito-Cinestésico)</li>
                    <li>Gráfico interativo mostrando distribuição percentual dos estilos</li>
                  </ul>
                </div>

                <div className="bg-accent/20 p-6 rounded-lg border-l-4 border-primary">
                  <h4 className="font-bold text-lg mb-2">Etapa 4: Exploração e Exportação</h4>
                  <p className="mb-2">O usuário explora seus resultados e toma ações.</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Lê descrição detalhada de seu perfil de comunicação</li>
                    <li>Acessa dicas personalizadas para otimizar comunicação</li>
                    <li>Exporta relatório em PDF, CSV ou Excel</li>
                    <li>Envia resultados por email para si mesmo ou terceiros</li>
                    <li>Compartilha nas redes sociais (opcional)</li>
                  </ul>
                </div>
              </div>
            </ScopeSection>

            <ScopeSection 
              id="funcionalidades" 
              title="3. Funcionalidades Principais" 
              icon={Zap}
            >
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Lock className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-bold">Módulo de Autenticação</h3>
                  </div>
                  <p className="mb-3">Sistema robusto e user-friendly de gerenciamento de usuários.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Cadastro Simplificado:</strong> Email/senha com validação em tempo real</li>
                    <li><strong>Login Social:</strong> Integração com Google OAuth 2.0 para acesso rápido</li>
                    <li><strong>Recuperação de Senha:</strong> Fluxo seguro com envio de token por email</li>
                    <li><strong>Segurança:</strong> Hash bcrypt, proteção contra CSRF e rate limiting</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-bold">Módulo de Questionário Interativo</h3>
                  </div>
                  <p className="mb-3">Interface dinâmica e responsiva para aplicação do teste.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Design Progressivo:</strong> Uma pergunta por tela com transições suaves</li>
                    <li><strong>20-30 Perguntas:</strong> Balanceadas entre os três estilos de comunicação</li>
                    <li><strong>Exemplos de Perguntas:</strong></li>
                  </ul>
                  <div className="bg-muted p-4 rounded-lg mt-3 space-y-2 text-sm">
                    <p><em>"Quando você precisa aprender algo novo, você prefere..."</em></p>
                    <ul className="list-none pl-4 space-y-1">
                      <li>→ Ver diagramas, imagens ou vídeos (Visual)</li>
                      <li>→ Ouvir explicações ou podcasts (Auditivo)</li>
                      <li>→ Ler textos ou fazer anotações (Escrito/Cinestésico)</li>
                    </ul>
                  </div>
                  <ul className="list-disc pl-6 space-y-2 mt-3">
                    <li><strong>Navegação Flexível:</strong> Botões "Voltar" e "Próxima" habilitados</li>
                    <li><strong>Salvamento Automático:</strong> Progresso salvo a cada resposta</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-bold">Algoritmo de Análise de Perfil</h3>
                  </div>
                  <p className="mb-3">Lógica inteligente para processar respostas e gerar insights.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Sistema de Pontuação:</strong> Cada resposta adiciona pontos ao estilo correspondente</li>
                    <li><strong>Cálculo de Percentual:</strong> Distribuição proporcional entre Visual, Auditivo e Escrito/Cinestésico</li>
                    <li><strong>Perfil Primário:</strong> Estilo com maior pontuação (mínimo 40% para ser definitivo)</li>
                    <li><strong>Perfil Secundário:</strong> Segundo estilo mais forte (se ≥ 30%)</li>
                    <li><strong>Perfil Balanceado:</strong> Identificação quando nenhum estilo domina (≤ 45%)</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-bold">Dashboard de Resultados</h3>
                  </div>
                  <p className="mb-3">Visualização rica e interativa dos resultados do usuário.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Gráfico de Pizza/Barras:</strong> Distribuição visual dos três estilos</li>
                    <li><strong>Card de Perfil:</strong> Destaque para o estilo predominante com ícone e cor</li>
                    <li><strong>Descrição Detalhada:</strong> Explicação de 200-300 palavras sobre o perfil</li>
                    <li><strong>Dicas Personalizadas:</strong> 5-7 recomendações práticas para otimizar comunicação</li>
                    <li><strong>Histórico:</strong> Possibilidade de refazer o teste e comparar resultados</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <FileDown className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-bold">Módulo de Exportação (Crítico)</h3>
                  </div>
                  <p className="mb-3">Funcionalidade essencial para compartilhamento e arquivamento de resultados.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>PDF Otimizado:</strong> Relatório formatado com logo, gráficos e descrições (biblioteca: jsPDF ou PDFKit)</li>
                    <li><strong>CSV de Dados Brutos:</strong> Tabela com perguntas, respostas e pontuações para análise externa</li>
                    <li><strong>Excel (.xlsx):</strong> Planilha formatada com gráficos nativos e múltiplas abas (biblioteca: ExcelJS ou SheetJS)</li>
                    <li><strong>Envio por Email:</strong> Integração com serviço de email (SendGrid/Mailgun) para envio direto</li>
                    <li><strong>Botões de Ação:</strong> Interface clara com ícones para cada formato de exportação</li>
                  </ul>
                </div>
              </div>
            </ScopeSection>

            <ScopeSection 
              id="arquitetura" 
              title="4. Arquitetura Tecnológica" 
              icon={Code}
            >
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Database className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-bold">Front-End (Client-Side)</h3>
                  </div>
                  <p className="mb-3"><strong>Framework Recomendado: React com Vite</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Justificativa:</strong></li>
                    <ul className="list-circle pl-6 space-y-1 text-sm mt-1">
                      <li>Componentes reutilizáveis ideais para questionários dinâmicos</li>
                      <li>Ecossistema rico com bibliotecas para gráficos (Recharts, Chart.js)</li>
                      <li>Performance excelente com Virtual DOM para interações rápidas</li>
                      <li>Grande comunidade e abundância de soluções prontas</li>
                    </ul>
                    <li><strong>Bibliotecas Complementares:</strong></li>
                    <ul className="list-circle pl-6 space-y-1 text-sm mt-1">
                      <li>React Router para navegação entre páginas</li>
                      <li>Tailwind CSS para design system responsivo</li>
                      <li>Recharts ou Victory para visualizações de dados</li>
                      <li>Framer Motion para animações fluidas</li>
                    </ul>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Server className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-bold">Back-End (Server-Side)</h3>
                  </div>
                  <p className="mb-3"><strong>Stack Recomendada: Node.js com Express.js</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Justificativa:</strong></li>
                    <ul className="list-circle pl-6 space-y-1 text-sm mt-1">
                      <li>JavaScript/TypeScript full-stack facilita compartilhamento de código</li>
                      <li>Escalabilidade horizontal com arquitetura stateless</li>
                      <li>Event-driven, ideal para operações I/O intensivas (exportação de arquivos)</li>
                      <li>NPM oferece bibliotecas robustas para geração de PDF/Excel</li>
                    </ul>
                    <li><strong>Bibliotecas Essenciais:</strong></li>
                    <ul className="list-circle pl-6 space-y-1 text-sm mt-1">
                      <li><strong>jsPDF</strong> ou <strong>PDFKit:</strong> Geração de relatórios PDF com gráficos</li>
                      <li><strong>ExcelJS:</strong> Criação de arquivos .xlsx formatados com fórmulas</li>
                      <li><strong>csv-writer:</strong> Exportação de dados em CSV</li>
                      <li><strong>Nodemailer:</strong> Envio de emails com anexos</li>
                      <li><strong>Passport.js:</strong> Autenticação local e OAuth (Google)</li>
                      <li><strong>bcrypt:</strong> Hash seguro de senhas</li>
                    </ul>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Database className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-bold">Banco de Dados</h3>
                  </div>
                  <p className="mb-3"><strong>Solução Recomendada: PostgreSQL</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Justificativa:</strong></li>
                    <ul className="list-circle pl-6 space-y-1 text-sm mt-1">
                      <li>Banco relacional robusto para dados estruturados (usuários, respostas, resultados)</li>
                      <li>JSONB para armazenar arrays de respostas de forma flexível</li>
                      <li>Integridade referencial com foreign keys (relacionamento usuário-testes)</li>
                      <li>Suporte nativo a índices complexos para queries rápidas</li>
                      <li>Excelente para escalabilidade com replicação e particionamento</li>
                    </ul>
                    <li><strong>Estrutura de Tabelas Principais:</strong></li>
                    <ul className="list-circle pl-6 space-y-1 text-sm mt-1">
                      <li><code>users</code>: id, email, password_hash, name, created_at</li>
                      <li><code>questionnaires</code>: id, user_id, answers (JSONB), completed_at</li>
                      <li><code>results</code>: id, questionnaire_id, visual_score, auditory_score, written_score, primary_profile, secondary_profile</li>
                    </ul>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-primary-glow/10 p-6 rounded-lg border-2 border-primary/30">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Considerações Adicionais
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <strong>Hospedagem:</strong> Vercel/Netlify (front-end) + Render/Railway (back-end) para MVP rápido
                    </li>
                    <li>
                      <strong>Segurança:</strong> HTTPS obrigatório, CORS configurado, validação de inputs, rate limiting
                    </li>
                    <li>
                      <strong>Performance:</strong> Cache de resultados em Redis, CDN para assets estáticos, lazy loading de componentes
                    </li>
                    <li>
                      <strong>Monitoramento:</strong> Sentry para tracking de erros, Google Analytics para métricas de uso
                    </li>
                  </ul>
                </div>
              </div>
            </ScopeSection>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
