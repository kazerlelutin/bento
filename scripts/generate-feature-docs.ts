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
    console.log('🔍 Recherche des fichiers .feature...');


    const featureFiles = await this.findFeatureFiles('./features');

    console.log(`📁 Trouvé ${featureFiles.length} fichier(s) .feature`);

    for (const filePath of featureFiles) {
      const feature = await this.parseFeatureFile(filePath);
      if (feature) {
        this.features.push(feature);
      }
    }

    const markdown = this.generateMarkdown();

    await mkdir('./docs', { recursive: true });

    await writeFile('./docs/feature-documentation.md', markdown, 'utf-8');

    console.log('✅ Documentation générée dans docs/feature-documentation.md');
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
      console.warn(`⚠️ Impossible d'accéder au dossier ${dir}:`, error);
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
          // Description de la feature
          if (!currentFeature.description) {
            currentFeature.description = line;
          }
        }
      }

      if (currentScenario)
        currentFeature.scenarios!.push(currentScenario as Scenario);


      return currentFeature as Feature;
    } catch (error) {
      console.error(`❌ Erreur lors du parsing de ${filePath}:`, error);
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

    // Fallback par défaut
    return { type: 'given', description: line };
  }

  private generateMarkdown(): string {
    let markdown = `# 📋 Documentation des Features

> Documentation générée automatiquement à partir des fichiers \`.feature\`

## 📑 Table des matières

`;

    this.features.forEach((feature, index) => {
      const featureId = this.generateId(feature.name);
      markdown += `${index + 1}. [${feature.name}](#${featureId})\n<br>`;

      feature.scenarios.forEach((scenario, scenarioIndex) => {
        const scenarioId = this.generateId(`${feature.name}-${scenario.name}`);
        markdown += `   ${index + 1}.${scenarioIndex + 1}. [${scenario.name}](#${scenarioId})\n<br>`;
      });
    });

    markdown += `\n\n---\n\n`;

    this.features.forEach((feature, index) => {
      const featureId = this.generateId(feature.name);

      markdown += `## ${index + 1}. ${feature.name} {#${featureId}}\n\n`;

      if (feature.description) {
        markdown += `> ${feature.description}\n\n`;
      }

      markdown += `**Fichier:** \`${feature.filePath}\`\n\n`;

      // Background
      if (feature.background && feature.background.length > 0) {
        markdown += `### 🔧 Background\n\n`;
        feature.background.forEach(step => {
          markdown += `- **${step.type.toUpperCase()}** ${step.description}\n<br>`;
        });
        markdown += `\n`;
      }

      // Scenarios
      markdown += `### 🎯 Scenarios\n\n`;

      feature.scenarios.forEach((scenario, scenarioIndex) => {
        const scenarioId = this.generateId(`${feature.name}-${scenario.name}`);

        markdown += `#### ${index + 1}.${scenarioIndex + 1}. ${scenario.name} {#${scenarioId}}\n\n`;

        scenario.steps.forEach(step => {
          const stepIcon = this.getStepIcon(step.type);
          markdown += `${stepIcon} **${step.type.toUpperCase()}** ${step.description}\n<br>`;
        });

        markdown += `\n`;
      });

      markdown += `\n\n---\n\n`;
    });

    // Ajoute des statistiques
    const totalScenarios = this.features.reduce((sum, f) => sum + f.scenarios.length, 0);
    const totalSteps = this.features.reduce((sum, f) => {
      return sum + f.scenarios.reduce((sSum, s) => sSum + s.steps.length, 0);
    }, 0);

    markdown += `## 📊 Statistiques

- **Features:** ${this.features.length}
- **Scenarios:** ${totalScenarios}
- **Steps:** ${totalSteps}

---

*Documentation générée le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}*

`;

    return markdown;
  }

  private generateId(text: string): string {
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

// Exécution du script
async function main() {
  const generator = new FeatureDocumentationGenerator();
  await generator.generateDocumentation();
}

main().catch(console.error); 