<template>
  <div id="app">
    <!-- <img alt="vue logo" src=".assets/.logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/home.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
#app form{
  background-color: #533980;
}
#app form label{
  font-size: 14pt;
  font-weight: bold;
}
#app form legend{
  font-size: 14pt;
  font-weight: bold;
}
</style>
