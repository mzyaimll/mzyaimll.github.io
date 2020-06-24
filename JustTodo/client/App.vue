<template>
  <div id="app">
    <div id="cover" />
    <Header />
    <todo></todo>
    <Footer />
  </div>
</template>

<script>
import Header from './components/header'
import Footer from './components/footer'
import Todo from './view/todo/todo1'

export default {
  components: {
    Header,
    Footer,
    Todo
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  #app {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  #cover {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #999;
    opacity: .9;
    z-index: -1;
  }
</style>
