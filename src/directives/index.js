import { useIntersectionObserver } from '@vueuse/core'

export default {
  install (app) {
    app.directive('imgLazy', {
      mounted (el, binding) {
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }], observerElement) => {
            if (isIntersecting) {
              el.src = binding.value
              stop()
            }
          }
        )
      }
    })
  }
}
