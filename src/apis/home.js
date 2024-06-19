import httpInstance from '@/utils/http'

// 获取轮播图数据
export const getBannerAPI = () => httpInstance.get('/home/banner')

// 获取新鲜好物数据
export const getNewGoodsAPI = () => httpInstance.get('/home/new')
