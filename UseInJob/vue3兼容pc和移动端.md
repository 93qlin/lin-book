<!--
 * @Author: qin lin 925697386@qq.com
 * @Date: 2022-09-13 15:11:35
 * @LastEditors: qin lin 925697386@qq.com
 * @LastEditTime: 2022-09-14 22:41:34
 * @FilePath: /lin-book/UseInJob/vue3兼容pc和移动端.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
## 项目场景：
vue开发的项目，既有移动端又有pc端，但是移动端和pc端展示的内容不一样，同一个组件样式也不一样，移动端展示内容比pc端少，那这个时候在一个项目种怎么做的？

解决方式：
路由写两份，一份移动端的，一份pc端的，这两份路由地址相同，对应的组件不同，在路由的入口文件里去判断渲染pc的路由还是移动端的路由

代码如下：
```
router下的index.js文件

import Vue from 'vue';
import Router from 'vue-router';
import routerM from './routerM';
import routerPC from './routerPC';
 
Vue.use(Router);
const ISMOBILE = function () {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return flag;
};
 
// 创建路由实例
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  fallback: false,
   // 这里判断后选择使用移动端的路由还是pc端的路由
  routes: ISMOBILE() ? routerM : routerPC,
});
 
export default router;
router下routerM.js和routrPC.js代码：


```
可以看出是写了两份组件，导入组件时文件路径只有pc和mobile两个单词的区别，

所以说，也可以将路由写一份，中间的用变量来代替~~

同样的，当样式需要写两份的时候，也可以在main.js中按需引入
```
// 是否为手机端
const flag = navigator.userAgent.match(
  /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
);
 
 
// PC端和移动端的公共样式
import '@public/css/common.less';
// 移动端引入公共样式
if (flag) {
  require('@/assets/css/mobileCommon.less');
}
```