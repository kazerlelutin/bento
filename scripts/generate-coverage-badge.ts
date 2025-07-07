#!/usr/bin/env bun

import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';

interface CoverageData {
  total: {
    branches: { pct: number };
    functions: { pct: number };
    lines: { pct: number };
    statements: { pct: number };
  };
}

interface LCOVData {
  functions: { found: number; hit: number };
  lines: { found: number; hit: number };
  branches: { found: number; hit: number };
}

async function generateCoverageBadge(): Promise<void> {
  try {
    const lcovPath = './coverage/lcov.info';

    if (existsSync(lcovPath)) {
      console.log('📊 LCOV coverage file detected, calculating coverage...');
      const coverage = await calculateCoverageFromLCOV(lcovPath);
      await updateBadgeWithCoverage(coverage);
      return;
    }

    const coveragePath = './coverage/coverage-summary.json';

    if (existsSync(coveragePath)) {
      console.log('📊 JSON coverage file detected...');
      const coverageData: CoverageData = JSON.parse(await readFile(coveragePath, 'utf-8'));

      const totalCoverage = Math.round(
        (coverageData.total.branches.pct +
          coverageData.total.functions.pct +
          coverageData.total.lines.pct +
          coverageData.total.statements.pct) / 4
      );

      await updateBadgeWithCoverage(totalCoverage);
      return;
    }

    console.log('⚠️ No coverage file found. Generating default badge.');
    await generateDefaultBadge();

  } catch (error) {
    console.error('❌ Error generating badge:', error);
    await generateDefaultBadge();
  }
}

async function calculateCoverageFromLCOV(lcovPath: string): Promise<number> {
  const lcovContent = await readFile(lcovPath, 'utf-8');
  const records = lcovContent.split('end_of_record\n').filter(record => record.trim());

  let totalFunctions = { found: 0, hit: 0 };
  let totalLines = { found: 0, hit: 0 };
  let totalBranches = { found: 0, hit: 0 };

  for (const record of records) {
    const data = parseLCOVRecord(record);
    if (data) {
      totalFunctions.found += data.functions.found;
      totalFunctions.hit += data.functions.hit;
      totalLines.found += data.lines.found;
      totalLines.hit += data.lines.hit;
      totalBranches.found += data.branches.found;
      totalBranches.hit += data.branches.hit;
    }
  }

  const functionCoverage = totalFunctions.found > 0 ? (totalFunctions.hit / totalFunctions.found) * 100 : 0;
  const lineCoverage = totalLines.found > 0 ? (totalLines.hit / totalLines.found) * 100 : 0;
  let branchCoverage = 0;

  if (totalBranches.found > 0) {
    branchCoverage = (totalBranches.hit / totalBranches.found) * 100;
  }

  let totalCoverage: number;
  if (totalBranches.found > 0) {
    totalCoverage = Math.round(
      (lineCoverage * 0.5 + functionCoverage * 0.3 + branchCoverage * 0.2)
    );
  } else {
    totalCoverage = Math.round(
      (lineCoverage * 0.6 + functionCoverage * 0.4)
    );
  }

  console.log(`📊 Coverage calculated from LCOV:`);
  console.log(`   - Lines: ${lineCoverage.toFixed(1)}% (${totalLines.hit}/${totalLines.found})`);
  console.log(`   - Fonctions: ${functionCoverage.toFixed(1)}% (${totalFunctions.hit}/${totalFunctions.found})`);
  console.log(`   - Branches: ${branchCoverage.toFixed(1)}% (${totalBranches.hit}/${totalBranches.found})`);
  console.log(`   - Total: ${totalCoverage}%`);

  return totalCoverage;
}

function parseLCOVRecord(record: string): LCOVData | null {
  const lines = record.split('\n');
  let functions = { found: 0, hit: 0 };
  let lines_data = { found: 0, hit: 0 };
  let branches = { found: 0, hit: 0 };

  for (const line of lines) {
    if (line.startsWith('FNF:')) {
      functions.found = parseInt(line.substring(4));
    } else if (line.startsWith('FNH:')) {
      functions.hit = parseInt(line.substring(4));
    } else if (line.startsWith('LF:')) {
      lines_data.found = parseInt(line.substring(3));
    } else if (line.startsWith('LH:')) {
      lines_data.hit = parseInt(line.substring(3));
    } else if (line.startsWith('BRF:')) {
      branches.found = parseInt(line.substring(4));
    } else if (line.startsWith('BRH:')) {
      branches.hit = parseInt(line.substring(4));
    }
  }

  if (lines_data.found === 0) {
    return null;
  }

  return { functions, lines: lines_data, branches };
}

async function updateBadgeWithCoverage(coverage: number): Promise<void> {
  const color = getCoverageColor(coverage);
  const badgeUrl = `https://img.shields.io/badge/Coverage-${coverage}%25-${color}?style=for-the-badge`;

  await updateReadmeBadge(badgeUrl);
  console.log(`✅ Coverage badge updated: ${coverage}%`);
}

function getCoverageColor(coverage: number): string {
  if (coverage >= 90) return 'brightgreen';
  if (coverage >= 80) return 'green';
  if (coverage >= 70) return 'yellowgreen';
  if (coverage >= 60) return 'yellow';
  if (coverage >= 50) return 'orange';
  return 'red';
}

async function updateReadmeBadge(badgeUrl: string): Promise<void> {
  const readmePath = './README.md';
  const readmeContent = await readFile(readmePath, 'utf-8');

  const updatedContent = readmeContent.replace(
    /\[!\[Coverage\].*?\]\(.*?\)/g,
    `[![Coverage](${badgeUrl})](https://github.com/kazerlelutin/bento)`
  );

  await writeFile(readmePath, updatedContent, 'utf-8');
}

async function generateDefaultBadge(): Promise<void> {
  const defaultBadgeUrl = 'https://img.shields.io/badge/Coverage-0%25-red?style=for-the-badge';
  await updateReadmeBadge(defaultBadgeUrl);
}

async function generateManualBadge(): Promise<void> {
  const coverage = process.argv[2] ? parseInt(process.argv[2]) : 80;

  if (isNaN(coverage) || coverage < 0 || coverage > 100) {
    console.error('❌ Coverage must be a number between 0 and 100');
    process.exit(1);
  }

  await updateBadgeWithCoverage(coverage);
  console.log(`✅ Coverage badge updated manually: ${coverage}%`);
}

if (import.meta.main) {
  if (process.argv[2]) {
    generateManualBadge().catch(console.error);
  } else {
    generateCoverageBadge().catch(console.error);
  }
} 