eslint、prettier、editorconfig、stylelint、lint-staged、husky、commitlint
===



## eslint和prettier以及[editorconfig](https://editorconfig.org/)
### 使用场景
#### ESLint
> 静态分析您的代码，以帮助您检测格式问题并查找代码不一致之处。
#### Prettier
> 格式化代码类似于ESLint，但不会检查代码质量。它只是用作代码格式化程序。尽管它本身就支持JavaScript，而且还支持JSX，Flow，TypeScript，HTML，JSON，CSS和许多其他语言。

#### EditorConfig
> 在一组开发人员中使用的所有IDE和编辑器中定义了标准的代码格式样式指南。
所有与编辑器相关的配置（行尾、缩进样式、缩进大小…）都应该由EditorConfig处理
- 所有与代码格式相关的事情都应该由Prettier处理
- 其余部分（代码质量）应由ESLint处理

### 自动修复能力
#### ESLint和Prettier都提供了一种自动修复功能，无论何时发现错误，它们都可以对代码进行更改。可以在您的IDE或编辑器中集成此强大功能，以便在保存文件或粘贴一些代码时更正和格式化代码。另一方面，EditorConfig将直接覆盖编辑器的配置。

### 为什么要这三个？
ESLint已经进行了代码自动格式化，那么为什么要使用Prettier？而当我们在使用它时，Prettier已经无需编辑器即可格式化我们的代码。那么，为什么还要用EditorConfig？

首先（linters）检查代码风格/错误的小工具有两大规则：
- 格式规则：防止代码不一致且丑陋的规则（例如：max-len，no-mixed-spaces-and-tabs，关键字间距，逗号样式…）
- 代码质量规则：防止无用或出错的代码的规则（例如，未使用的var，no-exbind-bind，no-implicit-globals，prefer-promise-reject-errors…）

> ESLint可以同时应用这两种规则，并可以自动修复代码。漂亮，而另一方面，仅检查格式错误代码中，但它更好地完成这个工作比ESLint。

## 集成vscode

- 安装好Eslint插件

- 安装Prettier - Code formatter插件
- 安装editorConfig for vscode
- 修改vscode的settings.json文件
command + shift + p输入settings.json修改settings.json文件
```
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
},
"eslint.format.enable": true,
// 为了避免和 eslint 冲突，编辑器默认的代码检查规则关闭（如果开启了）
"editor.formatOnSave": false,
"javascript.format.enable": false,

```
## 进行配置（js文件）

### 1.安装 eslint + prettier
```
yarn add eslint prettier -D
```
### 2.安装 eslint-config-prettier
```
yarn add eslint-config-prettier -D
```
【作用】

> - 让所有可能会与 prettier 规则存在冲突的 eslint rule，失效，并使用 prettier 的规则进行代码检查。
- 相当于，用 prettier 的规则，覆盖掉 eslint:recommended 的部分规则。
- 后面 prettier 格式化，也会根据这个规则来。因此，不会再有冲突。

【使用】
```
.eslintrc.js

{

    "extends": ["eslint:recommended", "prettier"]

}

```
### 3.安装 eslint-plugin-prettier
```
yarn add eslint-plugin-prettier -D
```
【作用】

>将 prettier 的能力集成到 eslint 中。按照 prettier 的规则检查代码规范性，并进行修复。

【使用】

```
.eslintrc.js

{

    "rules":{

        "prettier/prettier":"error" // 不符合 prettier 规则的代码，要进行错误提示（红线）

    },

    "plugins": ["prettier"]

}

或

{

    "extends": ["eslint:recommended","plugin:prettier/recommended"]

}
```
【看一下效果】
```
npx eslint --fix main.js
```
>至此，eslint 会拥有和 prettier 一样的修复能力。
像 prettier 一样，格式化所有不符合规范的代码。


### 4.使用编辑器，自动格式化代码

（1）使用自己编辑器的快捷键，格式化代码
```
以 vscode 为例：shift + option + f

默认格式化规则选择 prettier，即可完成代码格式化。
```
（2）保存代码，自动格式化

同样以 vscode 为例，打开你的 settings.json，添加下面这句话：
```
"editor.formatOnSave": true
```
**【注】**

>至此，js、json、less等文件，均可实现自动格式化。

文件格式化规则，遵从我们在 .eslintrc.js 里的配置。也就是，使用我们的 prettier 插件默认规则去格式化。

【附】

