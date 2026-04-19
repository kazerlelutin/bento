/**
 * Génère pwa-192.png et pwa-512.png à partir de l’icône onigiri (variante 2).
 */
import { existsSync } from "fs";
import { join } from "path";

const SRC = join(process.cwd(), "public", "icons", "icon128-2.png");
const OUT192 = join(process.cwd(), "public", "icons", "pwa-192.png");
const OUT512 = join(process.cwd(), "public", "icons", "pwa-512.png");

export async function generatePwaIcons(): Promise<void> {
  if (!existsSync(SRC)) {
    console.warn("⚠️ generate-pwa-icons: icon128-2.png introuvable, ignoré.");
    return;
  }
  const sharp = (await import("sharp")).default;
  await sharp(SRC).resize(192, 192).png().toFile(OUT192);
  await sharp(SRC).resize(512, 512).png().toFile(OUT512);
  console.log("✅ Generated public/icons/pwa-192.png, pwa-512.png");
}
