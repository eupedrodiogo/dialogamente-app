#!/usr/bin/env node

/**
 * Script de Build para Deploy no Netlify - DialogaMente
 * Versão Node.js - Mais confiável e multiplataforma
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações
const CONFIG = {
  projectRoot: process.cwd(),
  deployDir: path.join(process.cwd(), 'deploy'),
  distDir: path.join(process.cwd(), 'dist'),
  skipLint: process.argv.includes('--skip-lint'),
  skipClean: process.argv.includes('--skip-clean'),
  verbose: process.argv.includes('--verbose')
};

// Cores para output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Funções de log
function log(message, color = colors.cyan) {
  console.log(`${color}[INFO]${colors.reset} ${message}`);
}

function success(message) {
  console.log(`${colors.green}[SUCCESS]${colors.reset} ${message}`);
}

function warning(message) {
  console.log(`${colors.yellow}[WARNING]${colors.reset} ${message}`);
}

function error(message) {
  console.log(`${colors.red}[ERROR]${colors.reset} ${message}`);
}

// Função para executar comandos
function runCommand(command, options = {}) {
  try {
    if (CONFIG.verbose) {
      log(`Executando: ${command}`);
    }
    const result = execSync(command, {
      stdio: CONFIG.verbose ? 'inherit' : 'pipe',
      encoding: 'utf8',
      ...options
    });
    return result;
  } catch (err) {
    error(`Erro ao executar comando: ${command}`);
    error(err.message);
    process.exit(1);
  }
}

// Verificar se comando existe
function commandExists(command) {
  try {
    execSync(`where ${command}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Verificar arquivo existe
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Copiar arquivo com verificação
function copyFile(source, destination) {
  try {
    if (!fileExists(source)) {
      warning(`Arquivo não encontrado: ${source}`);
      return false;
    }
    
    const destDir = path.dirname(destination);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    fs.copyFileSync(source, destination);
    success(`Copiado: ${path.basename(source)} -> ${path.relative(CONFIG.projectRoot, destination)}`);
    return true;
  } catch (err) {
    error(`Erro ao copiar ${source}: ${err.message}`);
    return false;
  }
}

// Obter tamanho do arquivo em formato legível
function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  const bytes = stats.size;
  
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Analisar tamanho do build
function analyzeBuildSize() {
  log('Analisando tamanho do build...');
  
  if (!fs.existsSync(CONFIG.distDir)) {
    error('Diretório dist não encontrado!');
    return;
  }
  
  const files = [];
  
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        scanDirectory(fullPath);
      } else {
        files.push({
          path: path.relative(CONFIG.distDir, fullPath),
          size: stats.size,
          sizeFormatted: getFileSize(fullPath)
        });
      }
    }
  }
  
  scanDirectory(CONFIG.distDir);
  
  // Ordenar por tamanho
  files.sort((a, b) => b.size - a.size);
  
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  
  success(`Build analisado: ${files.length} arquivos, tamanho total: ${getFileSize(path.join(CONFIG.distDir, 'temp'))}`);
  
  // Mostrar arquivos grandes
  const largeFiles = files.filter(file => file.size > 500 * 1024); // > 500KB
  if (largeFiles.length > 0) {
    warning('Arquivos grandes encontrados:');
    largeFiles.slice(0, 10).forEach(file => {
      console.log(`  - ${file.path}: ${file.sizeFormatted}`);
    });
  }
  
  // Aviso se build muito grande
  if (totalSize > 25 * 1024 * 1024) { // > 25MB
    warning('Build muito grande! Considere otimizar os assets.');
  }
  
  return { files, totalSize };
}

// Gerar relatório
function generateReport(buildInfo) {
  const reportPath = path.join(CONFIG.distDir, 'build-report.txt');
  const timestamp = new Date().toLocaleString('pt-BR');
  
  let report = `DialogaMente - Relatório de Build
=====================================
Data/Hora: ${timestamp}
Diretório: ${CONFIG.projectRoot}

CONFIGURAÇÃO:
- Skip Lint: ${CONFIG.skipLint}
- Skip Clean: ${CONFIG.skipClean}
- Verbose: ${CONFIG.verbose}

BUILD INFO:
- Total de arquivos: ${buildInfo.files.length}
- Tamanho total: ${getFileSize(path.join(CONFIG.distDir, 'temp'))}

ARQUIVOS PRINCIPAIS:
`;

  buildInfo.files.slice(0, 20).forEach(file => {
    report += `- ${file.path}: ${file.sizeFormatted}\n`;
  });

  report += `\nARQUIVOS ESSENCIAIS COPIADOS:
- _headers (cabeçalhos de segurança)
- _redirects (redirecionamentos)
- robots.txt (SEO)
- sitemap.xml (SEO)
- manifest.json (PWA)

PRÓXIMOS PASSOS:
1. Fazer upload da pasta 'dist' para o Netlify
2. Configurar domínio personalizado (se necessário)
3. Verificar se todos os redirecionamentos funcionam
4. Testar a aplicação em produção

Build concluído com sucesso!
`;

  fs.writeFileSync(reportPath, report, 'utf8');
  success(`Relatório gerado: ${reportPath}`);
}

// Função principal
async function main() {
  console.log(`
${colors.cyan}DialogaMente - Build para Deploy Netlify${colors.reset}
${colors.cyan}==========================================${colors.reset}
`);

  try {
    // 1. Verificar ambiente
    log('Verificando ambiente...');
    
    if (!commandExists('node')) {
      error('Node.js não encontrado!');
      process.exit(1);
    }
    
    if (!commandExists('npm')) {
      error('NPM não encontrado!');
      process.exit(1);
    }
    
    const nodeVersion = runCommand('node --version').trim();
    const npmVersion = runCommand('npm --version').trim();
    
    success(`Node.js ${nodeVersion} encontrado`);
    success(`NPM ${npmVersion} encontrado`);
    
    // 2. Verificar package.json
    const packageJsonPath = path.join(CONFIG.projectRoot, 'package.json');
    if (!fileExists(packageJsonPath)) {
      error('package.json não encontrado!');
      process.exit(1);
    }
    
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    if (!packageJson.scripts || !packageJson.scripts.build) {
      error('Script "build" não encontrado no package.json!');
      process.exit(1);
    }
    
    success('Scripts necessários encontrados');
    
    // 3. Limpeza (opcional)
    if (!CONFIG.skipClean) {
      log('Limpando cache e arquivos antigos...');
      
      const itemsToClean = [
        path.join(CONFIG.projectRoot, 'node_modules'),
        path.join(CONFIG.projectRoot, 'package-lock.json'),
        CONFIG.distDir
      ];
      
      for (const item of itemsToClean) {
        if (fs.existsSync(item)) {
          log(`Removendo ${path.basename(item)}...`);
          fs.rmSync(item, { recursive: true, force: true });
        }
      }
      
      success('Limpeza concluída');
    }
    
    // 4. Instalar dependências
    log('Instalando dependências...');
    
    if (fileExists(path.join(CONFIG.projectRoot, 'package-lock.json'))) {
      runCommand('npm ci');
    } else {
      runCommand('npm install --legacy-peer-deps');
    }
    
    success('Dependências instaladas');
    
    // 5. Verificar arquivo de ambiente
    const envFile = path.join(CONFIG.projectRoot, '.env.production');
    if (fileExists(envFile)) {
      success('Arquivo .env.production encontrado');
    } else {
      warning('Arquivo .env.production não encontrado - usando variáveis padrão');
    }
    
    // 6. Linting (opcional)
    if (!CONFIG.skipLint && packageJson.scripts.lint) {
      log('Executando linting...');
      runCommand('npm run lint');
      success('Linting concluído');
    }
    
    // 7. Build
    log('Executando build de produção...');
    runCommand('npm run build');
    
    if (!fs.existsSync(CONFIG.distDir)) {
      error('Diretório dist não foi criado! Verifique o script de build.');
      process.exit(1);
    }
    
    success('Build concluído');
    
    // 8. Copiar arquivos essenciais
    log('Copiando arquivos essenciais...');
    
    const filesToCopy = [
      { src: '_headers', dest: '_headers' },
      { src: 'robots.txt', dest: 'robots.txt' },
      { src: 'sitemap.xml', dest: 'sitemap.xml' },
      { src: 'manifest.json', dest: 'manifest.json' },
      { src: '_redirects', dest: '_redirects' }
    ];
    
    let copiedFiles = 0;
    
    for (const file of filesToCopy) {
      const sourcePath = path.join(CONFIG.deployDir, file.src);
      const destPath = path.join(CONFIG.distDir, file.dest);
      
      if (copyFile(sourcePath, destPath)) {
        copiedFiles++;
      }
    }
    
    success(`${copiedFiles} arquivos essenciais copiados`);
    
    // 9. Verificar arquivos críticos
    const criticalFiles = ['index.html'];
    for (const file of criticalFiles) {
      const filePath = path.join(CONFIG.distDir, file);
      if (!fileExists(filePath)) {
        error(`Arquivo crítico não encontrado: ${file}`);
        process.exit(1);
      }
    }
    
    success('Arquivos críticos verificados');
    
    // 10. Análise do build
    const buildInfo = analyzeBuildSize();
    
    // 11. Gerar relatório
    generateReport(buildInfo);
    
    // 12. Instruções finais
    console.log(`
${colors.green}✅ BUILD CONCLUÍDO COM SUCESSO!${colors.reset}

${colors.cyan}📁 Pasta de deploy:${colors.reset} ${CONFIG.distDir}

${colors.cyan}🚀 Próximos passos para deploy no Netlify:${colors.reset}
1. Acesse https://app.netlify.com
2. Clique em "Add new site" > "Deploy manually"
3. Arraste a pasta 'dist' para a área de upload
4. Aguarde o deploy ser concluído

${colors.cyan}📋 Arquivos incluídos:${colors.reset}
- Aplicação React buildada
- Configurações de redirecionamento (_redirects)
- Cabeçalhos de segurança (_headers)
- Arquivos SEO (robots.txt, sitemap.xml)
- Manifest PWA (manifest.json)

${colors.cyan}📊 Relatório detalhado:${colors.reset} dist/build-report.txt
`);

  } catch (err) {
    error(`Erro durante o build: ${err.message}`);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (import.meta.url.startsWith('file:') && process.argv[1] && import.meta.url.includes(process.argv[1].replace(/\\/g, '/'))) {
  main().catch(console.error);
}

export { main, CONFIG };