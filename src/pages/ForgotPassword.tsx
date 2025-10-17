import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Recuperar Senha</h1>
        <p className="text-center text-gray-600 mb-8">
          Digite seu email para receber instruções
        </p>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="seu@email.com"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
            Enviar Email
          </Button>
          <p className="text-sm text-center text-gray-600">
            Lembrou a senha?{" "}
            <Link to="/login" className="text-purple-600 hover:underline font-semibold">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
