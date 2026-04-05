#!/usr/bin/env bun
/**
 * Sert dist/ (HTML SSG + bundles) et public/ (assets statiques).
 */
import { join } from "path";
import { existsSync, statSync } from "fs";

const PORT = Number(process.env.PORT ?? 3000);
const DIST = join(process.cwd(), "dist");
const PUBLIC = join(process.cwd(), "public");

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".webmanifest": "application/manifest+json",
};

function safeIsFile(p: string): boolean {
  try {
    return statSync(p).isFile();
  } catch {
    return false;
  }
}

function mimeFor(path: string): string {
  const i = path.lastIndexOf(".");
  const ext = i >= 0 ? path.slice(i) : "";
  return MIME[ext] ?? "application/octet-stream";
}

function readPublicOrDist(urlPath: string): string | null {
  const rel = urlPath.replace(/^\//, "");
  if (rel.startsWith("public/")) {
    const sub = rel.slice("public/".length);
    const pub = join(PUBLIC, sub);
    if (existsSync(pub)) return pub;
  }
  const atPublicRoot = join(PUBLIC, rel);
  if (existsSync(atPublicRoot)) return atPublicRoot;
  const d = join(DIST, rel);
  if (existsSync(d)) return d;
  return null;
}

/** Résout une URL document vers un fichier HTML SSG. */
function htmlFileForPathname(pathname: string): string | null {
  const p = pathname.replace(/\/$/, "") || "/";
  const parts = p.split("/").filter(Boolean);

  if (parts.length === 0) {
    return join(DIST, "fr", "index.html");
  }

  const lang = parts[0];
  if (!["fr", "en", "ko", "ch"].includes(lang)) {
    return null;
  }

  if (parts.length === 1) {
    return join(DIST, lang, "index.html");
  }

  if (parts[1] === "recipes" && parts.length === 2) {
    return join(DIST, lang, "recipes", "index.html");
  }

  if (parts[1] === "recipes" && parts.length === 3) {
    const slug = decodeURIComponent(parts[2]!);
    const safe = slug.replace(/[^a-zA-Z0-9._-]/g, "_");
    const f = join(DIST, lang, "recipes", `${safe}.html`);
    return existsSync(f) ? f : null;
  }

  if (parts[1] === "about" && parts.length === 2) {
    return join(DIST, lang, "about", "index.html");
  }

  return null;
}

/**
 * Shell SPA pour URLs `/{lang}/…` sans fichier HTML dédié (404 HTTP + hydrate client).
 * Exclut les chemins sous `/{lang}/public/…`.
 */
function spaIndexForLocalized404(pathname: string): string | null {
  const p = pathname.replace(/\/$/, "") || "/";
  const parts = p.split("/").filter(Boolean);
  if (parts.length < 2) return null;
  const lang = parts[0];
  if (!["fr", "en", "ko", "ch"].includes(lang)) return null;
  if (parts[1] === "public") return null;
  const index = join(DIST, lang, "index.html");
  return existsSync(index) ? index : null;
}

Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = decodeURIComponent(url.pathname);

    if (pathname === "/" || pathname === "") {
      return Response.redirect(new URL("/fr", url.origin), 302);
    }

    const htmlPath = htmlFileForPathname(pathname);
    if (htmlPath && existsSync(htmlPath)) {
      return new Response(Bun.file(htmlPath), { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }

    const spa404 = spaIndexForLocalized404(pathname);
    if (spa404) {
      return new Response(Bun.file(spa404), {
        status: 404,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    const staticTry = readPublicOrDist(pathname);
    if (staticTry && safeIsFile(staticTry)) {
      return new Response(Bun.file(staticTry), { headers: { "Content-Type": mimeFor(staticTry) } });
    }

    const distTry = join(DIST, pathname.replace(/^\//, ""));
    if (existsSync(distTry) && safeIsFile(distTry)) {
      return new Response(Bun.file(distTry), { headers: { "Content-Type": mimeFor(distTry) } });
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Bento → http://localhost:${PORT}`);
