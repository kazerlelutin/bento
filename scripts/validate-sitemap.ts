#!/usr/bin/env bun

/**
 * Validate the sitemap.xml
 * Check the consistency between the sitemap and the defined routes
 */
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { routes } from "../features/routes/routes.ts";

const CONFIG = {
  baseUrl: "https://ben-to.fr",
  sitemapPath: "public/sitemap.xml",
  robotsPath: "public/robots.txt"
};

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    totalRoutes: number;
    sitemapUrls: number;
    robotsAllowRules: number;
  };
}

/**
 * Parse the sitemap XML
 */
function parseSitemap(xmlContent: string): string[] {
  const urls: string[] = [];
  const urlRegex = /<loc>(.*?)<\/loc>/g;
  let match;

  while ((match = urlRegex.exec(xmlContent)) !== null) {
    urls.push(match[1]);
  }

  return urls;
}

/**
 * Parse the robots.txt
 */
function parseRobotsTxt(content: string): { allows: string[], disallows: string[] } {
  const allows: string[] = [];
  const disallows: string[] = [];

  const lines = content.split('\n');
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('Allow:')) {
      allows.push(trimmedLine.replace('Allow:', '').trim());
    } else if (trimmedLine.startsWith('Disallow:')) {
      disallows.push(trimmedLine.replace('Disallow:', '').trim());
    }
  }

  return { allows, disallows };
}

/**
 * Validate the sitemap
 */
function validateSitemap(): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    stats: {
      totalRoutes: routes.size,
      sitemapUrls: 0,
      robotsAllowRules: 0
    }
  };

  console.log("🔍 Validation du sitemap...\n");

  // Check the existence of the sitemap
  const sitemapPath = join(process.cwd(), CONFIG.sitemapPath);
  if (!existsSync(sitemapPath)) {
    result.errors.push(`Le fichier sitemap n'existe pas: ${CONFIG.sitemapPath}`);
    result.isValid = false;
    return result;
  }

  // Read and parse the sitemap
  const sitemapContent = readFileSync(sitemapPath, 'utf8');
  const sitemapUrls = parseSitemap(sitemapContent);
  result.stats.sitemapUrls = sitemapUrls.length;

  // Check the existence of the robots.txt
  const robotsPath = join(process.cwd(), CONFIG.robotsPath);
  if (!existsSync(robotsPath)) {
    result.warnings.push(`Le fichier robots.txt n'existe pas: ${CONFIG.robotsPath}`);
  } else {
    const robotsContent = readFileSync(robotsPath, 'utf8');
    const robotsRules = parseRobotsTxt(robotsContent);
    result.stats.robotsAllowRules = robotsRules.allows.length;

    // Check the consistency with the sitemap
    const sitemapReference = robotsContent.includes(CONFIG.baseUrl + '/sitemap.xml');
    if (!sitemapReference) {
      result.warnings.push("Le sitemap n'est pas référencé dans robots.txt");
    }
  }

  // Check that all public routes are in the sitemap
  const publicRoutes = Array.from(routes.keys()).filter(path => {
    // Exclude private routes
    return !path.startsWith('/api/') &&
      !path.startsWith('/admin/') &&
      !path.startsWith('/private/') &&
      !path.startsWith('/_');
  });

  for (const route of publicRoutes) {
    const expectedUrl = `${CONFIG.baseUrl}${route}`;
    if (!sitemapUrls.includes(expectedUrl)) {
      result.errors.push(`Route manquante dans le sitemap: ${route}`);
      result.isValid = false;
    }
  }

  // Check the orphaned URLs in the sitemap
  for (const url of sitemapUrls) {
    const path = url.replace(CONFIG.baseUrl, '');
    if (!routes.has(path) && !path.startsWith('/public/')) {
      result.warnings.push(`URL orpheline dans le sitemap: ${path}`);
    }
  }

  // Check the XML structure
  if (!sitemapContent.includes('<?xml version="1.0"')) {
    result.errors.push("Le sitemap ne contient pas la déclaration XML");
    result.isValid = false;
  }

  if (!sitemapContent.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) {
    result.errors.push("Le sitemap ne contient pas la structure urlset correcte");
    result.isValid = false;
  }

  return result;
}

/**
 * Display the validation report
 */
function displayValidationReport(result: ValidationResult): void {
  console.log("📊 Rapport de validation SEO\n");
  console.log("=".repeat(50));

  // Statistics
  console.log("📈 Statistiques:");
  console.log(`  • Routes définies: ${result.stats.totalRoutes}`);
  console.log(`  • URLs dans le sitemap: ${result.stats.sitemapUrls}`);
  console.log(`  • Règles Allow dans robots.txt: ${result.stats.robotsAllowRules}`);

  console.log("\n" + "=".repeat(50));

  // Errors
  if (result.errors.length > 0) {
    console.log("❌ Erreurs:");
    result.errors.forEach(error => console.log(`  • ${error}`));
  }

  // Warnings
  if (result.warnings.length > 0) {
    console.log("\n⚠️  Avertissements:");
    result.warnings.forEach(warning => console.log(`  • ${warning}`));
  }

  // Final result
  console.log("\n" + "=".repeat(50));
  if (result.isValid) {
    console.log("✅ Validation réussie ! Le sitemap est cohérent avec les routes.");
  } else {
    console.log("❌ Validation échouée. Veuillez corriger les erreurs ci-dessus.");
  }

  console.log("=".repeat(50));
}

/**
 * Main function
 */
function main(): void {
  try {
    console.log("🚀 Starting the SEO validation...\n");

    const result = validateSitemap();
    displayValidationReport(result);

    // Exit code
    process.exit(result.isValid ? 0 : 1);

  } catch (error) {
    console.error("❌ Erreur lors de la validation:", error);
    process.exit(1);
  }
}

// Execute the script if called directly
if (import.meta.main) {
  main();
}

export { validateSitemap, ValidationResult }; 