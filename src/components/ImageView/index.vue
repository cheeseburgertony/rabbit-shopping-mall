<script setup>
import { useMouseInElement } from '@vueuse/core';
import { ref, watch } from 'vue';

defineProps({
  imageList:{
    type: Array,
    default: () => []
  }
})

// // 图片列表
// const imageList = [
//   "https://yanxuan-item.nosdn.127.net/d917c92e663c5ed0bb577c7ded73e4ec.png",
//   "https://yanxuan-item.nosdn.127.net/e801b9572f0b0c02a52952b01adab967.jpg",
//   "https://yanxuan-item.nosdn.127.net/b52c447ad472d51adbdde1a83f550ac2.jpg",
//   "https://yanxuan-item.nosdn.127.net/f93243224dc37674dfca5874fe089c60.jpg",
//   "https://yanxuan-item.nosdn.127.net/f881cfe7de9a576aaeea6ee0d1d24823.jpg"
// ]

// 创建一个属性来存储当前选择的图片数组的下标，通过这个下标让左侧大图显示相对应的图片
// 并且通过当前图片下标和激活的下标进行判断来让选择的图片高亮
// 1.点击小图显示大图
const activeIndex = ref(0)
const enterHandle = (i) => {
  activeIndex.value = i
}

// 2.放大镜移动模块
const target = ref()
// 获取鼠标的相对位置
const { elementX, elementY, isOutside } = useMouseInElement(target)
// 3.放大镜大图显示
// 定义大图的偏移位置
const positionX = ref(0)
const positionY = ref(0)

// 监视位置变化，根据位置来确定滑块的移动
const left = ref(0)
const top = ref(0)
watch([elementX, elementY, isOutside], () => {
  // 如果在盒子外面就不执行下面的业务，进行优化
  if(isOutside.value) return
  // 有效范围内控制滑块
  if(elementX.value > 100 && elementX.value < 300){
    left.value = elementX.value - 100
    // 大图是原本中图的两倍，并且显示的方向和滑块移动的方向相反 
    positionX.value = -left.value * 2
  }
  if(elementY.value > 100 && elementY.value < 300){
    top.value = elementY.value - 100
    positionY.value = -top.value * 2
  }
  // 超出边界了不再移动
  if(elementX.value < 100) left.value = 0
  if(elementX.value > 300) left.value = 200
  if(elementY.value < 100) top.value = 0
  if(elementY.value > 300) top.value = 200
})

</script>


<template>
  <div class="goods-image">
    <!-- 左侧大图-->
    <div class="middle" ref="target">
      <img :src="imageList[activeIndex]" alt="" />
      <!-- 蒙层小滑块 -->
      <div class="layer" v-show="!isOutside" :style="{ left: `${left}px`, top: `${top}px` }"></div>
    </div>
    <!-- 小图列表 -->
    <ul class="small">
      <li v-for="(img, i) in imageList" :key="i" @mouseenter="enterHandle(i)" :class="{ active: i === activeIndex }">
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大镜大图 -->
    <div class="large" :style="[
      {
        backgroundImage: `url(${imageList[activeIndex]})`,
        backgroundPositionX: `${positionX}px`,
        backgroundPositionY: `${positionY}px`,
      },
    ]" v-show="!isOutside"></div>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
    left: 0;
    top: 0;
    position: absolute;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>