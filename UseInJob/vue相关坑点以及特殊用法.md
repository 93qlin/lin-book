# vue项目中遇到的问题
 ## 使用 vue-router，页面加载完成后，$route 的值不正确
 ### 原因： 在 mounted 中，router 的初始化还没有完成，所以取到的是一个初始默认值。
 ### 解决方法： 用 onReady
 
 ```
 mounted(){	
	this.$router.onReady(() => {
		if (this.$route.matched.length === 0) {
			this.$router.push("/index");
		}
	});
}

```

### 动态组件

```
<template lang="pug">
.group(v-if="visiable" v-click-outside="handleClickOutside")
    .select-group
        .select-head 分组设置
        .select-content
            .select-title 分组编号
            .select-nums
                .nums-item(
                    v-for="item in groupList" 
                    :key="item.value"
                    @click="selectGroup(item.value)"
                )
                    img(:src="nogroupImg" v-if="!item.value" height="16" width="16")
                    i(v-else :class="{activce: activeIndex === item.value}") {{item.label}}
</template>
<script>
import clickOutside from '@/utils/clickoutside'
export default {
    name: 'group',
    data() {
        return {
            nogroupImg: require('@/renderer/assets/images/customize-img/nogroup.png'),
            curGroupNum: 0,
            visiable: false,
            activeIndex: 1,
            groupList: [
                {label: '0', value: 0},
                {label: '1', value: 1},
                {label: '2', value: 2},
                {label: '3', value: 3},
                {label: '4', value: 4},
                {label: '5', value: 5},
                {label: '6', value: 6},
                {label: '7', value: 7},
                {label: '8', value: 8},
                {label: '9', value: 9},
                {label: '10', value: 10},
                {label: '11', value: 11},
                {label: '12', value: 12}
            ]
        }
    },
    directives: {
        clickOutside
    },
    methods: {
        selectGroup(v) {
            this.activeIndex = v
            this.$emit('selectGroup', v)
        },
        handleClickOutside() {
            this.$emit('clickOutside')
        }
    }
}
</script>
<style lang="scss" scoped>
.group{
    height: 110px;
    width: 300px;
    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    border: 1px solid rgba($form-border-color, 0.26);
    .select-group{
        height: 100%;
        .select-head{
            height: 32px;
            padding-left: 12px;
            line-height: 32px;
            background-color: #2A2A2A;
            @include font($PingFangSCMedium, 14px, #EBEBEB, 500)
        }

        .select-content{
            padding: 16px;
            border-radius: 0 0 4px 4px;
            background-color:  #242424;
            .select-title{
                padding-bottom: 9px;
                @include font($PingFangSCRegular, 12px, #EBEBEB, 400)
            }
            .select-nums{
                display: flex;
                justify-content: space-between;
            }

            .nums-item{
                i {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    text-align: center;
                    background: #999999;
                    border-radius: 1px;
                    cursor: pointer;
                    @include font($PingFangSCMedium, 12px, #434343, bold)
                }
                i:hover{
                    background-color: #EBEBEB;
                    color:#434343;
                }
                .activce{
                    background-color: #0BC0F1;
                    color:#EBEBEB
                }
            }
        }
    }

}
</style>
```

