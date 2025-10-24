import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';

export type PlanType = 'free' | 'pro' | 'premium' | 'vip';

export interface UserSubscription {
  id: string;
  email: string;
  plan_type: PlanType;
  status: 'active' | 'expired' | 'cancelled';
  current_price: number;
  next_billing_date?: string;
  coupon_used?: string;
  created_at: string;
  updated_at: string;
}

export interface PremiumFeatures {
  // Recursos básicos
  unlimitedTests: boolean;
  pdfReports: boolean;
  extendedPdfReports: boolean;
  
  // Dashboard e Analytics
  evolutionDashboard: boolean;
  advancedAnalytics: boolean;
  customReports: boolean;
  
  // Recursos Premium
  unlimitedHistory: boolean;
  prioritySupport: boolean;
  premiumTemplates: boolean;
  sentimentAnalysis: boolean;
  dataExport: boolean;
  apiAccess: boolean;
  whiteLabel: boolean;
  
  // Recursos VIP
  personalizedContent: boolean;
  oneOnOneSupport: boolean;
  customIntegrations: boolean;
  advancedSecurity: boolean;
  
  // Recursos Administrativos
  fullAdminAccess: boolean;
  allPlansAccess: boolean;
  unlimitedEverything: boolean;
}

interface PremiumContextType {
  // Estado da assinatura
  subscription: UserSubscription | null;
  isLoading: boolean;
  
  // Verificações de plano
  isPremium: boolean;
  isVip: boolean;
  isPro: boolean;
  isFree: boolean;
  
  // Acesso administrativo
  isAdminAccess: boolean;
  hasFullAccess: boolean;
  
  // Recursos disponíveis
  features: PremiumFeatures;
  
  // Métodos de verificação
  hasFeature: (feature: keyof PremiumFeatures) => boolean;
  hasAccess: (resource: string) => boolean;
  canAccess: (feature: string) => boolean;
  
