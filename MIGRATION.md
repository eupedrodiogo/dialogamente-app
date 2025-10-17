# Guia de Migração do ComunicaPro

## 📋 Visão Geral

Este documento fornece instruções completas para migrar o ComunicaPro do GitHub Pages para outras plataformas de hospedagem, caso necessário no futuro.

## 🎯 Plataforma Atual

**GitHub Pages**
- URL: https://eupedrodiogo.github.io/comunicapro/
- Custo: R$ 0,00/mês
- Repositório: https://github.com/eupedrodiogo/comunicapro

## 🔄 Opções de Migração

### Opção 1: Migrar para Vercel

**Quando migrar:**
- Precisa de melhor performance
- Quer analytics integrado
- Necessita de preview de pull requests
- Precisa de Edge Functions

**Como migrar (5 minutos):**

1. **Conectar repositório:**
   ```bash
   # Acesse https://vercel.com/new
   # Faça login com GitHub
   # Selecione o repositório eupedrodiogo/comunicapro
   ```

2. **Configurar projeto:**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Variáveis de ambiente:**
   Adicione as mesmas variáveis do arquivo `.env`:
   ```
   VITE_SUPABASE_URL=https://sjyellllnsxkebukmoxi.supabase.co
   VITE_SUPABASE_ANON_KEY=[sua-chave]
   ```

4. **Deploy:**
   - Clique em "Deploy"
   - Aguarde 2-3 minutos
   - URL: https://comunicapro.vercel.app

5. **Configurar domínio customizado (opcional):**
   - Settings > Domains
   - Adicione seu domínio
   - Configure DNS conforme instruções

**Arquivo de configuração:** `vercel.json` (já criado)

---

### Opção 2: Migrar para Netlify

**Quando migrar:**
- Precisa de formulários integrados
- Quer usar Netlify Functions
- Necessita de split testing
- Precisa de identity/authentication

**Como migrar (5 minutos):**

1. **Conectar repositório:**
   ```bash
   # Acesse https://app.netlify.com/start
   # Faça login com GitHub
   # Selecione eupedrodiogo/comunicapro
   ```

2. **Configurar build:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 20

3. **Variáveis de ambiente:**
   Site settings > Environment variables
   ```
   VITE_SUPABASE_URL=https://sjyellllnsxkebukmoxi.supabase.co
   VITE_SUPABASE_ANON_KEY=[sua-chave]
   ```

4. **Deploy:**
   - Clique em "Deploy site"
   - URL: https://comunicapro.netlify.app

**Arquivo de configuração:** `netlify.toml` (já criado)

---

### Opção 3: Migrar para Cloudflare Pages

**Quando migrar:**
- Precisa de CDN mais rápido
- Quer bandwidth ilimitado
- Necessita de Workers/Edge Computing
- Precisa de DDoS protection

**Como migrar (5 minutos):**

1. **Criar projeto:**
   ```bash
   # Acesse https://dash.cloudflare.com/
   # Workers & Pages > Create application > Pages
   # Connect to Git > Selecione comunicapro
   ```

2. **Configurar build:**
   - Framework preset: Vite
   - Build command: `npm run build`
   - Build output directory: `dist`

3. **Variáveis de ambiente:**
   Settings > Environment variables
   ```
   VITE_SUPABASE_URL=https://sjyellllnsxkebukmoxi.supabase.co
   VITE_SUPABASE_ANON_KEY=[sua-chave]
   ```

4. **Deploy:**
   - Save and Deploy
   - URL: https://comunicapro.pages.dev

---

### Opção 4: Migrar para Render.com

**Quando migrar:**
- Precisa de banco de dados integrado
- Quer serviços backend
- Necessita de cron jobs
- Precisa de Docker support

**Como migrar (5 minutos):**

1. **Conectar repositório:**
   ```bash
   # Acesse https://dashboard.render.com/
   # New > Static Site
   # Connect repository: eupedrodiogo/comunicapro
   ```

2. **Configuração automática:**
   O arquivo `render.yaml` já está configurado e será detectado automaticamente.

3. **Deploy:**
   - Clique em "Create Static Site"
   - URL: https://comunicapro.onrender.com

**Arquivo de configuração:** `render.yaml` (já criado)

---

### Opção 5: Migrar para AWS Amplify

