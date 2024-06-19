import request from '@/utils/http'
/**
 * @description: 获取二级分类列表（包括获取当前分类名字）
 * @param {id}
 * @return {*}
 */
export const getCategoryAPI = (id) => request.get('/category', { params: { id } })