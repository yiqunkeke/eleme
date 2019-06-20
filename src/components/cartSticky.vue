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
       Cart
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
       show() {
           this.visible = true
       },
       hide() {
           this.visible = false
       }
   }
}
</script>

<style scoped lang="stylus">
@import '~stylus/cartSticky/index'
</style>
