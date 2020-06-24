import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import './assets/styles/index.scss'
import createRouter from './config/router'
import createVuex from './store/store'

const root = document.createElement('div')
document.body.appendChild(root)

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createVuex()

/**
 * store.watch 监听了store的state
 */
store.watch(({ name }) => name + 1, (newCount) => {
  console.log('new count:' + newCount)
})
store.subscribe((mutation, state) => {
  console.log('type:' + mutation.type + ' payload:' + mutation.payload)
})
store.subscribeAction((action, state) => {
  console.log('type:' + action.type + ' payload:' + action.payload)
})

router.beforeEach((to, from, next) => {
  console.log('before each invoked')
  next()
})

router.beforeResolve((to, from, next) => {
  console.log('before resolve invoked')
  next()
})

router.afterEach((to, from) => {
  console.log('after each invoked')
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount(root)
