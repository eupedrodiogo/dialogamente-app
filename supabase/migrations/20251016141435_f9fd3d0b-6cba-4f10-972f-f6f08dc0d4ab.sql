-- Create support_tickets table
CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 100),
  email TEXT NOT NULL CHECK (char_length(email) <= 255),
  subject TEXT NOT NULL CHECK (subject IN ('Dúvida Técnica', 'Pagamento', 'Resultado do Teste', 'Sugestão', 'Outro')),
  message TEXT NOT NULL CHECK (char_length(message) >= 10 AND char_length(message) <= 1000),
  status TEXT NOT NULL DEFAULT 'novo' CHECK (status IN ('novo', 'em_andamento', 'resolvido', 'fechado')),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_support_tickets_email ON support_tickets(email);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_created ON support_tickets(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_support_tickets_ip ON support_tickets(ip_address, created_at DESC);

-- Enable Row Level Security
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can create tickets
CREATE POLICY "Anyone can create tickets" ON support_tickets
  FOR INSERT 
  WITH CHECK (true);

-- Policy: Service role can manage all tickets (for future admin panel)
CREATE POLICY "Service role can manage tickets" ON support_tickets
  FOR ALL 
  USING (
    auth.jwt() ->> 'role' = 'service_role'
  );

-- Trigger function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_support_tickets_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function before UPDATE
DROP TRIGGER IF EXISTS set_support_tickets_updated_at ON support_tickets;
CREATE TRIGGER set_support_tickets_updated_at
  BEFORE UPDATE ON support_tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_support_tickets_updated_at();

-- Add helpful comment
COMMENT ON TABLE support_tickets IS 'Armazena tickets de suporte enviados pelos usuários através do formulário de contato';