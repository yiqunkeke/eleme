<template>
  <div class="goods">
    <!-- 商品列表 -->
    <div class="scroll-nav-wrapper">
      <cube-scroll-nav
          :side=true
          :data="goods"
          :options="scrollOptions"
           v-if="goods.length"
          >
          <!-- scrollNav组件-插槽 bar:
            定制：导航内容，如果需要自定义导航结构的话使用，里边放置 cube-scroll-nav-bar 组件
            作用域参数：
                    1. labels:所有面板的label值集合
                    2. txts： 所有面板的title集合
                    3. current：当前导航 active项的 key 值
            （详阅官方文档）
          -->
          <template slot="bar" slot-scope="props">
              <cube-scroll-nav-bar
                  direction="vertical"
                  :labels="props.labels"
                  :txts="barTxts"
                  :current="props.current"
              >
                <!-- scrollNavBar组件-插槽 default:
                作用域参数：
                      1. txt: 当前项文案 txt 的值
                      2. index: 当前索引值
                      3. active: 当前 active 的 key 值
                      4. label: 当前项 label 值，即 key 值
                （详阅官方文档）
                 -->
                <template slot-scope="props">
                    <div class="text">
                      <Icon v-if="props.txt.type >= 1"
                        :size=3
                        :type="props.txt.type"
                      />
                      <span>{{props.txt.name}}</span>
                      <span class="num" v-if="props.txt.count">
                          <Bubble :num="props.txt.count"/>
                      </span>
                    </div>
                </template>
              </cube-scroll-nav-bar>
          </template>
          <cube-scroll-nav-panel
              v-for="item in goods"
              :key="item.name"
              :label="item.name"
              :title="item.name"
              >
              <ul>
                <li class="food-item"
                    v-for="it in item.foods"
                    :key="it.name"
                    >
                    <div class="icon">
                        <img :src="it.icon" width="57" height="57">
                    </div>
                    <div class="content">
                        <h2 class="name">{{it.name}}</h2>
                        <p class="desc">{{it.description}}</p>
                        <div class="extra">
                            <span class="count">月售：{{it.sellCount}}份</span>
                            <span>好评率{{it.rating}}</span>
                        </div>
                        <div class="price">
                            <span class="now">￥{{it.price}}</span>
                            <span class="old" v-if="it.oldPrice">￥{{it.oldPrice}}</span>
                        </div>
                        <div class="cart-control-wrapper">
                            <!-- 步进器 -->
                            <Stepper :food="it" @add="onAdd"/>
                        </div>
                    </div>
                </li>
              </ul>
          </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <!-- 购物车 -->
    <div class="shop-cart-wrapper">
        <Cart :deliveryPrice="seller.deliveryPrice"
              :minPrice="seller.minPrice"
              :selectFoods="selectFoods"
              ref="cart"
              />
    </div>
  </div>
</template>

<script>
import Stepper from 'components/stepper.vue'
import Cart from 'components/cart.vue'
import Icon from 'components/icon.vue'
import Bubble from 'components/bubble.vue'
import { getGoods } from 'api'
export default {
  name: 'goods',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    Stepper,
    Cart,
    Icon,
    Bubble
  },
  computed: {
    seller() {
      return this.data.seller
    },
    selectFoods() { // 选中的商品
        let ret = []
        this.goods.forEach(item => {
          item.foods.forEach(it => {
            if (it.count) {
              ret.push(it)
            }
          })
        })
        return ret
    },
    barTxts() { // 构造左侧导航
      let ret = []
      this.goods.forEach(item => {
        const { name, type, foods } = item
        let count = 0
        foods.forEach(it => {
          count += it.count || 0
        })
        ret.push({
          type,
          name,
          count
        })
      })
      return ret
    }
  },
  data() {
    return {
      goods: [],
      scrollOptions: {
        click: false, // 阻止click冒泡
        directionLockThreshold: 0
      }
    }
  },
  methods: {
    // 获取 goods 数据
    fetch() {
      if (!this.fetched) {
        // 使用 fetched 标志位来判断数据是否获取过。达到来回切换三个tab时，不会重复发送网络请求
        this.fetched = true
        getGoods().then(goods => {
          this.goods = goods
        })
      }
    },
    onAdd(el) {
      // 驱动购物车cart组件的 drop() 函数---> 实现小球飞入动画
      this.$refs.cart.drop(el)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/goods/index'
</style>
