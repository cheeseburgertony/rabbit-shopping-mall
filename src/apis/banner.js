import httpInstance from '@/utils/http'

// 获取-轮播图数据
export const getBannerAPI = () => httpInstance.get('/home/banner')