<template>
  <div class="similar-products col-3">
    <router-link
      :to="{ name: 'product', params: { id: product.id }}"
      style="text-decoration: none; color: black;"
    >
      <div class="card">
        <img
          class="card-img-top"
          :src="product.image"
          alt="Card image cap"
          width="286px"
          height="180px"
        />
        <div class="card-body product-content mt-2">
          <p class="card-title">
            【{{CategoryName}}】
            {{product.name}}
          </p>
        </div>
        <div class="card-body row" style="display:flex;">
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
.similar-products {
  text-align: center;
  padding: 0 0 0 15px;
  min-width: 200px;
}

.card {
  margin-bottom: 1rem !important;
  transition: all 0.3s ease-in-out;
  top: 0;
  left: 0;
  border: none;
  &:hover {
    top: -5px;
  }
}

.product-content {
  padding: 20px 15px;
}

.card-body {
  height: 4rem;
  justify-content: space-between;
}

.count {
  font-size: 15px;
}
</style>