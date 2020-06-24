import Vuex from 'vuex'
import defaultStates from './state/states'
import mutations from './mutation/mutations'
import getters from './getter/getters'
import actions from './action/actions'

export default () => {
  const store = new Vuex.Store({
    state: defaultStates,
    mutations: mutations,
    getters: getters,
    actions: actions
    // modules: {
    //   a: {
    //     namespaced: true,
    //     state: {
    //       text: 1
    //     },
    //     mutations: {
    //       updateText: (state, num) => {
    //         state.text = num
    //       }
    //     }
    //   },
    //   b: {
    //     state: {
    //       text: 2
    //     }
    //   }
    // }
  })

  /**
   * vuex的热加载配置
   */
  if (module.hot) {
    module.hot.accept([
      './state/states',
      './mutation/mutations',
      './getter/getters',
      './action/actions'
    ], () => {
      const newState = require('./state/states').default
      const newMutations = require('./mutation/mutations').default
      const newGetters = require('./getter/getters').default
      const newActions = require('./action/actions').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }
  return store
}
