<template>
  <div id="app">
    <MyHeader :seller="seller"/>
    <HeaderDetail :seller="seller"/>
  </div>
</template>

<script>
import MyHeader from 'components/header.vue'
import HeaderDetail from 'components/headerDetail.vue'
import { getSeller } from 'api'
export default {
  components: {
    MyHeader,
    HeaderDetail
  },
  data() {
    return {
      seller: {}
    }
  },
  created() {
    this._getSeller()
  },
  methods: {
    // 获取数据seller
    _getSeller() {
        getSeller().then(seller => {
          // 对axios进行封装之后，就不需要在这里对返回数据的状态做判断了
          this.seller = seller
        })
    }
  }
}
</script>
<style lang="stylus">
</style>
