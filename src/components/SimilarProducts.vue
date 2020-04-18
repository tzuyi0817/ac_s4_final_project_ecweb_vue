<template>
  <div class="similar-products col-10 col-sm-5 col-md-5 col-lg-3" style="text-align: center;">
    <router-link
      :to="{ name: 'product', params: { id: product.id }}"
      style="text-decoration: none; color: black;"
    >
      <div class="card shadow">
        <img
          class="card-img-top"
          :src="product.image"
          alt="Card image cap"
          width="286px"
          height="180px"
        />
        <div class="card-header mt-2">
          <p class="card-title">
            【{{CategoryName}}】
            <br />
            {{product.name}}
          </p>
        </div>
        <div class="card-body row" style="display:flex; justify-content: center;">
          <p class="price" style="color:#0085a5;">$ {{product.price}}</p>
          <p class="count" style="color:gray;">還剩{{product.count}}件</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    initialSimilarProduct: {
      type: Object,
      required: true
    },
    categoryName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      product: this.initialSimilarProduct,
      CategoryName: this.categoryName
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
}

.card-body {
  height: 4rem;
}

p {
  font-size: 18px;
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px) {
    font-size: 15px;
  }
}

.count {
  font-size: 17px;
  @include respond-between(960px, 1100px, 14px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px) {
    font-size: 14px;
  }
}

.price {
  margin-right: 30px;
  @media screen and (min-width: 960px) and (max-width: 1100px) {
    margin-right: 20px;
  }
}

h5 {
  @include respond-between(960px, 1100px, 20px);
  @include respond-between(768px, 960px, 15px);
  @include respond-and(768px) {
    font-size: 20px;
  }
}

.similar-products {
  @include respond-and(768px) {
    margin-left: 20px;
  }
}
</style>