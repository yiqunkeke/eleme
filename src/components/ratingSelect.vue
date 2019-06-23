<template>
    <div class="rating-select">
        <div class="rating-type border-bottom-1px">
            <span class="block positive"
                  :class="{'active': selectType===2}"
                  @click="handleSelect(2)"
            >
                {{desc.all}}
                <span class="count">{{ratings.length}}</span>
            </span>
            <span class="block positive"
                  :class="{'active': selectType===0}"
                  @click="handleSelect(0)"
                  >
                {{desc.positive}}
                <span class="count">{{positives.length}}</span>
            </span>
            <span class="block negative"
                  :class="{'active': selectType===1}"
                  @click="handleSelect(1)"
                  >
                {{desc.negative}}
                <span class="count">{{negatives.length}}</span>
            </span>
        </div>
        <div class="switch"
             :class="{'on': onlyContent }"
             @click="toggle"
             >
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>
<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

const EVENT_SELECT = 'select'
const EVENT_TOGGLE = 'toggle'

export default {
  props: {
      // 评价列表数据
      ratings: {
          type: Array,
          default() {
              return []
          }
      },
      // 默认选中的 tab
      selectType: {
          type: Number,
          default: ALL
      },
      // 是否只看有内容评价
      onlyContent: {
          type: Boolean,
          default: false
      },
      // 按钮上的描述文字
      desc: {
          type: Object,
          default() {
              return {
                  all: '全部',
                  positive: '满意',
                  negative: '不满意'
              }
          }
      }
  },
  computed: {
      positives() {
          return this.ratings.filter(item => {
              return item.rateType === POSITIVE
          })
      },
      negatives() {
          return this.ratings.filter(item => {
              return item.rateType === NEGATIVE
          })
      }
  },
  methods: {
      handleSelect(type) {
          // 这里不能直接去修改props中的 selectType
          // 正确的做法是：派发事件给父组件，由父组件去修改
          this.$emit(EVENT_SELECT, type)
      },
      toggle() {
          this.$emit(EVENT_TOGGLE)
      }
  }
}
</script>
<style scoped lang="stylus">
@import "~stylus/ratingSelect/index"
</style>
