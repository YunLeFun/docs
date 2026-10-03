# 云币与会员

本文适用于已获准接入账户服务的第一方应用。云币余额与会员状态来自同一个平台账户；SSO 登录本身不授予计费权限。

## 读取本人账户

已有 CloudBase 环境与登录配置的应用，通过登录态 SDK 调用 `account-api` 的 `getAccount` action。下面的 `app` 是应用已初始化并登录的 CloudBase 实例，不是云乐坊提供的全局对象。

```js
const { result: account } = await app.callFunction({
  name: 'account-api',
  data: { action: 'getAccount' },
})

console.log(account.coin)
console.log(account.membership.isActive)
```

返回字段：

| 字段 | 类型 | 含义 |
| --- | --- | --- |
| `coin` | `number` | 当前云币余额 |
| `membership.isActive` | `boolean` | 由账户服务计算的当前会员有效状态 |
| `membership.level` | `string` 或 `null` | 会员等级；无记录时为 `null` |
| `membership.expireAt` | `number` 或 `null` | 到期时间，Unix 毫秒；无记录时为 `null` |

调用失败时应显示账户暂不可用并允许重试，不能把网络错误当成“余额为零”或“非会员”。不要在请求中指定其他人的 UID；本人身份来自服务端验证的调用上下文。

此示例使用 CloudBase `callFunction` 登录态入口。普通 HTTP 请求不会自动携带该 SDK 身份，不能把接口地址替换成 `fetch` 后期待相同鉴权效果。

## 云币消费

每次消费都应对应明确的用户动作和业务记录：

1. 在执行前展示价格与消费规则，确认用户愿意继续。
2. 由受信任服务端校验身份、权益和业务价格，生成稳定的 `appId` 与 `bizId`。
3. 按已经获准的账户服务接入方式执行扣费，确认成功后交付业务结果。
4. 同一业务操作的网络重试复用同一个 `bizId`，避免重复消费；失败补偿也由业务服务端处理。

计费接入方式需由平台确认，不能把账户 action 当成一个通用浏览器扣费 SDK。内部服务凭证只能留在服务端，扣费结果也应由业务服务端确认。

## 会员权益

会员有效不代表所有应用免费。每个应用应明确哪些功能包含在会员内、哪些仍按次消费，并由服务端校验当前权益。展示到期时间时使用 `expireAt`，避免前端自行缓存一个长期有效的会员标记。

## 购买与充值

需要补充余额时引导用户到[云乐坊钱包](https://www.yunle.fun/wallet)，会员入口见[会员页面](https://www.yunle.fun/pricing)。价格、可选套餐与购买方式以对应页面为准。

支付返回页面后重新读取账户和订单；关闭购买窗口、返回应用或收到客户端消息都不代表支付完成。
