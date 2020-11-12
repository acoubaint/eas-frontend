<template>
  <div id="app">
    <Header></Header>
    <main>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </main>
  </div>
</template>

<script>
import Header from './layouts/Header';

export default {
  name: 'App',
  components: {
    Header
  },
  computed: {
    
  }
}
</script>

<style>
  
</style>
