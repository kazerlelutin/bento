#!/usr/bin/env bun
import { routes } from "../features/routes/routes.ts";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const CONFIG = {
  baseUrl: process.env.BASE_URL || "https://ben-to.fr",
  outputPath: "public/sitemap.xml",
  defaultPriority: 0.8,
  defaultChangeFreq: "weekly",
  priorities: {
    "/": 1.0,
    "/about": 0.8,
    "/contact": 0.7,
    "/blog": 0.6,
    "/api": 0.1,
  },
  changeFreqs: {
    "/": "weekly",
    "/about": "monthly",
    "/blog": "daily",
    "/api": "never",
  }
};

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

interface SitemapConfig {
  baseUrl: string;
  urls: SitemapUrl[];
}

/**
 * Get the current date in ISO format
 */
function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Determine the priority of a route
 */
function getPriority(path: string): number {
  return CONFIG.priorities[path as keyof typeof CONFIG.priorities] || CONFIG.defaultPriority;
}

/**   
 * Determine the change frequency of a route
 */
function getChangeFreq(path: string): string {
  return CONFIG.changeFreqs[path as keyof typeof CONFIG.changeFreqs] || CONFIG.defaultChangeFreq;
}

/**
 * Check if a route should be included in the sitemap
 */
function shouldIncludeRoute(path: string): boolean {
  const excludedPatterns = [
    /^\/api\//,
    /^\/admin\//,
    /^\/private\//,
    /^\/_/,
    /\.(json|xml|txt)$/
  ];

  return !excludedPatterns.some(pattern => pattern.test(path));
}

/**
 * Generate the XML content of the sitemap
 */
function generateSitemapXml(config: SitemapConfig): string {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetClose = '</urlset>';

  const urls = config.urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('');

  return `${xmlHeader}
${urlsetOpen}${urls}
${urlsetClose}`;
}

/**
 * Generate the sitemap from the routes
 */
function generateSitemap(): void {
  console.log("🌐 Generating the sitemap.xml...");

  const urls: SitemapUrl[] = [];
  const currentDate = getCurrentDate();

  for (const [path] of routes) {
    if (!shouldIncludeRoute(path)) {
      console.log(`⏭️  Route excluded: ${path}`);
      continue;
    }

    const fullUrl = `${CONFIG.baseUrl}${path}`;
    const priority = getPriority(path);
    const changefreq = getChangeFreq(path);

    urls.push({
      loc: fullUrl,
      lastmod: currentDate,
      changefreq,
      priority
    });

    console.log(`✅ Route added: ${path} (priority: ${priority}, frequency: ${changefreq})`);
  }

  urls.sort((a, b) => b.priority - a.priority);

  const sitemapConfig: SitemapConfig = {
    baseUrl: CONFIG.baseUrl,
    urls
  };

  const sitemapXml = generateSitemapXml(sitemapConfig);

  const publicDir = join(process.cwd(), "public");
  if (!existsSync(publicDir)) {
    mkdirSync(publicDir, { recursive: true });
  }

  const outputPath = join(process.cwd(), CONFIG.outputPath);
  writeFileSync(outputPath, sitemapXml, 'utf8');

  console.log(`\n🎉 Sitemap generated successfully!`);
  console.log(`📁 File: ${CONFIG.outputPath}`);
  console.log(`🔗 URLs included: ${urls.length}`);
  console.log(`🌍 Base URL: ${CONFIG.baseUrl}`);

  console.log("\n📊 Summary of routes:");
  urls.forEach(url => {
    const path = url.loc.replace(CONFIG.baseUrl, '');
    console.log(`  ${path} - Priority: ${url.priority}, Frequency: ${url.changefreq}`);
  });

  generateRobotsTxt();
}

/**
 * Generate an updated robots.txt
 */
function generateRobotsTxt(): void {
  console.log("\n🤖 Updating robots.txt...");

  const robotsContent = `# BENTO - Robots.txt
  # File
User-agent: *
Allow: /

# Allow indexing of main pages
${Array.from(routes.keys()).map(path => `Allow: ${path}`).join('\n')}

# Allow indexing of CSS and JS resources
Allow: /public/style.css
Allow: /public/theme.js
Allow: /app.ts

# Prevent indexing of development and test files
Disallow: /node_modules/
Disallow: /coverage/
Disallow: /reports-integration/
Disallow: /features/
Disallow: /utils/tests/
Disallow: /scripts/
Disallow: /docs/
Disallow: /bun.lock
Disallow: /pnpm-lock.yaml
Disallow: /package.json
Disallow: /bunfig.toml
Disallow: /cucumber.json
Disallow: /Dockerfile
Disallow: /README.md
Disallow: /CONTRIBUTING.md
Disallow: /matcher.d.ts
Disallow: /preload.ts

# Prevent indexing of temporary and cache files
Disallow: /.*\\.tmp$
Disallow: /.*\\.cache$
Disallow: /.*\\.log$

# Sitemap
Sitemap: ${CONFIG.baseUrl}/sitemap.xml
# Recommended crawl delay (in seconds)
Crawl-delay: 1

# Site information
# BENTO - Pixel art creation and sharing platform
# Last update: ${new Date().toLocaleDateString('fr-FR')}
`;

  const robotsPath = join(process.cwd(), "public/robots.txt");
  writeFileSync(robotsPath, robotsContent, 'utf8');

  console.log(`✅ robots.txt updated: public/robots.txt`);
}

/**
 * Main function
 */
function main(): void {
  try {
    console.log("🚀 Starting the sitemap generation...\n");

    generateSitemap();

    console.log("\n✨ Generation completed successfully!");
    console.log("💡 Don't forget to:");
    console.log("   - Check that the URLs are correct");
    console.log("   - Submit the sitemap to Google Search Console");
    console.log("   - Test the accessibility of the pages");

  } catch (error) {
    console.error("❌ Error during the sitemap generation:", error);
    process.exit(1);
  }
}

// Execute the script if called directly
if (import.meta.main) {
  main();
}

export { generateSitemap, generateRobotsTxt }; 