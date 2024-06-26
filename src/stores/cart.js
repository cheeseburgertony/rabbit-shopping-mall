import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./user";
import { delCartAPI, getCartListAPI, insertCartAPI } from "@/apis/cart"

export const useCartStore = defineStore('cart', () => {
  // 购物车列表
  const cartList = ref([])
  // 是否登录
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  // 获取最新购物车列表数据(函数封装)
  const updateNewCartList = async () => {
    const res = await getCartListAPI()
    cartList.value = res.result
  }

  // 购物车总数量
  const totalCount = computed(() => cartList.value.reduce((prev, current) => prev + current.count, 0))
  // 购物车总价
  const totalPrice = computed(() => cartList.value.reduce((prev, current) => prev + current.count * current.price, 0))
  // 是否全选
  const isAll = computed(() => cartList.value.every(item => item.selected))
  // 选中商品数量
  const selectCount = computed(() => cartList.value.filter(item => item.selected).reduce((prev, current) => prev + current.count, 0))
  // 选中商品总价
  const selectPrice = computed(() => cartList.value.filter(item => item.selected).reduce((prev, current) => prev + current.count * current.price, 0))

  // 加入购物车
  const addCart = async (goods) => {
    // 判断是否登录过 登录走接口 没登录走本地
    const { skuId, count } = goods
    if (isLogin.value) {
      await insertCartAPI({ skuId, count })
      updateNewCartList()
    } else {
      // 判断是否添加过
      // 添加过,原count++
      // 没添加过,直接push
      const item = cartList.value.find(item => item.skuId === goods.skuId)
      if (item) {
        item.count++
      } else {
        cartList.value.push(goods)
      }
    }
  }

  // 删除购物车
  const delCart = async (skuId) => {
    if (isLogin.value) {
      await delCartAPI([skuId])
      updateNewCartList()
    } else {
      // 可以找到下标使用splice也可以使用filter进行删除
      // const index = cartList.value.findIndex(item => item.skuId === skuId)
      // cartList.value.splice(index, 1)
      cartList.value = cartList.value.filter(item => item.skuId !== skuId)
    }
  }

  // 清除购物车数据
  const clearCart = () => {
    cartList.value = []
  }

  // 单选框功能
  const checkSingle = (skuId, selected) => {
    const item = cartList.value.find(item => item.skuId === skuId)
    item.selected = selected
  }

  // 全选功能
  const checkAll = (selected) => {
    cartList.value.forEach(item => item.selected = selected)
  }

  return {
    cartList,
    totalCount,
    totalPrice,
    isAll,
    selectCount,
    selectPrice,
    addCart,
    delCart,
    checkSingle,
    checkAll,
    clearCart,
    updateNewCartList
  }
}, {
  persist: true
})