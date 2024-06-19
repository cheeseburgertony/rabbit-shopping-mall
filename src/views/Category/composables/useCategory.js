// 封装分类列表数据相关代码
import { getCategoryAPI } from '@/apis/category'
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

export const useCategory = () => {
  // 面包屑导航
  const categoryData = ref({})
  const route = useRoute()

  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    categoryData.value = res.result
  }
  
  onMounted(() => getCategory())

  // 目标：路由参数变化的时候 可以把分类数据接口重新发送
  // 路由发发送变化的时候 只要求分类数据接口发送，banner不用重新请求发送
  onBeforeRouteUpdate((to) => {
    // 使用形参to来获取选择的分类的id 使用最新的路由参数请求最新的分类数据
    getCategory(to.params.id)
  })

  return {
    categoryData
  }
}