<template>
  <div class="row">
    <div class="col-2 ml-3">
      <router-link class="navbar-brand" id="logo" to="/">MuseClub</router-link>
    </div>

    <div class="title col-8">
      <h2>
        <strong>都市人的療癒餐酒館</strong>
      </h2>
    </div>
  </div>
</template>

<style scoped>
.row {
  font-family: "DFKai-sb";
}

.title {
  text-align: center;
}

.navbar-brand {
  font-family: "Pacifico", "Noto Sans TC", sans-serif;
  color: black;
}

.navbar-brand:hover {
  color: #0085a5;
}

@media screen and (min-width: 960px) and (max-width: 1040px) {
  h2 {
    font-size: 30px;
  }

  .navbar-brand {
    font-size: 22px;
  }
}

@media screen and (min-width: 840px) and (max-width: 960px) {
  h2 {
    font-size: 25px;
  }

  .navbar-brand {
    font-size: 17px;
  }
}
</style>