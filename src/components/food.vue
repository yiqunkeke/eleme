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
              <div class="buy" v-show="!food.count" @click="addFirst">
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
          <div class="rating">
            <h1 class="title">商品评价</h1>
            <!-- 评价选择组件 -->
            <RatingSelect :ratings="ratings"
                          :onlyContent="onlyContent"
                          :selectType="selectType"
                          :desc="desc"
                          @select="onSelect"
                          @toggle="onToggle"
                          />
            <div class="rating-wrapper">
              <ul v-show="ratings && ratings.length">
                <li v-for="(rating, idx) in computedRatings"
                  :key="idx"
                  class="rating-item border-bottom-1px"
                >
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img :src="rating.avatar" width="12" height="12" class="avatar">
                  </div>
                  <div class="time">{{format(rating.rateTime)}}</div>
                  <p class="text">
                    <span :class="{'icon-thumb_up': rating.rateType===0, 'icon-thumb_down': rating.rateType===1}"></span>
                    {{rating.text}}
                  </p>
                </li>
              </ul>
              <div class="no-rating" v-show="!ratings || !ratings.length">暂无评价</div>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </transition>
</template>

<script>
import popupMixin from 'js/mixins/popup'
import Split from 'components/split.vue'
import Stepper from 'components/stepper.vue'
import RatingSelect from 'components/ratingSelect.vue'
import moment from 'moment' // npm i moment --save 来格式化时间戳

const EVENT_SHOW = 'show'
const EVENT_LEAVE = 'leave'
const EVENT_ADD = 'add'
const ALL = 2

export default {
  mixins: [ popupMixin ],
  name: 'food',
  components: {
    Split,
    Stepper,
    RatingSelect
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
  computed: {
    ratings() {
      return this.food.ratings
    },
    computedRatings() {
      let ret = []
      this.ratings.forEach(rating => {
        if (this.onlyContent && !rating.text) {
          return
        }
        if (this.selectType === ALL || this.selectType === rating.rateType) {
          ret.push(rating)
        }
      })
      return ret
    }
  },
  data() {
    return {
      onlyContent: true,
      selectType: ALL,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
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
    },
    // 知识点：使用moment()库来格式化时间，在今后工作中，尽量用这个比较成熟的库（因为这些基础的最好不要自己写）
    // http://momentjs.cn/   官网文档
    format(time) {
      return moment(time).format('YYYY-MM-DD hh:mm')
    },
    onSelect(type) {
      this.selectType = type
    },
    onToggle() {
      this.onlyContent = !this.onlyContent
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~stylus/food/index'
</style>