  // Métodos de gestão
  refreshSubscription: () => Promise<void>;
  upgradeToAdmin: () => void;
  getAccessLevel: () => string;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

interface PremiumProviderProps {
  children: ReactNode;
}

export const PremiumProvider: React.FC<PremiumProviderProps> = ({ children }) => {
  const { user, isAdmin, adminUser } = useAuth();
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar se é acesso administrativo
  const isAdminAccess = isAdmin && adminUser !== null;
  const hasFullAccess = isAdminAccess || (subscription?.plan_type === 'vip');

  // Determinar tipo de plano
  const planType = isAdminAccess ? 'vip' : (subscription?.plan_type || 'free');
  const isPremium = planType === 'premium' || planType === 'pro' || planType === 'vip' || isAdminAccess;
  const isVip = planType === 'vip' || isAdminAccess;
  const isPro = planType === 'pro' || planType === 'premium' || planType === 'vip' || isAdminAccess;
  const isFree = planType === 'free' && !isAdminAccess;

  // Definir recursos baseado no plano e acesso administrativo
  const features: PremiumFeatures = {
    // Recursos básicos - disponíveis para PRO+
    unlimitedTests: isPro || isAdminAccess,
    pdfReports: isPro || isAdminAccess,
    extendedPdfReports: isPremium || isAdminAccess,
    
    // Dashboard e Analytics - disponíveis para PRO+
    evolutionDashboard: isPro || isAdminAccess,
    advancedAnalytics: isPremium || isAdminAccess,
    customReports: isPremium || isAdminAccess,
    
    // Recursos Premium - disponíveis para PREMIUM+
    unlimitedHistory: isPremium || isAdminAccess,
    prioritySupport: isPremium || isAdminAccess,
    premiumTemplates: isPremium || isAdminAccess,
    sentimentAnalysis: isPremium || isAdminAccess,
    dataExport: isPremium || isAdminAccess,
    apiAccess: isPremium || isAdminAccess,
    whiteLabel: isPremium || isAdminAccess,
    
    // Recursos VIP - disponíveis apenas para VIP
    personalizedContent: isVip || isAdminAccess,
    oneOnOneSupport: isVip || isAdminAccess,
    customIntegrations: isVip || isAdminAccess,
    advancedSecurity: isVip || isAdminAccess,
    
    // Recursos Administrativos - apenas para admins
    fullAdminAccess: isAdminAccess,
    allPlansAccess: isAdminAccess,
    unlimitedEverything: isAdminAccess,
  };

  // Carregar assinatura do usuário
  const loadSubscription = async () => {
    if (!user?.email || isAdminAccess) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('email', user.email)
        .eq('status', 'active')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Erro ao carregar assinatura:', error);
      } else {
        setSubscription(data);
      }
    } catch (error) {
      console.error('Erro ao carregar assinatura:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Verificar se tem acesso a um recurso específico
  const hasFeature = (feature: keyof PremiumFeatures): boolean => {
    return features[feature] || isAdminAccess;
  };

  // Verificar acesso genérico
  const hasAccess = (resource: string): boolean => {
    if (isAdminAccess) return true;
    
    const resourceMap: Record<string, boolean> = {
      'unlimited_tests': features.unlimitedTests,
      'pdf_reports': features.pdfReports,
      'extended_pdf': features.extendedPdfReports,
      'dashboard': features.evolutionDashboard,
      'analytics': features.advancedAnalytics,
      'history': features.unlimitedHistory,
      'support': features.prioritySupport,
      'templates': features.premiumTemplates,
      'sentiment': features.sentimentAnalysis,
      'export': features.dataExport,
      'api': features.apiAccess,
      'whitelabel': features.whiteLabel,
      'personalized': features.personalizedContent,
      'one_on_one': features.oneOnOneSupport,
      'integrations': features.customIntegrations,
      'security': features.advancedSecurity,
    };

    return resourceMap[resource] || false;
  };

  // Alias para hasAccess
  const canAccess = (feature: string): boolean => {
    return hasAccess(feature) || isAdminAccess;
  };

  // Atualizar assinatura
  const refreshSubscription = async (): Promise<void> => {
    await loadSubscription();
  };

  // Upgrade para admin (para testes)
  const upgradeToAdmin = (): void => {
    if (isAdminAccess) {
      console.log('Acesso administrativo já ativo - todos os recursos desbloqueados');
    }
  };

  // Obter nível de acesso
  const getAccessLevel = (): string => {
    if (isAdminAccess) return 'ADMIN_FULL_ACCESS';
    if (isVip) return 'VIP';
    if (isPremium) return 'PREMIUM';
    if (isPro) return 'PRO';
    return 'FREE';
  };

  // Carregar dados iniciais
  useEffect(() => {
    loadSubscription();
  }, [user?.email, isAdminAccess]);

  // Log de acesso para debugging
  useEffect(() => {
    if (isAdminAccess) {
      console.log('🔓 ACESSO ADMINISTRATIVO ATIVO - Todos os recursos premium desbloqueados');
      console.log('📊 Recursos disponíveis:', features);
      console.log('🎯 Nível de acesso:', getAccessLevel());
    }
  }, [isAdminAccess, features]);

  const value: PremiumContextType = {
    // Estado
    subscription,
    isLoading,
    
    // Verificações de plano
    isPremium,
    isVip,
    isPro,
    isFree,
    
    // Acesso administrativo
    isAdminAccess,
    hasFullAccess,
    
    // Recursos
    features,
    
    // Métodos
    hasFeature,
    hasAccess,
    canAccess,
    refreshSubscription,
    upgradeToAdmin,
    getAccessLevel,
  };

  return (
    <PremiumContext.Provider value={value}>
      {children}
    </PremiumContext.Provider>
  );
};

export const usePremium = (): PremiumContextType => {
  const context = useContext(PremiumContext);
  if (context === undefined) {
    throw new Error('usePremium deve ser usado dentro de um PremiumProvider');
  }
  return context;
};

// Hook para verificação rápida de recursos
export const useFeature = (feature: keyof PremiumFeatures): boolean => {
  const { hasFeature } = usePremium();
  return hasFeature(feature);
};

// Hook para verificação de acesso
export const useAccess = (resource: string): boolean => {
  const { hasAccess } = usePremium();
  return hasAccess(resource);
};

export default PremiumContext;