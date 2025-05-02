import { noAssetFound } from "../utils/noAssetFound"

export const canvas = {
  state: {
    timeout: null,
    base: null,
    imageCache: new Map(),
  },
  async onInit(state, el) {

    const urlParams = new URLSearchParams(window.location.search)
    const base = urlParams.get('base')
    if (base) state.base = base

    await this.preloadImages(state)

    window.addEventListener('resize', () => {
      clearTimeout(state.timeout)
      state.timeout = setTimeout(() => {
        el.render()
      }, 100)
    })

    el.render()
  },

  async preloadImages(state) {
    const baseImages = [
      'assets/bento-back.png',
      'assets/bento-front.png',
      'assets/recipe.bibimbap.png',
      'assets/recipe.empenada.png',
    ]

    const recipeImages = state.base ? [`assets/${state.base}.png`] : []

    const images = [...baseImages, ...recipeImages]

    return await Promise.all(images.map(src => {
      return new Promise((resolve) => {
        if (state.imageCache.has(src)) {
          resolve()
          return
        }
        const img = new Image()
        img.onload = () => {
          state.imageCache.set(src, img)
          resolve()
        }
        img.onerror = () => {
          console.log('error : can\'t load image', src)
        }
        img.src = src
      })
    }))
  },

  async loadImage(state, src, type) {
    return new Promise((resolve) => {
      if (state.imageCache.has(src)) {
        resolve(state.imageCache.get(src))
        return
      }
      const img = new Image()
      img.onload = () => {
        state.imageCache.set(src, img)
        resolve(img)
      }

      img.onerror = () => {
        noAssetFound(state, type)
        resolve(null)
      }

      img.src = src
    })
  },

  async render(state, el) {
    const ctx = el.getContext('2d')

    const width = el.clientWidth
    const height = el.clientHeight

    // Set canvas size to match client dimensions
    el.width = width
    el.height = height
    // Disable image smoothing to keep pixel art crisp
    ctx.imageSmoothingEnabled = false

    // Calculate square size and position
    const size = Math.min(width, height)

    // Calculate scaling factor to maintain 100x100 pixel art
    const scale = Math.floor(size / 100)
    const scaledSize = scale * 100
    const scaledX = Math.floor((width - scaledSize) / 2)
    const scaledY = Math.floor((height - scaledSize) / 2)

    const baseSrc = `assets/${state.base}.png`

    let baseImg

    console.log(state.imageCache.has(baseSrc))

    if (state.base)
      baseImg = state.imageCache.has(baseSrc) ? state.imageCache.get(baseSrc) : await canvas.loadImage(state, baseSrc, 'base')

    const bentoBackImg = state.imageCache.get('assets/bento-back.png')

    if (bentoBackImg)
      ctx.drawImage(bentoBackImg, scaledX, scaledY, scaledSize, scaledSize)

    if (baseImg)
      ctx.drawImage(baseImg, scaledX, scaledY, scaledSize, scaledSize)

    const bentoFrontImg = state.imageCache.get('assets/bento-front.png')
    if (bentoFrontImg)
      ctx.drawImage(bentoFrontImg, scaledX, scaledY, scaledSize, scaledSize)

  },

  cleanUp(state, el) {

    window.removeEventListener('resize', () => {
      clearTimeout(state.timeout)
      state.timeout = setTimeout(() => {
        el.render()
      }, 100)
    })
  }
}
