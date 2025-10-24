import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PremiumAccess } from '@/components/PremiumAccess';
import { usePremiumFeatures } from '@/hooks/usePremiumFeatures';
import { useAuth } from '@/contexts/AuthContext';
import {
  MessageCircle,
  Phone,
  Video,
  Mail,
  Clock,
  Star,
  Crown,
  Shield,
  Zap,
  CheckCircle,
  AlertCircle,
  Info,
  Send,
  Paperclip,
  Search,
  Filter,
  Calendar,
  User,
  Settings,
  HeadphonesIcon,
  Mic,
  MicOff,
  VideoIcon,
  VideoOff,
  MoreVertical,
  Download,
  Upload,
  FileText,
  Image,
  Archive,
  Bookmark,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Bell,
  BellOff,
  Users,
  Target,
  Award,
  TrendingUp,
  BarChart3,
  Activity,
  Globe,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Plus,
  Book
} from 'lucide-react';

const VIPSupport = () => {
  const { canAccessVIPSupport, isPremium, isVIP, isAdminAccess } = usePremiumFeatures();
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isOnline, setIsOnline] = useState(true);

  const supportChannels = [
    {
      id: 'live-chat',
      name: 'Chat Ao Vivo',
      description: 'Resposta imediata com especialistas',
      icon: MessageCircle,
      availability: '24/7',
      responseTime: 'Imediato',
      status: 'online',
      plan: 'vip'
    },
    {
      id: 'video-call',
      name: 'Videochamada',
      description: 'Suporte personalizado por vídeo',
      icon: Video,
      availability: '8h-18h',
      responseTime: 'Agendamento',
      status: 'available',
      plan: 'vip'
    },
    {
      id: 'phone',
      name: 'Telefone',
      description: 'Linha direta prioritária',
      icon: Phone,
      availability: '8h-22h',
      responseTime: '< 2 min',
      status: 'available',
      plan: 'vip'
    },
    {
      id: 'email',
      name: 'Email Prioritário',
      description: 'Suporte por email com prioridade',
      icon: Mail,
      availability: '24/7',
      responseTime: '< 1 hora',
      status: 'online',
      plan: 'premium'
    }
  ];

  const supportTeam = [
    {
      id: 1,
      name: 'Ana Silva',
      role: 'Especialista VIP',
      avatar: '/avatars/ana.jpg',
      status: 'online',
      specialties: ['API', 'Integrações', 'Analytics'],
      rating: 4.9,
      languages: ['Português', 'Inglês']
    },
    {
      id: 2,
      name: 'Carlos Santos',
      role: 'Consultor Premium',
      avatar: '/avatars/carlos.jpg',
      status: 'online',
      specialties: ['Relatórios', 'Exportação', 'Configurações'],
      rating: 4.8,
      languages: ['Português', 'Espanhol']
    },
    {
      id: 3,
      name: 'Marina Costa',
      role: 'Gerente de Sucesso',
      avatar: '/avatars/marina.jpg',
      status: 'busy',
      specialties: ['Estratégia', 'Treinamento', 'Consultoria'],
      rating: 5.0,
      languages: ['Português', 'Inglês', 'Francês']
    }
  ];

  const sampleTickets = [
    {
      id: 1,
      title: 'Integração API com sistema externo',
      description: 'Preciso de ajuda para integrar a API com nosso CRM',
      status: 'open',
      priority: 'high',
      category: 'technical',
      created: '2024-01-20T10:30:00Z',
      updated: '2024-01-20T14:15:00Z',
      assignee: 'Ana Silva',
      messages: 5
    },
    {
      id: 2,
      title: 'Configuração de relatórios personalizados',
      description: 'Como configurar relatórios com métricas específicas',
      status: 'in_progress',
      priority: 'medium',
      category: 'configuration',
      created: '2024-01-19T16:20:00Z',
      updated: '2024-01-20T09:45:00Z',
      assignee: 'Carlos Santos',
      messages: 3
    },
    {
      id: 3,
      title: 'Consultoria estratégica para implementação',
      description: 'Sessão de consultoria para otimizar uso da plataforma',
      status: 'resolved',
      priority: 'low',
      category: 'consultation',
      created: '2024-01-18T11:00:00Z',
      updated: '2024-01-19T15:30:00Z',
      assignee: 'Marina Costa',
      messages: 8
    }
  ];

  const chatMessages = [
    {
      id: 1,
      sender: 'Ana Silva',
      message: 'Olá! Como posso ajudá-lo hoje?',
      timestamp: '14:30',
      type: 'received'
    },
    {
      id: 2,
      sender: 'Você',
      message: 'Preciso de ajuda com a integração da API',
      timestamp: '14:31',
      type: 'sent'
    },
    {
      id: 3,
      sender: 'Ana Silva',
      message: 'Claro! Vou te ajudar com isso. Qual endpoint específico você está tentando usar?',
      timestamp: '14:31',
      type: 'received'
    }
  ];

  const knowledgeBase = [
    {
      id: 1,
      title: 'Guia de Integração API',
      category: 'API',
      views: 1250,
      helpful: 98,
      updated: '2024-01-15'
    },
    {
      id: 2,
      title: 'Configuração de Relatórios Avançados',
      category: 'Relatórios',
      views: 890,
      helpful: 95,
      updated: '2024-01-12'
    },
    {
      id: 3,
      title: 'Exportação de Dados em Massa',
      category: 'Exportação',
      views: 670,
      helpful: 92,
      updated: '2024-01-10'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      online: { color: 'bg-green-100 text-green-800', text: 'Online' },
      busy: { color: 'bg-yellow-100 text-yellow-800', text: 'Ocupado' },
      offline: { color: 'bg-gray-100 text-gray-800', text: 'Offline' },
      available: { color: 'bg-blue-100 text-blue-800', text: 'Disponível' }
    };
    const config = statusConfig[status] || statusConfig.offline;
    return <Badge className={config.color}>{config.text}</Badge>;
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { color: 'bg-red-100 text-red-800', text: 'Alta' },
      medium: { color: 'bg-yellow-100 text-yellow-800', text: 'Média' },
      low: { color: 'bg-green-100 text-green-800', text: 'Baixa' }
    };
    const config = priorityConfig[priority] || priorityConfig.low;
    return <Badge className={config.color}>{config.text}</Badge>;
  };

  const getTicketStatusBadge = (status) => {
    const statusConfig = {
      open: { color: 'bg-blue-100 text-blue-800', text: 'Aberto' },
      in_progress: { color: 'bg-yellow-100 text-yellow-800', text: 'Em Andamento' },
      resolved: { color: 'bg-green-100 text-green-800', text: 'Resolvido' },
      closed: { color: 'bg-gray-100 text-gray-800', text: 'Fechado' }
    };
    const config = statusConfig[status] || statusConfig.open;
    return <Badge className={config.color}>{config.text}</Badge>;
  };

  const sendMessage = () => {
    if (message.trim()) {
      // Lógica para enviar mensagem
      setMessage('');
    }
  };

  if (!canAccessVIPSupport()) {
    return (
      <PremiumAccess 
        feature="vipSupport"
        title="Suporte Prioritário VIP"
        description="Acesso exclusivo a suporte 24/7 com especialistas dedicados."
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
                Suporte Prioritário VIP
                {isAdminAccess && <Badge className="ml-2 bg-yellow-100 text-yellow-800">ADMIN</Badge>}
                {isVIP && <Badge className="ml-2 bg-yellow-100 text-yellow-800">VIP</Badge>}
                {isPremium && <Badge className="ml-2 bg-purple-100 text-purple-800">PREMIUM</Badge>}
              </h1>
              <p className="text-gray-600">
                Suporte exclusivo 24/7 com especialistas dedicados
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Agendar Chamada
              </Button>
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4 mr-2" />
                Ligar Agora
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="chat" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="chat">Chat Ao Vivo</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="team">Equipe</TabsTrigger>
            <TabsTrigger value="knowledge">Base de Conhecimento</TabsTrigger>
            <TabsTrigger value="schedule">Agendamentos</TabsTrigger>
          </TabsList>

          {/* Aba Chat Ao Vivo */}
          <TabsContent value="chat" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Canais de Suporte */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HeadphonesIcon className="w-5 h-5" />
                      Canais de Suporte
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {supportChannels.map((channel) => {
                      const Icon = channel.icon;
                      return (
                        <div key={channel.id} className="border rounded-lg p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4" />
                              <span className="font-medium text-sm">{channel.name}</span>
                            </div>
                            {getStatusBadge(channel.status)}
                          </div>
                          <p className="text-xs text-gray-600">{channel.description}</p>
                          <div className="text-xs space-y-1">
                            <div className="flex justify-between">
                              <span>Disponibilidade:</span>
                              <span className="font-medium">{channel.availability}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Resposta:</span>
                              <span className="font-medium">{channel.responseTime}</span>
                            </div>
                          </div>
                          <Button size="sm" className="w-full">
                            Iniciar
                          </Button>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>

              {/* Chat Interface */}
              <div className="lg:col-span-3">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/avatars/ana.jpg" />
                          <AvatarFallback>AS</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">Ana Silva</CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Especialista VIP • Online
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <VideoIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.type === 'sent' 
                            ? 'bg-purple-500 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{msg.message}</p>
                          <p className={`text-xs mt-1 ${
                            msg.type === 'sent' ? 'text-purple-100' : 'text-gray-500'
                          }`}>
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>

                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Input
                        placeholder="Digite sua mensagem..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={sendMessage}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Aba Tickets */}
          <TabsContent value="tickets" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Seus Tickets
                      </CardTitle>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Ticket
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sampleTickets.map((ticket) => (
                        <div 
                          key={ticket.id} 
                          className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => setSelectedTicket(ticket)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="font-medium">{ticket.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{ticket.description}</p>
                            </div>
                            <div className="flex flex-col gap-1 ml-4">
                              {getTicketStatusBadge(ticket.status)}
                              {getPriorityBadge(ticket.priority)}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-4">
                              <span>#{ticket.id}</span>
                              <span>{ticket.assignee}</span>
                              <span>{ticket.messages} mensagens</span>
                            </div>
                            <span>{new Date(ticket.updated).toLocaleDateString('pt-BR')}</span>
                          </div>
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
                      <BarChart3 className="w-5 h-5" />
                      Estatísticas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-xl font-bold text-blue-600">3</p>
                        <p className="text-xs text-gray-600">Tickets Abertos</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-xl font-bold text-green-600">12</p>
                        <p className="text-xs text-gray-600">Resolvidos</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-xl font-bold text-purple-600">2h</p>
                        <p className="text-xs text-gray-600">Tempo Médio</p>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <p className="text-xl font-bold text-yellow-600">4.9</p>
                        <p className="text-xs text-gray-600">Satisfação</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="w-5 h-5" />
                      Benefícios VIP
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Resposta em até 1 hora</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Especialista dedicado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Suporte 24/7</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Videochamadas ilimitadas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Linha direta prioritária</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Aba Equipe */}
          <TabsContent value="team" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportTeam.map((member) => (
                <Card key={member.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          {member.role}
                          {getStatusBadge(member.status)}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Especialidades</p>
                      <div className="flex flex-wrap gap-1">
                        {member.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Idiomas</p>
                      <p className="text-sm text-gray-600">{member.languages.join(', ')}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{member.rating}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Video className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Aba Base de Conhecimento */}
          <TabsContent value="knowledge" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Book className="w-5 h-5" />
                      Artigos Populares
                    </CardTitle>
                    <CardDescription>
                      Encontre respostas rápidas para dúvidas comuns
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {knowledgeBase.map((article) => (
                        <div key={article.id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium">{article.title}</h3>
                              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                <Badge variant="outline">{article.category}</Badge>
                                <span>{article.views} visualizações</span>
                                <span>{article.helpful}% útil</span>
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(article.updated).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
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
                      <Search className="w-5 h-5" />
                      Buscar Ajuda
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input placeholder="Digite sua dúvida..." />
                    <Button className="w-full">
                      <Search className="w-4 h-4 mr-2" />
                      Buscar
                    </Button>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Categorias</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      API & Integrações
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Relatórios
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Exportação de Dados
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Configurações
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Billing & Planos
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Aba Agendamentos */}
          <TabsContent value="schedule" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Agendar Consultoria
                  </CardTitle>
                  <CardDescription>
                    Agende uma sessão personalizada com nossos especialistas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Tipo de Sessão</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consultation">Consultoria Estratégica</SelectItem>
                          <SelectItem value="training">Treinamento Personalizado</SelectItem>
                          <SelectItem value="technical">Suporte Técnico</SelectItem>
                          <SelectItem value="integration">Ajuda com Integração</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Especialista</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {supportTeam.map((member) => (
                            <SelectItem key={member.id} value={member.id.toString()}>
                              {member.name} - {member.role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Descrição</Label>
                    <Textarea placeholder="Descreva o que você gostaria de discutir..." />
                  </div>

                  <Button className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Agendar Sessão
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Próximos Agendamentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Nenhum agendamento</p>
                    <p className="text-sm text-gray-400">Seus próximos agendamentos aparecerão aqui</p>
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

export default VIPSupport;