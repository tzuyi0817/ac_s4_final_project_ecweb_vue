<template>
  <div class="details">
    <div class="mt-5">
      <span class="detail-title">商品簡介</span>
    </div>

    <div class="details-content col-12 mb-5">
      <p>{{product.description}}</p>
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
@mixin respond-and($upper) {
  @media screen and (max-width: $upper) {
    @content;
  }
}

.detail-title {
  padding: 20px;
  background-color: #f3efef;
  border-radius: 5px;
}

.details-content {
  background-color: #f3efef;
  margin: 0;
  padding: 50px 20px;
}
</style>