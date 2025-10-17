#!/bin/bash

# Script para Criar Pacote de Deploy
# Versão: 3.5 - Deploy Definitivo

set -e

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}📦 Criando Pacote de Deploy${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Verificar se dist existe
if [ ! -d "dist" ]; then
    echo -e "${YELLOW}⚠️  Pasta dist não encontrada. Executando build...${NC}"
    ./build-production.sh
fi

# Nome do arquivo
TIMESTAMP=$(date '+%Y%m%d_%H%M%S')
FILENAME="DialogaMente-Deploy-${TIMESTAMP}.zip"
FILEPATH="../${FILENAME}"

echo -e "${YELLOW}📦 Criando arquivo ZIP...${NC}"

# Criar ZIP
cd dist
zip -r "$FILEPATH" . -q
cd ..

# Verificar tamanho
SIZE=$(ls -lh "$FILEPATH" | awk '{print $5}')

echo -e "${GREEN}✅ Pacote criado com sucesso!${NC}"
echo ""
echo "📦 Informações do pacote:"
echo "  • Nome: $FILENAME"
echo "  • Tamanho: $SIZE"
echo "  • Localização: $(dirname "$FILEPATH")"
echo ""
echo "🚀 Como fazer deploy:"
echo "  1. Baixe o arquivo: $FILENAME"
echo "  2. Extraia a pasta 'dist'"
echo "  3. Acesse https://app.netlify.com"
echo "  4. Arraste a pasta 'dist' para o Netlify"
echo "  5. Aguarde o deploy completar"
echo "  6. Limpe o cache (Ctrl+Shift+R)"
echo "  7. Acesse https://dialogamente.com.br"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

