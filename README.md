# 云乐坊开发者文档

`YunLeFun/docs` 是云乐坊的应用接入文档站，记录个人工坊、公开目录、第一方 SSO、云币与会员约定、原生 JSAPI 和常见问题。

在线文档：<https://docs.yunle.fun>。

当前文档为**开发者预览（Developer Preview）**，接入说明随应用与 SDK 版本更新。开源范围为本文档站的源码与公开接入说明，不包含平台后台或生产服务凭证。

文档说明现有实现与接入条件，第三方自助发布尚未开放；具体范围见[文档定位](https://docs.yunle.fun/guide/what-is)。

## 开发

使用 Node.js 24（见 [`.node-version`](./.node-version)）和 pnpm 10.33.4（见 [`package.json`](./package.json)）。本仓库是文档站工作区，`private: true` 用于防止误发布 npm 包，不影响仓库开源。

```bash
git clone https://github.com/YunLeFun/docs.git
cd docs
pnpm install --frozen-lockfile
pnpm docs:dev
```

依赖均可公开获取，不需要 npm token、CloudBase 凭证或私有仓库权限。

## 检查与构建

```bash
pnpm check
pnpm docs:preview
```

`pnpm check` 依次运行 ESLint、TypeScript 类型检查和 VitePress 构建，与 [CI](./.github/workflows/ci.yml) 保持一致。构建产物位于 `docs/.vitepress/dist`，预览前需完成构建。

CI 在 `main` 推送、Pull Request 和手动触发时运行，使用 Ubuntu 24.04 与 Node.js 24。工作流仅需要读取仓库权限，不使用部署密钥，也不负责生产发布。

## 参与贡献

欢迎通过 [Issue](https://github.com/YunLeFun/docs/issues) 提交文档问题，通过 Pull Request 修正文案、补充示例或改进主题扩展。开发和提交约定见 [贡献指南](./CONTRIBUTING.md)。涉及凭证、越权或用户数据的安全问题请按 [安全报告方式](./SECURITY.md) 私下联系维护者。

## 共享主题

本站使用 [`vitepress-theme-yunlefun`](https://github.com/YunLeFun/design/tree/main/packages/vitepress-theme-yunlefun)，与 design、docs 和 wiki 共用设计变量、文档样式及原生亮暗切换。主题版本固定在 `pnpm-workspace.yaml` 中，升级时同步提交锁文件。站点导航、内容和站点目录组件仍在本仓库维护。

品牌图形由 `@yunlefun/icons` 提供，导航使用共享主题 Logo。首页的渐变图案与光晕由 `docs/public/brand/docs-hero.svg` 和 `docs/.vitepress/theme/home.css` 独立维护。执行 `pnpm brand:icons` 重建 favicon、Apple/PWA 图标；需要 `librsvg` 的 `rsvg-convert`，日常文档开发和 CI 无需安装它。

## License

代码和文档沿用 [MIT](./LICENSE) License © [YunLeFun](https://github.com/YunLeFun)。第三方依赖遵循各自的许可证。
