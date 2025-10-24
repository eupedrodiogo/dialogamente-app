import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { PremiumAccess } from '@/components/PremiumAccess';
import { usePremiumFeatures } from '@/hooks/usePremiumFeatures';
import { useAuth } from '@/contexts/AuthContext';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Target,
  Calendar,
  Clock,
  Users,
  Award,
  Zap,
  Brain,
  Eye,
  Download,
  Share2,
  Filter,
  RefreshCw,
  Settings,
  AlertCircle,
  CheckCircle,
  Info,
  Star,
  Crown,
  Lightbulb,
  ArrowUp,
  ArrowDown,
  Minus,
  Plus
} from 'lucide-react';

const AdvancedAnalytics = () => {
  const { canAccessAdvancedAnalytics, isPremium, isVIP, isAdminAccess } = usePremiumFeatures();
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('overall');
  const [comparisonMode, setComparisonMode] = useState(false);

  // Dados simulados para os gráficos
  const performanceData = [
    { date: '2024-01-01', comunicacao: 75, lideranca: 68, inteligenciaEmocional: 82, produtividade: 71 },
    { date: '2024-01-08', comunicacao: 78, lideranca: 72, inteligenciaEmocional: 85, produtividade: 74 },
    { date: '2024-01-15', comunicacao: 82, lideranca: 75, inteligenciaEmocional: 87, produtividade: 78 },
    { date: '2024-01-22', comunicacao: 85, lideranca: 79, inteligenciaEmocional: 89, produtividade: 82 },
    { date: '2024-01-29', comunicacao: 88, lideranca: 83, inteligenciaEmocional: 92, produtividade: 85 }
  ];

  const categoryDistribution = [
    { name: 'Comunicação', value: 88, color: '#8B5CF6' },
    { name: 'Liderança', value: 83, color: '#3B82F6' },
    { name: 'Int. Emocional', value: 92, color: '#10B981' },
    { name: 'Produtividade', value: 85, color: '#F59E0B' }
  ];

  const radarData = [
    { subject: 'Comunicação Verbal', A: 88, B: 75, fullMark: 100 },
    { subject: 'Comunicação Escrita', A: 85, B: 70, fullMark: 100 },
    { subject: 'Escuta Ativa', A: 92, B: 80, fullMark: 100 },
    { subject: 'Assertividade', A: 78, B: 65, fullMark: 100 },
    { subject: 'Empatia', A: 95, B: 85, fullMark: 100 },
    { subject: 'Liderança', A: 83, B: 72, fullMark: 100 }
  ];

  const weeklyActivity = [
    { day: 'Seg', testes: 3, tempo: 45, pontuacao: 85 },
    { day: 'Ter', testes: 2, tempo: 30, pontuacao: 78 },
    { day: 'Qua', testes: 4, tempo: 60, pontuacao: 92 },
    { day: 'Qui', testes: 1, tempo: 15, pontuacao: 88 },
    { day: 'Sex', testes: 3, tempo: 40, pontuacao: 90 },
    { day: 'Sab', testes: 2, tempo: 25, pontuacao: 82 },
    { day: 'Dom', testes: 1, tempo: 20, pontuacao: 75 }
  ];

  const keyMetrics = [
    {
      title: 'Pontuação Geral',
      value: 87,
      change: +5.2,
      trend: 'up',
      description: 'Média ponderada de todas as categorias',
      icon: Target,
      color: 'text-purple-600'
    },
    {
      title: 'Evolução Mensal',
      value: '+12%',
      change: +2.1,
      trend: 'up',
      description: 'Crescimento comparado ao mês anterior',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Consistência',
      value: 94,
      change: -1.3,
      trend: 'down',
      description: 'Regularidade nas atividades',
      icon: Activity,
      color: 'text-blue-600'
    },
    {
      title: 'Tempo Investido',
      value: '4.2h',
      change: +0.8,
      trend: 'up',
      description: 'Horas semanais de prática',
      icon: Clock,
      color: 'text-orange-600'
    }
  ];

  const insights = [
    {
      type: 'success',
      title: 'Excelente Progresso em Inteligência Emocional',
      description: 'Você demonstrou um crescimento de 15% nesta área nas últimas 4 semanas.',
      action: 'Continue praticando exercícios de autoconhecimento',
      icon: CheckCircle
    },
    {
      type: 'warning',
      title: 'Oportunidade de Melhoria em Liderança',
      description: 'Sua pontuação em liderança está 8% abaixo da média dos usuários premium.',
      action: 'Recomendamos o workshop "Liderança Transformacional"',
      icon: AlertCircle
    },
    {
      type: 'info',
      title: 'Padrão de Atividade Identificado',
      description: 'Você é mais produtivo nas quartas e sextas-feiras.',
      action: 'Considere agendar atividades importantes nesses dias',
      icon: Info
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <ArrowDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  if (!canAccessAdvancedAnalytics()) {
    return (
      <PremiumAccess 
        feature="advancedAnalytics"
        title="Analytics Avançados"
        description="Acesse métricas detalhadas, gráficos interativos e insights profundos sobre seu desenvolvimento."
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Analytics Avançados
                {isAdminAccess && <Badge className="ml-2 bg-yellow-100 text-yellow-800">ADMIN</Badge>}
                {isVIP && <Badge className="ml-2 bg-yellow-100 text-yellow-800">VIP</Badge>}
                {isPremium && <Badge className="ml-2 bg-purple-100 text-purple-800">PREMIUM</Badge>}
              </h1>
              <p className="text-gray-600">
                Análise detalhada do seu progresso e performance
              </p>
            </div>
            <div className="flex gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 dias</SelectItem>
                  <SelectItem value="30d">30 dias</SelectItem>
                  <SelectItem value="90d">90 dias</SelectItem>
                  <SelectItem value="1y">1 ano</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {keyMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${metric.color}`} />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {getTrendIcon(metric.trend)}
                      <span className={`text-sm font-medium ${
                        metric.trend === 'up' ? 'text-green-600' : 
                        metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {Math.abs(metric.change)}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{metric.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="categories">Categorias</TabsTrigger>
            <TabsTrigger value="activity">Atividade</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Aba Visão Geral */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Evolução Geral
                  </CardTitle>
                  <CardDescription>Progresso nas últimas semanas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="comunicacao" stroke="#8B5CF6" strokeWidth={2} />
                      <Line type="monotone" dataKey="lideranca" stroke="#3B82F6" strokeWidth={2} />
                      <Line type="monotone" dataKey="inteligenciaEmocional" stroke="#10B981" strokeWidth={2} />
                      <Line type="monotone" dataKey="produtividade" stroke="#F59E0B" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="w-5 h-5" />
                    Distribuição por Categoria
                  </CardTitle>
                  <CardDescription>Pontuação atual por área</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Aba Performance */}
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Análise de Performance Detalhada
                </CardTitle>
                <CardDescription>Comparação entre período atual e anterior</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="comunicacao" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="lideranca" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="inteligenciaEmocional" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="produtividade" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Categorias */}
          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Análise Radar
                  </CardTitle>
                  <CardDescription>Comparação multidimensional</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar name="Atual" dataKey="A" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                      <Radar name="Anterior" dataKey="B" stroke="#94A3B8" fill="#94A3B8" fillOpacity={0.3} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Detalhamento por Categoria</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categoryDistribution.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{category.name}</span>
                        <span className="text-sm font-bold">{category.value}%</span>
                      </div>
                      <Progress value={category.value} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Meta: 85%</span>
                        <span className={category.value >= 85 ? 'text-green-600' : 'text-orange-600'}>
                          {category.value >= 85 ? 'Meta atingida' : `${85 - category.value}% para meta`}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Aba Atividade */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Atividade Semanal
                </CardTitle>
                <CardDescription>Padrões de uso e engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="testes" fill="#8B5CF6" name="Testes Realizados" />
                    <Bar dataKey="tempo" fill="#3B82F6" name="Tempo (min)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Streak Atual</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">12 dias</div>
                    <p className="text-sm text-gray-600">Sua melhor sequência: 18 dias</p>
                    <Progress value={67} className="mt-4" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tempo Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">24.5h</div>
                    <p className="text-sm text-gray-600">Este mês</p>
                    <div className="flex items-center justify-center mt-2 text-green-600">
                      <ArrowUp className="w-4 h-4 mr-1" />
                      <span className="text-sm">+15% vs mês anterior</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Testes Concluídos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">47</div>
                    <p className="text-sm text-gray-600">Este mês</p>
                    <div className="flex items-center justify-center mt-2 text-green-600">
                      <ArrowUp className="w-4 h-4 mr-1" />
                      <span className="text-sm">+8% vs mês anterior</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Aba Insights */}
          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Insights Personalizados
                </CardTitle>
                <CardDescription>Análises e recomendações baseadas em IA</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      {getInsightIcon(insight.type)}
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{insight.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                        <p className="text-sm font-medium text-purple-600">{insight.action}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pontos Fortes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Inteligência Emocional</span>
                      <Badge className="bg-green-100 text-green-800">Excelente</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Comunicação</span>
                      <Badge className="bg-blue-100 text-blue-800">Muito Bom</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Produtividade</span>
                      <Badge className="bg-blue-100 text-blue-800">Muito Bom</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Áreas de Melhoria</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Liderança</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Desenvolver</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Assertividade</span>
                      <Badge className="bg-orange-100 text-orange-800">Atenção</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Gestão de Tempo</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Desenvolver</Badge>
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

export default AdvancedAnalytics;