如果你使用的是 webstorm，或许可以参考这个 https://www.jianshu.com/p/2f3cad152192



### 5.规则定制化

> 保存任意 js 文件，观察当前规则是否符合期望。如果不符合，根目录下创建 .prettierrc，进行定制化配置。

如 .prettierrc 如下：

{

      "singleQuote": true

}

再次保存代码，prettier 将会把 js 文件中的双引号，全部格式化为单引号。



至此，对 js 文件的规范定义与自动格式化配置，全部完成。

【注】

这里的 .prettierrc，具有格式化规则的最高优先级。



### 四、让 eslint 认识 js 以外的更多语法【以 typescript 为例】
#### 1.安装
（1）使用 ts，自然要安装 typescript

（2）为了让 eslint 认识 ts 语法，要安装相应的 parser

（3）为了指定 ts 代码的规范，要安装相应的 plugin
```
yarn add typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
```

#### 2.配置
```
{

    "parser":"@typescript-eslint/parser",

    "extends":["plugin:@typescript-eslint/recommended", "eslint:recommended", "prettier"],

    "env":{

        "es6":true,

        "node":true

    },

    "rules":{

        "prettier/prettier":"error"

    },

    "plugins": ["prettier"]

}
```
**【注】extends 的含义**
告诉 eslint，根据指定的规范，去检查指定类型的文件。

如上例：

根据 @typescript-eslint/recommended 规范，检查 ts 代码。

根据 eslint:recommended + prettier 规范，去检查 js 代码。

当某一类型的文件，被制定了不止1个规范，存在某些规范冲突时，后面的会覆盖掉前面的。

在本例中，prettier 制定的规范，会覆盖掉 eslint:recommended 的某些规范。

eslint 会按照覆盖后的规则，去检查 js 文件。


#### 3.使用
```
npx eslint --fix main.ts
```
【如果能够正常格式化】

done。

**【如果出现问题】**

- 这里，eslint 会使用 prettier 插件，根据 prettier 的规则格式化代码。

- 但同时，eslint 会根据 @typescript-eslint/recommended 的规则，检查代码规范性。

- 当 @typescript-eslint/recommended 的规则和 prettier 的规则出现不一致，就会造成，格式化后的代码，报 eslint 错误的问题。


#### 4.解决冲突（如果存在冲突）
使用相应的 prettier 插件，消除冲突。

也就是说，prettier 的规则和 @typescript-eslint/recommended 存在冲突，那就使用 prettier/@typescript-eslint 插件。

和前面，使用 eslint-config-prettier 消除 eslint:recommended 与 prettier 的规则冲突，同理。
```

{

   "parser":"@typescript-eslint/parser",

    "extends":[

        "plugin:@typescript-eslint/recommended", 

        "eslint:recommended", 

        "prettier", 

        "prettier/@typescript-eslint"

    ],

    "env":{

        "es6":true,

        "node":true

    },

    "rules":{

        "prettier/prettier":"error"

    },

    "plugins": ["prettier"]

}
```

**【注意】**

这里，不要通过手动写 rules，去消除出现的冲突。

因为，已经发现的冲突，可能只是部分冲突，手写 rule 不能完整解决冲突问题，会存在遗漏。


#### 5.自定义规则
当 prettier 插件的默认规则，与团队习惯不符合时，进行规则自定义。

（1）校验规则定义（.eslintrc.js）
```
{

   "parser":"@typescript-eslint/parser",

    "extends":[

        "plugin:@typescript-eslint/recommended", 

        "eslint:recommended", 

        "prettier", 

        "prettier/@typescript-eslint"

    ],

    "env":{

        "es6":true,

        "node":true

    },

    "rules":{

        "prettier/prettier":"error",

        // 比如，自定义缩进约束为4格（注意：这个规则会对所有文件生效，不只是ts）      

        "@typescript-eslint/indent": ["error", 4]     

    },

    "plugins": ["prettier"]

}
```
（2）格式化规则定义（.prettierrc）
```
{

    "tabWidth": 4  // 与 eslint 的自定义规则保持一致

}
```

### 五、Prettier 和 EditorConfig
>有些规则，editorconfig 和 .prettierrc 同时可以定义。
因此，我们要避免冗余、重复的定义。

这些规则如下：
```
end_of_line

indent_style

indent_size/tab_width

max_line_length
```
我们将这些规则的定义，均放在 .editorconfig 中。

