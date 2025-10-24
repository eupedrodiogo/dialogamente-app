# ✅ Checklist de Deploy - DialogaMente

Use este checklist para garantir que todos os passos do deploy foram executados corretamente.

## 🔧 Pré-Deploy

### Configuração do Ambiente
- [ ] Node.js 20+ instalado
- [ ] NPM atualizado
- [ ] Dependências instaladas (`npm ci --legacy-peer-deps`)
- [ ] Variáveis de ambiente configuradas
- [ ] Chaves do Supabase válidas
- [ ] Chaves do Stripe configuradas

### Testes Locais
- [ ] Build local executado com sucesso (`npm run build`)
- [ ] Preview local funcionando (`npm run preview`)
- [ ] Todas as páginas carregam corretamente
- [ ] Login/Cadastro funcionam
- [ ] Funcionalidades premium testadas
- [ ] Responsividade verificada

## 🚀 Deploy

### Netlify Setup
- [ ] Conta Netlify criada/acessada
- [ ] Site criado no Netlify
- [ ] Repositório conectado (se deploy automático)
- [ ] Build settings configurados
- [ ] Variáveis de ambiente adicionadas

### Arquivos de Configuração
- [ ] `netlify.toml` configurado
- [ ] `_redirects` criado
- [ ] `_headers` configurado
- [ ] `.env.production` preparado
- [ ] `package.json` atualizado

### Build e Upload
- [ ] Script de build executado
- [ ] Pasta `dist` gerada
- [ ] Arquivos estáticos copiados
- [ ] Upload realizado (manual ou automático)
- [ ] Deploy concluído sem erros

## 🔍 Pós-Deploy

### Verificações Básicas
- [ ] Site acessível via URL
- [ ] HTTPS funcionando
- [ ] Favicon carregando
- [ ] Página inicial renderiza
- [ ] Menu de navegação funciona
- [ ] Footer carrega corretamente

### Funcionalidades Core
- [ ] Cadastro de usuário
- [ ] Login de usuário
- [ ] Logout funciona
- [ ] Recuperação de senha
- [ ] Perfil do usuário
- [ ] Teste de comunicação

### Funcionalidades Premium
- [ ] Dashboard Premium acessível
- [ ] Relatórios PDF geram
- [ ] Conteúdo exclusivo carrega
- [ ] Analytics funcionam
- [ ] Exportação de dados
- [ ] API Access funciona
- [ ] Suporte VIP acessível

### Páginas Administrativas
- [ ] Login admin funciona
- [ ] Painel de cupons
- [ ] Gerenciamento de planos
- [ ] Painel de testes

### Integrações
- [ ] Supabase conectado
- [ ] Autenticação funcionando
- [ ] Banco de dados acessível
- [ ] Stripe integrado
- [ ] Pagamentos funcionam
- [ ] Webhooks configurados

## 🎯 Performance

### Core Web Vitals
- [ ] Largest Contentful Paint < 2.5s
- [ ] First Input Delay < 100ms
- [ ] Cumulative Layout Shift < 0.1
- [ ] First Contentful Paint < 1.8s
- [ ] Time to Interactive < 3.8s

### Lighthouse Scores
- [ ] Performance > 90
- [ ] Accessibility > 95
- [ ] Best Practices > 90
- [ ] SEO > 90
- [ ] PWA (se aplicável) > 90

### Otimizações
- [ ] Imagens otimizadas
- [ ] CSS minificado
- [ ] JavaScript minificado
- [ ] Gzip/Brotli ativo
- [ ] Cache headers configurados

## 🔒 Segurança

### Headers de Segurança
- [ ] Content Security Policy ativo
- [ ] X-Frame-Options configurado
- [ ] X-XSS-Protection ativo
- [ ] HSTS configurado
- [ ] X-Content-Type-Options ativo

### SSL/TLS
- [ ] Certificado SSL válido
- [ ] Redirecionamento HTTP → HTTPS
- [ ] HSTS configurado
- [ ] Certificado não expira em breve

### Dados Sensíveis
- [ ] Chaves de API não expostas
- [ ] Variáveis de ambiente seguras
- [ ] Logs não contêm dados sensíveis
- [ ] Backup de dados configurado

## 📱 Responsividade

### Dispositivos Móveis
- [ ] Layout mobile funciona
- [ ] Touch targets adequados
- [ ] Texto legível
- [ ] Navegação mobile
- [ ] Performance mobile OK

### Tablets
- [ ] Layout tablet funciona
- [ ] Orientação portrait/landscape
- [ ] Touch interactions
- [ ] Performance tablet OK

### Desktop
- [ ] Layout desktop funciona
- [ ] Hover states funcionam
- [ ] Keyboard navigation
- [ ] Performance desktop OK

## 🔍 SEO

### Meta Tags
- [ ] Title tags únicos
- [ ] Meta descriptions
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Canonical URLs

### Estrutura
- [ ] URLs amigáveis
- [ ] Sitemap.xml acessível
- [ ] Robots.txt configurado
- [ ] Schema markup (se aplicável)
- [ ] Breadcrumbs (se aplicável)

### Conteúdo
- [ ] Headings estruturados (H1, H2, etc.)
- [ ] Alt text em imagens
- [ ] Links internos funcionam
- [ ] 404 page customizada
- [ ] Conteúdo único e relevante

## 📊 Analytics

### Google Analytics
- [ ] GA4 configurado
- [ ] Tracking code instalado
- [ ] Goals configurados
- [ ] E-commerce tracking (se aplicável)
- [ ] Custom events funcionam

### Netlify Analytics
- [ ] Analytics ativo
- [ ] Dados sendo coletados
- [ ] Relatórios acessíveis

## 🐛 Monitoramento

### Error Tracking
- [ ] Error tracking configurado
- [ ] Alertas configurados
- [ ] Logs acessíveis
- [ ] Uptime monitoring

### Performance Monitoring
- [ ] Core Web Vitals monitorados
- [ ] Performance alerts
- [ ] Resource monitoring
- [ ] User experience tracking

## 📞 Suporte

### Documentação
- [ ] README atualizado
- [ ] Documentação de API
- [ ] Guias de usuário
- [ ] Troubleshooting guide

### Backup e Recovery
- [ ] Backup de dados
- [ ] Plano de recovery
- [ ] Rollback testado
- [ ] Disaster recovery plan

---

## ✅ Aprovação Final

- [ ] Todos os itens acima verificados
- [ ] Testes de aceitação passaram
- [ ] Stakeholders aprovaram
- [ ] Deploy aprovado para produção

**Data do Deploy:** _______________
**Responsável:** _______________
**Versão:** _______________
**URL de Produção:** _______________

---

**Notas Adicionais:**
_Use este espaço para anotações específicas do deploy_