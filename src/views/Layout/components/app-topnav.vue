<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="$store.state.user.profile.token">
          <li>
            <a href="javascript:;"
              ><i class="iconfont icon-user"></i
              >{{ $store.state.user.profile.nickname || $store.state.user.profile.account}}</a
            >
          </li>
          <li><a href="javascript:;" @click="logout">退出登录</a></li>
        </template>
        <template v-else>
          <li><RouterLink :to="'/login?redirectUrl=' + encodeURIComponent($route.fullPath)">请先登录</RouterLink></li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>

        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'AppTopnav',
  setup (props) {
    const store = useStore()
    const router = useRouter()
    const logout = () => {
      store.commit('user/clearProfile')
      router.push('/login')
    }
    return {
      logout
    }
  }
}
</script>
<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
