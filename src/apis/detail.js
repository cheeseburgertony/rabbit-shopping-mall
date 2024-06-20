import request from '@/utils/http.js'
/**
 * @description: 获取商品详情
 * @param {id}  商品id
 * @return {*}
 */
export const getDetailAPI = (id) => request.get('/goods', { params: { id } })

/**
 * 获取热榜商品
 * @param {Number} id - 商品id
 * @param {Number} type - 1代表24小时热销榜 2代表周热销榜
 * @param {Number} limit - 获取个数
 */
export const getHotGoodsAPI = ({ id, type, limit = 3 }) =>
  request.get('/goods/hot', {
    params: {
      id,
      type,
      limit
    }
  })