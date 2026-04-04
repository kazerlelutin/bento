import { cp, copyFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

async function copyStaticFiles() {
  const staticFiles = ["robots.txt", "sitemap.xml", "favicon.ico"];

  for (const file of staticFiles) {
    try {
      await copyFile(join(process.cwd(), "public", file), join(process.cwd(), "dist", file));
      console.log(`✅ Copied ${file} to dist/`);
    } catch (error) {
      console.warn(`⚠️ Could not copy ${file}:`, error);
    }
  }

  const pub = join(process.cwd(), "public");
  const distPub = join(process.cwd(), "dist", "public");
  try {
    await mkdir(join(process.cwd(), "dist"), { recursive: true });
    await cp(pub, distPub, { recursive: true, force: true });
    console.log("✅ Copied public/ → dist/public/");
  } catch (error) {
    console.warn("⚠️ Could not copy public/:", error);
  }
}

copyStaticFiles().catch(console.error);
