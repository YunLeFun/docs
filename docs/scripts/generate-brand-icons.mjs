import { fileURLToPath } from 'node:url'
import { generateBrandAssets } from 'vitepress-theme-yunlefun/brand-assets'

await generateBrandAssets({
  outDir: fileURLToPath(new URL('../public/', import.meta.url)),
  icon: 'brand-mark',
  title: '云乐坊文档',
})
