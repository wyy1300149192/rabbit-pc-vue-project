<template>
  <div class="goods-sku">
    <!-- 使用无序列表布局商品属性 -->
    <!-- 遍历选项类别：有几个类别创建几个 -->
    <dl v-for="spec in goods.specs" :key="spec.id">
      <!-- 选项类别名 -->
      <dt>{{ spec.name }}</dt>
      <dd>
        <!-- 遍历选项：有几个选项创建几个 -->
        <template v-for="option in spec.values" :key="option.name">
          <!-- 判断有图片路径显示img，否则显示sapn -->
          <img
            v-if="option.picture"
            :class="{ selected: option.selected, disabled: option.disabled }"
            :src="option.picture"
            :alt="option.name"
            :title="option.name"
            @click="optionClick(spec.values, option)"
          />
          <span
            v-else
            :class="{ selected: option.selected, disabled: option.disabled }"
            @click="optionClick(spec.values, option)"
            >{{ option.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import getPowerSet from '@/vendor/power-set'

// 根据skus建立路径字典 选项：[id]
function handleSku (skus) {
  // 创建一个数组用于储存
  const obj = {}
  // 遍历skus
  skus.forEach((sku) => {
    // 判断库存是否为0
    if (sku.inventory) {
      // 获取当前id的所有选项保存为一个数组
      const options = sku.specs.map((option) => option.valueName)
      // 使用幂集算法求所有子集
      const skuArr = getPowerSet(options)
      // 遍历所有子集
      skuArr.forEach((item) => {
        // 将数组使用*为分隔符转成字符串
        const key = item.join('*')
        // 判断onj中是否有当前子集
        if (obj[key]) {
          // 有则value中增加当前skuid
          obj[key].push(sku.id)
        } else {
          // 没有则新增 key：子集 value:[id]
          obj[key] = [sku.id]
        }
      })
    }
  })
  return obj
}
export default {
  name: 'GoodsSku',
  props: {
    // 接收goods对象
    goods: {
      type: Object,
      default: () => {}
    },
    // 接收skuId
    skuId: {
      type: String,
      default: ''
    }
  },
  setup (props, context) {
    // 路径字典
    const PathMap = handleSku(props.goods.skus)
    // 设置默认选中项
    const defaultSelected = (skus, specs, skuId) => {
      // 遍历skus，将和传过来的skuid相等的项目返回
      const sku = skus.find((sku) => sku.id === skuId)
      // 如果sku没有则直接return
      if (!sku) return
      // 遍历选项类别
      specs.forEach((spec) => {
        // 遍历当前选项类别的选项
        spec.values.forEach((option) => {
          // 遍历sku中的选项
          sku.specs.forEach((item) => {
            // 如果和当前选项一直则设置选中状态
            if (option.name === item.valueName) {
              option.selected = true
            }
          })
        })
      })
    }
    defaultSelected(props.goods.skus, props.goods.specs, props.skuId)

    // 页面初始化判断商品选项禁用
    const isDisabled = (specs, PathMap) => {
      // 遍历商品类别
      specs.forEach((spec) => {
        // 遍历当前商品类别的选项
        spec.values.forEach((option) => {
          // 判断路径字典有没有当前选项 给disabled赋值
          if (PathMap[option.name]) {
            option.disabled = false
          } else {
            option.disabled = true
          }
        })
      })
    }
    isDisabled(props.goods.specs, PathMap)

    // 获取当前选中的选项的数组
    const getCurrentSelected = (specs) => {
      // 建立空数组
      const arr = []
      // 遍历选项类别
      specs.forEach((spec, index) => {
        // 获取当前选项类别的选中的对象
        const option = spec.values.find((item) => item.selected)
        // 如果获取到了给arr赋值，设置下标和路径字典一致
        if (option) {
          arr[index] = option.name
        } else {
          arr[index] = undefined
        }
      })
      return arr
    }
    // 更新选项禁用状态
    const updateDisabled = (specs, PathMap) => {
      // 获取当前选中的数组
      const currentSelected = JSON.stringify(getCurrentSelected(specs))
      // 遍历选项类别
      specs.forEach((spec, index) => {
        // 遍历当前类别选项
        spec.values.forEach((option) => {
          // 拷贝当前选项列表
          const selectValues = JSON.parse(currentSelected)
          // 当前选项 + 遍历的当前选项 组合
          selectValues[index] = option.name
          // 格式化key为何路径字典相同
          const key = selectValues.filter((v) => v).join('*')
          // 判断当前选项 + 遍历的当前选项 组合是否存在于路径字典
          if (PathMap[key]) {
            option.disabled = false
          } else {
            option.disabled = true
          }
        })
      })
    }
    updateDisabled(props.goods.specs, PathMap)

    // 当前选择的商品信息
    const getSelectedGoods = (specs, PathMap, skus) => {
      // 判断选中所有项将数据传出
      // 将当前选择的选项数组获取到
      const selectedArr = getCurrentSelected(specs).filter(
        (v) => v
      )
      // 判断当前选项数组和选项类别数量是否一致，一致既是全部选中了
      if (selectedArr.length === specs.length) {
        // 从字典获取id
        const skuId = PathMap[selectedArr.join('*')][0]
        // 根据id获取到sku
        const sku = skus.find((item) => item.id === skuId)
        // 传出数据
        context.emit('change', {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          specsText: sku.specs
            .reduce((str, item) => `${str} ${item.name}：${item.valueName}`, '')
            .trim('')
        })
      } else {
        // 否则传一个空的
        context.emit('change', {})
      }
    }
    getSelectedGoods(props.goods.specs, PathMap, props.goods.skus)

    // 商品选项点击事件
    const optionClick = (values, option) => {
      // 如果当前选项disabled为true直接停止往下执行
      if (option.disabled) return
      getSelectedGoods(props.goods.specs, PathMap, props.goods.skus)
      // 遍历所有选项类别，排除选中
      values.forEach((item) => {
        item.selected = false
      })
      //  当前点击取反
      if (option.selected) {
        option.selected = false
      } else {
        option.selected = true
      }
      updateDisabled(props.goods.specs, PathMap)
    }

    return {
      optionClick
    }
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
