import { defineConfig } from 'vite';
import { resolve, join, relative } from 'path';
import fs from 'fs';

// Helper function to recursively find all HTML files in workspace
function getHtmlEntries(dir, baseDir = dir) {
  let entries = {};
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name === 'node_modules' || item.name === 'dist' || item.name === '.git' || item.name === '.agents') continue;
      Object.assign(entries, getHtmlEntries(fullPath, baseDir));
    } else if (item.isFile() && item.name.endsWith('.html')) {
      const relPath = relative(baseDir, fullPath).replace(/\\/g, '/');
      const key = relPath.replace(/\.html$/, '').replace(/[\/]/g, '_');
      entries[key] = fullPath;
    }
  }
  return entries;
}

export default defineConfig({
  build: {
    reportCompressedSize: false,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      input: getHtmlEntries(__dirname)
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
