import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, TrendingUp, Eye, Ear, Hand, ArrowLeft, MessageSquare, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  result_type: string;
  created_at: string;
}

const Reviews = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching reviews:", error);
    } else {
      setReviews(data || []);
    }
    setLoading(false);
  };

  const filteredReviews = filter === "all" 
    ? reviews 
    : reviews.filter(r => r.result_type === filter);

  const stats = {
    total: reviews.length,
    avgRating: reviews.length > 0 
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "0",
    byType: {
      visual: reviews.filter(r => r.result_type === "visual").length,
      auditivo: reviews.filter(r => r.result_type === "auditivo").length,
      cinestesico: reviews.filter(r => r.result_type === "cinestesico").length,
    },
    withComments: reviews.filter(r => r.comment).length,
  };

  const typeConfig = {
    visual: { name: "Visual", icon: Eye, color: "text-purple-600" },
    auditivo: { name: "Auditivo", icon: Ear, color: "text-cyan-600" },
    cinestesico: { name: "Cinestésico", icon: Hand, color: "text-orange-600" },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-purple-50/30 to-cyan-50/20">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Carregando avaliações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-purple-50/30 to-cyan-50/20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12 max-w-7xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")} 
          className="mb-6 hover:bg-purple-50 dark:hover:bg-purple-950/20"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao Início
        </Button>

        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
              Avaliações dos Usuários
            </h1>
            <p className="text-muted-foreground text-lg">
              Acompanhe o feedback e experiência dos participantes
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            <Card className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-purple-50/80 dark:from-gray-900/80 dark:to-purple-950/80 border-purple-200/50 dark:border-purple-800/50">
              <CardHeader className="pb-3">
                <CardDescription>Total de Avaliações</CardDescription>
                <CardTitle className="text-3xl font-display">{stats.total}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4" />
                  <span>Participações completas</span>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-purple-50/80 dark:from-gray-900/80 dark:to-purple-950/80 border-purple-200/50 dark:border-purple-800/50">
              <CardHeader className="pb-3">
                <CardDescription>Nota Média</CardDescription>
                <CardTitle className="text-3xl font-display flex items-center gap-2">
                  {stats.avgRating}
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= parseFloat(stats.avgRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-purple-50/80 dark:from-gray-900/80 dark:to-purple-950/80 border-purple-200/50 dark:border-purple-800/50">
              <CardHeader className="pb-3">
                <CardDescription>Por Perfil</CardDescription>
                <CardTitle className="text-lg font-display">Distribuição</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-purple-600" />
                      Visual
                    </span>
                    <span className="font-semibold">{stats.byType.visual}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      <Ear className="w-4 h-4 text-cyan-600" />
                      Auditivo
                    </span>
                    <span className="font-semibold">{stats.byType.auditivo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      <Hand className="w-4 h-4 text-orange-600" />
                      Cinestésico
                    </span>
                    <span className="font-semibold">{stats.byType.cinestesico}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-purple-50/80 dark:from-gray-900/80 dark:to-purple-950/80 border-purple-200/50 dark:border-purple-800/50">
              <CardHeader className="pb-3">
                <CardDescription>Com Comentários</CardDescription>
                <CardTitle className="text-3xl font-display">{stats.withComments}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageSquare className="w-4 h-4" />
                  <span>{Math.round((stats.withComments / stats.total) * 100)}% deixaram feedback</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-purple-50/80 dark:from-gray-900/80 dark:to-purple-950/80 border-purple-200/50 dark:border-purple-800/50 animate-fade-in">
            <CardContent className="pt-6">
              <Tabs defaultValue="all" onValueChange={setFilter}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">Todos ({stats.total})</TabsTrigger>
                  <TabsTrigger value="visual">
                    <Eye className="w-4 h-4 mr-2" />
                    Visual ({stats.byType.visual})
                  </TabsTrigger>
                  <TabsTrigger value="auditivo">
                    <Ear className="w-4 h-4 mr-2" />
                    Auditivo ({stats.byType.auditivo})
                  </TabsTrigger>
                  <TabsTrigger value="cinestesico">
                    <Hand className="w-4 h-4 mr-2" />
                    Cinestésico ({stats.byType.cinestesico})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          {/* Reviews List */}
          <div className="space-y-4 animate-fade-up">
            {filteredReviews.length === 0 ? (
              <Card className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-purple-50/80 dark:from-gray-900/80 dark:to-purple-950/80 border-purple-200/50 dark:border-purple-800/50">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Nenhuma avaliação encontrada para este filtro.</p>
                </CardContent>
              </Card>
            ) : (
              filteredReviews.map((review) => {
                const config = typeConfig[review.result_type as keyof typeof typeConfig];
                const Icon = config.icon;
                
                return (
                  <Card 
                    key={review.id}
                    className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-purple-50/80 dark:from-gray-900/80 dark:to-purple-950/80 border-purple-200/50 dark:border-purple-800/50 hover:shadow-[0_15px_45px_-10px_rgba(168,85,247,0.25)] transition-all duration-300"
                  >
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="gap-1">
                              <Icon className={`w-4 h-4 ${config.color}`} />
                              {config.name}
                            </Badge>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-semibold">{review.rating}/5</span>
                          </div>
                          
                          {review.comment && (
                            <div className="bg-white/50 dark:bg-gray-900/50 rounded-lg p-4 border border-purple-200/30 dark:border-purple-800/30">
                              <p className="text-sm text-foreground/80">{review.comment}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{format(new Date(review.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
