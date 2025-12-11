import request from '@/utils/request'

// 登录api
export const loginApi = (account, password) => {
  return request.post('/login', {account, password})
}
