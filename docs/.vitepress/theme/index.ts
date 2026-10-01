// https://vitepress.dev/guide/custom-theme
import type { Theme as VitePressTheme } from 'vitepress'
import Theme from 'vitepress-theme-yunlefun'

import SitesDirectory from './components/SitesDirectory.vue'

import 'uno.css'
import 'vitepress-theme-yunlefun/style.css'
import './sites.css'
import 'virtual:group-icons.css'

// @unocss-include

export default {
  extends: Theme,
  enhanceApp({ app }) {
    app.component('SitesDirectory', SitesDirectory)
  },
} satisfies VitePressTheme
