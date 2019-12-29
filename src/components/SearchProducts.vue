<template>
  <div class="products col-md-3 mt-3">
    <router-link
      :to="{ name: 'product', params: { id: product.id }}"
      style="text-decoration: none; color: black;"
    >
      <div class="card shadow-sm">
        <img
          class="card-img-top"
          :src="product.image"
          alt="Card image cap"
          width="286px"
          height="180px"
        />
        <div class="card-header mt-2">
          <p class="card-title" style="font-size: 18px;">
            【{{product.Product_category.name}}】
            <br />
            {{product.name}}
          </p>
        </div>
        <div class="card-body row" style="display:flex; justify-content: center;">
          <p class="price mr-4" style="color:#0085a5; font-size: 18px;">$ {{product.price}}</p>
          <p style="color:gray; font-size: 17px;">還剩{{product.count}}件</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    initialProduct: {
      type: Array,
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

<style scoped>
.products {
  font-family: "DFKai-sb";
  text-align: center;
}

.card {
  margin-bottom: 1rem !important;
}

.card-header {
  height: 5rem;
  background-color: white;
}

.card-body {
  height: 4rem;
}

.card:hover {
  box-shadow: 0 16px 22px 0 rgba(90, 91, 95, 0.3);
  top: -5px;
}
</style>