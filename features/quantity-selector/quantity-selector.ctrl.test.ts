import { describe, it, expect, beforeEach, afterEach } from 'bun:test';

describe('quantity-selector.ctrl', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    // Reset store between tests to avoid state leakage
    try {
      // dynamic import to avoid hoisting issues in Bun
      const mod = require('./quantity-selector.store');
      if (mod?.quantitySelectorStore) {
        mod.quantitySelectorStore.quantity = 1;
      }
    } catch { }
  });

  afterEach(() => {
    const { mock } = require('bun:test');
    mock.restore?.();
    document.body.innerHTML = '';
  });

  const mountDOM = () => {
    const container = document.createElement('div');
    container.id = 'quantity-selector';

    const minus = document.createElement('button');
    minus.textContent = '-';
    minus.className = 'stepper-export-quantity-selector';
    minus.setAttribute('data-type', 'minus');
    const value = document.createElement('span');
    value.id = 'quantity-selector-value';
    const plus = document.createElement('button');
    plus.textContent = '+';
    plus.setAttribute('data-type', 'plus');

    container.appendChild(minus);
    container.appendChild(value);
    container.appendChild(plus);
    document.body.appendChild(container);
  }

  it('expose les méthodes attendues', async () => {
    const mod = await import('./quantity-selector.ctrl');
    const ctrl = mod.default;
    expect(ctrl).toHaveProperty('init');
    expect(ctrl).toHaveProperty('updateUI');
    expect(ctrl).toHaveProperty('cleanUp');
  });

  it("init lance une erreur si le conteneur n'existe pas", async () => {
    const mod = await import('./quantity-selector.ctrl');
    const ctrl = mod.default;
    expect(() => ctrl.init()).toThrow();
  });

  it('init + updateUI remplissent le texte traduit avec {quantity} et disable - à 1', async () => {
    const mod = await import('./quantity-selector.ctrl');
    const ctrl = mod.default;

    mountDOM();

    // Quantité par défaut = 1
    ctrl.init();

    const valueEl = document.getElementById('quantity-selector-value') as HTMLElement;
    // Le texte doit contenir la quantité et être issu de la clé singulier
    expect(valueEl.textContent).toContain('1');

    // Le bouton - doit être disabled à 1
    const minus = (document.getElementById('quantity-selector') as HTMLElement).querySelector('.stepper-export-quantity-selector[data-type="minus"]') as HTMLButtonElement;
    expect(minus.hasAttribute('disabled')).toBe(true);
  });

  it('clic sur + incrémente la quantité, met à jour le texte et active -', async () => {
    const mod = await import('./quantity-selector.ctrl');
    const ctrl = mod.default;

    mountDOM();
    ctrl.init();

    const container = document.getElementById('quantity-selector') as HTMLElement;
    const plus = Array.from(container.querySelectorAll('button')).find(b => b.textContent === '+') as HTMLButtonElement;
    plus.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    const modPlus = await import('./quantity-selector.ctrl');
    modPlus.default.updateUI();

    const valueEl = document.getElementById('quantity-selector-value') as HTMLElement;
    expect(valueEl.textContent).toContain('2');

    // Le bouton - doit être activé (>1)
    const minus = (document.getElementById('quantity-selector') as HTMLElement).querySelector('.stepper-export-quantity-selector[data-type="minus"]') as HTMLButtonElement;
    expect(minus.hasAttribute('disabled')).toBe(false);
  });

  it('clic sur - décrémente et re-désactive le bouton - à 1', async () => {
    const mod = await import('./quantity-selector.ctrl');
    const ctrl = mod.default;

    mountDOM();
    ctrl.init();

    const container = document.getElementById('quantity-selector') as HTMLElement;
    // Amener d'abord la quantité à 2 en cliquant sur le bouton +
    const plus = Array.from(container.querySelectorAll('button')).find(b => b.getAttribute('data-type') === 'plus') as HTMLButtonElement;
    plus.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await new Promise((r) => setTimeout(r, 0));

    const valueEl = document.getElementById('quantity-selector-value') as HTMLElement;
    expect(valueEl.textContent).toContain('2');

    // Puis cliquer sur le bouton - pour revenir à 1
    const minus = (document.getElementById('quantity-selector') as HTMLElement).querySelector('.stepper-export-quantity-selector[data-type="minus"]') as HTMLButtonElement;
    expect(minus.hasAttribute('disabled')).toBe(false);
    minus.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await new Promise((r) => setTimeout(r, 0));

    // Vérifier retour à 1 et re-disabled
    expect(valueEl.textContent).toContain('1');
    expect(minus.hasAttribute('disabled')).toBe(true);

  });

  it('cleanUp vide le conteneur', async () => {
    const mod = await import('./quantity-selector.ctrl');
    const ctrl = mod.default;

    mountDOM();
    ctrl.init();

    const container = document.getElementById('quantity-selector') as HTMLElement;
    expect(container.innerHTML).not.toBe('');

    ctrl.cleanUp();
    expect(container.innerHTML).toBe('');
  });
});
