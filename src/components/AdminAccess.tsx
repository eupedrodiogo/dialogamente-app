import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AdminLogin from './AdminLogin';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  LogOut, 
  Settings, 
  Eye,
  User,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

interface AdminAccessProps {
  children?: React.ReactNode;
}

const AdminAccess: React.FC<AdminAccessProps> = ({ children }) => {
  const { isAdmin, adminUser, logoutAdmin, isLoading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [lastKeyTime, setLastKeyTime] = useState(0);

  // Sequência secreta para ativar o painel admin: Ctrl+Shift+A+D+M+I+N
  const SECRET_SEQUENCE = ['Control', 'Shift', 'KeyA', 'KeyD', 'KeyM', 'KeyI', 'KeyN'];
  const SEQUENCE_TIMEOUT = 2000; // 2 segundos para completar a sequência

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const now = Date.now();
      
      // Reset da sequência se passou muito tempo
      if (now - lastKeyTime > SEQUENCE_TIMEOUT) {
        setKeySequence([]);
      }
      
      setLastKeyTime(now);
      
      // Adicionar tecla à sequência
      const newSequence = [...keySequence, event.code];
      setKeySequence(newSequence);
      
      // Verificar se a sequência está correta
      const isSequenceCorrect = SECRET_SEQUENCE.every((key, index) => 
        newSequence[index] === key
      );
      
      if (newSequence.length === SECRET_SEQUENCE.length) {
        if (isSequenceCorrect) {
          setShowLogin(true);
          toast.success('Painel administrativo ativado');
        }
        setKeySequence([]);
      }
      
      // Limitar tamanho da sequência
      if (newSequence.length > SECRET_SEQUENCE.length) {
        setKeySequence(newSequence.slice(-SECRET_SEQUENCE.length));
      }
    };

    // Verificar URL para acesso direto
    const checkUrlAccess = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const adminParam = urlParams.get('admin');
      const devMode = urlParams.get('dev');
      
      if (adminParam === 'true' || devMode === 'true') {
        setShowLogin(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    checkUrlAccess();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [keySequence, lastKeyTime]);

  const handleLoginSuccess = () => {
    setShowLogin(false);
    toast.success('Bem-vindo ao painel administrativo!');
  };

  const handleLogout = () => {
    logoutAdmin();
    toast.info('Sessão administrativa encerrada');
  };

  const formatLoginTime = (timestamp?: number) => {
    if (!timestamp) return 'Agora';
    
    const now = new Date();
    const loginTime = new Date(timestamp);
    const diffMinutes = Math.floor((now.getTime() - loginTime.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Agora';
    if (diffMinutes < 60) return `${diffMinutes}min atrás`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h atrás`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d atrás`;
  };

  // Renderizar indicador de admin se estiver logado
  if (isAdmin && adminUser) {
    return (
      <>
        {children}
        
        {/* Indicador de Admin Flutuante */}
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[280px]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">Modo Admin</span>
                <Badge variant="secondary" className="text-xs">
                  {adminUser.role.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="h-6 w-6 p-0"
                title="Sair do modo admin"
              >
                <LogOut className="w-3 h-3" />
              </Button>
            </div>
            
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-3 h-3" />
                <span>{adminUser.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span>Logado {formatLoginTime()}</span>
              </div>
            </div>
            
            <div className="flex gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('/admin/plans', '_blank')}
                className="flex items-center gap-1 text-xs h-7"
              >
                <Settings className="w-3 h-3" />
                Gerenciar Planos
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('/admin/analytics', '_blank')}
                className="flex items-center gap-1 text-xs h-7"
              >
                <Eye className="w-3 h-3" />
                Analytics
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Renderizar modal de login se solicitado
  if (showLogin && !isAdmin) {
    return (
      <>
        {children}
        
        {/* Overlay do Modal */}
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <AdminLogin
              onSuccess={handleLoginSuccess}
              onCancel={() => setShowLogin(false)}
              embedded={true}
            />
          </div>
        </div>
      </>
    );
  }

  // Renderizar apenas os children se não estiver em modo admin
  return <>{children}</>;
};

// Hook para facilitar o acesso às funcionalidades admin
export const useAdminAccess = () => {
  const { isAdmin, adminUser, hasPermission, logAdminAction } = useAuth();
  
  const openAdminPanel = () => {
    if (isAdmin) {
      window.open('/admin/plans', '_blank');
    } else {
      toast.error('Acesso administrativo necessário');
    }
  };
  
  const openAnalytics = () => {
    if (isAdmin && hasPermission('analytics', 'read')) {
      window.open('/admin/analytics', '_blank');
    } else {
      toast.error('Permissão insuficiente para analytics');
    }
  };
  
  const canManagePlans = () => {
    return isAdmin && hasPermission('plans', 'write');
  };
  
  const canViewAnalytics = () => {
    return isAdmin && hasPermission('analytics', 'read');
  };
  
  return {
    isAdmin,
    adminUser,
    openAdminPanel,
    openAnalytics,
    canManagePlans,
    canViewAnalytics,
    logAdminAction
  };
};

// Componente para desenvolvimento - botão de acesso rápido
export const DevAdminButton: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  
  // Só mostrar em desenvolvimento
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowLogin(true)}
        className="fixed bottom-4 left-4 z-40 bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200"
      >
        <Shield className="w-4 h-4 mr-2" />
        Admin (Dev)
      </Button>
      
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <AdminLogin
              onSuccess={() => setShowLogin(false)}
              onCancel={() => setShowLogin(false)}
              embedded={true}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminAccess;