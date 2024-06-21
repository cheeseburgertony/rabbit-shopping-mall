import request from '@/utils/http'
// 加入购物车
export const insertCartAPI = ({ skuId, count }) => request.post('/member/cart', { skuId, count })

// 获取购物车列表
export const getCartListAPI = () => request.get('/member/cart')