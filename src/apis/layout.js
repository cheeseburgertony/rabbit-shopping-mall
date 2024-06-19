import httpInstance from "@/utils/http"

// 获取全部分类(包含推荐商品)
export const getCategoryAPI = () => httpInstance.get('/home/category/head')