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

h5,
.row {
  margin-left: 60px;
}

@media screen and (min-width: 1090px) and (max-width: 1180px) {
  h5 {
    font-size: 20px;
  }

  p,
  .link {
    font-size: 15px;
  }
}

@media screen and (min-width: 840px) and (max-width: 1090px) {
  h5 {
    font-size: 15px;
  }

  p,
  .link {
    font-size: 10px;
  }
}

@media screen and (max-width: 840px) {
  .specifications {
    margin-left: -20px;
  }

  h5 {
    font-size: 20px;
    margin-left: 0px;
  }

  .row {
    margin-left: 0px;
  }

  p,
  .link {
    font-size: 15px;
  }
}
</style>