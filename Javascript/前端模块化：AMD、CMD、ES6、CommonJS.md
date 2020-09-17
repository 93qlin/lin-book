## 1、CommonJs
Nodejs是Commonjs的主要实践者，它有四个重要的环境变量为模块化提供支持。module、export、require、global。在实际的使用中，使用module.exports定义当前模块对外输出接口，用require加载模块。

```
// 定义模块math.js
var basicNum = 0;
function add(a, b) {
  return a + b;
}
module.exports = { //在这里写上需要向外暴露的函数、变量
  add: add,
  basicNum: basicNum
}
```

```
// 引用自定义的模块时，参数包含路径，可省略.js
var math = require('./math');
math.add(2, 5);

// 引用核心模块时，不需要带路径
var http = require('http');
http.createService(...).listen(3000);

```

Commonjs采用同步的方式进行加载模块，在服务端，模块文件存储在本地磁盘，读取很快，所以这样是不会有问题的，但是在浏览器中，由于网络等原因，更合理的方法是使用异步加载的方法。

## 2、AMD和require.js
AMD采用异步的模块加载机制，它的加载不影响后面文件的加载，所有依赖这个模块的语句都放在一个回调函数里面，等到所有都加载完成，才执行这个回调函数，AMD是在require.js(原理：jsonp异步加载模块，执行回调)推广过程的产物，推崇依赖前置，提前执行。即使没有用到的模块，也提前加载了。requie采用require.config()定义模块路径，define()定义依赖模块，使用require加载模块。
```
/** 网页中引入require.js及main.js **/
<script src="js/require.js" data-main="js/main"></script>

/** main.js 入口文件/主模块 **/
// 首先用config()指定各模块路径和引用名
require.config({
  baseUrl: "js/lib",
  paths: {
    "jquery": "jquery.min",  //实际路径为js/lib/jquery.min.js
    "underscore": "underscore.min",
  }
});
// 执行基本操作
require(["jquery","underscore"],function($,_){
  // some code here
});

```

## 3、CMD和sea.js
CMD是另一种模块加载机制，它和AMD很像，不同点在于，AMD采用依赖前置，提前加载，CMD采用依赖就近，延迟执行，CMD是在sea.js推广过程的产物。

```
/** AMD写法 **/
define(["a", "b", "c", "d", "e", "f"], function(a, b, c, d, e, f) { 
     // 等于在最前面声明并初始化了要用到的所有模块
    a.doSomething();
    if (false) {
        // 即便没用到某个模块 b，但 b 还是提前执行了
        b.doSomething()
    } 
});

/** CMD写法 **/
define(function(require, exports, module) {
    var a = require('./a'); //在需要时申明
    a.doSomething();
    if (false) {
        var b = require('./b');
        b.doSomething();
    }
});

/** sea.js **/
// 定义模块 math.js
define(function(require, exports, module) {
    var $ = require('jquery.js');
    var add = function(a,b){
        return a+b;
    }
    exports.add = add;
});
// 加载模块
seajs.use(['math.js'], function(math){
    var sum = math.add(1+2);
});

```
## 4、ES6模块系统
ES6在语言标准层面上，实现了模块功能，意在实现服务器端和浏览器端统一的模块解决方法，ES6的模块系统，主要右两个命令组成，export和import，export规范对外的接口，import引用其他模块功能。ES6模块不是对象，import命令背会javaScript引擎静态分享，在编译时引用模块，而不是在运行时。
```
/** 定义模块 math.js **/
var basicNum = 0;
var add = function (a, b) {
    return a + b;
};
export { basicNum, add };

/** 引用模块 **/
import { basicNum, add } from './math';
function test(ele) {
    ele.textContent = add(99 + basicNum);
}

```
## 5、ES6模块系统和Commonjs的差异

ES6模块系统输出的是值得引用，而Commonjs输出的是值的拷贝。


Commonjs输出的是值得拷贝。一旦输出，模块内部的变化将不会影响到这个输出值。
ES6模块系统，是javaScript引擎的静态分析，使用import引用产生一个引用，在真正加载到这个引用的时候才会去模块里面加载值。


ES6模块系统是编译时输出接口，Commonjs是在加载时输出。


运行时加载：Commonjs是一个对象，即在输入时先加载整个模块，生成一个对象，然后在从这个对象读取方法。
编译时加载：ES6模块系统不是对象，而是通过export显示的输出指定的代码。import时采用静态命令形式。记在import可以指定某个输出值，而不是整个文件。

