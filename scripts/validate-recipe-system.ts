#!/usr/bin/env bun

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

interface ValidationError {
  type: 'error' | 'warning';
  message: string;
  file?: string;
  line?: number;
}

interface ValidationResult {
  errors: ValidationError[];
  warnings: ValidationError[];
  summary: {
    totalFiles: number;
    totalErrors: number;
    totalWarnings: number;
  };
}

class RecipeSystemValidator {
  private errors: ValidationError[] = [];
  private warnings: ValidationError[] = [];
  private ingredients = new Map<string, any>();
  private steps = new Map<string, any>();
  private bases = new Map<string, any>();
  private variants = new Map<string, any>();

  async validate(): Promise<ValidationResult> {
    console.log('🔍 Validating recipe system...');

    // Charger toutes les données
    await this.loadIngredients();
    await this.loadSteps();
    await this.loadBases();
    await this.loadVariants();

    // Valider les références
    this.validateIngredientReferences();
    this.validateStepReferences();
    this.validateSubstituteExclusions();
    this.validateTextTransformations();
    this.validateOrdering();
    await this.validateIconMappings();

    const summary = {
      totalFiles: this.ingredients.size + this.steps.size + this.bases.size + this.variants.size,
      totalErrors: this.errors.length,
      totalWarnings: this.warnings.length
    };

    return { errors: this.errors, warnings: this.warnings, summary };
  }

  private async loadIngredients(): Promise<void> {
    try {
      const ingredientsDir = './features/recipe/ingredients';
      const files = await readdir(ingredientsDir);

      for (const file of files) {
        if (file.endsWith('.json')) {
          const content = await readFile(join(ingredientsDir, file), 'utf-8');
          const ingredient = JSON.parse(content);
          this.ingredients.set(ingredient.id, ingredient);
        }
      }
    } catch (error) {
      this.addError('Failed to load ingredients', 'ingredients');
    }
  }

  private async loadSteps(): Promise<void> {
    try {
      const stepsDir = './features/recipe/steps';
      const files = await readdir(stepsDir);

      for (const file of files) {
        if (file.endsWith('.json')) {
          const content = await readFile(join(stepsDir, file), 'utf-8');
          const step = JSON.parse(content);
          this.steps.set(step.id, step);
        }
      }
    } catch (error) {
      this.addError('Failed to load steps', 'steps');
    }
  }

  private async loadBases(): Promise<void> {
    try {
      const basesDir = './features/recipe/bases';
      const files = await readdir(basesDir);

      for (const file of files) {
        if (file.endsWith('.json')) {
          const content = await readFile(join(basesDir, file), 'utf-8');
          const base = JSON.parse(content);
          this.bases.set(base.id, base);
        }
      }
    } catch (error) {
      this.addError('Failed to load bases', 'bases');
    }
  }

  private async loadVariants(): Promise<void> {
    try {
      const variantsDir = './features/recipe/variants';
      const files = await readdir(variantsDir);

      for (const file of files) {
        if (file.endsWith('.json')) {
          const content = await readFile(join(variantsDir, file), 'utf-8');
          const variant = JSON.parse(content);
          this.variants.set(variant.id, variant);
        }
      }
    } catch (error) {
      this.addError('Failed to load variants', 'variants');
    }
  }

  private validateIngredientReferences(): void {
    console.log('🔍 Validating ingredient references...');

    // Vérifier les références dans les bases
    for (const [baseId, base] of this.bases) {
      for (const ingredient of base.ingredients as any[]) {
        if (!this.ingredients.has(ingredient.id)) {
          this.addError(`Base ${baseId} references unknown ingredient: ${ingredient.id}`, `bases/${baseId}.json`);
        }

        // Vérifier les substituts
        if (ingredient.substitutes) {
          for (const substitute of ingredient.substitutes as string[]) {
            if (!this.ingredients.has(substitute)) {
              this.addError(`Base ${baseId} references unknown substitute: ${substitute} for ${ingredient.id}`, `bases/${baseId}.json`);
            }
          }
        }

        // Vérifier les ennemis
        if (ingredient.foe) {
          for (const foe of ingredient.foe as string[]) {
            if (!this.ingredients.has(foe)) {
              this.addError(`Base ${baseId} references unknown foe: ${foe} for ${ingredient.id}`, `bases/${baseId}.json`);
            }
          }
        }
      }
    }

    // Vérifier les références dans les variants
    for (const [variantId, variant] of this.variants) {
      for (const ingredient of variant.ingredients as any[]) {
        if (!this.ingredients.has(ingredient.id)) {
          this.addError(`Variant ${variantId} references unknown ingredient: ${ingredient.id}`, `variants/${variantId}.json`);
        }
      }
    }
  }

