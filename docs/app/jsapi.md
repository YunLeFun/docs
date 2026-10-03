# 原生 JSAPI

Web 应用在支持的云乐坊 App 内嵌浏览器中打开时，宿主注入 `window.ylf`。普通浏览器中没有这个对象；页面需要保留网页功能，并按特性检测调用原生能力。

## 检测宿主与权限

```js
const host = window.ylf
if (host?.inYunleApp && await host.canIUse('getEnv')) {
  const env = await host.getEnv()
  console.log(env.platform, env.displayMode, env.safeAreaInsets)
}
```

所有方法返回 Promise，调用时处理异常。`canIUse(method)` 同时判断方法是否存在和当前来源是否有权调用，不能只依据宿主版本号或 `trusted` 展示标记决定授权。

## 方法与探测名

便捷方法与底层协议名并不总相同。`canIUse()` 使用下表的**探测名**：

| 页面方法 | 探测名 | 权限与用途 |
| --- | --- | --- |
| `getEnv()` | `getEnv` | 公开：读取环境与布局 |
| `hideCapsule()` / `showCapsule()` | `setCapsuleVisible` | 公开：请求隐藏或恢复胶囊，效果依容器与展示形态而定 |
| `hideTitleBar()` / `showTitleBar()` | `setTitleBarVisible` | 公开：收起或恢复已有标题栏 |
| `closeBrowser()` | `close` | 公开：关闭宿主浏览器，返回云乐坊 |
| `haptic(style)` | `haptic` | 授信：触感反馈，`light` / `medium` / `heavy` / `success` |
| `setClipboard(text)` | `setClipboard` | 授信：写入系统剪贴板 |
| `authorize(params)` | `authorize` | 授信：已登记第一方客户端的 SSO 授权 |
| `openAuthSession(params)` | `openAuthSession` | 授信：系统认证组件中的外部身份授权 |

`invoke(method, params)` 是通用底层通道，优先使用上表的便捷方法。来源授权由宿主执行；填写应用资料、使用 HTTPS 或在网页里设置 `trusted` 都不能自行授信。

## 安全区与展示形态

`getEnv()` 提供以下信息：

| 字段 | 含义 |
| --- | --- |
| `platform`、`appId` | 宿主平台与应用标识 |
| `displayMode` | `titlebar` 或 `immersive`；旧容器缺省时按 `immersive` 处理 |
| `trusted` | 当前来源是否授信，仅用于解释环境 |
| `titleBarVisible`、`capsuleVisible` | 当前宿主控件状态，旧容器可能缺省部分字段 |
| `safeAreaInsets` | 视口安全区的 `top` / `bottom` / `left` / `right`，单位 CSS px |
| `capsuleRect` | 胶囊的 `x` / `y` / `width` / `height`，视口坐标，单位 CSS px |

标题栏显示时，网页视口从栏下开始，`safeAreaInsets.top` 为 0。沉浸形态中，页面需根据安全区与胶囊位置避让内容。收起标题栏后重新读取 `getEnv()`，不要沿用旧布局。

标题栏的收起状态会在当前浏览器会话中保留；没有标题栏的形态调用显示/隐藏方法不会创建标题栏。不同平台的胶囊控制效果可能不同，页面仍应提供可用的返回路径。

## 主动返回与隐藏胶囊

```js
export async function returnToYunlefun() {
  const host = window.ylf
  if (!host?.inYunleApp || !await host.canIUse('close'))
    return false

  await host.closeBrowser()
  return true
}
```

隐藏胶囊前，先提供一个可见、可操作的退出按钮，并确认 `close` 可用。支持隐藏的沉浸容器只对当前文档隐藏胶囊，跳转新页面后恢复；标题栏模式中的 `hideCapsule()` 不会移除顶栏退出入口。不要依赖隐藏一定生效来完成业务。

## 授信能力示例

```js
export async function copyText(text) {
  const host = window.ylf
  if (host?.inYunleApp && await host.canIUse('setClipboard')) {
    await host.setClipboard(text)
    return
  }
  await navigator.clipboard.writeText(text)
}
```

这个函数在用户点击时调用，由调用方处理宿主或浏览器的拒绝与失败。触感反馈同样先探测 `haptic`，不可用时跳过即可。

## 登录能力边界

`authorize` 只向精确登记的第一方 SSO 客户端提供一次性授权码，不向页面转移主站或宿主的长期登录态。优先通过 [SSO SDK](/account/sso)生成 nonce、PKCE 和消费身份，避免自行拼协议。

`openAuthSession` 当前接受 GitHub 官方 OAuth 授权地址和固定宿主回调，输入为应用后端生成的 `url` 与单次 `state`，不是任意 URL 打开器。OAuth code 与 token 在应用 HTTPS 后端消费，不能放入原生回调；不可用时回退标准网页 OAuth。该能力不会替应用注册 OAuth 客户端或建立应用会话。
