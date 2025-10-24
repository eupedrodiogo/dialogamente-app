-- Criar tabela de administradores
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'moderator')),
  permissions JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES admin_users(id)
);

-- Criar tabela de sessões administrativas
CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES admin_users(id) ON DELETE CASCADE,
  session_token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar tabela de logs de ações administrativas
CREATE TABLE IF NOT EXISTS admin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  details JSONB DEFAULT '{}',
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_admin_id ON admin_sessions(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_logs_admin_id ON admin_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_logs_created_at ON admin_logs(created_at DESC);

-- Habilitar RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança para admin_users
CREATE POLICY "Service role can manage admin users" ON admin_users
  FOR ALL 
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Políticas de segurança para admin_sessions
CREATE POLICY "Service role can manage admin sessions" ON admin_sessions
  FOR ALL 
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Políticas de segurança para admin_logs
CREATE POLICY "Service role can manage admin logs" ON admin_logs
  FOR ALL 
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_admin_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at
CREATE TRIGGER set_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_admin_users_updated_at();

-- Inserir super admin inicial (você pode alterar o email)
INSERT INTO admin_users (email, role, permissions, is_active) 
VALUES (
  'admin@dialogamente.com.br', 
  'super_admin', 
  '{"plans": {"read": true, "write": true, "delete": true}, "users": {"read": true, "write": true, "delete": true}, "coupons": {"read": true, "write": true, "delete": true}, "analytics": {"read": true}}',
  true
) ON CONFLICT (email) DO NOTHING;

-- Comentários para documentação
COMMENT ON TABLE admin_users IS 'Tabela de usuários administrativos com roles e permissões';
COMMENT ON TABLE admin_sessions IS 'Sessões ativas de administradores';
COMMENT ON TABLE admin_logs IS 'Log de todas as ações administrativas para auditoria';