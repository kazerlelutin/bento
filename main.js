import './public/style.css'
import { KLL } from '@kll_/core'
import {
  CreateComponentPlugin,
  ManageAttrsPlugin,
  SmartRenderPlugin,
} from '@kll_/basic'
import { TranslatePlugin } from '@kll_/translate'
import { translation } from './data/translation.js'

// TRANSLATE ========================
export const defaultLang = window.navigator.language.split('-')[0]
export const translateLsKey = '__bento__lang'
localStorage.setItem(translateLsKey, window.navigator.language.split('-')[0])


export const cookieConsentKey = '__bento__cookieConsent'

if (localStorage.getItem(cookieConsentKey) === 'consent')
  localStorage.setItem(translateLsKey, defaultLang)

const params = {
  id: 'app',
  routes: {
    '/': import('./pages/index.html?raw').then((m) => m.default),
    '/consent': import('./pages/consent.html?raw').then((m) => m.default),
  },
  plugins: [
    CreateComponentPlugin,
    SmartRenderPlugin,
    ManageAttrsPlugin,
    (kll) => new TranslatePlugin(kll, translation, translateLsKey),
  ],
}

if (import.meta.env.MODE === 'development') {
  params.ctrlPath = import('./ctrl/index.js').then((m) => m)
  params.templatePath = import('./templates/index.js').then((m) => m)
} else {
  params.ctrlPath = import('/ctrl/index.js').then((m) => m)
  params.templatePath = import('/templates/index.js').then((m) => m)
}

export const kll = new KLL(params)

addEventListener('DOMContentLoaded', async () => {

  kll.plugins.translate()
  if (localStorage.getItem(cookieConsentKey) !== 'consent') {
    window.history.pushState({}, '', '/consent')
    kll.injectPage('/consent')
  }

})