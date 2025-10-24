import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PremiumAccess, { PremiumStatus, usePremiumAccess } from '@/components/PremiumAccess';
import { usePremium } from '@/contexts/PremiumContext';
import { 
  FileText, 
  BarChart3, 
  Download, 
  Crown, 
  Zap, 
  Star, 
  Shield,
  Users,
  Settings,
  Database,
  Lock,
  Unlock
} from 'lucide-react';

const PremiumDemo: React.FC = () => {
  const { 
    features, 
    isAdminAccess, 
    hasFullAccess, 
    getAccessLevel,
    isPro,
    isPremium,
    isVip,
    subscription 
  } = usePremium();

  const premiumFeatures = [
    {
      id: 'unlimitedTests',
      title: 'Testes Ilimitados',
      description: 'Realize quantos testes quiser sem limitações',
      icon: <Zap className="w-6 h-6" />,
      plan: 'pro' as const,
      feature: 'unlimitedTests' as const,
    },
    {
      id: 'pdfReports',
      title: 'Relatórios PDF',
      description: 'Gere relatórios profissionais em PDF',
      icon: <FileText className="w-6 h-6" />,
      plan: 'pro' as const,
      feature: 'pdfReports' as const,
    },
    {
      id: 'extendedPdfReports',
      title: 'Relatórios PDF Estendidos',
      description: 'Relatórios detalhados com análises avançadas',
      icon: <FileText className="w-6 h-6" />,
      plan: 'premium' as const,
      feature: 'extendedPdfReports' as const,
    },
    {
      id: 'evolutionDashboard',
      title: 'Dashboard de Evolução',
      description: 'Acompanhe seu progresso ao longo do tempo',
      icon: <BarChart3 className="w-6 h-6" />,
      plan: 'pro' as const,
      feature: 'evolutionDashboard' as const,
    },
    {
      id: 'advancedAnalytics',
      title: 'Analytics Avançados',
      description: 'Análises detalhadas e insights profundos',
      icon: <BarChart3 className="w-6 h-6" />,
      plan: 'premium' as const,
      feature: 'advancedAnalytics' as const,
    },
    {
      id: 'dataExport',
      title: 'Exportação de Dados',
      description: 'Exporte seus dados em diversos formatos',
      icon: <Download className="w-6 h-6" />,
      plan: 'premium' as const,
      feature: 'dataExport' as const,
    },
    {
      id: 'personalizedContent',
      title: 'Conteúdo Personalizado',
      description: 'Conteúdo exclusivo adaptado ao seu perfil',
      icon: <Crown className="w-6 h-6" />,
      plan: 'vip' as const,
      feature: 'personalizedContent' as const,
    },
    {
      id: 'oneOnOneSupport',
      title: 'Suporte 1:1',
      description: 'Atendimento personalizado e prioritário',
      icon: <Users className="w-6 h-6" />,
      plan: 'vip' as const,
      feature: 'oneOnOneSupport' as const,
    },
  ];

  const adminFeatures = [
    {
      id: 'fullAdminAccess',
      title: 'Acesso Administrativo Completo',
      description: 'Controle total sobre todas as funcionalidades',
      icon: <Shield className="w-6 h-6" />,
      feature: 'fullAdminAccess' as const,
    },
    {
      id: 'allPlansAccess',
      title: 'Acesso a Todos os Planos',
      description: 'Recursos de todos os planos disponíveis',
      icon: <Crown className="w-6 h-6" />,
      feature: 'allPlansAccess' as const,
    },
    {
      id: 'unlimitedEverything',
      title: 'Tudo Ilimitado',
      description: 'Sem limitações em nenhum recurso',
      icon: <Unlock className="w-6 h-6" />,
      feature: 'unlimitedEverything' as const,
    },
  ];

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'pro':
        return <Badge className="bg-blue-100 text-blue-800">PRO</Badge>;
      case 'premium':
        return <Badge className="bg-purple-100 text-purple-800">PREMIUM</Badge>;
      case 'vip':
        return <Badge className="bg-yellow-100 text-yellow-800">VIP</Badge>;
      default:
        return <Badge className="bg-green-100 text-green-800">ADMIN</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Demonstração de Recursos Premium</h1>
        <p className="text-gray-600 mb-6">
          Esta página demonstra como o sistema de acesso premium funciona com diferentes níveis de assinatura.
        </p>
        
        {/* Status do usuário */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Status do Acesso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Nível Atual:</label>
                <div className="mt-1">
                  <PremiumStatus />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Acesso Admin:</label>
                <div className="mt-1">
                  <Badge className={isAdminAccess ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {isAdminAccess ? <Unlock className="w-3 h-3 mr-1" /> : <Lock className="w-3 h-3 mr-1" />}
                    {isAdminAccess ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Acesso Completo:</label>
                <div className="mt-1">
                  <Badge className={hasFullAccess ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {hasFullAccess ? 'Sim' : 'Não'}
                  </Badge>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Planos Ativos:</label>
                <div className="mt-1 space-x-1">
                  {isPro && <Badge variant="outline" className="text-xs">PRO</Badge>}
                  {isPremium && <Badge variant="outline" className="text-xs">PREMIUM</Badge>}
                  {isVip && <Badge variant="outline" className="text-xs">VIP</Badge>}
                  {isAdminAccess && <Badge variant="outline" className="text-xs">ADMIN</Badge>}
                </div>
              </div>
            </div>
            
            {subscription && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900">Detalhes da Assinatura:</h4>
                <div className="text-sm text-blue-700 mt-1">
                  <p>Plano: {subscription.plan_type.toUpperCase()}</p>
                  <p>Status: {subscription.status}</p>
                  <p>Preço: R$ {subscription.current_price}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recursos Premium */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Recursos Premium</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {premiumFeatures.map((feature) => (
            <PremiumAccess
              key={feature.id}
              feature={feature.feature}
              plan={feature.plan}
              className="h-full"
            >
              <Card className="h-full border-green-200 bg-green-50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {feature.icon}
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                    {getPlanBadge(feature.plan)}
                  </div>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-green-700">
                      <Unlock className="w-4 h-4" />
                      <span className="text-sm font-medium">Acesso Liberado</span>
                    </div>
                    
                    <Button className="w-full" variant="outline">
                      Usar Recurso
                    </Button>
                    
                    {isAdminAccess && (
                      <div className="text-xs text-green-600 bg-green-100 p-2 rounded">
                        ✅ Desbloqueado via acesso administrativo
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </PremiumAccess>
          ))}
        </div>
      </div>

      {/* Recursos Administrativos */}
      {isAdminAccess && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-green-700">Recursos Administrativos Exclusivos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {adminFeatures.map((feature) => (
              <Card key={feature.id} className="border-green-300 bg-green-50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {feature.icon}
                    <CardTitle className="text-lg text-green-800">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-green-700">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-green-700">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">Acesso Admin Ativo</span>
                    </div>
                    
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Acessar Recurso
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Informações de Debug */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Informações de Debug
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Estado dos Recursos:</h4>
              <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
                {JSON.stringify(features, null, 2)}
              </pre>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Informações de Acesso:</h4>
              <div className="space-y-1 text-xs">
                <p><strong>Nível:</strong> {getAccessLevel()}</p>
                <p><strong>Admin:</strong> {isAdminAccess ? 'Sim' : 'Não'}</p>
                <p><strong>Acesso Completo:</strong> {hasFullAccess ? 'Sim' : 'Não'}</p>
                <p><strong>PRO:</strong> {isPro ? 'Sim' : 'Não'}</p>
                <p><strong>Premium:</strong> {isPremium ? 'Sim' : 'Não'}</p>
                <p><strong>VIP:</strong> {isVip ? 'Sim' : 'Não'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PremiumDemo;