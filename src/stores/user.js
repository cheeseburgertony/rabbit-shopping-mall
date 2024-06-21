// 管理用户相关数据
import { loginAPI } from "@/apis/user"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useCartStore } from "./cart"
import { mergeCartAPI } from "@/apis/cart"

export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore()
  // 1.定义管理用户数据的state
  const userInfo = ref({})
  // 2.定义获取用户数据的action
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
    // 登录时合并购物车  请求里面传的数组包对象
    await mergeCartAPI(cartStore.cartList.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    // 重新获取购物车数据
    cartStore.updateNewCartList()
  }
  // 清除用户数据
  const clearUserInfo = () => {
    userInfo.value = {}
    // 清空购物车数据
    cartStore.clearCart()
  }
  // 3.以对象的格式将state和action return出去
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
}, {
  persist: true
})
