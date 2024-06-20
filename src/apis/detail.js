import request from '@/utils/http.js'
/**
 * @description: 获取商品详情
 * @param {id}  商品id
 * @return {*}
 */
export const getDetailAPI = (id) => request.get('/goods', { params: { id } })
 