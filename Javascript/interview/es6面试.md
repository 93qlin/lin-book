&emsp;[1、es5和es6的区别，说一下你所知道的es6](#j1)
&emsp;[2、var、let、const之间的区别](#j2)
&emsp;[3、使用class 手写一个promise](#j3)
&emsp;[4、理解 async/await以及对Generator的优势](#j4)
&emsp;[5、forEach、for in、for of三者区别](#j5)
&emsp;[6、promise和async await的区别](#j6)




<h2 id='j1'>1、es5和es6的区别，说一下你所知道的es6</h2>

- ECMAScript5，即ES5，是ECMAScript的第五次修订，于2009年完成标准化

- ECMAScript6，即ES6，是ECMAScript的第六次修订，于2015年完成，也称ES2015

- ES6是继ES5之后的一次改进，相对于ES5更加简洁，提高了开发效率

### ES6新增的一些特性：

- 1）let声明变量和const声明常量，两个都有块级作用域
　　ES5中是没有块级作用域的，并且var有变量提升，在let中，使用的变量一定要进行声明

- 2）箭头函数
　　ES6中的函数定义不再使用关键字function()，而是利用了()=>来进行定义

- 3）模板字符串
　　模板字符串是增强版的字符串，用反引号（`）标识，可以当作普通字符串使用，也可以用来定义多行字符串

- 4）解构赋值
　　ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值

- 5）for of循环
　　for...of循环可以遍历数组、Set和Map结构、某些类似数组的对象、对象，以及字符串

- 6）import、export导入导出
　　ES6标准中，Js原生支持模块(module)。将JS代码分割成不同功能的小块进行模块化，将不同功能的代码分别写在不同文件中，各模块只需导出公共接口部分，然后通过模块的导入的方式可以在其他地方使用

- 7）set数据结构
　　Set数据结构，类似数组。所有的数据都是唯一的，没有重复的值。它本身是一个构造函数

- 8）... 展开运算符
　　可以将数组或对象里面的值展开；还可以将多个值收集为一个变量

- 9）修饰器 @
　　decorator是一个函数，用来修改类甚至于是方法的行为。修饰器本质就是编译时执行的函数

- 10）class 类的继承
　　ES6中不再像ES5一样使用原型链实现继承，而是引入Class这个概念

- 11）async、await
　　使用 async/await, 搭配promise,可以通过编写形似同步的代码来处理异步流程, 提高代码的简洁性和可读性
　　async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成

- 12）promise
　　Promise是异步编程的一种解决方案，比传统的解决方案（回调函数和事件）更合理、强大

- 13）Symbol
　　Symbol是一种基本类型。Symbol 通过调用symbol函数产生，它接收一个可选的名字参数，该函数返回的symbol是唯一的

- 14）Proxy代理
　　使用代理（Proxy）监听对象的操作，然后可以做一些相应事情



<h2 id='j2'>2、var、let、const之间的区别</h2>

- var声明变量可以重复声明，而let不可以重复声明

- var是不受限于块级的，而let是受限于块级

- var会与window相映射（会挂一个属性），而let不与window相映射

- var可以在声明的上面访问变量，而let有暂存死区，在声明的上面访问变量会报错

- const声明之后必须赋值，否则会报错

- const定义不可变的量，改变了就会报错

- const和let一样不会与window相映射、支持块级作用域、在声明的上面访问变量会报错


<h2 id='j3'>3、使用class 手写一个promise</h2>


```
  //创建一个Promise的类
  class Promise{
    constructor(executer){//构造函数constructor里面是个执行器
      this.status = 'pending';//默认的状态 pending
      this.value = undefined//成功的值默认undefined
      this.reason = undefined//失败的值默认undefined
      //状态只有在pending时候才能改变
      let resolveFn = value =>{
        //判断只有等待时才能resolve成功
        if(this.status == pending){
          this.status = 'resolve';
          this.value = value;
        }
      }
      //判断只有等待时才能reject失败
      let rejectFn = reason =>{
        if(this.status == pending){
          this.status = 'reject';
          this.reason = reason;
        }
      }    
      try{
        //把resolve和reject两个函数传给执行器executer
        executer(resolve,reject);
      }catch(e){
        reject(e);//失败的话进catch
      }
    }
    then(onFufilled,onReject){
      //如果状态成功调用onFufilled
      if(this.status = 'resolve'){
        onFufilled(this.value);
      }
      //如果状态失败调用onReject
      if(this.status = 'reject'){
        onReject(this.reason);
      }
    }
  } 
```

<h2 id='j4'>4、理解 async/await以及对Generator的优势</h2>



　　 async await 是用来解决异步的，async函数是Generator函数的语法糖

　　使用关键字async来表示，在函数内部使用 await 来表示异步

　　async函数返回一个 Promise 对象，可以使用then方法添加回调函数

　　当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句

　　async较Generator的优势：

　　（1）内置执行器。Generator 函数的执行必须依靠执行器，而 Aysnc 函数自带执行器，调用方式跟普通函数的调用一样

　　（2）更好的语义。async 和 await 相较于 * 和 yield 更加语义化　　

　　（3）更广的适用性。yield命令后面只能是 Thunk 函数或 Promise对象，async函数的await后面可以是Promise也可以是原始类型的值

　　（4）返回值是 Promise。async 函数返回的是 Promise 对象，比Generator函数返回的Iterator对象方便，可以直接使用 then() 方法进行调用


<h2 id='j5'>5、forEach、for in、for of三者区别</h2>

- forEach更多的用来遍历数组
- for in 一般常用来遍历对象或json
- for of数组对象都可以遍历，遍历对象需要通过和Object.keys(),不同于 forEach()，可以使用 break, continue 和 return
- for in循环出的是key，for of循环出的是value


<h2 id='j6'>6、promise和async await的区别</h2>

### 首先说说两者的概念
#### Promise
Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大，简单地说，Promise好比容器，里面存放着一些未来才会执行完毕（异步）的事件的结果，而这些结果一旦生成是无法改变的

#### async await
async await也是异步编程的一种解决方案，他遵循的是Generator 函数的语法糖，他拥有内置执行器，不需要额外的调用直接会自动执行并输出结果，它返回的是一个Promise对象。

#### 两者的区别

Promise的出现解决了传统callback函数导致的“地域回调”问题，但它的语法导致了它向纵向发展行成了一个回调链，遇到复杂的业务场景，这样的语法显然也是不美观的。而async await代码看起来会简洁些，使得异步代码看起来像同步代码，await的本质是可以提供等同于”同步效果“的等待异步返回能力的语法糖，只有这一句代码执行完，才会执行下一句。

async await与Promise一样，是非阻塞的。

async await是基于Promise实现的，可以说是改良版的Promise，它不能用于普通的回调函数。

简单来看，这两者除了语法糖不一样外，他们解决的问题、达到的效果是大同小异的，我们可以在不同的应用场景，根据自己的喜好来选择使用。

### async 函数的实现原理
async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。
```
async function fn(args) {
  // ...
}

// 等同于

function fn(args) {
  return spawn(function* () {
    // ...
  });
}
```
所有的async函数都可以写成上面的第二种形式，其中的spawn函数就是自动执行器。

下面给出spawn函数的实现，基本就是前文自动执行器的翻版。

```
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}
```