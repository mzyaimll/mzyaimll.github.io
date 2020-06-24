import Router from 'vue-router'

import routes from './routes'

export default () => {
  return new Router({
    routes,
    // 去除默认hash路由设置
    mode: 'history',
    /*
    全局 router-link标签class值设置，方便全局设置样式
     */
    // linkActiveClass: 'active-link',
    // linkExactActiveClass: 'exact-active-link'
    /*
      例如商品页面跳转到购物车，又返回商品页面。设置下面属性可以保存滚动条浏览位置。
     */
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  })
}
