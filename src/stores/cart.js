import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCartStore = defineStore('cart', () => {
  // 购物车列表
  const cartList = ref([])

  // 购物车总数量
  const totalCount = computed(() => cartList.value.reduce((prev, current) => prev + current.count, 0))
  // 购物车总价
  const totalPrice = computed(() => cartList.value.reduce((prev, current) => prev + current.count * current.price, 0))

  // 加入购物车
  const addCart = (goods) => {
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

  // 删除购物车
  const delCart = (skuId) => {
    // 可以找到下标使用splice也可以使用filter进行删除
    // const index = cartList.value.findIndex(item => item.skuId === skuId)
    // cartList.value.splice(index, 1)
    cartList.value = cartList.value.filter(item => item.skuId !== skuId)
  }

  return {
    cartList,
    totalCount,
    totalPrice,
    addCart,
    delCart
  }
}, {
  persist: true
})