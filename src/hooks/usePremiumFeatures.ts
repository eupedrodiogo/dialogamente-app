import { usePremium, PremiumFeatures } from '@/contexts/PremiumContext';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Hook personalizado para verificação de recursos premium
 * Fornece métodos simplificados para verificar acesso a recursos específicos
 */
export const usePremiumFeatures = () => {
  const premium = usePremium();
  const { isAdmin } = useAuth();

  // Métodos de verificação específicos para recursos comuns
  const canGeneratePDF = () => premium.hasFeature('pdfReports') || premium.isAdminAccess;
  const canGenerateExtendedPDF = () => premium.hasFeature('extendedPdfReports') || premium.isAdminAccess;
  const canAccessDashboard = () => premium.hasFeature('evolutionDashboard') || premium.isAdminAccess;
  const canAccessAnalytics = () => premium.hasFeature('advancedAnalytics') || premium.isAdminAccess;
  const canExportData = () => premium.hasFeature('dataExport') || premium.isAdminAccess;
  const canAccessAPI = () => premium.hasFeature('apiAccess') || premium.isAdminAccess;
  const canUseUnlimitedTests = () => premium.hasFeature('unlimitedTests') || premium.isAdminAccess;
  const canAccessPersonalizedContent = () => premium.hasFeature('personalizedContent') || premium.isAdminAccess;
  const canAccessPrioritySupport = () => premium.hasFeature('prioritySupport') || premium.isAdminAccess;
  const canAccessOneOnOneSupport = () => premium.hasFeature('oneOnOneSupport') || premium.isAdminAccess;

  // Verificações de plano
  const requiresPro = () => !premium.isPro && !premium.isAdminAccess;
  const requiresPremium = () => !premium.isPremium && !premium.isAdminAccess;
  const requiresVip = () => !premium.isVip && !premium.isAdminAccess;

  // Métodos de upgrade
  const getUpgradeMessage = (feature: keyof PremiumFeatures) => {
    if (premium.isAdminAccess) return null;
    
    const featureRequirements: Record<keyof PremiumFeatures, string> = {
      unlimitedTests: 'Upgrade para PRO para ter testes ilimitados',
      pdfReports: 'Upgrade para PRO para gerar relatórios PDF',
      extendedPdfReports: 'Upgrade para Premium para relatórios PDF estendidos',
      evolutionDashboard: 'Upgrade para PRO para acessar o dashboard de evolução',
      advancedAnalytics: 'Upgrade para Premium para analytics avançados',
      customReports: 'Upgrade para Premium para relatórios personalizados',
      unlimitedHistory: 'Upgrade para Premium para histórico ilimitado',
      prioritySupport: 'Upgrade para Premium para suporte prioritário',
      premiumTemplates: 'Upgrade para Premium para templates premium',
      sentimentAnalysis: 'Upgrade para Premium para análise de sentimentos',
      dataExport: 'Upgrade para Premium para exportação de dados',
      apiAccess: 'Upgrade para Premium para acesso à API',
      whiteLabel: 'Upgrade para Premium para white label',
      personalizedContent: 'Upgrade para VIP para conteúdo personalizado',
      oneOnOneSupport: 'Upgrade para VIP para suporte 1:1',
      customIntegrations: 'Upgrade para VIP para integrações personalizadas',
      advancedSecurity: 'Upgrade para VIP para segurança avançada',
      fullAdminAccess: 'Acesso administrativo necessário',
      allPlansAccess: 'Acesso administrativo necessário',
      unlimitedEverything: 'Acesso administrativo necessário',
    };

    return featureRequirements[feature] || 'Upgrade necessário para acessar este recurso';
  };

  // Método para obter URL de upgrade baseado no recurso
  const getUpgradeUrl = (feature: keyof PremiumFeatures) => {
    if (premium.isAdminAccess) return null;
    
    // Recursos VIP
    if (['personalizedContent', 'oneOnOneSupport', 'customIntegrations', 'advancedSecurity'].includes(feature)) {
      return '/pricing?plan=vip';
    }
    
    // Recursos Premium
    if ([
      'extendedPdfReports', 'advancedAnalytics', 'customReports', 'unlimitedHistory',
      'prioritySupport', 'premiumTemplates', 'sentimentAnalysis', 'dataExport',
      'apiAccess', 'whiteLabel'
    ].includes(feature)) {
      return '/pricing?plan=premium';
    }
    
    // Recursos PRO
    return '/pricing?plan=pro';
  };

  // Método para verificar múltiplos recursos
  const hasAnyFeature = (features: (keyof PremiumFeatures)[]) => {
    return features.some(feature => premium.hasFeature(feature)) || premium.isAdminAccess;
  };

  const hasAllFeatures = (features: (keyof PremiumFeatures)[]) => {
    return features.every(feature => premium.hasFeature(feature)) || premium.isAdminAccess;
  };

  // Método para obter recursos disponíveis por categoria
  const getAvailableFeaturesByCategory = () => {
    const categories = {
      basic: [] as string[],
      pro: [] as string[],
      premium: [] as string[],
      vip: [] as string[],
      admin: [] as string[],
    };

    Object.entries(premium.features).forEach(([feature, hasAccess]) => {
      if (hasAccess) {
        // Categorizar recursos
        if (['fullAdminAccess', 'allPlansAccess', 'unlimitedEverything'].includes(feature)) {
          categories.admin.push(feature);
        } else if (['personalizedContent', 'oneOnOneSupport', 'customIntegrations', 'advancedSecurity'].includes(feature)) {
          categories.vip.push(feature);
        } else if ([
          'extendedPdfReports', 'advancedAnalytics', 'customReports', 'unlimitedHistory',
          'prioritySupport', 'premiumTemplates', 'sentimentAnalysis', 'dataExport',
          'apiAccess', 'whiteLabel'
        ].includes(feature)) {
          categories.premium.push(feature);
        } else if (['unlimitedTests', 'pdfReports', 'evolutionDashboard'].includes(feature)) {
          categories.pro.push(feature);
        } else {
          categories.basic.push(feature);
        }
      }
    });

    return categories;
  };

  // Método para logging de acesso (para debugging)
  const logAccess = (feature: keyof PremiumFeatures, action: string = 'access') => {
    if (premium.isAdminAccess) {
      console.log(`🔓 [ADMIN] ${action.toUpperCase()}: ${feature}`);
    } else if (premium.hasFeature(feature)) {
      console.log(`✅ [${premium.getAccessLevel()}] ${action.toUpperCase()}: ${feature}`);
    } else {
      console.log(`❌ [${premium.getAccessLevel()}] BLOCKED: ${feature} - ${getUpgradeMessage(feature)}`);
    }
  };

  return {
    // Estado do premium
    ...premium,
    
    // Verificações específicas
    canGeneratePDF,
    canGenerateExtendedPDF,
    canAccessDashboard,
    canAccessAnalytics,
    canExportData,
    canAccessAPI,
    canUseUnlimitedTests,
    canAccessPersonalizedContent,
    canAccessPrioritySupport,
    canAccessOneOnOneSupport,
    
    // Verificações de plano
    requiresPro,
    requiresPremium,
    requiresVip,
    
    // Métodos de upgrade
    getUpgradeMessage,
    getUpgradeUrl,
    
    // Verificações múltiplas
    hasAnyFeature,
    hasAllFeatures,
    
    // Utilitários
    getAvailableFeaturesByCategory,
    logAccess,
  };
};

