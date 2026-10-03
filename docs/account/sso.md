# SSO 与登录

云乐坊提供统一登录体系：用户在 `www.yunle.fun` 登录一次，**经许可的站点**即可复用这份登录态，
`uid` 全平台一致，无需各站各自登录。客户端封装为 npm 包
[`@yunlefun/sso`](https://github.com/YunLeFun/ylf/tree/main/packages/sso)。

## 谁可以接入

::: warning 这是「受信任站点」的免登方案，不是开放第三方登录
SSO 桥接会把**完整登录态（含长效 `refresh_token`）**交给接入站点，等同于把账号钥匙交给对方。所以：

- ✅ **适用**：云乐坊自有站点、你完全掌控或高度信任的站点。
- ❌ **不适用**：面向任意第三方开发者的开放式「用云乐坊登录」。那需要 OAuth2 授权码 + 用户授权同意流程（对方只拿到受限、可吊销的 token，永远看不到 `refresh_token`），不在本方案范围。
:::

接入需同时满足：

1. 与云乐坊**同一 CloudBase 环境**、**同一套 Auth**（用户 `uid` 一致）。
2. 站点 origin 已被云乐坊管理员加入 SSO 白名单（见 [管理员开通](#管理员开通白名单)）。

## 工作原理

CloudBase 登录凭证存在 **localStorage**，按 origin 隔离——跨域名不会自动共享。SSO 桥接负责**跨 origin 安全搬运**这份登录态：

```
子应用  ──①打开 www.yunle.fun/auth/sso（带 nonce）──▶  主站桥接页
       ◀──②postMessage 回传 session（仅发给白名单 origin）──
       ──③auth.setSession() 注入自己的 SDK──▶  已登录，uid 与主站一致
```

## 快速接入（3 步）

### 1. 装包

```bash
pnpm add @yunlefun/sso
```

### 2. 进站静默免登

```ts
import cloudbase from '@cloudbase/js-sdk'
import { signInWithSso } from '@yunlefun/sso'

const app = cloudbase.init({ env: 'your-cloudbase-env-id' }) // 管理员提供的受信任环境 ID
const auth = app.auth({ persistence: 'local' })

const { data } = await auth.getSession()
if (!data?.session || data.session.user?.is_anonymous) {
  const res = await signInWithSso(auth, { mode: 'silent' })
  // res.ok === true  → 已与云乐坊同账号登录
  // res.ok === false → 主站也未登录，保持未登录即可
}
```

将 `your-cloudbase-env-id` 替换为管理员提供的环境 ID。环境 ID 不是登录凭证；是否允许接入仍由 Auth 权限和 SSO 白名单决定。

### 3.「用云乐坊账号登录」按钮

```ts
async function loginWithYunLeFun() {
  const res = await signInWithSso(auth, { mode: 'interactive' })
  if (res.ok) {
    // 登录成功，刷新你的用户态 / 拉账户
  }
}
```

两种模式：

| 模式             | 载体        | 用户感知         | 适合           |
| ---------------- | ----------- | ---------------- | -------------- |
| `silent`（默认） | 隐藏 iframe | 无感             | 进站自动免登   |
| `interactive`    | 弹窗        | 看到主站登录弹窗 | 点「登录」按钮 |

推荐：进站先 `silent` 静默探测，失败再把登录按钮接 `interactive`。

## 在云乐坊原生 App 内（自动免登）

当你的页面是在**云乐坊原生 App（apps.yunle.fun）的应用内容器**里被打开时，`signInWithSso()` 会**自动改走原生通道**——你的代码一行都不用改：

- 普通浏览器 → www.yunle.fun 的 postMessage 桥。
- 原生容器内 → 容器注入的 `window.ylf` 桥取**页面自己的**会话（宿主登录态不直接下发给页面，由原生用一次性授权码/服务端兑换换出独立会话）。

两条路终点都是 `auth.setSession()`，所以同一行 `signInWithSso(auth)` 在网页和 App 容器里都免登。无需为原生单独写代码；只有你的站点被原生容器**授信**（`trustedHosts`）时这条路才会通。

```ts
import { isInYunleApp } from '@yunlefun/sso'

if (isInYunleApp()) {
  // 当前在云乐坊原生容器内（可选：仅用于判断 UI 形态）
}
```

## API 速览

| 入口                     | 导出                                                       | 用途                                       |
| ------------------------ | ---------------------------------------------------------- | ------------------------------------------ |
| `@yunlefun/sso`          | `signInWithSso(auth, options?)`                            | 一站式：发起 SSO + 注入登录态（多数站点只用这个） |
| `@yunlefun/sso`          | `requestSso(options?)` / `adoptSession(auth, session)`     | 分步：只取回 / 只注入                      |
| `@yunlefun/sso`          | `isInYunleApp()`                                            | 是否在云乐坊原生 App 容器内                |
| `@yunlefun/sso/protocol` | `SSO_RESULT_TYPE` / `parseSsoResultMessage` …              | 协议常量与消息校验（主站桥接页用）        |

`options`：`{ mode?: 'silent' | 'interactive', ssoOrigin?: string, timeoutMs?: number, native?: { scope?, exchangeUrl? } }`。

## 管理员开通白名单

接入站点**无法自助开通**——需云乐坊管理员把站点 origin 加入主站环境变量：

```bash
# www.yunle.fun 的 .env
NUXT_PUBLIC_SSO_ALLOWED_TARGET_ORIGINS=https://*.yunle.fun,https://your-site.com
```

支持精确 origin 与 HTTPS 通配子域名（`*.example.com` 仅匹配 HTTPS 子域名，不含顶级域）。

::: danger 红线
只把你**自己掌控或完全信任**的站点加进白名单。给不可信 origin 放行 = 把用户 `refresh_token` 拱手送人。
:::

## 安全模型

跨站搬运的会话靠三道闸守住：

1. **origin 白名单**（主站侧）——只发给许可的 origin。
2. **nonce 一次一令**——客户端每次请求生成随机串，桥接原样回传，防重放 / 串扰。
3. **来源窗口 + 精确 origin 校验**（客户端侧）——只认自己打开的那个 iframe/弹窗、且 `event.origin` 恰为主站源的消息。

匿名态（`is_anonymous`）一律按未登录处理，不会被当作已登录广播。

### 关于退出登录

session 注入后子站持有**独立登录态**，不做单点登出（SLO）：主站退出后，子站已注入的会话用到自然过期；但子站再次 `silent` 同步会拿到未登录，因此「进站静默同步」天然反映最新登录态。

## 登录之后

拿到登录态后，调账户中心查云币 / 判会员 / 扣费——见 [云币与会员](/account/payment)。所有接口都从 CloudBase Auth 取 `uid`，前端无法伪造他人身份。

## 原生 App

移动端授权回调由 `apps.yunle.fun` 与 `www.yunle.fun` 协同处理（deeplink 回传 `code`+`state`），不走本 Web SSO 桥。
