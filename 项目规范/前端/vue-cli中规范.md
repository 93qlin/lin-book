## 前言
使用eslint+prettier好处：

- 避免运行时因格式问题报错
- 方便团队合作，代码风格统一
### 0. 建立项目

> 利用Vue-cli3建立Vue项目时，一定要选上Linter/Formatter，然后选择 ESLint + Prettier

![img](../img/20200607180234815.png)

### 1. 安装vscode插件
首先在vscode中安装如下插件：

- eslint
- vetur
- prettier
- editorconfig
### 2. 配置
#### .eslintrc.js(根目录下找)
![img](../img/20200607180904520.png)
注：代码缩进不是4个空格报错。

#### .prettierrc

在文件根目录下创建.prettierrc对prettier格式化进行自定义规则设置，以下为我添加的规则

```
{
 /* 单引号包含字符串 */
 "singleQuote": true,
 /* 不添加末尾分号 */
 "semi": false,
 /* 在对象属性添加空格 */
 "bracketSpacing": true,
 /* 优化html闭合标签不换行的问题 */
 "htmlWhitespaceSensitivity": "ignore",
 /* 只有一个参数的箭头函数的参数是否带圆括号（默认avoid） */
 "arrowParens": "avoid"
}
```

#### .editorconfig

在文件根目录下创建.editorconfig，内容如下：
```
root = true

[*]
charset = utf-8
# 缩进风格为空格
indent_style = space
# 缩进大小为4
indent_size = 4
## 表示以Unix风格的换行符结尾
# end_of_line = lf
# insert_final_newline = true
# # 设为true表示会除去换行行首的任意空白字符。
# trim_trailing_whitespace = true
```
#### [setting.json]（com + shift +P）参考(http://book.93lin.cn/%E9%A1%B9%E7%9B%AE%E8%A7%84%E8%8C%83/%E5%89%8D%E7%AB%AF/eslint+prettier+editorconfig+lint-staged.html)
