import { computed, onUnmounted, ref } from "vue"
import dayjs from "dayjs"

// 封装倒计时逻辑函数
export const useCountDown = () => {
  // 返回出的格式化的倒计时
  const time = ref(0)
  let timer = null
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
  // 开始倒计时的函数
  const start = (currentTime) => {
    time.value = currentTime
    timer = setInterval(() => {
      time.value--
    }, 1000)
  }
  // 离开页面时（组件销毁时）清除定时器
  onUnmounted(() => {
    // timer存在则调用后面的清除定时器
    timer && clearInterval(timer)
  })
  return {
    formatTime,
    start
  }
}