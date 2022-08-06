<template>
  <div class="xtx-goods-page">
    <div class="container" v-if="goods">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="'/category/' + goods.categories[1].id">{{
          goods.categories[1].name
        }}</XtxBreadItem>
        <XtxBreadItem :to="'/category/sub/' + goods.categories[0].id">{{
          goods.categories[0].name
        }}</XtxBreadItem>
        <XtxBreadItem to="/">{{ goods.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <!-- 图片预览区 -->
        <div class="media">
          <!-- 图片预览区 -->
          <XtxImageView :image-list="goods.mainPictures" />
          <!-- 统计数量 -->
          <GoodsSale :goods="goods"></GoodsSale>
        </div>
        <!-- 商品信息区 -->
        <div class="spec">
          <!-- 商品信息区 -->
          <GoodsInfo :goods="goods"></GoodsInfo>
          <!-- Sku组件 -->
          <GoodsSku
            :goods="goods"
            skuId="1369155873162661889"
            :max="max"
            @change="handleSelected"
          ></GoodsSku>
          <XtxNumbox v-model="num" :max="max" />
          <!-- 按钮组件 -->
          <XtxButton type="primary" style="margin-top: 20px">
            加入购物车
          </XtxButton>
        </div>
      </div>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs">
            <GoodsDetail :goods="goods" />
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :type="1" />
          <GoodsHot :type="2" />
          <GoodsHot :type="3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqFindGoods } from '@/api/goods'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import GoodsSale from './components/goods-sale.vue'
import GoodsInfo from './components/goods-info.vue'
import GoodsSku from './components/goods-sku.vue'
import GoodsDetail from './components/goods-detail.vue'
import GoodsHot from './components/goods-hot'
export default {
  name: 'XtxGoodsPage',
  components: {
    GoodsSale,
    GoodsInfo,
    GoodsSku,
    GoodsDetail,
    GoodsHot
  },
  setup (props) {
    const num = ref(1)
    const goods = ref(null)
    const route = useRoute()
    const selectedGood = ref({})
    const max = computed(() =>
      selectedGood.value.inventory > 0 ? selectedGood.value.inventory : 1
    )
    const getFindGoods = async () => {
      const { result } = await reqFindGoods(route.params.id)
      goods.value = result
    }
    getFindGoods()

    const handleSelected = (item) => {
      selectedGood.value = item
      num.value = 1
      console.log(num)
      console.log(item)
    }
    return {
      goods,
      handleSelected,
      num,
      max
    }
  }
}
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