**Quando migrar:**
- Precisa de infraestrutura AWS
- Quer integração com outros serviços AWS
- Necessita de CI/CD avançado
- Precisa de hosting global

**Como migrar (10 minutos):**

1. **Conectar repositório:**
   ```bash
   # Acesse https://console.aws.amazon.com/amplify/
   # New app > Host web app
   # GitHub > Authorize > Selecione comunicapro
   ```

2. **Configurar build:**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Variáveis de ambiente:**
   App settings > Environment variables

4. **Deploy:**
   - Save and deploy
   - URL: https://main.[app-id].amplifyapp.com

---

## 🔧 Ajustes Necessários por Plataforma

### Remover Base Path do GitHub Pages

Se migrar para outra plataforma, atualize `vite.config.ts`:

```typescript
// ANTES (GitHub Pages)
export default defineConfig(({ mode }) => ({
  base: '/comunicapro/',
  // ...
}));

// DEPOIS (Outras plataformas)
export default defineConfig(({ mode }) => ({
  base: '/',
  // ...
}));
```

E `package.json`:

```json
// ANTES
{
  "homepage": "https://eupedrodiogo.github.io/comunicapro"
}

// DEPOIS
{
  // Remova a linha homepage
}
```

### Script de Migração Automática

Criei um script para facilitar a migração:

```bash
# Remover configurações do GitHub Pages
npm run migrate:remove-ghpages

# Fazer rebuild
npm run build

# Commit mudanças
git add .
git commit -m "Remove GitHub Pages configuration"
git push origin main
```

---

## 📊 Comparação de Plataformas

| Recurso | GitHub Pages | Vercel | Netlify | Cloudflare | Render |
|---------|--------------|--------|---------|------------|--------|
| **Custo** | Grátis | Grátis | Grátis | Grátis | Grátis |
| **Bandwidth** | 100 GB | 100 GB | 100 GB | Ilimitado | 100 GB |
| **Build Minutes** | Ilimitado | 6000 | 300 | 500 builds | 400h |
| **Custom Domain** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **SSL** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **CDN** | ✅ | ✅ | ✅ | ✅ (melhor) | ✅ |
| **Analytics** | ❌ | ✅ | ✅ | ✅ | ❌ |
| **Functions** | ❌ | ✅ | ✅ | ✅ | ✅ |
| **Forms** | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Preview Deploys** | ❌ | ✅ | ✅ | ✅ | ✅ |
| **Deploy Speed** | Médio | Rápido | Rápido | Muito Rápido | Médio |

---

## 🚨 Checklist de Migração

Antes de migrar, certifique-se de:

- [ ] Fazer backup do código atual
- [ ] Documentar todas as variáveis de ambiente
- [ ] Testar o build localmente
- [ ] Verificar se todas as rotas funcionam
- [ ] Atualizar configurações de DNS (se usar domínio customizado)
- [ ] Configurar redirects se necessário
- [ ] Testar integração com Supabase
- [ ] Verificar analytics e tracking
- [ ] Atualizar links em materiais de marketing
- [ ] Notificar usuários sobre mudança de URL (se aplicável)

---

## 🔐 Variáveis de Ambiente

Estas variáveis devem ser configuradas em qualquer plataforma:

```env
# Supabase
VITE_SUPABASE_URL=https://sjyellllnsxkebukmoxi.supabase.co
VITE_SUPABASE_ANON_KEY=[sua-chave-anon]

# Outras (se necessário no futuro)
# VITE_GOOGLE_ANALYTICS_ID=
# VITE_SENTRY_DSN=
# VITE_API_URL=
```

---

## 📞 Suporte

Se precisar de ajuda durante a migração:

1. Consulte a documentação oficial da plataforma escolhida
2. Verifique os logs de build para erros
3. Teste localmente antes de fazer deploy
4. Use o Discord/Slack da plataforma para suporte

---

## 🎯 Recomendações

**Para começar:** Mantenha no GitHub Pages
- Simples e funcional
- Zero configuração
- Totalmente gratuito

**Para escalar:** Migre para Vercel ou Cloudflare
- Melhor performance
- Mais recursos
- Analytics incluído

**Para projetos complexos:** Considere AWS Amplify ou Render
- Mais controle
- Backend integrado
- Infraestrutura robusta

---

**Última atualização:** 16 de outubro de 2025
**Versão:** 1.0.0

