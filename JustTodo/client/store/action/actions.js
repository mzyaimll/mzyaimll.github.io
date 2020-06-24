export default {
  updateCountASync: ({ commit }, { num }) => {
    setTimeout(() => {
      commit('updateCount', { num })
    }, 1000)
  }
}
