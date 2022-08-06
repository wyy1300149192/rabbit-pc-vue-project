<template>
  <div class='top-category'>
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>{{ categoryName }}</XtxBreadItem>
      </XtxBread>

      <!-- 轮播图 -->
      <XtxSlider :sliders="bannerList"></XtxSlider>

      <!-- 分类展示 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="categoryData in categoryList" :key="categoryData.id">
            <RouterLink :to="`/category/sub/${categoryData.id}`">
              <img :src="categoryData.picture" >
              <p>{{ categoryData.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="categoryData in categoryList" :key="categoryData.id">
        <div class="head">
          <h3>-  {{ categoryData.name }}  -</h3>
          <XtxMore to="/" />
        </div>
        <div class="body">
          <GoodsItem v-for="item in categoryData.goods" :key="item.id" :goods="item"></GoodsItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { reqFindBanner } from '@/api/home'
import { reqFindTopCategory } from '@/api/category'
import { useRoute } from 'vue-router'
import GoodsItem from './components/goods-item.vue'

export default {
  name: 'TopCategory',
  components: { GoodsItem },
  setup () {
    // 轮播展示
    const bannerList = ref([])
    async function getBanner () {
      const res = await reqFindBanner()
      bannerList.value = res.result
    }
    getBanner()

    // 分类列表
    // vue2 如何从地址栏拿id,
    // this.$route.params.id (/category/1237645)
    // this.$route.query.id (?id=xxx)
    const route = useRoute() // 等价于 this.$route
    const categoryName = ref('')
    const categoryList = ref([])
    async function getCategoryList () {
      const res = await reqFindTopCategory(route.params.id)
      categoryList.value = res.result.children
      categoryName.value = res.result.name
    }
    getCategoryList()

    return {
      bannerList,
      categoryList,
      categoryName
    }
  }
}
</script>

<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }
}
</style>
