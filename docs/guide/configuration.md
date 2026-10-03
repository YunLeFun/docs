# 文档维护

本站基于 VitePress，使用云乐坊共享主题。文档源码和贡献入口见 [YunLeFun/docs](https://github.com/YunLeFun/docs)。

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

- 对照实际实现或已发布 SDK 核对参数与示例，区分已实现能力和当前开放范围。
- 不写密钥、部署账号、内部管理操作或未确定的开放日期，示例使用占位值。
- 通用工具安装说明链接到官方文档，避免维护重复副本；[CloudBase 工具入口](/guide/cloudbase-codebuddy)保留供参考。
- 修改页面地址时保留兼容入口或配置重定向，并更新导航与页内链接。

## 目录约定

| 目录 | 内容 |
| --- | --- |
| `guide/` | 开放范围、快速开始、常见问题和维护说明 |
| `app/` | 应用提交、审核、个人工坊、目录接口与 JSAPI |
| `account/` | 账号、支付、云币、会员和 SSO |

## 配置位置

- VitePress 配置：`docs/.vitepress/config/index.ts`
- 主题扩展：`docs/.vitepress/theme/`
- 静态资源：`docs/public/`
