webpack4AndReact
## 基本概念
### plugin、loader:
- plugin: 扩张webpack功能的
- loader: 转换文件（js, css, 图片）

### npm install XX
--save-dev 是你开发时候依赖的东西，--save 是你发布之后还依赖的东西。

### yarn add XX
- yarn add [package]@[version]
这将安装您的dependencies中的一个或多个包。
- 用 --dev 或 -D 会在 devDependencies 里安装一个或多个包。
- yarn global add <package...>全局安装依赖。

### model: 模式配置
> 可设置的值为mode：none，development或production（默认值）

> 只需mode在配置中提供选项：

```
module.exports = {
  mode: 'production'
};
```
> 或者将其作为CLI参数传递：

```
webpack --mode=production
```

### init项目
- 创建文件夹并进入

```
mkdir webpack4+react && cd webpack4+react
mkdir src && touch ./src/index.js
```

src/index.js 添加内容

```
 /*使用es6的箭头函数*/
    var func = str => {
        document.getElementById('app').innerHTML = str;
    };
    func('使用Babel!');
```
- dist文件夹下面新建一个index.html

touch ./dist/index.html

dist/index.html填写内容

```
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<div id="app"></div>
<script type="text/javascript" src="./main.js" charset="utf-8"></script>
</body>
</html>
```


## Getting Start

### 现在项目中装两个插件
```
npm install webpack webpack-cli --save-dev
```
#### 全局安装webapck的问题
```
The following NPM installation will make webpack available globally:
npm install --global webpack
Note that this is not a recommended practice. Installing globally locks you down to a specific version of webpack and could fail in projects that use a different version.
```

### 命令来指定打包文件到指定文件夹
加--config 可以查看详细的报错信息，便于排查错误
```
webpack --mode=development ./src/hello.js --output ./build/main.js
```
### 命令很麻烦，所以需要配置文件package.json

```
npm init -y(-y的意思是不需要回车)
```

> 全局安装webpack会锁定webpack版本，当我们运行不同版本的webpack项目时会有问题
> 两种方法

1. 自定义命令 devnow**
```
"scripts": {
    "devnow": "./node_modules/webpack/bin/webpack.js --mode=development",
  }
```
2. 安装npx解决这个问题 **
> 只要是可执行文件前面都可以加npx,他首先会在当前项目里找不到就去全局找

```
npm install -g npx
```

```
"scripts": {
    "devnpx": "npx webpack --mode=development"
  },
```


### webpack默认的配制文件（webpack.config.js）（全部自定义命令配置的话很长，不好看），

1. 直接建个 webpack.config.js,因为webpack会默认去找这个文件。
```
moduls.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'), // __dirname: node.js里__dirname 总是指向被执行 js 文件的绝对路径所以当你在 /d1/d2/myscript.js 文件中写了 __dirname， 它的值就是 /d1/d2 。
    filename: "app.bundle.js"
  }
}
```
2. 然后自定义的命令就可以删了（删了devnpx命令里的--mode=development）
```
"scripts": {
    "devnpx": "npx webpack",
    "dev": "webpack --mode=development",
    "build": "webpack --mode=production"
  },
```

#### 配置多入口文件
编译多个js文件

```
const path = require('path')
module.exports = {
  mode: "development",
  entry:{
    app: "./src/index.js",
    hello: './src/hello.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: "[name].bundle.js"   // name是入口文件的名字作为key
  }
}
```
## 基础的babel相关
### 安装babel(js转换插件为了解决低版本的浏览器不支持新的js语法)
```
@babel/core babel核心插件调用Babel的API进行转码
babel-loader webpack和babel结合插件
@babel/preset-react 用于解析 JSX
@babel/preset-env 用于解析 JSX 根据配置的目标浏览器或者运行环境来自动将ES2015+的代码转换为es5。

@babel/polifill bable能转换一些语法，但是一些新的api不能处理（Promise，，，）
原理： 往windows全局对象导入一些内容

@babel/runtime 解决polifill全局污染的问题

@babel/plugin-transform-runtime 作用是避免重复的问题

@babel/runtime-corejs2 依赖corejs需在babel里指定版本

npm install --save-dev babel-loader @babel/core  @babel/preset-env @babel/preset-react @babel/polifil @babel/runtime @babel/plugin-transform-runtime @babel/runtime-corejs2
```

