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
       <!-- 放置小球的盒子 -->
       <div class="ball-container">
           <div v-for="(item, idx) in balls" :key="idx">
               <transition @before-enter="beforeDrop"
                           @enter="dropping"
                           @after-enter="afterDrop"
                >
                    <div class="ball" v-show="item.show">
                        <div class="inner inner-hook"></div>
                    </div>
               </transition>
           </div>
       </div>
   </div>
</template>

<script>
import Bubble from 'components/bubble.vue'

// 1. 小球个数
const BALL_LEN = 10
const innerClsHook = 'inner-hook'
// 2. 定义辅助函数来遍历小球--给小球添加属性，让小球默认隐藏
function createBalls() {
    let ret = [] // 定义返回值
    for (let i = 0; i < BALL_LEN; i++) {
        ret.push({
            show: false
        })
    }
    return ret
}

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
    },
    data() {
        return {
            balls: createBalls()
        }
    },
    created() {
        this.dropBalls = []
    },
    methods: {
        // 实现小球飞入动画函数
        drop(el) {
            for (let i = 0; i < this.balls.length; i++) {
                const ball = this.balls[i]
                if (!ball.show) {
                    ball.show = true
                    ball.el = el
                    this.dropBalls.push(ball)
                    return
                }
            }
        },
        beforeDrop(el) {
            const ball = this.dropBalls[this.dropBalls.length - 1]
            const rect = ball.el.getBoundingClientRect()
            const x = rect.left - 32
            const y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`
            const inner = el.getElementsByClassName(innerClsHook)[0]
            inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`
        },
        dropping(el, done) {
            this._reflow = document.body.offsetHeight
            el.style.transform = el.style.webkitTransform = `translate3d(0,0,0)`
            const inner = el.getElementsByClassName(innerClsHook)[0]
            inner.style.transform = inner.style.webkitTransform = `translate3d(0,0,0)`
            el.addEventListener('transitionend', done)
        },
        afterDrop(el) {
            const ball = this.dropBalls.shift()
            if (ball) {
                ball.show = false
                el.style.display = 'none'
            }
        }
    }
}
</script>

<style scoped lang="stylus">
@import "~stylus/cart/index"
</style>
