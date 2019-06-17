<template>
   <transition name="fade">
       <div class="header-detail">
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
           <div class="detail-close">
               <i class="icon-close"></i>
           </div>
       </div>
   </transition>
</template>

<script>
import Star from 'components/star.vue'
import Icon from 'components/icon.vue'
export default {
   props: {
       seller: {
           type: Object,
           default:() => {
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
