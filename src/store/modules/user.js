import {
  getToken,
  setToken,
  removeToken,
  setUserInfo,
  getUserInfo,
} from '@/utils/auth'

const user = {
  state:{
    token:getToken(),
    user:getUserInfo(),
  },
  mutations:{
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
  },
  actions:{
    LoginToken({commit},token){
      commit('SET_TOKEN', token)
      setToken(token);
    },

    LoginUser({commit},user){
      commit('SET_USER', user)
      setUserInfo(user)
    },
    // 前端 登出
    FedLogOut({commit}) {
      commit('SET_TOKEN', '')
      commit('SET_USER', '')
      removeToken()
    },  
  }
}

export default user