#### babel的插件介绍（plugin）

```
arrow-functions
block-scoped-functions
block-scoping
classes
computed-properties
destructuring
duplicate-keys
for-of
function-name
instanceof
```

##### babel插件两种使用方法举例说明

```
.babelrc（项目根目录新建此文件，然后复制进去）

Without options:

{
  "plugins": ["@babel/plugin-transform-arrow-functions"]
}
```
```
With options:  （在webpack配置文件里加）

<!-- {
  "plugins": [
    ["@babel/plugin-transform-arrow-functions", { "spec": true }]
  ]
} -->

module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          plugins: ['@babel/plugin-proposal-object-rest-spread']
        }
      }
    }
  ]
}
```

#### @babel/preset-env babel (preset)预设
> 作用： 解决每写一个js新语法都装一个插件比如箭头函数，class,
bable-env// 不包含装饰器插件，所以es6装饰器可能要加装
```
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env',{debug: true}], //预设,包含某些es6常用插件,debug可以看到预设了那些插件
        }
      }
    }
  ]
}
```
#### @babel/polifill

bable能转换一些语法，但是一些新的api不能处理（Promise，，，）
原理： 往windows全局对象导入一些内容

```
// 安装略
{
  "presets": [["@babel/preset-env",{"debug": true, "useBuiltIns": "usage","corejs": "3.0.0"}]],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
  ]
}
```
**注意**
> 1."useBuiltIns": "usage" //按需编译

```
[/Users/qinlin/Desktop/webpack/hello-webpack-4/src/index.js] Added following core-js polyfills:
  es.array.from {}
  es.object.assign {}
  es.object.to-string {}
  es.promise {}
  es.string.iterator {}
```

> "corejs": "3.0.0"它依赖corejs需指定版本不然会报错

#### @babel/runtime
>  解决polifill全局污染的问题

```
polifill:
ar process = global.process;
var Promise = global.Promise;
```

所以不太好

> 用法：

```
npm install --save @babel/runtime
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime-corejs2
```

#### @babel/plugin-transform-runtime的作用是避免重复的问题
比如：

```
function _classCallCheck(instance, Constructor) {
  //...
}

var Circle = function Circle() {
  _classCallCheck(this, Circle);
};
```
变为
```
var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var Circle = function Circle() {
  _classCallCheck(this, Circle);
};
```
配置一下.babelrc
```
{
  "presets": [
    [
      "@babel/preset-env",{"debug": true}
    ],
    [
      "@babel/preset-react"
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-proposal-decorators", { "legacy": true }
    ],
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": 2,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}

```

## plugin(插件作用扩展webpack功能)

### html-webpack-plugin
>可以自动生成html,可以解决浏览器缓存问题，因为每次文件名都会更新，自动把js插入到你的模板html里面去
```
npm i --save-dev html-webpack-plugin
```

新建模板index.html
cd src
touch index.html
src/index.html
```
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<div id="app"></div>
</body>
</html>
```

webpack.config.js

```
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  ....
  plugins: [
    new HtmlWebpackPlugin()
  ]
}

```

**可以加参数**

```
new HtmlWebpackPlugin({
  title: 'app',
  filename: 'app/index.html',  // 放在dist/app目录下
  template: path.join(__dirname, 'src/index.html'),  // 模板文件          
  
})
```

**配资多个html**
webpack.config.js

```
entry:{
    app: "./src/index.js",
    more: "./src/moreIndex.js",
  },
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: "[name]/[name].bundle.js"   // name是入口文件的名字作为key,生成dist/name/nameXX.JS
  },
....
plugins: [
  new HtmlWebpackPlugin({
    title: 'app',
    filename: 'app/index.html',
    template: 'public/index.html',
    chunks: ["app","more"]
  }),
  new HtmlWebpackPlugin({
    title: 'index',
    filename: 'app/index.html',
    template: 'public/index.html',
    chunks: ["more"]
  })
]
```

