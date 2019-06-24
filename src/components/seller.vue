<template>
  <cube-scroll class="seller" :options="sellerScrollOptions">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-bottom-1px">
          <Star :size="36" :score="seller.score"/>
          <span class="text">（{{seller.ratingCount}}）</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite">
          <span class="icon-favorite" :class="{'active': favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <Split/>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-bottom-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li
            class="support-item border-bottom-1px"
            v-for="(item,index) in seller.supports"
            :key="index"
          >
            <Icon :size=4 :type="seller.supports[index].type" />
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <Split/>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <cube-scroll class="pic-wrapper" :options="picScrollOptions">
          <ul class="pic-list">
            <li class="pic-item"
                v-for="(pic,index) in seller.pics"
                :key="index"
            >
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </cube-scroll>
      </div>
      <Split/>
      <div class="info">
        <h1 class="title border-bottom-1px">商家信息</h1>
        <ul>
          <li
            class="info-item border-bottom-1px"
            v-for="(info,index) in seller.infos"
            :key="index"
          >
            {{info}}
          </li>
        </ul>
      </div>
    </div>
  </cube-scroll>
</template>

<script>
import Star from 'components/star.vue'
import Split from 'components/split.vue'
import Icon from 'components/icon.vue'
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    seller() {
      return this.data.seller || {}
    },
    favoriteText() {
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  data() {
    return {
      favorite: false,
      sellerScrollOptions: {
          directionLockThreshold: 0,
          click: false
        },
        picScrollOptions: {
          scrollX: true, // 横向滚动一定要配置此项
          stopPropagation: true, // 阻止冒泡
          directionLockThreshold: 0 // 不会出现斜着滚动问题
        }
    }
  },
  components: {
    Star,
    Split,
    Icon
  }
}
</script>

<style scoped lang="stylus">
@import '~stylus/seller/index'
</style>
