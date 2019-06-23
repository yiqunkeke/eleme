import { get } from './helpers'

// 获取接口数据
const getSeller = get('/api/seller')
const getGoods = get('/api/goods')
const getRatings = get('/api/ratings')

export { getSeller, getGoods, getRatings } // 并导出
