
## 使用原理
> 插件通常用来为 Vue 添加全局功能。插件的功能范围没有严格的限制——一般有下面几种：

- 添加全局方法或者 property。如：vue-custom-element

- 添加全局资源：指令/过滤器/过渡等。如 vue-touch

- 通过全局混入来添加一些组件选项。如 vue-router

- 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。

- 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 vue-router

### 概括出来就是

1、通过Vue.use(MyPlugin)使用，本质上是调用MyPlugin.install(Vue)
2、使用插件必须在new Vue()启动应用之前完成，实例化之前就要配置好。
3、如果使用Vue.use多次注册相同插件，那只会注册成功一次。

## 源码解读
Vue.use源码如下
```
Vue.use = function (plugin) {   
    // 忽略已注册插件
    if (plugin.installed) {
      return
    }
    
    // 集合转数组，并去除第一个参数
    var args = toArray(arguments, 1);
    
    // 把this（即Vue）添加到数组的第一个参数中
    args.unshift(this);
    
    // 调用install方法
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    
    // 注册成功
    plugin.installed = true;
    return this;
  };
```
Vue.use接受一个对象参数plugin，首先判断是否已注册，如果多次注册相同插件那么只会注册成功一次，在注册成功后设置plugin.installed = true。

然后执行toArray(arguments, 1)方法，arguments是一个表示所有参数的类数组对象，需要转换成数组之后才能使用数组的方法。
```
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  // 循环去除 前start元素
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}
```
上面进行了一次转换，假设list是[1, 2, 3, 4]，start是1，首先创建一个包含3个元素的数组，依次执行ret[2] = list[ 2 + 1]、ret[1] = list[ 1 + 1]、ret[0] = list[ 0 + 1]，实际上就是去除arguments的第一个参数然后把剩余的类数组赋值给新的数组，其实就是去除plugin参数，因为调用plugin.install的时候不需要这个参数。

还可以通过如下几种方式实现类数组转换成数组，但是使用slice会阻止某些JavaScript引擎中的优化（参考自MDN）。

```
// ES5
var args = Array.prototype.slice.call(arguments);
var args = [].slice.call(arguments);
 
// ES6
const args = Array.from(arguments);
const args = [...arguments];
```
转换成数组之后调用args.unshift(this)，把Vue对象添加到args的第一个参数中，这样就可以在调用plugin.install方法的时候把Vue对象传递过去。

实例：实现一个插件
要求创建一个告诉Vue组件处理自定义rules规则选项的插件，这个rules需要一个对象，该对象指定组件中的数据的验证规则。

示例：
```
const vm = new Vue({
  data: { foo: 10 },
  rules: {
    foo: {
      validate: value => value > 1,
      message: 'foo must be greater than one'
    }
  }
})
 
vm.foo = 0 // 输出 foo must be greater than one
```
第一步先不考虑插件，在已有的VueAPI中是没有rules这个公共方法的，如果要简单实现的话可以通过钩子函数来，即在created里面验证逻辑。
```
const vm = new Vue({
    data: { foo: 10 },
    rules: {
        foo: {
          validate: value => value > 1,
          message: 'foo must be greater than one'
        }
    },
    created: function () {
      
        // 验证逻辑
        const rules = this.$options.rules
        if (rules) {
          Object.keys(rules).forEach(key => {
          
            // 取得所有规则
            const { validate, message } = rules[key]
            
            // 监听，键是变量，值是函数
            this.$watch(key, newValue => {
            
              // 验证规则
              const valid = validate(newValue)
              if (!valid) {
                console.log(message)
              }
            })
          })
        }
      }
    
})
 
```
可以通过this.$options.rules获取到自定义的rules对象，然后对所有规则遍历，使用自定义的validate(newValue)验证规则。

第二步实现这个rules插件，为了在Vue中直接使用，可以通过Vue.mixin注入到Vue组件中，这样所有的Vue实例都可以使用。

按照插件的开发流程，应该有一个公开方法install，在install里面使用全局的mixin方法添加一些组件选项，mixin方法包含一个created钩子函数，在钩子函数中验证this.$options.rules。

实现代码如下：
```
import Vue from 'vue'
 
// 定义插件
const RulesPlugin = {
 
  // 插件应该有一个公开方法install
  // 第一个参数是Vue 构造器
  // 第二个参数是一个可选的选项对象
  install (Vue) {
  
    // 注入组件
    Vue.mixin({
    
      // 钩子函数
      created: function () {
      
        // 验证逻辑
        const rules = this.$options.rules
        if (rules) {
          Object.keys(rules).forEach(key => {
          
            // 取得所有规则
            const { validate, message } = rules[key]
            
            // 监听，键是变量，值是函数
            this.$watch(key, newValue => {
            
              // 验证规则
              const valid = validate(newValue)
              if (!valid) {
                console.log(message)
              }
            })
          })
        }
      }
    })
  }
}
 
// 调用插件，实际上就是调用插件的install方法
// 即RulesPlugin.install(Vue)
Vue.use(RulesPlugin)
```
