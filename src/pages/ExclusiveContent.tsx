import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { PremiumAccess } from '@/components/PremiumAccess';
import { usePremiumFeatures } from '@/hooks/usePremiumFeatures';
import { useAuth } from '@/contexts/AuthContext';
import {
  BookOpen,
  Video,
  Download,
  Play,
  Calendar,
  Clock,
  Star,
  Crown,
  Users,
  MessageCircle,
  FileText,
  Headphones,
  Image,
  Bookmark,
  Share2,
  Heart,
  Eye,
  Lock,
  Unlock,
  Gift,
  Zap,
  TrendingUp,
  Award,
  Target,
  Brain,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Filter,
  Search
} from 'lucide-react';

const ExclusiveContent = () => {
  const { canAccessExclusiveContent, isPremium, isVIP, isAdminAccess } = usePremiumFeatures();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [favoriteItems, setFavoriteItems] = useState([]);

  const contentCategories = [
    { id: 'all', name: 'Todos', icon: BookOpen },
    { id: 'webinars', name: 'Webinars', icon: Video },
    { id: 'ebooks', name: 'E-books', icon: FileText },
    { id: 'podcasts', name: 'Podcasts', icon: Headphones },
    { id: 'workshops', name: 'Workshops', icon: Users },
    { id: 'templates', name: 'Templates', icon: Image },
    { id: 'guides', name: 'Guias', icon: Target }
  ];

  const exclusiveContent = [
    {
      id: 1,
      title: 'Masterclass: Comunicação Assertiva no Ambiente Corporativo',
      description: 'Aprenda técnicas avançadas de comunicação para se destacar no ambiente profissional',
      type: 'webinar',
      duration: '90 min',
      releaseDate: '2024-01-15',
      category: 'webinars',
      level: 'Avançado',
      instructor: 'Dr. Ana Silva',
      thumbnail: '/api/thumbnails/masterclass-comunicacao.jpg',
      status: 'available',
      plan: 'premium',
      views: 1247,
      rating: 4.9,
      tags: ['comunicação', 'liderança', 'corporativo'],
      resources: ['PDF de apoio', 'Exercícios práticos', 'Certificado']
    },
    {
      id: 2,
      title: 'E-book: 50 Estratégias de Desenvolvimento Pessoal',
      description: 'Guia completo com estratégias comprovadas para acelerar seu crescimento pessoal',
      type: 'ebook',
      pages: 120,
      releaseDate: '2024-01-10',
      category: 'ebooks',
      level: 'Intermediário',
      author: 'Prof. Carlos Mendes',
      thumbnail: '/api/thumbnails/ebook-estrategias.jpg',
      status: 'available',
      plan: 'premium',
      downloads: 892,
      rating: 4.8,
      tags: ['desenvolvimento', 'estratégias', 'crescimento'],
      resources: ['PDF', 'Áudio narrado', 'Planilhas de exercícios']
    },
    {
      id: 3,
      title: 'Workshop Exclusivo: Inteligência Emocional Avançada',
      description: 'Workshop prático para desenvolver habilidades emocionais de alto nível',
      type: 'workshop',
      duration: '4 horas',
      releaseDate: '2024-01-20',
      category: 'workshops',
      level: 'Avançado',
      instructor: 'Dra. Maria Santos',
      thumbnail: '/api/thumbnails/workshop-ie.jpg',
      status: 'upcoming',
      plan: 'vip',
      participants: 45,
      maxParticipants: 50,
      rating: 5.0,
      tags: ['inteligência emocional', 'workshop', 'prático'],
      resources: ['Acesso ao vivo', 'Gravação', 'Material de apoio', 'Certificado']
    },
    {
      id: 4,
      title: 'Podcast Series: Líderes que Transformam',
      description: 'Série exclusiva com entrevistas de grandes líderes e suas estratégias',
      type: 'podcast',
      episodes: 12,
      releaseDate: '2024-01-05',
      category: 'podcasts',
      level: 'Todos os níveis',
      host: 'João Oliveira',
      thumbnail: '/api/thumbnails/podcast-lideres.jpg',
      status: 'available',
      plan: 'premium',
      listens: 3421,
      rating: 4.7,
      tags: ['liderança', 'entrevistas', 'inspiração'],
      resources: ['12 episódios', 'Transcrições', 'Notas de episódio']
    },
    {
      id: 5,
      title: 'Templates Premium: Kit Completo de Produtividade',
      description: 'Coleção de templates profissionais para maximizar sua produtividade',
      type: 'template',
      items: 25,
      releaseDate: '2024-01-12',
      category: 'templates',
      level: 'Todos os níveis',
      creator: 'Equipe DialogaMente',
      thumbnail: '/api/thumbnails/templates-produtividade.jpg',
      status: 'available',
      plan: 'premium',
      downloads: 1567,
      rating: 4.9,
      tags: ['produtividade', 'templates', 'organização'],
      resources: ['25 templates', 'Guia de uso', 'Versões editáveis']
    },
    {
      id: 6,
      title: 'Guia Definitivo: Networking Estratégico',
      description: 'Manual completo para construir uma rede de contatos poderosa e eficaz',
      type: 'guide',
      chapters: 8,
      releaseDate: '2024-01-18',
      category: 'guides',
      level: 'Intermediário',
      author: 'Especialistas DialogaMente',
      thumbnail: '/api/thumbnails/guia-networking.jpg',
      status: 'available',
      plan: 'vip',
      views: 756,
      rating: 4.8,
      tags: ['networking', 'relacionamentos', 'carreira'],
      resources: ['Guia completo', 'Checklists', 'Scripts de abordagem']
    }
  ];

  const upcomingReleases = [
    {
      id: 7,
      title: 'Masterclass: Negociação de Alto Impacto',
      releaseDate: '2024-02-01',
      type: 'webinar',
      plan: 'premium'
    },
    {
      id: 8,
      title: 'E-book: Mindset de Crescimento',
      releaseDate: '2024-02-05',
      type: 'ebook',
      plan: 'premium'
    },
    {
      id: 9,
      title: 'Workshop VIP: Liderança Transformacional',
      releaseDate: '2024-02-10',
      type: 'workshop',
      plan: 'vip'
    }
  ];

  const filteredContent = exclusiveContent.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (itemId) => {
    setFavoriteItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800">Disponível</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">Em breve</Badge>;
      case 'live':
        return <Badge className="bg-red-100 text-red-800">Ao vivo</Badge>;
      default:
        return <Badge variant="outline">Status</Badge>;
    }
  };

  const getPlanBadge = (plan) => {
    switch (plan) {
      case 'premium':
        return <Badge className="bg-purple-100 text-purple-800">PREMIUM</Badge>;
      case 'vip':
        return <Badge className="bg-yellow-100 text-yellow-800">VIP</Badge>;
      default:
        return <Badge variant="outline">PRO</Badge>;
    }
  };

  if (!canAccessExclusiveContent()) {
    return (
      <PremiumAccess 
        feature="exclusiveContent"
        title="Conteúdo Exclusivo Premium"
        description="Acesse webinars, e-books, workshops e materiais exclusivos criados especialmente para membros premium."
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
                Conteúdo Exclusivo
                {isAdminAccess && <Badge className="ml-2 bg-yellow-100 text-yellow-800">ADMIN</Badge>}
                {isVIP && <Badge className="ml-2 bg-yellow-100 text-yellow-800">VIP</Badge>}
                {isPremium && <Badge className="ml-2 bg-purple-100 text-purple-800">PREMIUM</Badge>}
              </h1>
              <p className="text-gray-600">
                Acesse materiais exclusivos, webinars e recursos premium
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Bookmark className="w-4 h-4 mr-2" />
                Favoritos ({favoriteItems.length})
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Downloads
              </Button>
            </div>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar conteúdo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {contentCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="whitespace-nowrap"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Biblioteca</TabsTrigger>
            <TabsTrigger value="upcoming">Próximos Lançamentos</TabsTrigger>
            <TabsTrigger value="favorites">Favoritos</TabsTrigger>
          </TabsList>

          {/* Aba Biblioteca */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 rounded-t-lg flex items-center justify-center">
                      {item.type === 'webinar' && <Video className="w-12 h-12 text-purple-500" />}
                      {item.type === 'ebook' && <BookOpen className="w-12 h-12 text-blue-500" />}
                      {item.type === 'workshop' && <Users className="w-12 h-12 text-green-500" />}
                      {item.type === 'podcast' && <Headphones className="w-12 h-12 text-orange-500" />}
                      {item.type === 'template' && <Image className="w-12 h-12 text-pink-500" />}
                      {item.type === 'guide' && <Target className="w-12 h-12 text-indigo-500" />}
                    </div>
                    <div className="absolute top-2 left-2 flex gap-1">
                      {getStatusBadge(item.status)}
                      {getPlanBadge(item.plan)}
                    </div>
                    <div className="absolute top-2 right-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(item.id)}
                        className="bg-white/80 hover:bg-white"
                      >
                        <Heart 
                          className={`w-4 h-4 ${favoriteItems.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                        />
                      </Button>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {item.duration || `${item.pages} páginas` || `${item.episodes} episódios` || `${item.items} itens` || `${item.chapters} capítulos`}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {item.rating}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{item.instructor || item.author || item.creator || item.host}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {item.views || item.downloads || item.listens || item.participants}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Recursos inclusos:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {item.resources.slice(0, 3).map((resource, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {resource}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1" size="sm">
                        {item.status === 'available' ? (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Acessar
                          </>
                        ) : (
                          <>
                            <Calendar className="w-4 h-4 mr-2" />
                            Agendar
                          </>
                        )}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Aba Próximos Lançamentos */}
          <TabsContent value="upcoming" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Próximos Lançamentos
                </CardTitle>
                <CardDescription>
                  Fique por dentro dos novos conteúdos que estão chegando
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingReleases.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                          {item.type === 'webinar' && <Video className="w-6 h-6 text-purple-500" />}
                          {item.type === 'ebook' && <BookOpen className="w-6 h-6 text-blue-500" />}
                          {item.type === 'workshop' && <Users className="w-6 h-6 text-green-500" />}
                        </div>
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-gray-600">
                            Lançamento: {new Date(item.releaseDate).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getPlanBadge(item.plan)}
                        <Button variant="outline" size="sm">
                          <Bookmark className="w-4 h-4 mr-2" />
                          Lembrar-me
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Favoritos */}
          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Seus Favoritos
                </CardTitle>
                <CardDescription>
                  Conteúdos que você marcou como favoritos
                </CardDescription>
              </CardHeader>
              <CardContent>
                {favoriteItems.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Nenhum favorito ainda</p>
                    <p className="text-sm text-gray-400">Marque conteúdos como favoritos para acessá-los rapidamente</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {exclusiveContent
                      .filter(item => favoriteItems.includes(item.id))
                      .map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                              {item.type === 'webinar' && <Video className="w-6 h-6 text-purple-500" />}
                              {item.type === 'ebook' && <BookOpen className="w-6 h-6 text-blue-500" />}
                              {item.type === 'workshop' && <Users className="w-6 h-6 text-green-500" />}
                              {item.type === 'podcast' && <Headphones className="w-6 h-6 text-orange-500" />}
                              {item.type === 'template' && <Image className="w-6 h-6 text-pink-500" />}
                              {item.type === 'guide' && <Target className="w-6 h-6 text-indigo-500" />}
                            </div>
                            <div>
                              <h3 className="font-medium">{item.title}</h3>
                              <p className="text-sm text-gray-600">{item.instructor || item.author || item.creator || item.host}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(item.status)}
                            <Button variant="outline" size="sm">
                              <Play className="w-4 h-4 mr-2" />
                              Acessar
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => toggleFavorite(item.id)}
                            >
                              <Heart className="w-4 h-4 fill-red-500 text-red-500" />
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

export default ExclusiveContent;