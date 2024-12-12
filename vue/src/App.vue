<template>
  <div id="app">
    <header>
      <Navbar />
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
}
header {
  flex-shrink: 0;
  width: 100%;
}
main {
  flex-grow: 1;
  overflow-y: auto;
  width: 100%;
}
</style>