<script setup>
defineProps({
  good: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <RouterLink to="/" class="goods-item">
    <img v-img-lazy="good.picture" alt="" />
    <p class="name ellipsis">{{ good.name }}</p>
    <p class="desc ellipsis">{{ good.desc }}</p>
    <p class="price">&yen;{{ good.price }}</p>
  </RouterLink>
</template>