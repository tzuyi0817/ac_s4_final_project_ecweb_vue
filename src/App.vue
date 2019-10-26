<template>
  <div id="ec-web">
    <Navbar />
    <main role="main" class="main">
      <router-view />
    </main>
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style scoped>
.main {
  margin-top: 180px;
  margin-left: 90px;
}
</style>
