<!--
 * @Author: qin lin 925697386@qq.com
 * @Date: 2020-08-27 19:37:52
 * @LastEditors: qin lin 925697386@qq.com
 * @LastEditTime: 2022-09-11 18:05:26
 * @FilePath: /lin-book/Javascript/typescript/typescript面试题.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
typescript面试题
====


&emsp;[1. js项目如何升级为ts？有何影响？](#w1)

&emsp;[2. tslint都能配置哪些功能？对开发流程有何影响？](#w2)

&emsp;[3. ts 基础类型都哪些，他们跟js的区别](#w3)

&emsp;[4. ts为什么会流行？与ECMA新规范的关系？](#w4)

&emsp;[5. 如何理解接口，泛型?](#w5)

&emsp;[6.typeScript中常用内置工具类型Omit、Pick、Partial、Required、Readonly、Exclude 、Extract](#w6)


## 基础：
### 什么是TypeScript？

> TypeScript是JavaScript的加强版，它给JavaScript添加了可选的静态类型和基于类的面向对象编程，它拓展了JavaScript的语法。

> 而且TypeScript不存在跟浏览器不兼容的问题，因为在编译时，它产生的都是JavaScript代码。



### TypeScript 和 JavaScript 的区别是什么？

> Typescript 是 JavaScript 的超集，可以被编译成 JavaScript 代码。 用 JavaScript 编写的合法代码，在 TypeScript 中依然有效。Typescript 是纯面向对象的编程语言，包含类和接口的概念。 程序员可以用它来编写面向对象的服务端或客户端程序，并将它们编译成 JavaScript 代码。

#### TypeScript 引入了很多面向对象程序设计的特征，包括：

- interfaces  接口
- classes  类
- enumerated types 枚举类型
- generics 泛型
- modules 模块

#### 主要不同点如下：

- TS 是一种面向对象编程语言，而 JS 是一种脚本语言（尽管 JS 是基于对象的）。
- TS 支持可选参数， JS 则不支持该特性。
- TS 支持静态类型，JS 不支持。
- TS 支持接口，JS 不支持接口。

### 为什么要用 TypeScript ？
TS 在开发时就能给出编译错误， 而 JS 错误则需要在运行时才能暴露。
作为强类型语言，你可以明确知道数据的类型。代码可读性极强，几乎每个人都能理解。
TS 非常流行，被很多业界大佬使用。像 Asana、Circle CI 和 Slack 这些公司都在用 TS。

<h5 id='w1'>1. js项目如何升级为ts？有何影响？</h5>



<h5 id='w6'>6. js项目如何升级为ts？有何影响？</h5>

### 1.Omit 省略/剔除
顾名思义 可以剔除 已定义对象中 自己不需要的一部分形成新的定义类型。
```
interface UserObj {
    readonly name: string; // readonly 只读属性 只能初始化定义 不能二次赋值
    age: number;
    id: number;
    sex: 0 | 1;
    address: string;
    weight: number;
}

// 剔除省略自己不需要的
type Person = Omit<UserObj , "number" | "sex"  | "address" | "weight">;

// 此时Person 等同于 Person1

interface Person1 {
    readonly name: string;
    id: number;
}
```

// Omit 的源码
```
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

### 2.Pick 采集
顾名思义，可以采集 已定义对象中 自己需要的一部分形成新的定义类型。
```
interface UserObj {
    readonly name: string;
    age: number;
    id: number;
    sex: 0 | 1;
    address: string;
    weight: number;
 }
 ```

 ```
 // 采集需要的
 type Person = Pick<UserObj, "name" | "id">;
 
 // 此时Person 等同于 Person1
 interface Person1 {
     readonly name: string;
     id: number;
}
```
// Pick 的源码
```
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```
### 3.Partial
可把定义好的对象（包含 必选+可选项）类型全部转化为可选项
```
// 已有定义类型Person
interface Person {
    name: string;
    age: number;
    id: number;
    sex: 0 | 1;
    address: string;
    weight: number;
}

// 使用方法
const newObj: Partial<Person> = {
    name: '张三' // 假如只需要一项 Partial的便捷性 可以不需要从新定义类型
};

// Partial<Person>等同于 NewPerson
interface NewPerson {
    name?: string;
    age?: number;
    id?: number;
    sex?: 0 | 1;
    address?: string;
    weight?: number;
}
```

Partial的源码,非常简单,自己就可以实现一个简易版
```
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

### 4.Required (必选的)
Required 和 Partial刚好相反,可把定义好的对象（包含 必选+可选项）类型全部转化为 必选项
```
// 已有定义类型Person
interface Person {
    name: string;
    age: number;
    id?: number;
    sex?: 0 | 1;
}

// 使用方法
const newObj: Required<Person> = {
    name: '张三',
    age: 1,
    id: 1,
    sex: 1
};

// Required<Person>等同于 NewPerson
interface NewPerson {
    name: string;
    age: number;
    id: number;
    sex: 0 | 1;
}
```

Required的源码实现也非常简单,“-?” 意思是移除可选属性
```
/**
 * Make all properties in T required
 */
type Required<T> = {
    [P in keyof T]-?: T[P];
};
```

### 5.Readonly (转化只读)
Readonly 就是为类型对象每一项添加前缀 Readonly
```
interface Person {
    readonly name: string; // 只有这一项有readonly
    age: number;
    id?: number;
}

// 使用方法
const newObj: Readonly<Person> = {
    name: '张三',
    age: 1,
    id: 1
};
// newObj.name = '李四'; // 异常 因为有readonly只读属性，只能初始化声明，不能赋值。

// Readonly<Person> 等同于 NewPerson
interface NewPerson {
    readonly name: string;
    readonly age: number;
    readonly id?: number;
}
```
Readonly的源码实现也非常简单
```
/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

### 6.Extract (提取/包括)
// Extract实现源码 原理很简单
```
type Extract<T, U> = T extends U ? T : never;

interface Person {
    name: string;
}

interface NewPerson {
    name: string;
    age: number;
    id: number;
}

// 案例1
//  NewPerson如果extends继承Person(继承了Person的属性)，就返回NewPerson，否则就never异常
const obj: Extract<NewPerson, Person> = {
    name: '',
    age: 1,
    id: 1
}


Extract<NewPerson, Person>此时就等同于NewPerson
```

### 7.Exclude (排除/不包括)
和 Extract 正好相反
```
// Exclude源码
type Exclude<T, U> = T extends U ? never : T;

interface Person {
    name: string;
}

interface NewPerson {
    name: string;
    age: number;
    id: number;
}

// 案例1
// Person如果extends继承NewPerson(继承了NewPerson的属性)，就never异常，否则就返回Person
const obj: Exclude<Person, NewPerson> = {
    name: ''
}
```