# 性能优化

===

https://csspod.com/frontend-performance-best-practices/
## 页面内容
### 减少 HTTP 请求数
### 减少 DNS 查询
### 避免重定向
### 缓存 Ajax 请求
### 延迟加载
### 预先加载
### 减少 DOM 元素数量
### 划分内容到不同域名
### 尽量减少 iframe 使用
### 避免 404 错误
## 服务器
### 使用 CDN
### 添加 Expires 或 Cache-Control 响应头
### 启用 Gzip
### 配置 Etag
### 尽早输出缓冲
### Ajax 请求使用 GET 方法
### 避免图片 src 为空
## Cookie
### 减少 Cookie 大小
### 静态资源使用无 Cookie 域名
## CSS
### 把样式表放在 <head> 中
### 不要使用 CSS 表达式
### 使用 <link> 替代 @import
### 不要使用 filter
## JavaScript
### 把脚本放在页面底部
### 使用外部 JavaScript 和 CSS
### 压缩 JavaScript 和 CSS
### 移除重复脚本
### 减少 DOM 操作
### 使用高效的事件处理
### 事件委托
### 防抖（debounce）/节流（throttle）
防抖（debounce）
输入搜索时，可以用防抖debounce等优化方式，减少http请求；

这里以滚动条事件举例：防抖函数 onscroll 结束时触发一次，延迟执行
```
function debounce(func， wait) {
  let timeout;
  return function() {
    let context = this; // 指向全局
    let args = arguments;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(context， args); // context.func(args)
    }， wait);
  };
}
// 使用
window.onscroll = debounce(function() {
  console.log('debounce');
}， 1000);
```

节流（throttle）
节流函数：只允许一个函数在N秒内执行一次。滚动条调用接口时，可以用节流throttle等优化方式，减少http请求；

下面还是一个简单的滚动条事件节流函数：节流函数 onscroll 时，每隔一段时间触发一次，像水滴一样

```
function throttle(fn， delay) {
  let prevTime = Date.now();
  return function() {
    let curTime = Date.now();
    if (curTime - prevTime > delay) {
      fn.apply(this， arguments);
      prevTime = curTime;
    }
  };
}
// 使用
var throtteScroll = throttle(function() {
  console.log('throtte');
}， 1000);
window.onscroll = throtteScroll;
```

## 图片
### 优化图片
### 优化 CSS Sprite
### 不要在 HTML 中缩放图片
### 使用体积小、可缓存的 favicon.ico
## 移动端
### ß保持单个文件小于 25 KB
### ß打包内容为分段（multipart）文档

## webpack性能优化

https://blog.csdn.net/weixin_44157964/article/details/108110972
### webpack 优化构建速度（可用于生产）
- 优化 babel-loader
- IgnorePlugin
- noParse
- happyPack
- ParallelUgligyPlugin
### webpack 优化构建速度（不可用于生产）
- 自动刷新
- 热更新
- DllPlugin
### webpack 优化产出代码
- 小图片 base64 编码
- bundle 加 hash
- 懒加载
- 提取公共代码
- 使用 CDN 加速
- IgnorePlugin
- 使用 Production
- Scope Hosting

### 1、noParse:

> 不去分析某个模块中的依赖关系，即不去管某个文件是否 import(依赖)了某个文件，对于一些独立的库，比如 jquery，其根本不存在依赖关系

```
module.exports = {
    module: {
        noParse:/jquery/,//不去解析jquery中的依赖库
    }
}
```

### 2. exclude:

```
exclude: 在 loader 中使用 exclude 排除对某些目录中的文件处理，即引入指定目录下的文件时候，不使用对应的 loader 进行处理，exclude 是 loader 配置中的一个属性，属性值为正则表达式，如:

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                            plugins: ["@babel/plugin-transform-runtime"]
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    }
}
```

### 3、使用 IgnorePlugin

> 使用 IgnorePlugin 来忽略某个模块中某些目录中的模块引用，比如在引入某个模块的时候，该模块会引入大量的语言包，而我们不会用到那么多语言包，如果都打包进项目中，那么就会影响打包速度和最终包的大小，然后再引入需要使用的语言包即可，如:

