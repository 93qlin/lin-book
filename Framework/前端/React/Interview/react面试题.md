---
title: 面试
categories: "面试总结"
tags:
  - react
---
<h2>目录</h2>


&emsp;[1. React 中 key 的重要性是什么?](#k1)


<h5 id='k2'>2. React 中 key 的重要性是什么？</h5>

key 用于识别唯一的 Virtual DOM 元素及其驱动 UI 的相应数据。它们通过回收 DOM 中当前所有的元素来帮助 React 优化渲染。这些 key 必须是唯一的数字或字符串，React 只是重新排序元素而不是重新渲染它们。这可以提高应用程序的性能。
