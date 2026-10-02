import type { DefaultTheme } from 'vitepress'
import { getVitepressConfig } from '@yunyoujun/docs'
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'
import { withYunlefun, yunlefunMarkdown, zhThemeConfig } from 'vitepress-theme-yunlefun/config'
import { version } from '../../../package.json'

const GUIDES: DefaultTheme.NavItemWithLink[] = [
  { text: '文档定位', link: '/guide/what-is' },
  { text: '快速开始', link: '/guide/getting-started' },
  { text: '文档维护', link: '/guide/configuration' },
]

const APP_GUIDES: DefaultTheme.NavItemWithLink[] = [
  { text: '应用接入概览', link: '/app/' },
  { text: '应用提交流程', link: '/app/submission' },
  { text: '审核与上架规范', link: '/app/review' },
]

const ACCOUNT_GUIDES: DefaultTheme.NavItemWithLink[] = [
  { text: '账号与支付概览', link: '/account/' },
  { text: '云币与会员', link: '/account/payment' },
  { text: 'SSO 与登录', link: '/account/sso' },
]

const TOOLS: DefaultTheme.NavItemWithLink[] = [
  { text: 'CloudBase + CodeBuddy', link: '/guide/cloudbase-codebuddy' },
]

const VERSIONS: (DefaultTheme.NavItemWithLink | DefaultTheme.NavItemChildren)[] = [
  { text: `v${version} (current)`, link: '/' },
  { text: 'Changelog', link: '/changelog' },
]

const vpConfig = getVitepressConfig({
  repo: 'https://github.com/YunLeFun/docs',
})

export default defineConfig(withYunlefun({
  ...vpConfig,

  title: '云乐坊开发者文档',
  description: '云乐坊对外开发者文档，覆盖应用接入、上架、账号、支付、云币、会员与 SSO。',
  lang: 'zh-CN',
  markdown: {
    languages: ['js', 'jsx', 'ts', 'tsx'],
    config: (md) => {
      md.use(groupIconMdPlugin)
      md.use(yunlefunMarkdown)
    },
  },
  cleanUrls: true,

  themeConfig: {
    ...vpConfig.themeConfig,
    ...zhThemeConfig,
    siteTitle: '云乐坊文档',

    editLink: { ...vpConfig.themeConfig?.editLink, text: '在 GitHub 编辑此页' },
    logo: undefined,
    brand: { icon: 'brand-mark', hero: true },

    nav: [
      {
        text: '指南',
        items: [
          {
            items: GUIDES,
          },
        ],
      },
      {
        text: '应用接入',
        link: '/app/',
      },
      {
        text: '账号与支付',
        link: '/account/',
      },
      {
        text: '站点',
        link: '/sites/',
      },
      {
        text: `v${version}`,
        items: VERSIONS,
      },
    ],
    sidebar: {
      '/': [
        {
          text: '指南',
          items: GUIDES,
        },
        {
          text: '应用接入',
          items: APP_GUIDES,
        },
        {
          text: '账号与支付',
          items: ACCOUNT_GUIDES,
        },
        {
          text: '开发工具',
          items: TOOLS,
        },
        {
          text: '站点',
          items: [
            { text: '公开站点', link: '/sites/' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/YunLeFun/docs' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026-PRESENT YunLeFun.',
    },
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'icon', href: '/favicon-32.png', type: 'image/png', sizes: '32x32' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['link', { rel: 'mask-icon', href: '/brand/brand-mark.svg', color: '#2563EB' }],
    ['meta', { name: 'theme-color', content: '#0B1220' }],
    ['meta', { name: 'author', content: 'YunLeFun' }],
    ['meta', { property: 'og:title', content: '云乐坊开发者文档' }],
    ['meta', { property: 'og:description', content: '应用接入、上架、账号、支付、云币、会员与 SSO。' }],
    ['meta', { property: 'og:image', content: 'https://docs.yunle.fun/og-default.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
  ],
}))
