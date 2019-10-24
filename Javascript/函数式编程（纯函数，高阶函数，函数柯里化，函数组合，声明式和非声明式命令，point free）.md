主要的编程范式有三种：命令式编程(Imperative)、声明式编程(Declarative)和函数式编程(Functional)
函数式编程（纯函数，高阶函数，函数柯里化，函数组合，声明式和非声明式命令，point free）
===

将电脑运算视为数学上的函数计算，并且避免使用程序状态和易变对象，又称泛函编程。
1. **是一种编码风格，他通过书写函数式代码来解决问题,本质上它是一种数学运算，原始目的就是求值**
2. 函数式编程有两个最基本的运算：合成和柯里化。
[react函数式](https://blog.csdn.net/w1366352655/article/details/85855763)
## 定义

几个核心概念：
[递归，尾递归，相互递归和蹦床函数见](../Algorithms/Javascript/递归.md)
**纯函数，高阶函数，函数柯里化，函数组合，声明式和非声明式命令，point free(入参不用定义变量)**

- 纯函数（输入一定时，输出一定）：输出不受外部环境影响，同时也不影响外部环境，无副作用
- 函数柯里化：把一个多参数的函数，转化为单参数函数（一个低阶函数转化为高阶函数的过程）。
- （合成）反柯里化：将每次传入一个参数返回一个函数的形式转回,一次性传入所有参数返回结果的形势
- 偏函数： 偏函数就是为了复用一些每次都传入的相同的参数,等于对原来的函数做一层封装. 有点类似于我们在调用别人封装好的组件时, 需要传入很多属性,但是有些属性在我们项目中时都是一样的,这时候就可以自己对组件再一次封装,将一些属性默认传入.
- 声明式和命令式
- 声明式就像你告诉你朋友画一幅画，你不用去管他怎么画的细节
- 命令式就像按照你的命令，你朋友一步步把画画出来
换言之：
1. 命令式编程(react)：命令“机器”如何去做事情(how)，这样不管你想要的是什么(what)，它都会按照你的命令实现。
2. 声明式编程(jquery)：告诉“机器”你想要的是什么(what)，让机器想出如何去做(how)。
3. 函数式编程（Functional）
函数式编程是声明式编程的一部分，因为他们思想是一致的：即只关注做什么而不是怎么做。但函数式编程除了对声明式编程的相似处之外，同时他也利用了js函数能够作为参数传递的特点。函数式编程最重要的特点是“函数第一位”,即函数可以出现在任何地方。

函数式编程的特性：

（a）、不可变性(Immutability)：不可变性是指函数不存在副作用，如果需要修改，需要克隆新的备份数据进行处理

（b）、纯函数(Pure Functions)：纯函数是始终接受一个或多个参数并计算参数并返回数据或函数的函数

（c）、数据转换(Data Transformations)：对传递的数据克隆备份后，进行数据的处理，最终返回新的对象，避免副作用

（d）、闭包以及高阶函数 (Higher-Order Functions)：高阶函数是将函数作为参数或返回函数的函数，闭包不做解释

（e）、递归：递归是一种函数在满足一定条件之前调用自身的技术。

（f）、组合：常用的混合函数，将多个对象混合为一个新的对象。

（g）、惰性计算：在惰性计算中，表达式不是在绑定到变量时立即计算，而是在求值程序需要产生表达式的值时进行计算。

 
#### 来点代码

点击一个按钮，改变颜色
命令式：
```
const container = document.getElementById(‘container’);
const btn = document.createElement(‘button’);
btn.className = ‘btn red’;
btn.onclick = function(event) {
 if (this.classList.contains(‘red’)) {
   this.classList.remove(‘red’);
   this.classList.add(‘blue’);
 } else {
   this.classList.remove(‘blue’);
   this.classList.add(‘red’);
 }
};
container.appendChild(btn);
```
声明式（react）：

```
class Button extends React.Component{
  this.state = { color: 'red' }
  handleChange = () => {
    const color = this.state.color === 'red' ? 'blue' : 'red';
    this.setState({ color });
  }
  render() {
    return (<div>
      <button 
         className=`btn ${this.state.color}`
         onClick={this.handleChange}>
      </button>
    </div>);
  }
}
```
注意到什么不一样了么？
>react没有去修改dom，只是声明了页面应该是什么样子（根据不同的state）.
　　 放到整个应用层面也是一样的道理，我们更加需要关心的是整个应用和页面的框架结构。
### pointfree
函数式编程中的pointfree的意思就是“无参”或“无值”，pointfree style是一种编程范式，也作tacit programming，就是“无参编程”的意思了。什么是“无参编程”？
```
// 这就是有参的，因为有word
var snakeCase = word => word.toLowerCase().replace(/\s+/ig, '_');
```
```
// 这是pointfree
var snakeCase = compose(replace(/\s+/ig, '_'), toLowerCase);
```
> 从另一个角度看，有参的函数的目的是得到一个数据，而pointfree的函数的目的是得到另一个函数。
### 高阶函数：高阶函数是一个函数，它接收函数作为参数或将函数作为输出返回

>理解函数式编程的关键，就是理解范畴论。它是一门很复杂的数学，认为世界上所有的概念体系，都可以抽象成一个个的"范畴"（category）。

## 范畴
  - 范畴：彼此之间存在某种关系的概念、事物、对象等等，都构成"范畴"。随便什么东西，只要能找出它们之间的关系，就能定义一个"范畴"。
### 范畴的数学模型
  - 所有成员是一个集合
  - 变形关系是函数
### 把"范畴"想象成是一个容器，里面包含两样东西。
  - 值（value）
  - 值的变形关系，也就是函数。
下面我们使用代码，定义一个简单的范畴。

```
class Category {
  constructor(val) { 
    this.val = val; 
  }

  addOne(x) {
    return x + 1;
  }
}
```
> 上面代码中，Category是一个类，也是一个容器，里面包含一个值（this.val）和一种变形关系（addOne）。你可能已经看出来了，这里的范畴，就是所有彼此之间相差1的数字。

**注意**，本文后面的部分，凡是提到"容器"的地方，全部都是指"范畴"。
### 范畴论与函数式编程的关系
范畴论使用函数，表达范畴之间的关系。

伴随着范畴论的发展，就发展出一整套函数的运算方法。这套方法起初只用于数学运算，后来有人将它在计算机上实现了，就变成了今天的"函数式编程"。

>本质上，函数式编程只是范畴论的运算方法，跟数理逻辑、微积分、行列式是同一类东西，都是数学方法，只是碰巧它能用来写程序。

所以，你明白了吗，为什么函数式编程要求函数必须是纯的，不能有副作用？因为它是一种数学运算，原始目的就是求值，不做其他事情，否则就无法满足函数运算法则了。

总之，在函数式编程中，函数就是一个管道（pipe）。这头进去一个值，那头就会出来一个新的值，没有其他作用。

## 二.函数的合成与柯里化.反柯里化
> 1.合成（反柯里化）：如果一个值要经过多个函数，才能变成另外一个值，就可以把所有中间步骤合并成一个函数，这叫做"函数的合成"（compose）。

```
const compose = function (f, g) {
  return function (x) {
    return f(g(x));
  };
}
必须满足结合律
compose(f, compose(g, h))
// 等同于
compose(compose(f, g), h)
// 等同于
compose(f, g, h)
```
面试题
```
手动实现一个compose函数，满足以下功能：

var arr = [func1, func2, func3];
function func1 (ctx, next) {
    ctx.index++
    next();
}
function func2 (ctx, next) {
    setTimeout(function() {
        ctx.index++;
        next();
    });
}
function func3 (ctx, next) {
    console.log(ctx.index);
}
compose(arr)({index: 0}); // 输出：2
```
解：
```
const compose = (arr) => {
  return function(ctx) {
    [...arr].reverse().reduce((func, item) => {
      return function(ctx) {
        item(ctx, function() {
          func(ctx)
        })
      }
    }, ()=>{})(ctx) //因为reduce在这里返回的是函数，所以传入参数
  }
}
```

```
function func1(ctx) {
    ctx.index++
    (function (ctx) {
        func2(ctx, function() {
          func3(ctx)
        })
      })(ctx);
}
```
反人类版本！
```
const compose = arr => ctx => [...arr].reverse().reduce((func, item) => ctx => item(ctx, () => func(ctx)), () => {})(ctx)
```
```
2. 反柯里化
function uncurry(fn) {
    var args = [].slice.call(arguments, 1);

    return function() {
        var arg = [].slice.call(arguments);
        
        args = args.concat(arg);

        return fn.apply(this, args);
    }
}

var uncurryAdd = uncurry(curryAdd);
console.log(uncurryAdd(1, 2, 3, 4)); // 10

var uncurryMul = uncurry(curryMul, 2);
console.log(uncurryMul(3, 4)); // 24
```
> 2 柯里化: 把一个多参数的函数，转化为单参数函数（一个低阶函数转化为高阶函数的过程）。
```
f(x)和g(x)合成为f(g(x))，有一个隐藏的前提，就是f和g都只能接受一个参数。如果可以接受多个参数，比如f(x, y)和g(a, b, c)，函数合成就非常麻烦。
这时就需要函数柯里化了。所谓"柯里化"，就是把一个多参数的函数，转化为单参数函数.
// 柯里化之前
function add(x, y) {
  return x + y;
}
add(1, 2) // 3
// 柯里化之后
function addX(y) {
  return function (x) {
    return x + y;
  };
}
addX(2)(1) // 3
```

### 比较经典的例子是

#### 实现累加  add(1)(2)(3)(4)

1. 第一种方法即是使用回调嵌套

```
function add(a) {
    // 疯狂的回调
    return function(b) {
        return function(c) {
            return function(d) {
                   // return a + b + c + d;
                   return [a, b, c, d].reduce((v1, v2) =>  v1 + v2);
            }
        }
    }
}

console.log(add(1)(2)(3)(4)); // 10
```

**既不优雅也不好扩展**

修改两下，让它支持不定的参数数量

```
function add() {
    var args = [].slice.call(arguments);
    
    // 用以存储更新参数数组
    function adder() {
        var arg = [].slice.call(arguments);

        args = args.concat(arg);
        
        // 每次调用，都返回自身，取值时可以通过内部的toString取到值
        return adder;
    }
    
    // 指定 toString的值，用以隐示取值计算
    adder.toString = function() {
        return args.reduce((v1, v2) => v1 + v2);
    };

    return adder;
}


console.log(add(1, 2), add(1, 2)(3), add(1)(2)(3)(4)); // 3 6 10
```

上面这段代码，就能够实现了这个“柯里化”

>需要注意的两个点是

- arguments并不是真正的数组，所以不能使用数组的原生方法（如 slice）
- 在取值时，会进行隐示的求值，即先通过内部的toString()进行取值，再通过 valueOf()进行取值，valueOf优先级更高，我们可以进行覆盖初始的方法
当然，并不是所有类型的toString和toValue都一样，Number、String、Date、Function 各种类型是不完全相同的，本文不展开

上面用到了call 方法，它的作用主要是更改执行的上下文，类似的还有apply，bind 等

我们可以试着自定义一个函数的 bind方法，比如
```
var obj = {
    num: 10,
    getNum: function(num) {
        console.log(num || this.num);
    }
};

var o = {
    num: 20
};

obj.getNum(); // 10
obj.getNum.call(o, 1000); // 1000
obj.getNum.bind(o)(20); // 20

// 自定义的 bind 绑定
Function.prototype.binder = function(context) {
    var fn = this;
    var args = [].slice.call(arguments, 1);

    return function() {
        return fn.apply(context, args);
    };
};

obj.getNum.binder(o, 100)(); // 100
```

还不够完善，假如要定义一个乘法的函数，就得再写一遍长长的代码
需要定义一个通用currying函数，作为包装
```
// 柯里化
function curry(fn) {
    var args = [].slice.call(arguments, 1);
    
    function inner() {
        var arg = [].slice.call(arguments);

        args = args.concat(arg);
        return inner;
    }

    inner.toString = function() {
        return fn.apply(this, args);
    };

    return inner;
}

function add() {
    return [].slice.call(arguments).reduce(function(v1, v2) {
        return v1 + v2;
    });
}

function mul() {
    return [].slice.call(arguments).reduce(function(v1, v2) {
        return v1 * v2;
    });
}

var curryAdd = curry(add);
console.log(curryAdd(1)(2)(3)(4)(5)); // 15

var curryMul = curry(mul, 1);
console.log(curryMul(2, 3)(4)(5)); // 120
```

看起来就好多了，便于扩展
不过实际上，柯里化的应用中，不定数量的参数场景比较少，更多的情况下的参数是固定的（常见的一般也就两三个）
```
// 柯里化
function curry(fn) {
    var args = [].slice.call(arguments, 1),
        // 函数fn的参数长度
        fnLen = fn.length;
    
    // 存储参数数组，直到参数足够多了，就调用
    function inner() {
        var arg = [].slice.call(arguments);

        args = args.concat(arg);

        if (args.length >= fnLen) {
            return fn.apply(this, args);
        } else {
            return inner;
        }
    }

    return inner;
}

function add(a, b, c, d) {
    return a + b + c + d;
}

function mul(a, b, c, d) {
    return a * b * c * d;
}

var curryAdd = curry(add);
console.log(curryAdd(1)(2)(3)(4)); // 10

var curryMul = curry(mul, 1);
console.log(curryMul(2, 3)(4)); // 24
```

上面定义的 add方法中，接受4个参数

在我们currying函数中，接受这个add方法，并记住这个方法需要接受的参数数量，存储传入的参数，直到符合数量要求时，便进行调用处理。
#### 三.函子
> 函数不仅可以用于同一个范畴之中值的转换，还可以用于将一个范畴转成另一个范畴。这就涉及到了函子（Functor）。
1 函子的概念
函子是函数式编程里面最重要的数据类型，也是基本的运算单位和功能单位。
2 函子的代码实现
任何具有map方法的数据结构，都可以当作函子的实现。
```
class Functor {
  constructor(val) {
    this.val = val;
  }
  map(f) {
    return new Functor(f(this.val));
  }
}
```
> 上面代码中，Functor是一个函子，它的map方法接受函数f作为参数，然后返回一个新的函子，里面包含的值是被f处理过的（f(this.val)）。

> 一般约定，函子的标志就是容器具有map方法。该方法将容器里面的每一个值，映射到另一个容器。
下面是一些用法的示例。

```
(new Functor(2)).map(function (two) {
  return two + 2;
});
// Functor(4)
(new Functor('flamethrowers')).map(function(s) {
  return s.toUpperCase();
});
// Functor('FLAMETHROWERS')
(new Functor('bombs')).map(_.concat(' away')).map(_.prop('length'));
// Functor(10)
```
> 上面的例子说明，函数式编程里面的运算，都是通过函子完成，即运算不直接针对值，而是针对这个值的容器----函子。函子本身具有对外接口（map方法），各种函数就是运算符，通过接口接入容器，引发容器里面的值的变形。
==因此，学习函数式编程，实际上就是学习函子的各种运算==。由于可以把运算方法封装在函子里面，所以又衍生出各种不同类型的函子，有多少种运算，就有多少种函子。函数式编程就变成了运用不同的函子，解决实际问题。
## 四、of 方法
> 新的函子的时候，用了new命令。这实在==太不像==函数式编程了，因为new命令是面向对象编程的标志。
函数式编程一般约定，函子有一个of方法，用来生成新的容器。

下面就用of方法替换掉new。

```
Functor.of = function(val) {
  return new Functor(val);
};
然后，前面的例子就可以改成下面这样。
Functor.of(2).map(function (two) {
  return two + 2;
});
// Functor(4)
```
这就更像函数式编程了。

#### 五、Maybe 函子
> 函子接受各种函数，处理容器内部的值。==这里就有一个问题，容器内部的值可能是一个空值（比如null）==，而外部函数未必有处理空值的机制，如果传入空值，很可能就会出错。

```
Functor.of(null).map(function (s) {
  return s.toUpperCase();
});
// TypeError
```
> 上面代码中，函子里面的值是null，结果小写变成大写的时候就出错了。
Maybe 函子就是为了解决这一类问题而设计的。简单说，它的map方法里面设置了空值检查
```
class Maybe extends Functor {
  map(f) {
    return this.val ? Maybe.of(f(this.val)) : Maybe.of(null);
  }
}
```
> 有了 Maybe 函子，处理空值就不会出错了。
```
Maybe.of(null).map(function (s) {
  return s.toUpperCase();
});
// M
```
## 六、Either 函子
> 条件运算if...else是最常见的运算之一，函数式编程里面，使用 Either 函子表达。
Either 函子内部有两个值：左值（Left）和右值（Right）。右值是正常情况下使用的值，左值是右值不存在时使用的默认值。

```
class Either extends Functor {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
  map(f) {
    return this.right ?
      Either.of(this.left, f(this.right)) :
      Either.of(f(this.left), this.right);
  }
}
Either.of = function (left, right) {
  return new Either(left, right);
};
```
> 下面是用法。
```
var addOne = function (x) {
  return x + 1;
};
Either.of(5, 6).map(addOne);
// Either(5, 7);
Either.of(1, null).map(addOne);
// Either(2, null);
```
> 上面代码中，如果右值有值，就使用右值，否则使用左值。通过这种方式，Either 函子表达了条件运算。
Either 函子的常见用途是提供默认值。下面是一个例子。

```
Either.of({address: 'xxx'}, currentUser.address).map(updateField);
```

> 上面代码中，如果用户没有提供地址，Either 函子就会使用左值的默认地址。
Either 函子的另一个用途是代替try...catch，使用左值表示错误。

```
function parseJSON(json) {
  try {
    return Either.of(null, JSON.parse(json));
  } catch (e: Error) {
    return Either.of(e, null);
  }
}
```
> 上面代码中，左值为空，就表示没有出错，否则左值会包含一个错误对象e。一般来说，所有可能出错的运算，都可以返回一个 Either 函子

## 七、ap 函子
> 函子里面包含的值，完全可能是函数。我们可以想象这样一种情况，一个函子的值是数值，另一个函子的值是函数。

```
function addTwo(x) {
  return x + 2;
}
const A = Functor.of(2);
const B = Functor.of(addTwo)
```
>上面代码中，函子A内部的值是2，函子B内部的值是函数addTwo。
有时，我们想==让函子B内部的函数，可以使用函子A内部的值进行运算==。这时就需要用到 ap 函子。

> ap 是 applicative（应用）的缩写。凡是部署了ap方法的函子，就是 ap 函子。

```
class Ap extends Functor {
  ap(F) {
    return Ap.of(this.val(F.val));
  }
}
```

> ==注意，ap方法的参数不是函数==，而是另一个函子。

> 因此，前面例子可以写成下面的形式。

```
Ap.of(addTwo).ap(Functor.of(2))
// Ap(4)
```

> ap 函子的意义在于，对于那些多参数的函数，就可以从多个容器之中取值，实现函子的链式操作。
```
function add(x) {
  return function (y) {
    return x + y;
  };
}
Ap.of(add).ap(Maybe.of(2)).ap(Maybe.of(3));
// Ap(5)
```
> 上面代码中，函数add是柯里化以后的形式，一共需要两个参数。通过 ap 函子，我们就可以实现从两个容器之中取值。它还有另外一种写法。

```
Ap.of(add(2)).ap(Maybe.of(3));
```
## 八、Monad 函子
> 函子是一个容器，可以包含任何值。函子之中再包含一个函子，也是完全合法的。但是，这样就会出现多层嵌套的函子。

```
Maybe.of(
  Maybe.of(
    Maybe.of({name: 'Mulburry', number: 8402})
  )
)
```
> 上面这个函子，一共有三个Maybe嵌套。如果要取出内部的值，就要连续取三次this.val。这当然很不方便，因此就出现了 Monad 函子。

> ==Monad 函子的作用是，总是返回一个单层的函子==。它有一个flatMap方法，与map方法作用相同，唯一的区别是如果生成了一个嵌套函子，它会取出后者内部的值，保证返回的永远是一个单层的容器，不会出现嵌套的情况。

```
class Monad extends Functor {
  join() {
    return this.val;
  }
  flatMap(f) {
    return this.map(f).join();
  }
}
```
> 上面代码中，如果函数f返回的是一个函子，那么this.map(f)就会生成一个嵌套的函子。所以，==join方法保证了flatMap方法总是返回一个单层的函子==。这意味着嵌套的函子会被铺平（flatten）。

## 九、IO 操作
> Monad 函子的重要应用，就是实现 I/O （输入输出）操作。

> I/O 是不纯的操作，普通的函数式编程没法做，这时就需要把 IO 操作写成Monad函子，通过它来完成。

```
var fs = require('fs');
var readFile = function(filename) {
  return new IO(function() {
    return fs.readFileSync(filename, 'utf-8');
  });
};
var print = function(x) {
  return new IO(function() {
    console.log(x);
    return x;
  });
}
```
> 上面代码中，读取文件和打印本身都是不纯的操作，但是readFile和print却是纯函数，因为它们总是返回 IO 函子。

> 如果 IO 函子是一个Monad，具有flatMap方法，那么我们就可以像下面这样调用这两个函数。

```
readFile('./user.txt')
.flatMap(print)
```

> 这就是神奇的地方，上面的代码完成了不纯的操作，但是因为flatMap返回的还是一个 IO 函子，所以这个表达式是纯的。我们通过一个纯的表达式，完成带有副作用的操作，这就是 Monad 的作用。

> 由于返回还是 IO 函子，所以可以实现链式操作。因此，在大多数库里面，flatMap方法被改名成chain。

```
var tail = function(x) {
  return new IO(function() {
    return x[x.length - 1];
  });
}
readFile('./user.txt')
.flatMap(tail)
.flatMap(print)
// 等同于
readFile('./user.txt')
.chain(tail)
.chain(print)
```

>  上面代码读取了文件user.txt，然后选取最后一行输出。
