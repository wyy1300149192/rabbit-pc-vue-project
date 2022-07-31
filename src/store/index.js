import { createStore } from 'vuex'
import user from './modules/user'
import cart from './modules/cart'
import createPersistedstate from 'vuex-persistedstate'
// 创建vuex仓库并导出
export default createStore({
  state: {
    // 数据
  },
  mutations: {
    // 改数据的函数
  },
  actions: {
    // 请求数据的函数
  },
  modules: {
    // 分模块
    user, cart
  },
  getters: {
    // vuex的计算属性
  },
  // 使用 vuex-persistedstate 插件来进行持久化
  plugins: [
    createPersistedstate({
      key: 'erabbit-client-pc-store',
      paths: ['user', 'cart']
    })
  ]

})
