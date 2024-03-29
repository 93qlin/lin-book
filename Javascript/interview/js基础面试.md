<html>
<h2>目录</h2>
</html>

&emsp;[1. JavaScript 有哪些数据类型](#j1)

&emsp;[2. 怎么判断不同的JS数据类型](#j2)

&emsp;[3. undefined 和 null 有什么区别](#j3)

&emsp;[4. 数组对象有哪些常用方法](#j4)

&emsp;[5. Js 有哪几种创建对象的方式](#j5)

&emsp;[6. 怎么实现对对象的拷贝(浅拷贝与深拷贝)](#j6)

&emsp;[7. 什么是闭包，为什么要用它](#j7)

&emsp;[8. 介绍一下 JavaScript 原型，原型链，它们有何特点](#j8)

&emsp;[9. JavaScript 如何实现继承](#j9)

&emsp;[10. new 操作符具体干了什么](#j10)

&emsp;[11. 同步和异步的区别，怎么异步加载 JavaScript](#j11)

&emsp;[12. 跨域问题的产生，怎么解决它](#j12)

&emsp;[13. 对 this 的理解](#j13)

&emsp;[14. apply()、call()和 bind() 是做什么的，它们有什么区别](#j14)

&emsp;[15. 什么是内存泄漏，哪些操作会造成内存泄漏](#j15)

&emsp;[16. 什么是事件代理，它的原理是什么](#j16)

&emsp;[17. 对AMD和CMD的理解，它们有什么区别](#j17)

&emsp;[18. 对ES6的了解](#j18)

&emsp;[19. 箭头函数有什么特点](#j19)

&emsp;[20. Promise 对象的了解](#j20)

&emsp;[21. async 函数以及 awit 命令](#j21)

&emsp;[22. export 与 export default有什么区别](#j22)

&emsp;[23. 前端性能优化](#j23)

&emsp;[24. 对JS引擎执行机制的理解](#j24)

&emsp;[25. 事件流](#j25)

&emsp;[26. 事件循环event-loop](#j26)

&emsp;[27. ES6中的class语法的实现？](#j27)

&emsp;[28. ajax原理](#j28)




<h5 id='j1'>1. JavaScript 有哪些数据类型</h5>

6种原始数据类型：
- Boolean: 布尔表示一个逻辑实体，可以有两个值：`true` 和 `false`
- Number: 用于表示数字类型
- String: 用于表示文本数据
- Null: `Null` 类型只有一个值： `null`,特指对象的值未设置
- Undefined: 一个没有被赋值的变量会有个默认值 `undefined`
- Symbol: 符号(Symbols)是ECMAScript第6版新定义的。符号类型是唯一的并且是不可修改的

引用类型：`Object`

详见 [JavaScript的数据类型-MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)

<h5 id='j2'>2. 怎么判断不同的JS数据类型 </h5>

- `typeof`操作符：返回一个字符串，表示未经计算的操作数的类型

> `typeof` 操作符对于简单数据类型，返回其本身的数据类型，函数对象返回 `function` ，其他对象均返回 `Object`

> `null` 返回 `Object`

- instanceof: 用来判断A 是否是 B的实例，表达式为 `A instanceof B`，返回一个`Boolean`类型的值

> `instanceof` **检测的是原型,只能用来判断两个对象是否属于实例关系， 而不能判断一个对象实例具体属于哪种类型**

```js
let a = [];
a instanceof Array  // true
a instanceof Object // true
```
> 变量a 的 `__proto__`  直接指向`Array.prototype`，间接指向 `Object.prototype`，所以按照 `instanceof` 的判断规则，a 就是`Object`的实例.针对数组的这个问题，ES5 提供了 `Array.isArray()` 方法 。该方法用以确认某个对象本身是否为 Array 类型

- constructor: 当一个函数被定义时，JS引擎会为其添加`prototype`原型，然后再在 `prototype`上添加一个 `constructor` 属性，并让其指向该函数的引用

> `null`和`undefined`是无效的对象，因此是不会有`constructor`存在的，这两种类型的数据需要通过其他方式来判断

> 函数的`constructor`是不稳定的，这个主要体现在自定义对象上，当开发者重写`prototype`后，原有的`constructor`引用会丢失，`constructor`会默认为 `Object`

```js
function F() {};
var f = new F;
f.constructor == F // true

F.prototype = {a: 1}
var f = new F
f.constructor == F // false
```
> 在构造函数 `F.prototype` 没有被重写之前，构造函数 `F` 就是新创建的对象 `f` 的数据类型。当 `F.prototype` 被重写之后，原有的 `constructor` 引用丢失, 默认为 Object

> 因此，为了规范开发，在重写对象原型时一般都需要重新给 `constructor` 赋值，以保证对象实例的类型不被篡改

- toString: `Object` 的原型方法，调用该方法，默认返回当前对象的 `[[Class]]` 。这是一个内部属性，其格式为 `[object Xxx]` ，其中 `Xxx` 就是对象的类型

```js
Object.prototype.toString.call('') ;   // [object String]
Object.prototype.toString.call(11) ;    // [object Number]
Object.prototype.toString.call(true) ; // [object Boolean]
Object.prototype.toString.call(Symbol()); //[object Symbol]
Object.prototype.toString.call(undefined) ; // [object Undefined]
Object.prototype.toString.call(null) ; // [object Null]
Object.prototype.toString.call(new Function()) ; // [object Function]
Object.prototype.toString.call([]) ; // [object Array]
```

<h5 id='j3'>3. undefined 和 null 有什么区别</h5>

> `null`表示"没有对象"，即该处不应该有值

典型用法：

1. 作为函数的参数，表示该函数的参数不是对象
2. 作为对象原型链的终点

> `undefined`表示"缺少值"，就是此处应该有一个值，但是还没有定义

典型用法：

1. 变量被声明了，但没有赋值时，就等于`undefined`
2. 调用函数时，应该提供的参数没有提供，该参数等于`undefined`
3. 对象没有赋值的属性，该属性的值为`undefined`
4. 函数没有返回值时，默认返回`undefined`

详见： [undefined和null的区别-阮一峰](http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html)

<h5 id='j4'>4. 数组对象有哪些常用方法</h5>

> 修改器方法：

- pop(): 删除数组的最后一个元素，并返回这个元素
- push()：在数组的末尾增加一个或多个元素，并返回数组的新长度
- reverse(): 颠倒数组中元素的排列顺序
- shift(): 删除数组的第一个元素，并返回这个元素
- unshift(): 在数组的开头增加一个或多个元素，并返回数组的新长度
- sort(): 对数组元素进行排序，并返回当前数组
- splice(): 在任意的位置给数组添加或删除任意个元素

> 访问方法：

- concat(): 返回一个由当前数组和其它若干个数组或者若干个非数组值组合而成的新数组
- join(): 连接所有数组元素组成一个字符串
- slice(): 抽取当前数组中的一段元素组合成一个新数组
- indeOf(): 返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1
- lastIndexOf(): 返回数组中最后一个（从右边数第一个）与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1

> 迭代方法：

- forEach(): 为数组中的每个元素执行一次回调函数,最终返回 `undefined`
- every(): 如果数组中的每个元素都满足测试函数，则返回 `true`，否则返回 false
- some(): 如果数组中至少有一个元素满足测试函数，则返回 `true`，否则返回 false
- filter(): 将所有在过滤函数中返回 `true` 的数组元素放进一个新数组中并返回
- map(): 返回一个由回调函数的返回值组成的新数组

更多方法请参考 MDN [传送门](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)


<h5 id='j5'>5. Js 有哪几种创建对象的方式</h5>

> 对象字面量
```js
var obj = {}
```
> Object 构造函数
```js
var obj = new Object()
```

> 工厂模式
```js
function Person(name, age) {
    var o = new Object()
    o.name = name;
    o.age = age;
    o.say = function() {
        console.log(name)
    }
    return o
}
```
缺点： 每次通过`Person`创建对象的时候，所有的`say`方法都是一样的，但是却存储了多次，浪费资源

> 构造函数模式
```js
function Person(name, age) {
    this.name = name
    this.age = age
    this.say = function() {
        console.log(name)
    }
}
var person = new Person('hello', 18)
```
构造函数模式隐试的在最后返回`return this` 所以在缺少`new`的情况下，会将属性和方法添加给全局对象，浏览器端就会添加给`window`对象,可以根据`return this` 的特性调用`call`或者`apply`指定`this`

> 原型模式
```js
function Person() {}
Person.prototype.name = 'hanmeimei';
Person.prototype.say = function() {
  alert(this.name);
}
Person.prototype.friends = ['lilei'];
var person = new Person();
```
实现了方法与属性的共享，可以动态添加对象的属性和方法。但是没有办法创建实例自己的属性和方法，也没有办法传递参数

> 构造函数和原型组合
```js
function Person(name, age) {
    this.name = name
    this.age = age
}
Person.prototype.say = function() {
    console.log(this.name)
}
var person = new Person('hello')
```

还有好几种模式，感兴趣的小伙伴可以参考 **红宝书**，你们肯定知道的了！

<h5 id='j6'>6. 怎么实现对对象的拷贝(浅拷贝与深拷贝)</h5>

> 浅拷贝

- 拷贝原对象引用
- 可以使用`Array.prototype.slice()`也可以完成对一个数组或者对象的浅拷贝
- `Object.assign()`方法

> 深拷贝

- 最常用的方式就是 `JSON.parse(JSON.stringify(目标对象)`，缺点就是只能拷贝符合`JSON`数据标准类型的对象

<h5 id='j7'>7. 什么是闭包，为什么要用它</h5>

> 简单来说，闭包就是能够读取其他函数内部变量的函数
```js
function Person() {
    var name = 'hello'
    function say () {
        console.log(name)
    }
    return say()
}
Person() // hello
```
> 由于 JavaScript 特殊的作用域，函数外部无法直接读取内部的变量，内部可以直接读取外部的变量，从而就产生了闭包的概念

用途：
> 最大用处有两个，一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中

注意点：
> 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露

<h5 id='j8'>8. 介绍一下 JavaScript 原型，原型链，它们有何特点</h5>

首先明确一点，**JavaScript是基于原型的**

> 每个构造函数(constructor)都有一个原型对象(prototype),原型对象都包含一个指向构造函数的指针,而实例(instance)都包含一个指向原型对象的内部指针.


图解：
- 每一个构造函数都拥有一个`prototype`属性，这个属性指向一个对象，也就是原型对象
- 原型对象默认拥有一个`constructor`属性，指向指向它的那个构造函数
- 每个对象都拥有一个隐藏的属性`[[prototype]]`，指向它的原型对象

那么什么是原型链：

> `JavaScript`中所有的对象都是由它的原型对象继承而来。而原型对象自身也是一个对象，它也有自己的原型对象，这样层层上溯，就形成了一个类似链表的结构，这就是原型链

> 所有原型链的终点都是`Object`函数的`prototype`属性。`Objec.prototype`指向的原型对象同样拥有原型，不过它的原型是`null`，而`null`则没有原型

![image](https://github.com/93qlin/webNote/blob/master/Other/images/%E5%8E%9F%E5%9E%8B%E9%93%BE.png)

<h5 id='j9'>9. JavaScript 如何实现继承</h5>

- 原型链继承

```js
function Animal() {}
Animal.prototype.name = 'cat'
Animal.prototype.age = 1
Animal.prototype.say = function() {console.log('hello')}

var cat = new Animal()

cat.name  // cat
cat.age  // 1
cat.say() // hello
```
> 最简单的继承实现方式，但是也有其缺点
1. 来自原型对象的所有属性被所有实例共享
2. 创建子类实例时，无法向父类构造函数传参
3. 要想为子类新增属性和方法，必须要在`new`语句之后执行，不能放到构造器中

- 构造继承

```js
function Animal() {
    this.species = "动物"
}
function Cat(name, age) {
    Animal.call(this)
    this.name = name
    this.age = age
}

var cat = new Cat('豆豆', 2)

cat.name  // 豆豆
cat.age // 2
cat.species // 动物
```
> 使用call或apply方法，将父对象的构造函数绑定在子对象上.

- 组合继承

```js
function Animal() {
    this.species = "动物"
}

function Cat(name){
  Animal.call(this)
  this.name = name
}

Cat.prototype = new Animal() // 重写原型
Cat.prototype.constructor = Cat

```
> 如果没有`Cat.prototype = new Animal()`这一行，`Cat.prototype.constructor`是指向`Cat`的；加了这一行以后，`Cat.prototype.constructor`指向`Animal`.这显然会导致继承链的紊乱（cat1明明是用构造函数Cat生成的），因此我们必须手动纠正，将`Cat.prototype`对象的`constructor`值改为`Cat`

- `extends` 继承
ES6新增继承方式，Class 可以通过extends关键字实现继承

```js
class Animal {

}

class Cat extends Animal {
    constructor() {
        super();
  }
}
```

> 使用 `extends` 实现继承，必须添加 `super` 关键字定义子类的 `constructor`，这里的`super()` 就相当于 `Animal.prototype.constructor.call(this)`

当然，还有很多种实现继承的方式，这里就不多说了。然后，再推荐一波 **红宝书**

<h5 id='j10'>10. new 操作符具体干了什么</h5>

- 创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型
- 属性和方法被加入到 this 引用的对象中
- 新创建的对象由 this 所引用，并且最后隐式的返回 this

<h5 id='j11'>11. 同步和异步的区别，怎么异步加载 JavaScript</h5>

> 同步模式

同步模式，又称阻塞模式。`javascript` 在默认情况下是会阻塞加载的。当前面的 `javascript` 请求没有处理和执行完时，会阻止浏览器的后续处理

> 异步模式

异步加载又叫非阻塞，浏览器在下载执行 `js` 同时，还会继续进行后续页面的处理

> 异步加载 JavaScript

- 动态添加 `script` 标签
- `defer`
- `async`

> `defer`属性和`async`都是属于 `script` 标签上面的属性，两者都能实现 `JavaScript` 的异步加载。不同之处在于：`async` 在异步加载完成的时候就马上开始执行了，`defer` 会等到 `html` 加载完毕之后再执行

<h5 id='j12'>12. 跨域问题的产生，怎么解决它</h5>

> 由于浏览器的 [同源策略](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)，在出现 域名、端口、协议有一种不一致时，就会出现跨域，属于浏览器的一种安全限制。

解决跨域问题有很多种方式，常用的就是以下几种：

- `jsonp` 跨域：动态创建`script`，再请求一个带参网址实现跨域通信.缺点就是只能实现 `get` 一种请求
- `document.domain + iframe`跨域：两个页面都通过js强制设置`document.domain`为基础主域，就实现了同域.但是仅限主域相同，子域不同的跨域应用场景
- window.name + iframe（非同源可用）
- location.hash + iframe（非同源可用）
- 跨域资源共享（CORS）：只服务端设置`Access-Control-Allow-Origin`即可，前端无须设置，若要带`cookie`请求：前后端都需要设置
- `nginx`反向代理接口跨域：同源策略是浏览器的安全策略，不是`HTTP`协议的一部分。服务器端调用`HTTP`接口只是使用`HTTP`协议，不会执行JS脚本，不需要同源策略，也就不存在跨越问题
- `WebSocket`协议跨域
-  window.postMessage
- WebSocket
<h5 id='j13'>13. 对 this 的理解</h5>

在 `JavaScript` 中，研究 `this` 一般都是 `this` 的指向问题，核心就是 **`this` 永远指向最终调用它的那个对象**，除非改变 `this` 指向或者箭头函数那种特殊情况

```js
function test() {
    console.log(this);
}

test() // window

var obj = {
  foo: function () { console.log(this.bar) },
  bar: 1
};

var foo = obj.foo;
var bar = 2;

obj.foo() // 1
foo() // 2

// 函数调用的环境不同，所得到的结果也是不一样的
```

<h5 id='j14'>14. apply()、call()和 bind() 是做什么的，它们有什么区别</h5>

相同点：三者都可以**改变 this 的指向**

不同点：

- apply 方法传入两个参数：一个是作为函数上下文的对象，另外一个是作为函数参数所组成的数组

```js

var obj = {
    name : 'sss'
}

function func(firstName, lastName){
    console.log(firstName + ' ' + this.name + ' ' + lastName);
}

func.apply(obj, ['A', 'B']);    // A sss B

```
- `call` 方法第一个参数也是作为函数上下文的对象，但是后面传入的是一个参数列表，而不是单个数组

```js
var obj = {
    name: 'sss'
}

function func(firstName, lastName) {
    console.log(firstName + ' ' + this.name + ' ' + lastName);
}

func.call(obj, 'C', 'D');       // C sss D
```

- `bind` 接受的参数有两部分，第一个参数是是作为函数上下文的对象，第二部分参数是个列表，可以接受多个参数

```js
var obj = {
    name: 'sss'
}

function func() {
    console.log(this.name);
}

var func1 = func.bind(null, 'xixi');
func1();
```

> `apply`、`call` 方法都会使函数立即执行，因此它们也可以用来调用函数

> `bind` 方法不会立即执行，而是返回一个改变了上下文 `this` 后的函数。而原函数 `func` 中的 `this` 并没有被改变，依旧指向全局对象 `window`

> `bind` 在传递参数的时候会将自己带过去的参数排在原函数参数之前

```js
function func(a, b, c) {
    console.log(a, b, c);
}
var func1 = func.bind(this, 'xixi');
func1(1,2) // xixi 1 2
```

<h5 id='j15'>15. 什么是内存泄漏，哪些操作会造成内存泄漏</h5>

> 内存泄漏：是指一块被分配的内存既不能使用，又不能回收，直到浏览器进程结束

可能造成内存泄漏的操作：
- 意外的全局变量
- 闭包
- 循环引用
- 被遗忘的定时器或者回调函数

你可能还需要知道 [垃圾回收机制](http://www.ruanyifeng.com/blog/2017/04/memory-leak.html) 此外，高程上面对垃圾回收机制的介绍也很全面，有兴趣的小伙伴可以看看

<h5 id='j16'>16. 什么是事件代理，它的原理是什么</h5>

> 事件代理：通俗来说就是将元素的事件委托给它的父级或者更外级元素处理

> 原理：利用事件冒泡机制实现的

> 优点：只需要将同类元素的事件委托给父级或者更外级的元素，不需要给所有元素都绑定事件，减少内存空间占用，提升性能; 动态新增的元素无需重新绑定事件

<h5 id='j17'>17. 对AMD和CMD的理解，它们有什么区别</h5>

> `AMD`和`CMD`都是为了解决浏览器端模块化问题而产生的，`AMD`规范对应的库函数有 `Require.js`，`CMD`规范是在国内发展起来的，对应的库函数有`Sea.js`

**AMD和CMD最大的区别是对依赖模块的执行时机处理不同**

> 1、AMD推崇依赖前置，在定义模块的时候就要声明其依赖的模块

> 2、CMD推崇就近依赖，只有在用到某个模块的时候再去require

参考：[AMD-中文版](https://github.com/amdjs/amdjs-api/wiki/AMD-%28%E4%B8%AD%E6%96%87%E7%89%88%29)   [CMD-规范](https://github.com/seajs/seajs/issues/242)

<h5 id='j18'>18. 对ES6的了解</h5>

> ECMAScript 6.0 是 JavaScript 语言的下一代标准

新增的特性：

- 声明变量的方式 `let`  `const`
- 变量解构赋值
- 字符串新增方法 `includes()`  `startsWith()`  `endsWith()` 等
- 数组新增方法 `Array.from()`  `Array.of()`  `entries()`  `keys()`      `values()` 等
- 对象简洁写法以及新增方法 `Object.is()`  `Object.assign()` `entries()` `keys()`  `values()`等
- 箭头函数、`rest` 参数、函数参数默认值等
- 新的数据结构： `Set` 和 `Map`
- `Proxy`
- `Promise`对象
- `async`函数 `await`命令
- `Class`类
- `Module` 体系 模块的加载和输出方式

了解更多，参考 [ES6入门-阮一峰](http://es6.ruanyifeng.com/#README)

<h5 id='j19'>19. 箭头函数有什么特点</h5>

> ES6 允许使用“箭头”（=>）定义函数

```js
var f = v => v;

// 等同于
var f = function (v) {
  return v;
}
```

注意点：

- 函数体内的 `this` 对象，就是定义时所在的对象，而不是使用时所在的对象
- 不可以当作构造函数，也就是说，不可以使用 `new` 命令，否则会抛出一个错误
- 不可以使用 `arguments` 对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替

<h5 id='j20'>20. Promise 对象的了解</h5>

> Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大.所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果 --ES6入门-阮一峰

> `Promise` 对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和 `rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态

特点：

- 对象的状态不受外界影响
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果
- `Promise` 新建后就会立即执行

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
})
```

> Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数

```js
promise.then(function(value) {
  // success
}, function(error) {
  // failure
})
```

> `then` 方法返回的是一个新的Promise实例

> `Promise.prototype.catch` 用于指定发生错误时的回调函数,具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个`catch`语句捕获

```js
getJSON('/post/1.json').then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前面三个Promise产生的错误
});
```

> `catch` 方法返回的还是一个 `Promise` 对象，因此后面还可以接着调用 `then` 方法

出去上述方法，Promise还有其他用法，小伙伴们可以在这里查看大佬写的文章 [ES6入门-阮一峰](http://es6.ruanyifeng.com/#README)

<h5 id='j21'>21. async 函数以及 awit 命令</h5>

> `async` 函数是什么？一句话，它就是 `Generator` 函数的语法糖

了解Generator函数的小伙伴，这里 [传送门](http://es6.ruanyifeng.com/#docs/generator)

`async` 特点：

> `async` 函数返回一个 `Promise` 对象，可以使用 `then ` 方法添加回调函数。当函数执行的时候，一旦遇到 `await` 就会先返回，等到异步操作完成，再接着执行函数体内后面的语句

> `async` 函数内部 `return` 语句返回的值，会成为 `then` 方法回调函数的参数

> `async` 函数返回的 `Promise` 对象，必须等到内部所有 `await` 命令后面的 `Promise` 对象执行完，才会发生状态改变，除非遇到 `return` 语句或者抛出错误

> `async` 函数内部抛出错误，会导致返回的 `Promise` 对象变为 `reject` 状态。抛出的错误对象会被 `catch` 方法回调函数接收到

```js
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 50);
```

> `await` 命令: `await` 命令后面是一个 `Promise` 对象，返回该对象的结果。如果不是 `Promise` 对象，就直接返回对应的值

```js
async function f() {
  // 等同于
  // return 123;
  return await 123;
}

f().then(v => console.log(v))
// 123
```

> `await` 命令后面是一个`thenable`对象（即定义then方法的对象），那么`await`会将其等同于 `Promise` 对象.也就是说就算一个对象不是`Promise`对象，但是只要它有`then`这个方法， `await` 也会将它等同于`Promise`对象

使用注意点：

- `await` 命令后面的 `Promise` 对象，运行结果可能是 `rejected`，所以最好把 `await` 命令放在 `try...catch` 代码块中
- 多个 `await` 命令后面的异步操作，如果不存在继发关系，最好让它们同时触发
- `await` 命令只能用在 `async` 函数之中，如果用在普通函数，就会报错

了解更多，请点击 [这里](http://es6.ruanyifeng.com/#docs/async)

<h5 id='j22'>22. export 与 export default有什么区别</h5>

> `export` 与 `export default` 均可用于导出常量、函数、文件、模块等

> 在一个文件或模块中，`export`、`import` 可以有多个，`export default` 仅有一个

> 通过 `export` 方式导出，在导入时要加 `{ }`，`export default` 则不需要

> 使用 `export default`命令，为模块指定默认输出，这样就不需要知道所要加载模块的变量名; `export` 加载的时候需要知道加载模块的变量名

> `export default` 命令的本质是将后面的值，赋给 `default` 变量，所以可以直接将一个值写在 `export default` 之后

<h5 id='j23'>23. 前端性能优化</h5>

参见 [雅虎14条前端性能优化](https://blog.csdn.net/qfkfw/article/details/7272961)





<h5 id='j24'>24. 对JS引擎执行机制的理解</h5>

首选明确两点：

> `JavaScript` 是单线程语言

> `JavaScript` 的 `Event Loop` 是 `JS` 的执行机制, 也就是事件循环

```js
console.log(1)

setTimeout(function(){
    console.log(2)
},0)

console.log(3)

// 1 3 2
```
> `JavaScript` 将任务分为同步任务和异步任务，执行机制就是先执行同步任务，将同步任务加入到主线程，遇到异步任务就先加入到 `event table` ，当所有的同步任务执行完毕，如果有可执行的异步任务，再将其加入到主线程中执行

视频详解，移步 [这里](https://vimeo.com/96425312)

```js
setTimeout(function(){console.log(1);},0);
new Promise(function(resolve){
     console.log(2);
     for(var i = 0; i < 10000; i++){
         i == 99 && resolve();
     }
 }).then(function(){
     console.log(3)
 });

 console.log(4);

 // 2 4 3 1
```

在异步任务中，定时器也属于特殊的存在。有人将其称之为 宏任务、微任务，定时器就属于宏任务的范畴。

参考 [JS引擎的执行机制](https://segmentfault.com/a/1190000012806637)

<h5 id='j25'>25. 事件流</h5>
参考 [从浏览器多进程到JS单线程，JS运行机制最全面的一次梳理](https://www.cnblogs.com/cangqinglang/p/8963557.html)
事件流分为两种，捕获事件流和冒泡事件流。

- 捕获事件流从根节点开始执行，一直往子节点查找执行，直到查找执行到目标节点。

- 冒泡事件流从目标节点开始执行，一直往父节点冒泡查找执行，直到查到到根节点。

事件流分为三个阶段，一个是捕获节点，一个是处于目标节点阶段，一个是冒泡阶段。

<h5 id='j26'>26. 事件循环event-loop[https://blog.csdn.net/qq_36150631/article/details/88787226]</h5>

**概括**

事件循环：从代码执行顺序的角度来看，程序最开始是按代码顺序执行代码的，遇到同步任务，立刻执行；遇到异步任务，则只是调用异步函数发起异步请求。此时，异步任务开始执行异步操作，执行完成后到任务队列中排队。程序按照代码顺序执行完毕后，查询任务队列中是否有等待的任务。如果有，则按照次序从任务队列中把任务放到执行栈中执行。执行完毕后，再从任务队列中获取任务，再执行，不断重复。

　　由于主线程不断的重复读取任务、执行任务、再取任务、再执行。所以，这种机制被称为事件循环

<h6>线程</h6>

- javascript是单线程的语言，也就是说，同一个时间只能做一件事
- why? 假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

<h6>排队</h6>

单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着
```
var i, t = Date.now()
for (i = 0; i < 100000000; i++) {}
console.log(Date.now() - t) // 238
```
像上面这样，如果排队是因为计算量大，CPU忙不过来，倒也算了
但是，如果是网络请求就不合适。因为一个网络请求的资源什么时候返回是不可预知的，这种情况再排队等待就不明智了

<h6>同步和异步</h6>

【同步】

如果在函数返回的时候，调用者就能够得到预期结果(即拿到了预期的返回值或者看到了预期的效果)，那么这个函数就是同步的
```
Math.sqrt(2);
console.log('Hi');
```
第一个函数返回时，就拿到了预期的返回值：2的平方根；第二个函数返回时，就看到了预期的效果：在控制台打印了一个字符串所以这两个函数都是同步的

【异步】

如果在函数返回的时候，调用者还不能够得到预期结果，而是需要在将来通过一定的手段得到，那么这个函数就是异步的

```
fs.readFile('foo.txt', 'utf8', function(err, data) {
    console.log(data);
});
```
在上面的代码中，我们希望通过fs.readFile函数读取文件foo.txt中的内容，并打印出来。但是在fs.readFile函数返回时，我们期望的结果并不会发生，而是要等到文件全部读取完成之后。如果文件很大的话可能要很长时间


所以，fs.readFile函数是异步的

　　正是由于JavaScript是单线程的，而异步容易实现非阻塞，所以在JavaScript中对于耗时的操作或者时间不确定的操作，使用异步就成了必然的选择


<h6>异步详解</h6>

从上文可以看出，异步函数实际上很快就调用完成了。但是后面还有执行异步操作、通知主线程、主线程调用回调函数等很多步骤。我们把整个过程叫做异步过程。异步函数的调用在整个异步过程中，只是一小部分

　　一个异步过程通常是这样的：主线程发起一个异步请求，异步任务接收请求并告知主线程已收到(异步函数返回)；主线程可以继续执行后面的代码，同时异步操作开始执行；执行完成后通知主线程；主线程收到通知后，执行一定的动作(调用回调函数)

　　因此，一个异步过程包括两个要素：注册函数和回调函数，其中注册函数用来发起异步过程，回调函数用来处理结果

　　下面的代码中，其中的setTimeout就是异步过程的发起函数，fn是回调函数

```
setTimeout(fn, 1000);
```

有一个很重要的问题，如何才算是异步操作执行完成呢？对于不同类型的异步任务，操作完成的标准不同

【异步类型】

　　一般而言，异步任务有以下三种类型

　　1、普通事件，如click、resize等

　　2、资源加载，如load、error等

　　3、定时器，包括setInterval、setTimeout等

　　下面对这三种类型分别举例说明，下面代码中，鼠标点击div时，就代表任务执行完成了
```
div.onclick = () => {
  console.log('click')
}
```
下面代码中，XHR对象的readyState值为4，即已经接收到全部响应数据了，代表任务执行完成
```
xhr.onreadystatechange = function(){
  if(xhr.readyState == 4){
      if(xhr.status == 200){
          //实际操作
          result.innerHTML += xhr.responseText;
      }
  }
}
```
下面代码中，过1s后，代表任务执行完成

```
setTimeout(() => {
  console.log('timeout')
},1000)
```

对于同步任务来说，按顺序执行即可；但是，对于异步任务，各任务执行的时间长短不同，执行完成的时间点也不同，主线程如何调控异步任务呢？这就用到了任务队列

<h6>任务队列</h6>

　　有些文章把任务队列称为消息队列，或者叫事件队列，总之是和异步任务相关的队列

　　可以确定的是，它是队列这种先入先出的数据结构，和排队是类似的，哪个异步操作完成的早，就排在前面。不论异步操作何时开始执行，只要异步操作执行完成，就可以到任务队列中排队

　　这样，主线程在空闲的时候，就可以从任务队列中获取任务并执行

　　任务队列中放的任务具体是什么东西？任务的具体结构当然跟具体的实现有关。但是为了简单起见，可以认为：任务就是注册异步任务时添加的回调函数

<h6>任务队列的宏任务和微任务</h6>
同步代码的执行也属于宏任务

任务队列的宏任务和微任务JS异步还有一个机制，就是遇到宏任务，先执行宏任务，将宏任务放入event queue，然后再执行微任务，将微任务放入event queue，但是，这两个queue不是一个queue。当你往外拿的时候先从微任务里拿这个回调函数，然后再从宏任务的queue拿宏任务的回调函数，如下图：
![image](https://github.com/93qlin/webNote/blob/master/JavaScript/image/img2.png)

【事件】

　　为什么叫事件循环？而不叫任务循环或消息循环。究其原因是任务队列中的每条任务实际上都对应着一个事件

　　DOM操作对应的是DOM事件，资源加载操作对应的是加载事件，而定时器操作可以看做对应一个“时间到了”的事件

![image](https://github.com/93qlin/webNote/blob/master/JavaScript/image/img1.png)
如图：
同步和异步任务分别进入不同的执行“场所”，同步进入主线程，异步进入Event Table并注册函数。当指定的事情完成时，Event Table会将这个函数移入Event Queue。主线程内的任务执行完毕为空，回去了Event Queue读取对应的函数，进入主线程。上述过程会不断重复，也就是常说的Event Loop（事件循环）。

<h6>Event-loop 是如何工作的？</h6>

```
先看一个简单的示例：
setTimeout(()=>{
    console.log("setTimeout1");
    Promise.resolve().then(data => {
        console.log(222);
    });
});
setTimeout(()=>{
    console.log("setTimeout2");
});
Promise.resolve().then(data=>{
    console.log(111);
});
```
// qqqq
复制代码思考一下, 运行结果是什么？
运行结果为:

```
111
setTimeout1
222
setTimeout2
```

复制代码我们来看一下为什么？
我们来详细说明一下, JS引擎是如何执行这段代码的:

>主线程上没有需要执行的代码
接着遇到setTimeout 0，它的作用是在 0ms 后将回调函数放到宏任务队列中(这个任务在下一次的事件循环中执行)。
接着遇到setTimeout 0，它的作用是在 0ms 后将回调函数放到宏任务队列中(这个任务在再下一次的事件循环中执行)。
首先检查微任务队列, 即 microtask队列，发现此队列不为空，执行第一个promise的then回调，输出 '111'。
此时microtask队列为空，进入下一个事件循环, 检查宏任务队列，发现有 setTimeout的回调函数，立即执行回调函数输出 'setTimeout1',检查microtask 队列，发现队列不为空，执行promise的then回调，输出'222'，microtask队列为空，进入下一个事件循环。
检查宏任务队列，发现有 setTimeout的回调函数, 立即执行回调函数输出'setTimeout2'。

再思考一下下面代码的执行顺序:
```
console.log('script start');

setTimeout(function () {
    console.log('setTimeout---0');
}, 0);

setTimeout(function () {
    console.log('setTimeout---200');
    setTimeout(function () {
        console.log('inner-setTimeout---0');
    });
    Promise.resolve().then(function () {
        console.log('promise5');
    });
}, 200);

Promise.resolve().then(function () {
    console.log('promise1');
}).then(function () {
    console.log('promise2');
});
Promise.resolve().then(function () {
    console.log('promise3');
});
console.log('script end');
```
复制代码思考一下, 运行结果是什么？
运行结果为:
```
script start
script end
promise1
promise3
promise2
setTimeout---0
setTimeout---200
promise5
inner-setTimeout---0
```
复制代码那么为什么？
我们来详细说明一下, JS引擎是如何执行这段代码的:

> 首先顺序执行完主进程上的同步任务，第一句和最后一句的console.log
接着遇到setTimeout 0，它的作用是在 0ms 后将回调函数放到宏任务队列中(这个任务在下一次的事件循环中执行)。
接着遇到setTimeout 200，它的作用是在 200ms 后将回调函数放到宏任务队列中(这个任务在再下一次的事件循环中执行)。
同步任务执行完之后，首先检查微任务队列, 即 microtask队列，发现此队列不为空，执行第一个promise的then回调，输出 'promise1'，然后执行第二个promise的then回调，输出'promise3'，由于第一个promise的.then()的返回依然是promise，所以第二个.then()会放到microtask队列继续执行，输出 'promise2';
此时microtask队列为空，进入下一个事件循环, 检查宏任务队列，发现有 setTimeout的回调函数，立即执行回调函数输出 'setTimeout---0',检查microtask 队列，队列为空，进入下一次事件循环.
检查宏任务队列，发现有 setTimeout的回调函数, 立即执行回调函数输出'setTimeout---200'.
接着遇到setTimeout 0，它的作用是在 0ms 后将回调函数放到宏任务队列中，检查微任务队列，即 microtask 队列，发现此队列不为空，执行promise的then回调，输出'promise5'。
此时microtask队列为空，进入下一个事件循环，检查宏任务队列，发现有 setTimeout 的回调函数，立即执行回调函数输出，输出'inner-setTimeout---0'。代码执行结束.

<h6>为什么会需要event-loop?</h6>

> 因为 JavaScript 是单线程的。单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。为了协调事件（event），用户交互（user interaction），脚本（script），渲染（rendering），网络（networking）等，用户代理（user agent）必须使用事件循环（event loops）。
最后有一点需要注意的是：本文介绍的是浏览器的Event-loop，因此在测试验证时，一定要使用浏览器环境进行测试验证，如果使用了node环境，那么结果不一定是如上所说。

## 1.forEach、for-in与for-of的区别
### forEach介绍
```
objArr.forEach(function (value) {
  console.log(value);
});
```
foreach 方法没办法使用 break 语句跳出循环，或者使用return从函数体内返回
### for-in介绍
>for-in循环设计之初，是给普通以字符串的值为key的对象使用的。而非数组。
所以：
```
for(var index in objArr){
    console.log(objArr[index])
}
```
以上代码会出现的问题：
1. index 值 会是字符串（String）类型
2. 循环不仅会遍历数组元素，还会遍历任意其他自定义添加的属性，如，objArr上面包含自定义属性，objArr.name，那这次循环中也会出现此name属性
3. 某些情况下，上述代码会以随机顺序循环数组

### for-of介绍
```
for(let value of objArr){
    console.log(value)
}
```
1. 可以避免所有 for-in 循环的陷阱
2. 不同于 forEach()，可以使用 break, continue 和 return
3. for-of 循环不仅仅支持数组的遍历。同样适用于很多类似数组的对象
4. 它也支持字符串的遍历
5. for-of 并不适用于处理原有的原生对象

#### for-of 遍历 Set
```
var uniqueWords = new Set(words);

for (var word of uniqueWords) {
  console.log(word);
}
```
#### for-of 遍历 Map
```
for (var [key, value] of phoneBookMap) {
  console.log(key + "'s phone number is: " + value);
}
```
Map是键值对组成，需要用到 Es6新特性解构

#### for-of 遍历原生对象
// 输出对象自身可以枚举的值
```
for (var key of Object.keys(someObject)) {
  console.log(key + ": " + someObject[key]);
}
```
#### 总结
- for..of适用遍历数/数组对象/字符串/map/set等拥有迭代器对象的集合.但是不能遍历对象,因为没有迭代器对象.与forEach()不同的是，它可以正确响应break、continue和return语句
- for-of循环不支持普通对象，但如果你想迭代一个对象的属性，你可以用for-in循环（这也是它的本职工作）或内建的Object.keys()方法：
for (var key of Object.keys(someObject)) {
  console.log(key + ": " + someObject[key]);
}
遍历map对象时适合用解构,例如;
for (var [key, value] of phoneBookMap) {
   console.log(key + "'s phone number is: " + value);
}
## new一个函数的过程
```
function Foo(){};
var f = new Foo();
```
这个过程等同于
```
function Foo(){}
var f = new Object(); // 新建一个对象
f.proto = Foo.prototype;// 使该构造函数的隐式原形等于实例函数的显示原形
Foo.call(f); // 使用call方法调用函数并且指定上下文的'this'
// 当调用Foo方法的时候，该方法的this值会绑定到f对象上。
```
## 说说你对AMD和Commonjs的理解?
- CommonJS是服务器端模块的规范，Node.js采用了这个规范。CommonJS规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作，只能在node环境下使用。
- AMD规范则是非同步加载模块，允许指定回调函数。
AMD推荐的风格通过返回一个对象做为模块对象，CommonJS的风格通过对module.exports或exports的属性赋值来达到暴露模块对象的目的


<h5 id='j27'>27. ES6中的class语法的实现？</h5>

<h5 id='j28'>28. ajax原理？</h5>
Ajax的原理：简单来说通过XmlHttpRequest对象来向服务器发异步请求，从服务器获得数据，然后用JavaScript来操作DOM而更新页面
```
//封装一个ajax请求
function ajax(options) {
    //创建XMLHttpRequest对象
    const xhr = new XMLHttpRequest()


    //初始化参数的内容
    options = options || {}
    options.type = (options.type || 'GET').toUpperCase()
    options.dataType = options.dataType || 'json'
    const params = options.data

    //发送请求
    if (options.type === 'GET') {
        xhr.open('GET', options.url + '?' + params, true)
        xhr.send(null)
    } else if (options.type === 'POST') {
        xhr.open('POST', options.url, true)
        xhr.send(params)

    //接收请求
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            let status = xhr.status
            if (status >= 200 && status < 300) {
                options.success && options.success(xhr.responseText, xhr.responseXML)
            } else {
                options.fail && options.fail(status)
            }
        }
    }
}
```
```
ajax({
    type: 'post',
    dataType: 'json',
    data: {},
    url: 'https://xxxx',
    success: function(text,xml){//请求成功后的回调函数
        console.log(text)
    },
    fail: function(status){请求失败后的回调函数
        console.log(status)
    }
})
```