export function noAssetFound(state, type) {
  const url = new URL(window.location.href)
  const urlParams = new URLSearchParams(url.search)
  urlParams.delete(type)
  url.search = urlParams.toString()
  window.history.pushState({}, '', url)
  state[type] = null
}
