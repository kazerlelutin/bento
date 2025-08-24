import { copyFile, mkdir } from 'fs/promises';
import { join } from 'path';

async function copyStaticFiles() {
  const staticFiles = [
    'robots.txt',
    'sitemap.xml',
    'favicon.ico'
  ];

  for (const file of staticFiles) {
    try {
      await copyFile(
        join(process.cwd(), 'public', file),
        join(process.cwd(), 'dist', file)
      );
      console.log(`✅ Copied ${file} to dist/`);
    } catch (error) {
      console.warn(`⚠️ Could not copy ${file}:`, error);
    }
  }
}

copyStaticFiles().catch(console.error);
