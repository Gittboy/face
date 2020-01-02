<template>
  <div id="app" class="new_page">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created(){
    console.log(this.$route.query.isSignin);
  }
}
</script>

<style lang="less">
@import './common/public/style.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  width: 100%;
  height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
