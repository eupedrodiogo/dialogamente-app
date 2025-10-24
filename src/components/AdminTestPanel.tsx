import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePremium } from '@/contexts/PremiumContext';
import { usePremiumFeatures } from '@/hooks/usePremiumFeatures';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  User, 
  Settings,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  Crown,
  Star,
  Zap,
  Unlock
} from 'lucide-react';

const AdminTestPanel: React.FC = () => {
  const { isAdmin, adminUser, hasPermission, logAdminAction } = useAuth();
  const premium = usePremium();
  const premiumFeatures = usePremiumFeatures();

  const testPermissions = [
    { resource: 'plans', action: 'read', label: 'Visualizar Planos' },
    { resource: 'plans', action: 'write', label: 'Editar Planos' },
    { resource: 'plans', action: 'delete', label: 'Deletar Planos' },
    { resource: 'users', action: 'read', label: 'Visualizar Usuários' },
    { resource: 'users', action: 'write', label: 'Editar Usuários' },
    { resource: 'coupons', action: 'read', label: 'Visualizar Cupons' },
    { resource: 'coupons', action: 'write', label: 'Editar Cupons' },
    { resource: 'analytics', action: 'read', label: 'Visualizar Analytics' }
  ];

  const handleTestAction = (action: string) => {
    logAdminAction('test_action', 'admin_panel', undefined, { action });
  };

  if (!isAdmin) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6 text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Acesso Administrativo Necessário</h2>
          <p className="text-gray-600">
            Faça login como administrador para acessar este painel de teste.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Painel de Teste Administrativo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Informações do Admin */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              Informações do Administrador
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Email:</span> {adminUser?.email}
              </div>
              <div>
                <span className="font-medium">Role:</span> 
                <Badge variant="secondary" className="ml-2">
                  {adminUser?.role.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
              <div>
                <span className="font-medium">Status:</span> 
                <Badge variant={adminUser?.is_active ? 'default' : 'destructive'} className="ml-2">
                  {adminUser?.is_active ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
              <div>
                <span className="font-medium">ID:</span> {adminUser?.id}
              </div>
            </div>
          </div>

          {/* Teste de Permissões */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Teste de Permissões
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {testPermissions.map((perm, index) => {
                const hasAccess = hasPermission(perm.resource, perm.action);
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      hasAccess 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <span className="text-sm font-medium">{perm.label}</span>
                    {hasAccess ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ações de Teste */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Ações de Teste
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleTestAction('view_plans')}
                className="flex items-center gap-2"
                disabled={!hasPermission('plans', 'read')}
              >
                <Eye className="w-4 h-4" />
                Ver Planos
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleTestAction('edit_plan')}
                className="flex items-center gap-2"
                disabled={!hasPermission('plans', 'write')}
              >
                <Edit className="w-4 h-4" />
                Editar Plano
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleTestAction('delete_plan')}
                className="flex items-center gap-2"
                disabled={!hasPermission('plans', 'delete')}
              >
                <Trash2 className="w-4 h-4" />
                Deletar Plano
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleTestAction('view_analytics')}
                className="flex items-center gap-2"
                disabled={!hasPermission('analytics', 'read')}
              >
                <BarChart3 className="w-4 h-4" />
                Analytics
              </Button>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold mb-3">Links Administrativos</h3>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => window.open('/admin/plans', '_blank')}
                disabled={!hasPermission('plans', 'read')}
              >
                Gerenciar Planos
              </Button>
              
              <Button
                onClick={() => window.open('/admin/cupons', '_blank')}
                disabled={!hasPermission('coupons', 'read')}
              >
                Gerenciar Cupons
              </Button>
              
              <Button
                onClick={() => window.open('/pricing', '_blank')}
              >
                Ver Página de Preços
              </Button>
            </div>
          </div>

          {/* Testes Premium */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              Sistema Premium - Testes de Acesso
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Status Premium */}
              <Card className="border-green-200 bg-green-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Unlock className="w-4 h-4" />
                    Status de Acesso Premium
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Nível:</span>
                    <Badge className="bg-green-100 text-green-800">
                      {premium.getAccessLevel()}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Admin Access:</span>
                    <Badge className={premium.isAdminAccess ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {premium.isAdminAccess ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Acesso Completo:</span>
                    <Badge className={premium.hasFullAccess ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {premium.hasFullAccess ? 'Sim' : 'Não'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Recursos Testados */}
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Recursos Premium Ativos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <div className={`flex items-center gap-1 ${premiumFeatures.canGeneratePDF() ? 'text-green-600' : 'text-gray-400'}`}>
                      {premiumFeatures.canGeneratePDF() ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      PDF Reports
                    </div>
                    <div className={`flex items-center gap-1 ${premiumFeatures.canAccessDashboard() ? 'text-green-600' : 'text-gray-400'}`}>
                      {premiumFeatures.canAccessDashboard() ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      Dashboard
                    </div>
                    <div className={`flex items-center gap-1 ${premiumFeatures.canAccessAnalytics() ? 'text-green-600' : 'text-gray-400'}`}>
                      {premiumFeatures.canAccessAnalytics() ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      Analytics
                    </div>
                    <div className={`flex items-center gap-1 ${premiumFeatures.canExportData() ? 'text-green-600' : 'text-gray-400'}`}>
                      {premiumFeatures.canExportData() ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      Export Data
                    </div>
                    <div className={`flex items-center gap-1 ${premiumFeatures.canAccessAPI() ? 'text-green-600' : 'text-gray-400'}`}>
                      {premiumFeatures.canAccessAPI() ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      API Access
                    </div>
                    <div className={`flex items-center gap-1 ${premiumFeatures.canAccessPersonalizedContent() ? 'text-green-600' : 'text-gray-400'}`}>
                      {premiumFeatures.canAccessPersonalizedContent() ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      VIP Content
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => window.open('/premium-demo', '_blank')}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Crown className="w-4 h-4 mr-2" />
                Testar Recursos Premium
              </Button>
              
              <Button
                onClick={() => {
                  premiumFeatures.logAccess('unlimitedTests', 'test');
                  handleTestAction('test_unlimited_tests');
                }}
                disabled={!premiumFeatures.canUseUnlimitedTests()}
                variant="outline"
              >
                <Zap className="w-4 h-4 mr-2" />
                Testar Testes Ilimitados
              </Button>
              
              <Button
                onClick={() => {
                  premiumFeatures.logAccess('advancedAnalytics', 'test');
                  handleTestAction('test_analytics');
                }}
                disabled={!premiumFeatures.canAccessAnalytics()}
                variant="outline"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Testar Analytics
              </Button>
            </div>
          </div>

          {/* Instruções */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Como Testar o Sistema</h3>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• Use a combinação <kbd className="bg-gray-200 px-1 rounded">Ctrl+Shift+A+D+M+I+N</kbd> para ativar o painel admin</li>
              <li>• Ou adicione <code>?admin=true</code> na URL</li>
              <li>• Em desenvolvimento, use o botão "Admin (Dev)" no canto inferior esquerdo</li>
              <li>• Credenciais: qualquer email da lista + senha: <code>DialogaMente2025!Admin</code></li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTestPanel;