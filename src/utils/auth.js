import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token';

const UserInfo = 'User-Info'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserInfo(userinfo){
  return Cookies.set(UserInfo, userinfo)
}

export function getUserInfo(){
  return Cookies.get(UserInfo)
}
