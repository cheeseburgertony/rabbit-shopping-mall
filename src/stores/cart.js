import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore('cart', () => {
  const cartList = ref([])
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
  return {
    cartList,
    addCart
  }
}, {
  persist: true
})