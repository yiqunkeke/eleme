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
                    </div>
            </li>
          </ul>
          </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <!-- 购物车 -->
    <div class="shop-cart-wrapper">
        <Cart :deliveryPrice="seller.deliveryPrice"
              :minPrice="seller.minPrice"/>
    </div>
  </div>
</template>

<script>
import Cart from 'components/cart.vue'
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
    Cart
  },
  computed: {
    seller() {
      return this.data.seller
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
      getGoods().then(goods => {
        this.goods = goods
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/goods/index'
</style>