/**
 * Hook para verificação rápida de um recurso específico
 */
export const useFeatureAccess = (feature: keyof PremiumFeatures) => {
  const { hasFeature, isAdminAccess, getUpgradeMessage, getUpgradeUrl } = usePremiumFeatures();
  
  const hasAccess = hasFeature(feature) || isAdminAccess;
  const upgradeMessage = hasAccess ? null : getUpgradeMessage(feature);
  const upgradeUrl = hasAccess ? null : getUpgradeUrl(feature);
  
  return {
    hasAccess,
    upgradeMessage,
    upgradeUrl,
    isAdminBypass: isAdminAccess && hasAccess,
  };
};

/**
 * Hook para verificação de acesso a recursos por categoria
 */
export const usePlanAccess = (plan: 'pro' | 'premium' | 'vip') => {
  const { isPro, isPremium, isVip, isAdminAccess } = usePremiumFeatures();
  
  let hasAccess = false;
  switch (plan) {
    case 'pro':
      hasAccess = isPro || isAdminAccess;
      break;
    case 'premium':
      hasAccess = isPremium || isAdminAccess;
      break;
    case 'vip':
      hasAccess = isVip || isAdminAccess;
      break;
  }
  
  return {
    hasAccess,
    isAdminBypass: isAdminAccess && hasAccess,
    upgradeUrl: hasAccess ? null : `/pricing?plan=${plan}`,
  };
};

export default usePremiumFeatures;