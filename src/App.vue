<template>
  <div id="app">
    <VHeader :seller="seller"/>
    <div class="tab-wrapper">
      <Tab :tabs="tabs" :initialIndex=0 />
    </div>
  </div>
</template>

<script>
import VHeader from 'components/header.vue'
import Tab from 'components/tab.vue'
import Goods from 'components/goods.vue' // Tab组件数据中用到的 组件
import Ratings from 'components/ratings.vue'
import Seller from 'components/seller.vue'
import { getSeller } from 'api'
import qs from 'query-string' // parse()方法：解析出对象; stringify(): 解析出字符串

export default {
  components: {
    VHeader,
    Tab
  },
  computed: {
    tabs() {
      return [
              {
                  label: '商品',
                  component: Goods,
                  data: {
                    seller: this.seller
                  }
              },
              {
                  label: '评论',
                  component: Ratings,
                  data: {
                    seller: this.seller
                  }
              },
              {
                  label: '商家',
                  component: Seller,
                  data: {
                    seller: this.seller
                  }
              }
        ]
    }
  },
  data() {
    return {
      seller: {
        id: qs.parse(location.search).id
      }
    }
  },
  created() {
    this._getSeller()
  },
  methods: {
    // 获取数据seller
    _getSeller() {
        getSeller({
          id: this.seller.id
        }).then(seller => {
          // 对axios进行封装之后，就不需要在这里对返回数据的状态做判断了
          this.seller = seller
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
  #app
    .tab-wrapper
      position: fixed
      top: 136px
      left: 0
      right: 0
      bottom: 0
</style>
