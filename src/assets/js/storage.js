// https://github.com/ustbhuangyi/storage
import storage from 'good-storage' // good-storage库：对原生webStorage做的一层封装
                                // 避免了存储对象时，要使用JSON.stringify() 和 JSON.parse()做转换
const SELLER_KEY = '__seller__'

// 存入 localStorage
export function saveToLocal(id, key, val) {
    const seller = storage.get(SELLER_KEY, {})
    if (!seller[id]) {
        seller[id] = {}
    }
    seller[id][key] = val
    storage.set(SELLER_KEY, seller)
}

// 从 localStorage 读取
export function loadFromLocal(id, key, def) {
    const seller = storage.get(SELLER_KEY, {})
    if (!seller[id]) {
        return def
    }
    return seller[id][key] || def
}

// sessionStorage
// storage.session.set(key, val)
// storage.session.get(key, val)
