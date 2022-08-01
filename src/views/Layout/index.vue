<template>
  <div>
    <app-topnav />
    <app-header />
    <app-header-sticky />
    <router-view></router-view>
    <app-footer />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import AppFooter from './components/app-footer.vue'
import AppHeader from './components/app-header'
import AppHeaderSticky from './components/app-header-sticky.vue'
import appTopnav from './components/app-topnav'
export default {
  components: { appTopnav, AppHeader, AppFooter, AppHeaderSticky },
  setup (props) {
    const store = useStore()
    // 获取导航栏列表，存入state
    store.dispatch('category/getList')
  }
}
</script>

<style></style>
