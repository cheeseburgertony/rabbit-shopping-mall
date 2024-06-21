import request from '@/utils/http'
// 获取结算订单页的信息
export const getCheckInfoAPI = () => request.get('/member/order/pre')

// 创建订单
export const createOrderAPI = (data) => request.post('/member/order', data)