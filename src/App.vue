<template>
  <div id="app">
    <vTop />
    <vHeader />
    <router-view :key="$route.fullPath"></router-view>
    <vFoot />
  </div>
</template>

<script>
import vTop from './components/CommTop';
import vHeader from './components/HeadTop';
import vFoot from './components/Foot';
export default {
  components: {
    vTop,
    vHeader,
    vFoot
  },
  name: 'App'
};
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: rgb(245, 245, 245);
}
#app li {
  list-style-type: none;
}
</style>