  private validateStepReferences(): void {
    console.log('🔍 Validating step references...');

    // Vérifier les références dans les bases
    for (const [baseId, base] of this.bases) {
      for (const step of base.steps) {
        if (!this.steps.has(step.id)) {
          this.addError(`Base ${baseId} references unknown step: ${step.id}`, `bases/${baseId}.json`);
        }

        // Vérifier les ingrédients référencés dans les étapes
        if (step.ingredients) {
          for (const ingredientId of step.ingredients as string[]) {
            const cleanId = ingredientId.startsWith('!') ? ingredientId.slice(1) : ingredientId;
            if (!this.ingredients.has(cleanId)) {
              this.addError(`Base ${baseId} step ${step.id} references unknown ingredient: ${cleanId}`, `bases/${baseId}.json`);
            }
          }
        }
      }
    }

    // Vérifier les références dans les variants
    for (const [variantId, variant] of this.variants) {
      for (const step of variant.steps) {
        if (!this.steps.has(step.id)) {
          this.addError(`Variant ${variantId} references unknown step: ${step.id}`, `variants/${variantId}.json`);
        }

        // Vérifier les ingrédients référencés dans les étapes
        if (step.ingredients) {
          for (const ingredientId of step.ingredients as string[]) {
            const cleanId = ingredientId.startsWith('!') ? ingredientId.slice(1) : ingredientId;
            if (!this.ingredients.has(cleanId)) {
              this.addError(`Variant ${variantId} step ${step.id} references unknown ingredient: ${cleanId}`, `variants/${variantId}.json`);
            }
          }
        }
      }
    }
  }

  private validateSubstituteExclusions(): void {
    console.log('🔍 Validating substitute exclusions...');

    for (const [baseId, base] of this.bases) {
      for (const step of base.steps as any[]) {
        if (step.ingredients) {
          const exclusions = step.ingredients.filter((id: string) => id.startsWith('!'));

          for (const exclusion of exclusions) {
            const excludedId = exclusion.slice(1);

            // Vérifier que l'ingrédient exclu existe
            if (!this.ingredients.has(excludedId)) {
              this.addError(`Base ${baseId} step ${step.id} excludes unknown ingredient: ${excludedId}`, `bases/${baseId}.json`);
              continue;
            }

            // Vérifier que l'ingrédient exclu est bien un substitut d'un ingrédient de l'étape
            const stepIngredients = step.ingredients.filter((id: string) => !id.startsWith('!'));
            let isSubstitute = false;

            for (const ingredientId of stepIngredients) {
              const ingredient = this.ingredients.get(ingredientId);
              if (ingredient && ingredient.substitutes && ingredient.substitutes.includes(excludedId)) {
                isSubstitute = true;
                break;
              }
            }

            if (!isSubstitute) {
              this.addWarning(`Base ${baseId} step ${step.id} excludes ${excludedId} but it's not a substitute of any step ingredient`, `bases/${baseId}.json`);
            }
          }
        }
      }
    }
  }

  private validateTextTransformations(): void {
    console.log('🔍 Validating text transformations...');

    for (const [stepId, step] of this.steps) {
      const textFields = ['name', 'description', 'tips'];

      for (const field of textFields) {
        if (step[field]) {
          const text = step[field];

          // Vérifier les références d'ingrédients dans le texte
          const ingredientRefs = this.extractIngredientReferences(text);

          for (const ref of ingredientRefs) {
            if (!this.ingredients.has(ref)) {
              this.addError(`Step ${stepId} ${field} references unknown ingredient: ${ref}`, `steps/${stepId}.json`);
            }
          }
        }
      }
    }
  }

