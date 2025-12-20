// 封装倒计时逻辑
import { computed, onUnmounted, ref } from "vue"
import dayjs from "dayjs"

export const useCountDown = () => {
  let timerId = null
  const time = ref(0)
  // 时间格式化
  const formatTime = computed(()=> dayjs.unix(time.value).format('mm分ss秒'))
  // 倒计时
  const start = (currentTime) => {
    time.value = currentTime
    timerId = setInterval(()=> {
      time.value--
    }, 1000)
  }
  // 组件销毁时清除定时器
  onUnmounted(()=> {
    timerId && clearInterval(timerId)
  })
  return {
    formatTime,
    start
  }
}