生成的app

```
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<div id="app"></div
    <script type="text/javascript" src="../app/app.bundle.js"></script>
    <script type="text/javascript" src="../more/more.bundle.js"></script></body>
</html>
```

##### 删除注释

```
minify: {
    removeComments: true // 删除注释
}
```
#### css相关处理
```
npm install css-loader sass-loader node-sass style-loader  postcss-loader postcss-cssnext --save-dev
```
less等略
##### PostCSS
他有很多很多的插件，比如：
Autoprefixer这个插件,可以自动给css属性加浏览器前缀。
```
/*编译前*/
.container{
    display: flex;
}
/*编译后*/
.container{
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
}
```
###### postcss-cssnext 允许你使用未来的 CSS 特性（包括 autoprefixer）

当然，它有很多很多的插件可以用，你可以去官网详细了解。我们今天只用postcss-cssnext。（它包含了autoprefixer）
> webapck.config.js
```
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  // mode: "development",
  entry:{
    // app: ["@babel/polyfill","./src/index.js"],
    app: "./src/index.js",
    app: './src/hello.js'
  },
  devtool: false,
  output: {
    path: path.resolve(__dirname, 'dist'), // __dirname: node.js里__dirname 总是指向被执行 js 文件的绝对路径所以当你在 /d1/d2/myscript.js 文件中写了 __dirname， 它的值就是 /d1/d2 。
    filename: "[name]/[hash].bundle.js",   // name是入口文件的名字作为key
    // chunkFilename: "[name]-[hash].[id].bundle.js",   // name是入口文件的名字作为key
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: [['@babel/preset-env',{debug: true}]], //预设,包含某些es6常用插件,debug可以看到预设了那些插件
          // }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],  // 右边到左边执行css => style
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'app',
      filename: 'app/index.html',
      template: 'public/index.html',
      chunks: ["app"]
    }),
    new HtmlWebpackPlugin({
      title: 'index',
      filename: 'app/index.html',
      template: 'public/index.html',
      chunks: ["app"]
    })
  ]
}
```
#### mini-css-extract-plugin把js释放css文件

```
 npm install --save-dev mini-css-extract-plugin
```

webpack.config.js

```

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }
    ]
  }
}
```

#### webpack-dev-server(开启一个本地服务器，热加载，自动打开浏览器)

```
npm install webpack-dev-server --save-dev
```

```
"devnpx": "npx webpack-dev-server --open",
```

#### clean-webpack-plugin(清空之前生成的hash文件)

```
npm install --save-dev clean-webpack-plugin
```

```
npm install -g serve
```

```
let pathToClean = ['dist']
....
new CleanWebpackPlugin({pathToClean:pathToClean})

```

执行命令

```
serve -s dist
```

#### 处理图片

```
npm install file-loader --save-dev
```

#### 压缩图片

```
npm install image-webpack-loader --save-dev
```

查看文件体积命令
ls -lh src

最终webpack.config.js

```
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'
const CleanWebpackPlugin = require('clean-webpack-plugin');
let pathToClean = ['dist']
module.exports = {
  // mode: "development",
  entry:{
    // app: ["@babel/polyfill","./src/index.js"],
    app: "./src/index.js",
    app: './src/hello.js'
  },
  devtool: false,
  output: {
    path: path.resolve(__dirname, 'dist'), // __dirname: node.js里__dirname 总是指向被执行 js 文件的绝对路径所以当你在 /d1/d2/myscript.js 文件中写了 __dirname， 它的值就是 /d1/d2 。
    // filename: "[name]/[hash].bundle.js",   // name是入口文件的名字作为key
    filename: "js/[name]-[hash].bundle.js",   // name是入口文件的名字作为key
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: [['@babel/preset-env',{debug: true}]], //预设,包含某些es6常用插件,debug可以看到预设了那些插件
          // }
        }
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader'
        ],  // 右边到左边执行css => style
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader, // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            }
          },
          {
            loader: 'image-webpack-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'app',
      filename: 'app.html',
      template: 'public/index.html',
      chunks: ["app"]
    }),
    new HtmlWebpackPlugin({
      title: 'index',
      filename: 'index.html',
      template: 'public/index.html',
      chunks: ["app"]
    }),
    new HtmlWebpackPlugin({
      title: 'index',
      filename: 'index.html',
      template: 'public/index.html',
      chunks: ["app"]
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
    }),
    new CleanWebpackPlugin({pathToClean:pathToClean})
  ]
}
```

