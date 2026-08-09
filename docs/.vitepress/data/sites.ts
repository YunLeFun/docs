export type SiteCategory = 'product' | 'documentation' | 'collaboration' | 'operations'

export interface SiteEntry {
  id: string
  name: string
  description: string
  url: string
  domain: string
  category: SiteCategory
  visibility: 'public' | 'internal'
}

// Public site copy baseline. Mirror changes into YunLeFun/wiki when this list changes.
// Last synced: 2026-08-09.
export const sites: readonly SiteEntry[] = [
  {
    id: 'website',
    name: '云乐坊官网',
    description: '了解云乐坊、产品动态与公开内容。',
    url: 'https://www.yunle.fun',
    domain: 'www.yunle.fun',
    category: 'product',
    visibility: 'public',
  },
  {
    id: 'apps',
    name: '云乐坊应用',
    description: '发现和使用云乐坊推出的独立应用。',
    url: 'https://apps.yunle.fun',
    domain: 'apps.yunle.fun',
    category: 'product',
    visibility: 'public',
  },
  {
    id: 'studio',
    name: '云乐坊工作室',
    description: '查看工作室服务、案例与合作信息。',
    url: 'https://studio.yunle.fun',
    domain: 'studio.yunle.fun',
    category: 'product',
    visibility: 'public',
  },
  {
    id: 'docs',
    name: '开发者文档',
    description: '应用接入、账号、支付与开放能力文档。',
    url: 'https://docs.yunle.fun',
    domain: 'docs.yunle.fun',
    category: 'documentation',
    visibility: 'public',
  },
  {
    id: 'github',
    name: 'GitHub',
    description: '浏览云乐坊的开源项目与公开代码。',
    url: 'https://github.com/YunLeFun',
    domain: 'github.com/YunLeFun',
    category: 'collaboration',
    visibility: 'public',
  },
]
