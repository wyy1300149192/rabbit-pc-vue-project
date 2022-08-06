import { reqUserLogin } from '@/api/user'

// 用户状态
export default {
  namespaced: true,
  state: () => {
    return {
      profile: {
        id: '',
        nickname: '',
        token: ''
      }
    }
  },
  mutations: {
    setProfile (state, newValue) {
      state.profile = newValue
    },
    clearProfile (state) {
      state.profile = {
        id: '',
        nickname: '',
        avatar: '',
        token: '',
        mobile: ''
      }
    }
  },
  actions: {
    async getProfile ({ commit }, data) {
      const res = await reqUserLogin(data)
      commit('setProfile', res.result)
    }
  }
}
