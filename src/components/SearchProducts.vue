<template>
  <div class="products col-6 col-md-4 col-lg-3 mt-3">
    <router-link
      :to="{ name: 'product', params: { id: product.id }}"
      style="text-decoration: none; color: black;"
    >
      <div class="card">
        <img
          class="card-img-top"
          :src="product.image"
          alt="Card image cap"
          width="80%"
          height="180px"
        />
        <div class="card-body product-content mt-2">
          <p class="card-title">
            【{{product.Product_category.name}}】
            {{product.name}}
          </p>
        </div>
        <div class="card-body row" style="display:flex; justify-content: space-between;">
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
.products {
  text-align: center;
  padding: 0 0 0 15px;
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

.card-body {
  height: 4rem;
}

.product-content {
  padding: 20px 0px;
}

.count {
  font-size: 15px;
}
</style>