项目根目录下有一个 time 包，其中有一个 lang 包，lang 包中包含了各种语言输出对应时间的 js 文件，time 包下的 index.js 会引入 lang 包下所有的 js 文件，那么当我们引入 time 模块的时候，就会将 lang 包下的所有 js 文件都打包进去，添加如下配置:

```
const webpack = require("webpack");
module.exports = {
    plugins: [
        new webpack.IgnorePlugin(/lang/, /time/)
    ]
}
```

> 引入 time 模块的时候，如果 time 模块中引入了其中的 lang 模块中的内容，那么就忽略掉，即不引入 lang 模块中的内容，需要注意的是，这 /time/ 只是匹配文件夹和 time 模块的具体目录位置无关，即只要是引入了目录名为 time 中的内容就会生效

### 4、使用 HappyPack
> 使用 HappyPack：由于在打包过程中有大量的文件需要交给 loader 进行处理，包括解析和转换等操作，而由于 js 是单线程的，所以这些文件只能一个一个地处理，而 HappyPack 的工作原理就是充分发挥 CPU 的多核功能，将任务分解给多个子进程去并发执行，子进程处理完后再将结果发送给主进程，happypack 主要起到一个任务劫持的作用，在创建 HappyPack 实例的时候要传入对应文件的 loader，即 use 部分，loader 配置中将使用经过 HappyPack 包装后的 loader 进行处理，如:

```
module.exports = {
    plugins: [
        new HappyPack({ // 这里对处理css文件的loader进行包装
            id: "css",// 之前的loader根据具体的id进行引入
            use: ["style-loader","css-loader"],
            threads: 5 // 设置开启的进程数
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/, // 匹配以.css结尾的文件
                use: ["happypack/loader?id=css"] //根据happypack实例中配置的id引入包装后的laoder，这里的happyPack的h可以大写也可以小写
            }
        ]
    }
}
```

**注意：** webpack 要打包的文件非常多的时候才需要使用 happypack 进行优化，因为开启多进程也是需要耗时间的，所以文件少的时候，使用 happypack 返回更耗时

### 5、抽离公共模块:
抽离公共模块: 对于多入口情况，如果某个或某些模块，被两个以上文件所依赖，那么可以将这个模块单独抽离出来，不需要将这些公共的代码都打包进每个输出文件中，这样会造成代码的重复和流量的浪费，即如果有两个入口文件 index.js 和 other.js，它们都依赖了 foo.js，那么如果不抽离公共模块，那么 foo.js 中的代码都会打包进最终输出的 index.js 和 other.js 中去，即有两份 foo.js 了。抽离公共模块也很简单，直接在 optimization 中配置即可，如:

```
module.exports = {
     splitChunks: { // 分割代码块，即抽离公共模块
         cacheGroups: { // 缓存组
             common: { // 组名为common可自定义
                    chunks: "initial",
                    minSize: 0, // 文件大小为0字节以上才抽离
                    minChunks: 2, // 被引用过两次才抽离
                    name: "common/foo", // 定义抽离出的文件的名称
             }
         }
     }
}
```

> 这样就会将公共的 foo.js 模块抽离到 common 目录下 foo.js 中了，但是如果我们也有多个文件依赖了第三方模块如 jquery，如果按以上配置，那么 jquery 也会被打包进 foo.js 中，会导致代码混乱，所以我们希望将 jquery 单独抽出来，即与 foo.js 分开，我们可以复制一份以上配置，并通过设置抽离代码权重的方式来实现，即优先抽离出 jquery，如:

```
module.exports = {
     splitChunks: { // 分割代码块，即抽离公共模块
         cacheGroups: { // 缓存组
             common: { // 组名为common可自定义
                    chunks: "initial",
                    minSize: 0, // 文件大小为0字节以上才抽离
                    minChunks: 2, // 被引用过两次才抽离
                    name: "common/foo", // 定义抽离出的文件的名称
             },
             verdor: {
                    test: /node_modules/,
                    priority: 1, // 设置打包权重，即优先抽离第三方模块
                    chunks: "initial",
                    minSize: 0, // 文件大小为0字节以上才抽离
                    minChunks: 2, // 被引用过两次才抽离
                    name: "common/jquery", // 定义抽离出的文件的名称
                }
         }
     }
}
```

