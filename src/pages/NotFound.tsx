import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-purple-50/30 to-cyan-50/20 flex items-center justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* Error Icon */}
        <div className="flex justify-center mb-8 animate-scale-in">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-700 scale-150 animate-glow"></div>
            <div className="relative backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 p-12 rounded-[2rem] border border-purple-200/50 dark:border-purple-800/50 shadow-[0_30px_90px_-20px_rgba(168,85,247,0.4)]">
              <AlertCircle className="w-24 h-24 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-7xl md:text-9xl font-display font-bold mb-6 animate-fade-up">
          <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
            404
          </span>
        </h1>
        
        <h2 className="text-2xl md:text-4xl font-display font-semibold text-foreground/90 mb-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Página Não Encontrada
        </h2>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Button 
            size="lg" 
            onClick={() => navigate("/")}
            className="text-lg px-10 py-7 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-[0_20px_60px_-15px_rgba(168,85,247,0.5)] hover:shadow-[0_25px_80px_-15px_rgba(168,85,247,0.6)] transition-all duration-500 hover:scale-105 group"
          >
            <Home className="mr-2 w-5 h-5" />
            Voltar para Início
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate(-1)}
            className="text-lg px-10 py-7 rounded-2xl border-2 hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-all duration-300 group"
          >
            <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Voltar
          </Button>
        </div>

        {/* Path Info */}
        <div className="mt-12 p-6 backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl border border-purple-200/50 dark:border-purple-800/50 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <p className="text-sm text-muted-foreground font-mono break-all">
            Caminho tentado: <span className="text-foreground font-semibold">{location.pathname}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
