## 相同点
1. 都支持服务器端渲染
2. 都有Virtual DOM（虚拟dom）,组件化开发,都有’props’的概念，这是properties的简写。props在组件中是一个特殊的属性，允许父组件往子组件传送数据,都实现webComponent规范
3. 数据驱动视图
4. 都有支持native的方案,React的React native,Vue的weex
5. 构建工具
>React和Vue都有自己的构建工具，你可以使用它快速搭建开发环境。React可以使用Create React App (CRA)，而Vue对应的则是vue-cli。两个工具都能让你得到一个根据最佳实践设置的项目模板。都有管理状态，React有redux,Vue有自己的Vuex（自适应vue，量身定做）

## 区别
### 设计思想
#### react
1. 函数式思想，all in js ,jsx语法，js操控css
2. 单项数据流
3. setState重新渲染
4. 每当应用的状态被改变时，全部子组件都会重新渲染。当然，这可以通过shouldComponentUpdate这个生命周期方法来进行控制，如果为true继续渲染、false不渲染，但Vue将此视为默认的优化。

#### vue
1. 响应式思想，也就是基于数据可变的。把html、js、css、组合到一起，也可以通过标签引擎组合到一个页面中
2. 双向绑定，每一个属性都需要建立watch监听（页面不用，涉及到组件更新的话需要）
3. Vue宣称可以更快地计算出Virtual DOM的差异，这是由于它在渲染过程中，会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树

## 性能
react ----大型项目
优化需要手动去做，状态可控
vue ------中小型项目
状态改变需要watch监听，数据量太大的话会卡顿

## 扩展性
react
1 类式写法api少，更容易结合ts
2 可以通过高阶组件来扩展
vue
1 声明式写法，结合ts比较复杂
2 需要通过mixin方式来扩展

>React刚开始也有mixin的写法，通过React.createClass的api，不过现在很少用了。

>Vue也不是不能实现高阶组件，只是特别麻烦，因为Vue对与组件的option做了各种处理，想实现高阶组件就要知道每一个option是怎么处理的，然后正确的设置。具体有多复杂，可以参考下面的文章。
http://hcysun.me/2018/01/05/探索Vue高阶组件/
https://segmentfault.com/a/1190000011962150
