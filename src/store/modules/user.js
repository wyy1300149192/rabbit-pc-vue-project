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
  }
}
