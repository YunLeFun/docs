import type { DefaultTheme } from 'vitepress'
import { getVitepressConfig } from '@yunyoujun/docs'
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'
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

export default defineConfig({
  ...vpConfig,

  title: '云乐坊开发者文档',
  description: '云乐坊对外开发者文档，覆盖应用接入、上架、账号、支付、云币、会员与 SSO。',
  lang: 'zh-CN',
  markdown: {
    languages: ['js', 'jsx', 'ts', 'tsx'],
    config: (md) => {
      md.use(groupIconMdPlugin)
    },
  },
  cleanUrls: true,

  themeConfig: {
    ...vpConfig.themeConfig,

    logo: {
      src: '/favicon.svg',
      alt: 'YunLeFun',
    },

    search: {
      provider: 'local',
    },

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
        items: [
          { text: '官网', link: 'https://www.yunle.fun' },
          { text: '应用', link: 'https://apps.yunle.fun' },
          { text: '内部 Wiki', link: 'https://wiki.yunle.fun' },
          { text: 'GitHub', link: 'https://github.com/YunLeFun' },
        ],
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
    ['meta', { name: 'author', content: 'YunLeFun' }],
    ['meta', { property: 'og:title', content: '云乐坊开发者文档' }],
    ['meta', { property: 'og:description', content: '应用接入、上架、账号、支付、云币、会员与 SSO。' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
  ],
})
