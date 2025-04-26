import { kll } from '../main'

export const header = {
  state: {
    img: '',
  },
  async onInit(_, el) {
    el.render()
  },
  render(_, el) {
    kll.plugins.translate(el)
  },
}
