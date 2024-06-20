<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import GoodsItem from '../Home/components/GoodsItem.vue'

// 二级分类面包屑导航实现
const categoryData = ref({})
const route = useRoute()
const getCategoryData = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  categoryData.value = res.result
}

onMounted(() => getCategoryData())

// 获取基础列表数据进行渲染
const goodsList = ref([])
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
const getGoodList = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  goodsList.value = res.result.items
  console.log(res)
}

onMounted(() => getGoodList())

// 切换tab时候触发
const tabChange = () => {
  reqData.value.page = 1
  getGoodList()
}

// 无限加载
const disabled = ref(false)
const load = async () => {
  // 每次到底部就让page+1获取新的数据，然后进行拼接
  reqData.value.page++
  const res = await getSubCategoryAPI(reqData.value)
  // 这里使用展开运算符进行拼接
  goodsList.value = [...goodsList.value, ...res.result.items]
  // 如果后端没有数据了则关闭无限加载功能 加载完毕 停止监听
  if(res.result.items.length === 0) disabled.value = true
}

</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <!-- 商品列表-->
         <GoodsItem v-for="good in goodsList" :key="good.id" :good="good"></GoodsItem>
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>