.babelrc

```
{
  "presets": [
    [
      "@babel/preset-env",{"debug": true}
    ],
    [
      "@babel/preset-react"
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-proposal-decorators", { "legacy": true }
    ],
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": 2,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```

## 搭建react环境
>@babel/preset-react前面已经安装过了。.babelrc也配置过了

```
npm install react react-dom
```

```
修改 src/index.js使用react

import React from 'react';
import ReactDom from 'react-dom';

ReactDom.render(
    <div>Hello React!</div>, document.getElementById('app'));
```

执行打包命令npm run build

打开index.html 看效果。

我们简单做下改进，把Hello React放到组件里面。体现组件化~

```
cd src
mkdir component
cd component
mkdir Hello
cd Hello
touch Hello.js
```

按照React语法，写一个Hello组件


```
import React, {Component} from 'react';

export default class Hello extends Component {
    render() {
        return (
            <div>
                Hello,React!
            </div>
        )
    }
}
```

然后让我们修改src/index.js，引用Hello组件！

src/index.js

```
import React from 'react';
import ReactDom from 'react-dom';
import Hello from './component/Hello/Hello';

ReactDom.render(
    <Hello/>, document.getElementById('app'));
```

在根目录执行打包命令

```
yarn build
```

打开index.html看效果

## react-router
react-router-dom中package.json依赖:

```
"dependencies": {
    "history": "^4.7.2",
    "invariant": "^2.2.2",
    "loose-envify": "^1.3.1",
    "prop-types": "^15.5.4",
    "react-router": "^4.2.0",
    "warning": "^3.0.0"
  }
```

安装了react-router-dom，npm会解析并安装上述依赖包。可以看到，其中包括react-router。

```
npm install --save react-router-dom
```

cd src
mkdir router && touch router/router.js
按照react-router文档编辑一个最基本的router.js。包含两个页面home和page1。

src/router/router.js

```
import React from 'react';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Home from '../pages/Home/Home';
import Page1 from '../pages/Page1/Page1';


const getRouter = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/page1">Page1</Link></li>
            </ul>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/page1" component={Page1}/>
            </Switch>
        </div>
    </Router>
);

export default getRouter;
```

新建页面文件夹

```
cd src
mkdir pages
```

新建两个页面 Home,Page1

```
cd src/pages
mkdir Home && touch Home/Home.js
mkdir Page1 && touch Page1/Page1.js
```

填充内容：

```
src/pages/Home/Home.js

import React, {Component} from 'react';

export default class Home extends Component {
    render() {
        return (
            <div>
                this is home~
            </div>
        )
    }
}
```

Page1.js

```
import React, {Component} from 'react';

export default class Page1 extends Component {
    render() {
        return (
            <div>
                this is Page1~
            </div>
        )
    }
}
```

现在路由和页面建好了，我们在入口文件src/index.js引用Router。

修改src/index.js

```
import React from 'react';
import ReactDom from 'react-dom';

import getRouter from './router/router';

ReactDom.render(
    getRouter(), document.getElementById('app'));
```

现在执行打包命令npm run dev-build。打开index.html查看效果啦！

那么问题来了~我们发现点击‘首页’和‘Page1’没有反应。不要惊慌，这是正常的。

我们之前一直用这个路径访问index.html，类似这样：file:///F:/react/react-family/dist/index.html。
这种路径了，不是我们想象中的路由那样的路径http://localhost:3000~我们需要配置一个简单的WEB服务器，指向
index.html~有下面两种方法来实现

