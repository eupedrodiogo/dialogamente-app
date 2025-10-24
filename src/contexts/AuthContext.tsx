import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AdminUser {
  id: string;
  email: string;
  role: 'super_admin' | 'admin' | 'moderator';
  permissions: Record<string, any>;
  is_active: boolean;
}

interface AuthContextType {
  isAdmin: boolean;
  adminUser: AdminUser | null;
  isLoading: boolean;
  loginAsAdmin: (email: string, password: string) => Promise<boolean>;
  logoutAdmin: () => void;
  hasPermission: (resource: string, action: string) => boolean;
  logAdminAction: (action: string, resourceType: string, resourceId?: string, details?: any) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  adminUser: null,
  isLoading: true,
  loginAsAdmin: async () => false,
  logoutAdmin: () => {},
  hasPermission: () => false,
  logAdminAction: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Lista de emails administrativos (pode ser movida para variável de ambiente)
  const ADMIN_EMAILS = [
    'admin@dialogamente.com.br',
    'pedro@dialogamente.com.br',
    'pedrodiogo.suporte@gmail.com'
  ];

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const adminEmail = localStorage.getItem('admin_email');
      const adminToken = localStorage.getItem('admin_token');
      
      if (adminEmail && adminToken && ADMIN_EMAILS.includes(adminEmail)) {
        // Verificar se o token ainda é válido
        const { data, error } = await supabase.functions.invoke('verify-admin-session', {
          body: { email: adminEmail, token: adminToken }
        });

        if (!error && data?.valid) {
          setAdminUser(data.admin);
          setIsAdmin(true);
        } else {
          // Token inválido, limpar localStorage
          localStorage.removeItem('admin_email');
          localStorage.removeItem('admin_token');
        }
      }
    } catch (error) {
      console.error('Erro ao verificar status admin:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsAdmin = async (email: string, password: string): Promise<boolean> => {
    try {
      // Verificar se o email está na lista de administradores
      if (!ADMIN_EMAILS.includes(email)) {
        return false;
      }

      // Para simplificar, vamos usar uma senha master para desenvolvimento
      // Em produção, isso deveria ser integrado com um sistema de autenticação robusto
      const MASTER_PASSWORD = 'DialogaMente2025!Admin';
      
      if (password !== MASTER_PASSWORD) {
        return false;
      }

      // Gerar token de sessão
      const sessionToken = crypto.randomUUID();
      
      // Salvar no localStorage (em produção, usar httpOnly cookies)
      localStorage.setItem('admin_email', email);
      localStorage.setItem('admin_token', sessionToken);

      // Criar usuário admin mock (em produção, buscar do banco)
      const mockAdminUser: AdminUser = {
        id: crypto.randomUUID(),
        email,
        role: 'super_admin',
        permissions: {
          plans: { read: true, write: true, delete: true },
          users: { read: true, write: true, delete: true },
          coupons: { read: true, write: true, delete: true },
          analytics: { read: true }
        },
        is_active: true
      };

      setAdminUser(mockAdminUser);
      setIsAdmin(true);

      // Log da ação
      logAdminAction('login', 'admin_session', undefined, { email });

      return true;
    } catch (error) {
      console.error('Erro no login admin:', error);
      return false;
    }
  };

  const logoutAdmin = () => {
    if (adminUser) {
      logAdminAction('logout', 'admin_session', undefined, { email: adminUser.email });
    }
    
    localStorage.removeItem('admin_email');
    localStorage.removeItem('admin_token');
    setAdminUser(null);
    setIsAdmin(false);
  };

  const hasPermission = (resource: string, action: string): boolean => {
    if (!adminUser || !adminUser.is_active) return false;
    
    // Super admin tem todas as permissões
    if (adminUser.role === 'super_admin') return true;
    
    // Verificar permissões específicas
    const resourcePermissions = adminUser.permissions[resource];
    return resourcePermissions && resourcePermissions[action] === true;
  };

  const logAdminAction = async (action: string, resourceType: string, resourceId?: string, details?: any) => {
    if (!adminUser) return;

    try {
      await supabase.functions.invoke('log-admin-action', {
        body: {
          admin_id: adminUser.id,
          action,
          resource_type: resourceType,
          resource_id: resourceId,
          details: details || {},
          ip_address: await getClientIP(),
          user_agent: navigator.userAgent
        }
      });
    } catch (error) {
      console.error('Erro ao registrar ação admin:', error);
    }
  };

  const getClientIP = async (): Promise<string> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return 'unknown';
    }
  };

  const value: AuthContextType = {
    isAdmin,
    adminUser,
    isLoading,
    loginAsAdmin,
    logoutAdmin,
    hasPermission,
    logAdminAction,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
