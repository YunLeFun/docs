# 常见问题

## 为什么保存后没有出现在云乐坊？

保存更新个人作品，投稿与上架需要另外处理。检查可见范围是否为 `public`、是否主动投稿、审核状态与云乐坊展示状态。更新审核期间目录仍采用原已上架版本，见[提交流程](/app/submission)。

## 为什么提示第三方应用尚未开放？

当前第三方入驻开关尚未开放，公开第一方作品按 `yunle.fun` 域名范围校验。不要改字段或借用别人的域名绕过校验；有接入需求请使用[官方联系入口](https://www.yunle.fun/docs/contact)。

## 已登录，为什么仍不能创建或修改作品？

创建和更新要求正式账号、手机号已验证且账号可用。匿名身份、手机号未验证或账号受限时，服务端会拒绝操作；刷新前端状态不会改变这些条件。

## 私人工坊里的网址为什么还能被直接打开？

工坊限制目录元数据和列表读取，不能替目标网站鉴权。网站若没有登录与内容权限检查，知道 URL 的用户仍可以访问。见[个人工坊访问边界](/app/workshops)。

## SSO 跳转后没有登录成功

| 现象 | 检查项 |
| --- | --- |
| `invalid_request` 或来源校验失败 | `clientId`、scope、HTTPS Origin、完整 `redirectUri` 是否与登记一致，是否混用生产与开发环境 |
| 回调消费结果为 `null` | 是否在原发起 tab 消费，回调 fragment 是否保留，`sessionStorage` 是否可用，交易是否已经被消费 |
| 授权码兑换失败 | 是否超时、重复消费或丢失 PKCE 交易；重新从登录按钮发起，不重放原 code |
| `access_denied` 或 `HOST_AUTH_DENIED` | 用户取消授权，允许稍后主动重试，不自动循环弹出授权 |
| CloudBase 登录后应用仍未登录 | 应用服务端是否校验身份证明并建立自己的会话，临时身份不等于长期应用登录 |

不要在错误日志、URL query 或公开 Issue 中粘贴授权码、ticket、token、PKCE verifier 或完整身份证明。排查信息保留错误名、发生页面与步骤即可。

## 为什么 `window.ylf` 不存在，或 `canIUse` 返回 false？

普通浏览器没有原生 JSAPI；容器版本和来源授权也会影响能力。先检查 `window.ylf?.inYunleApp`，再用 `canIUse`。胶囊能力的探测名为 `setCapsuleVisible`，标题栏为 `setTitleBarVisible`，关闭浏览器为 `close`；不要用便捷包装函数名探测。详见 [JSAPI](/app/jsapi)。

## 付款返回后余额或会员没有变化

返回应用不代表支付完成。重新读取可信账户和订单结果，遇到网络错误允许重试；不要依据客户端回调直接交付付费权益。价格和购买问题以[钱包](https://www.yunle.fun/wallet)与[会员页面](https://www.yunle.fun/pricing)为准。
