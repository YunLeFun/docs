# 文档维护

本站基于 VitePress，参考 `YunYouJun/starter-monorepo` 初始化。

## 本地开发

```bash
pnpm install
pnpm docs:dev
```

## 质量检查

```bash
pnpm lint
pnpm typecheck
pnpm docs:build
```

## 内容约定

- 面向外部开发者，默认公开可访问。
- 不写内部密钥、部署账号、运营后台权限和未定稿方案。
- 未稳定的流程先写入 `wiki.yunle.fun`，定稿后再整理到本站。
- 同一事实只保留一个真相源，其他站点用摘要和链接。

## 目录约定

| 目录 | 内容 |
| --- | --- |
| `guide/` | 文档定位、快速开始和维护说明 |
| `app/` | 应用接入、提交、审核和上架 |
| `account/` | 账号、支付、云币、会员和 SSO |

## 配置位置

- VitePress 配置：`docs/.vitepress/config/index.ts`
- 主题扩展：`docs/.vitepress/theme/`
- 静态资源：`docs/public/`
