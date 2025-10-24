import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { PremiumAccess } from '@/components/PremiumAccess';
import { usePremiumFeatures } from '@/hooks/usePremiumFeatures';
import { useAuth } from '@/contexts/AuthContext';
import {
  Key,
  Code,
  Book,
  Shield,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Info,
  ExternalLink,
  Download,
  Upload,
  Database,
  Zap,
  Crown,
  Star,
  Settings,
  Activity,
  BarChart3,
  Users,
  Globe,
  Lock,
  Unlock,
  Terminal,
  FileText,
  Layers,
  Network,
  Server,
  Cloud,
  Webhook,
  Timer,
  Target,
  Award
} from 'lucide-react';

const APIAccess = () => {
  const { canAccessAPI, isPremium, isVIP, isAdminAccess } = usePremiumFeatures();
  const { user } = useAuth();
  const [apiKeys, setApiKeys] = useState([]);
  const [showKey, setShowKey] = useState({});
  const [selectedEndpoint, setSelectedEndpoint] = useState('user-data');
  const [apiUsage, setApiUsage] = useState({
    requests: 1247,
    limit: 10000,
    resetDate: '2024-02-01'
  });

  const apiEndpoints = [
    {
      id: 'user-data',
      name: 'Dados do Usuário',
      method: 'GET',
      endpoint: '/api/v1/user/profile',
      description: 'Obter informações do perfil do usuário',
      plan: 'premium',
      rateLimit: '100/hour'
    },
    {
      id: 'test-results',
      name: 'Resultados de Testes',
      method: 'GET',
      endpoint: '/api/v1/tests/results',
      description: 'Listar resultados de testes do usuário',
      plan: 'premium',
      rateLimit: '50/hour'
    },
    {
      id: 'analytics',
      name: 'Analytics',
      method: 'GET',
      endpoint: '/api/v1/analytics/summary',
      description: 'Obter resumo de analytics e métricas',
      plan: 'vip',
      rateLimit: '25/hour'
    },
    {
      id: 'export-data',
      name: 'Exportar Dados',
      method: 'POST',
      endpoint: '/api/v1/export/create',
      description: 'Criar exportação de dados personalizada',
      plan: 'vip',
      rateLimit: '10/hour'
    },
    {
      id: 'webhooks',
      name: 'Webhooks',
      method: 'POST',
      endpoint: '/api/v1/webhooks/register',
      description: 'Registrar webhook para eventos',
      plan: 'vip',
      rateLimit: '5/hour'
    }
  ];

  const codeExamples = {
    'user-data': {
      curl: `curl -X GET "https://api.comunicapro.com/v1/user/profile" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
      javascript: `const response = await fetch('https://api.comunicapro.com/v1/user/profile', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const userData = await response.json();
console.log(userData);`,
      python: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.comunicapro.com/v1/user/profile',
    headers=headers
)

user_data = response.json()
print(user_data)`
    },
    'test-results': {
      curl: `curl -X GET "https://api.comunicapro.com/v1/tests/results?limit=10&offset=0" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
      javascript: `const response = await fetch('https://api.comunicapro.com/v1/tests/results?limit=10&offset=0', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const testResults = await response.json();
console.log(testResults);`,
      python: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

params = {
    'limit': 10,
    'offset': 0
}

response = requests.get(
    'https://api.comunicapro.com/v1/tests/results',
    headers=headers,
    params=params
)

test_results = response.json()
print(test_results)`
    }
  };

  const sampleApiKeys = [
    {
      id: 1,
      name: 'Produção - App Principal',
      key: 'cp_live_1234567890abcdef1234567890abcdef',
      created: '2024-01-15',
      lastUsed: '2024-01-20',
      permissions: ['read', 'write'],
      status: 'active'
    },
    {
      id: 2,
      name: 'Desenvolvimento - Testes',
      key: 'cp_test_abcdef1234567890abcdef1234567890',
      created: '2024-01-10',
      lastUsed: '2024-01-19',
      permissions: ['read'],
      status: 'active'
    }
  ];

  const generateApiKey = () => {
    const newKey = {
      id: Date.now(),
      name: 'Nova Chave API',
      key: `cp_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Nunca',
      permissions: ['read'],
      status: 'active'
    };
    setApiKeys(prev => [...prev, newKey]);
  };

  const toggleKeyVisibility = (keyId) => {
    setShowKey(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const getPlanBadge = (plan) => {
    switch (plan) {
      case 'premium':
        return <Badge className="bg-purple-100 text-purple-800">PREMIUM</Badge>;
      case 'vip':
        return <Badge className="bg-yellow-100 text-yellow-800">VIP</Badge>;
      default:
        return null;
    }
  };

  const getMethodBadge = (method) => {
    const colors = {
      GET: 'bg-green-100 text-green-800',
      POST: 'bg-blue-100 text-blue-800',
      PUT: 'bg-yellow-100 text-yellow-800',
      DELETE: 'bg-red-100 text-red-800'
    };
    return <Badge className={colors[method] || 'bg-gray-100 text-gray-800'}>{method}</Badge>;
  };

  if (!canAccessAPI()) {
    return (
      <PremiumAccess 
        feature="apiAccess"
        title="Acesso à API"
        description="Integre seus dados com aplicações externas através da nossa API REST."
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
                API Access
                {isAdminAccess && <Badge className="ml-2 bg-yellow-100 text-yellow-800">ADMIN</Badge>}
                {isVIP && <Badge className="ml-2 bg-yellow-100 text-yellow-800">VIP</Badge>}
                {isPremium && <Badge className="ml-2 bg-purple-100 text-purple-800">PREMIUM</Badge>}
              </h1>
              <p className="text-gray-600">
                Integre seus dados com aplicações externas através da nossa API REST
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Book className="w-4 h-4 mr-2" />
                Documentação
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                Status da API
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="keys" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="keys">Chaves API</TabsTrigger>
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="docs">Documentação</TabsTrigger>
            <TabsTrigger value="usage">Uso & Limites</TabsTrigger>
          </TabsList>

          {/* Aba Chaves API */}
          <TabsContent value="keys" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Key className="w-5 h-5" />
                          Suas Chaves API
                        </CardTitle>
                        <CardDescription>
                          Gerencie suas chaves de acesso à API
                        </CardDescription>
                      </div>
                      <Button onClick={generateApiKey}>
                        <Plus className="w-4 h-4 mr-2" />
                        Nova Chave
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {[...apiKeys, ...sampleApiKeys].length === 0 ? (
                      <div className="text-center py-8">
                        <Key className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Nenhuma chave API criada</p>
                        <p className="text-sm text-gray-400">Crie sua primeira chave para começar</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {[...apiKeys, ...sampleApiKeys].map((key) => (
                          <div key={key.id} className="border rounded-lg p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-medium">{key.name}</h3>
                                <p className="text-sm text-gray-600">
                                  Criada em {new Date(key.created).toLocaleDateString('pt-BR')}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={key.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                  {key.status === 'active' ? 'Ativa' : 'Inativa'}
                                </Badge>
                                <Button variant="outline" size="sm">
                                  <Settings className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Chave API</Label>
                              <div className="flex items-center gap-2">
                                <Input
                                  value={showKey[key.id] ? key.key : key.key.replace(/./g, '•')}
                                  readOnly
                                  className="font-mono text-sm"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => toggleKeyVisibility(key.id)}
                                >
                                  {showKey[key.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard(key.key)}
                                >
                                  <Copy className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Último uso:</span>
                                <p className="font-medium">{key.lastUsed}</p>
                              </div>
                              <div>
                                <span className="text-gray-600">Permissões:</span>
                                <div className="flex gap-1 mt-1">
                                  {key.permissions.map((perm) => (
                                    <Badge key={perm} variant="outline" className="text-xs">
                                      {perm}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Uso da API
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Requisições este mês</span>
                        <span className="font-medium">{apiUsage.requests.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full" 
                          style={{ width: `${(apiUsage.requests / apiUsage.limit) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>0</span>
                        <span>{apiUsage.limit.toLocaleString()} limite</span>
                      </div>
                    </div>

                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span>Reset em:</span>
                        <span className="font-medium">{new Date(apiUsage.resetDate).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <Badge className="bg-green-100 text-green-800">Operacional</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Segurança
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>HTTPS obrigatório</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Rate limiting ativo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Logs de auditoria</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Autenticação Bearer</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Aba Endpoints */}
          <TabsContent value="endpoints" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Network className="w-5 h-5" />
                      Endpoints Disponíveis
                    </CardTitle>
                    <CardDescription>
                      Explore os endpoints da API e suas funcionalidades
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {apiEndpoints.map((endpoint) => (
                        <div 
                          key={endpoint.id} 
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            selectedEndpoint === endpoint.id ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                          }`}
                          onClick={() => setSelectedEndpoint(endpoint.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getMethodBadge(endpoint.method)}
                              <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                {endpoint.endpoint}
                              </code>
                            </div>
                            <div className="flex items-center gap-2">
                              {getPlanBadge(endpoint.plan)}
                              <Badge variant="outline" className="text-xs">
                                {endpoint.rateLimit}
                              </Badge>
                            </div>
                          </div>
                          <h3 className="font-medium">{endpoint.name}</h3>
                          <p className="text-sm text-gray-600">{endpoint.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Exemplo de Código
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {codeExamples[selectedEndpoint] && (
                      <Tabs defaultValue="curl" className="space-y-4">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="curl">cURL</TabsTrigger>
                          <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                          <TabsTrigger value="python">Python</TabsTrigger>
                        </TabsList>
                        
                        {Object.entries(codeExamples[selectedEndpoint]).map(([lang, code]) => (
                          <TabsContent key={lang} value={lang}>
                            <div className="relative">
                              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                                <code>{code}</code>
                              </pre>
                              <Button
                                variant="outline"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => copyToClipboard(code)}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                          </TabsContent>
                        ))}
                      </Tabs>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Aba Documentação */}
          <TabsContent value="docs" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="w-5 h-5" />
                    Guia de Início Rápido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                        1
                      </div>
                      <div>
                        <h3 className="font-medium">Crie uma chave API</h3>
                        <p className="text-sm text-gray-600">Gere sua primeira chave na aba "Chaves API"</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                        2
                      </div>
                      <div>
                        <h3 className="font-medium">Configure a autenticação</h3>
                        <p className="text-sm text-gray-600">Use Bearer Token no header Authorization</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                        3
                      </div>
                      <div>
                        <h3 className="font-medium">Faça sua primeira requisição</h3>
                        <p className="text-sm text-gray-600">Teste com o endpoint /api/v1/user/profile</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Autenticação
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Bearer Token</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Inclua sua chave API no header Authorization:
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
                      <code>Authorization: Bearer YOUR_API_KEY</code>
                    </pre>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Rate Limits</h3>
                    <p className="text-sm text-gray-600">
                      Cada endpoint tem limites específicos. Verifique os headers de resposta:
                    </p>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• X-RateLimit-Limit</li>
                      <li>• X-RateLimit-Remaining</li>
                      <li>• X-RateLimit-Reset</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Códigos de Erro
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <code className="bg-red-100 text-red-800 px-2 py-1 rounded">400</code>
                      <span>Bad Request - Parâmetros inválidos</span>
                    </div>
                    <div className="flex justify-between">
                      <code className="bg-red-100 text-red-800 px-2 py-1 rounded">401</code>
                      <span>Unauthorized - Chave API inválida</span>
                    </div>
                    <div className="flex justify-between">
                      <code className="bg-red-100 text-red-800 px-2 py-1 rounded">403</code>
                      <span>Forbidden - Sem permissão</span>
                    </div>
                    <div className="flex justify-between">
                      <code className="bg-red-100 text-red-800 px-2 py-1 rounded">429</code>
                      <span>Too Many Requests - Rate limit</span>
                    </div>
                    <div className="flex justify-between">
                      <code className="bg-red-100 text-red-800 px-2 py-1 rounded">500</code>
                      <span>Internal Server Error</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ExternalLink className="w-5 h-5" />
                    Recursos Adicionais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Documentação Completa
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Postman Collection
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Code className="w-4 h-4 mr-2" />
                    SDKs e Bibliotecas
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Webhook className="w-4 h-4 mr-2" />
                    Webhooks
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Aba Uso & Limites */}
          <TabsContent value="usage" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Estatísticas de Uso
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">1,247</p>
                      <p className="text-sm text-gray-600">Requisições este mês</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">98.5%</p>
                      <p className="text-sm text-gray-600">Uptime</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">245ms</p>
                      <p className="text-sm text-gray-600">Latência média</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <p className="text-2xl font-bold text-yellow-600">2</p>
                      <p className="text-sm text-gray-600">Chaves ativas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Timer className="w-5 h-5" />
                    Limites por Plano
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">Premium</h3>
                        <Badge className="bg-purple-100 text-purple-800">Seu plano</Badge>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 10,000 requisições/mês</li>
                        <li>• 100 requisições/hora</li>
                        <li>• Endpoints básicos</li>
                        <li>• Suporte por email</li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4 opacity-60">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">VIP</h3>
                        <Badge className="bg-yellow-100 text-yellow-800">Upgrade</Badge>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 50,000 requisições/mês</li>
                        <li>• 500 requisições/hora</li>
                        <li>• Todos os endpoints</li>
                        <li>• Webhooks</li>
                        <li>• Suporte prioritário</li>
                      </ul>
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

export default APIAccess;