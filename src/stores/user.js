// 管理用户相关数据
import { loginAPI } from "@/apis/user"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserStore = defineStore('user', () => {
  // 1.定义管理用户数据的state
  const userInfo = ref({})
  // 2.定义获取用户数据的action
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
  }
  // 3.以对象的格式将state和action return出去
  return{
    userInfo,
    getUserInfo
  }
})
