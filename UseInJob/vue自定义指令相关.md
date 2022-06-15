场景
1.为组件添加loading效果
2.按钮级别权限控制 v-permission
3.代码埋点,根据操作类型定义指令
4.input 输入框自动获取焦点



&emsp;[1. vue指令实现权限控制](#k1)
&emsp;[2. vue指令实现上传excel](#k2)
&emsp;[3. v-track：🕹一个基于Vue指令实现的埋点插件~](#k2)

## 原理
###  vue指令本质
> 指令本质上是装饰器，是vue对HTML元素的扩展，给HTML元素增加自定义功能，语义化HTML标签。vue编译DOM时，会执行与指令关联的JS代码，即找到指令对象，执行指令对象的相关方法。

### 自定义指令生命周期
自定义指令有五个生命周期（也叫钩子函数），分别是bind、inserted、update、componentUpdated、unbind

### 钩子函数作用介绍
- bind：只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个绑定时执行一次的初始化动作。
- inserted：被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于document中）。
- update：被绑定于元素所在的模板更新时调用，而无论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
- componentUpdated：被绑定元素所在模板完成一次更新周期时调用。
- unbind：只调用一次，指令与元素解绑时调用。
实现过程

```
源码

// 版本2.6.10
export default {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode: VNodeWithData) {
    updateDirectives(vnode, emptyNode)
  }
}

function updateDirectives (oldVnode: VNodeWithData, vnode: VNodeWithData) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode)
  }
}

function _update (oldVnode, vnode) {
  const isCreate = oldVnode === emptyNode // 判断虚拟节点是否是一个新创建的节点
  const isDestroy = vnode === emptyNode // 当新的虚拟节点不存在，在旧虚拟节点存在时，为true
  const oldDirs = normalizeDirectives(oldVnode.data.directives, oldVnode.context) // 旧指令集合
  const newDirs = normalizeDirectives(vnode.data.directives, vnode.context) // 新指令集合

  const dirsWithInsert = [] // 保存需要触发inserted指令钩子的列表
  const dirsWithPostpatch = [] // 保存需要触发componentUpdated指令钩子的列表

  let key, oldDir, dir
  for (key in newDirs) {
    oldDir = oldDirs[key]
    dir = newDirs[key]
    if (!oldDir) { // 判断oldDir是否存在，如果不存在，则首次绑定到元素中
      // 调用bind
      callHook(dir, 'bind', vnode, oldVnode)
      // 判断指令是否有inserted方法，有则添加到dirsWithInsert，保证执行完指令的bind方法后执行inserted方法
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir)
      }
    } else {
      // oldDir存在，则更新指令
      dir.oldValue = oldDir.value
      dir.oldArg = oldDir.arg
      callHook(dir, 'update', vnode, oldVnode)
      // 判断指令是否有componentUpdated方法，有则添加到dirsWithPostpatch，
      // 保证指令所在的vnode及自vnode更新完后（执行完指令的update方法后），执行componentUpdated方法
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir)
      }
    }
  }

  if (dirsWithInsert.length) {
    const callInsert = () => {
      for (let i = 0; i < dirsWithInsert.length; i++) {
        callHook(dirsWithInsert[i], 'inserted', vnode, oldVnode)
      }
    }
    if (isCreate) {
      // 如果是新创建的节点，使用mergeVNodeHook将一个钩子函数与虚拟节点现有的钩子函数合并在一起
      // 可以将钩子函数的执行推迟到被绑定的元素插入到父节点之后进行
      mergeVNodeHook(vnode, 'insert', callInsert)
    } else {
      callInsert()
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', () => {
      for (let i = 0; i < dirsWithPostpatch.length; i++) {
        callHook(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode)
      }
    })
  }

  // 先判断当前虚拟节点是否是新创建
  if (!isCreate) {
    // 循环旧指令集合，找出不存在的，则该指令是废弃的，并执行指令的unbind方法
    for (key in oldDirs) {
      if (!newDirs[key]) {
        callHook(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy)
      }
    }
  }
}

const emptyModifiers = Object.create(null)

function normalizeDirectives (
  dirs: ?Array<VNodeDirective>,
  vm: Component
): { [key: string]: VNodeDirective } {
  const res = Object.create(null)
  if (!dirs) {
    return res
  }
  let i, dir
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i]
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers
    }
    res[getRawDirName(dir)] = dir
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true)
  }
  return res
}

function getRawDirName (dir: VNodeDirective): string {
  return dir.rawName || `${dir.name}.${Object.keys(dir.modifiers || {}).join('.')}`
}

function callHook (dir, hook, vnode, oldVnode, isDestroy) {
  const fn = dir.def && dir.def[hook]
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy)
    } catch (e) {
      handleError(e, vnode.context, `directive ${dir.name} ${hook} hook`)
    }
  }
}
```

<h5 id='k1'>1. vue指令实现权限控制</h5>

## 思路：

> 登录：当用户填写完账号和密码后向服务端验证是否正确，验证通过之后，服务端会返回一个token，拿到token之后（我会将这个token存贮到sessionStorage中，保证刷新页面后能记住用户登录状态），前端会根据token再去拉取一个 user_info 的接口来获取用户的详细信息（如用户权限，用户名等等信息）。
权限验证：通过token获取用户对应的 role，自定义指令，获取路由meta属性里btnPermissions( 注： meta.btnPermissions是存放按钮权限的数组，在路由表里配置 )，然后判断role是否在btnPermissions数组里，若不在即删除该按钮DOM。
按钮权限也可以用v-if判断，但是如果页面过多，每个页面页面都要获取用户权限role和路由表里的meta.btnPermissions,然后再做判断，感觉有点麻烦，而自定义指令，只需在权限按钮加入该指令即可。

## 路由配置：

 

```
path: '/permission',
  component: Layout,
  name: '权限测试',
  meta: { btnPermissions: ['admin','supper','normal'] }, //页面需要的权限
  children: [
   {
    path: 'supper',
    component: _import('system/supper'),
    name: '权限测试页',
    meta: { btnPermissions: ['admin','supper'] } //页面需要的权限
   },
   {
    path: 'normal',
    component: _import('system/normal'),
    name: '权限测试页',
    meta: { btnPermissions: ['admin'] } //页面需要的权限
   }
  ]
```
注：如果按钮的权限是由后台配置并返回的此处可不设置，从后台获取权限即可

自定义指令：

 

```
import Vue from 'vue'
/**权限指令**/
　　const has = Vue.directive('has', {
  　　// 当被绑定的元素插入到 DOM 中时……
  　　inserted: function (el, binding, vnode) {
    　　let btnPermissions = '';
    　　// 获取指令按钮权限
    　　let characteristic = binding.value;
    　　if (characteristic) btnPermissions = characteristic;
    　　// 获取路由按钮权限
    　　btnPermissions = vnode.context.$route.meta.btnPermissions.split(',');
    　　if (!Vue.prototype.$_has(btnPermissions)) {
      　　el.parentNode.removeChild(el);
    　　}
  　　}
　　});
// 权限检查方法
Vue.prototype.$_has = function (value) {
 let isExist = false;
 let btnPermissionsStr = sessionStorage.getItem("btnPermissions");
 if (btnPermissionsStr == undefined || btnPermissionsStr == null) {
  return false;
 }
 let res = value.filter((x) => {
 　　return btnPermissionsStr.include(x)
 })
 if (res.length > 0) isExist = truereturn isExist;
};

export {has}
```
然后在main.js文件引入文件
```
import has from './public/js/btnPermissions.js';
```
页面中按钮只需加v-has即可
```
<el-button @click='editClick' type="primary" v-has>编辑</el-button>
```
权限前后端都可进行控制，但是尽可能的在前端就进行拦截验证。借用一句经典名言：永远不相信用户输入！

<h5 id='k2'>2. vue指令上传excel</h5>

> 前几天因为业务需求，所维护的而后台中出现了大量关于上传下载Excel的操作。因为我们的后台是基于Vue，并且是在 vue-element-admin 的基础上结合实际需求开发而来。vue-element-admin 中也有一些相关操作 Excel 的示例，都十分清晰明了，很快就能上手。而我们当然首要参考了 vue-element-admin 的操作方式，如上传 Excel：


```
<template>
  <div>
    <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">
    <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      Drop excel file here or
      <el-button :loading="loading" style="margin-left:16px;" size="mini" type="primary" @click="handleUpload">
        Browse
      </el-button>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
///
</script>
```

> 在上传 Excel 中，vue-element-admin 的做法是，点击上传按钮时触发事先放在组件内的 input 的 click ,在通过监听 input 的 change 事件，获取读取到的 Excel 文档。事实上，对文件的处理也只能这样了，读取到 file 后通过 xlsx 工具库，对 file 进行 JSON 化处理再发给后端。（不要问我为什么这些事情要前端来做，问就是我乐意）。

> 刚刚说到这样做没得啥子问题，但是在实际项目中，尤其是后台管理系统，。几乎很多页面几乎都是表格、查询、批量操作等。最开始的时候，我就是直接把 input + 按钮 放在业务页面，但是随着项目慢慢变大，这样就显得有些臃肿了。不仅增加了代码量，也不利于维护。于是我把这个功能封装成了一个组将，就像 vue-element-admin 就类似那样。但是后来随着项目越来越来，越来越多的页面需要 Excel 操作，我对这种频繁引入此组件的方式也开始不厌其法。这个时候其实就有两种选择了：将组件注册为全局组件，或者使用自定义指令达到相同的效果。正如标题写的那样，我选择了后者。

> 因为 Excel 这个需求，体现上无非就是：点击了某个按钮，弹出文件选择，用户选择 Excel 后直接读取。因此，直接参与在业务中的只有按钮，至于用户在选择 Excel 后，我需要把这部操作封装一下，因为逐步操作和业务没有直接关系。因此，我需要实现一个针对选择 Excel 按钮的自定义指令：

```
  // 注册全局自定义快速读取 excel `v-read-excel`
  Vue.directive('read-excel', {
    inserted: (el, { value }) => {
      const id = Date.now()
      const input = document.createElement('input')
      el['read-excel-id'] = id
      input.id = id
      input.type = 'file'
      input.accept = '.xlsx, .xls'
      input.onchange = ({ target: { files: [excel] }}) => {
        if(!excel) return    
        const XLSX = require('xlsx')
        const reader = new FileReader()
        reader.onload = async({ target: { result }}) => {
          const workbook = XLSX.read(result, { type: 'array' })
          value && value(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]))
        }
        reader.readAsArrayBuffer(excel)
      }
      input.style.display = 'none'
      document.body.appendChild(input)
      el.addEventListener('click', () => document.getElementById(id).click())
    },
    unbind: el => document.getElementById(el['read-excel-id']).remove()
  })
```
使用起来无需引入组件，更无需 input ，只需要这样：

```
<template>
  <div class="PageUploadExcel">
    <el-button v-read-excel="upload" type="primary">上传Excel</el-button>
  </div>
</template>

<script>
export default {
  name: 'PageUploadExcel',
  data() {
    return {
      list: []
    }
  },
  methods: {
    upload(list) {
      this.list = list
    }
  }
}
</script>
```

原理很简单：在被绑定按钮插入文档后，给这个按钮配套一个 input 放在 body 里，点击按钮就会触发 input ... 在被绑定按钮被移除文档同时也删除掉自己所对应的 input。

这就是关于上传 Excel 的自定义指令封装操作。

至于下载，也是参考 vue-element-admin 的做法，不过也是为了使用简便，就直接把方法挂在 Vue 原型上了：

```
  Vue.prototype.$excel = function(list, name) {
    !list.length ? list = [{ '暂无数据': '' }] : ''
    import('@/utils/Export2Excel').then(excel => {
      excel.export_json_to_excel({
        header: Object.keys(list[0]),
        data: list.map(listItem => Object.keys(list[0]).map(j => listItem[j])),
        filename: name || '下载Excel',
        bookType: 'xlsx'
      })
    })
  }
```
这个用起来更简单：

```
<template>
  <div class="PageDownloadExcel">
    <el-button type="primary" @click="download">下载Excel</el-button>
  </div>
</template>

<script>
export default {
  name: 'PageDownloadExcel',
  data() {
    return {
      list: [
        { '姓名': '张三', '年龄': 18, '爱好': '旅游' },
        { '姓名': '李四', '年龄': 19, '爱好': '游泳' },
        { '姓名': '王五', '年龄': 20, '爱好': '吃鸡' }
      ]
    }
  },
  methods: {
    download() {
      this.$excel(this.list, '数据表格')
    }
  }
}
</script>
```
可能你也注意到了，我在这里使用的数据是：

[
    { '姓名': '张三', '年龄': 18, '爱好': '旅游' },
    { '姓名': '李四', '年龄': 19, '爱好': '游泳' },
    { '姓名': '王五', '年龄': 20, '爱好': '吃鸡' }
]
是的，key - value 都是直接用来展示的汉字。这样做，除了方便外，也可以实现后端实时控制导出的字段，我司目前使用的就是这种方式。当然，这个要看具体的业务需求了。

<h5 id='k3'>3. v-track：🕹一个基于Vue指令实现的埋点插件~</h5>
