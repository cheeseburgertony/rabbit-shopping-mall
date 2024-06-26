import { useIntersectionObserver } from '@vueuse/core'

// 图片懒加载指令
export const lazyPlugin = {
  install(app) {
    app.directive('img-lazy', {
      mounted(el, binding) {
        // el：指令绑定的那个元素 这里是img
        // binding：binding.value 指令等于号后面的表达式的值 图片url
        useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            if(isIntersecting){
              // 如果进入到视口再发送网络请求获取图片
              el.src = binding.value
            }
          }
        )
      }
    })
  }
}