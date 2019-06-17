// axios 是非常流行的HTTP库，可以在node端用，也可以在web端用。
// 对 axios 进行封装
import axios from 'axios'

const ERR_CODE = 0

// 封装 get 方法
export function get(url) {
    // 柯里化---->查阅文档了解
    return function (params) {
        return axios.get(url, {
            params
        }).then(res => {
            const { code, data } = res.data
            if (code === ERR_CODE) {
                return data
            }
        }).catch(() => {})
    }
}
