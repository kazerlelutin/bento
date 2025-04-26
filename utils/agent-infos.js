export function agentInfos() {
  const ua = navigator.userAgent

  const info = {
    browser: {
      name: '',
      version: '',
    },
    os: {
      name: '',
      version: '',
    },
    device: {
      type: '',
      model: '',
    },
  }

  const browserMatchers = [
    { name: 'Edge', regex: /Edg\/([\d\.]+)/ },
    { name: 'Chrome', regex: /Chrome\/([\d\.]+)/ },
    { name: 'Firefox', regex: /Firefox\/([\d\.]+)/ },
    { name: 'Safari', regex: /Version\/([\d\.]+) Safari\// },
    { name: 'Opera', regex: /OPR\/([\d\.]+)/ },
    { name: 'Internet Explorer', regex: /Trident\/.*rv:([\d\.]+)/ },
  ]

  for (const matcher of browserMatchers) {
    const match = ua.match(matcher.regex)
    if (match) {
      info.browser.name = matcher.name
      info.browser.version = match[1]
      break
    }
  }

  const osMatchers = [
    { name: 'Windows', regex: /Windows NT ([\d\.]+)/ },
    { name: 'Mac OS', regex: /Mac OS X ([\d_\.]+)/ },
    { name: 'iOS', regex: /iPhone OS ([\d_\.]+)/ },
    { name: 'Android', regex: /Android ([\d\.]+)/ },
    { name: 'Linux', regex: /Linux/ },
  ]

  for (const matcher of osMatchers) {
    const match = ua.match(matcher.regex)
    if (match) {
      info.os.name = matcher.name
      info.os.version = match[1] ? match[1].replace(/_/g, '.') : ''
      break
    }
  }

  const deviceMatchers = [
    { type: 'Mobile', regex: /Mobi/ },
    { type: 'Tablet', regex: /Tablet/ },
    { type: 'Desktop', regex: /./ },
  ]

  for (const matcher of deviceMatchers) {
    if (matcher.regex.test(ua)) {
      info.device.type = matcher.type
      break
    }
  }

  if (info.os.name === 'iOS') {
    const iosModelMatchers = [
      { model: 'iPhone', regex: /iPhone/ },
      { model: 'iPad', regex: /iPad/ },
    ]

    for (const matcher of iosModelMatchers) {
      if (matcher.regex.test(ua)) {
        info.device.model = matcher.model
        break
      }
    }
  } else if (info.os.name === 'Android') {
    const androidModel = ua.match(/Android.*?;\s([^;]+)/)
    if (androidModel) {
      info.device.model = androidModel[1]
    }
  }

  return info
}
