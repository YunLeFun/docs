# 文档维护

本站基于 VitePress，参考 `YunYouJun/starter-monorepo` 初始化。

## 本地开发

使用 Node.js 24（见仓库根目录 `.node-version`）和 `package.json` 中指定的 pnpm 版本。首次开发先安装依赖：

```bash
pnpm install --frozen-lockfile
pnpm docs:dev
```

## 质量检查

```bash
pnpm check
```

`pnpm check` 与 CI 一致，依次执行 ESLint、TypeScript 类型检查和 VitePress 构建。CI 使用 Ubuntu 24.04、Node.js 24 和锁文件中的依赖，不需要部署密钥。

贡献流程见仓库根目录的 `CONTRIBUTING.md`。

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
