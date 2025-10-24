import React, { ReactNode } from 'react';
import { usePremium, PremiumFeatures } from '@/contexts/PremiumContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Crown, Zap, Shield, Star, Unlock } from 'lucide-react';

interface PremiumAccessProps {
  children: ReactNode;
  feature?: keyof PremiumFeatures;
  resource?: string;
  plan?: 'pro' | 'premium' | 'vip';
  fallback?: ReactNode;
  showUpgrade?: boolean;
  className?: string;
}

export const PremiumAccess: React.FC<PremiumAccessProps> = ({
  children,
  feature,
  resource,
  plan,
  fallback,
  showUpgrade = true,
  className = '',
}) => {
  const { hasFeature, hasAccess, isPro, isPremium, isVip, isAdminAccess, getAccessLevel } = usePremium();
  const { isAdmin } = useAuth();

  // Verificar acesso baseado nos parâmetros
  let hasAccessToFeature = true;

  if (feature) {
    hasAccessToFeature = hasFeature(feature);
  } else if (resource) {
    hasAccessToFeature = hasAccess(resource);
  } else if (plan) {
    switch (plan) {
      case 'pro':
        hasAccessToFeature = isPro || isAdminAccess;
        break;
      case 'premium':
        hasAccessToFeature = isPremium || isAdminAccess;
        break;
      case 'vip':
        hasAccessToFeature = isVip || isAdminAccess;
        break;
    }
  }

  // Se tem acesso ou é admin, mostrar conteúdo
  if (hasAccessToFeature || isAdminAccess) {
    return (
      <div className={className}>
        {isAdminAccess && (
          <div className="mb-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300">
              <Unlock className="w-3 h-3 mr-1" />
              Acesso Admin Ativo
            </Badge>
          </div>
        )}
        {children}
      </div>
    );
  }

  // Se não tem acesso, mostrar fallback ou upgrade
  if (fallback) {
    return <>{fallback}</>;
  }

  if (!showUpgrade) {
    return null;
  }

  return <PremiumUpgradeCard feature={feature} resource={resource} plan={plan} />;
};

interface PremiumUpgradeCardProps {
  feature?: keyof PremiumFeatures;
  resource?: string;
  plan?: 'pro' | 'premium' | 'vip';
}

const PremiumUpgradeCard: React.FC<PremiumUpgradeCardProps> = ({ feature, resource, plan }) => {
  const { getAccessLevel } = usePremium();
  const { isAdmin } = useAuth();

  const getUpgradeInfo = () => {
    if (plan === 'vip' || feature === 'personalizedContent') {
      return {
        title: 'Recurso VIP Exclusivo',
        description: 'Este recurso está disponível apenas para assinantes VIP',
        icon: <Crown className="w-6 h-6 text-yellow-500" />,
        color: 'border-yellow-200 bg-yellow-50',
        buttonText: 'Upgrade para VIP',
      };
    }

    if (plan === 'premium' || feature === 'advancedAnalytics') {
      return {
        title: 'Recurso Premium',
        description: 'Este recurso está disponível para assinantes Premium e VIP',
        icon: <Star className="w-6 h-6 text-purple-500" />,
        color: 'border-purple-200 bg-purple-50',
        buttonText: 'Upgrade para Premium',
      };
    }

    return {
      title: 'Recurso PRO',
      description: 'Este recurso está disponível para assinantes PRO, Premium e VIP',
      icon: <Zap className="w-6 h-6 text-blue-500" />,
      color: 'border-blue-200 bg-blue-50',
      buttonText: 'Upgrade para PRO',
    };
  };

  const upgradeInfo = getUpgradeInfo();

  const handleUpgrade = () => {
    // Redirecionar para página de preços
    window.location.href = '/pricing';
  };

  const handleAdminAccess = () => {
    if (isAdmin) {
      // Ativar acesso administrativo
      console.log('Ativando acesso administrativo completo...');
      window.location.reload();
    }
  };

  return (
    <Card className={`${upgradeInfo.color} ${upgradeInfo.color.includes('yellow') ? 'border-2' : 'border'}`}>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          {upgradeInfo.icon}
        </div>
        <CardTitle className="text-lg">{upgradeInfo.title}</CardTitle>
        <CardDescription>{upgradeInfo.description}</CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-3">
        <div className="text-sm text-gray-600">
          Seu nível atual: <Badge variant="outline">{getAccessLevel()}</Badge>
        </div>
        
        <div className="space-y-2">
          <Button onClick={handleUpgrade} className="w-full">
            <Lock className="w-4 h-4 mr-2" />
            {upgradeInfo.buttonText}
          </Button>
          
          {isAdmin && (
            <Button 
              onClick={handleAdminAccess} 
              variant="secondary" 
              className="w-full bg-green-100 hover:bg-green-200 text-green-800"
            >
              <Shield className="w-4 h-4 mr-2" />
              Ativar Acesso Admin
            </Button>
          )}
        </div>

        {feature && (
          <div className="text-xs text-gray-500 mt-2">
            Recurso: {feature}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Componente para mostrar status de acesso
export const PremiumStatus: React.FC = () => {
  const { 
    isPro, 
    isPremium, 
    isVip, 
    isFree, 
    isAdminAccess, 
    hasFullAccess, 
    getAccessLevel,
    features 
  } = usePremium();

  const getStatusColor = () => {
    if (isAdminAccess) return 'bg-green-100 text-green-800 border-green-300';
    if (isVip) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    if (isPremium) return 'bg-purple-100 text-purple-800 border-purple-300';
    if (isPro) return 'bg-blue-100 text-blue-800 border-blue-300';
    return 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getStatusIcon = () => {
    if (isAdminAccess) return <Shield className="w-4 h-4" />;
    if (isVip) return <Crown className="w-4 h-4" />;
    if (isPremium) return <Star className="w-4 h-4" />;
    if (isPro) return <Zap className="w-4 h-4" />;
    return <Lock className="w-4 h-4" />;
  };

  return (
    <div className="space-y-2">
      <Badge className={getStatusColor()}>
        {getStatusIcon()}
        <span className="ml-1">{getAccessLevel()}</span>
      </Badge>
      
      {isAdminAccess && (
        <div className="text-xs text-green-600">
          ✅ Acesso completo a todos os recursos premium
        </div>
      )}
      
      {hasFullAccess && !isAdminAccess && (
        <div className="text-xs text-purple-600">
          ✅ Acesso total aos recursos premium
        </div>
      )}
    </div>
  );
};

// Hook para verificação rápida em componentes
export const usePremiumAccess = (feature?: keyof PremiumFeatures, resource?: string) => {
  const { hasFeature, hasAccess, isAdminAccess } = usePremium();
  
  if (isAdminAccess) return true;
  if (feature) return hasFeature(feature);
  if (resource) return hasAccess(resource);
  return false;
};

export default PremiumAccess;