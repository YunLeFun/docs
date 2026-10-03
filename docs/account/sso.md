# SSO 与登录

`@yunlefun/sso` 用于已登记的第一方客户端：主站确认用户身份，应用采用一次性授权码建立临时身份，再由自己的服务端建立应用会话。本文对应已发布的 **0.6.2**，不提供第三方自动注册入口。

本文 TypeScript 示例已通过 npm 发布版 0.6.2 的类型检查；跨站登录、原生授权和应用会话仍需在各自登记的环境中完成联调。

## 接入前确认

需要维护者登记公开的 `clientId`、应用 `appId`、精确 HTTPS Origin、完整 `redirectUri`、允许的 scope 和环境。`clientId` 是标识，不是密钥；只改前端参数不会获得授权。

回调地址必须属于当前应用 Origin，并与登记值精确匹配；生产与开发环境分别配置。下面的 `example-app-web`、`example-app` 和回调路径都是示例，需要替换为已登记值。

```bash
pnpm add @yunlefun/sso@0.6.2
```

## 普通 Web 登录

在用户点击登录时发起顶层跳转：

```ts
import { startSsoRedirect } from '@yunlefun/sso'

export async function login() {
  await startSsoRedirect({
    clientId: 'example-app-web',
    scope: ['identity:bootstrap'],
    redirectUri: new URL('/auth/callback', window.location.origin).href,
    prompt: 'select_account',
  })
}
```

`prompt` 可省略；`select_account` 请求换号交互，`consent` 请求账号授权确认。SDK 在当前 tab 的 `sessionStorage` 保存 nonce 与 PKCE verifier，回跳 URL fragment 只携带一次性 code、nonce 和 issuer。

顶层重定向不依赖隐藏 iframe 的跨站 Cookie，也不需要 popup 保留 opener。回调必须在原发起 tab 处理，并保留 fragment 到 SDK 消费完成；不要把 fragment 改写成 query 或转交其他窗口。

## 在回调页消费身份

在浏览器启动阶段调用一次 `consumeSsoRedirect()`。`null` 表示没有可消费的交易；`ok: false` 表示授权失败，按 `reason` 提示用户。

下面的 `auth` 由应用创建，是隔离、仅内存、`persistence: 'none'` 的 CloudBase Auth 实例。`/api/session/login` 是**应用自己实现的同源服务端路由**，不是平台现成接口。

```ts
import type { SsoIdentityAdoptionAuth } from '@yunlefun/sso/browser'
import { consumeSsoRedirect } from '@yunlefun/sso'
import { adoptSsoIdentityProof } from '@yunlefun/sso/browser'

export async function completeLogin(
  auth: SsoIdentityAdoptionAuth & { signOut: () => Promise<unknown> },
) {
  const authorization = consumeSsoRedirect()
  if (!authorization)
    return false
  if (!authorization.ok)
    throw new Error(`SSO 授权失败：${authorization.reason}`)

  try {
    const proof = await adoptSsoIdentityProof(auth, authorization)
    const response = await fetch('/api/session/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(proof),
    })
    if (!response.ok)
      throw new Error(`应用登录失败：${response.status}`)
    return true
  }
  finally {
    await auth.signOut()
  }
}
```

`adoptSsoIdentityProof` 使用 PKCE 兑换授权码，立即将短时 CloudBase custom ticket 交给官方登录方法，再返回绑定同一交易的临时 access token 与签名身份断言。这个 token 属于隔离的临时身份，不是主站 session。

应用完成服务端会话建立后清除临时身份。不要将 proof、ticket 或 token 存到长期浏览器存储、日志或 URL 中。

## 应用服务端校验

BFF（应用自己的后端）验证两份身份证明，再检查应用角色、准入条件和重放保护，创建自己的安全会话。

```ts
import type { SsoIdentityProofInput } from '@yunlefun/sso/server'
import { verifySsoIdentityProof } from '@yunlefun/sso/server'

export async function verifyLogin(proof: SsoIdentityProofInput) {
  return verifySsoIdentityProof(proof, {
    cloudbaseEnvId: 'your-cloudbase-env-id',
    appId: 'example-app',
    clientId: 'example-app-web',
    issuer: 'https://www.yunle.fun',
    jwksUrl: 'https://api.yunle.fun/sso-ticket',
  })
}
```

环境、`appId`、`clientId` 和 issuer 使用服务端固定配置，不能从浏览器请求中取信。校验会绑定用户、客户端、应用、scope 与 nonce；登录成功仍不代表用户有权使用该应用的全部功能。

SSO SDK 不创建长期 cookie，也不负责设备管理、角色权限或应用会话撤销。应用登出需结束自己的会话；不能把它当成已经开放的全站单点登出接口。

## 原生容器授权

已授信来源可用 `@yunlefun/sso/browser` 的 `requestHostSsoAuthorization()` 请求同样绑定 nonce 与 PKCE 的一次性授权码。它在普通浏览器或能力不可用时返回 `null`，此时可在用户操作下回退到 `startSsoRedirect()`。

```ts
import { requestHostSsoAuthorization } from '@yunlefun/sso/browser'

export async function requestNativeLogin() {
  return requestHostSsoAuthorization({
    clientId: 'example-app-web',
    scope: ['identity:bootstrap'],
    redirectUri: new URL('/auth/callback', window.location.origin).href,
    prompt: 'consent',
  })
}
```

成功结果仍需通过 `adoptSsoIdentityProof()` 与应用 BFF 消费。用户取消授权时保留当前页面，不自动重复弹窗。宿主检测与能力授权见 [JSAPI](/app/jsapi)。

## 从旧版迁移

以下接口已经删除：`requestSso`、`signInWithSso`、`requestSsoNative`、`adoptSession`、`adoptSsoTicket` 和 `@yunlefun/sso/legacy`。

删除隐藏 iframe、popup 和通过 `postMessage` 传递主站 access token、refresh token、session 的逻辑，改为顶层 redirect 或已授信的宿主授权。授权码默认短时有效且只能消费一次；超时或兑换失败后重新发起登录，不重放旧结果。

失败排查见[常见问题](/guide/faq)。