配置好 .editorconfig 后，保存代码，即使没有配置 .prettierrc，prettier 也会按照 .editorconfig 的定义来格式化代码。



## 六、规范检查增强（husky + lint-staged）
在 git commit 之前，先强制执行prettier格式化（防止某些成员开发期间不开启编辑器格式化）、再检查代码规范，如果检查不通过、阻止提交。

1.新建 .eslintignore + .prettierignore
.eslintignore、.prettierignore，参考如下：
```
.DS_Store

node_modules

dist



.gitignore

.eslintignore

.prettierignore

LICENSE

README.md

yarn.lock

# local env files

.env.local

.env.*.local

# Log files

npm-debug.log*

yarn-debug.log*

yarn-error.log*

# Editor directories and files

.idea

.vscode

*.suo

*.ntvs*

*.njsproj

*.sln

*.sw?

```
2.安装
```
yarn add husky lint-staged -D
```

3.使用（如果使用脚手架可以灵活改变）

```
package.json添加：

"scripts": {

    "lint": "eslint .",

    "prettier": "prettier --write ."

},

"husky": {

    "hooks": {

      "pre-commit": "lint-staged"

    }

  },

  "lint-staged": {

    "*": [

        "npm run prettier", 

        "npm run lint",

        "git add ."

    ]

  }
```


#### [vue cli中](https://cli.vuejs.org/zh/guide/cli-service.html#git-hook)
```
{
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
   "lint-staged": {
    "*.{js,vue}": [
      "vue-cli-service lint",
      "git add"
    ]
  }
}
```

git commit 之前，会自动使用 prettier 格式化 ignore 之外的代码。格式化后，自动检查所有文件，是否全部符合 eslint 规范。

存在不符合规范的代码，git commit 将被终止。

【注】

因为 prettier 只是会帮我们格式化代码，并不能够修复所有 eslint 错误，比如定义未使用的变量，prettier 不会自动帮我们删除，要手动删除。

因此，prettier 后再 eslint，是有必要的。



## 最后rule规则大全以及高级用法

