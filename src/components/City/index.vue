<template>
  <div class="xtx-city">
    <div class="select" @click="toggleDialog" :class="{ active: active }">
      <span v-if="!changeResult.resultAddress" class="placeholder"
        >请选择配送地址</span
      >
      <span v-else class="value">{{ changeResult.resultAddress }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="active">
      <span
        @click="optionClick(i)"
        class="ellipsis"
        v-for="i in dataList"
        :key="i.code"
        >{{ i.name }}</span
      >
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import axios from 'axios'
export default {
  name: 'XtxCity',
  setup (props, { emit }) {
    // 控制展开收起,默认收起
    const active = ref(false)
    // 打开弹框
    function open () {
      active.value = true
    }
    // 关闭弹框
    function close () {
      active.value = false
    }
    // 切换展开收起
    function toggleDialog () {
      if (active.value) {
        close()
      } else {
        open()
      }
    }
    const dataList = ref([])
    const initialDataList = ref([])
    async function loadCityList () {
      const { data } = await axios({
        method: 'get',
        url: 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      })
      dataList.value = data
      initialDataList.value = data
    }

    // 获取城市列表并赋值
    loadCityList()
    const changeResult = reactive({
      provinceCode: '', // 省code
      provinceName: '', // 省名称
      cityCode: '', // 城市code
      cityName: '', // 城市名称
      countyCode: '', // 地区code
      countyName: '', // 地区名
      resultAddress: '' // 最终结果地址
    })
    // 选项点击
    const optionClick = (item) => {
      if (item.level === 0) {
        changeResult.provinceCode = item.code
        changeResult.provinceName = item.name
      }
      if (item.level === 1) {
        changeResult.cityCode = item.code
        changeResult.cityName = item.name
      }
      // 选择完区后关闭
      if (item.level === 2) {
        changeResult.countyCode = item.code
        changeResult.countyName = item.name
        changeResult.resultAddress =
          changeResult.provinceName +
          '-' +
          changeResult.cityName +
          '-' +
          changeResult.countyName
        // 赋值当前城市的子列表
        emit('change', changeResult)
        close()
      }
      dataList.value = item.areaList
    }
    watch(active, (newValue) => {
      if (newValue) {
        dataList.value = Object.assign({}, initialDataList.value)
        changeResult.provinceCode = '' // 省code
        changeResult.provinceName = ''// 省名称
        changeResult.cityCode = '' // 城市code
        changeResult.cityName = '' // 城市名称
        changeResult.countyCode = '' // 地区code
        changeResult.countyName = '' // 地区名
        changeResult.resultAddress = '' // 最终结果地址
      }
    })
    return { active, toggleDialog, dataList, optionClick, changeResult }
  }
}
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  margin-left: 10px;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
