<template>
  <transition name="move" @after-leave="afterLeave">
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
            <div class="cart-control-wrapper">
              <!-- 步进器 -->
              <Stepper :food="food" @add="addFood"/>
            </div>
            <transition name="fade">
              <div class="buy" v-show="!food.count" @click.stop="addFirst">
                加入购物车
              </div>
            </transition>
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
import Stepper from 'components/stepper.vue'

const EVENT_SHOW = 'show'
const EVENT_LEAVE = 'leave'
const EVENT_ADD = 'add'

export default {
  mixins: [ popupMixin ],
  name: 'food',
  components: {
    Split,
    Stepper
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
  },
  methods: {
    afterLeave() {
      this.$emit(EVENT_LEAVE)
    },
    addFirst(event) {
      this.$set(this.food, 'count', 1)
      this.$emit(EVENT_ADD, event.target)
    },
    addFood(target) {
      this.$emit(EVENT_ADD, target)
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~stylus/food/index'
</style>
