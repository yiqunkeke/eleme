<template>
  <span class="support-ico" :class="iconCls">12</span>
</template>

<script>
  export default {
    name: 'support-ico',
    props: {
      size: {
        type: Number
      },
      type: {
        type: Number
      }
    },
    computed: {
      iconCls() {
        const classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
        return `icon-${this.size} ${classMap[this.type]}`
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~assets/stylus/icon/index"
</style>
