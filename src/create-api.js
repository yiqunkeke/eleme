// 引入 cube-ui 的 createAPI 模块-----> 该模块默认暴露出一个 createAPI 函数:可以实现以API的形式调用自定义组件。
// 并且既可以在Vue实例上下文中调用，也可以在普通的js文件中调用。
import { createAPI } from 'cube-ui'
import Vue from 'vue'
import HeaderDetail from 'components/headerDetail'
import CartList from 'components/cartList'

// 创建 this.$createHeaderDetail
createAPI(Vue, HeaderDetail)
createAPI(Vue, CartList)