- Nginx, Apache, IIS等配置启动一个简单的的WEB服务器。
- 使用webpack-dev-server来配置启动WEB服务器。
## webpack-dev-server
>简单来说，webpack-dev-server就是一个小型的静态文件服务器。使用它，可以为webpack打包生成的资源文件提供Web服务。

npm install webpack-dev-server -g

修改webpack.config.js,增加webpack-dev-server的配置。

webpack.config.js

```
    devServer: {
        contentBase: path.join(__dirname, './dist/app')
    }
```

现在执行

```
webpack-dev-server --config webpack.config.js
```

浏览器打开http://localhost:8080，OK,现在我们可以点击首页,Page1了，
看URL地址变化啦！我们看到react-router已经成功了哦。

Q: --content-base是什么？

A：URL的根目录。如果不设定的话，默认指向项目根目录。

重要提示：webpack-dev-server编译后的文件，都存储在内存中，我们并不能看见的。你可以删除之前遗留的文件dist/bundle.js，
仍然能正常打开网站！

每次执行webpack-dev-server webpack.config.js,要打很长的命令，我们修改package.json，增加script->start:

```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "start": "webpack-dev-server"
  }
```

下次执行npm start就可以了。

既然用到了webpack-dev-server，我们就看看它的其他的配置项。
看了之后，发现有几个我们可以用的。

- color（CLI only） console中打印彩色日志
- historyApiFallback 任意的404响应都被替代为index.html。有什么用呢？你现在运行
npm start，然后打开浏览器，访问http://localhost:8080,然后点击Page1到链接http://localhost:8080/page1，
然后刷新页面试试。是不是发现刷新后404了。为什么？dist文件夹里面并没有page1.html,当然会404了，所以我们需要配置
historyApiFallback，让所有的404定位到index.html。
- host 指定一个host,默认是localhost。如果你希望服务器外部可以访问，指定如下：host: "0.0.0.0"。比如你用手机通过IP访问。
- hot 启用Webpack的模块热替换特性。关于热模块替换，我下一小节专门讲解一下。
- port 配置要监听的端口。默认就是我们现在使用的8080端口。
- proxy 代理。比如在 localhost:3000 上有后端服务的话，你可以这样启用代理：
```
    proxy: {
      "/api": "http://localhost:3000"
    }
```
- progress（CLI only） 将编译进度输出到控制台。
根据这几个配置，修改下我们的webpack-dev-server的配置~

webpack.config.js
```
    devServer: {
        port: 8080,
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        host: '0.0.0.0'
    }
```
CLI ONLY的需要在命令行中配置

package.json
```
"start": "webpack-dev-server --color --progress"
```
现在我们执行npm start 看看效果。是不是看到打包的时候有百分比进度？在http://localhost:8080/page1页面刷新是不是没问题了？
用手机通过局域网IP是否可以访问到网站？
### Entrypoint undefined = app/index.html
在module.exports加
```
stats: {
    children: false
},
```
参考地址：

https://segmentfault.com/a/1190000006670084
https://webpack.js.org/guides/development/#using-webpack-dev-server
## 全局变量.env https://blog.csdn.net/weixin_43206949/article/details/99460759
## 模块热替换（Hot Module Replacement）
- 模块热替换（Hot Module Replacement）
>到目前，当我们修改代码的时候，浏览器会自动刷新，不信你可以去试试。（如果你的不会刷新，看看这个调整文本编辑器）

>我相信看这个教程的人，应该用过别人的框架。我们在修改代码的时候，浏览器不会刷新，只会更新自己修改的那一块。我们也要实现这个效果。

我们看下webpack模块热替换教程。

我们接下来要这么修改

package.json 增加 --hot
```
"start": "webpack-dev-server --config webpack.dev.config.js --color --progress --hot"
```
src/index.js 增加module.hot.accept(),如下。当模块更新的时候，通知index.js。

