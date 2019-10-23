<template>
  <div id="ec-web">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar';

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>
