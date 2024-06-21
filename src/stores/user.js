// 管理用户相关数据
import { loginAPI } from "@/apis/user"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useCartStore } from "./cart"

export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore()
  // 1.定义管理用户数据的state
  const userInfo = ref({})
  // 2.定义获取用户数据的action
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
  }
  // 清除用户数据
  const clearUserInfo = () =>{
    userInfo.value = {}
    // 清空购物车数据
    cartStore.clearCart()
  }
  // 3.以对象的格式将state和action return出去
  return{
    userInfo,
    getUserInfo,
    clearUserInfo
  }
},{
  persist: true
})
