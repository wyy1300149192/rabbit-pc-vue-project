<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <!-- 渲染 -->

    <template v-if="list.length > 0">
      <li v-for="item in list" :key="item.id">
        <RouterLink :to="'/category/' + item.id">{{ item.name }}</RouterLink>
      </li>
    </template>
    <template v-else>
      <li v-for="i in 9" :key="i">
        <XtxSkeleton
          :width="60"
          :height="32"
          style="margin-right: 5px"
          bg="rgba(0,0,0,0.5)"
        />
      </li>
    </template>
  </ul>
</template>

<script>
// 引入接口
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup () {
    const store = useStore()
    // 动态获取导航栏数据
    const list = computed(() => {
      return store.state.category.list
    })
    return {
      list
    }
  }
}
</script>

<style scoped lang="less">
.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
  }
}
</style>

<style></style>
