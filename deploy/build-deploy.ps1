# Script de Build para Deploy no Netlify - DialogaMente
# Versao: 2.0.0
# Autor: DialogaMente Team

param(
    [switch]$Verbose = $false,
    [switch]$SkipLint = $false,
    [switch]$SkipClean = $false
)

# Configuracao de encoding para suporte a caracteres especiais
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# Funcoes de log
function Write-ColorOutput {
    param($Message, $Color = "White")
    Write-Host $Message -ForegroundColor $Color
}

function Log-Info {
    param($Message)
    Write-ColorOutput "[INFO] $Message" "Cyan"
}

function Log-Success {
    param($Message)
    Write-ColorOutput "[SUCCESS] $Message" "Green"
}

function Log-Warning {
    param($Message)
    Write-ColorOutput "[WARNING] $Message" "Yellow"
}

function Log-Error {
    param($Message)
    Write-ColorOutput "[ERROR] $Message" "Red"
}

function Test-Command {
    param($Command)
    try {
        & $Command --version 2>$null | Out-Null
        return $LASTEXITCODE -eq 0
    }
    catch {
        return $false
    }
}

# Header
Write-Host ""
Write-ColorOutput "DialogaMente - Build para Deploy Netlify" "Magenta"
Write-ColorOutput "=========================================" "Magenta"
Write-Host ""

# Verificar se estamos no diretorio correto
$currentDir = Get-Location
$projectRoot = Split-Path -Parent $PSScriptRoot

Log-Info "Diretorio atual: $currentDir"
Log-Info "Raiz do projeto: $projectRoot"

# Mudar para o diretorio raiz do projeto
Set-Location $projectRoot
Log-Info "Mudando para diretorio raiz do projeto..."

# Verificar se package.json existe
if (-not (Test-Path "package.json")) {
    Log-Error "Arquivo package.json nao encontrado no diretorio raiz do projeto."
    Log-Error "Certifique-se de que o script esta sendo executado a partir da pasta deploy."
    exit 1
}

# Verificar Node.js
Log-Info "Verificando Node.js..."
if (-not (Test-Command "node")) {
    Log-Error "Node.js nao encontrado. Instale Node.js 18 ou superior."
    exit 1
}
$nodeVersion = node --version
Log-Success "Node.js $nodeVersion encontrado"

# Verificar NPM
Log-Info "Verificando NPM..."
if (-not (Test-Command "npm")) {
    Log-Error "NPM nao encontrado."
    exit 1
}
$npmVersion = npm --version
Log-Success "NPM $npmVersion encontrado"

# Verificar se package.json tem os scripts necessarios
Log-Info "Verificando scripts do package.json..."
$packageJson = Get-Content "package.json" | ConvertFrom-Json
if (-not $packageJson.scripts.build) {
    Log-Error "Script 'build' nao encontrado no package.json"
    exit 1
}
Log-Success "Scripts necessarios encontrados"

# Limpar cache (opcional)
if (-not $SkipClean) {
    Log-Info "Limpando cache e arquivos antigos..."
    
    if (Test-Path "node_modules") {
        Log-Info "Removendo node_modules..."
        Remove-Item -Recurse -Force "node_modules" -ErrorAction SilentlyContinue
    }
    
    if (Test-Path "package-lock.json") {
        Log-Info "Removendo package-lock.json..."
        Remove-Item -Force "package-lock.json" -ErrorAction SilentlyContinue
    }
    
    if (Test-Path "dist") {
        Log-Info "Removendo diretorio dist anterior..."
        Remove-Item -Recurse -Force "dist" -ErrorAction SilentlyContinue
    }
    
    Log-Success "Cache limpo"
} else {
    Log-Info "Pulando limpeza de cache (--SkipClean especificado)"
}

# Instalar dependencias
Log-Info "Instalando dependencias..."
$installArgs = @("install")
if (Test-Path "package-lock.json") {
    $installArgs = @("ci")
    Log-Info "Usando 'npm ci' (package-lock.json encontrado)"
} else {
    Log-Info "Usando 'npm install' (package-lock.json nao encontrado)"
}

$installArgs += "--legacy-peer-deps"
$installProcess = Start-Process -FilePath "npm" -ArgumentList $installArgs -Wait -PassThru -NoNewWindow

if ($installProcess.ExitCode -ne 0) {
    Log-Error "Falha ao instalar dependencias (codigo de saida: $($installProcess.ExitCode))"
    exit 1
}
Log-Success "Dependencias instaladas com sucesso"

# Verificar variaveis de ambiente
Log-Info "Verificando configuracao de ambiente..."
$envFiles = @(".env", ".env.local", ".env.production")
$envFound = $false

foreach ($envFile in $envFiles) {
    if (Test-Path $envFile) {
        Log-Success "Arquivo de ambiente encontrado: $envFile"
        $envFound = $true
    }
}

if (-not $envFound) {
    Log-Warning "Nenhum arquivo de ambiente encontrado (.env, .env.local, .env.production)"
    Log-Warning "Certifique-se de configurar as variaveis de ambiente no Netlify"
}

# Executar linting (opcional)
if (-not $SkipLint -and $packageJson.scripts.lint) {
    Log-Info "Executando linting..."
    $lintProcess = Start-Process -FilePath "npm" -ArgumentList @("run", "lint") -Wait -PassThru -NoNewWindow
    
    if ($lintProcess.ExitCode -eq 0) {
        Log-Success "Linting passou sem erros"
    } else {
        Log-Warning "Linting encontrou problemas, mas continuando com o build..."
    }
} else {
    if ($SkipLint) {
        Log-Info "Pulando linting (--SkipLint especificado)"
    } else {
        Log-Info "Script de lint nao encontrado, pulando..."
    }
}

