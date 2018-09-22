<template>
  <div id="app">
    <ManageType></ManageType>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import ManageType from '@/components/ManageType'

export default {
  name: 'app',
  components: {
    Navbar,
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
// @import '~bulma-calendar';
$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/scss/font-awesome';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
