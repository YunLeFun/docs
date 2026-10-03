# 贡献指南

欢迎修正文案、补充公开接入示例和改进文档站体验。应用尚未开放的能力应明确说明当前状态，接口说明需与实际实现一致。

## 本地开发

1. 安装 Node.js 24 和 `package.json` 指定的 pnpm 10.33.4。
2. Fork 本仓库，从 `main` 新建改动分支。
3. 执行 `pnpm install --frozen-lockfile` 和 `pnpm docs:dev`。
4. 修改后运行 `pnpm check`，确认检查和构建通过。
5. 提交 Pull Request，说明修改原因和验证方式；涉及页面样式时附上预览截图。

CI 会检查 Pull Request，不需要贡献者配置服务凭证。普通文档改动无需重建品牌图标，也无需更新依赖或锁文件。

## 内容边界

- 公开文档放在 `docs/`；导航和站点配置位于 `docs/.vitepress/config/`，主题扩展位于 `docs/.vitepress/theme/`。
- 示例使用占位环境 ID、账号和凭证，不提交真实 token、密钥、用户资料或本地 `.env`。
- 内部运营、部署、未定稿规划和权限开通流程由内部 Wiki 维护。
- 引用第三方资料时给出原始来源；新增图片或代码应有可使用的许可。

## 提交约定

使用 Conventional Commits：`<type>(<scope>): <subject>`，范围不明确时可省略 `scope`。标题简短说明实际修改，不以句号结尾。

```text
docs(sso): clarify trusted origin requirements
fix(theme): prevent hero image clipping
ci(docs): align checks with local development
```

`type` 使用 `feat`、`fix`、`docs`、`style`、`refactor`、`perf`、`test`、`build`、`ci`、`chore` 或 `revert`。不相关的改动请拆分提交。

## 许可证

提交的代码和文档沿用仓库的 [MIT 许可证](./LICENSE)。
