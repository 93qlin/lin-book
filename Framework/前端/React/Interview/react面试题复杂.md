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
#### 1. 是什么？
- 用Javascript对象结构描述Dom树结构,然后用它来构建真正的Dom树插入文档
当状态发生改变之后,重新构造新的Javascript对象结构和旧的作对比得出差异
- 针对差异之处进行重新构建更新视图
- 无非就是利用Js做一层映射比较,操作简单并且速度远远高于直接比较Dom树

#### 2. 为什么？

- 所有浏览器的引擎工作流程都差不多，如上图大致分5步：创建DOM tree –> 创建Style Rules -> 构建Render tree -> 布局Layout –> 绘制Painting
- 操作DOM的代价仍旧是昂贵的，频繁操作还是会出现页面卡顿，影响用户的体验。真实的DOM节点，哪怕一个最简单的div也包含着很多属性，可以打印出来直观感受一下：

```
const div = document.createElement('div');
let num = 0;
for (let k in div) {
  num++;
}
console.log(num); // 241

```
然后浏览器根据CSS规则查找匹配节点,计算合并样式布局,为了避免重新计算一般浏览器会保存这些数据.但这是整个过程下来依然会耗费大量的内存和 CPU 资源.
- 虚拟DOM就是为了解决这个浏览器性能问题而被设计出来的。虚拟DOM不会立即操作DOM，而是将这多次更新的diff内容保存到本地的一个js对象中，最终将这个js对象一次性attach到DOM树上，通知浏览器去执行绘制工作，这样可以避免大量的无谓的计算量。
#### 3. 怎么做？
Virtual DOM 算法。包括几个步骤：
- 1.用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中
- 2.当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
- 3.把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了


