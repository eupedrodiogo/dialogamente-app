import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScopeHeaderProps {
  onExport: () => void;
}

export const ScopeHeader = ({ onExport }: ScopeHeaderProps) => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-500 py-20 px-6 animate-gradient-shift bg-300%">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" } as React.CSSProperties}></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 animate-fade-in">
          <div className="relative group">
            <div className="absolute inset-0 bg-white/30 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500"></div>
            <div className="relative p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
              <FileText className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-3 drop-shadow-lg">DialogaMente</h1>
            <p className="text-xl md:text-2xl text-white/95 font-light">Documento de Escopo Técnico e Funcional</p>
          </div>
          
          <Button 
            onClick={onExport}
            size="lg"
            className="gap-2 bg-white text-purple-600 hover:bg-white/90 shadow-[0_20px_60px_-15px_rgba(255,255,255,0.5)] hover:shadow-[0_25px_80px_-15px_rgba(255,255,255,0.6)] transition-all duration-500 hover:scale-105 rounded-xl px-8 py-6"
          >
            <Download className="w-5 h-5" />
            Exportar PDF
          </Button>
        </div>
        
        <div className="backdrop-blur-xl bg-white/15 rounded-3xl p-8 border border-white/30 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] animate-fade-up" style={{ animationDelay: "0.2s" } as React.CSSProperties}>
          <p className="text-white/95 text-lg md:text-xl leading-relaxed font-light">
            Plataforma web interativa para identificação de estilos de comunicação predominantes 
            (Visual, Auditivo ou Cinestésico) através de questionário científico personalizado com exportação de resultados.
          </p>
        </div>
      </div>
    </header>
  );
};
