import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/src/assets/comunicapro-logo.png" alt="DialogaMente" className="h-10" />
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="outline">Entrar</Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
              Cadastrar
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
