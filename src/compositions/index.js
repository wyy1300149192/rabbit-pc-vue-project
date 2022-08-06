import { ref } from 'vue'
import { useIntersectionObserver, useIntervalFn } from '@vueuse/core'

export function useObserver (apiFunc) {
  // target为绑定的dom节点
  const target = ref(null)
  const { stop } = useIntersectionObserver(
    target,
    // isIntersecting为是否处于可视区域 返回一个布尔值
    ([{ isIntersecting }], observerElement) => {
      // 判断如果处于可视区域执行api函数
      if (isIntersecting) {
        apiFunc()
        // 停止监听
        stop()
      }
    }
  )
  // 返回一个target
  return target
}

export function useCountDown (startCount) {
  const countTime = ref(0)
  // pause 暂停定时器
  const { pause, resume } = useIntervalFn(() => {
    if (countTime.value <= 0) {
      pause()
      return
    }
    // 倒计时，就是每隔一秒减一
    countTime.value--
  }, 1000)
  // 重新开始（倒计时的数字）
  function start () {
    countTime.value = startCount
    resume()
  }
  return {
    countTime,
    start,
    pause,
    resume
  }
}
