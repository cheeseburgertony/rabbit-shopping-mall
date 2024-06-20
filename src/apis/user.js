import request from '@/utils/http.js'
// 登录请求
export const loginAPI = ({ account, password }) =>
  request.post('/login', { account, password })
