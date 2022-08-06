<template>
  <div class="xtx-form">
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{ account }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input
          class="input"
          type="text"
          placeholder="绑定的手机号"
          v-model="form.mobile"
        />
      </div>
      <div class="error"></div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input
          class="input"
          type="text"
          placeholder="短信验证码"
          v-model="form.code"
        />
        <span class="code" @click="send">{{
          countTime > 0 ? countTime + "后重新发送" : "发送验证码"
        }}</span>
      </div>
      <div class="error"></div>
    </div>
    <a href="javascript:;" class="submit" @click="submit">立即绑定</a>
  </div>
</template>

<script>
import QC from 'qc'
import { ref, reactive } from 'vue'
import { message } from '@/components/Message'
import { reqUserQQBindCode, reqUserQQBindLogin } from '@/api/user'
import { useCountDown } from '@/compositions'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  props: {
    openId: {
      type: String,
      default: ''
    }
  },
  name: 'CallbackBind',
  setup (props) {
    const account = ref('')
    const avatar = ref('')

    if (QC.Login.check()) {
      QC.api('get_user_info').success(({ data }) => {
        account.value = data.nickname
        avatar.value = data.figureurl_2
      })
    }
    const form = reactive({
      mobile: '',
      code: ''
    })

    const { countTime, start } = useCountDown(60)

    const send = async () => {
      if (countTime.value === 0) {
        if (/^1[3-9]\d{9}$/.test(form.mobile)) {
          start()
          await reqUserQQBindCode(form.mobile)
        } else {
          message({
            type: 'error',
            text: '手机号格式不正确'
          })
        }
      }
    }
    const store = useStore()
    const router = useRouter()
    const submit = async () => {
      if (!/^1[3-9]\d{9}$/.test(form.mobile) || form.code === '') return
      const res = await reqUserQQBindLogin({
        unionId: props.openId,
        mobile: form.mobile,
        code: form.code
      })
      // 1. 将当前返回的用户数据，通过提交mutation函数存入 vuex
      store.commit('user/setProfile', res.result)
      // 2. 跳转到首页
      router.push('/')
      // 3. 提示用户登录成功
      message({ type: 'success', text: '绑定成功' })
    }

    return {
      account,
      avatar,
      submit,
      send,
      form,
      countTime
    }
  }
}
</script>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 90px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>
