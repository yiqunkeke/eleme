import { get } from './helpers'

// 获取接口数据
const getSeller = get('/api/seller')
const getGoods = get('/api/goods')

export { getSeller, getGoods } // 并导出
