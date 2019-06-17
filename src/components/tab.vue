<template>
  <div class="tab">
      <cube-tab-bar v-model="selectedLabel" 
                    :data="tabs" 
                    :showSlider="true" 
                    class="border-bottom-1px"/>
      <div class="slide-wrapper">
          <cube-slide
            ref="slide"
            :loop=false
            :auto-play=false
            :show-dots=false
            :initial-index="index"
        >
            <cube-slide-item>
               <Goods />
            </cube-slide-item>
            <cube-slide-item>
               <Ratings />
            </cube-slide-item>
            <cube-slide-item>
               <Seller />
            </cube-slide-item>
        </cube-slide>
      </div>
  </div>
</template>

<script>
import Goods from 'components/goods.vue'
import Ratings from 'components/ratings.vue'
import Seller from 'components/seller.vue'
export default {
    components: {
        Goods,
        Ratings,
        Seller
    },
  data() {
    return {
        index: 0,
        tabs: [
            {
                label: '商品'
            },
            {
                label: '评论'
            },
            {
                label: '商家'
            }
      ]
    }
  },
  computed: {
      selectedLabel: {
          get() {
              return this.tabs[this.index].label
          },
          set(newVal) {
              this.index = this.tabs.findIndex(item => {
                  return item.label === newVal
              })
          }
      }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~stylus/variable"

  .tab
    display: flex
    flex-direction: column
    height: 100%
    >>> .cube-tab
      padding: 10px 0
    .slide-wrapper
      flex: 1
      overflow: hidden
</style>