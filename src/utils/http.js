import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

// 基地址
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// 添加请求拦截器
httpInstance.interceptors.request.use(function (config) {
  // 1.从pinia中获取token
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  // 2.根据后端要求在请求拦截器中拼接token
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
httpInstance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误进行提示
  ElMessage.warning(error.response.data.message)
  // 处理401错误
  if(error.response.status === 401){
    const userStore = useUserStore()
    // 清除用户数据
    userStore.clearUserInfo()
    // 跳转到登录页
    router.push('/login')
  }
  return Promise.reject(error);
});

export default httpInstance