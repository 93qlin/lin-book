vuex面试题
====

&emsp;[1.Vue路由怎么跳转打开新窗口？](#w1)

&emsp;[2.什么是命名视图，举个例子说明一下？](#w2)

&emsp;[3.怎么重定向页面？](#w3)

&emsp;[4.路由有几种模式？说说它们的区别？](#w4)




<h2 id='w1'>1. Vue##怎么跳转打开新窗口？</h2>

```
const obj = {
    path: xxx,//路由地址
    query: {
       mid: data.id//可以带参数
    }
};
const {href} = this.$router.resolve(obj);
window.open(href, '_blank');
```


<h2 id='w2'>2. 什么是命名视图，举个例子说明一下？</h2>

> 在项目中，我们想同级展示多个视图，而不是嵌套展示。例如项目首页，有头部导航，侧边栏导航、主内容区域。头部导航、侧边栏导航我们不想用组件方式引入，想用视图方式展示。那么这个首页上，就有三个视图，头部导航视图，侧边栏导航视图、主内容区域视图同级展示。
在layout.vue文件中

```
<template>
  <div>
    <div>
        //...头部导航
        <router-view name='header'></router-view>
    <div>
        //...侧边栏导航
        <router-view name='sider'></router-view>
    </div>
    <div>
        //...主内容
        <router-view/>
    </div>
  </div>
</template
```

> 如果 router-view 没有设置name，那么默认为default。一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 components 配置 (记得加上s)。

```
在routes.js文件中
function load(component) {
    return resolve => require([`views/${component}`], resolve);
}
const routes=[
    {
        path: '/',
        redirect: '/home',
        name: 'layout',
        component: load('layout'),
        children: [
            {
                path: '/home',
                name: 'home',
                components: {
                    default: load('main'),
                    header: load('header'),
                    sider: load('sider')
                },
                meta: {
                    title: '首页'
                },
            },
        ]
    }
]
```

<h2 id='w3'>3. 怎么重定向页面？</h2>


第一种方法：

```
const router = new VueRouter({
    routes: [
        { path: '/a', redirect: '/b' }
    ]
})
```

第二种方法:
```
const router = new VueRouter({
    routes: [
        { path: '/a', redirect: { name: 'foo' }}
    ]
})
```


第三种方法：

```
const router = new VueRouter({
    routes: [
        { 
            path: '/a', 
            redirect: to =>{
                const { hash, params, query } = to
                if (query.to === 'foo') {
                    return { path: '/foo', query: null }
                }else{
                   return '/b' 
                }
            }
            
        }
    ]
})
```



<h2 id='w4'>4. 路由有几种模式？说说它们的区别？</h2>



### hash
 兼容所有浏览器，包括不支持 HTML5 History Api 的浏览器，例http://www.abc.com/#/index，hash值为#/index， hash的改变会触发hashchange事件，通过监听hashchange事件来完成操作实现前端路由。hash值变化不会让浏览器向服务器请求。
```
// 监听hash变化，点击浏览器的前进后退会触发
window.addEventListener('hashchange', function(event){ 
    let newURL = event.newURL; // hash 改变后的新 url
    let oldURL = event.oldURL; // hash 改变前的旧 url
},false)
```

### history
HTML5 提供了 History API 来实现 URL 的变化。其中做最主要的 API 有以下两个：history.pushState() 和 history.repalceState()。这两个 API 可以在不进行刷新的情况下，操作浏览器的历史纪录。唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录，如下所示：

```
window.history.pushState(null, null, path);
window.history.replaceState(null, null, path);
```
history 路由模式的实现主要基于存在下面几个特性：

pushState 和 repalceState 两个 API 来操作实现 URL 的变化 ；
我们可以使用 popstate 事件来监听 url 的变化，从而对页面进行跳转（渲染）；
history.pushState() 或 history.replaceState() 不会触发 popstate 事件，这时我们需要手动触发页面跳转（渲染）

> 在history模式中，在window上监听popstate事件（浏览器的前进或后退按钮的点击触发）驱动界面变化，监听a链接点击事件用history.pushState、history.replaceState方法驱动界面变化；

> 没有#，路由地址跟正常的url一样，但是初次访问或者刷新都会向服务器请求，如果没有请求到对应的资源就会返回404，所以路由地址匹配不到任何静态资源，则应该返回同一个index.html 页面，需要在nginx中配置。

### abstract
 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式