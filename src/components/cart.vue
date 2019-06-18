<template>
   <div class="shopcart">
       <div class="content">
           <!--  logo 和 配送费-->
           <div class="content-left">
               <div class="logo-wrapper">
                   <div class="logo" :class="{'highlight': totalCount > 0}">
                       <i class="icon-shopping_cart" :class="{'highlight': totalCount > 0}"></i>
                   </div>
                   <div class="num" v-if="totalCount > 0">
                       <!-- bubble组件：抽象出来，以便复用 -->
                       <Bubble :num="totalCount"/>
                   </div>
               </div>
               <div class="price" :class="{'highlight': totalPrice > 0}">
                   {{totalPrice}}
               </div>
               <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
           </div>
            <!-- 按钮 -->
           <div class="content-right">
               <div class="pay" :class="payClass">
                   {{payDesc}}
               </div>
           </div>
       </div>
   </div>
</template>

<script>
import Bubble from 'components/bubble.vue'
export default {
   name: 'cart',
   components: {
       Bubble
   },
   props: {
       selectFoods: { // 选中的商品
            type: Array,
            default() {
                return []
            }
        },
        deliveryPrice: { // 配送费
            type: Number,
            default: 0
        },
        minPrice: { // 最低起送费
            type: Number,
            default: 0
        }
   },
    computed: {
        totalPrice() { // 选中商品总价格
            let total = 0
            this.selectFoods.forEach(item => {
                total += item.price * item.count
            })
            return total
        },
        totalCount() { // 选中商品总数量
            let count = 0
            this.selectFoods.forEach(item => {
                count += item.count
            })
            return count
        },
        payDesc() { // 支付描述
            if (this.totalPrice === 0) {
                return `￥${this.minPrice}元起送`
            } else if (this.totalPrice < this.minPrice) {
                let diff = this.minPrice - this.totalPrice
                return `还差${diff}元起送`
            } else {
                return `去结算`
            }
        },
        payClass() { // 点亮样式
           if (!this.totalCount || this.totalPrice < this.minPrice) {
               return 'not-enough'
           } else {
               return 'enough'
           }
        }
    }
}
</script>

<style scoped lang="stylus">
@import "~stylus/cart/index"
</style>
