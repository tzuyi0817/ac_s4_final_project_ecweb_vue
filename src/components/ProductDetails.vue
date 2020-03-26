<template>
  <div class="details">
    <div class="ml-4 mt-5">
      <h5>商品詳情</h5>
    </div>

    <div class="details-content col-10 mt-5 mb-5">
      <p class="ml-4 mt-4">{{product.description}}</p>
      <div class="col-5 mt-5 mb-2">
        <img class :src="product.imageI" width="500px" height="500px" alt="image" />
      </div>
      <div class="col-5 mt-3 mb-5">
        <img class :src="product.imageII" width="500px" height="500px" alt="image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialProduct: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      product: this.initialProduct
    };
  }
};
</script>

<style lang="scss" scoped>
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

.details-content {
  margin-left: 60px;
  @include respond-and(768px) {
    margin-left: 20px;
  }
}

img {
  margin-left: 60px;
  @media screen and (min-width: 960px) and (max-width: 1100px) {
    width: 400px;
    height: 400px;
  }
  @media screen and (min-width: 768px) and (max-width: 1100px) {
    width: 300px;
    height: 300px;
  }
  @include respond-and(768px) {
    width: 250px;
    height: 250px;
    margin-left: 20px;
  }
}

h5 {
  margin-left: 60px;
  @include respond-between(960px, 1100px, 20px);
  @include respond-between(768px, 960px, 15px);
  @include respond-and(768px) {
    font-size: 20px;
    margin-left: 15px;
  }
}

p {
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px) {
    font-size: 15px;
  }
}

.details {
  @include respond-and(768px) {
    margin-left: -15px;
  }
}
</style>