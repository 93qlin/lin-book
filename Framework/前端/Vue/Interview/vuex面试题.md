vuex面试题

===


&emsp;[0.vuex实现原理？](#w0)

&emsp;[1.vuex中为什么把把异步操作封装在action，把同步操作放在mutations？](#w1)

&emsp;[2.Vuex 模块化+命名空间后, 如何调用其他模块的 state, actions, mutations, getters ？](#w2)

&emsp;[3.怎么通过getter来实现在组件内可以通过特定条件来获取state的状态？](#w3)

&emsp;[4.怎么在组件中批量给Vuex的getter属性取别名并使用?](#w4)

&emsp;[5.在action函数中返回Promise，然后再提交时候用then处理?](#w5)

&emsp;[6.Vuex中有两个action，分别是actionA和actionB，其内都是异步操作，在actionB要提交actionA，需在actionA处理结束再处理其它操作，怎么实现?](#w6)

&emsp;[7.在v-model上怎么用Vuex中state的值?](#w7)

&emsp;[8. 在v-Vuex插件有用过吗？怎么用简单介绍一下? 在Vuex插件中怎么监听组件中提交mutation和action？](#w8)

&emsp;[9. 单向数据流的理解？](#w9)


<h2 id='w0'>0. vuex实现原理？</h2>

### store注入组件install方法

#### vuex是通过vue插件机制将组件注入的
首先使用vuex,需要安装插件：
```
Vue.use(Vuex); // vue的插件机制,安装vuex插件
```
当ues(Vuex)时候，会调用vuex中的install方法，装在vuex! 下面时install的核心源码：

```
Vue.mixin({
        beforeCreate() {
            if (this.$options && this.$options.store) {
                //找到根组件 main 上面挂一个$store
                this.$store = this.$options.store
                // console.log(this.$store);

            } else {
                //非根组件指向其父组件的$store
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
```
> 可见，store注入 vue的实例组件的方式，是通过vue的 mixin机制，借助vue组件的生命周期 钩子 beforeCreate 完成的。即 每个vue组件实例化过程中，会在 beforeCreate 钩子前调用 vuexInit 方法。

### vuex中的数据双向绑定

```
this._s = new Vue({ 
    data: {
        // 只有data中的数据才是响应式
        state: options.state
    }
})
```
### getters实现
```
 //实现getters原理
        let getters = options.getters || {}
        // console.log(getters);
        // this.getters = getters; //不是直接挂载到 getters上 这样只会拿到整个 函数体
        this.getters = {};
        // console.log(Object.keys(getters))  // ["myAge","myName"]
        Object.keys(getters).forEach((getterName) => {
            // console.log(getterName)  // myAge
            // 将getterName 放到this.getters = {}中
            // console.log(this.state);
            Object.defineProperty(this.getters, getterName, {
                // 当你要获取getterName（myAge）会自动调用get方法
                // 箭头函数中没有this               
                get: () => {
                    return getters[getterName](this.state)
                }
            })
        })
```

从上面源码，我们可以看出Vuex的state状态是响应式，是借助vue的data是响应式，将state存入vue实例组件的data中；Vuex的getters则是借助vue的计算属性computed实现数据实时监听。

### mutations实现

```
let mutations = options.mutations || {}
        // console.log(mutations);
        this.mutations = {};
        Object.keys(mutations).forEach(mutationName=>{
            // console.log(mutationName);
            
            this.mutations[mutationName] = (payload) =>{
                this.mutations[mutationName](this.state,payload)
            }
        })
```

### actions实现
```
// actions的原理 
        let actions = options.actions || {}
        this.actions = {};
        forEach(actions,(actionName,value)=>{
            this.actions[actionName] = (payload)=>{
                value(this,payload)
            }
        })
```
### commit dispatch的实现

```
    commit(type,payload){
        this.mutations[type](payload)
    }
    // type是actions的类型  
    dispatch=(type,payload)=>{
        this.actions[type](payload)
    }
```

> Vuex是通过全局注入store对象，来实现组件间的状态共享。在大型复杂的项目中（多级组件嵌套），需要实现一个组件更改某个数据，多个组件自动获取更改后的数据进行业务逻辑处理，这时候使用vuex比较合适。假如只是多个组件间传递数据，使用vuex未免有点大材小用，其实只用使用组件间常用的通信方法即可。



<h2 id='w1'>1. vuex中为什么把把异步操作封装在action，把同步操作放在mutations？</h2>

 官方回答： 正在 debug 一个 app 并且观察 devtool 中的 mutation 日志。每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照。然而，在上面的例子中 mutation 中的异步函数中的回调让这不可能完成：因为当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的。

 如果你开着 devtool 调用一个异步的 action，你可以清楚地看到它所调用的 mutation 是何时被记录下来的，并且可以立刻查看它们对应的状态。


<h2 id='w2'> 2. Vuex 模块化+命名空间后, 如何调用其他模块的 state, actions, mutations, getters ?</h2>

假设有这么两个模块:

### 模块A:
```
import api from '~api'

const state = {
    vip: {},
}

const actions = {
    async ['get']({commit, state, dispatch}, config = {}) {
        try {
            const { data: { code, data } } = await api.post('vip/getVipBaseInfo', config)
            if (code === 1001) commit('receive', data)
        } catch(error) { console.log(error) }
    }
}

const mutations = {
    ['receive'](state, data) {
        state.vip = data
    }
}

const getters = {
    ['get'](state) {
        return state.vip
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
```

### 模块B:
```
import api from '~api'

const state = {
    shop: {},
}

const actions = {
    async ['get']({commit, state, dispatch}, config = {}) {
        try {
            const { data: { code, data } } = await api.post('shop/getShopBaseInfo', config)
            if (code === 1001) commit('receive', data)
        } catch(error) { console.log(error) }
    }
}

const mutations = {
    ['receive'](state, data) {
        state.shop = data
    }
}

const getters = {
    ['get'](state) {
        return state.shop
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
```

假设模块 B 的 actions 里, 需要用模块 A 的 state 该怎么办?
```
const actions = {
    async ['shop'](store, config = {}) {
        const { commit, dispatch, state, rootState } = store
        console.log(rootState) // 打印根 state
        console.log(rootState.vip) // 打印其他模块的 state
        try {
            const { data: { code, data } } = await api.post('shop/getShopBaseInfo', config)
            if (code === 1001) commit('receive', data)
        } catch(error) { console.log(error) }
    }
}
```

我们来看下上面的代码, actions 中的 shop 方法, 有 2 个参数, 第一个是 store, 第二个是 dispatch 调用时传过来的参数
store 这个对象又包含了 4 个键, 其中 commit 是调用 mutations 用的, dispatch 是调用 actions 用的, state 是当前模块的 state, 而 rootState 是根 state,
既然能拿到根 state, 想取其他模块的 state 是不是就很简单了...?

### 假设模块 B 的 actions 里, 需要调用模块 A 的 actions 该怎么办?
```
const actions = {
    async ['shop'](store, config = {}) {
        const { commit, dispatch, state, rootState } = store
        try {
            const { data: { code, data } } = await api.post('shop/getShopBaseInfo', config, 'get')
            if (code === 1001) commit('receive', data) // 调用当前模块的 mutations
            dispatch('vip/get', {}, {root: true}) // 调用其他模块的 actions
        } catch(error) { console.log(error) }
    }
}
```
上面的代码中dispatch('vip/vip', {}, {root: true})就是在模块 B 调用 模块 A 的 actions,
有 3 个参数, 第一个参数是其他模块的 actions 路径, 第二个是传给 actions 的数据, 如果不需要传数据, 也必须预留, 第三个参数是配置选项, 申明这个 acitons 不是当前模块的

### 假设模块 B 的 actions 里, 需要调用模块 A 的 mutations 该怎么办?
```
const actions = {
    async ['shop'](store, config = {}) {
        const { commit, dispatch, state, rootState } = store
        try {
            const { data: { code, data } } = await api.post('shop/getShopBaseInfo', config)
            if (code === 1001) commit('receive', data) // 调用当前模块的 mutations
            commit('vip/receive', data, {root: true}) // 调用其他模块的 mutations
        } catch(error) { console.log(error) }
    }
}
```
上面的代码中commit('vip/receive', {}, {root: true})就是在模块 B 调用 模块 A 的 mutations,
有 3 个参数, 第一个参数是其他模块的 mutations 路径, 第二个是传给 mutations 的数据, 如果不需要传数据, 也必须预留, 第三个参数是配置选项, 申明这个 mutations 不是当前模块的

假设模块 B 的 actions 里, 需要用模块 A 的 getters 该怎么办?
```
const actions = {
    async ['shop'](store, config = {}) {
        const { commit, dispatch, state, rootState, rootGetters } = store
        console.log(rootGetters['vip/get']) // 打印其他模块的 getters
        try {
            const { data: { code, data } } = await api.post('shop/getShopBaseInfo', config)
            if (code === 1001) commit('receive', data)
        } catch(error) { console.log(error) }
    }
}
```
我们来看下上面的代码, 相比之前的代码, store 又多了一个键: rootGetters
rootGetters 就是 vuex 中所有的 getters, 你可以用 rootGetters['xxxxx'] 来取其他模块的getters


### 怎么在带命名空间的模块内注册全局的action？

```
actions: {
    actionA: {
        root: true,
        handler (context, data) { ... }
    }
  }
```

### 组件中怎么提交modules中的带命名空间的moduleA中的mutationA？

```
this.$store.commit('moduleA/mutationA',data)
```

怎么使用mapState，mapGetters，mapActions和mapMutations这些函数来绑定带命名空间的模块？



### 首先使用createNamespacedHelpers创建基于某个命名空间辅助函数?

```
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('moduleA');
export default {
    computed: {
        // 在 `module/moduleA` 中查找
        ...mapState({
            a: state => state.a,
            b: state => state.b
        })
    },
    methods: {
        // 在 `module/moduleA` 中查找
        ...mapActions([
            'actionA',
            'actionB'
        ])
    }
}
```

<h2 id='w3'> 3. 怎么通过getter来实现在组件内可以通过特定条件来获取state的状态？
</h2>


通过让getter返回一个函数，来实现给getter传参。然后通过参数来进行判断从而获取state中满足要求的状态。

```
const store = new Vuex.Store({
    state: {
        todos: [
            { id: 1, text: '...', done: true },
            { id: 2, text: '...', done: false }
        ]
    },
    getters: {
        getTodoById: (state) => (id) =>{
            return state.todos.find(todo => todo.id === id)
        }
    },
});
```

然后在组件中可以用计算属性computed通过this.$store.getters.getTodoById(2)这样来访问这些派生转态。
```
computed: {
    getTodoById() {
        return this.$store.getters.getTodoById
    },
}
mounted(){
    console.log(this.getTodoById(2).done)//false
}
```

<h2 id='w4'> 4. 怎么在组件中批量给Vuex的getter属性取别名并使用?</h2>

```
使用mapGetters辅助函数, 利用对象展开运算符将getter混入computed 对象中
import {mapGetters} from 'vuex'
export default{
    computed:{
        ...mapGetters({
            myTotal:'total',
            myDiscountTotal:'discountTotal',
        })
    }
}
```

Vuex中action通常是异步的，那么如何知道action什么时候结束呢？


<h2 id='w5'> 5. 在action函数中返回Promise，然后再提交时候用then处理?</h2>



```
actions:{
    SET_NUMBER_A({commit},data){
        return new Promise((resolve,reject) =>{
            setTimeout(() =>{
                commit('SET_NUMBER',10);
                resolve();
            },2000)
        })
    }
}
this.$store.dispatch('SET_NUMBER_A').then(() => {
  // ...
})

```

<h2 id='w6'> 6. Vuex中有两个action，分别是actionA和actionB，其内都是异步操作，在actionB要提交actionA，需在actionA处理结束再处理其它操作，怎么实现?</h2>

```
利用ES6的async和await来实现。
actions:{
    async actionA({commit}){
        //...
    },
    async actionB({dispatch}){
        await dispatch ('actionA')//等待actionA完成
        // ... 
    }
}
```


<h2 id='w7'> 7. 在v-model上怎么用Vuex中state的值?</h2>
需要通过computed计算属性来转换。

```
<input v-model="message">
// ...
computed: {
    message: {
        get () {
            return this.$store.state.message
        },
        set (value) {
            this.$store.commit('updateMessage', value)
        }
    }
}
```


<h2 id='w8'> 8. 在v-Vuex插件有用过吗？怎么用简单介绍一下? 在Vuex插件中怎么监听组件中提交mutation和action？</h2>

>Vuex插件就是一个函数，它接收 store 作为唯一参数。在Vuex.Store构造器选项plugins引入。

```
在store/plugin.js文件中写入
export default function createPlugin(param){
    return store =>{
        //...
    }
}

然后在store/index.js文件中写入
import createPlugin from './plugin.js'
const myPlugin = createPlugin()
const store = new Vuex.Store({
  // ...
  plugins: [myPlugin]
})
```

### 在Vuex插件中怎么监听组件中提交mutation和action？

```
用Vuex.Store的实例方法subscribe监听组件中提交mutation
用Vuex.Store的实例方法subscribeAction监听组件中提交action
在store/plugin.js文件中写入

export default function createPlugin(param) {
    return store => {
        store.subscribe((mutation, state) => {
            console.log(mutation.type)//是那个mutation
            console.log(mutation.payload)
            console.log(state)
        })
        // store.subscribeAction((action, state) => {
        //     console.log(action.type)//是那个action
        //     console.log(action.payload)//提交action的参数
        // })
        store.subscribeAction({
            before: (action, state) => {//提交action之前
                console.log(`before action ${action.type}`)
            },
            after: (action, state) => {//提交action之后
                console.log(`after action ${action.type}`)
            }
        })
    }
}
```
然后在store/index.js文件中写入
```
import createPlugin from './plugin.js'
const myPlugin = createPlugin()
const store = new Vuex.Store({
  // ...
  plugins: [myPlugin]
})
```

<h2 id='w9'> 9. 在v-Vuex插件有用过吗？怎么用简单介绍一下? 在Vuex插件中怎么监听组件中提交mutation和action？</h2>

> 单向数据流就是从一个组件单方向将数据流向它的内部组件，也就是父组件的数据流向子组件中，但子组件不能将这个数据修改掉，如要返回到父组件中修改然后重新流向子组件

> 作用：防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解