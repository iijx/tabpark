import pkg from './package.json'

const manifest: chrome.runtime.Manifest = {
  manifest_version: 3,
  name: 'TabPark',
  version: pkg.version,
  description: pkg.description,
  host_permissions: [
    "<all_urls>",
    "*://*/*"
  ],
  background: {
    service_worker: 'src/entries/background.ts',
  },
  action: {
    default_popup: 'popup.html',
  },
  chrome_url_overrides: {
    newtab: 'index.html',
  },
  permissions: [
    "tabs",
    "storage"
  ],
  options_ui: {
    page: 'index.html',
    open_in_tab: true,
  },
  icons: {
    16: 'logo80.png',
    48: 'logo80.png',
    128: 'logo80.png',
  }
}

export default manifest