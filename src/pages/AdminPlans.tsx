import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Edit, 
  Save, 
  X, 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff, 
  BarChart3, 
  Users, 
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  features: string[];
  isPopular: boolean;
  isAvailable: boolean;
  status: 'active' | 'coming_soon' | 'disabled';
  category: 'free' | 'pro' | 'premium';
  billingPeriod: 'monthly' | 'yearly';
  maxUsers?: number;
  maxProjects?: number;
  support: string;
  analytics: {
    subscribers: number;
    revenue: number;
    conversionRate: number;
    churnRate: number;
  };
}

const AdminPlans: React.FC = () => {
  const { isAdmin, hasPermission, logAdminAction } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock data - em produção, buscar do banco de dados
  const mockPlans: Plan[] = [
    {
      id: '1',
      name: 'Gratuito',
      description: 'Ideal para começar a explorar o DialogaMente',
      price: 0,
      features: [
        '1 questionário por mês',
        'Relatórios básicos',
        'Suporte por email',
        'Acesso a templates básicos'
      ],
      isPopular: false,
      isAvailable: true,
      status: 'active',
      category: 'free',
      billingPeriod: 'monthly',
      maxUsers: 1,
      maxProjects: 1,
      support: 'Email',
      analytics: {
        subscribers: 1250,
        revenue: 0,
        conversionRate: 15.2,
        churnRate: 5.1
      }
    },
    {
      id: '2',
      name: 'PRO - Lançamento',
      description: 'Plano promocional com desconto especial',
      price: 47,
      originalPrice: 97,
      features: [
        'Questionários ilimitados',
        'Relatórios avançados',
        'Suporte prioritário',
        'Templates premium',
        'Análise de sentimentos',
        'Exportação de dados'
      ],
      isPopular: true,
      isAvailable: false,
      status: 'coming_soon',
      category: 'pro',
      billingPeriod: 'monthly',
      maxUsers: 5,
      maxProjects: 10,
      support: 'Chat + Email',
      analytics: {
        subscribers: 0,
        revenue: 0,
        conversionRate: 0,
        churnRate: 0
      }
    },
    {
      id: '3',
      name: 'PRO - Normal',
      description: 'Para profissionais que precisam de recursos avançados',
      price: 97,
      features: [
        'Questionários ilimitados',
        'Relatórios avançados',
        'Suporte prioritário',
        'Templates premium',
        'Análise de sentimentos',
        'Exportação de dados',
        'API access',
        'White-label'
      ],
      isPopular: false,
      isAvailable: false,
      status: 'coming_soon',
      category: 'pro',
      billingPeriod: 'monthly',
      maxUsers: 10,
      maxProjects: 25,
      support: 'Chat + Email + Telefone',
      analytics: {
        subscribers: 0,
        revenue: 0,
        conversionRate: 0,
        churnRate: 0
      }
    }
  ];

  useEffect(() => {
    if (!isAdmin) return;
    loadPlans();
  }, [isAdmin]);

  const loadPlans = async () => {
    setLoading(true);
    try {
      // Em produção, fazer chamada para API
      setTimeout(() => {
        setPlans(mockPlans);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Erro ao carregar planos:', error);
      toast.error('Erro ao carregar planos');
      setLoading(false);
    }
  };

  const handleSavePlan = async (plan: Plan) => {
    if (!hasPermission('plans', 'write')) {
      toast.error('Sem permissão para editar planos');
      return;
    }

    try {
      // Em produção, fazer chamada para API
      const updatedPlans = plans.map(p => p.id === plan.id ? plan : p);
      setPlans(updatedPlans);
      setEditingPlan(null);
      
      logAdminAction('update', 'plan', plan.id, { name: plan.name });
      toast.success('Plano atualizado com sucesso');
    } catch (error) {
      console.error('Erro ao salvar plano:', error);
      toast.error('Erro ao salvar plano');
    }
  };

  const handleCreatePlan = async (plan: Omit<Plan, 'id'>) => {
    if (!hasPermission('plans', 'write')) {
      toast.error('Sem permissão para criar planos');
      return;
    }

    try {
      const newPlan: Plan = {
        ...plan,
        id: crypto.randomUUID(),
        analytics: {
          subscribers: 0,
          revenue: 0,
          conversionRate: 0,
          churnRate: 0
        }
      };
      
      setPlans([...plans, newPlan]);
      setIsCreating(false);
      
      logAdminAction('create', 'plan', newPlan.id, { name: newPlan.name });
      toast.success('Plano criado com sucesso');
    } catch (error) {
      console.error('Erro ao criar plano:', error);
      toast.error('Erro ao criar plano');
    }
  };

  const handleDeletePlan = async (planId: string) => {
    if (!hasPermission('plans', 'delete')) {
      toast.error('Sem permissão para deletar planos');
      return;
    }

    if (!confirm('Tem certeza que deseja deletar este plano?')) return;

    try {
      const updatedPlans = plans.filter(p => p.id !== planId);
      setPlans(updatedPlans);
      
      logAdminAction('delete', 'plan', planId);
      toast.success('Plano deletado com sucesso');
    } catch (error) {
      console.error('Erro ao deletar plano:', error);
      toast.error('Erro ao deletar plano');
    }
  };

  const togglePlanAvailability = async (planId: string) => {
    if (!hasPermission('plans', 'write')) {
      toast.error('Sem permissão para alterar disponibilidade');
      return;
    }

    try {
      const updatedPlans = plans.map(p => 
        p.id === planId 
          ? { ...p, isAvailable: !p.isAvailable, status: p.isAvailable ? 'disabled' : 'active' as const }
          : p
      );
      setPlans(updatedPlans);
      
      const plan = plans.find(p => p.id === planId);
      logAdminAction('toggle_availability', 'plan', planId, { 
        name: plan?.name, 
        newStatus: !plan?.isAvailable 
      });
      
      toast.success('Disponibilidade alterada com sucesso');
    } catch (error) {
      console.error('Erro ao alterar disponibilidade:', error);
      toast.error('Erro ao alterar disponibilidade');
    }
  };

  const getStatusBadge = (status: Plan['status']) => {
    const statusConfig = {
      active: { label: 'Ativo', variant: 'default' as const, icon: CheckCircle },
      coming_soon: { label: 'Em breve', variant: 'secondary' as const, icon: Clock },
      disabled: { label: 'Desabilitado', variant: 'destructive' as const, icon: AlertTriangle }
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const calculateTotalRevenue = () => {
    return plans.reduce((total, plan) => total + plan.analytics.revenue, 0);
  };

  const calculateTotalSubscribers = () => {
    return plans.reduce((total, plan) => total + plan.analytics.subscribers, 0);
  };

  const calculateAverageConversion = () => {
    const totalConversion = plans.reduce((total, plan) => total + plan.analytics.conversionRate, 0);
    return plans.length > 0 ? totalConversion / plans.length : 0;
  };

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Acesso Negado</h2>
            <p className="text-gray-600">Você não tem permissão para acessar esta página.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Administração de Planos</h1>
          <p className="text-gray-600">Gerencie e analise todos os planos de assinatura</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Novo Plano
        </Button>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="plans">Gerenciar Planos</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total de Planos</p>
                    <p className="text-2xl font-bold">{plans.length}</p>
                  </div>
                  <Settings className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total de Assinantes</p>
                    <p className="text-2xl font-bold">{calculateTotalSubscribers().toLocaleString()}</p>
                  </div>
                  <Users className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Receita Total</p>
                    <p className="text-2xl font-bold">R$ {calculateTotalRevenue().toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Conversão Média</p>
                    <p className="text-2xl font-bold">{calculateAverageConversion().toFixed(1)}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Status dos Planos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {plans.map((plan) => (
                  <div key={plan.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-semibold">{plan.name}</h3>
                        <p className="text-sm text-gray-600">R$ {plan.price}/mês</p>
                      </div>
                      {getStatusBadge(plan.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-center">
                        <p className="font-semibold">{plan.analytics.subscribers}</p>
                        <p className="text-gray-600">Assinantes</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">R$ {plan.analytics.revenue.toLocaleString()}</p>
                        <p className="text-gray-600">Receita</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onEdit={setEditingPlan}
                onDelete={handleDeletePlan}
                onToggleAvailability={togglePlanAvailability}
                canEdit={hasPermission('plans', 'write')}
                canDelete={hasPermission('plans', 'delete')}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {plan.name}
                    {getStatusBadge(plan.status)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{plan.analytics.subscribers}</p>
                      <p className="text-sm text-gray-600">Assinantes</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">R$ {plan.analytics.revenue.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Receita</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">{plan.analytics.conversionRate}%</p>
                      <p className="text-sm text-gray-600">Conversão</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <p className="text-2xl font-bold text-red-600">{plan.analytics.churnRate}%</p>
                      <p className="text-sm text-gray-600">Churn</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de Edição */}
      {editingPlan && (
        <PlanEditModal
          plan={editingPlan}
          onSave={handleSavePlan}
          onCancel={() => setEditingPlan(null)}
        />
      )}

      {/* Modal de Criação */}
      {isCreating && (
        <PlanCreateModal
          onSave={handleCreatePlan}
          onCancel={() => setIsCreating(false)}
        />
      )}
    </div>
  );
};

// Componente do Card do Plano
interface PlanCardProps {
  plan: Plan;
  onEdit: (plan: Plan) => void;
  onDelete: (planId: string) => void;
  onToggleAvailability: (planId: string) => void;
  canEdit: boolean;
  canDelete: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  onEdit,
  onDelete,
  onToggleAvailability,
  canEdit,
  canDelete
}) => {
  return (
    <Card className={`relative ${plan.isPopular ? 'ring-2 ring-blue-500' : ''}`}>
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-blue-500 text-white">Mais Popular</Badge>
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{plan.name}</CardTitle>
          <div className="flex items-center gap-2">
            {plan.isAvailable ? (
              <Eye className="w-4 h-4 text-green-600" />
            ) : (
              <EyeOff className="w-4 h-4 text-red-600" />
            )}
            {getStatusBadge(plan.status)}
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">R$ {plan.price}</span>
          {plan.originalPrice && (
            <span className="text-lg text-gray-500 line-through">R$ {plan.originalPrice}</span>
          )}
          <span className="text-gray-600">/mês</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-600">{plan.description}</p>
        
        <div className="space-y-2">
          <h4 className="font-semibold">Recursos:</h4>
          <ul className="space-y-1">
            {plan.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                {feature}
              </li>
            ))}
            {plan.features.length > 3 && (
              <li className="text-sm text-gray-500">
                +{plan.features.length - 3} recursos adicionais
              </li>
            )}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="font-medium">Usuários:</span> {plan.maxUsers || '∞'}
          </div>
          <div>
            <span className="font-medium">Projetos:</span> {plan.maxProjects || '∞'}
          </div>
          <div className="col-span-2">
            <span className="font-medium">Suporte:</span> {plan.support}
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          {canEdit && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(plan)}
                className="flex items-center gap-1"
              >
                <Edit className="w-4 h-4" />
                Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onToggleAvailability(plan.id)}
                className="flex items-center gap-1"
              >
                {plan.isAvailable ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {plan.isAvailable ? 'Ocultar' : 'Mostrar'}
              </Button>
            </>
          )}
          {canDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(plan.id)}
              className="flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              Deletar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Modal de Edição (implementação simplificada)
interface PlanEditModalProps {
  plan: Plan;
  onSave: (plan: Plan) => void;
  onCancel: () => void;
}

const PlanEditModal: React.FC<PlanEditModalProps> = ({ plan, onSave, onCancel }) => {
  const [editedPlan, setEditedPlan] = useState<Plan>(plan);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>Editar Plano: {plan.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome</label>
            <Input
              value={editedPlan.name}
              onChange={(e) => setEditedPlan({ ...editedPlan, name: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <Textarea
              value={editedPlan.description}
              onChange={(e) => setEditedPlan({ ...editedPlan, description: e.target.value })}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Preço</label>
              <Input
                type="number"
                value={editedPlan.price}
                onChange={(e) => setEditedPlan({ ...editedPlan, price: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Preço Original</label>
              <Input
                type="number"
                value={editedPlan.originalPrice || ''}
                onChange={(e) => setEditedPlan({ ...editedPlan, originalPrice: e.target.value ? Number(e.target.value) : undefined })}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button onClick={() => onSave(editedPlan)} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Salvar
            </Button>
            <Button variant="outline" onClick={onCancel} className="flex items-center gap-2">
              <X className="w-4 h-4" />
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Modal de Criação (implementação simplificada)
interface PlanCreateModalProps {
  onSave: (plan: Omit<Plan, 'id'>) => void;
  onCancel: () => void;
}

const PlanCreateModal: React.FC<PlanCreateModalProps> = ({ onSave, onCancel }) => {
  const [newPlan, setNewPlan] = useState<Omit<Plan, 'id'>>({
    name: '',
    description: '',
    price: 0,
    features: [],
    isPopular: false,
    isAvailable: true,
    status: 'active',
    category: 'pro',
    billingPeriod: 'monthly',
    support: 'Email',
    analytics: {
      subscribers: 0,
      revenue: 0,
      conversionRate: 0,
      churnRate: 0
    }
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>Criar Novo Plano</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome</label>
            <Input
              value={newPlan.name}
              onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
              placeholder="Nome do plano"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <Textarea
              value={newPlan.description}
              onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
              placeholder="Descrição do plano"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Preço</label>
            <Input
              type="number"
              value={newPlan.price}
              onChange={(e) => setNewPlan({ ...newPlan, price: Number(e.target.value) })}
              placeholder="0"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button onClick={() => onSave(newPlan)} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Criar Plano
            </Button>
            <Button variant="outline" onClick={onCancel} className="flex items-center gap-2">
              <X className="w-4 h-4" />
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPlans;