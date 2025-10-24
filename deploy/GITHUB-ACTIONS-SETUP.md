# 🔄 Configuração do GitHub Actions para Deploy Automático

Este guia explica como configurar o deploy automático no Netlify usando GitHub Actions.

## 📋 Pré-requisitos

1. **Repositório no GitHub** com o código do projeto
2. **Conta no Netlify** (https://netlify.com)
3. **Site criado no Netlify** (pode ser vazio inicialmente)

## 🔧 Configuração Passo a Passo

### 1. Obter Tokens do Netlify

#### 1.1 Netlify Auth Token
1. Acesse https://app.netlify.com/user/applications
2. Clique em "New access token"
3. Dê um nome (ex: "GitHub Actions")
4. Copie o token gerado

#### 1.2 Netlify Site ID
1. Acesse seu site no Netlify
2. Vá em "Site settings"
3. Na seção "General", copie o "Site ID"

### 2. Configurar Secrets no GitHub

1. Acesse seu repositório no GitHub
2. Vá em **Settings** > **Secrets and variables** > **Actions**
3. Clique em **New repository secret**
4. Adicione os seguintes secrets:

```
NETLIFY_AUTH_TOKEN = seu_token_do_netlify
NETLIFY_SITE_ID = seu_site_id_do_netlify
```

### 3. Estrutura do Workflow

O arquivo `.github/workflows/deploy-netlify.yml` já foi criado com:

- ✅ **Triggers**: Push para main/master, PRs e execução manual
- ✅ **Matrix Strategy**: Testa com Node.js 18.x e 20.x
- ✅ **Cache**: Cache automático do NPM
- ✅ **Linting**: Execução opcional (não falha o build)
- ✅ **Build**: Compilação da aplicação
- ✅ **Copy Assets**: Cópia automática dos arquivos essenciais
- ✅ **Analysis**: Análise do tamanho do build
- ✅ **Verification**: Verificação de arquivos críticos
- ✅ **Deploy**: Deploy automático no Netlify
- ✅ **Reports**: Geração de relatórios de deploy

## 🚀 Como Usar

### Deploy Automático
- **Push para main/master**: Deploy automático em produção
- **Pull Request**: Deploy de preview (se configurado)
- **Manual**: Acesse "Actions" > "Deploy to Netlify" > "Run workflow"

### Monitoramento
1. Acesse a aba **Actions** no GitHub
2. Veja o progresso do workflow em tempo real
3. Baixe os relatórios de deploy gerados

## 📊 Funcionalidades Incluídas

### ✅ Verificações Automáticas
- Instalação de dependências
- Linting do código
- Build da aplicação
- Verificação de arquivos críticos
- Análise de tamanho do build

### 📁 Arquivos Copiados Automaticamente
- `_headers` (cabeçalhos de segurança)
- `_redirects` (redirecionamentos)
- `robots.txt` (SEO)
- `sitemap.xml` (SEO)
- `manifest.json` (PWA)

### 📈 Relatórios Gerados
- Estrutura do build
- Tamanho total dos arquivos
- Lista de arquivos grandes
- Informações do commit e branch

## 🔧 Personalização

### Modificar Node.js Versions
```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x, 22.x]  # Adicione mais versões
```

### Adicionar Variáveis de Ambiente
```yaml
- name: 🏗️ Build application
  run: npm run build
  env:
    NODE_ENV: production
    VITE_API_URL: ${{ secrets.API_URL }}  # Adicione suas variáveis
```

### Configurar Deploy de Preview
```yaml
- name: 🚀 Deploy Preview
  if: github.event_name == 'pull_request'
  uses: nwtgck/actions-netlify@v3.0
  with:
    publish-dir: './dist'
    production-deploy: false  # Deploy de preview
```

## 🐛 Troubleshooting

### Erro: "NETLIFY_AUTH_TOKEN not found"
- Verifique se o secret foi criado corretamente
- Confirme o nome exato: `NETLIFY_AUTH_TOKEN`

### Erro: "Site not found"
- Verifique o `NETLIFY_SITE_ID`
- Confirme se o site existe no Netlify

### Build Falha
- Verifique os logs na aba Actions
- Teste o build localmente: `npm run build`
- Verifique se todas as dependências estão no package.json

### Deploy Lento
- Otimize o tamanho do build
- Use cache do NPM (já configurado)
- Considere usar `npm ci` em vez de `npm install`

## 📚 Recursos Adicionais

- [Documentação do GitHub Actions](https://docs.github.com/en/actions)
- [Netlify Deploy Action](https://github.com/nwtgck/actions-netlify)
- [Netlify Documentation](https://docs.netlify.com/)

## 🎯 Próximos Passos

1. ✅ Configure os secrets no GitHub
2. ✅ Faça um push para testar o workflow
3. ✅ Monitore o deploy na aba Actions
4. ✅ Verifique o site no Netlify
5. ✅ Configure domínio personalizado (opcional)

---

**💡 Dica**: O primeiro deploy pode demorar mais. Os próximos serão mais rápidos devido ao cache!