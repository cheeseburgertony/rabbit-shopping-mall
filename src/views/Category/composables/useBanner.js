// 封装banner轮播图相关代码
import { ref, onMounted } from "vue"
import { getBannerAPI } from "@/apis/home"

export const useBanner = () => {
  const bannerList = ref([])
  
  const getBanner = async () => {
    const res = await getBannerAPI('2')
    bannerList.value = res.result
  }

  onMounted(() => getBanner())

  return {
    bannerList
  }
}