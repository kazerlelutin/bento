import { translation } from '../data/translation'
import { cookieConsentKey, defaultLang, kll, translateLsKey } from '../main'
import { openDatabase } from '../utils/idb'

export const consentButton = {
  onInit(_, el) {
    const lang = !defaultLang.match(/en|fr|ko/) ? 'en' : defaultLang
    el.innerText = translation?.acceptCookie?.[lang]
  },
  async onClick() {
    localStorage.setItem(cookieConsentKey, 'consent')
    localStorage.setItem(translateLsKey, defaultLang)
    await openDatabase()
    window.history.pushState({}, '', '/')
    kll.injectPage('/')
  },
}
