<template>
  <div class="specifications">
    <div class="ml-4 mt-5">
      <h5>商品規格</h5>
    </div>

    <div class="row">
      <p class="ml-5 mr-5 mt-4" style="color: gray;">類別</p>
      <router-link
        class="link mt-4 ml-5"
        :to="{ name: 'category-products', params: { id: product.ProductCategoryId }}"
      >{{product.Product_category.name}}</router-link>
    </div>

    <div class="row">
      <p class="ml-5 mr-5 mt-2" style="color: gray;">庫存</p>
      <p class="mt-2 ml-5">{{product.count}}</p>
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

.link {
  color: #0085a5;
  text-decoration: none;
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px) {
    font-size: 15px;
  }
}

h5 {
  margin-left: 60px;
  @include respond-between(960px, 1100px, 20px);
  @include respond-between(768px, 960px, 15px);
  @include respond-and(768px) {
    font-size: 20px;
    margin-left: 0px;
  }
}

.row {
  margin-left: 60px;
  @include respond-and(768px) {
    margin-left: 0px;
  }
}

p {
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px) {
    font-size: 15px;
  }
}
</style>