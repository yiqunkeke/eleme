<template>
   <div class="shopcart">
       <div class="content" @click="toggleCartList">
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
        },
        fold: { // 由cartSticky组件传递进来
            type: Boolean,
            default: true
        },
        sticky: {
            type: Boolean,
            default: false // 默认不是sticky组件
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
    watch: {
        fold(newVal) {
            this.listFold = newVal
        }
    },
    data() {
        return {
            balls: createBalls(),
            listFold: this.fold // 标志cartList的显隐
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
        },
        // 切换购物车列表 cartList 组件的显隐
        toggleCartList() {
            // 如果总数量为0，则直接返回，不做任何操作
            if (!this.totalCount) {
               return
            }
            //  收起时---> 显示
            if (this.listFold) {
                this._showCartList()
                this._showCartSticky()
                this.listFold = false
            } else {
                // 展开时---> 隐藏
                this._hideCartList()
                this.listFold = true
            }
        },
        // List 组件----create-api---显示
        _showCartList() {
            this.cartListComp = this.cartListComp || this.$createCartList({
                 // 定义 create-api 组件实例
                 // 用 || 运算符，做一个缓存
                $props: {
                    selectFoods: 'selectFoods' // 这里一定要写成字符串方式，来保证是响应式的
                },
                $events: { // 事件回调（查阅官方API）----监听子组件中触发的事件
                    hide: () => {
                        this.listFold = true // 点击蒙层时，设置 cartListFold 为隐藏
                        // this._hideCartSticky()
                    },
                    leave: () => {
                        this._hideCartSticky() // cartList组件动画结束时，cartSticky 隐藏
                    },
                    add: (el) => {
                        this.cartStickyComp.drop(el)
                    }
                }
            })
            this.cartListComp.show()
        },
        // List 组件----create-api----隐藏
        _hideCartList() {
            const comp = this.sticky ? this.$parent.list : this.cartListComp
            comp.hide && comp.hide()
        },
        // Sticky组件----create-api 显示
        _showCartSticky() {
            this.cartStickyComp = this.cartStickyComp || this.$createCartSticky({
                $props: {
                    selectFoods: 'selectFoods',
                    deliveryPrice: 'deliveryPrice',
                    minPrice: 'minPrice',
                    fold: 'listFold',
                    list: this.cartListComp // 把 List组件传给 Sticky 组件
                }
            })
            this.cartStickyComp.show()
        },
        // Sticky组件----create-api 隐藏
        _hideCartSticky() {
            this.cartStickyComp.hide()
        }
    }
}
</script>

<style scoped lang="stylus">
@import "~stylus/cart/index"
</style>
