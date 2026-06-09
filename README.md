# 云乐坊开发者文档

`YunLeFun/docs` 是云乐坊面向外部开发者的公开文档站，覆盖应用接入、应用上架、账号、支付、云币、会员与 SSO。

文档站域名规划为 <https://docs.yunle.fun>。

## 文档边界

- `docs.yunle.fun`：对外公开、稳定、可引用的开发者文档。
- `wiki.yunle.fun`：内部规划、仓库职责、运营流程、部署 SOP 和决策记录。
- `www.yunle.fun/docs`：官网帮助、产品说明、法律条款、隐私政策和轻量入口。
- `apps.yunle.fun/docs`：App 产品设计、工坊、应用目录、数据库模型和移动端实现笔记。

## 开发

```bash
pnpm install
pnpm docs:dev
```

## 构建

```bash
pnpm lint
pnpm typecheck
pnpm docs:build
```

## License

[MIT](./LICENSE) License © [YunLeFun](https://github.com/YunLeFun)
