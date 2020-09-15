## VUE-CLI3.0中使用 postcss-px-to-viewport 适配移动端步骤以及POSTCSS.CONFIG.JS配置文件不起作用解决

https://www.cnblogs.com/zhangnan35/p/12682925.html
https://www.jianshu.com/p/1f1b23f8348f

### 使用vue-cli来构建项目目录(我这里使用的是vuecli3@版本) 

```
vue create 项目名称
```

下载依赖包文件
```
npm i postcss-url postcss-import postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext postcss-viewport-units cssnano cssnano-preset-advanced  -S
```


postcss-url：解析css中背景图url引用的插件

postcss-import：可以帮我们导入本地文件，节点或者node-modules模块

postcss-aspect-ratio-mini：主要用来处理元素容器宽高比

postcss-px-to-viewport：用来把 px 单位转换为 vw、vh、vmin或者 vmax这样的视窗单位，核心插件

postcss-write-svg：处理移动端 1px 的解决方案，使用border-image或者background-image

postcss-cssnext：可以使用未来css扩展的特性

postcss-viewport-units：主要是给CSS的属性添加 content 的属性，配合 viewport-units-buggyfill 库给 vw、vh、vmin和 vmax做适配的操作

cssnano:主要用来压缩和清理CSS代码

cssnano-preset-advanced：作为cssnano的高级优化（不安装可能会报错）

在项目跟目录创建postcss.config.js文件 导入一下代码

```
module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-url": {},
    "postcss-aspect-ratio-mini": {},
    "postcss-write-svg": {
      utf8: false
    },
    "postcss-cssnext": {},
    "postcss-px-to-viewport": {
      viewportWidth: 750, // (Number) The width of the viewport.
      viewportHeight: 1334, // (Number) The height of the viewport.
      unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
      viewportUnit: "vw", // (String) Expected units.
      selectorBlackList: [".ignore", ".hairlines"], // (Array) The selectors to ignore and leave as px.
      minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
      mediaQuery: false // (Boolean) Allow px to be converted in media queries.
    },
    "postcss-viewport-units": {},
    cssnano: {
      preset: "advanced",
      autoprefixer: false,
      "postcss-zindex": false
    }
  }
};
```

运行 npm run serve 

如报错请检查package.json中把此段代码删除，重新npm run serve

```
"postcss": {
    "plugins": {
      "autoprefixer": {}
    }
  },
```
注意：Viewport Units Buggyfill 会设置content会起副作用，比如img标签设置content浏览器不会显示图片，可以给img添加全局样式

```
img{
content:normal !important;
```

### 需要注意的配置
- propList: 当有些属性的单位我们不希望转换的时候，可以添加在数组后面，并在前面加上!号，如propList: ["*","!letter-spacing"],这表示：所有css属性的属性的单位都进行转化，除了letter-spacing的
- selectorBlackList：转换的黑名单，在黑名单里面的我们可以写入字符串，只要类名包含有这个字符串，就不会被匹配。比如selectorBlackList: ['wrap'],它表示形如wrap,my-wrap,wrapper这样的类名的单位，都不会被转换


### 关于兼容第三方UI库
