## Bento Viewer – Guide de fonctionnement et animations

### Vue d’ensemble

Le viewer s’appuie sur:

- des templates HTML (canvas dans `index.html`),
- un store réactif (Proxy) pour la base (`baseStore`),
- un contrôleur `bentoViewerCtrl` qui:
  - charge le sprite (`initBentoSprite`),
  - calcule la géométrie du canvas et le scale HiDPI (DPR),
  - construit une display list (liste de commandes de dessin),
  - exécute le rendu à travers une boucle “update/draw” frugale.

### Cycle de rendu

- `update(dt)` met à jour l’état logique (timers, animations). Si l’état visuel doit changer: `dirty = true`.
- `updateCanvas()` ne peint que si nécessaire. Il:
  - prépare le canvas (DPR, width/height, imageSmoothing=false),
  - calcule la géométrie (scale entier, centrage),
  - appelle `buildDrawCommands(...)` puis `flushDrawCommands(ctx)`.
- Une boucle via `requestAnimationFrame` appelle périodiquement `update` et, si `dirty || isAnimating` est vrai, déclenche `updateCanvas`.

### Display list (liste de commandes)

Type `DrawCommand` minimal:

- `clear`: nettoie le canvas (width/height en CSS pixels)
- `image`: dessine une portion de sprite à un emplacement/dimension donnés

Le contrôleur empile les commandes dans `drawCommands` via `buildDrawCommands(...)`, puis `flushDrawCommands(ctx)` les exécute. Ajouter des couches revient à pousser de nouvelles commandes (ordre = z-index).

### DPR / HiDPI

- Le canvas utilise `devicePixelRatio` pour une netteté Retina: `canvas.width/height = css * dpr`, puis `ctx.scale(dpr, dpr)` et `imageSmoothingEnabled = false` pour préserver le pixel art.
- L’échelle du bento est un entier `scale = max(1, floor(min(scaleX, scaleY)))` pour éviter le flou.

### Déclencheurs de rendu

- `resize` (throttle par frame via `requestAnimationFrame`) → `markDirty()`
- changement de `baseStore.currentBase` → `markDirty()`
- toute mutation visuelle → `markDirty()`

---

## Ajouter une animation (exemple: flottement vertical léger)

Objectif: faire “flotter” le bento en douceur (quelques pixels) tant que l’animation est active, sans repaints inutiles quand rien ne bouge.

### 1) Ajouter l’état d’animation

Le contrôleur expose déjà `isAnimating`, `dirty`, `update(dt)`, `markDirty()`. Ajoute un temps accumulé:

```ts
// Dans bentoViewerCtrl (champs)
animationElapsedMs: 0,
animationDurationMs: 0,
```

### 2) Démarrer/arrêter l’animation

```ts
startFloatAnimation(durationMs = 4000) {
  this.animationElapsedMs = 0;
  this.animationDurationMs = durationMs;
  this.isAnimating = true;
  this.markDirty();
},

stopAnimation() {
  this.isAnimating = false;
  this.animationElapsedMs = 0;
  this.animationDurationMs = 0;
  this.markDirty(); // pour peindre l’état final stable
},
```

Tu peux exposer ces méthodes via le contrôleur, ou les déclencher depuis une UI/bouton.

### 3) Avancer le temps dans `update(dt)`

```ts
update(dt: number) {
  if (this.isAnimating) {
    this.animationElapsedMs += dt;
    // Option: fin automatique
    if (this.animationDurationMs && this.animationElapsedMs >= this.animationDurationMs) {
      this.stopAnimation();
    } else {
      this.dirty = true; // on veut re-dessiner cette frame
    }
  }
}
```

### 4) Appliquer l’offset dans `buildDrawCommands`

Sans changer l’API des commandes, on peut ajuster `dy` pour créer un flottement. On calcule un offset à partir du temps:

```ts
buildDrawCommands({ cssWidth, cssHeight, scale, centerX, centerY }) {
  this.drawCommands.length = 0;
  this.drawCommands.push({ kind: 'clear', width: cssWidth, height: cssHeight });

  if (!this.bentoSprite) return;

  const scaledWidth = BENTO_WIDTH * scale;
  const scaledHeight = BENTO_HEIGHT * scale;

  // Offset vertical doux (amplitude 2px, période ~2s)
  let floatOffset = 0;
  if (this.isAnimating) {
    const t = this.animationElapsedMs / 1000; // secondes
    floatOffset = Math.round(Math.sin((Math.PI * 2 / 2) * t) * 2);
  }

  const dx = centerX;
  const dy = centerY + floatOffset;

  // Back layer
  this.drawCommands.push({
    kind: 'image', image: this.bentoSprite,
    sx: 0, sy: 0, sw: BENTO_WIDTH, sh: BENTO_HEIGHT,
    dx, dy, dw: scaledWidth, dh: scaledHeight,
  });
  // Front layer
  this.drawCommands.push({
    kind: 'image', image: this.bentoSprite,
    sx: BENTO_WIDTH, sy: 0, sw: BENTO_WIDTH, sh: BENTO_HEIGHT,
    dx, dy, dw: scaledWidth, dh: scaledHeight,
  });
}
```

Résultat:

- La boucle rAF tourne, mais ne dessine qu’en cas d’animation ou de `dirty`.
- L’animation reste fluide (une draw par frame), et au repos, zéro repaint.

### 5) Variantes rapides

- Échelle pulsante: utilise un `scaleFactor = 1 + 0.03 * sin(2πt / période)` et ajuste `dw/dh` + centrage.
- Clignotement: applique une condition sur la frame ou ajoute une intensité `alpha` (voir ci-dessous).

### 6) Aller plus loin: alpha/transform

Si tu veux gérer l’opacité sans toucher le contexte à la main, étends la display list:

```ts
type DrawCommand =
  | { kind: 'clear'; width: number; height: number }
  | { kind: 'save' }
  | { kind: 'restore' }
  | { kind: 'alpha'; value: number }
  | { kind: 'image' /* ... même signature ... */ }

// flushDrawCommands: gère save/restore/alpha avant image
```

Tu pourras alors combiner `save → alpha → image → restore` pour un fondu.

---

## Bonnes pratiques

- Marquer `dirty` dès qu’un changement visuel survient; éviter les repaints automatiques en boucle quand rien ne change.
- Préférer des échelles entières pour le pixel art; garder `imageSmoothingEnabled = false`.
- Limiter les logs/overlays en prod.
- Pour `resize`, rester “par frame” (throttle rAF) ou utiliser `ResizeObserver` du conteneur si pertinent.
