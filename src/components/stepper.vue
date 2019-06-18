<template>
   <div class="cartcontrol">
       <!-- 减号 -->
       <transition name="move">
            <div class="cart-decrease" v-show="food.count > 0" @click.stop="decrease">
                <span class="inner icon-remove_circle_outline"></span>
            </div>
       </transition>
       <!-- 数量 -->
       <div class="cart-count" v-show="food.count > 0">
           {{food.count}}
       </div>
       <!-- 加号 -->
       <div class="cart-add icon-add_circle" @click.stop="add"></div>
       <!-- .stop 修饰符来阻止click事件冒泡 -->
   </div>
</template>

<script>
export default {
   name: 'stepper',
   props: {
       food: {
           type: Object,
           default() {
               return {}
           }
       }
   },
    methods: {
        add() {
            if (!this.food.count) {
                // 因为count不是food数据自带属性，所以需要用 $set() API 给food数据，响应式的增加count属性
                this.$set(this.food, 'count', 1)
            } else {
                this.food.count++
            }
        },
        decrease() {
            if (this.food.count) { // 如果 count > 0 时，自减
                this.food.count--
            }
        }
    }
}
</script>

<style scoped lang="stylus">
@import '~stylus/stepper/index'
</style>
