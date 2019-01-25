<template>
  <div id="app">
    <ManageType></ManageType>
    <toast-container></toast-container>
  </div>
</template>

<script>
import ManageType from '@/components/ManageType'

export default {
  name: 'app',
  components: {
    ManageType
  },
  data() {
    return {}
  },
  mounted () {},
  computed: {},
}
</script>

<style lang="scss">
@import '~bulma';
$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/scss/font-awesome';
@import 'node_modules/vue-on-toast/dist/vue-on-toast.styl';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  //margin-top: 60px;
}
</style>
