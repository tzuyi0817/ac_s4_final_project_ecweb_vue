<template>
  <div class="products col-sm-6 col-md-6 col-lg-4 mt-2">
    <router-link
      :to="{ name: 'product', params: { id: product.id }}"
      style="text-decoration: none; color: black;"
    >
      <div class="card shadow">
        <img
          class="card-img-top"
          :src="product.image"
          alt="Card image cap"
          width="80%"
          height="180px"
        />
        <div class="card-header mt-2">
          <p class="card-title">
            【{{Category.name}}】
            <br />
            {{product.name}}
          </p>
        </div>
        <div class="card-body row" style="display:flex; justify-content: center;">
          <p class="price mr-4" style="color:#0085a5;">$ {{product.price}}</p>
          <p class="count" style="color:gray;">還剩{{product.count}}件</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    initialProduct: {
      type: Object,
      required: true
    },
    category: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      product: this.initialProduct,
      Category: this.category
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

.products {
  text-align: center;
}

.card {
  margin-bottom: 1rem !important;
  transition: all 0.3s ease-in-out;
  top: 0;
  left: 0;
  &:hover {
    top: -5px;
  }
}

.card-header {
  height: 5rem;
  background-color: white;
  @include respond-and(768px) {
    height: auto;
  }
}

.card-body {
  height: 4rem;
}

p {
  font-size: 18px;
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 14px);
  @include respond-and(768px) {
    font-size: 15px;
  }
}

.count {
  font-size: 17px;
  @include respond-between(960px, 1100px, 14px);
  @include respond-between(768px, 960px, 13px);
  @include respond-and(768px) {
    font-size: 14px;
  }
}
</style>