# Executar build
Log-Info "Executando build de producao..."
$buildProcess = Start-Process -FilePath "npm" -ArgumentList @("run", "build") -Wait -PassThru -NoNewWindow

if ($buildProcess.ExitCode -ne 0) {
    Log-Error "Falha no build (codigo de saida: $($buildProcess.ExitCode))"
    exit 1
}
Log-Success "Build concluido com sucesso"

# Verificar se dist foi criado
if (-not (Test-Path "dist")) {
    Log-Error "Diretorio 'dist' nao foi criado pelo build"
    Log-Error "Verifique a configuracao do Vite ou do bundler"
    exit 1
}

# Copiar arquivos essenciais para deploy
Log-Info "Copiando arquivos essenciais para deploy..."

$deployDir = Join-Path $PSScriptRoot ""
$filesToCopy = @(
    @{Source = Join-Path $deployDir "_redirects"; Dest = "dist\_redirects"; Required = $true},
    @{Source = Join-Path $deployDir "_headers"; Dest = "dist\_headers"; Required = $true},
    @{Source = Join-Path $deployDir "robots.txt"; Dest = "dist\robots.txt"; Required = $false},
    @{Source = Join-Path $deployDir "sitemap.xml"; Dest = "dist\sitemap.xml"; Required = $false},
    @{Source = Join-Path $deployDir "manifest.json"; Dest = "dist\manifest.json"; Required = $false}
)

$copyErrors = 0
foreach ($file in $filesToCopy) {
    if (Test-Path $file.Source) {
        try {
            Copy-Item $file.Source $file.Dest -Force
            Log-Success "Copiado: $(Split-Path $file.Source -Leaf) -> dist\"
        }
        catch {
            Log-Error "Erro ao copiar $($file.Source): $($_.Exception.Message)"
            $copyErrors++
        }
    } else {
        if ($file.Required) {
            Log-Error "Arquivo obrigatorio nao encontrado: $($file.Source)"
            $copyErrors++
        } else {
            Log-Warning "Arquivo opcional nao encontrado: $($file.Source)"
        }
    }
}

if ($copyErrors -gt 0) {
    Log-Error "Erros encontrados ao copiar arquivos essenciais"
    exit 1
}

# Verificar arquivos criticos no dist
Log-Info "Verificando arquivos criticos no build..."
$criticalFiles = @("index.html")
foreach ($file in $criticalFiles) {
    $filePath = Join-Path "dist" $file
    if (-not (Test-Path $filePath)) {
        Log-Error "Arquivo critico nao encontrado: $file"
        exit 1
    }
}
Log-Success "Todos os arquivos criticos estao presentes"

# Analisar tamanho do build
Log-Info "Analisando tamanho do build..."
try {
    $distItems = Get-ChildItem -Recurse "dist" -File
    $distSize = ($distItems | Measure-Object -Property Length -Sum).Sum
    $distSizeMB = [math]::Round($distSize / 1MB, 2)
    $fileCount = $distItems.Count
    
    Log-Success "Tamanho total do build: $distSizeMB MB"
    Log-Success "Numero de arquivos: $fileCount"
    
    # Verificar arquivos grandes
    $largeFiles = $distItems | Where-Object { $_.Length -gt 1MB }
    if ($largeFiles) {
        Log-Warning "Arquivos grandes encontrados (>1MB):"
        $largeFiles | ForEach-Object {
            $sizeMB = [math]::Round($_.Length / 1MB, 2)
            Write-Host "  $($_.Name): $sizeMB MB" -ForegroundColor Yellow
        }
    }
    
    # Avisar se o build esta muito grande
    if ($distSizeMB -gt 50) {
        Log-Warning "Build muito grande ($distSizeMB MB). Considere otimizar assets."
    }
}
catch {
    Log-Warning "Erro ao analisar tamanho do build: $($_.Exception.Message)"
}

# Gerar relatorio de build
Log-Info "Gerando relatorio de build..."
try {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $reportContent = @"
DialogaMente - Build Report
===========================
Timestamp: $timestamp
Node Version: $nodeVersion
NPM Version: $npmVersion
Build Size: $distSizeMB MB
Files Count: $fileCount
Project Root: $projectRoot
Deploy Ready: YES

Arquivos Copiados:
"@

    foreach ($file in $filesToCopy) {
        $fileName = Split-Path $file.Source -Leaf
        $status = if (Test-Path $file.Dest) { "OK" } else { "MISSING" }
        $reportContent += "`n- $fileName`: $status"
    }

    $reportContent | Out-File -FilePath "dist\build-report.txt" -Encoding UTF8
    Log-Success "Relatorio salvo em: dist\build-report.txt"
}
catch {
    Log-Warning "Erro ao gerar relatorio: $($_.Exception.Message)"
}

# Instrucoes finais
Write-Host ""
Write-ColorOutput "Build finalizado com sucesso!" "Green"
Write-Host ""
Write-ColorOutput "Proximos passos para deploy no Netlify:" "Yellow"
Write-Host "1. Faca upload da pasta 'dist' para o Netlify"
Write-Host "2. Configure as variaveis de ambiente no painel do Netlify"
Write-Host "3. Configure o dominio personalizado se necessario"
Write-Host "4. Verifique os redirects e headers em _redirects e _headers"
Write-Host ""

# Informacoes detalhadas se verbose
if ($Verbose) {
    Write-Host ""
    Log-Info "Listagem detalhada dos arquivos do build:"
    Get-ChildItem -Recurse "dist" | Select-Object Name, Length, LastWriteTime | Format-Table -AutoSize
}

# Voltar ao diretorio original
Set-Location $currentDir

Write-ColorOutput "Deploy package pronto! Diretorio: dist\" "Green"
exit 0