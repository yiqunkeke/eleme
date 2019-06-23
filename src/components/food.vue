<template>
  <transition name="move">
    <div class="food" v-show="visible">
      <cube-scroll ref="scroll">
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image" alt="">
            <div class="back" @click="hide">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">
                月售{{food.sellCount}}份
              </span>
              <span class="rating">
                好评率{{food.rating}}%
              </span>
            </div>
            <div class="price">
              <span class="now">
                ￥{{food.price}}
              </span>
              <span class="old" v-show="food.oldPrice">
                ￥{{food.oldPrice}}
              </span>
            </div>
          </div>
          <!-- 分隔 -->
          <Split v-show="food.info"/>
          <div class="info" v-show="food.info">
            <h1 class="title">商品信息</h1>
            <p class="text">{{food.info}}</p>
          </div>
          <!-- 分隔 -->
          <Split />
        </div>
      </cube-scroll>
    </div>
  </transition>
</template>

<script>
import popupMixin from 'js/mixins/popup'
import Split from 'components/split.vue'

const EVENT_SHOW = 'show'

export default {
  mixins: [ popupMixin ],
  name: 'food',
  components: {
    Split
  },
  created() {
    this.$on(EVENT_SHOW, () => {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    })
  },
  props: {
    food: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~stylus/food/index'
</style>
