---
layout: home

hero:
  name: 云乐坊开发者文档
  text: 应用接入与能力说明
  tagline: 个人工坊、公开目录、第一方登录、云币与会员、原生 JSAPI
  image:
    src: /brand/docs-hero.svg
    alt: 云乐坊开发者文档
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 应用接入
      link: /app/
    - theme: alt
      text: GitHub
      link: https://github.com/YunLeFun/docs

features:
  - icon: >-
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.5 19H6a4 4 0 0 1-.5-8A6.5 6.5 0 0 1 18 9.5 4.8 4.8 0 0 1 17.5 19Z"/></svg>
    title: 应用分发
    details: 区分云乐坊、个人主页与个人工坊，了解当前接入条件
    link: /app/
    linkText: 查看接入概览
  - icon: >-
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 16 2 2 4-4"/><path d="M21 10.5V5l-9-3-9 3v6c0 5 3.4 9.7 8 11"/><path d="M8 11h8"/><path d="M12 7v8"/></svg>
    title: 应用上架
    details: 作品保存、投稿审核、版本更新与上架分别如何生效
    link: /app/submission
    linkText: 了解提交流程
  - icon: >-
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>
    title: 统一账号
    details: 用户身份、应用会话与业务权限各自的职责
    link: /account/
    linkText: 查看账号能力
  - icon: >-
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 6v12"/></svg>
    title: 云币与会员
    details: 读取本人账户，确认计费授权、消费与会员权益边界
    link: /account/payment
    linkText: 了解计费权益
  - icon: >-
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="m8 7 3 8"/><path d="m16 7-3 8"/><path d="M8 6h8"/></svg>
    title: SSO
    details: 基于 SSO 0.6.2 的一次性授权码、PKCE 与应用会话
    link: /account/sso
    linkText: 查看登录协议
  - icon: >-
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/><path d="M8 7h8"/><path d="M8 11h6"/></svg>
    title: 原生 JSAPI
    details: 探测宿主权限，适配安全区、退出入口与原生能力
    link: /app/jsapi
    linkText: 查看容器接口
---

::: info 开发者预览
文档与接入规范仍在完善，会随应用和 SDK 版本更新。第三方自助上架尚未开放；SSO 与账户服务面向已登记的第一方应用，文档和 SDK 不会自动授予接入权限。
:::

完整范围见[文档定位](/guide/what-is)，接入排查见[常见问题](/guide/faq)。
