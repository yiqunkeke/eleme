<template>
   <div class="bubble">
       {{num}}
   </div>
</template>

<script>
export default {
   name: 'bubble',
   props: {
       num: {
           type: Number
       }
   }
}
</script>

<style scoped lang="stylus">
@import '~stylus/bubble/index'
</style>
