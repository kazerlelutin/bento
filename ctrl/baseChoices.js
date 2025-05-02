import { kll } from "../main"
import { availableRecipes } from "../utils/availableRecipes"
import { getStateByCtrl } from "../utils/getState"

export const baseChoices = {
  onInit(_, el) {
    el.render()
  },

  render(_, el) {
    el.innerHTML = ''


    availableRecipes.forEach(recipe => {
      const choice = document.createElement('button')
      choice.setAttribute('data-trans', recipe)

      choice.addEventListener('click', () => {
        const url = new URL(window.location.href)
        const urlParams = new URLSearchParams(url.search)
        //delete all params
        urlParams.delete('base')
        urlParams.set('base', recipe)
        url.search = urlParams.toString()
        window.history.pushState({}, '', url)
        const canvasState = getStateByCtrl('canvas')
        canvasState.base = recipe

      })

      el.appendChild(choice)
    })

    kll.plugins.translate(el)
  },
}
