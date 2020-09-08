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
## rem
### 一、根据不同的设备宽度在根元素上设置不同的字体大小
```
(function(win) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var tid;
    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        if (width > 540) { // 最大宽度
            width = 540;
        }
        var rem = width / 6.4; // 6.4 = 640 / 100; ( 640px的设计图 除了 100px )
        docEl.style.fontSize = rem + 'px';
    }
    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);
    refreshRem();
})(window);
```

简化版

```
(function() {
    function remAdapt() {
        var winWth = window.innerWidth,
            maxWth = 472,
            pageWth = winWth>maxWth?maxWth:winWth;
        var fontSize = pageWth/maxWth*16;
        fontSize = fontSize>12?fontSize:12;
        document.documentElement.style.fontSize = Math.round(fontSize)+'px';
    }
    document.addEventListener('DOMContentLoaded', remAdapt)
    window.addEventListener('resize', remAdapt);
})();
```

### 二、根据 devicePixelRatio 设定 initial-scale 来放大 viewport，使页面按照物理像素渲染，提升清晰度
```
/**
 * MobileWeb 通用功能助手，包含常用的 UA 判断、页面适配、search 参数转 键值对。
 * 该 JS 应在 head 中尽可能早的引入，减少重绘。
 *
 * fixScreen 方法根据两种情况适配，该方法自动执行。
 *      1. 定宽： 对应 meta 标签写法 -- <meta name="viewport" content="target-densitydpi=device-dpi,width=750">
 *          该方法会提取 width 值，主动添加 scale 相关属性值。
 *          注意： 如果 meta 标签中指定了 initial-scale， 该方法将不做处理（即不执行）。
 *      2. REM: 不用写 meta 标签，该方法根据 dpr 自动生成，并在 html 标签中加上 data-dpr 和 font-size 两个属性值。
 *          该方法约束：IOS 系统最大 dpr = 3，其它系统 dpr = 1，页面每 dpr 最大宽度（即页面宽度/dpr） = 750，REM 换算比值为 16。
 *          对应 css 开发，任何弹性尺寸均使用 rem 单位，rem 默认宽度为 视觉稿宽度 / 16;
 *              scss 中 $ppr(pixel per rem) 变量写法 -- $ppr: 750px/16/1rem;
 *                      元素尺寸写法 -- html { font-size: $ppr*1rem; } body { width: 750px/$ppr; }。
 */
window.mobileUtil = (function(win, doc) {
	var UA = navigator.userAgent,
		isAndroid = /android|adr/gi.test(UA),
		isIos = /iphone|ipod|ipad/gi.test(UA) && !isAndroid, // 据说某些国产机的UA会同时包含 android iphone 字符
		isMobile = isAndroid || isIos;  // 粗略的判断
	return {
		isAndroid: isAndroid,
		isIos: isIos,
		isMobile: isMobile,

        isNewsApp: /NewsApp\/[\d\.]+/gi.test(UA),
		isWeixin: /MicroMessenger/gi.test(UA),
		isQQ: /QQ\/\d/gi.test(UA),
		isYixin: /YiXin/gi.test(UA),
		isWeibo: /Weibo/gi.test(UA),
		isTXWeibo: /T(?:X|encent)MicroBlog/gi.test(UA),

		tapEvent: isMobile ? 'tap' : 'click',
		/**
		 * 缩放页面
		 */
		fixScreen: function() {
            var metaEl = doc.querySelector('meta[name="viewport"]'),
                metaCtt = metaEl ? metaEl.content : '',
                matchScale = metaCtt.match(/initial\-scale=([\d\.]+)/),
			    matchWidth = metaCtt.match(/width=([^,\s]+)/);
            if ( !metaEl ) { // REM
                var docEl = doc.documentElement,
                    maxwidth = docEl.dataset.mw || 750, // 每 dpr 最大页面宽度
                    dpr = isIos ? Math.min(win.devicePixelRatio, 3) : 1,
                    scale = 1 / dpr,
                    tid;
                docEl.removeAttribute('data-mw');
                docEl.dataset.dpr = dpr;
                metaEl = doc.createElement('meta');
                metaEl.name = 'viewport';
                metaEl.content = fillScale(scale);
                docEl.firstElementChild.appendChild(metaEl);
                var refreshRem = function() {
                    var width = docEl.getBoundingClientRect().width;
                    if (width / dpr > maxwidth) {
                        width = maxwidth * dpr;
                    }
                    var rem = width / 16;
                    docEl.style.fontSize = rem + 'px';
                };
                win.addEventListener('resize', function() {
                    clearTimeout(tid);
                    tid = setTimeout(refreshRem, 300);
                }, false);
                win.addEventListener('pageshow', function(e) {
                    if (e.persisted) {
                        clearTimeout(tid);
                        tid = setTimeout(refreshRem, 300);
                    }
                }, false);
                refreshRem();
            } else if ( isMobile && !matchScale && ( matchWidth && matchWidth[1] != 'device-width' ) ) { // 定宽
                var	width = parseInt(matchWidth[1]),
                    iw = win.innerWidth || width,
                    ow = win.outerWidth || iw,
                    sw = win.screen.width || iw,
                    saw = win.screen.availWidth || iw,
                    ih = win.innerHeight || width,
                    oh = win.outerHeight || ih,
                    ish = win.screen.height || ih,
                    sah = win.screen.availHeight || ih,
                    w = Math.min(iw,ow,sw,saw,ih,oh,ish,sah),
                    scale = w / width;
                if ( scale < 1 ) {
                    metaEl.content = metaCtt + ',' + fillScale(scale);
                }
            }
            function fillScale(scale) {
                return 'initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale;
            }
		},
		/**
		 * 转href参数成键值对
		 * @param href {string} 指定的href，默认为当前页href
		 * @returns {object} 键值对
		 */
		getSearch: function(href) {
			href = href || win.location.search;
			var data = {},reg = new RegExp( "([^?=&]+)(=([^&]*))?", "g" );
			href && href.replace(reg,function( $0, $1, $2, $3 ){
				data[ $1 ] = $3;
			});
			return data;
		}
	};
})(window, document);

// 默认直接适配页面
mobileUtil.fixScreen();
```

### 三、可以使用淘宝的flexible.js https://github.com/amfe/lib-flexible
参考链接：http://www.jianshu.com/p/eb05c775d3c6