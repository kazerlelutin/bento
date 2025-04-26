import { kll } from '../main'
import pkg from '../package.json' assert { type: 'json' }

export const updateInfo = {
  async onInit(_, el) {
    const version = pkg.version
    const date = pkg?.update
    el.querySelector('[data-version]').innerText = version
    el.querySelector('[data-update]').innerText = date
    kll.plugins.translate(el)
  },
}
