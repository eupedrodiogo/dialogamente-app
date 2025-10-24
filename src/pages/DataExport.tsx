import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { PremiumAccess } from '@/components/PremiumAccess';
import { usePremiumFeatures } from '@/hooks/usePremiumFeatures';
import { useAuth } from '@/contexts/AuthContext';
import {
  Download,
  FileText,
  Database,
  Table,
  BarChart3,
  Calendar,
  Clock,
  Filter,
  Settings,
  CheckCircle,
  AlertCircle,
  Info,
  RefreshCw,
  Share2,
  Mail,
  Cloud,
  HardDrive,
  Zap,
  Crown,
  Star,
  Eye,
  Copy,
  Archive,
  FileSpreadsheet,
  FileJson,
  Image,
  PieChart,
  TrendingUp,
  Users,
  Target,
  Award
} from 'lucide-react';

const DataExport = () => {
  const { canExportData, isPremium, isVIP, isAdminAccess } = usePremiumFeatures();
  const { user } = useAuth();
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [exportConfig, setExportConfig] = useState({
    includePersonalData: true,
    includeTestResults: true,
    includeProgress: true,
    includeAnalytics: true,
    includeReports: false,
    includeCharts: true,
    anonymizeData: false,
    compressFile: true
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportHistory, setExportHistory] = useState([]);

  const exportFormats = [
    {
      id: 'pdf',
      name: 'PDF',
      description: 'Relatório formatado para visualização',
      icon: FileText,
      size: '~2-5 MB',
      features: ['Gráficos', 'Formatação', 'Portabilidade'],
      plan: 'pro'
    },
    {
      id: 'excel',
      name: 'Excel (XLSX)',
      description: 'Planilha para análise de dados',
      icon: FileSpreadsheet,
      size: '~1-3 MB',
      features: ['Tabelas', 'Fórmulas', 'Gráficos'],
      plan: 'premium'
    },
    {
      id: 'csv',
      name: 'CSV',
      description: 'Dados tabulares simples',
      icon: Table,
      size: '~100-500 KB',
      features: ['Compatibilidade', 'Leveza', 'Importação fácil'],
      plan: 'premium'
    },
    {
      id: 'json',
      name: 'JSON',
      description: 'Dados estruturados para desenvolvedores',
      icon: FileJson,
      size: '~200-800 KB',
      features: ['Estruturado', 'API-friendly', 'Programático'],
      plan: 'vip'
    },
    {
      id: 'xml',
      name: 'XML',
      description: 'Formato estruturado padrão',
      icon: Database,
      size: '~300-1 MB',
      features: ['Padrão', 'Metadados', 'Validação'],
      plan: 'vip'
    },
    {
      id: 'charts',
      name: 'Gráficos (PNG)',
      description: 'Visualizações em alta resolução',
      icon: BarChart3,
      size: '~5-15 MB',
      features: ['Alta qualidade', 'Apresentações', 'Compartilhamento'],
      plan: 'premium'
    }
  ];

  const dataCategories = [
    {
      id: 'personal',
      name: 'Dados Pessoais',
      description: 'Informações do perfil e configurações',
      items: ['Nome', 'Email', 'Preferências', 'Configurações'],
      size: '~10 KB'
    },
    {
      id: 'tests',
      name: 'Resultados de Testes',
      description: 'Histórico completo de avaliações',
      items: ['Pontuações', 'Respostas', 'Timestamps', 'Categorias'],
      size: '~50-200 KB'
    },
    {
      id: 'progress',
      name: 'Dados de Progresso',
      description: 'Evolução e métricas de desenvolvimento',
      items: ['Tendências', 'Marcos', 'Objetivos', 'Conquistas'],
      size: '~30-100 KB'
    },
    {
      id: 'analytics',
      name: 'Analytics Avançados',
      description: 'Métricas detalhadas e insights',
      items: ['Padrões', 'Correlações', 'Previsões', 'Benchmarks'],
      size: '~100-500 KB',
      premium: true
    },
    {
      id: 'reports',
      name: 'Relatórios Gerados',
      description: 'PDFs e documentos criados',
      items: ['Relatórios', 'Certificados', 'Análises', 'Recomendações'],
      size: '~1-10 MB',
      premium: true
    }
  ];

  const exportHistory_data = [
    {
      id: 1,
      format: 'PDF',
      date: '2024-01-20',
      size: '3.2 MB',
      status: 'completed',
      downloads: 5,
      categories: ['Dados Pessoais', 'Resultados de Testes', 'Progresso']
    },
    {
      id: 2,
      format: 'Excel',
      date: '2024-01-15',
      size: '1.8 MB',
      status: 'completed',
      downloads: 2,
      categories: ['Resultados de Testes', 'Analytics']
    },
    {
      id: 3,
      format: 'JSON',
      date: '2024-01-10',
      size: '450 KB',
      status: 'completed',
      downloads: 1,
      categories: ['Todos os dados']
    }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simular processo de exportação
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newExport = {
      id: Date.now(),
      format: exportFormats.find(f => f.id === selectedFormat)?.name || 'PDF',
      date: new Date().toISOString().split('T')[0],
      size: '2.1 MB',
      status: 'completed',
      downloads: 0,
      categories: Object.keys(exportConfig).filter(key => exportConfig[key] && key.startsWith('include')).map(key => {
        switch (key) {
          case 'includePersonalData': return 'Dados Pessoais';
          case 'includeTestResults': return 'Resultados de Testes';
          case 'includeProgress': return 'Progresso';
          case 'includeAnalytics': return 'Analytics';
          case 'includeReports': return 'Relatórios';
          default: return '';
        }
      }).filter(Boolean)
    };
    
    setExportHistory(prev => [newExport, ...prev]);
    setIsExporting(false);
  };

  const getPlanBadge = (plan) => {
    switch (plan) {
      case 'pro':
        return <Badge variant="outline">PRO</Badge>;
      case 'premium':
        return <Badge className="bg-purple-100 text-purple-800">PREMIUM</Badge>;
      case 'vip':
        return <Badge className="bg-yellow-100 text-yellow-800">VIP</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Concluído</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">Processando</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Falhou</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  if (!canExportData()) {
    return (
      <PremiumAccess 
        feature="dataExport"
        title="Exportação de Dados"
        description="Exporte seus dados em múltiplos formatos para análise externa e backup."
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
                Exportação de Dados
                {isAdminAccess && <Badge className="ml-2 bg-yellow-100 text-yellow-800">ADMIN</Badge>}
                {isVIP && <Badge className="ml-2 bg-yellow-100 text-yellow-800">VIP</Badge>}
                {isPremium && <Badge className="ml-2 bg-purple-100 text-purple-800">PREMIUM</Badge>}
              </h1>
              <p className="text-gray-600">
                Exporte seus dados em diversos formatos para análise e backup
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
              <Button variant="outline" size="sm">
                <Archive className="w-4 h-4 mr-2" />
                Histórico
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="export" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="export">Exportar Dados</TabsTrigger>
            <TabsTrigger value="formats">Formatos</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>

          {/* Aba Exportar */}
          <TabsContent value="export" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Configurações */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Configurações de Exportação
                    </CardTitle>
                    <CardDescription>
                      Personalize o que será incluído na exportação
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Formato */}
                    <div>
                      <Label htmlFor="format">Formato de Exportação</Label>
                      <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {exportFormats.map((format) => (
                            <SelectItem key={format.id} value={format.id}>
                              <div className="flex items-center gap-2">
                                <format.icon className="w-4 h-4" />
                                {format.name} - {format.size}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Período */}
                    <div>
                      <Label htmlFor="period">Período dos Dados</Label>
                      <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7d">Últimos 7 dias</SelectItem>
                          <SelectItem value="30d">Últimos 30 dias</SelectItem>
                          <SelectItem value="90d">Últimos 90 dias</SelectItem>
                          <SelectItem value="1y">Último ano</SelectItem>
                          <SelectItem value="all">Todos os dados</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Categorias de Dados */}
                    <div className="space-y-3">
                      <Label>Categorias de Dados</Label>
                      <div className="space-y-3">
                        {dataCategories.map((category) => (
                          <div key={category.id} className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={category.id}
                                checked={exportConfig[`include${category.id.charAt(0).toUpperCase() + category.id.slice(1)}Data`] || exportConfig[`include${category.id.charAt(0).toUpperCase() + category.id.slice(1)}`]}
                                onCheckedChange={(checked) => {
                                  const key = category.id === 'personal' ? 'includePersonalData' :
                                             category.id === 'tests' ? 'includeTestResults' :
                                             category.id === 'progress' ? 'includeProgress' :
                                             category.id === 'analytics' ? 'includeAnalytics' :
                                             'includeReports';
                                  setExportConfig(prev => ({ ...prev, [key]: checked }));
                                }}
                                disabled={category.premium && !isPremium}
                              />
                              <Label htmlFor={category.id} className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="font-medium">{category.name}</span>
                                    {category.premium && <Badge className="ml-2 text-xs">PREMIUM</Badge>}
                                  </div>
                                  <span className="text-sm text-gray-500">{category.size}</span>
                                </div>
                                <p className="text-sm text-gray-600">{category.description}</p>
                              </Label>
                            </div>
                            <div className="ml-6 text-xs text-gray-500">
                              Inclui: {category.items.join(', ')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Opções Avançadas */}
                    <div className="space-y-3">
                      <Label>Opções Avançadas</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="charts"
                            checked={exportConfig.includeCharts}
                            onCheckedChange={(checked) => setExportConfig(prev => ({ ...prev, includeCharts: checked }))}
                          />
                          <Label htmlFor="charts">Incluir gráficos e visualizações</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="anonymize"
                            checked={exportConfig.anonymizeData}
                            onCheckedChange={(checked) => setExportConfig(prev => ({ ...prev, anonymizeData: checked }))}
                          />
                          <Label htmlFor="anonymize">Anonimizar dados pessoais</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="compress"
                            checked={exportConfig.compressFile}
                            onCheckedChange={(checked) => setExportConfig(prev => ({ ...prev, compressFile: checked }))}
                          />
                          <Label htmlFor="compress">Comprimir arquivo (ZIP)</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Preview e Ações */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Preview da Exportação
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span>Formato:</span>
                        <span className="font-medium">
                          {exportFormats.find(f => f.id === selectedFormat)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Período:</span>
                        <span className="font-medium">{selectedPeriod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tamanho estimado:</span>
                        <span className="font-medium">
                          {exportFormats.find(f => f.id === selectedFormat)?.size}
                        </span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm font-medium mb-2">Categorias incluídas:</p>
                      <div className="space-y-1">
                        {Object.entries(exportConfig)
                          .filter(([key, value]) => value && key.startsWith('include'))
                          .map(([key]) => {
                            const categoryName = key === 'includePersonalData' ? 'Dados Pessoais' :
                                               key === 'includeTestResults' ? 'Resultados de Testes' :
                                               key === 'includeProgress' ? 'Progresso' :
                                               key === 'includeAnalytics' ? 'Analytics' :
                                               key === 'includeReports' ? 'Relatórios' :
                                               key === 'includeCharts' ? 'Gráficos' : '';
                            return categoryName ? (
                              <div key={key} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                {categoryName}
                              </div>
                            ) : null;
                          })}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Exportar Dados</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      className="w-full" 
                      onClick={handleExport}
                      disabled={isExporting}
                    >
                      {isExporting ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Exportando...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Exportar Dados
                        </>
                      )}
                    </Button>

                    {isExporting && (
                      <div className="space-y-2">
                        <Progress value={66} />
                        <p className="text-sm text-center text-gray-500">
                          Processando dados... 2/3
                        </p>
                      </div>
                    )}

                    <div className="text-xs text-gray-500 space-y-1">
                      <p>• O arquivo será enviado para seu email</p>
                      <p>• Link de download válido por 7 dias</p>
                      <p>• Dados criptografados para segurança</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Aba Formatos */}
          <TabsContent value="formats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exportFormats.map((format) => {
                const Icon = format.icon;
                return (
                  <Card key={format.id} className={`cursor-pointer transition-all ${selectedFormat === format.id ? 'ring-2 ring-purple-500' : ''}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Icon className="w-5 h-5" />
                          {format.name}
                        </CardTitle>
                        {getPlanBadge(format.plan)}
                      </div>
                      <CardDescription>{format.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm font-medium">Tamanho: {format.size}</p>
                        <div>
                          <p className="text-sm font-medium mb-1">Características:</p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {format.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Button 
                          variant={selectedFormat === format.id ? 'default' : 'outline'}
                          size="sm"
                          className="w-full"
                          onClick={() => setSelectedFormat(format.id)}
                        >
                          {selectedFormat === format.id ? 'Selecionado' : 'Selecionar'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Aba Histórico */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Archive className="w-5 h-5" />
                  Histórico de Exportações
                </CardTitle>
                <CardDescription>
                  Suas exportações anteriores e downloads disponíveis
                </CardDescription>
              </CardHeader>
              <CardContent>
                {[...exportHistory, ...exportHistory_data].length === 0 ? (
                  <div className="text-center py-8">
                    <Download className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Nenhuma exportação realizada ainda</p>
                    <p className="text-sm text-gray-400">Suas exportações aparecerão aqui</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {[...exportHistory, ...exportHistory_data].map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                            <Download className="w-5 h-5 text-purple-500" />
                          </div>
                          <div>
                            <p className="font-medium">{item.format}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(item.date).toLocaleDateString('pt-BR')} • {item.size}
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.categories.join(', ')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(item.status)}
                          <span className="text-sm text-gray-500">{item.downloads} downloads</span>
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

export default DataExport;