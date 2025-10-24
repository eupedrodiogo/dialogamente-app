import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PremiumAccess } from '@/components/PremiumAccess';
import { usePremiumFeatures } from '@/hooks/usePremiumFeatures';
import { useAuth } from '@/contexts/AuthContext';
import {
  FileText,
  Download,
  Eye,
  Settings,
  Calendar,
  User,
  BarChart3,
  PieChart,
  TrendingUp,
  Star,
  Crown,
  Palette,
  Layout,
  Image,
  Type,
  Zap,
  Clock,
  Share2,
  Mail,
  Printer,
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

const PremiumReports = () => {
  const { canGenerateExtendedPDF, canGeneratePDF, isAdminAccess, isPremium } = usePremiumFeatures();
  const { user } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState('comprehensive');
  const [reportConfig, setReportConfig] = useState({
    title: 'Relatório de Evolução Pessoal',
    period: '30d',
    includeCharts: true,
    includeInsights: true,
    includeRecommendations: true,
    includeComparison: true,
    customLogo: false,
    watermark: false,
    colorScheme: 'purple',
    language: 'pt-BR'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReports, setGeneratedReports] = useState([]);

  const reportTemplates = [
    {
      id: 'basic',
      name: 'Relatório Básico',
      description: 'Relatório simples com informações essenciais',
      pages: '3-5 páginas',
      features: ['Resumo dos testes', 'Gráfico básico', 'Pontuação geral'],
      plan: 'pro',
      preview: '/api/preview/basic-report.pdf'
    },
    {
      id: 'comprehensive',
      name: 'Relatório Abrangente',
      description: 'Análise detalhada com insights profundos',
      pages: '15-20 páginas',
      features: [
        'Análise completa por categoria',
        'Gráficos avançados',
        'Comparação temporal',
        'Insights personalizados',
        'Recomendações específicas'
      ],
      plan: 'premium',
      preview: '/api/preview/comprehensive-report.pdf'
    },
    {
      id: 'executive',
      name: 'Relatório Executivo',
      description: 'Relatório profissional para apresentações',
      pages: '8-12 páginas',
      features: [
        'Design profissional',
        'Resumo executivo',
        'Métricas-chave',
        'Gráficos de alta qualidade',
        'Branding personalizado'
      ],
      plan: 'premium',
      preview: '/api/preview/executive-report.pdf'
    },
    {
      id: 'detailed',
      name: 'Relatório Detalhado',
      description: 'Análise completa com máximo de detalhes',
      pages: '25-30 páginas',
      features: [
        'Análise aprofundada',
        'Histórico completo',
        'Comparações múltiplas',
        'Análise preditiva',
        'Plano de ação personalizado',
        'Recursos adicionais'
      ],
      plan: 'vip',
      preview: '/api/preview/detailed-report.pdf'
    }
  ];

  const colorSchemes = [
    { id: 'purple', name: 'Roxo Profissional', primary: '#8B5CF6', secondary: '#A78BFA' },
    { id: 'blue', name: 'Azul Corporativo', primary: '#3B82F6', secondary: '#60A5FA' },
    { id: 'green', name: 'Verde Natureza', primary: '#10B981', secondary: '#34D399' },
    { id: 'orange', name: 'Laranja Energia', primary: '#F59E0B', secondary: '#FBBF24' },
    { id: 'teal', name: 'Azul-verde Moderno', primary: '#14B8A6', secondary: '#5EEAD4' }
  ];

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    // Simular geração de relatório
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newReport = {
      id: Date.now(),
      template: selectedTemplate,
      title: reportConfig.title,
      generatedAt: new Date().toISOString(),
      status: 'completed',
      fileSize: '2.4 MB',
      pages: reportTemplates.find(t => t.id === selectedTemplate)?.pages || '10 páginas'
    };
    
    setGeneratedReports(prev => [newReport, ...prev]);
    setIsGenerating(false);
  };

  if (!canGeneratePDF()) {
    return (
      <PremiumAccess 
        feature="pdfReports"
        title="Relatórios PDF Premium"
        description="Gere relatórios detalhados em PDF com análises avançadas e insights personalizados."
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Relatórios PDF Premium
                {isAdminAccess && <Badge className="ml-2 bg-yellow-100 text-yellow-800">ADMIN</Badge>}
                {isPremium && <Badge className="ml-2 bg-purple-100 text-purple-800">PREMIUM</Badge>}
              </h1>
              <p className="text-gray-600">
                Gere relatórios detalhados e personalizados da sua evolução
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Visualizar Exemplos
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="generator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="generator">Gerador</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>

          {/* Aba Gerador */}
          <TabsContent value="generator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Configurações */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Configurações do Relatório
                    </CardTitle>
                    <CardDescription>
                      Personalize seu relatório de acordo com suas necessidades
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Informações Básicas */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Título do Relatório</Label>
                        <Input
                          id="title"
                          value={reportConfig.title}
                          onChange={(e) => setReportConfig(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Digite o título do relatório"
                        />
                      </div>

                      <div>
                        <Label htmlFor="period">Período de Análise</Label>
                        <Select value={reportConfig.period} onValueChange={(value) => setReportConfig(prev => ({ ...prev, period: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7d">Últimos 7 dias</SelectItem>
                            <SelectItem value="30d">Últimos 30 dias</SelectItem>
                            <SelectItem value="90d">Últimos 90 dias</SelectItem>
                            <SelectItem value="1y">Último ano</SelectItem>
                            <SelectItem value="all">Todo o período</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="template">Template</Label>
                        <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {reportTemplates.map((template) => (
                              <SelectItem key={template.id} value={template.id}>
                                {template.name} - {template.pages}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Conteúdo */}
                    <div className="space-y-3">
                      <Label>Conteúdo a Incluir</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="charts"
                            checked={reportConfig.includeCharts}
                            onCheckedChange={(checked) => setReportConfig(prev => ({ ...prev, includeCharts: checked }))}
                          />
                          <Label htmlFor="charts">Gráficos e visualizações</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="insights"
                            checked={reportConfig.includeInsights}
                            onCheckedChange={(checked) => setReportConfig(prev => ({ ...prev, includeInsights: checked }))}
                          />
                          <Label htmlFor="insights">Insights personalizados</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="recommendations"
                            checked={reportConfig.includeRecommendations}
                            onCheckedChange={(checked) => setReportConfig(prev => ({ ...prev, includeRecommendations: checked }))}
                          />
                          <Label htmlFor="recommendations">Recomendações</Label>
                        </div>
                        {canGenerateExtendedPDF() && (
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="comparison"
                              checked={reportConfig.includeComparison}
                              onCheckedChange={(checked) => setReportConfig(prev => ({ ...prev, includeComparison: checked }))}
                            />
                            <Label htmlFor="comparison">Comparação temporal avançada</Label>
                            <Badge variant="outline" className="text-xs">PREMIUM</Badge>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Personalização Visual */}
                    {canGenerateExtendedPDF() && (
                      <div className="space-y-4">
                        <Label>Personalização Visual</Label>
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="colorScheme">Esquema de Cores</Label>
                            <Select value={reportConfig.colorScheme} onValueChange={(value) => setReportConfig(prev => ({ ...prev, colorScheme: value }))}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {colorSchemes.map((scheme) => (
                                  <SelectItem key={scheme.id} value={scheme.id}>
                                    <div className="flex items-center gap-2">
                                      <div 
                                        className="w-4 h-4 rounded-full" 
                                        style={{ backgroundColor: scheme.primary }}
                                      />
                                      {scheme.name}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="customLogo"
                              checked={reportConfig.customLogo}
                              onCheckedChange={(checked) => setReportConfig(prev => ({ ...prev, customLogo: checked }))}
                            />
                            <Label htmlFor="customLogo">Logo personalizado</Label>
                            <Badge variant="outline" className="text-xs">VIP</Badge>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="watermark"
                              checked={reportConfig.watermark}
                              onCheckedChange={(checked) => setReportConfig(prev => ({ ...prev, watermark: checked }))}
                            />
                            <Label htmlFor="watermark">Remover marca d'água</Label>
                            <Badge variant="outline" className="text-xs">PREMIUM</Badge>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Preview e Ações */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Preview do relatório</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Visualizar Preview
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Gerar Relatório</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-gray-600">
                      <p><strong>Template:</strong> {reportTemplates.find(t => t.id === selectedTemplate)?.name}</p>
                      <p><strong>Período:</strong> {reportConfig.period}</p>
                      <p><strong>Páginas estimadas:</strong> {reportTemplates.find(t => t.id === selectedTemplate)?.pages}</p>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={handleGenerateReport}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Gerando...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Gerar PDF
                        </>
                      )}
                    </Button>

                    {isGenerating && (
                      <div className="text-center text-sm text-gray-500">
                        <p>Processando dados...</p>
                        <p>Tempo estimado: 2-3 minutos</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Aba Templates */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reportTemplates.map((template) => (
                <Card key={template.id} className={`cursor-pointer transition-all ${selectedTemplate === template.id ? 'ring-2 ring-purple-500' : ''}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        {template.name}
                      </CardTitle>
                      <Badge variant={template.plan === 'vip' ? 'default' : 'outline'}>
                        {template.plan.toUpperCase()}
                      </Badge>
                    </div>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm font-medium">{template.pages}</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {template.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="flex gap-2 pt-2">
                        <Button 
                          variant={selectedTemplate === template.id ? 'default' : 'outline'}
                          size="sm"
                          className="flex-1"
                          onClick={() => setSelectedTemplate(template.id)}
                        >
                          {selectedTemplate === template.id ? 'Selecionado' : 'Selecionar'}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Aba Histórico */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Relatórios Gerados
                </CardTitle>
                <CardDescription>
                  Histórico dos seus relatórios PDF
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedReports.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Nenhum relatório gerado ainda</p>
                    <p className="text-sm text-gray-400">Seus relatórios aparecerão aqui após a geração</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {generatedReports.map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-purple-500" />
                          <div>
                            <p className="font-medium">{report.title}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(report.generatedAt).toLocaleDateString('pt-BR')} • {report.pages} • {report.fileSize}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {report.status === 'completed' ? 'Concluído' : 'Processando'}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PremiumReports;