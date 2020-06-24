export default {
  updateCount (state, obj) {
    state.count += obj.num
  },
  changeName (state, val) {
    state.name = val
  }
}