  private extractIngredientReferences(text: any): string[] {
    // Chercher les références d'ingrédients dans le texte
    // Format attendu: {ingredient_id} ou similaire
    if (typeof text !== 'string') return [];

    const matches = text.match(/\{([^}]+)\}/g);
    if (!matches) return [];

    return matches.map(match => match.slice(1, -1));
  }

  private validateOrdering(): void {
    console.log('🔍 Validating step ordering...');

    for (const [baseId, base] of this.bases) {
      const orders = base.steps.map((step: any) => step.order || 0);
      const uniqueOrders = new Set(orders);

      if (orders.length !== uniqueOrders.size) {
        this.addError(`Base ${baseId} has duplicate step orders`, `bases/${baseId}.json`);
      }

      // Vérifier que les orders sont cohérents
      const sortedOrders = [...orders].sort((a, b) => a - b);
      if (JSON.stringify(orders) !== JSON.stringify(sortedOrders)) {
        this.addWarning(`Base ${baseId} steps are not in order`, `bases/${baseId}.json`);
      }
    }

    for (const [variantId, variant] of this.variants) {
      const orders = variant.steps.map((step: any) => step.order || 0);
      const uniqueOrders = new Set(orders);

      if (orders.length !== uniqueOrders.size) {
        this.addError(`Variant ${variantId} has duplicate step orders`, `variants/${variantId}.json`);
      }
    }
  }

  private async validateIconMappings(): Promise<void> {
    console.log('🔍 Validating icon mappings...');

    try {
      const iconConst = await readFile('./features/icon/icon.const.ts', 'utf-8');
      const spriteMap = await readFile('./features/sprite-sheet/sprite-sheet.map.ts', 'utf-8');

      // Vérifier que tous les ingrédients ont une icône définie
      for (const [ingredientId, ingredient] of this.ingredients) {
        if (!iconConst.includes(`'${ingredientId}'`)) {
          this.addWarning(`Ingredient ${ingredientId} has no icon mapping`, `ingredients/${ingredientId}.json`);
        }
      }

      // Vérifier que toutes les bases ont un layer défini
      for (const [baseId, base] of this.bases) {
        if (!spriteMap.includes(`'${baseId}'`)) {
          this.addWarning(`Base ${baseId} has no sprite layer mapping`, `bases/${baseId}.json`);
        }
      }

    } catch (error) {
      this.addError('Failed to validate icon mappings', 'icon-mappings');
    }
  }

  private addError(message: string, file?: string): void {
    this.errors.push({ type: 'error', message, file });
  }

  private addWarning(message: string, file?: string): void {
    this.warnings.push({ type: 'warning', message, file });
  }

  printResults(result: ValidationResult): void {
    console.log('\n📊 Validation Results:');
    console.log(`📁 Total files: ${result.summary.totalFiles}`);
    console.log(`❌ Errors: ${result.summary.totalErrors}`);
    console.log(`⚠️ Warnings: ${result.summary.totalWarnings}`);

    if (result.errors.length > 0) {
      console.log('\n❌ Errors:');
      result.errors.forEach(error => {
        console.log(`  - ${error.message}${error.file ? ` (${error.file})` : ''}`);
      });
    }

    if (result.warnings.length > 0) {
      console.log('\n⚠️ Warnings:');
      result.warnings.forEach(warning => {
        console.log(`  - ${warning.message}${warning.file ? ` (${warning.file})` : ''}`);
      });
    }

    if (result.errors.length === 0 && result.warnings.length === 0) {
      console.log('\n✅ All validations passed!');
    } else if (result.errors.length === 0) {
      console.log('\n✅ No errors found, but there are warnings to review.');
    } else {
      console.log('\n❌ Validation failed! Please fix the errors above.');
      process.exit(1);
    }
  }
}

// Script principal
async function main() {
  const validator = new RecipeSystemValidator();
  const result = await validator.validate();
  validator.printResults(result);
}

// Exécuter si appelé directement
if (import.meta.main) {
  main().catch(error => {
    console.error('❌ Validation script failed:', error);
    process.exit(1);
  });
}

export default RecipeSystemValidator;
