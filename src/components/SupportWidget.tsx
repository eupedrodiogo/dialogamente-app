import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Headphones, MessageCircle, Mail, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SUPPORT_CONFIG } from "@/lib/constants";

export const SupportWidget = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            size="lg"
            className="h-16 w-16 rounded-full shadow-[0_20px_60px_-15px_rgba(168,85,247,0.6)] hover:shadow-[0_25px_80px_-15px_rgba(168,85,247,0.7)] bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-500 hover:scale-110 group animate-float"
          >
            <Headphones className="w-7 h-7 text-white group-hover:rotate-12 transition-transform" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          side="top"
          align="end"
          className="w-80 p-0 border-2 border-purple-200 dark:border-purple-800 shadow-[0_20px_60px_-15px_rgba(168,85,247,0.4)] backdrop-blur-xl bg-white/95 dark:bg-gray-900/95"
        >
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <h3 className="font-display font-semibold text-lg">
                Precisa de Ajuda?
              </h3>
              <p className="text-sm text-muted-foreground">
                Escolha o melhor canal para você
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <HelpCircle className="w-3 h-3" />
                {SUPPORT_CONFIG.hours.short}
              </p>
            </div>

            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-12 border-2 hover:bg-green-50 dark:hover:bg-green-950/20 hover:border-green-400"
                asChild
              >
                <a
                  href={SUPPORT_CONFIG.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                >
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">WhatsApp</p>
                    <p className="text-xs text-muted-foreground">Mais rápido</p>
                  </div>
                </a>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-12 border-2 hover:bg-purple-50 dark:hover:bg-purple-950/20 hover:border-purple-400"
                onClick={() => {
                  navigate("/suporte#contact-form");
                  setIsOpen(false);
                }}
              >
                <Mail className="w-5 h-5 text-purple-600" />
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-xs text-muted-foreground">24h úteis</p>
                </div>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12 hover:bg-cyan-50 dark:hover:bg-cyan-950/20"
                onClick={() => {
                  navigate("/suporte");
                  setIsOpen(false);
                }}
              >
                <Headphones className="w-5 h-5 text-cyan-600" />
                <span className="text-sm font-medium">Ver Todos os Canais</span>
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
