import request from '@/utils/http'
/**
 * @description: 获取轮播图数据
 * @param {*}
 * @return {*}
 */
export const getBannerAPI = () => request.get('/home/banner')

/**
 * @description: 获取新鲜好物数据
 * @param {*}
 * @return {*}
 */
export const getNewGoodsAPI = () => request.get('/home/new')

/**
 * @description: 获取人气推荐数据
 * @param {*}
 * @return {*}
 */
export const getHotAPI = () =>request.get('/home/hot')

/**
 * @description: 获取产品列表数据
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () =>request.get('/home/goods')
