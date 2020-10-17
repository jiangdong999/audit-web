import request from '@/utils/request'

  
export function sendCode(data) {//获取验证码

  return request({
    url: '/account/sms/code',
    method: 'post',
    data: data
  })
}

export function loginByUsername(data) { //验证码登录
  
  return request({
    url: '/auth/login/sms',
    method: 'post',
    data:data
  })
}

export function logout() { //退出登录
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

export function auditList(query) { //审计列表
  return request({
    url: '/audit/v1/audit/list',
    method: 'POST',
    data: query
  })
}