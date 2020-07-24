<template>
  <div id="app">
    <vue-bpmn :product="product"></vue-bpmn>
  </div>
</template>

<script>
  import VueBpmn from './components/bpmn/VueBpmn'

  export default {
    name: 'App',
    data(){
      return {
        product:"flowable"
      }
    },
    components: {
      VueBpmn
    }
  }
</script>

<style>

</style>
