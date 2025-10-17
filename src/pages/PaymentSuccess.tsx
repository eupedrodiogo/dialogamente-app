import { useEffect } from "react";
import { CheckCircle, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Opcional: Registrar conversão ou enviar confirmação
    console.log('Pagamento confirmado');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full p-12 text-center animate-fade-up">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Pagamento Confirmado!
          </h1>
          <p className="text-xl text-muted-foreground">
            Bem-vindo ao DialogaMente PRO
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-lg mb-3">✨ Sua assinatura está ativa!</h2>
          <ul className="text-left space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Acesso completo a todos os recursos premium</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Relatórios PDF estendidos (15-20 páginas)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Dashboard de evolução personalizado</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Conteúdo exclusivo mensal</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            onClick={() => navigate('/test')}
          >
            Fazer Novo Teste PRO
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => navigate('/')}
          >
            Voltar ao Início
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-8">
          Você receberá um email de confirmação com todos os detalhes da sua assinatura.
        </p>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
