import request from '@/utils/request'

/**
 * 帐号登录
 * @param {String} account - 用户名
 * @param {String} password - 密码
 */
export const reqUserLogin = ({ account, password }) => {
  return request('/login', 'post', { account, password })
}

/**
 * 获取QQ绑定的时候短信验证码
 * @param {String} mobile - 手机号
 * @returns promise
 */
export const reqUserQQBindCode = (mobile) => {
  return request(
    '/login/social/code',
    'get',
    { mobile }
  )
}

/**
 * QQ登录-绑定帐号
 * @param {String} unionId - QQ唯一标识，openId
 * @param {String} mobile - 手机号
 * @param {String} code - 验证码
 * @returns
 */
export const reqUserQQBindLogin = ({ unionId, mobile, code }) => {
  return request('/login/social/bind', 'post', { unionId, mobile, code })
}
/**
 * 第三方登录
 * @param {String} unionId - 第三方登录唯一标识 qq openId
 * @param {Integer} source - 来源 1为pc，2为webapp，3为微信小程序, 4为Android, 5为ios, 6为qq, 7为微信
 * @returns Promise
 */

export const reqUserQQLogin = (unionId, source = 6) => {
  return request('https://pcapi-xiaotuxian-front-devtest.itheima.net/login/social', 'post', { unionId, source })
}