这样就会在 common 目录下同时抽离出 foo.js 和 jquery.js 了，需要注意的是，代码的抽离必须是该模块没有被排除打包，即该模块会被打包进输出 bundle 中，如果第三方模块已经通过 externals 排除打包，则以上 vendor 配置无效。

### 按需加载
**6、按需加载，**即在需要使用的时候才打包输出，webpack 提供了 import() 方法，传入要动态加载的模块，来动态加载指定的模块，当 webpack 遇到 import()语句的时候，不会立即去加载该模块，而是在用到该模块的时候，再去加载，也就是说打包的时候会一起打包出来，但是在浏览器中加载的时候并不会立即加载，而是等到用到的时候再去加载，比如，点击按钮后才会加载某个模块，如:

```
const button = document.createElement("button");
button.innerText = "点我"
button.addEventListener("click", () => { // 点击按钮后加载foo.js
    import("./foo").then((res) => { // import()返回的是一个Promise对象
        console.log(res);
    });
});
document.body.appendChild(button);
```
从中可以看到，import() 返回的是一个 Promise 对象，其主要就是利用 JSONP 实现动态加载，返回的 res 结果不同的 export 方式会有不同，如果使用的 module.exports 输出，那么返回的 res 就是 module.exports 输出的结果；如果使用的是 ES6 模块输出，即 export default 输出，那么返回的 res 结果就是 res.default，如:

// ES6模块输出，res结果为

```
{default: "foo", __esModule: true, Symbol(Symbol.toStringTag): "Module"}
```

### 7.ParallelUglifyPlugin
```
ParallelUglifyPlugin可以开启多进程压缩JS文件
  import ParallelUglifyPlugin from 'webpack-parallel-uglify-plugin';
  module.exports = {
    plugins: [
      new ParallelUglifyPlugin({
        test,
        include,
        exclude,
        cacheDir,
        workerCount,
        sourceMap,
        uglifyJS: {
        },
        uglifyES: {
        }
      }),
    ],
  };
```

### 压缩图片

### 抽取公共模块

在 webpack4 之前，都是利用 CommonsChunkPlugin 插件来进行公共模块抽取。

到了 webpack4 之后，利用了 SplitChunksPlugin 插件来进行公共模块抽取，所以以下只针对 SplitChunksPlugin 插件进行说明。


### Scope Hoisting
Scope Hoisting 会分析出模块之间的依赖关系，尽可能的把打包出来的模块合并到一个函数中去。

比如我们希望打包两个文件
```
// test.js
export const a = 1
// index.js
import { a } from './test.js'
```
对于这种情况，我们打包出来的代码会类似这样
```
[
  /* 0 */
  function (module, exports, require) {
    //...
  },
  /* 1 */
  function (module, exports, require) {
    //...
  }
]
```
但是如果我们使用 Scope Hoisting 的话，代码就会尽可能的合并到一个函数中去，也就变成了这样的类似代码

```
[
  /* 0 */
  function (module, exports, require) {
    //...
  }
]
```
这样的打包方式生成的代码明显比之前的少多了。如果在 Webpack4 中你希望开启这个功能，只需要启用 optimization.concatenateModules 就可以了。
```
module.exports = {
  optimization: {
    concatenateModules: true
  }
}
```

### Tree Shaking
Tree Shaking 可以实现删除项目中未被引用的代码，比如
```
// test.js
export const a = 1
export const b = 2
// index.js
import { a } from './test.js'
```
对于以上情况，test 文件中的变量 b 如果没有在项目中使用到的话，就不会被打包到文件中。

如果你使用 Webpack 4 的话，开启生产环境就会自动启动这个优化功能。

### 外围扩展 externals

> externals 用于排除一些引入的模块，不进行打包，引用外部的模块。

 

通常，我们这样引入vue模块
```
import vue from 'vue'
```

但是我们映入了CDN就不要再打包这个模块了，所以通过 externals 来排除这个模块
```
externals: {
  vue: 'vue'
}
```