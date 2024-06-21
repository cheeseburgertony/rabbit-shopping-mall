import request from '@/utils/http'
// 加入购物车
export const insertCartAPI = ({ skuId, count }) => request.post('/member/cart', { skuId, count })

// 获取购物车列表
export const getCartListAPI = () => request.get('/member/cart')

// 删除购物车商品
export const delCartAPI = (ids) => request.delete('/member/cart', { data: { ids } })

// 合并购物车
export const mergeCartAPI = (data) => request.post('/member/cart/merge', data)