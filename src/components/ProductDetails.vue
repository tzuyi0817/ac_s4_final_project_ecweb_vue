<template>
  <div>
    <div class="ml-4 mt-5">
      <h5 class="ml-5">商品詳情</h5>
    </div>

    <div class="col-10 ml-5 mt-5 mb-5">
      <p class="ml-5 mr-5 mt-4">{{product.description}}</p>
      <div class="col-5 mt-5 ml-5 mb-2">
        <img class="ml-5" :src="product.imageI" width="500px" height="500px" alt="image" />
      </div>
      <div class="col-5 mt-3 ml-5 mb-5">
        <img class="ml-5" :src="product.imageII" width="500px" height="500px" alt="image" />
      </div>
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