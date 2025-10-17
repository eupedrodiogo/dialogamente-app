#!/bin/bash

echo "🔍 Verificando build do DialogaMente..."
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0

# Verificar se dist existe
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Pasta dist não encontrada${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✅ Pasta dist encontrada${NC}"
fi

# Verificar index.html
if [ ! -f "dist/index.html" ]; then
    echo -e "${RED}❌ index.html não encontrado${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✅ index.html encontrado${NC}"
    
    # Verificar se tem o div root
    if grep -q 'id="root"' dist/index.html; then
        echo -e "${GREEN}✅ div#root encontrado no HTML${NC}"
    else
        echo -e "${RED}❌ div#root NÃO encontrado no HTML${NC}"
        ERRORS=$((ERRORS + 1))
    fi
fi

# Verificar _redirects
if [ ! -f "dist/_redirects" ]; then
    echo -e "${RED}❌ _redirects não encontrado${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✅ _redirects encontrado${NC}"
fi

# Verificar assets
if [ ! -d "dist/assets" ]; then
    echo -e "${RED}❌ Pasta assets não encontrada${NC}"
    ERRORS=$((ERRORS + 1))
else
    JS_COUNT=$(find dist/assets -name "*.js" | wc -l)
    CSS_COUNT=$(find dist/assets -name "*.css" | wc -l)
    
    echo -e "${GREEN}✅ Pasta assets encontrada${NC}"
    echo -e "   📦 $JS_COUNT arquivos JavaScript"
    echo -e "   🎨 $CSS_COUNT arquivos CSS"
    
    if [ $JS_COUNT -eq 0 ]; then
        echo -e "${RED}❌ Nenhum arquivo JavaScript encontrado!${NC}"
        ERRORS=$((ERRORS + 1))
    fi
fi

# Verificar favicon
if [ ! -f "dist/favicon.ico" ]; then
    echo -e "${YELLOW}⚠️  favicon.ico não encontrado${NC}"
else
    echo -e "${GREEN}✅ favicon.ico encontrado${NC}"
fi

# Verificar manifest.json
if [ ! -f "dist/manifest.json" ]; then
    echo -e "${YELLOW}⚠️  manifest.json não encontrado${NC}"
else
    echo -e "${GREEN}✅ manifest.json encontrado (PWA)${NC}"
fi

# Verificar sitemap.xml
if [ ! -f "dist/sitemap.xml" ]; then
    echo -e "${YELLOW}⚠️  sitemap.xml não encontrado${NC}"
else
    echo -e "${GREEN}✅ sitemap.xml encontrado (SEO)${NC}"
fi

# Tamanho total
TOTAL_SIZE=$(du -sh dist | cut -f1)
echo ""
echo -e "📊 Tamanho total do build: ${GREEN}$TOTAL_SIZE${NC}"

# Resultado final
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ BUILD VÁLIDO E PRONTO PARA DEPLOY!${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    exit 0
else
    echo -e "${RED}❌ BUILD COM $ERRORS ERRO(S)!${NC}"
    echo -e "${RED}   NÃO faça deploy até corrigir os erros acima${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    exit 1
fi

