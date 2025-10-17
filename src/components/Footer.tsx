import { Link } from "react-router-dom";
import logo from "@/assets/comunicapro-logo.png";
import { MessageCircle, Mail, Clock } from "lucide-react";
import { SUPPORT_CONFIG } from "@/lib/constants";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-purple-200/50 dark:border-purple-800/50 bg-gradient-to-br from-white/50 via-purple-50/30 to-cyan-50/20 dark:from-gray-900/50 dark:via-purple-950/30 dark:to-cyan-950/20 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <img src={logo} alt="DialogaMente" className="w-16 h-16" />
            <p className="text-sm text-muted-foreground max-w-xs">
              Transforme sua comunicação com análise científica e resultados comprovados.
            </p>
          </div>

          {/* Navegação */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground/90">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-purple-600 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/instrucoes" className="hover:text-purple-600 transition-colors">
                  Fazer Teste
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-purple-600 transition-colors">
                  Planos
                </Link>
              </li>
              <li>
                <Link to="/suporte" className="hover:text-purple-600 transition-colors">
                  Suporte
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground/90">
              Contato
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-green-600" />
                <a
                  href={SUPPORT_CONFIG.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-600 transition-colors"
                >
                  {SUPPORT_CONFIG.whatsapp.displayNumber}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-600" />
                <a
                  href={`mailto:${SUPPORT_CONFIG.email}`}
                  className="hover:text-purple-600 transition-colors break-all"
                >
                  {SUPPORT_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-cyan-600 mt-0.5" />
                <span className="text-xs leading-relaxed">
                  {SUPPORT_CONFIG.hours.full}
                </span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground/90">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button className="hover:text-purple-600 transition-colors cursor-not-allowed opacity-50">
                  Termos de Uso
                </button>
              </li>
              <li>
                <button className="hover:text-purple-600 transition-colors cursor-not-allowed opacity-50">
                  Política de Privacidade
                </button>
              </li>
              <li className="text-xs pt-2">
                © {currentYear} DialogaMente
                <br />
                Todos os direitos reservados
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
