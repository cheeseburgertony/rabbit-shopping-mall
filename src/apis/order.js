import request from '@/utils/http'
// 获取我的订单
/*
params: {
  orderState:0,
  page:1,
  pageSize:2
}
*/
export const getUserOrderAPI = (params) => request.get('/member/order', { params })