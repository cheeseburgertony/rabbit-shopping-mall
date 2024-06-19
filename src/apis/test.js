import httpInstance from '@/utils/http.js'

export const getCategoryAPI = () => httpInstance.get('home/category/head')