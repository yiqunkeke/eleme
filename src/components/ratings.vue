<template>
  <!-- 把变化的数据作为:data 传入cube-scroll好处：cube-scroll可以监听数据变化，使得可以根据数据变化来滚动流畅  -->
  <cube-scroll class="ratings" :options="scrollOptions" :data="computedRatings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">
            {{seller.score}}
          </h1>
          <div class="titl">
            综合评分
          </div>
          <div class="rank">
            高于周边商家{{seller.rankRate}}%
          </div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">
              服务态度
            </span>
            <!-- 星级 -->
            <Star :size="36" :score="seller.serviceScore"/>
            <span class="score">
              {{seller.serviceScore}}
            </span>
          </div>
          <div class="score-wrapper">
            <span class="title">
              商品评分
            </span>
            <!-- 星级 -->
            <Star :size="36" :score="seller.foodScore"/>
            <span class="score">
              {{seller.foodScore}}
            </span>
          </div>
          <div class="score-wrapper">
            <span class="title">
              送达时间
            </span>
            <span class="score">
              {{seller.deliveryTime}}分钟
            </span>
          </div>
        </div>
      </div>
      <Split />
      <!-- 评价选择组件 -->
      <RatingSelect :ratings="ratings"
                    :onlyContent="onlyContent"
                    :selectType="selectType"
                    @select="onSelect"
                    @toggle="onToggle"
                    v-if="ratings.length"
                   />
      <div class="rating-wrapper">
        <ul>
          <li v-for="(rating, idx) in computedRatings"
              :key="idx"
              class="rating-item border-bottom-1px"
              >
              <div class="avatar">
                <img :src="rating.avatar" width="28" height="28">
              </div>
              <div class="content">
                <h1 class="name">{{rating.username}}</h1>
                <div class="star-wrapper">
                  <Star :size="24" :score="rating.score" />
                  <span class="delivery" v-show="rating.deliveryTime">
                    {{rating.deliveryTime}}
                  </span>
                </div>
                <p class="text">{{rating.text}}</p>
                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                  <span class="icon-thumb_up"></span>
                  <span class="item" v-for="(item, index) in rating.recommend" :key="index">
                    {{item}}
                  </span>
                </div>
                <div class="time">
                  {{format(rating.rateTime)}}
                </div>
              </div>
          </li>
        </ul>
      </div>
    </div>
  </cube-scroll>
</template>

<script>
import Star from 'components/star.vue'
import Split from 'components/split.vue'
import RatingSelect from 'components/ratingSelect.vue'
import moment from 'moment'
import { getRatings } from 'api'
import ratingMixin from 'js/mixins/rating'

export default {
  mixins: [ ratingMixin ],
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      ratings: [],
      scrollOptions: {
        click: false,
        directionLockThreshold: 0
      }
    }
  },
  computed: {
    seller() {
      return this.data.seller || {}
    }
  },
  components: {
    Star,
    Split,
    RatingSelect
  },
  methods: {
    fetch() {
      if (!this.fetched) {
        this.fetched = true
        getRatings({
          id: this.seller.id
        }).then(ratings => {
          this.ratings = ratings
        })
      }
    },
    format(time) {
      return moment(time).format('YYYY-MM-DD hh:mm')
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~stylus/ratings/index"
</style>
