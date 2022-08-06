<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <!-- 商品区块 -->
    <goods-item v-for="(goods, index) in goodsList" :key="index" :goods="goods"/>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import GoodsItem from '@/views/Category/components/goods-item'
import { useRoute } from 'vue-router'
import { reqFindHotGoods } from '@/api/goods'
export default {
  name: 'GoodsHot',
  components: {
    GoodsItem
  },
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  setup (props) {
  // 处理标题
    const titleObj = { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' }
    const title = computed(() => {
      return titleObj[props.type]
    })

    // 商品列表
    const route = useRoute()
    const goodsList = ref([])
    async function getGoodsList () {
      const res = await reqFindHotGoods({ id: route.params.id, type: props.type })
      goodsList.value = res.result
    }
    getGoodsList()

    return { title, goodsList }
  }
}
</script>
<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
}
</style>
