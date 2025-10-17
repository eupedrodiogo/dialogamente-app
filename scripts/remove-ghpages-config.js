#!/usr/bin/env node

/**
 * Script para remover configurações específicas do GitHub Pages
 * Use antes de migrar para outra plataforma
 */

const fs = require('fs');
const path = require('path');

console.log('🔄 Removendo configurações do GitHub Pages...\n');

// 1. Atualizar vite.config.ts
const viteConfigPath = path.join(__dirname, '..', 'vite.config.ts');
let viteConfig = fs.readFileSync(viteConfigPath, 'utf8');

if (viteConfig.includes("base: '/comunicapro/'")) {
  viteConfig = viteConfig.replace("base: '/comunicapro/',", "base: '/',");
  fs.writeFileSync(viteConfigPath, viteConfig);
  console.log('✅ vite.config.ts atualizado (base path removido)');
} else {
  console.log('ℹ️  vite.config.ts já está configurado corretamente');
}

// 2. Atualizar package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

if (packageJson.homepage) {
  delete packageJson.homepage;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log('✅ package.json atualizado (homepage removido)');
} else {
  console.log('ℹ️  package.json já está configurado corretamente');
}

console.log('\n✨ Configurações do GitHub Pages removidas com sucesso!');
console.log('\n📝 Próximos passos:');
console.log('1. Execute: npm run build');
console.log('2. Teste localmente: npm run preview');
console.log('3. Commit as mudanças: git add . && git commit -m "Remove GitHub Pages config"');
console.log('4. Push para o GitHub: git push origin main');
console.log('5. Configure o deploy na nova plataforma\n');

