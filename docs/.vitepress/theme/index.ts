// https://vitepress.dev/guide/custom-theme
import Theme from 'vitepress/theme-without-fonts'

import SitesDirectory from './components/SitesDirectory.vue'

import '@fontsource-variable/ibm-plex-sans'
import '@fontsource-variable/noto-sans-sc'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/600.css'
import 'uno.css'
import './style.css'
import './sites.css'
import 'virtual:group-icons.css'

// @unocss-include

export default {
  extends: Theme,
  enhanceApp({ app }) {
    app.component('SitesDirectory', SitesDirectory)
  },
}
