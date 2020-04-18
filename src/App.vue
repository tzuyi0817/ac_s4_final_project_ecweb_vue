<template>
  <div id="ec-web">
    <Navbar />
    <main role="main" class="main">
      <router-view v-if="isRouterAlive" />
    </main>
    <Footer />
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Navbar,
    Footer
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap");

#ec-web {
  font-family: "Noto Sans TC", sans-serif;
}

.main {
  margin: {
    top: 180px;
    left: 90px;
  }
  @media screen and (max-width: 768px) {
    margin-top: 150px;
  }
}
</style>
