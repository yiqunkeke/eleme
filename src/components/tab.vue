<template>
  <div class="tab">
      <cube-tab-bar v-model="selectedLabel"
                    :data="tabs"
                    :showSlider=true
                    :useTransition=false
                    ref="tabBar"
                    class="border-bottom-1px"/>
      <div class="slide-wrapper">
          <cube-slide
            :loop=false
            :auto-play=false
            :show-dots=false
            :initial-index="index"
            :options="slideOptions"
            ref="slide"
            @change="onChange"
            @scroll="onScroll"
        >
            <cube-slide-item v-for="(item, idx) in tabs" :key="idx">
               <component :is="item.component" :data="item.data"></component>
            </cube-slide-item>
        </cube-slide>
      </div>
  </div>
  <!-- 把tab组件抽象和封装：
            1. 使得组件没有耦合任何数据。
            2. 扩展灵活（增加一个tab并不需要修改tab组件的代码，直接在父组件中修改数据即可）。
            3. 代码逻辑清晰。（tab组件只维护数据的展示以及上下联动效果，以及怎么渲染组件也不关心。）实现了代码的充分解耦。
  -->
</template>

<script>
export default {
    props: {
        tabs: {
            type: Array,
            default() {
                return []
            }
        },
        initialIndex: {
            type: Number,
            default: 0
        }
    },
  data() {
    return {
        index: this.initialIndex,
        // 监听 scroll事件时，必须有此项
        slideOptions: {
            listenScroll: true,
            probeType: 3,
            directionLockThreshold: 0 // 阈值设置为0
        }
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
  },
  methods: {
      // 实现：当滑动下方内容时，切换上方tab的文字
      onChange(curIndex) {
          // 直接去改 selectedLabel 的依赖项
          this.index = curIndex
          // this.selectedLabel = this.tabs[curIndex].label
      },
      // 实现：当滑动下方过程中，横线下标也跟着滑动（而不是滑动结束后，横线才滑动）
      onScroll(pos) {
        // console.log(pos.x)
        // TabBar提供 setSliderTransform 方法---->用以改变 cube-tab-bar组件的下划线的 transformX
        // 为了效果更加自然，我们把 cube-tab-bar 自带的过渡效果关闭----> (在cube-tab-bar组件上，加上 :useTransition=false)

        // 1. 获取tabBar的总宽度
        const tabBarWidth = this.$refs.tabBar.$el.clientWidth
        // 2. 获取slider的总宽度
        const slideWidth = this.$refs.slide.slide.scrollerWidth
        // 3. 下划线要移动的位置
        // -pos.x / slideWidth 为移动的比例。再乘以 tabBarWidth 就是要移动的实际位置
        const transform = -pos.x / slideWidth * tabBarWidth
        // 4. 调用 API
        this.$refs.tabBar.setSliderTransform(transform)
      }
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/tab/index'
</style>
