<template>
  <div class="row">
    <div class="logo col-2 ml-3">
      <router-link class="navbar-brand" id="logo" to="/">MuseClub</router-link>
    </div>

    <div class="title col-md-8 col-10">
      <h2>
        <strong>都市人的餐酒坊</strong>
      </h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Long+Cang&display=swap");

@mixin respond-between($lower, $upper, $font-size) {
  @media screen and (min-width: $lower) and (max-width: $upper) {
    font-size: $font-size;
  }
}

@mixin respond-and($upper) {
  @media screen and (max-width: $upper) {
    @content;
  }
}

.title {
  text-align: center;
  font-family: "Long Cang", cursive;
  @include respond-and(768px) {
    margin: {
      top: 30px;
      left: -20px;
    }
  }
}

.navbar-brand {
  font-family: "Pacifico", "Noto Sans TC", sans-serif;
  color: black;
  &:hover {
    color: #0085a5;
  }

  @include respond-between(960px, 1100px, 22px);
  @include respond-between(768px, 960px, 17px);
}

h2 {
  @include respond-between(960px, 1100px, 30px);
  @include respond-between(768px, 960px, 25px);
  @include respond-and(768px) {
    font-size: 25px;
  }
}

.logo {
  @include respond-and(768px) {
    display: none;
  }
}
</style>