```
 // 定义对象的set存取器属性时，强制定义get
  "accessor-pairs": 2,
  // 指定数组的元素之间要以空格隔开(,后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
  "array-bracket-spacing": [2, "never"],
  // 在块级作用域外访问块内定义的变量是否报错提示
  "block-scoped-var": 0,
  // if while function 后面的{必须与if在同一行，java风格。
  "brace-style": [2, "1tbs", { "allowSingleLine": true }],
  // 双峰驼命名格式
  "camelcase": 2,
  // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
  // always-multiline：多行模式必须带逗号，单行模式不能带逗号
  "comma-dangle": [2, "never"],
  // 控制逗号前后的空格
  "comma-spacing": [2, { "before": false, "after": true }],
  // 控制逗号在行尾出现还是在行首出现
  // http://eslint.org/docs/rules/comma-style
  "comma-style": [2, "last"],
  // 圈复杂度
  "complexity": [2,9],
  // 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always
  "computed-property-spacing": [2,"never"],
  // 强制方法必须返回值，TypeScript强类型，不配置
  "consistent-return": 0,
  // 用于指统一在回调函数中指向this的变量名，箭头函数中的this已经可以指向外层调用者，应该没卵用了
  // e.g [0,"that"] 指定只能 var that = this. that不能指向其他任何值，this也不能赋值给that以外的其他值
  "consistent-this": 0,
  // 强制在子类构造函数中用super()调用父类构造函数，TypeScrip的编译器也会提示
  "constructor-super": 0,
  // if else while for do后面的代码块是否需要{ }包围，参数：
  //    multi  只有块中有多行语句时才需要{ }包围
  //    multi-line  只有块中有多行语句时才需要{ }包围, 但是块中的执行语句只有一行时，
  //                   块中的语句只能跟和if语句在同一行。if (foo) foo++; else doSomething();
  //    multi-or-nest 只有块中有多行语句时才需要{ }包围, 如果块中的执行语句只有一行，执行语句可以零另起一行也可以跟在if语句后面
  //    [2, "multi", "consistent"] 保持前后语句的{ }一致
  //    default: [2, "all"] 全都需要{ }包围
  "curly": [2, "all"],
  // switch语句强制default分支，也可添加 // no default 注释取消此次警告
  "default-case": 2,
  // 强制object.key 中 . 的位置，参数:
  //      property，'.'号应与属性在同一行
  //      object, '.' 号应与对象名在同一行
  "dot-location": [2, "property"],
  // 强制使用.号取属性
  //    参数： allowKeywords：true 使用保留字做属性名时，只能使用.方式取属性
  //                          false 使用保留字做属性名时, 只能使用[]方式取属性 e.g [2, {"allowKeywords": false}]
  //           allowPattern:  当属性名匹配提供的正则表达式时，允许使用[]方式取值,否则只能用.号取值 e.g [2, {"allowPattern": "^[a-z]+(_[a-z]+)+$"}]
  "dot-notation": [2, {"allowKeywords": true}],
  // 文件末尾强制换行
  "eol-last": 2,
  // 使用 === 替代 ==
  "eqeqeq": [2, "allow-null"],
  // 方法表达式是否需要命名
  "func-names": 0,
  // 方法定义风格，参数：
  //    declaration: 强制使用方法声明的方式，function f(){} e.g [2, "declaration"]
  //    expression：强制使用方法表达式的方式，var f = function() {}  e.g [2, "expression"]
  //    allowArrowFunctions: declaration风格中允许箭头函数。 e.g [2, "declaration", { "allowArrowFunctions": true }]
  "func-style": 0,
  "no-alert": 0,//禁止使用alert confirm prompt
  "no-array-constructor": 2,//禁止使用数组构造器
  "no-bitwise": 0,//禁止使用按位运算符
  "no-caller": 1,//禁止使用arguments.caller或arguments.callee
  "no-catch-shadow": 2,//禁止catch子句参数与外部作用域变量同名
  "no-class-assign": 2,//禁止给类赋值
  "no-cond-assign": 2,//禁止在条件表达式中使用赋值语句
  "no-console": 2,//禁止使用console
  "no-const-assign": 2,//禁止修改const声明的变量
  "no-constant-condition": 2,//禁止在条件中使用常量表达式 if(true) if(1)
  "no-continue": 0,//禁止使用continue
  "no-control-regex": 2,//禁止在正则表达式中使用控制字符
  "no-debugger": 2,//禁止使用debugger
  "no-delete-var": 2,//不能对var声明的变量使用delete操作符
  "no-div-regex": 1,//不能使用看起来像除法的正则表达式/=foo/
  "no-dupe-keys": 2,//在创建对象字面量时不允许键重复 {a:1,a:1}
  "no-dupe-args": 2,//函数参数不能重复
  "no-duplicate-case": 2,//switch中的case标签不能重复
  "no-else-return": 2,//如果if语句里面有return,后面不能跟else语句
  "no-empty": 2,//块语句中的内容不能为空
  "no-empty-character-class": 2,//正则表达式中的[]内容不能为空
  "no-empty-label": 2,//禁止使用空label
  "no-eq-null": 2,//禁止对null使用==或!=运算符
  "no-eval": 1,//禁止使用eval
  "no-ex-assign": 2,//禁止给catch语句中的异常参数赋值
  "no-extend-native": 2,//禁止扩展native对象
  "no-extra-bind": 2,//禁止不必要的函数绑定
  "no-extra-boolean-cast": 2,//禁止不必要的bool转换
  "no-extra-parens": 2,//禁止非必要的括号
  "no-extra-semi": 2,//禁止多余的冒号
  "no-fallthrough": 1,//禁止switch穿透
  "no-floating-decimal": 2,//禁止省略浮点数中的0 .5 3.
  "no-func-assign": 2,//禁止重复的函数声明
  "no-implicit-coercion": 1,//禁止隐式转换
  "no-implied-eval": 2,//禁止使用隐式eval
  "no-inline-comments": 0,//禁止行内备注
  "no-inner-declarations": [2, "functions"],//禁止在块语句中使用声明（变量或函数）
  "no-invalid-regexp": 2,//禁止无效的正则表达式
  "no-invalid-this": 2,//禁止无效的this，只能用在构造器，类，对象字面量
  "no-irregular-whitespace": 2,//不能有不规则的空格
  "no-iterator": 2,//禁止使用__iterator__ 属性
  "no-label-var": 2,//label名不能与var声明的变量名相同
  "no-labels": 2,//禁止标签声明
  "no-lone-blocks": 2,//禁止不必要的嵌套块
  "no-lonely-if": 2,//禁止else语句内只有if语句
  "no-loop-func": 1,//禁止在循环中使用函数（如果没有引用外部变量不形成闭包就可以）
  "no-mixed-requires": [0, false],//声明时不能混用声明类型
  "no-mixed-spaces-and-tabs": [2, false],//禁止混用tab和空格
  "linebreak-style": [0, "windows"],//换行风格
  "no-multi-spaces": 1,//不能用多余的空格
  "no-multi-str": 2,//字符串不能用\换行
  "no-multiple-empty-lines": [1, {"max": 2}],//空行最多不能超过2行
  "no-native-reassign": 2,//不能重写native对象
  "no-negated-in-lhs": 2,//in 操作符的左边不能有!
  "no-nested-ternary": 0,//禁止使用嵌套的三目运算
  "no-new": 1,//禁止在使用new构造一个实例后不赋值
  "no-new-func": 1,//禁止使用new Function
  "no-new-object": 2,//禁止使用new Object()
  "no-new-require": 2,//禁止使用new require
  "no-new-wrappers": 2,//禁止使用new创建包装实例，new String new Boolean new Number
  "no-obj-calls": 2,//不能调用内置的全局对象，比如Math() JSON()
  "no-octal": 2,//禁止使用八进制数字
  "no-octal-escape": 2,//禁止使用八进制转义序列
  "no-param-reassign": 2,//禁止给参数重新赋值
  "no-path-concat": 0,//node中不能使用__dirname或__filename做路径拼接
  "no-plusplus": 0,//禁止使用++，--
  "no-process-env": 0,//禁止使用process.env
  "no-process-exit": 0,//禁止使用process.exit()
  "no-proto": 2,//禁止使用__proto__属性
  "no-redeclare": 2,//禁止重复声明变量
  "no-regex-spaces": 2,//禁止在正则表达式字面量中使用多个空格 /foo bar/
  "no-restricted-modules": 0,//如果禁用了指定模块，使用就会报错
  "no-return-assign": 1,//return 语句中不能有赋值表达式
  "no-script-url": 0,//禁止使用javascript:void(0)
  "no-self-compare": 2,//不能比较自身
  "no-sequences": 0,//禁止使用逗号运算符
  "no-shadow": 2,//外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
  "no-shadow-restricted-names": 2,//严格模式中规定的限制标识符不能作为声明时的变量名使用
  "no-spaced-func": 2,//函数调用时 函数名与()之间不能有空格
  "no-sparse-arrays": 2,//禁止稀疏数组， [1,,2]
  "no-sync": 0,//nodejs 禁止同步方法
  "no-ternary": 0,//禁止使用三目运算符
  "no-trailing-spaces": 1,//一行结束后面不要有空格
  "no-this-before-super": 0,//在调用super()之前不能使用this或super
  "no-throw-literal": 2,//禁止抛出字面量错误 throw "error";
  "no-undef": 1,//不能有未定义的变量
  "no-undef-init": 2,//变量初始化时不能直接给它赋值为undefined
  "no-undefined": 2,//不能使用undefined
  "no-unexpected-multiline": 2,//避免多行表达式
  "no-underscore-dangle": 1,//标识符不能以_开头或结尾
  "no-unneeded-ternary": 2,//禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
  "no-unreachable": 2,//不能有无法执行的代码
  "no-unused-expressions": 2,//禁止无用的表达式
  "no-unused-vars": [2, {"vars": "all", "args": "after-used"}],//不能有声明后未被使用的变量或参数
  "no-use-before-define": 2,//未定义前不能使用
  "no-useless-call": 2,//禁止不必要的call和apply
  "no-void": 2,//禁用void操作符
  "no-var": 0,//禁用var，用let和const代替
  "no-warning-comments": [1, { "terms": ["todo", "fixme", "xxx"], "location": "start" }],//不能有警告备注
  "no-with": 2,//禁用with
  "array-bracket-spacing": [2, "never"],//是否允许非空数组里面有多余的空格
  "arrow-parens": 0,//箭头函数用小括号括起来
  "arrow-spacing": 0,//=>的前/后括号
  "accessor-pairs": 0,//在对象中使用getter/setter
  "block-scoped-var": 0,//块语句中使用var
  "brace-style": [1, "1tbs"],//大括号风格
  "callback-return": 1,//避免多次调用回调什么的
  "camelcase": 2,//强制驼峰法命名
  "comma-dangle": [2, "never"],//对象字面量项尾不能有逗号
  "comma-spacing": 0,//逗号前后的空格
  "comma-style": [2, "last"],//逗号风格，换行时在行首还是行尾
  "complexity": [0, 11],//循环复杂度
  "computed-property-spacing": [0, "never"],//是否允许计算后的键名什么的
  "consistent-return": 0,//return 后面是否允许省略
  "consistent-this": [2, "that"],//this别名
  "constructor-super": 0,//非派生类不能调用super，派生类必须调用super
  "curly": [2, "all"],//必须使用 if(){} 中的{}
  "default-case": 2,//switch语句最后必须有default
  "dot-location": 0,//对象访问符的位置，换行的时候在行首还是行尾
  "dot-notation": [0, { "allowKeywords": true }],//避免不必要的方括号
  "eol-last": 0,//文件以单一的换行符结束
  "eqeqeq": 2,//必须使用全等
  "func-names": 0,//函数表达式必须有名字
  "func-style": [0, "declaration"],//函数风格，规定只能使用函数声明/函数表达式
  "generator-star-spacing": 0,//生成器函数*的前后空格
  "guard-for-in": 0,//for in循环要用if语句过滤
  "handle-callback-err": 0,//nodejs 处理错误
  "id-length": 0,//变量名长度
  "indent": [2, 4],//缩进风格
  "init-declarations": 0,//声明时必须赋初值
  "key-spacing": [0, { "beforeColon": false, "afterColon": true }],//对象字面量中冒号的前后空格
  "lines-around-comment": 0,//行前/行后备注
  "max-depth": [0, 4],//嵌套块深度
  "max-len": [0, 80, 4],//字符串最大长度
  "max-nested-callbacks": [0, 2],//回调嵌套深度
  "max-params": [0, 3],//函数最多只能有3个参数
  "max-statements": [0, 10],//函数内最多有几个声明
  "new-cap": 2,//函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
  "new-parens": 2,//new时必须加小括号
  "newline-after-var": 2,//变量声明后是否需要空一行
  "object-curly-spacing": [0, "never"],//大括号内是否允许不必要的空格
  "object-shorthand": 0,//强制对象字面量缩写语法
  "one-var": 1,//连续声明
  "operator-assignment": [0, "always"],//赋值运算符 += -=什么的
  "operator-linebreak": [2, "after"],//换行时运算符在行尾还是行首
  "padded-blocks": 0,//块语句内行首行尾是否要空行
  "prefer-const": 0,//首选const
  "prefer-spread": 0,//首选展开运算
  "prefer-reflect": 0,//首选Reflect的方法
  "quotes": [1, "single"],//引号类型 `` "" ''
  "quote-props":[2, "always"],//对象字面量中的属性名是否强制双引号
  "radix": 2,//parseInt必须指定第二个参数
  "id-match": 0,//命名检测
  "require-yield": 0,//生成器函数必须有yield
  "semi": [2, "always"],//语句强制分号结尾
  "semi-spacing": [0, {"before": false, "after": true}],//分号前后空格
  "sort-vars": 0,//变量声明时排序
  "space-after-keywords": [0, "always"],//关键字后面是否要空一格
  "space-before-blocks": [0, "always"],//不以新行开始的块{前面要不要有空格
  "space-before-function-paren": [0, "always"],//函数定义时括号前面要不要有空格
  "space-in-parens": [0, "never"],//小括号里面要不要有空格
  "space-infix-ops": 0,//中缀操作符周围要不要有空格
  "space-return-throw-case": 2,//return throw case后面要不要加空格
  "space-unary-ops": [0, { "words": true, "nonwords": false }],//一元运算符的前/后要不要加空格
  "spaced-comment": 0,//注释风格不要有空格什么的
  "strict": 2,//使用严格模式
  "use-isnan": 2,//禁止比较时使用NaN，只能用isNaN()
  "valid-jsdoc": 0,//jsdoc规则
  "valid-typeof": 2,//必须使用合法的typeof的值
  "vars-on-top": 2,//var必须放在作用域顶部
  "wrap-iife": [2, "inside"],//立即执行函数表达式的小括号风格
  "wrap-regex": 0,//正则表达式字面量用小括号包起来
  "yoda": [2, "never"]//禁止尤达条件
  }
}
```

### eslint层叠配置。例如，假如你有以下结构：
```
your-project
├── .eslintrc
├── lib
│ └── source.js
└─┬ tests
  ├── .eslintrc
  └── test.js
```
> 层叠配置使用离要检测的文件最近的 .eslintrc文件作为最高优先级，然后才是父目录里的配置文件，
