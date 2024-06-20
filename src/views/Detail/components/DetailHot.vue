<script setup>
import { getHotGoodsAPI } from '@/apis/detail';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

// 设计props参数，适配不同的title和数据  
const props =  defineProps({
  hotType:{
    type: Number
  }
})

// 写一个map进行映射
// 1代表24小时热销榜 2代表周热销榜
const TYPEMAP = {
  1: '24小时热销榜',
  2: '周热销榜'
}

// 通过计算属性，通过当前传的props计算出是哪个热榜
const title = computed(() => TYPEMAP[props.hotType])

// 以24小时热榜为例，获取获取数据并渲染
// 当前传的props.hotType发送不同请求
const hotList = ref([])
const route = useRoute()
const getHotList = async () => {
  const res = await getHotGoodsAPI({
    id: route.params.id,
    type: props.hotType
  })
  hotList.value = res.result
}
onMounted(() => getHotList())

</script>


<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <!-- 商品区块 -->
    <RouterLink to="/" class="goods-item" v-for="item in hotList" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>


<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

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
}
</style>