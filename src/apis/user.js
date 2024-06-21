import request from '@/utils/http.js'
// 登录请求
export const loginAPI = ({ account, password }) =>
  request.post('/login', { account, password })

// 获取猜你喜欢
export const getLikeListAPI = (limit = 4) => request.get('/goods/relevant', { params: { limit } })
