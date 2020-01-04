<template>
  <div>
    <div class="ml-4 mt-5">
      <h5 class="ml-5">商品規格</h5>
    </div>

    <div class="row ml-5">
      <p class="ml-5 mr-5 mt-4" style="color: gray;">類別</p>
      <router-link
        class="link mt-4 ml-5"
        :to="{ name: 'category-products', params: { id: product.ProductCategoryId }}"
      >{{product.Product_category.name}}</router-link>
    </div>

    <div class="row ml-5">
      <p class="ml-5 mr-5 mt-2" style="color: gray;">庫存</p>
      <p class="mt-2 ml-5">{{product.count}}</p>
    </div>
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
.link {
  color: #0085a5;
  text-decoration: none;
}

@media screen and (max-width: 1040px) {
  h5 {
    font-size: 20px;
  }

  p,
  .link {
    font-size: 15px;
  }
}
</style>