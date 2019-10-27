<template>
  <div id="ec-web">
    <Navbar />
    <main role="main" class="main">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Navbar,
    Footer
  }
};
</script>

<style scoped>
.main {
  margin-top: 180px;
  margin-left: 90px;
}
</style>
