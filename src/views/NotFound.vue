<template>
  <div class="container" style="text-align: center;">
    <div class="fail">
      <h1>404 Page Not Found</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin respond-between($lower, $upper, $font-size) {
  @media screen and (min-width: $lower) and (max-width: $upper) {
    font-size: $font-size;
  }
}

@mixin respond-and($upper, $font-size) {
  @media screen and (max-width: $upper) {
    font-size: $font-size;
  }
}

.container {
  margin-bottom: 200px;
}

h1 {
  @include respond-between(960px, 1100px, 25px);
  @include respond-between(768px, 960px, 20px);
  @include respond-and(768px, 20px);
}

.fail {
  padding: 100px 0px;
  margin-left: -65px;
}
</style>