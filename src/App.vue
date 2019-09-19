<template>
  <div id="app">
    <h1>Vue Json Editor</h1>
    <vue-json-editor></vue-json-editor>
  </div>
</template>

<script>
import VueJsonEditor from "./components/vue-json-editor";

export default {
  name: "app",
  components: {
    VueJsonEditor
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
