#!/bin/bash

# Script de Build para Deploy no Netlify - DialogaMente
# Este script prepara o projeto para deploy em produção

set -e  # Para o script se houver erro

echo "🚀 Iniciando build para deploy no Netlify..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log colorido
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    log_error "package.json não encontrado. Execute este script na raiz do projeto."
    exit 1
fi

# Limpar cache e node_modules se necessário
log_info "Limpando cache..."
rm -rf node_modules/.cache
rm -rf dist

# Instalar dependências
log_info "Instalando dependências..."
npm ci --legacy-peer-deps

# Verificar variáveis de ambiente
log_info "Verificando variáveis de ambiente..."
if [ -z "$VITE_SUPABASE_URL" ]; then
    log_warning "VITE_SUPABASE_URL não definida"
fi

if [ -z "$VITE_SUPABASE_PUBLISHABLE_KEY" ]; then
    log_warning "VITE_SUPABASE_PUBLISHABLE_KEY não definida"
fi

# Executar linting
log_info "Executando linting..."
npm run lint || log_warning "Linting falhou, mas continuando..."

# Build do projeto
log_info "Executando build de produção..."
npm run build

# Verificar se o build foi bem-sucedido
if [ ! -d "dist" ]; then
    log_error "Build falhou - diretório dist não foi criado"
    exit 1
fi

# Verificar se index.html foi criado
if [ ! -f "dist/index.html" ]; then
    log_error "Build falhou - index.html não foi criado"
    exit 1
fi

# Copiar arquivos essenciais para o diretório dist
log_info "Copiando arquivos essenciais..."

# Copiar _redirects se existir
if [ -f "public/_redirects" ]; then
    cp public/_redirects dist/
    log_success "_redirects copiado"
fi

# Copiar robots.txt se existir
if [ -f "public/robots.txt" ]; then
    cp public/robots.txt dist/
    log_success "robots.txt copiado"
fi

# Copiar sitemap.xml se existir
if [ -f "public/sitemap.xml" ]; then
    cp public/sitemap.xml dist/
    log_success "sitemap.xml copiado"
fi

# Copiar manifest.json se existir
if [ -f "public/manifest.json" ]; then
    cp public/manifest.json dist/
    log_success "manifest.json copiado"
fi

# Verificar tamanho dos arquivos
log_info "Analisando tamanho dos arquivos..."
du -sh dist/
find dist/assets -name "*.js" -exec du -h {} \; | sort -hr | head -5
find dist/assets -name "*.css" -exec du -h {} \; | sort -hr | head -3

# Verificar se há arquivos muito grandes
large_files=$(find dist -size +1M -type f)
if [ ! -z "$large_files" ]; then
    log_warning "Arquivos grandes encontrados (>1MB):"
    echo "$large_files"
fi

# Gerar relatório de build
log_info "Gerando relatório de build..."
echo "Build Report - $(date)" > dist/build-report.txt
echo "Node Version: $(node --version)" >> dist/build-report.txt
echo "NPM Version: $(npm --version)" >> dist/build-report.txt
echo "Build Size: $(du -sh dist/ | cut -f1)" >> dist/build-report.txt
echo "Files Count: $(find dist -type f | wc -l)" >> dist/build-report.txt

log_success "Build concluído com sucesso!"
log_info "Diretório de saída: dist/"
log_info "Pronto para deploy no Netlify!"

# Instruções finais
echo ""
echo "📋 Próximos passos:"
echo "1. Faça upload da pasta 'dist' para o Netlify"
echo "2. Configure as variáveis de ambiente no painel do Netlify"
echo "3. Configure o domínio personalizado se necessário"
echo ""