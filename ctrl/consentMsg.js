import { translation } from "../data/translation"
import { defaultLang } from "../main"


export const consentMsg = {
  state: {},
  onInit(_, el) {
    const lang = !defaultLang.match(/en|fr|ko/) ? 'en' : defaultLang
    el.innerText = translation?.consentMsg?.[lang]
  },
  render() { },
}
