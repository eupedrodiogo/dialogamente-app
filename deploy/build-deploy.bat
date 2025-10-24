@echo off
setlocal enabledelayedexpansion

REM Script de Build para Deploy no Netlify - DialogaMente
REM Versão Batch - Simples e compatível

echo.
echo DialogaMente - Build para Deploy Netlify
echo =========================================
echo.

REM Verificar Node.js
echo [INFO] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js nao encontrado!
    pause
    exit /b 1
)
echo [SUCCESS] Node.js encontrado

REM Verificar NPM
echo [INFO] Verificando NPM...
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] NPM nao encontrado!
    pause
    exit /b 1
)
echo [SUCCESS] NPM encontrado

REM Verificar package.json
echo [INFO] Verificando package.json...
if not exist "package.json" (
    echo [ERROR] package.json nao encontrado!
    pause
    exit /b 1
)
echo [SUCCESS] package.json encontrado

REM Limpeza (opcional)
set /p clean="Limpar cache e node_modules? (s/N): "
if /i "!clean!"=="s" (
    echo [INFO] Limpando cache...
    if exist "node_modules" rmdir /s /q "node_modules"
    if exist "package-lock.json" del "package-lock.json"
    if exist "dist" rmdir /s /q "dist"
    echo [SUCCESS] Limpeza concluida
)

REM Instalar dependências
echo [INFO] Instalando dependencias...
if exist "package-lock.json" (
    npm ci
) else (
    npm install --legacy-peer-deps
)
if errorlevel 1 (
    echo [ERROR] Falha na instalacao de dependencias!
    pause
    exit /b 1
)
echo [SUCCESS] Dependencias instaladas

REM Linting (opcional)
set /p lint="Executar linting? (s/N): "
if /i "!lint!"=="s" (
    echo [INFO] Executando linting...
    npm run lint
    if errorlevel 1 (
        echo [WARNING] Linting falhou, mas continuando...
    ) else (
        echo [SUCCESS] Linting concluido
    )
)

REM Build
echo [INFO] Executando build de producao...
npm run build
if errorlevel 1 (
    echo [ERROR] Build falhou!
    pause
    exit /b 1
)

if not exist "dist" (
    echo [ERROR] Diretorio dist nao foi criado!
    pause
    exit /b 1
)
echo [SUCCESS] Build concluido

REM Copiar arquivos essenciais
echo [INFO] Copiando arquivos essenciais...

if exist "deploy\_headers" (
    copy "deploy\_headers" "dist\_headers" >nul
    echo [SUCCESS] _headers copiado
)

if exist "deploy\robots.txt" (
    copy "deploy\robots.txt" "dist\robots.txt" >nul
    echo [SUCCESS] robots.txt copiado
)

if exist "deploy\sitemap.xml" (
    copy "deploy\sitemap.xml" "dist\sitemap.xml" >nul
    echo [SUCCESS] sitemap.xml copiado
)

if exist "deploy\manifest.json" (
    copy "deploy\manifest.json" "dist\manifest.json" >nul
    echo [SUCCESS] manifest.json copiado
)

if exist "deploy\_redirects" (
    copy "deploy\_redirects" "dist\_redirects" >nul
    echo [SUCCESS] _redirects copiado
)

REM Verificar arquivos críticos
echo [INFO] Verificando arquivos criticos...
if not exist "dist\index.html" (
    echo [ERROR] index.html nao encontrado no dist!
    pause
    exit /b 1
)
echo [SUCCESS] Arquivos criticos verificados

REM Análise básica do build
echo [INFO] Analisando build...
dir "dist" /s /-c | find "File(s)" > temp_count.txt
set /p file_count=<temp_count.txt
del temp_count.txt
echo [SUCCESS] Build analisado

REM Instruções finais
echo.
echo ========================================
echo   BUILD CONCLUIDO COM SUCESSO!
echo ========================================
echo.
echo Pasta de deploy: dist\
echo.
echo Proximos passos para deploy no Netlify:
echo 1. Acesse https://app.netlify.com
echo 2. Clique em "Add new site" ^> "Deploy manually"
echo 3. Arraste a pasta 'dist' para a area de upload
echo 4. Aguarde o deploy ser concluido
echo.
echo Arquivos incluidos:
echo - Aplicacao React buildada
echo - Configuracoes de redirecionamento (_redirects)
echo - Cabecalhos de seguranca (_headers)
echo - Arquivos SEO (robots.txt, sitemap.xml)
echo - Manifest PWA (manifest.json)
echo.

pause