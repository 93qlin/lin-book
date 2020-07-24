```
/*
 * 移动端rem适配，px:rem = 100:1
 * 该适配兼容UC竖屏转横屏出现的BUG
 * 自定义设计稿的宽度：designWidth
 * 最大宽度:maxWidth
 * 这段js的最后面有两个参数记得要设置，一个为设计稿实际宽度，一个为制作稿最大宽度，例如设计稿为750，最大宽度为750，则为(750,750)
*/
! function (e, t) {
    function n() {
        var n = l.getBoundingClientRect().width;
        t = t || 540, n > t && (n = t);
        var i = 100 * n / e;
        r.innerHTML = "html{font-size:" + i + "px;}"
    }
    var i, d = document,
        o = window,
        l = d.documentElement,
        r = document.createElement("style");
    if (l.firstElementChild) l.firstElementChild.appendChild(r);
    else {
        var a = d.createElement("div");
        a.appendChild(r), d.write(a.innerHTML), a = null
    }
    n(), o.addEventListener("resize", function () {
        clearTimeout(i), i = setTimeout(n, 300)
    }, !1), o.addEventListener("pageshow", function (e) {
        e.persisted && (clearTimeout(i), i = setTimeout(n, 300))
    }, !1), "complete" === d.readyState ? d.body.style.fontSize = "16px" : d.addEventListener(
        "DOMContentLoaded",
        function (e) {
            d.body.style.fontSize = "16px"
        }, !1)
}(1000, 1000);
```

## babel-plugin-proposal-optional-chaining

> 遍历一个深层的树状结构数据时，总要去判断该中间节点的数据是否存在，之后再去取值或者对应的操作，
最常见的场景就是在对接后端的api了，假设现在有这么一个api返回obj
```
let person = {
    name: 'a',
    owner: {
        token: '54163sdf',
        permission: {
            usecar: true
        }
    }
},

let usecar = person.owner.permission.usecar()
```

>我们需要取到person下面的owner下面的permission权限中用车权限usecar，上面的代码是我们大部分时候的做法，问题来了，我们怎么能够保证对象的中间节点数据都存在的呢，保不齐就是一个error.

### 常规办法
大部分时候我们的做法是判断取值或者引入带三方库像lodash等
```
if (person && person.owner && person.owner.permission) {
    let usecar = person.owner.permission.usecar, 
}
_.get(person, 'owner.permission.usecar');
```
### 应运而生
可选链(Optionalchaining)，在此背景下，目前已经进入了草案stage2阶段，相信很快就会大规模使用了，它使我们能检查一个对象上面的某属性是否为null或者undefined，如果是在则返回undefined，而不会报错。

// 使用示例
```
let usecar = person?.owner?.permission?.usecar ?? true;
```
有没有很酷，再也不用为了解决容错而写过多重复代码了，简单说下工作原理, 操作符检查 ?. 会检查操作符左边的值是否为 null 或 undefined。如果是，这个表达式就终止然后返回 undefined。否则，这个表达式继续执行检查通过!
另外配合stage2中的另一新特性 Nullish coalescing operator（??运算符），我们可以很方便的处理类似取值默认值的情况。

语法
// Optional Chaining 的语法有三种使用场景：

obj?.prop       // optional static property access
obj?.[expr]     // optional dynamic property access
func?.(...args) // optional function or method call

至于为什么语法不是 obj?prop， 这种简洁一点的表达方式，在 FAQ 中有提到这个例子：

obj?[expr].filter(fun):0 引擎难以判断 obj?[expr] 是 Optional Chaning，亦或这是一个普通的三元运算语句.

详细对于该提议（Optional Chaining）的分析，推荐阅读下面这篇文章：
可选链草案分析

### 使用问题
因为现在还是提案，浏览器还没有很好的支持，现在想在项目中使用是不可能的，不过总有大牛默默的帮我们铺平了道路，对应的babel插件已经存在，
```
babel-plugin-proposal-optional-chaining,
```
下面我们简单看看该插件转义后的代码时啥样的?
```
const babel = require('@babel/core');

const code = 'const obj = {}; const baz = obj?.foo?.foo1';

const output = babel.transformSync(code, {
  plugins: ["@babel/plugin-proposal-optional-chaining"],
});

console.log(output.code);
```
下面是编译后的代码：
```
var _obj$foo;

const obj = {};
const baz = obj === null || obj === void 0 ? void 0 : (_obj$foo = obj.foo) === null || _obj$foo === void 0 ? void 0 : _obj$foo.foo1;
```
这样看上去是不是可以更好的理解该特性了，注意: 该bebel插件并不支持Nullish coalescing operator（?? 运算符）。