# 🚀 Guia de Deploy - DialogaMente no Netlify

Este guia contém todas as instruções necessárias para fazer o deploy da aplicação DialogaMente no Netlify.

## 📁 Estrutura da Pasta Deploy

```
deploy/
├── README-DEPLOY.md          # Este arquivo
├── netlify.toml             # Configuração principal do Netlify
├── _redirects               # Regras de redirecionamento
├── _headers                 # Headers de segurança e performance
├── .env.production          # Variáveis de ambiente para produção
├── package.json             # Dependências do projeto
├── vite.config.production.ts # Configuração otimizada do Vite
├── build-deploy.sh          # Script de build para Linux/Mac
├── build-deploy.ps1         # Script de build para Windows
├── robots.txt               # Arquivo para SEO
├── sitemap.xml              # Mapa do site
└── manifest.json            # Configuração PWA
```

## 🔧 Pré-requisitos

- Node.js 20 ou superior
- NPM ou Yarn
- Conta no Netlify
- Conta no Supabase (configurada)
- Conta no Stripe (para pagamentos)

## 🚀 Deploy Manual

### 1. Preparar o Build

#### No Windows:
```powershell
# Navegar para a pasta do projeto
cd comunicapro-main

# Executar o script de build
.\deploy\build-deploy.ps1

# Ou executar manualmente:
npm ci --legacy-peer-deps
npm run build
```

#### No Linux/Mac:
```bash
# Navegar para a pasta do projeto
cd comunicapro-main

# Dar permissão ao script
chmod +x deploy/build-deploy.sh

# Executar o script de build
./deploy/build-deploy.sh

# Ou executar manualmente:
npm ci --legacy-peer-deps
npm run build
```

### 2. Upload para Netlify

1. Acesse [netlify.com](https://netlify.com)
2. Faça login na sua conta
3. Clique em "Add new site" > "Deploy manually"
4. Arraste a pasta `dist` gerada para a área de upload
5. Aguarde o deploy ser concluído

## 🔄 Deploy Automático (Recomendado)

### 1. Conectar Repositório

1. No Netlify, clique em "Add new site" > "Import an existing project"
2. Conecte seu repositório GitHub/GitLab/Bitbucket
3. Selecione o repositório do DialogaMente

### 2. Configurar Build Settings

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Base directory:** (deixe vazio)

### 3. Configurar Variáveis de Ambiente

No painel do Netlify, vá em "Site settings" > "Environment variables" e adicione:

```
VITE_SUPABASE_URL=https://sjyellllnsxkebukmoxi.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sua_chave_publica_supabase
VITE_STRIPE_PUBLISHABLE_KEY=sua_chave_publica_stripe
VITE_GOOGLE_ANALYTICS_ID=seu_id_analytics
NODE_VERSION=20
NPM_FLAGS=--legacy-peer-deps
```

## 🔒 Configurações de Segurança

### Headers de Segurança
O arquivo `_headers` inclui:
- Content Security Policy (CSP)
- X-Frame-Options
- X-XSS-Protection
- Strict-Transport-Security
- E outros headers de segurança

### Redirects
O arquivo `_redirects` configura:
- Redirecionamento HTTPS
- Redirecionamento www → non-www
- Rotas SPA
- Redirects SEO-friendly

## 🎯 Configurações de Performance

### Cache Strategy
- **Assets estáticos:** Cache de 1 ano
- **JavaScript/CSS:** Cache de 1 ano com hash
- **HTML:** Cache validado
- **Imagens:** Cache de 1 ano

### Otimizações de Build
- Minificação com Terser
- Tree shaking
- Code splitting
- Compressão de assets

## 🔍 Verificações Pós-Deploy

### 1. Funcionalidades Básicas
- [ ] Página inicial carrega corretamente
- [ ] Navegação entre páginas funciona
- [ ] Login/Cadastro funcionam
- [ ] Integração com Supabase ativa

### 2. Funcionalidades Premium
- [ ] Dashboard Premium acessível
- [ ] Relatórios PDF funcionam
- [ ] Analytics carregam
- [ ] Exportação de dados funciona
- [ ] API Access funciona
- [ ] Suporte VIP acessível

### 3. Performance
- [ ] Lighthouse Score > 90
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 3s
- [ ] Cumulative Layout Shift < 0.1

### 4. SEO
- [ ] Meta tags corretas
- [ ] Sitemap acessível
- [ ] Robots.txt configurado
- [ ] URLs amigáveis

## 🐛 Troubleshooting

### Erro de Build
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

### Erro de Variáveis de Ambiente
- Verifique se todas as variáveis estão configuradas no Netlify
- Confirme se os valores estão corretos
- Redeploy após alterar variáveis

### Erro 404 em Rotas
- Verifique se o arquivo `_redirects` está na pasta `dist`
- Confirme se a regra `/* /index.html 200` está presente

### Erro de CSP
- Verifique os headers no arquivo `_headers`
- Adicione domínios necessários ao CSP
- Teste localmente primeiro

## 📊 Monitoramento

### Analytics
- Google Analytics configurado
- Netlify Analytics ativo
- Core Web Vitals monitorados

### Logs
- Netlify Function logs
- Deploy logs
- Error tracking

## 🔄 Atualizações

### Deploy Automático
- Push para branch `main` → Deploy automático
- Pull requests → Deploy preview
- Rollback disponível no painel

### Deploy Manual
1. Executar build local
2. Upload da pasta `dist`
3. Verificar funcionamento

## 📞 Suporte

Para problemas de deploy:
1. Verifique os logs no painel do Netlify
2. Consulte a documentação oficial
3. Entre em contato com o suporte técnico

## 🔗 Links Úteis

- [Documentação Netlify](https://docs.netlify.com/)
- [Supabase Docs](https://supabase.com/docs)
- [Vite Docs](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)

---

**Última atualização:** $(Get-Date -Format "dd/MM/yyyy HH:mm")
**Versão:** 1.0.0