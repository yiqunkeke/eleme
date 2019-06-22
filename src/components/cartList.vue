<template>
   <transition name="fade">
       <!-- 给cube-popup添加type属性，则会自动生成一个class名为 cube-[typename],方便我们设置样式 -->
        <cube-popup :maskClosable=true
                    position="bottom"
                    :z-index=90
                    type='shop-cart-list'
                    v-show="visible"
                    @mask-click="hide"
        >
            <transition name="move" @after-leave="afterLeave">
                <div v-show="visible">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <cube-scroll class="list-content" ref="listContent">
                        <ul>
                            <li class="food"
                                v-for="item in selectFoods"
                                :key="item.name"
                                >
                                <span class="name">{{ item.name }}</span>
                                <div class="price">
                                    ￥{{item.price * item.count}}
                                </div>
                                <div class="cart-control-wrapper">
                                    <Stepper :food="item" @add="onAdd"/>
                                </div>
                            </li>
                        </ul>
                    </cube-scroll>
                </div>
            </transition>
        </cube-popup>
   </transition>
</template>

<script>
import Stepper from 'components/stepper.vue'
import popupMixin from 'js/mixins/popup'

const EVENT_SHOW = 'show'
const EVENT_LEAVE = 'leave'
const EVENT_ADD = 'add'
export default {
   mixins: [ popupMixin ],
   name: 'cartList', // 该组件被createAPI调用，所以必须有name属性
   components: {
       Stepper
   },
   props: {
       selectFoods: {
           type: Array,
           default() {
               return []
           }
       }
   },
   created() {
       // 因为使用 mixins 混入了 show方法，所以在此进行监听，把剩下的事情放入回调
       this.$on(EVENT_SHOW, () => {
           this.$nextTick(() => {
               this.$refs.listContent.refresh() // 重新计算cube-scroll高度，以实现购物车列表滚动
               // 查阅官方文档： refresh() --->  刷新，重新计算高度且刷新 BetterScroll 实例
           })
       })
   },
   methods: {
       // 定义函数供调用
       afterLeave() {
           this.$emit(EVENT_LEAVE)
       },
       onAdd(target) {
           this.$emit(EVENT_ADD, target)
       },
       empty() {
           this.$createDialog({
               type: 'confirm',
               content: '确认清空吗？',
               $events: { // 监听内部事件
                   confirm: () => {
                       this.selectFoods.forEach(item => {
                           item.count = 0
                       })
                       this.hide()
                   }
               }
           }).show()
       }
   }
}
</script>

<style scoped lang="stylus">
@import '~stylus/cartList/index'
</style>
