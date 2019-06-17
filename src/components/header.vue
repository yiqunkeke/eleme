<template>
   <div class="header">
       <div class="content-wrapper">
           <div class="avatar">
               <img :src="seller.avatar" alt="" width="64" height="64">
               <!-- 知识点：因为给seller设置了default值为{}，所以在使用seller对象的一级属性时，不会报TypeError: Cannot read property 'avatar' of undefined -->
           </div>
           <div class="content">
               <div class="title">
                   <span class="brand"></span>
                   <span class="name">{{seller.name}}</span>
               </div>
               <div class="description">
                   {{seller.description}}/{{seller.deliveryTime}}分钟送达
               </div>
               <div class="support" v-if="seller.supports">
                   <Icon :size=1 :type="seller.supports[0].type" />
                   <span class="text">{{seller.supports[0].description}}</span>
                   <!-- 知识点：在使用对象的深层属性时，外层必须要做一次v-if判断父级属性，才不会报TypeError: Cannot read property 'avatar' of undefined -->
               </div>
           </div>
           <div v-if="seller.supports" class="support-count">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
       </div>
       <div class="bulletin-wrapper">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
        <!-- 数据的获取发生在render阶段，如果数据获取失败，页面整个都不会渲染出来。 -->
   </div>
</template>

<script>
import Icon from 'components/icon.vue'
export default {
   props: {
       seller: {
           type: Object,
            // 给对象设置初始值，可以避免在使用seller.XXX属性时报错：TypeError: Cannot read property 'XXX' of undefined
           default: () => {
               return {}
           }
       }
   },
   components: {
        Icon
   }
}
</script>

<style lang="stylus">
// 在.vue文件中引入时，路径前需要加~
@import '~stylus/header/index'
</style>
