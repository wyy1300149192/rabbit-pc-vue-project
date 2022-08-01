import { reqFindHeadCategory } from '@/api/home'

// 导航栏数据
export default {
  namespaced: true,
  state: () => {
    return {
      // 导航栏数据
      list: []
    }
  },
  mutations: {
    // 设置导航栏数据
    setList (state, value) {
      state.list = value
    }
  },
  actions: {
    // 获取导航栏数据
    async getList ({ commit }) {
      const { result } = await reqFindHeadCategory()
      commit('setList', result)
    }
  }
}
