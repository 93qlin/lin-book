面试知识点 - HTML
===

>HTML 属于结构层，负责描绘出内容的结构。
CSS 属于表示层，负责如何显示有关内容。
JavaScript 属于行为层，负责内容应如何对事件做出反应。

**HTML学习推荐**
* [《前端工程师手册》](https://leohxj.gitbooks.io/front-end-database/content/html-and-css-basic/index.html?tdsourcetag=s_pctim_aiomsg)
* [《HTML 教程- (HTML5 标准) - 菜鸟教程》](http://www.runoob.com/html/html-tutorial.html)

&emsp;[1. Doctype作用，HTML5 为什么只需要写`<!DOCTYPE HTML>`](#l1)

&emsp;[2. 行内元素有哪些，块级元素有哪些，空(void)元素有那些](#l2)

&emsp;[3. 简述一下你对HTML语义化的理解](#l3)

&emsp;[4. 常见的浏览器内核有哪些，介绍一下你对浏览器内核的理解](#l4)

&emsp;[5. html5有哪些新特性](#l5)

&emsp;[6. 描述一下 cookies，sessionStorage 和 localStorage 的区别](#l6)

&emsp;[7. 如何实现浏览器内多个标签页之间的通信](#l7)

&emsp;[8. HTML5的离线存储怎么使用，解释一下工作原理](#l8)

&emsp;[9. src与href的区别](#l9)

&emsp;[10. 表单提交中Get和Post方式的区别](#l10)

&emsp;[11. cookies、session、sessionStorage、localStorage](#l11)

&emsp;[12. 渐进增强和优雅降级？](#l12)

&emsp;[13. img 的 alt 与 title 有何异同？ strong 与 em 的异同？](#l13)

&emsp;[14.document load 和document ready 的区别](#l14)


<h2 id='l1'>1. Doctype作用，HTML5 为什么只需要写 <！DOCTYPE HTML></h2>

> doctype是一种标准通用标记语言的文档类型声明，目的是告诉标准通用标记语言解析器要使用什么样的文档类型定义（DTD）来解析文档.`<!DOCTYPE>`声明必须是HTML文档的第一行，位于html标签之前

> HTML5不基于SGML，所以不需要引用DTD。在HTML5中<!DOCTYPE>只有一种

> SGML: 标准通用标记语言,是现时常用的超文本格式的最高层次标准

## <div id='l2'>2. 行内元素有哪些，块级元素有哪些，空(void)元素有那些</div>

行内元素：`a` `span` `i` `img` `input` `select` `b` 等

块级元素：`div` `ul` `ol` `li` `h1~h6` `p` `table` 等

空元素：`br` `hr` `link` 等
## <div id='l3'>3. 简述一下你对HTML语义化的理解</div>

简单来说，就是合适的标签做合适的事情，这样具有以下好处：
- 有助于构架良好的HTML结构，有利于搜索引擎的建立索引、抓取，利于SEO
- 有利于不同设备的解析
- 有利于构建清晰的机构，有利于团队的开发、维护
- 便于盲人浏览网页

简单来说，能用 `<header>`、`<footer>` 等 div 新标签的就不用 `<div class="header">`，不要使用 `<div>` 来存放段落等……
## <div id='l4'>4. 常见的浏览器内核有哪些，介绍一下你对浏览器内核的理解</div>

> Trident内核：IE

> Gecko内核：NETSCAPE6及以上版本，火狐

> Presto内核：Opera7及以上。[Opera内核原为：Presto，现为：Blink;]

> Webkit内核：Safari，Chrome等。[Chrome的：Blink（WebKit的分支）]

浏览器内核又可以分成两部分：**渲染引擎和JS引擎。** 渲染引擎主要负责取得网页的内容、整理讯息、计算网页的显示方式等，JS引擎则是解析Javascript语言，执行javascript语言来实现网页的动态效果。
## <div id='l5'>5. html5有哪些新特性</div>

- 语义化标签: `header` `footer` `nav` `section` `article` `aside` 等
- 增强型表单：`date`(从一个日期选择器选择一个日期) `email`(包含 e-mail 地址的输入域) `number`(数值的输入域) `range`(一定范围内数字值的输入域) `search`(用于搜索域) `tel`(定义输入电话号码字段) 等
- 视频和音频：`audio` `video`
- Canvas绘图 SVG绘图
- 地理定位：`Geolocation`
- 拖放API：`drag`
- web worker：是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能
- web storage: `localStorage` `sessionStorage`
- WebSocket: HTML5开始提供的一种在单个 TCP 连接上进行全双工通讯的协议
## <div id='l6'>6. 描述一下 cookie，sessionStorage 和 localStorage 的区别</div>

<table>
   <tr>
        <th width=20%>特性</th>
        <th width=25% style="text-align:center">Cookie</th>
        <th widht=25% style="text-align:center">localStorage</th>
        <th widht=25% style="text-align:center">sessionStorage</th>
   </tr>
   <tr>
        <td >生命周期</td>
        <td>可设置失效时间，没有设置的话，默认是关闭浏览器后失效</td>
        <td>除非被手动清除，否则将会永久保存</td>
        <td>仅在当前网页会话下有效，关闭页面或浏览器后就会被清除</td>
   </tr>
   <tr>
        <td>存放数据大小</td>
        <td>4KB左右</td>
        <td colspan=2 align=center>可以保存5MB的信息</td>
   </tr>
   <tr>
        <td rowspan=3>http请求</td>
        <td>每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题</td>
        <td colspan=2>仅在客户端（即浏览器）中保存，不参与和服务器的通信</td>
   </tr>
</table>

## <div id='l7'>7. 如何实现浏览器内多个标签页之间的通信</div>

- 使用localStorage: `localStorage.setItem(key,value)`、`localStorage.getItem(key)`
- websocket协议
- webworker

[多个标签页之间的通信](https://juejin.im/post/5acdba01f265da23826e5633)
## <div id='l8'>8. HTML5的离线存储怎么使用，解释一下工作原理</div>

[HTML5的离线存储](https://segmentfault.com/a/1190000006984353)
## <div id='l9'>9. src与href的区别</div>

区别：src用于替代这个元素，而href用于建立这个标签与外部资源之间的关系

`<link href="style.css" rel="stylesheet" />`浏览器加载到这里的时候，html的渲染和解析不会暂停，css文件的加载是同时进行的

`<script src="script.js"></script>`当浏览器解析到这句代码时，页面的加载和解析都会暂停直到浏览器拿到并执行完这个js文件

## <div id='l10'>10. 表单提交中Get和Post方式的区别</div>

- Get一般用于从服务器上获取数据，Post向服务器传送数据
- Get传输的数据是拼接在Url之后的，对用户是可见的；Post的传输数据对用户是不可见的
- Get传送的数据量较小，不能大于2KB。Post传送的数据量较大，一般被默认为不受限制
- Get安全性非常低，Post安全性较高
- 在FORM提交的时候，如果不指定Method，则默认为Get请求
### 常见浏览器及其内核

| | Chrome | Firefox | Safari | IE | Opera |
| --- | --- | --- | --- | --- | --- |
| 排版引擎 | Blink | Gecko | Webkit | Trident | Blink |
| JS 引擎 | V8 | SpiderMonkey | Nitro | Chakra | V8 |

> 国内一些浏览器使用较多的是 Webkit 内核。

* 针对不同浏览器内核，HTML 辨别：

1. IE 内核浏览器识别：`<!--[if IE]><![endif]-->`
2. 非 IE 内核浏览器识别：`<!--[if !IE]><![endif]-->`

* 针对不同浏览器内核，CSS 辨别：

```css
/* 设置文字不可选取 */
* {
  -moz-user-select: none; /* 火狐 浏览器 */
  -webkit-user-select: none; /* Webkit 浏览器 */
  -o-user-select: none; /* Opera 浏览器 */
  -ms-user-select: none; /* IE10 浏览器 */
  -khtml-user-select: none; /* 早期浏览器 */
  user-select: none; /* 默认 */
}
```

## <div id='l11'>11. cookies、session、sessionStorage、localStorage</div>

* **cookies**：存储于浏览器端的数据。可以设置 cookies 的到期时间，如果不设置时间，则在浏览器关闭窗口的时候会消失。
* **session**：存储于服务器端的数据。session 存储特定用户会话所需的属性和配置信息。
* **cookies** 和 **session** 的区别在于：
1. cookies 数据存放在客户的浏览器上，session 数据存放在服务器上。
2. 前端都是裸君子，没有安全可言，cookies 可能会被黑客利用作数据欺骗。所以重要信息记得存 session。
3. session 如果在生效期内量过大，会占用服务器性能。
4. 单个 cookies 保存的数据不能超过 4 K，很多浏览器限制一个站点保存最多 20 个 cookies。

---

* **sessionStorage**：生命周期存在于标签页或窗口，用于本地存储一个会话（session）中的数据，这些数据会随着窗口或者标签页的关闭而被清空。

* **localStorage**：生命周期是永久的，除非用户主动清除浏览器上存储的 localStorage 信息，否则它将会永久存在。

* **sessionStorage** 和 **localStorage** 操作方法：`setItem`、`getItem` 以及 `removeItem`。

> 以 localStorage 为例：

```js
localStorage.getItem('name'); // 获取 name 的值
localStorage.setItem('name', 'jsliang'); // 设置 name 的值为 jsliang
localStorage.removeItem('name'); // 删除 name 的值
```

> 参考 1：[《前端分享之cookie的使用及单点登录》](https://segmentfault.com/a/1190000011295587)  
> 参考 2：[《Cookie、session和localStorage、以及sessionStorage之间的区别》](https://www.cnblogs.com/zr123/p/8086525.html)

## <div id='l12'>渐进增强和优雅降级？</div>

复制代码
```
.transition{
  -webkit-transition: all .5s;
     -moz-transition: all .5s;
       -o-transition: all .5s;
          transition: all .5s;  
}
```
```
.transition{ 
　　     transition: all .5s;
　　  -o-transition: all .5s;
  　-moz-transition: all .5s;
 -webkit-transition: all .5s;
}
```

 第一个例子的写法叫做渐进增强（progressive enhancement），第二个例子的写法叫做优雅降级（graceful degradation）。（关于渐进增强，可以参考张鑫旭的文章： http://www.zhangxinxu.com/wordpress/?p=788）
什么是渐进增强（progressive enhancement）、优雅降级（graceful degradation）呢？

渐进增强（progressive enhancement）：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。（从被所有浏览器支持的基本功能开始，逐步地添加那些只有新式浏览器才支持的功能，向页面添加无害于基础浏览器的额外样式和功能。当浏览器支持时，它们会自动地呈现出来并发挥作用。）

优雅降级（graceful degradation）：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。（Web站点在所有新式浏览器中都能正常工作，如果用户使用的是老式浏览器，则代码会检查以确认它们是否能正常工作。由于IE独特的盒模型布局问题，针对不同版本的IE的hack实践过优雅降级了，为那些无法支持功能的浏览器增加候选方案，使之在旧式浏览器上以某种形式降级体验却不至于完全失效。）

区别：优雅降级是从复杂的现状开始，并试图减少用户体验的供给，而渐进增强则是从一个非常基础的、能够起作用的版本开始，并不断扩充，以适应未来环境的需要。

## <div id='l13'>img 的 alt 与 title 有何异同？ strong 与 em 的异同？</div>

- img中的alt和title都是提示文字,但是alt是图片加载失败时的提示文字,title是鼠标放在图片上时的提示文字
- strong和em都是强调的意思,只不过strong是强烈的强调,strong在显示时是黑粗体,em是倾斜体
> Html b加粗与html strong加粗本质没有区别

<h2 id='l14'>document load 和document ready 的区别</h2>

1. load是当页面所有资源全部加载完成后（包括DOM文档树，css文件，js文件，图片资源等），执行一个函数
问题：如果图片资源较多，加载时间较长，onload后等待执行的函数需要等待较长时间，所以一些效果可能受到影响
2. $(document).ready()是当DOM文档树加载完成后执行一个函数 （不包含图片，css等）所以会比load较快执行
在原生的jS中不包括ready()这个方法，只有load方法就是onload事件



