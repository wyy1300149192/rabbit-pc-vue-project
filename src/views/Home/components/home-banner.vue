<template>
  <div class="home-banner">
    <XtxSlider :sliders="bannerList"/>
  </div>
</template>

<script>
import { reqFindBanner } from '@/api/home'
import { ref } from 'vue'
export default {
  name: 'HomeBanner',
  setup () {
    const bannerList = ref([])
    async function loadBannerList () {
      const res = await reqFindBanner()
      bannerList.value = res.result
    }
    loadBannerList()
    return {
      bannerList
    }
  }
}
</script>

<style scoped lang='less'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
</style>
