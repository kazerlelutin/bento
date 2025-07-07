#!/usr/bin/env bun

import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

interface FeatureStep {
  type: 'given' | 'when' | 'then' | 'and' | 'but';
  description: string;
}

interface Scenario {
  name: string;
  steps: FeatureStep[];
  tags?: string[];
}

interface Feature {
  name: string;
  description: string;
  scenarios: Scenario[];
  background?: FeatureStep[];
  tags?: string[];
  filePath: string;
}

class FeatureDocumentationGenerator {
  private features: Feature[] = [];

  async generateDocumentation(): Promise<void> {
    console.log('🔍 Searching for .feature files...');

    const featureFiles = await this.findFeatureFiles('./features');

    console.log(`📁 Found ${featureFiles.length} .feature file(s)`);

    for (const filePath of featureFiles) {
      const feature = await this.parseFeatureFile(filePath);
      if (feature) {
        this.features.push(feature);
      }
    }

    const markdown = this.generateMarkdown();

    await mkdir('./docs', { recursive: true });

    await writeFile('./docs/feature-documentation.md', markdown, 'utf-8');

    console.log('✅ Documentation generated in docs/feature-documentation.md');
  }

  private async findFeatureFiles(dir: string): Promise<string[]> {
    const files: string[] = [];

    try {
      const entries = await readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = join(dir, entry.name);

        if (entry.isDirectory()) {
          const subFiles = await this.findFeatureFiles(fullPath);
          files.push(...subFiles);
        } else if (entry.name.endsWith('.feature')) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.warn(`⚠️ Cannot access folder ${dir}:`, error);
    }

    return files;
  }

  private async parseFeatureFile(filePath: string): Promise<Feature | null> {
    try {
      const content = await readFile(filePath, 'utf-8');
      const lines = content.split('\n').map(line => line.trim());

      let currentFeature: Partial<Feature> = {
        filePath,
        scenarios: [],
        background: []
      };

      let currentScenario: Partial<Scenario> | null = null;
      let inBackground = false;

      for (const line of lines) {
        if (line.startsWith('Feature:')) {
          currentFeature.name = line.replace('Feature:', '').trim();
        } else if (line.startsWith('Background:')) {
          inBackground = true;
          currentScenario = null;
        } else if (line.startsWith('Scenario:')) {
          inBackground = false;
          if (currentScenario) {
            currentFeature.scenarios!.push(currentScenario as Scenario);
          }
          currentScenario = {
            name: line.replace('Scenario:', '').trim(),
            steps: []
          };
        } else if (line.startsWith('Given ') || line.startsWith('When ') ||
          line.startsWith('Then ') || line.startsWith('And ') ||
          line.startsWith('But ')) {
          const step = this.parseStep(line);
          if (inBackground) {
            currentFeature.background!.push(step);
          } else if (currentScenario) {
            currentScenario.steps!.push(step);
          }
        } else if (line && !line.startsWith('#') && !line.startsWith('@')) {
          if (!currentFeature.description) {
            currentFeature.description = line;
          }
        }
      }

      if (currentScenario) {
        currentFeature.scenarios!.push(currentScenario as Scenario);
      }

      return currentFeature as Feature;
    } catch (error) {
      console.error(`❌ Error parsing ${filePath}:`, error);
      return null;
    }
  }

  private parseStep(line: string): FeatureStep {
    const stepPatterns = {
      'Given ': { type: 'given' as const, offset: 6 },
      'When ': { type: 'when' as const, offset: 5 },
      'Then ': { type: 'then' as const, offset: 5 },
      'And ': { type: 'and' as const, offset: 4 },
      'But ': { type: 'but' as const, offset: 4 }
    };

    for (const [pattern, config] of Object.entries(stepPatterns)) {
      if (line.startsWith(pattern)) {
        return {
          type: config.type,
          description: line.substring(config.offset)
        };
      }
    }

    return { type: 'given', description: line };
  }

  private generateMarkdown(): string {
    let markdown = `# 📋 Cucumber Features Documentation\n\n> Documentation automatically generated from \`.feature\` files\n\n## 📑 Table of Contents\n\n`;

    this.features.forEach((feature, index) => {

      const featureName = feature.name || 'Unnamed Feature';
      const featureId = this.generateId(feature.name);
      markdown += `${index + 1}. [${featureName}](#${featureId})<br/>\n`;

      feature.scenarios.forEach((scenario, scenarioIndex) => {
        const scenarioId = this.generateId(`${featureName}-${scenario.name}`);
        markdown += `   ${index + 1}.${scenarioIndex + 1}. [${scenario.name}](#${scenarioId})<br/>\n`;
      });
    });

    markdown += `\n\n---\n\n`;

    this.features.forEach((feature, index) => {
      const featureName = feature.name || 'Unnamed Feature';
      const featureId = this.generateId(feature.name);

      markdown += `## ${index + 1}. ${featureName} {#${featureId}}\n\n`;

      if (feature.description) {
        markdown += `> ${feature.description}\n\n`;
      }

      markdown += `**File:** \`${feature.filePath}\`\n\n`;

      if (feature.background && feature.background.length > 0) {
        markdown += `### 🔧 Background\n\n`;
        feature.background.forEach(step => {
          markdown += `- **${step.type.toUpperCase()}** ${step.description}\n`;
        });
        markdown += `\n\n`;
      }

      markdown += `### 🎯 Scenarios\n\n`;

      feature.scenarios.forEach((scenario, scenarioIndex) => {
        const scenarioId = this.generateId(`${featureName}-${scenario.name}`);

        markdown += `#### ${index + 1}.${scenarioIndex + 1}. ${scenario.name} {#${scenarioId}}\n\n`;

        scenario.steps.forEach(step => {
          const stepIcon = this.getStepIcon(step.type);
          markdown += `${stepIcon} **${step.type.toUpperCase()}** ${step.description}<br>\n`;
        });

        markdown += `\n`;
      });

      markdown += `\n\n---\n\n`;
    });

    const totalScenarios = this.features.reduce((sum, f) => sum + f.scenarios.length, 0);
    const totalSteps = this.features.reduce((sum, f) => {
      return sum + f.scenarios.reduce((sSum, s) => sSum + s.steps.length, 0);
    }, 0);

    markdown += `## 📊 Statistics\n\n- **Features:** ${this.features.length}\n- **Scenarios:** ${totalScenarios}\n- **Steps:** ${totalSteps}\n\n---\n\n*Documentation generated on ${new Date().toLocaleDateString('en-GB')} at ${new Date().toLocaleTimeString('en-GB')}*\n\n`;

    return markdown;
  }

  private generateId(text: string): string {
    if (!text || text.trim() === '') {
      return 'unnamed-feature';
    }
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  private getStepIcon(type: FeatureStep['type']): string {
    const icons = {
      given: '🔧',
      when: '🎯',
      then: '✅',
      and: '➕',
      but: '❌'
    };
    return icons[type];
  }
}

async function main() {
  const generator = new FeatureDocumentationGenerator();
  await generator.generateDocumentation();
}

main().catch(console.error); 