src/index.js
```
import React from 'react';
import ReactDom from 'react-dom';

import getRouter from './router/router';

if (module.hot) {
    module.hot.accept();
}

ReactDom.render(
    getRouter(), document.getElementById('app'));
```
现在我们执行npm start，打开浏览器，修改Home.js,看是不是不刷新页面的情况下，内容更新了？惊不惊喜？意不意外？

做模块热替换，我们只改了几行代码，非常简单的。纸老虎一个~

现在我需要说明下我们命令行使用的--hot，可以通过配置webpack.dev.config.js来替换，
向文档上那样,修改下面三处。但我们还是用--hot吧。下面的方式我们知道一下就行，我们不用。同样的效果。
```
const webpack = require('webpack');

devServer: {
    hot: true
}

plugins:[
     new webpack.HotModuleReplacementPlugin()
]
```
HRM配置其实有两种方式，一种CLI方式，一种Node.js API方式。我们用到的就是CLI方式，比较简单。
Node.js API方式，就是建一个server.js等等，网上大部分教程都是这种方式，这里不做讲解了。

你以为模块热替换到这里就结束了？nonono~

上面的配置对react模块的支持不是很好哦。

例如下面的demo，当模块热替换的时候，state会重置，这不是我们想要的。

修改Home.js,增加计数state

src/pages/Home/Home.js
```
import React, {Component} from 'react';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    _handleClick() {
        this.setState({
            count: ++this.state.count
        });
    }

    render() {
        return (
            <div>
                this is home~<br/>
                当前计数：{this.state.count}<br/>
                <button onClick={() => this._handleClick()}>自增</button>
            </div>
        )
    }
}
```
你可以测试一下，当我们修改代码的时候，webpack在更新页面的时候，也把count初始为0了。

为了在react模块更新的同时，能保留state等页面中其他状态，我们需要引入react-hot-loader~

Q:　请问webpack-dev-server与react-hot-loader两者的热替换有什么区别？

A: 区别在于webpack-dev-server自己的--hot模式只能即时刷新页面，但状态保存不住。因为React有一些自己语法(JSX)是HotModuleReplacementPlugin搞不定的。
而react-hot-loader在--hot基础上做了额外的处理，来保证状态可以存下来。（来自segmentfault）

下面我们来加入react-hot-loader v3,

安装依赖
```
npm install react-hot-loader@next --save-dev
```
根据文档，
我们要做如下几个修改~
```
.babelrc 增加 react-hot-loader/babel
.babelrc

{
  "presets": [
    "es2015",
    "react",
    "stage-0"
  ],
  "plugins": [
    "react-hot-loader/babel"
  ]
}
```
webpack.dev.config.js入口增加react-hot-loader/patch
webpack.dev.config.js
```
    entry: [
        'react-hot-loader/patch',
        path.join(__dirname, 'src/index.js')
    ]
```
src/index.js修改如下
```
src/index.js

import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import getRouter from './router/router';

/*初始化*/
renderWithHotReload(getRouter());

/*热更新*/
if (module.hot) {
    module.hot.accept('./router/router', () => {
        const getRouter = require('./router/router').default;
        renderWithHotReload(getRouter());
    });
}

function renderWithHotReload(RootElement) {
    ReactDom.render(
        <AppContainer>
            {RootElement}
        </AppContainer>,
        document.getElementById('app')
    )
}
```
现在，执行npm start，试试。是不是修改页面的时候，state不更新了？

参考文章：

gaearon/react-hot-loader#243

## redux
接下来，我们就要就要就要集成redux了。

要对redux有一个大概的认识，可以阅读阮一峰前辈的Redux 入门教程（一）：基本用法

如果要对redux有一个非常详细的认识，我推荐阅读中文文档，写的非常好。读了这个教程，有一个非常深刻的感觉，redux并没有任何魔法。

不要被各种关于 reducers, middleware, store 的演讲所蒙蔽 ---- Redux 实际是非常简单的。

当然，我这篇文章是写给新手的，如果看不懂上面的文章，或者不想看，没关系。先会用，多用用就知道原理了。

