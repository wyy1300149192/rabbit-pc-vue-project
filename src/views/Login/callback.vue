<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container">
    <nav class="tab">
      <a href="javascript:;" @click="comName = 'CallbackBind'">
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a href="javascript:;" @click="comName = 'CallbackPatch'">
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <component :is="comName" :openId="openId"></component>
  </section>
  <LoginFooter />
</template>

<script>
import CallbackBind from './components/callback-bind.vue'
import CallbackPatch from './components/callback-patch.vue'
import LoginHeader from './components/login-header'
import LoginFooter from './components/login-footer'
import { ref } from 'vue'
import QC from 'qc'
import { reqUserQQLogin } from '@/api/user'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { message } from '@/components/Message'
export default {
  name: 'PageCallback',
  components: { LoginHeader, LoginFooter, CallbackPatch, CallbackBind },
  setup () {
    // 已注册已绑定
    const store = useStore()
    const router = useRouter()
    const comName = ref('CallbackBind')
    const openId = ref('')
    if (QC.Login.check()) {
      QC.Login.getMe(async (id) => {
        openId.value = id
        const res = await reqUserQQLogin(openId.value)
        // 使用qq登录成功
        // 1. 存储用户信息
        store.commit('user/setProfile', res.result)
        // 2. 跳转首页
        router.push('/')
        // 3. 成功提示
        message({ type: 'success', text: 'QQ登录成功' })
      })
    }
    return { comName, openId }
  }
}
</script>

<style scoped lang="less">
.container {
  padding: 25px 0;
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
