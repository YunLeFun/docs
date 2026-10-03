# 公开应用目录接口

应用服务提供匿名只读接口，适合在服务端展示云乐坊已上架应用。接口使用 HTTPS，不需要管理密钥，不返回个人工坊的受限作品。

## 读取列表

```http
GET https://apps.yunle.fun/api/apps/public
```

响应为 `{ items: [...] }`；没有可展示的应用时返回空数组。当前接口没有对外分页或筛选参数。

```js
// Node.js 服务端示例
const response = await fetch('https://apps.yunle.fun/api/apps/public')
if (!response.ok)
  throw new Error(`读取目录失败：${response.status}`)

const { items } = await response.json()
const links = items.map(app => ({
  name: app.name,
  url: app.websiteUrl,
}))
```

如需在其他域名的网页中展示目录，可由自己服务端读取后提供同源响应；该接口不承诺允许任意浏览器来源跨域请求。

## 读取单个应用

```http
GET https://apps.yunle.fun/api/apps/public/{key}
```

`key` 可以是应用 `_id` 或 `slug`，长度 1–128，只允许字母、数字、下划线、点与连字符。响应为 `{ app: {...} }`。

| HTTP 状态 | 含义 |
| --- | --- |
| `200` | 找到当前可公开展示的应用 |
| `400` | 标识格式无效 |
| `404` | 应用不存在，或当前不在公开目录中 |

## 常用字段

| 字段 | 用途 |
| --- | --- |
| `_id`、`slug` | 应用标识 |
| `name`、`description` | 展示名称与简介 |
| `websiteUrl`、`backupUrl` | 应用入口与备用入口 |
| `privacyPolicyUrl`、`supportUrl` | 隐私说明与支持入口 |
| `iconAssets`、`logo`、`emoji` | 图标资源与兼容回退 |
| `themeColor`、`category`、`tags` | 展示颜色与分类 |
| `ownerLogin`、`developerName` | 公开的维护者展示资料 |
| `accessMode`、`releaseStage` | 登录/邀请限制和 Stable/Beta 标记 |
| `isOfficial` | 平台授予的官方标记 |

可选字段可能缺省，应保留图标和文案回退。目录采用已获准上架的版本，新投稿未批准时仍可能返回旧版本；未出现的作品不能通过此接口推断其私有状态。

列表中出现某个应用不代表它无需登录、免费或支持 SSO。打开前保留应用声明的访问与付费提示，不能把目录标记当成业务授权结果。
