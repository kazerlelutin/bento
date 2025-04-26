import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { updateInfo } from '../ctrl/updateInfo'
import { kll } from '../main'

// Mock de kll.plugins.translate
vi.mock('../main', () => ({
  kll: {
    plugins: {
      translate: vi.fn()
    }
  }
}))

// Mock du package.json
vi.mock('../package.json', () => ({
  default: {
    version: '1.0.0',
    update: '2024-03-20'
  }
}), { virtual: true })

describe('updateInfo', () => {
  let mockElement

  beforeEach(() => {
    // Création d'un élément DOM mocké
    mockElement = document.createElement('div')
    mockElement.innerHTML = `
      <span data-version></span>
      <span data-update></span>
    `
  })

  afterEach(() => {
    vi.resetModules()
    vi.resetAllMocks()
  })

  it('devrait mettre à jour la version et la date correctement', async () => {
    await updateInfo.onInit(null, mockElement)

    const versionElement = mockElement.querySelector('[data-version]')
    const updateElement = mockElement.querySelector('[data-update]')

    expect(versionElement.innerText).toBe('1.0.0')
    expect(updateElement.innerText).toBe('2024-03-20')
    expect(kll.plugins.translate).toHaveBeenCalledWith(mockElement)
  })
})
