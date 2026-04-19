import type { Recipe } from "@features/recipes/recipe.type";
import type { Language } from "@features/translate/translate.types";
import {
  CARD_STEPS_ID,
  CARD_NOTES_ID,
  CARD_BENTO_RECAP_ID,
  CARD_BENTO_PRIMARY_ID,
  CARD_BENTO_SECONDARY_WRAP_ID,
  CARD_BENTO_SECONDARY_DL_ID,
  CARD_BENTO_MESSAGE_ID,
  CARD_BENTO_EXPORT_ID,
  CARD_BENTO_EXPORT_BOTTOM_ID,
  CARD_BENTO_SHARE_ID,
  CARD_BENTO_SHARE_BOTTOM_ID,
} from "@features/card/card.const";
import { refreshIngredientsAndServing } from "@features/card/card.utils";
import { hasBentoContent, renderCardBentoRecap } from "@features/card/card.bento.utils";
import { setCardControlsAriaLabels } from "@features/card-controls/card-controls.aria";
import { clearCardBentoMessageAutoHideTimer } from "@features/card/card.ctrl";
import { isNavigatorShareSupported } from "@features/recipes/bentext.utils";
import { getTranslation } from "@features/translate/translate.utils";
import { UI } from "@features/translate/translate.const";

/**
 * Remplit la carte (template `card` cloné dans le document) à partir d’une recette.
 * Utilisé par le client (`document`) et par le prerender SSG (`DOMParser` / happy-dom).
 */
export function applyRecipeToCardDom(doc: Document, recipe: Recipe, lang: Language): void {
  const overlay = doc.getElementById("card-overlay");
  if (overlay) {
    overlay.setAttribute("hidden", "");
  }

  const titleEl = doc.getElementById("card-title");
  const descEl = doc.getElementById("card-description");
  const imgEl = doc.getElementById("card-img");

  if (titleEl) titleEl.textContent = recipe.identity.name;
  if (descEl) descEl.textContent = recipe.identity.description;

  if (imgEl) {
    imgEl.innerHTML = "";
    const tpl = doc.getElementById("placeholder-template") as HTMLTemplateElement | null;
    if (recipe.image && tpl?.content) {
      const node = tpl.content.cloneNode(true) as DocumentFragment;
      const img = node.querySelector("img") as HTMLImageElement | null;
      if (img) {
        img.setAttribute("src", recipe.image.url ?? "");
        img.setAttribute("width", recipe.image.width?.toString() ?? "");
        img.setAttribute("height", recipe.image.height?.toString() ?? "");
      }
      imgEl.appendChild(node);
    }
  }

  const bentoRecap = doc.getElementById(CARD_BENTO_RECAP_ID);
  const bentoPrimaryGrid = doc.getElementById(CARD_BENTO_PRIMARY_ID);
  const bentoSecondaryWrap = doc.getElementById(CARD_BENTO_SECONDARY_WRAP_ID) as HTMLDetailsElement | null;
  const bentoSecondaryDl = doc.getElementById(CARD_BENTO_SECONDARY_DL_ID) as HTMLDListElement | null;
  const bentoExport = doc.getElementById(CARD_BENTO_EXPORT_ID);
  const bentoExportBottom = doc.getElementById(CARD_BENTO_EXPORT_BOTTOM_ID);
  const shareUi = isNavigatorShareSupported();
  const bentextActionsAria = getTranslation(
    UI[shareUi ? "bentext-actions-aria" : "bentext-actions-aria-copylink"],
    lang
  );
  if (bentoExport) {
    bentoExport.setAttribute("aria-label", bentextActionsAria);
  }
  if (bentoExportBottom) {
    bentoExportBottom.setAttribute("aria-label", bentextActionsAria);
  }

  const shareLabelKey = shareUi ? "bentext-share-short" : "bentext-copy-link-short";
  for (const id of [CARD_BENTO_SHARE_ID, CARD_BENTO_SHARE_BOTTOM_ID]) {
    const btn = doc.getElementById(id);
    if (btn) {
      btn.setAttribute("data-translate", shareLabelKey);
      btn.textContent = getTranslation(UI[shareLabelKey], lang);
    }
  }

  if (bentoRecap && bentoPrimaryGrid && bentoSecondaryDl) {
    if (hasBentoContent(recipe.bento)) {
      bentoRecap.hidden = false;
      bentoRecap.setAttribute("aria-label", getTranslation(UI["bento-recap-aria"], lang));
      renderCardBentoRecap(
        {
          primaryGrid: bentoPrimaryGrid,
          secondaryWrap: bentoSecondaryWrap,
          secondaryDl: bentoSecondaryDl,
        },
        recipe.bento!,
        lang
      );
    } else {
      bentoRecap.hidden = true;
      bentoRecap.removeAttribute("aria-label");
      bentoPrimaryGrid.innerHTML = "";
      bentoSecondaryDl.innerHTML = "";
      bentoPrimaryGrid.hidden = true;
      if (bentoSecondaryWrap) bentoSecondaryWrap.hidden = true;
    }
  }

  const bentoMsg = doc.getElementById(CARD_BENTO_MESSAGE_ID);
  if (bentoMsg) {
    if (doc === document) {
      clearCardBentoMessageAutoHideTimer();
    }
    bentoMsg.hidden = true;
    bentoMsg.textContent = "";
    bentoMsg.classList.remove("card-bento-message--error");
  }

  const serving = recipe.identity.servings || 1;
  refreshIngredientsAndServing(recipe, serving, { doc, lang });

  const stepsEl = doc.getElementById(CARD_STEPS_ID);
  if (stepsEl) {
    stepsEl.innerHTML = "";
    (recipe.steps ?? []).forEach((step) => {
      const li = doc.createElement("li");
      li.textContent = step;
      stepsEl.appendChild(li);
    });
  }

  const notesEl = doc.getElementById(CARD_NOTES_ID);
  if (notesEl) {
    notesEl.innerHTML = "";
    (recipe.notes ?? []).forEach((note) => {
      const li = doc.createElement("li");
      li.textContent = note;
      notesEl.appendChild(li);
    });
  }

  setCardControlsAriaLabels(doc, lang);
}
