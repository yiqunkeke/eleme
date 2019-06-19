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
            <transition name="move">
                <div v-show="visible">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty">清空</span>
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
                                    <Stepper :food="item"/>
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
const EVENT_HIDE = 'hide'
export default {
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
   data() {
       return {
           visible: false
       }
   },
   methods: {
       // 定义函数供调用
       show() {
           this.visible = true
       },
       hide() {
           this.visible = false
           this.$emit(EVENT_HIDE)
       }
   }
}
</script>

<style scoped lang="stylus">
@import '~stylus/cartList/index'
</style>
