---
title: 面试
categories: "面试总结"
tags:
  - react
---
<h2>目录</h2>

&emsp;[1. react virsualDOM 是什么? 如何实现? 说一下diff算法 ?](#k1)


## <h5 id='k1'>1. react virsualDOM 是什么? 如何实现? 说一下diff算法 ?</h5>
[虚拟DOM](https://www.jianshu.com/p/616999666920)
[虚拟 DOM Diff 算法解析](https://www.infoq.cn/article/react-dom-diff/)

### Virtual DOM
1. 是什么？
- 用Javascript对象结构描述Dom树结构,然后用它来构建真正的Dom树插入文档
当状态发生改变之后,重新构造新的Javascript对象结构和旧的作对比得出差异
- 针对差异之处进行重新构建更新视图
- 无非就是利用Js做一层映射比较,操作简单并且速度远远高于直接比较Dom树

2. 为什么？