开始整代码！我们就做一个最简单的计数器。自增，自减，重置。

先安装
```
redux npm install --save redux
```
初始化目录结构
```
cd src
mkdir redux
cd redux
mkdir actions
mkdir reducers
touch reducers.js
touch store.js
touch actions/counter.js
touch reducers/counter.js
```
先来写action创建函数。通过action创建函数，可以创建action~
src/redux/actions/counter.js
```
/*action*/

export const INCREMENT = "counter/INCREMENT";
export const DECREMENT = "counter/DECREMENT";
export const RESET = "counter/RESET";

export function increment() {
    return {type: INCREMENT}
}

export function decrement() {
    return {type: DECREMENT}
}

export function reset() {
    return {type: RESET}
}
```
再来写reducer,reducer是一个纯函数，接收action和旧的state,生成新的state.

src/redux/reducers/counter.js
```
import {INCREMENT, DECREMENT, RESET} from '../actions/counter';

/*
* 初始化state
 */

const initState = {
    count: 0
};
/*
* reducer
 */
export default function reducer(state = initState, action) {
    switch (action.type) {
        case INCREMENT:
            return {
                count: state.count + 1
            };
        case DECREMENT:
            return {
                count: state.count - 1
            };
        case RESET:
            return {count: 0};
        default:
            return state
    }
}
```
一个项目有很多的reducers,我们要把他们整合到一起

src/redux/reducers.js
```
import counter from './reducers/counter';

export default function combineReducers(state = {}, action) {
    return {
        counter: counter(state.counter, action)
    }
}
```
到这里，我们必须再理解下一句话。

reducer就是纯函数，接收state 和 action，然后返回一个新的 state。

看看上面的代码，无论是combineReducers函数也好，还是reducer函数也好，都是接收state和action，
返回更新后的state。区别就是combineReducers函数是处理整棵树，reducer函数是处理树的某一点。

接下来，我们要创建一个store。

前面我们可以使用 action 来描述“发生了什么”，使用action创建函数来返回action。

还可以使用 reducers 来根据 action 更新 state 。

那我们如何提交action？提交的时候，怎么才能触发reducers呢？

store 就是把它们联系到一起的对象。store 有以下职责：
```
维持应用的 state；
提供 getState() 方法获取 state；
提供 dispatch(action) 触发reducers方法更新 state；
通过 subscribe(listener) 注册监听器;
通过 subscribe(listener) 返回的函数注销监听器。
```
src/redux/store.js
```
import {createStore} from 'redux';
import combineReducers from './reducers.js';

let store = createStore(combineReducers);

export default store;
```
到现在为止，我们已经可以使用redux了~

下面我们就简单的测试下

cd src
cd redux
touch testRedux.js

src/redux/testRedux.js
```
import {increment, decrement, reset} from './actions/counter';

import store from './store';

// 打印初始状态
console.log(store.getState());

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
let unsubscribe = store.subscribe(() =>
    console.log(store.getState())
);

// 发起一系列 action
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(reset());

// 停止监听 state 更新
unsubscribe();
```
当前文件夹执行命令
```
webpack testRedux.js

node XXX.js
```
是不是看到输出了state变化？
```
{ counter: { count: 0 } }
{ counter: { count: 1 } }
{ counter: { count: 0 } }
{ counter: { count: 0 } }

```
做这个测试，就是为了告诉大家，redux和react没关系，虽说他俩能合作。

到这里，我建议你再理下redux的数据流，看看这里。

- 调用store.dispatch(action)提交action。
- redux store调用传入的reducer函数。把当前的state和action传进去。
- 根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树。
- Redux store 保存了根 reducer 返回的完整 state 树。
就是酱紫~~

这会webpack.dev.config.js路径别名增加一下，后面好写了。

webpack.dev.config.js
```
          alias: {
              ...
              actions: path.join(__dirname, 'src/redux/actions'),
              reducers: path.join(__dirname, 'src/redux/reducers'),
          }
  ```
把前面的相对路径都改改。

### 下面我们开始搭配react使用。