```
import Vue from 'vue'
import Group from './group.vue'

const Component = Vue.extend(Group)
let vm, element
// 隐藏弹框占位
const eleToggle = () => {
    let display = element.style.display
    if (display === 'none') {
        element.style.display = 'block'
    } else {
        element.style.display = 'none'
    }
}
/**
 * 弹出分组
 * @param options.clientX
 * @param options.clientY
 * @param options.index 组
 */
export default function group(options = {}) {
    if (!vm) {
        vm = new Component({el: document.createElement('div')})
        element = document.createElement('div')
        element.appendChild(vm.$el)
        document.body.appendChild(element)
    } else {
        eleToggle()
    }
    const {style} = element
    style.position = 'fixed'
    style.height = '110px'
    style.width = '300px'
    style.top = options.clientY ? options.clientY + 'px' : 0
    style.bottom = 0
    style.left = options.clientX ? options.clientX + 'px' : 0
    style.right = 0
    style.zIndex = 9999
    style.transform = 'translate(-140px,17px)'

    vm.$off('clickOutside').$on('clickOutside', () => {
        if (vm.visiable) {
            vm.visiable = false
            element.style.display = 'none'
        }
    })
    vm.visiable = !vm.visiable
    vm.activeIndex = options.index
    return new Promise((resolve, reject) => {
        resolve(cb => {
            vm.$off('selectGroup').$on('selectGroup', (v) => {
                cb(v)
            })
        })
    })
}
```

```
<template lang="pug">
.wrapper-search
    .content.left
        .title(v-if="showTitle") {{title}}
        .search(v-else)
            stock-search(
                :stockCode="stockCode"
                :stockMarket="stockMarket"
                @change="onStockChange"
                :stockDetail="stockDetail"
                :excludeMarket="excludeMarket"
            )
            .stock-name {{stockName}}
    .content.right
        .group(@click="handlerGroup($event)" v-if="showGroup")
            span(v-if="groupIndex") {{groupIndex}}
            img(v-else :src="nogroupImg" height="16" width="16")
        .close
            img(:src="deleteImg" height="13" width="13" @click="handleDelete")
</template>

<script>
import stockSearch from '@/renderer/components/stock-search'

import group from '../group/index.js'
export default {
    name: 'wrapper-search',
    components: {
        stockSearch
    },
    props: {
        excludeMarket: { // 搜索排除的市场
            type: Array,
            default: () => null
        },
        title: {
            type: String,
            default: ''
        },
        groupOrder: {
            type: Number,
            default: 1
        },
        showGroup: {
            type: Boolean,
            default: true
        },
        stockDetail: {
            type: Object,
            default: () => null
        }
    },
    data() {
        return {
            nogroupImg: require('@/renderer/assets/images/customize-img/nogroup.png'),
            deleteImg: require('@/renderer/assets/images/delete-black.png'),
            group: group
        }
    },
    computed: {
        groupIndex: {
            get() {
                return this.groupOrder
            },
            set(v) {
                this.$emit('update:groupOrder', v)
            }
        },
        stockCode() {
            return this.stockDetail ? this.stockDetail.symbol : ''
        },
        stockMarket() {
            return this.stockDetail ? this.stockDetail.market : ''
        },
        stockName() {
            return this.stockDetail ? this.stockDetail.name : ''
        },
        showTitle() {
            return !!this.title
        }
    },
    methods: {
        onStockChange(stock) {
            this.$emit('handleSearch', stock)
        },
        handlerGroup(e) {
            this.group({
                clientX: e.clientX,
                clientY: e.clientY,
                index: this.groupIndex
            }).then(cb => {
                cb((v) => {
                    this.groupIndex = v
                })
            })
        },
        handleDelete() {
            this.$emit('remove')
        }
    }
}
</script>
<style lang="scss" scoped>
.wrapper-search{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #2E2E2E;

    .title{
        @include font($PingFangSCMedium, $text-font-small-size, $form-color, 500);
    }
    .content{
        display: flex;
        align-items: center;
        .search{
            width: 100%;
            display: flex;
            align-items: center;
            .stock-name{
                padding-left: 6px;
                @include font($PingFangSCMedium, $text-font-small-size, $form-color, 500);
                width: 50%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
    .left{
        padding-left: 8px;
        width: 85%;
    }
    .right{
        padding-right: 8px;
        .group{
            height: 16px;
            width: 16px;
            line-height: 16px;
            text-align: center;
            background-color: #999999;
            color: #434343;
            border-radius: 1px;
            font-weight: bold;
        }
        .close{
            height: 13px;
            width: 13px;
            margin-left: 8px;
        }
    }
}
</style>
```
