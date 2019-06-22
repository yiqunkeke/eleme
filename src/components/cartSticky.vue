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
import popupMixin from 'js/mixins/popup'
export default {
   mixins: [ popupMixin ],
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
   methods: {
       drop(el) {
           this.$refs.cart.drop(el)
       }
   }
}
</script>

<style scoped lang="stylus">
@import '~stylus/cartSticky/index'
</style>
