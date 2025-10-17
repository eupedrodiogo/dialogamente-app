# DialogaMente - Guia de Deploy

## Configuração de Variáveis de Ambiente

Para fazer o deploy da aplicação, você precisa configurar as seguintes variáveis de ambiente na plataforma de deploy (Vercel/Netlify):

### Variáveis Obrigatórias:

```
VITE_SUPABASE_PROJECT_ID=sjyellllnsxkebukmoxi
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqeWVsbGxsbnN4a2VidWttb3hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NTM5NzksImV4cCI6MjA3NjEyOTk3OX0.W40qne_M7gxnJVckPIc-te9sD7Ks_hxe-8Vp3X66sIg
VITE_SUPABASE_URL=https://sjyellllnsxkebukmoxi.supabase.co
```

## Deploy no Vercel

1. Conecte seu repositório GitHub ao Vercel
2. Configure as variáveis de ambiente acima
3. O deploy será automático a cada push

## Deploy no Netlify

1. Conecte seu repositório GitHub ao Netlify
2. Configure as variáveis de ambiente acima
3. O deploy será automático a cada push

## Comandos de Build

- **Build de produção**: `npm run build`
- **Preview local**: `npm run preview`
- **Desenvolvimento**: `npm run dev`

## Funcionalidades Integradas

- ✅ Supabase (Banco de dados e autenticação)
- ✅ Stripe (Pagamentos)
- ✅ Sistema de cupons
- ✅ Email de suporte
- ✅ Interface responsiva
- ✅ Temas claro/escuro

## URLs de Deploy

- **GitHub Repository**: https://github.com/eupedrodiogo/dialogamente-app
- **Vercel**: Configurar após conectar repositório
- **Netlify**: Configurar após conectar repositório