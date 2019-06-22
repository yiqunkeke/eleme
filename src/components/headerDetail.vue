<template>
   <transition name="fade">
       <div class="header-detail" v-show="visible">
           <div class="detail-wrapper clear-fix">
               <div class="detail-main">
                   <h1 class="name">{{seller.name}}</h1>
                    <div class="star-wrapper">
                        <Star :size="48" :score="seller.score"/>
                    </div>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul v-if="seller.supports" class="supports">
                        <li class="support-item" v-for="(item,index) in seller.supports" :key="item.id">
                        <!-- 引用Icon组件，是声明式的写法 -->
                        <Icon :size=2 :type="seller.supports[index].type" />
                        <span class="text">{{seller.supports[index].description}}</span>
                        </li>
                    </ul>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="bulletin">
                        <p class="content">{{seller.bulletin}}</p>
                    </div>
               </div>
           </div>
           <div class="detail-close" @click="hide">
               <i class="icon-close"></i>
           </div>
       </div>
   </transition>
   <!-- 通常：可以通过 标识位 的方式来控制headerDetail组件的显隐。
        但不是最优的方案
        最好把所有的“弹屏或者弹窗”组件都放置在body下。保证样式不会受父元素样式影响。
        所以，使用 cube-ui 的 create-api 模块来实现。
         -->
</template>

<script>
import Star from 'components/star.vue'
import Icon from 'components/icon.vue'
import popupMixin from 'js/mixins/popup'
export default {
    // 混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。
    // 一个混入对象可以包含任意组件选项。
    // 当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。
    // 查阅 vue 官方文档
   mixins: [ popupMixin ],
   name: 'headerDetail', // 该组件被createAPI调用，所以必须有name属性
   props: {
       seller: {
           type: Object,
           default: () => {
               return {}
           }
       }
   },
   components: {
       Star,
       Icon
   }
}
</script>

<style lang="stylus">
@import '~stylus/headerDetail/index'
</style>
