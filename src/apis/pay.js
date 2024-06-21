import request from '@/utils/http'
// 获取订单
export const getOrderAPI = (id) => request.get(`/member/order/${id}`)