写一个Counter页面
```
cd src/pages
mkdir Counter
touch Counter/Counter.js
```
src/pages/Counter/Counter.js
```
import React, {Component} from 'react';

export default class Counter extends Component {
    render() {
        return (
            <div>
                <div>当前计数为(显示redux计数)</div>
                <button onClick={() => {
                    console.log('调用自增函数');
                }}>自增
                </button>
                <button onClick={() => {
                    console.log('调用自减函数');
                }}>自减
                </button>
                <button onClick={() => {
                    console.log('调用重置函数');
                }}>重置
                </button>
            </div>
        )
    }
}
```
修改路由，增加Counter

src/router/router.js
```
import React from 'react';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Home from 'pages/Home/Home';
import Page1 from 'pages/Page1/Page1';
import Counter from 'pages/Counter/Counter';

const getRouter = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/page1">Page1</Link></li>
                <li><Link to="/counter">Counter</Link></li>
            </ul>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/page1" component={Page1}/>
                <Route path="/counter" component={Counter}/>
            </Switch>
        </div>
    </Router>
);

export default getRouter;
```
npm start看看效果。

下一步，我们让Counter组件和Redux联合起来。使Counter能获得到Redux的state，并且能发射action。

当然我们可以使用刚才测试testRedux的方法，手动监听~手动引入store~但是这肯定很麻烦哦。

react-redux提供了一个方法connect。

> 容器组件就是使用 store.subscribe() 从 Redux state 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件。你可以手工来开发容器组件，但建议使用 React Redux 库的 connect() 方法来生成，这个方法做了性能优化来避免很多不必要的重复渲染。

connect接收两个参数，一个mapStateToProps,就是把redux的state，转为组件的Props，还有一个参数是mapDispatchToprops,
就是把发射actions的方法，转为Props属性函数。

先来安装react-redux
```
npm install --save react-redux
```

src/pages/Counter/Counter.js
```
import React, {Component} from 'react';
import {increment, decrement, reset} from 'actions/counter';

import {connect} from 'react-redux';

class Counter extends Component {
    render() {
        return (
            <div>
                <div>当前计数为{this.props.counter.count}</div>
                <button onClick={() => this.props.increment()}>自增
                </button>
                <button onClick={() => this.props.decrement()}>自减
                </button>
                <button onClick={() => this.props.reset()}>重置
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => {
            dispatch(increment())
        },
        decrement: () => {
            dispatch(decrement())
        },
        reset: () => {
            dispatch(reset())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```
### 下面我们要传入store

> 所有容器组件都可以访问 Redux store，所以可以手动监听它。一种方式是把它以 props 的形式传入到所有容器组件中。但这太麻烦了，因为必须要用 store 把展示组件包裹一层，仅仅是因为恰好在组件树中渲染了一个容器组件。

建议的方式是使用指定的 React Redux 组件 来 魔法般的 让所有容器组件都可以访问 store，而不必显示地传递它。只需要在渲染根组件时使用即可。

src/index.js
```
import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import store from './redux/store';

import getRouter from 'router/router';

/*初始化*/
renderWithHotReload(getRouter());

/*热更新*/
if (module.hot) {
    module.hot.accept('./router/router', () => {
        const getRouter = require('router/router').default;
        renderWithHotReload(getRouter());
    });
}

function renderWithHotReload(RootElement) {
    ReactDom.render(
        <AppContainer>
            <Provider store={store}>
                {RootElement}
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    )
}
```
到这里我们就可以执行npm start，打开localhost:8080/counter看效果了。

现在你可以npm start去看效果了。

这里我们再缕下（[可以读React 实践心得：react-redux 之 connect 方法详解](https://fed.taobao.org/)）

- Provider组件是让所有的组件可以访问到store。不用手动去传。也不用手动去监听。
- connect函数作用是从 Redux state 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件。也传递dispatch(action)函数到props。



##  异步
中间件的作用就是：

>转换异步操作，生成原始的action，这样，reducer函数就能处理相应的action，从而改变state，更新UI。

## 