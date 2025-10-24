import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { PremiumAccess } from '@/components/PremiumAccess';
import { usePremiumFeatures } from '@/hooks/usePremiumFeatures';
import { useAuth } from '@/contexts/AuthContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  Calendar,
  Download,
  Share2,
  Settings,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Target,
  Award,
  Clock,
  Brain,
  Heart,
  Zap,
  Star,
  Crown,
  Shield
} from 'lucide-react';

const PremiumDashboard = () => {
  const { canAccessDashboard, canAccessAnalytics, isAdminAccess, isPremium } = usePremiumFeatures();
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [isLoading, setIsLoading] = useState(true);

  // Dados simulados para demonstração
  const [dashboardData, setDashboardData] = useState({
    overview: {
      totalTests: 47,
      completionRate: 89,
      averageScore: 7.8,
      improvementRate: 23,
      lastTestDate: '2024-01-15',
      streakDays: 12
    },
    evolution: [
      { date: '2024-01-01', score: 6.2, mood: 6.5, stress: 4.2 },
      { date: '2024-01-05', score: 6.8, mood: 7.1, stress: 3.8 },
      { date: '2024-01-10', score: 7.2, mood: 7.4, stress: 3.5 },
      { date: '2024-01-15', score: 7.8, mood: 8.0, stress: 3.0 },
    ],
    categories: [
      { name: 'Bem-estar Emocional', value: 85, color: '#8B5CF6' },
      { name: 'Gestão de Stress', value: 72, color: '#06B6D4' },
      { name: 'Relacionamentos', value: 78, color: '#10B981' },
      { name: 'Autoestima', value: 81, color: '#F59E0B' },
      { name: 'Produtividade', value: 69, color: '#EF4444' },
    ],
    weeklyActivity: [
      { day: 'Seg', tests: 3, time: 45 },
      { day: 'Ter', tests: 2, time: 30 },
      { day: 'Qua', tests: 4, time: 60 },
      { day: 'Qui', tests: 1, time: 15 },
      { day: 'Sex', tests: 3, time: 45 },
      { day: 'Sáb', tests: 2, time: 30 },
      { day: 'Dom', tests: 1, time: 15 },
    ]
  });

  useEffect(() => {
    // Simular carregamento de dados
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedPeriod]);

  if (!canAccessDashboard()) {
    return (
      <PremiumAccess 
        feature="evolutionDashboard"
        title="Dashboard Premium"
        description="Acesse analytics avançados, métricas de evolução e relatórios detalhados do seu progresso."
      />
    );
  }

  const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <div className={`flex items-center text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {change}%
              </div>
            )}
          </div>
          <Icon className="w-8 h-8 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Dashboard Premium
                {isAdminAccess && <Badge className="ml-2 bg-yellow-100 text-yellow-800">ADMIN</Badge>}
                {isPremium && <Badge className="ml-2 bg-purple-100 text-purple-800">PREMIUM</Badge>}
              </h1>
              <p className="text-gray-600">
                Acompanhe sua evolução com analytics avançados e insights personalizados
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configurar
              </Button>
            </div>
          </div>
        </div>

        {/* Período de Análise */}
        <div className="mb-6">
          <div className="flex gap-2">
            {['7d', '30d', '90d', '1y'].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
              >
                {period === '7d' && '7 dias'}
                {period === '30d' && '30 dias'}
                {period === '90d' && '90 dias'}
                {period === '1y' && '1 ano'}
              </Button>
            ))}
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Testes Realizados"
            value={dashboardData.overview.totalTests}
            change={15}
            trend="up"
            icon={FileText}
          />
          <StatCard
            title="Taxa de Conclusão"
            value={`${dashboardData.overview.completionRate}%`}
            change={8}
            trend="up"
            icon={Target}
          />
          <StatCard
            title="Pontuação Média"
            value={dashboardData.overview.averageScore}
            change={12}
            trend="up"
            icon={Award}
          />
          <StatCard
            title="Sequência Atual"
            value={`${dashboardData.overview.streakDays} dias`}
            change={23}
            trend="up"
            icon={Zap}
          />
        </div>

        {/* Conteúdo Principal */}
        <Tabs defaultValue="evolution" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="evolution">Evolução</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Aba Evolução */}
          <TabsContent value="evolution" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de Evolução */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Evolução do Bem-estar
                  </CardTitle>
                  <CardDescription>
                    Acompanhe sua progressão ao longo do tempo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dashboardData.evolution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#8B5CF6" strokeWidth={2} />
                      <Line type="monotone" dataKey="mood" stroke="#06B6D4" strokeWidth={2} />
                      <Line type="monotone" dataKey="stress" stroke="#EF4444" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Distribuição por Categorias */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="w-5 h-5" />
                    Distribuição por Áreas
                  </CardTitle>
                  <CardDescription>
                    Performance em diferentes aspectos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={dashboardData.categories}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {dashboardData.categories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Atividade Semanal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Atividade Semanal
                </CardTitle>
                <CardDescription>
                  Frequência e tempo dedicado aos testes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={dashboardData.weeklyActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="tests" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            {canAccessAnalytics() ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Métricas Avançadas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Consistência</span>
                        <span className="font-semibold">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Engajamento</span>
                        <span className="font-semibold">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Melhoria</span>
                        <span className="font-semibold">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Padrões Identificados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm font-medium text-green-800">
                          📈 Melhoria consistente nas manhãs
                        </p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-800">
                          🎯 Maior foco em dias de semana
                        </p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm font-medium text-purple-800">
                          ⭐ Excelente progresso em autoestima
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <PremiumAccess 
                feature="advancedAnalytics"
                title="Analytics Avançados"
                description="Desbloqueie insights profundos sobre seus padrões e tendências."
              />
            )}
          </TabsContent>

          {/* Aba Relatórios */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Relatório Mensal
                  </CardTitle>
                  <CardDescription>
                    Análise completa do último mês
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Gerar PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Relatório de Evolução
                  </CardTitle>
                  <CardDescription>
                    Progresso detalhado por categoria
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Gerar PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Relatório de Metas
                  </CardTitle>
                  <CardDescription>
                    Acompanhamento de objetivos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Gerar PDF
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Aba Insights */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Insights Personalizados
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">
                      🎯 Recomendação Principal
                    </h4>
                    <p className="text-sm text-purple-700">
                      Continue focando em exercícios de mindfulness nas manhãs. 
                      Seus resultados mostram 23% de melhoria quando praticados regularmente.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">
                      📈 Tendência Positiva
                    </h4>
                    <p className="text-sm text-green-700">
                      Sua gestão de stress melhorou 31% no último mês. 
                      Mantenha as técnicas que está usando!
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Próximos Passos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Explore novos exercícios</p>
                      <p className="text-sm text-gray-600">
                        Teste exercícios de gratidão para potencializar seus resultados
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Defina metas semanais</p>
                      <p className="text-sm text-gray-600">
                        Estabeleça objetivos específicos para manter o progresso
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Compartilhe conquistas</p>
                      <p className="text-sm text-gray-600">
                        Celebre seus progressos com pessoas próximas
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PremiumDashboard;