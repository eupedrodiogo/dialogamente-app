import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  AlertTriangle,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

interface AdminLoginProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  embedded?: boolean;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ 
  onSuccess, 
  onCancel, 
  embedded = false 
}) => {
  const { loginAsAdmin, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validações básicas
    if (!email || !password) {
      setError('Email e senha são obrigatórios');
      setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Email inválido');
      setLoading(false);
      return;
    }

    // Limite de tentativas
    if (attempts >= 3) {
      setError('Muitas tentativas de login. Tente novamente em alguns minutos.');
      setLoading(false);
      return;
    }

    try {
      const success = await loginAsAdmin(email, password);
      
      if (success) {
        toast.success('Login administrativo realizado com sucesso');
        onSuccess?.();
      } else {
        setAttempts(prev => prev + 1);
        setError('Credenciais inválidas ou acesso não autorizado');
        
        // Limpar senha em caso de erro
        setPassword('');
      }
    } catch (error) {
      console.error('Erro no login admin:', error);
      setError('Erro interno. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
    }
  };

  const containerClass = embedded 
    ? "w-full" 
    : "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4";

  const cardClass = embedded 
    ? "w-full" 
    : "w-full max-w-md";

  return (
    <div className={containerClass}>
      <Card className={cardClass}>
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Acesso Administrativo
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Entre com suas credenciais de administrador
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {attempts > 0 && attempts < 3 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Tentativa {attempts}/3. Verifique suas credenciais.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Administrativo
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="admin@dialogamente.com.br"
                  className="pl-10"
                  disabled={loading || isLoading}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  disabled={loading || isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={loading || isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full"
                disabled={loading || isLoading || attempts >= 3}
              >
                {loading || isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Entrar como Admin
                  </>
                )}
              </Button>

              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={onCancel}
                  disabled={loading || isLoading}
                >
                  Cancelar
                </Button>
              )}
            </div>
          </form>

          <div className="text-center space-y-3">
            <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="font-medium">Acesso Seguro</span>
              </div>
              <p>
                Este é um ambiente administrativo protegido. 
                Todas as ações são registradas e monitoradas.
              </p>
            </div>

            {!embedded && (
              <div className="text-xs text-gray-400">
                <p>DialogaMente Admin Panel v1.0</p>
                <p>© 2025 DialogaMente. Todos os direitos reservados.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Informações de desenvolvimento (apenas em modo dev) */}
      {process.env.NODE_ENV === 'development' && (
        <Card className="mt-4 max-w-md mx-auto border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">Modo Desenvolvimento</span>
            </div>
            <div className="text-xs text-yellow-700 space-y-1">
              <p><strong>Emails válidos:</strong></p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>admin@dialogamente.com.br</li>
                <li>pedro@dialogamente.com.br</li>
                <li>pedrodiogo.suporte@gmail.com</li>
              </ul>
              <p><strong>Senha:</strong> DialogaMente2025!Admin</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminLogin;