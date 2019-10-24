## forEach、for-in与for-of的区别
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
