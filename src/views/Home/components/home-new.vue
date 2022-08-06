<template>
  <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱" ref="target">
    <template #right>
      <XtxMore></XtxMore>
    </template>
    <template #default>
      <ul ref="pannel" class="goods-list">
        <li v-for="item in list" :key="item.id">
          <RouterLink to="/">
            <img v-imgLazy='item.picture'  alt="" />
            <p class="name">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
    </template>
  </HomePanel>
</template>

<script>
import HomePanel from './home-panel'
import { reqFindNew } from '@/api/home'
import { ref } from 'vue'
import { useObserver } from '@/compositions'
export default {
  components: {
    HomePanel
  },
  setup () {
    // 1.定义响应式数据
    const list = ref([])
    // 2.定义函数 调用接口函数
    async function getList () {
      const res = await reqFindNew()
      list.value = res.result
    }
    const target = useObserver(getList)
    return {
      list,
      target
    }
  }
}
</script>

<style scoped lang='less'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
