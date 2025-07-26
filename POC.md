# 🍽️ POC - Générateur de Recettes Modulaires

## 📋 Vue d'ensemble

Ce POC démontre un système de génération de recettes modulaires avec des **bases** et des **variants**. Le système permet de créer des recettes personnalisées en combinant une base (structure principale) avec des variants (modifications et ajouts).

## 🏗️ Architecture

### Structure modulaire

```
Base Recipe (Structure principale)
├── Variant 1 (Modifications/ajouts)
├── Variant 2 (Modifications/ajouts)
└── Variant N (Modifications/ajouts)
```

### Composants clés

- **Bases** : Recettes de base avec structure et ingrédients principaux
- **Variants** : Modifications et ajouts d'ingrédients/étapes
- **Ingrédients** : Définis individuellement avec substituts et exclusions
- **Étapes** : Définies individuellement avec ordre et ingrédients requis

## 🍰 Bases disponibles

### 1. **Cake** (Gâteau de base)

- **Ingrédients de base** : Farine, beurre, sucre, œufs, levure
- **Étapes** : Mélange, repos, cuisson, démoulage
- **Variants** :
  - 🍋 **Lemon Cake** : Citron + jus de citron
  - 🍊 **Orange Cake** : Orange + jus d'orange + cannelle (optionnel) + pépites chocolat (optionnel)

### 2. **Empanada** (Pâte feuilletée)

- **Ingrédients de base** : Farine, eau, beurre, sel
- **Étapes** : Pâte, repos, façonnage, cuisson
- **Variants** :
  - 🥬 **Ricotta-Spinach** : Ricotta + épinards + sel
  - 🌶️ **Kimchi** : Kimchi haché
  - 🫘 **Black Beans** : Haricots noirs + poivron rouge + jus de citron vert + ingrédients optionnels

### 3. **Onigiri** (Boulettes de riz)

- **Ingrédients de base** : Riz, eau, sel
- **Étapes** : Cuisson riz, façonnage, refroidissement
- **Variants** :
  - 🌶️ **Kimchi** : Kimchi + graines de sésame

## 🔧 Fonctionnalités clés

### Système de substituts

- Chaque ingrédient peut avoir des **substituts** (ex: poivron rouge → vert/jaune/tomate)
- Gestion des **exclusions** avec `!` (ex: `!margarine` dans une étape)

### Fusion intelligente

- **Ingrédients** : Quantités additionnées automatiquement en cas de doublon
- **Étapes** : Tri par ordre numérique pour insertion flexible
- **Priorité** : Base > Variant pour les propriétés

### Export multiformat

- **Markdown** : Format lisible pour partage
- **JSON** : Format structuré pour intégration

### Interface utilisateur

- **Sélection de base** : Choix parmi les 3 bases disponibles
- **Sélection de variant** : Choix parmi les variants de la base
- **Personnalisation** : Activation/désactivation d'ingrédients optionnels
- **Substitution** : Choix entre ingrédients et leurs substituts

## 🎨 Système de sprites

### Sprites disponibles

- **Bases** : 3 sprites (empanada, onigiri, cake)
- **Ingrédients** : 47+ icônes réutilisables par catégorie
  - Liquides (eau, jus, huiles)
  - Fruits (citron, orange)
  - Poudres/Épices (sel, poivre, cannelle)
  - Matières grasses (beurre, margarine)
  - Farines (T55, T65)
  - Fromages (mozzarella, cheddar, ricotta)
  - Légumes (oignons, carottes, épinards)
  - Et plus...

### Réutilisation optimisée

- **Catégorisation** : Ingrédients similaires partagent le même sprite
- **Flexibilité** : Mapping dynamique pour nouveaux ingrédients

## 🧪 Validation et qualité

### Script de validation

```bash
bun run validate:recipes
```

**Vérifications automatiques** :

- Références d'ingrédients cohérentes
- Étapes avec ordre valide
- Exclusions logiques
- Mapping de sprites correct
- Transformations de texte fonctionnelles

## 🚀 Utilisation

### 1. Sélection de base

Choisir une base parmi les 3 disponibles (Cake, Empanada, Onigiri)

### 2. Sélection de variant

Choisir un variant pour personnaliser la recette

### 3. Personnalisation

- Activer/désactiver les ingrédients optionnels
- Choisir entre ingrédients et leurs substituts

### 4. Export

- Exporter en Markdown pour partage
- Exporter en JSON pour intégration

## 📊 Métriques du POC

- **3 bases** de recettes
- **6 variants** au total
- **47+ ingrédients** définis
- **20+ étapes** modulaires
- **Système de substituts** complet
- **Export multiformat** fonctionnel
- **Validation automatisée** du système

## 🎯 Démonstration

Le POC démontre :

1. **Modularité** : Réutilisation de bases et variants
2. **Flexibilité** : Système de substituts et exclusions
3. **Évolutivité** : Ajout facile de nouvelles bases/variants
4. **Qualité** : Validation automatisée du système
5. **Utilisabilité** : Interface intuitive et export pratique

---

_Ce POC prouve la viabilité d'un système de recettes modulaires avec gestion avancée des ingrédients et des étapes._
