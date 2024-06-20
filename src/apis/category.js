import request from '@/utils/http'
/**
 * @description: 获取一级分类列表（包括获取当前分类名字）
 * @param {id}
 * @return {*}
 */
export const getCategoryAPI = (id) => request.get('/category', { params: { id } })

/**
 * @description: 获取二级分类列表数据
 * @param {id}   二级分类id 
 * @return {*}
 */
export const getCategoryFilterAPI = (id) => request.get('/category/sub/filter', { params: { id } })

/**
 * @description: 获取导航数据
 * @data { 
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   } 
 * @return {*}
 */
export const getSubCategoryAPI = (data) => request.post('/category/goods/temporary', data)
