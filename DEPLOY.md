# DialogaMente - Guia de Deploy

## Configuração de Variáveis de Ambiente

Para fazer o deploy da aplicação, você precisa configurar as seguintes variáveis de ambiente na plataforma de deploy (Vercel/Netlify):

### Variáveis Obrigatórias:

```
VITE_SUPABASE_URL=https://sjyellllnsxkebukmoxi.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=[sua-chave-anon]
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