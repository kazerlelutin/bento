# Recipe System Documentation

## Structure des Bases

Une base est une recette complète qui se comporte comme un variant. Elle contient tous les éléments nécessaires pour créer un plat.

### Format JSON d'une base

```json
{
  "id": "empanada",
  "name": {
    "fr": "Empanada",
    "en": "Empanada",
    "ko": "엠빠나다"
  },
  "spriteId": "empanada_base",
  "ingredients": [...],
  "steps": [...]
}
```

## Règles des Ingrédients

### Clés obligatoires

- `id`: Identifiant unique pour récupérer le sprite dans SPRITE_MAP
- `quantity`: Quantité nécessaire
- `unit`: Unité de mesure (cups, tsp, tbsp, g, etc.)

### Clés de personnalisation

- `score`: Importance pour le nom de la recette (1-10)
- `nameComponent`: Syllabe pour générer le nom de la variante

### Clés de compatibilité

- `substitutes`: Liste d'IDs d'ingrédients qui peuvent remplacer celui-ci
- `foe`: Liste d'IDs d'ingrédients incompatibles
- `addable`: `true` si peut être ajouté optionnellement
- `deletable`: `true` si peut être supprimé
- `master`: `true` si provoque le changement de liste d'ingrédients

### Exemples

#### Ingrédient de base (farine)

```json
{
  "id": "flour_t55",
  "quantity": 2,
  "unit": "cups",
  "score": 8,
  "nameComponent": "Empa",
  "substitutes": ["flour_t65", "flour_t80"],
  "foe": ["yeast"],
  "addable": false,
  "deletable": false,
  "master": false
}
```

#### Ingrédient optionnel (épice)

```json
{
  "id": "paprika",
  "quantity": 1,
  "unit": "tsp",
  "score": 3,
  "nameComponent": "Spicy",
  "substitutes": [],
  "foe": [],
  "addable": true,
  "deletable": true,
  "master": false
}
```

#### Ingrédient maître (chocolat)

```json
{
  "id": "chocolate",
  "quantity": 100,
  "unit": "g",
  "score": 9,
  "nameComponent": "Choco",
  "substitutes": ["dark_chocolate", "white_chocolate"],
  "foe": ["savory_ingredients"],
  "addable": false,
  "deletable": false,
  "master": true
}
```

## Logique Métier

### Gestion des substituts

- **Réciprocité** : Si A substitue B, B substitue A
- **Remplacement** : Un seul ingrédient par groupe de substituts
- **Validation** : Vérifier la cohérence des substituts

### Gestion des incompatibilités (foe)

- **Masquage** : Les ingrédients incompatibles sont désactivés
- **Retrait automatique** : Si un ingrédient incompatible était sélectionné
- **Validation** : Empêcher la sélection d'ingrédients incompatibles

### Gestion des ingrédients maîtres

- **Changement de liste** : Charger une nouvelle liste d'ingrédients
- **Vidage** : Supprimer tous les ingrédients actuels
- **Remplacement** : Remplacer par la nouvelle liste

### Calcul du nom de la variante

- **Score** : Les ingrédients avec le plus haut score influencent le nom
- **Composants** : Les `nameComponent` sont combinés pour former le nom
- **Exemple** : "Empa" + "Spicy" = "Empa-Spicy"

## Structure des Étapes

### Format d'une étape

```json
{
  "id": "mix_dough",
  "operation": "mix",
  "duration": 5,
  "difficulty": 2,
  "ingredients": ["flour", "water", "salt"],
  "tools": [
    {
      "id": "mixing_bowl",
      "mandatory": true
    }
  ],
  "precisions": [
    "Mélanger la farine et le sel",
    "Ajouter l'eau progressivement"
  ]
}
```

### Opérations disponibles

- `mix`: Mélanger des ingrédients
- `knead`: Pétrir une pâte
- `cook`: Cuire
- `wash`: Rincer
- `rest`: Repos
- `chop`: Couper
- `grate`: Râper

### Outils

- `mandatory`: `true` si l'outil est obligatoire
- `priority`: Ordre d'importance (1 = plus important)
- `substitutes`: Outils de substitution

## Extensions Futures

### API

- Les recettes peuvent être utilisées comme API
- Structure extensible pour de nouvelles fonctionnalités
- Support multilingue intégré

### Export

- Génération de recettes personnalisées
- Export PDF/HTML
- Partage sur réseaux sociaux

### Opérations avancées

- Animations des étapes
- Vidéos tutoriels
- Conseils personnalisés
