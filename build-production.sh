#!/bin/bash

# Script de Build Robusto e Completo para DialogaMente
# Versão: 3.5 - Deploy Definitivo
# Data: 17 de outubro de 2025

set -e  # Para em caso de erro

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}🚀 DialogaMente - Build de Produção Robusto${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Passo 1: Limpar builds anteriores
echo -e "${YELLOW}📦 Passo 1/8: Limpando builds anteriores...${NC}"
rm -rf dist
rm -rf node_modules/.vite
echo -e "${GREEN}✅ Limpeza concluída${NC}"
echo ""

# Passo 2: Verificar dependências
echo -e "${YELLOW}📦 Passo 2/8: Verificando dependências...${NC}"
if [ ! -d "node_modules" ]; then
    echo "Instalando dependências..."
    npm install
fi
echo -e "${GREEN}✅ Dependências OK${NC}"
echo ""

# Passo 3: Criar arquivos essenciais
echo -e "${YELLOW}📦 Passo 3/8: Criando arquivos essenciais...${NC}"

# _redirects
cat > public/_redirects << 'EOF'
/*    /index.html   200
EOF
echo "  ✅ _redirects criado"

# robots.txt (se não existir)
if [ ! -f "public/robots.txt" ]; then
    cat > public/robots.txt << 'EOF'
User-agent: *
Allow: /

Sitemap: https://dialogamente.com.br/sitemap.xml
EOF
    echo "  ✅ robots.txt criado"
fi

# sitemap.xml (se não existir)
if [ ! -f "public/sitemap.xml" ]; then
    cat > public/sitemap.xml << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dialogamente.com.br/</loc>
    <priority>1.0</priority>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>https://dialogamente.com.br/instrucoes</loc>
    <priority>0.9</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://dialogamente.com.br/test</loc>
    <priority>0.9</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://dialogamente.com.br/pricing</loc>
    <priority>0.8</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://dialogamente.com.br/suporte</loc>
    <priority>0.7</priority>
    <changefreq>monthly</changefreq>
  </url>
</urlset>
EOF
    echo "  ✅ sitemap.xml criado"
fi

# manifest.json (se não existir)
if [ ! -f "public/manifest.json" ]; then
    cat > public/manifest.json << 'EOF'
{
  "name": "DialogaMente - Comunique-se Conscientemente",
  "short_name": "DialogaMente",
  "description": "Descubra seu perfil comunicativo e desenvolva uma comunicação mais consciente e eficaz",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#9333EA",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/favicon.ico",
      "sizes": "32x32",
      "type": "image/x-icon"
    }
  ]
}
EOF
    echo "  ✅ manifest.json criado"
fi

echo -e "${GREEN}✅ Arquivos essenciais criados${NC}"
echo ""

# Passo 4: Fazer build
echo -e "${YELLOW}📦 Passo 4/8: Executando build de produção...${NC}"
npm run build
echo -e "${GREEN}✅ Build concluído${NC}"
echo ""

# Passo 5: Verificar arquivos críticos
echo -e "${YELLOW}📦 Passo 5/8: Verificando arquivos críticos...${NC}"

ERRORS=0

if [ ! -f "dist/index.html" ]; then
    echo -e "${RED}❌ index.html não encontrado${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo "  ✅ index.html"
fi

if [ ! -f "dist/_redirects" ]; then
    echo -e "${RED}❌ _redirects não encontrado${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo "  ✅ _redirects"
fi

if [ ! -d "dist/assets" ]; then
    echo -e "${RED}❌ pasta assets não encontrada${NC}"
    ERRORS=$((ERRORS + 1))
else
    JS_COUNT=$(find dist/assets -name "*.js" | wc -l)
    CSS_COUNT=$(find dist/assets -name "*.css" | wc -l)
    echo "  ✅ assets/ ($JS_COUNT JS, $CSS_COUNT CSS)"
fi

if [ $ERRORS -gt 0 ]; then
    echo -e "${RED}❌ Build com erros! Abortando...${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Todos os arquivos críticos presentes${NC}"
echo ""

# Passo 6: Otimizar arquivos
echo -e "${YELLOW}📦 Passo 6/8: Otimizando arquivos...${NC}"

# Garantir que _redirects está correto
echo "/*    /index.html   200" > dist/_redirects
echo "  ✅ _redirects otimizado"

# Copiar arquivos adicionais se existirem
for file in robots.txt sitemap.xml manifest.json sw.js og-image.png twitter-card.png apple-touch-icon.png; do
    if [ -f "public/$file" ]; then
        cp "public/$file" "dist/" 2>/dev/null || true
        echo "  ✅ $file copiado"
    fi
done

echo -e "${GREEN}✅ Otimização concluída${NC}"
echo ""

# Passo 7: Criar arquivo de informações
echo -e "${YELLOW}📦 Passo 7/8: Criando arquivo de informações...${NC}"

cat > dist/BUILD_INFO.txt << EOF
DialogaMente - Build de Produção
================================

Data: $(date '+%d/%m/%Y %H:%M:%S')
Versão: 3.5 - Deploy Definitivo
Node: $(node --version)
NPM: $(npm --version)

Arquivos Incluídos:
- index.html
- _redirects (SPA routing)
- assets/ (JavaScript e CSS)
- favicon.ico
- robots.txt (SEO)
- sitemap.xml (SEO)
- manifest.json (PWA)

Tamanho Total: $(du -sh dist | cut -f1)

Status: ✅ PRONTO PARA DEPLOY

Instruções:
1. Arraste a pasta 'dist' para o Netlify
2. Aguarde o deploy completar
3. Limpe o cache do navegador (Ctrl+Shift+R)
4. Acesse https://dialogamente.com.br
5. Deve funcionar perfeitamente!

Suporte: Se tiver problemas, verifique o console (F12)
EOF

echo -e "${GREEN}✅ BUILD_INFO.txt criado${NC}"
echo ""

# Passo 8: Estatísticas finais
echo -e "${YELLOW}📦 Passo 8/8: Estatísticas finais...${NC}"

TOTAL_SIZE=$(du -sh dist | cut -f1)
FILE_COUNT=$(find dist -type f | wc -l)
JS_SIZE=$(du -sh dist/assets/*.js 2>/dev/null | awk '{sum+=$1} END {print sum}' || echo "0")
CSS_SIZE=$(du -sh dist/assets/*.css 2>/dev/null | awk '{sum+=$1} END {print sum}' || echo "0")

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ BUILD CONCLUÍDO COM SUCESSO!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Estatísticas:"
echo "  • Tamanho total: $TOTAL_SIZE"
echo "  • Total de arquivos: $FILE_COUNT"
echo "  • Arquivos JavaScript: $(find dist/assets -name "*.js" 2>/dev/null | wc -l)"
echo "  • Arquivos CSS: $(find dist/assets -name "*.css" 2>/dev/null | wc -l)"
echo ""
echo "📦 Arquivos principais:"
ls -lh dist/ | grep -E "(index.html|_redirects|robots.txt|sitemap.xml|manifest.json)" | awk '{print "  • " $9 " (" $5 ")"}'
echo ""
echo "🚀 Próximos passos:"
echo "  1. Execute: ./create-deploy-package.sh"
echo "  2. Ou arraste a pasta 'dist' para o Netlify"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

