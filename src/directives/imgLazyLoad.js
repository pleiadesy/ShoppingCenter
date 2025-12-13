// 定义图片懒加载指令
import {useIntersectionObserver} from '@vueuse/core'
export const imgLazyLoad = {
  install (app) {
    app.directive('imgLazyLoad', {
      mounted(el, binding) {
        const { stop } = useIntersectionObserver(
           el,
           ([entry]) => {
             if(entry.isIntersecting) {
              el.src = binding.value
              stop()
             }
          }
        )
      }
    })
  }
}
