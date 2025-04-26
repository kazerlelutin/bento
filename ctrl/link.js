import { kll } from '../main'

export const link = {
  async onClick(_, el, e) {
    e.preventDefault()

    let target = el
    while (target && !target.getAttribute('href')) {
      target = target.parentElement
    }

    if (!target) return

    const path = target.getAttribute('href')
    window.history.pushState({}, '', path)
    await kll.injectPage(path)

    displayReturnBtn()
  },
}
