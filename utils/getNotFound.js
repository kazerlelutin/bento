import { kll } from '../main'

export async function getNotFound(el) {
  console.log('404')
  const template = await kll.processTemplate('notFound')
  const loader = document.querySelector('[ data-source-loader]')

  kll.plugins.translate(template)
  if (loader) loader.remove()
  kll.reload(template)
  el.replaceWith(template)
}
