<template>
   <div class="shop-cart-sticky" v-show="visible">
       <Cart :selectFoods="selectFoods"
             :deliveryPrice="deliveryPrice"
             :minPrice="minPrice"
             :fold="fold"
             :sticky=true
             ref="cart"
       />
   </div>
</template>

<script>
import Cart from 'components/cart.vue'
export default {
   name: 'cartSticky',
   components: {
       Cart // 内部依赖cart组件
   },
   props: {
       selectFoods: {
           type: Array,
           default() {
               return []
           }
       },
       deliveryPrice: {
           type: Number,
           default: 0
       },
       minPrice: {
           type: Number,
           default: 0
       },
       fold: {
            type: Boolean,
            default: true
        },
        list: {
            type: Object,
            default() {
                return {}
            }
        }
   },
   data() {
       return {
           visible: false
       }
   },
   methods: {
       show() { // 通过定义show()和 hide()方法来控制该组件的显示和隐藏
           this.visible = true
       },
       hide() {
           this.visible = false
       },
       drop(el) {
           this.$refs.cart.drop(el)
       }
   }
}
</script>

<style scoped lang="stylus">
@import '~stylus/cartSticky/index'
</style>
