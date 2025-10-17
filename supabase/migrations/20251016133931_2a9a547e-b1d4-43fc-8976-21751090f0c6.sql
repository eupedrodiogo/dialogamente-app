-- Criar tipo enum para status de assinatura (se não existir)
DO $$ BEGIN
  CREATE TYPE subscription_status AS ENUM ('active', 'expired', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Criar tipo enum para status de compra (se não existir)
DO $$ BEGIN
  CREATE TYPE purchase_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Tabela de assinaturas de usuários
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan_type TEXT NOT NULL DEFAULT 'free',
  status TEXT NOT NULL DEFAULT 'active',
  current_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  next_billing_date TIMESTAMPTZ,
  coupon_used TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de cupons VIP (secretos)
CREATE TABLE IF NOT EXISTS coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL DEFAULT 'free_month',
  max_uses INTEGER NOT NULL DEFAULT 1,
  current_uses INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de resgates de cupons
CREATE TABLE IF NOT EXISTS coupon_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id UUID REFERENCES coupons(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  subscription_id UUID REFERENCES user_subscriptions(id) ON DELETE CASCADE,
  redeemed_at TIMESTAMPTZ DEFAULT NOW(),
  month_1_free BOOLEAN DEFAULT true,
  month_2_promo BOOLEAN DEFAULT false,
  month_3_normal BOOLEAN DEFAULT false,
  current_month INTEGER DEFAULT 1,
  next_charge_date TIMESTAMPTZ,
  next_charge_amount DECIMAL(10,2)
);

-- Tabela de compras/pagamentos
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  subscription_id UUID REFERENCES user_subscriptions(id) ON DELETE SET NULL,
  stripe_payment_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed',
  billing_month INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON user_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer ON user_subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_redemptions_email ON coupon_redemptions(email);
CREATE INDEX IF NOT EXISTS idx_redemptions_subscription ON coupon_redemptions(subscription_id);
CREATE INDEX IF NOT EXISTS idx_purchases_email ON purchases(email);

-- RLS Policies
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupon_redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Políticas para user_subscriptions
DROP POLICY IF EXISTS "Anyone can view subscriptions" ON user_subscriptions;
CREATE POLICY "Anyone can view subscriptions"
ON user_subscriptions FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Anyone can insert subscriptions" ON user_subscriptions;
CREATE POLICY "Anyone can insert subscriptions"
ON user_subscriptions FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can update subscriptions" ON user_subscriptions;
CREATE POLICY "Anyone can update subscriptions"
ON user_subscriptions FOR UPDATE
USING (true);

-- Políticas para coupons (secretos - só via service role)
DROP POLICY IF EXISTS "Service role only for coupons" ON coupons;
CREATE POLICY "Service role only for coupons"
ON coupons FOR ALL
USING (false);

-- Políticas para coupon_redemptions
DROP POLICY IF EXISTS "Anyone can view redemptions" ON coupon_redemptions;
CREATE POLICY "Anyone can view redemptions"
ON coupon_redemptions FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Anyone can insert redemptions" ON coupon_redemptions;
CREATE POLICY "Anyone can insert redemptions"
ON coupon_redemptions FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can update redemptions" ON coupon_redemptions;
CREATE POLICY "Anyone can update redemptions"
ON coupon_redemptions FOR UPDATE
USING (true);

-- Políticas para purchases
DROP POLICY IF EXISTS "Anyone can view purchases" ON purchases;
CREATE POLICY "Anyone can view purchases"
ON purchases FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Anyone can insert purchases" ON purchases;
CREATE POLICY "Anyone can insert purchases"
ON purchases FOR INSERT
WITH CHECK (true);