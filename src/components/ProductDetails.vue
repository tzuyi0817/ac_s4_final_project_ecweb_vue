<template>
  <div class="details">
    <div class="ml-4 mt-5">
      <h5>商品詳情</h5>
    </div>

    <div class="details-content col-10 mt-5 mb-5">
      <p class="ml-4 mt-4">{{product.description}}</p>
      <div class="col-5 mt-5 mb-2">
        <img class :src="product.imageI" width="500px" height="500px" alt="image" />
      </div>
      <div class="col-5 mt-3 mb-5">
        <img class :src="product.imageII" width="500px" height="500px" alt="image" />
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

<style scoped>
img,
.details-content,
h5 {
  margin-left: 60px;
}

@media screen and (min-width: 1090px) and (max-width: 1180px) {
  h5 {
    font-size: 20px;
  }

  p {
    font-size: 15px;
  }

  img {
    width: 400px;
    height: 400px;
  }
}

@media screen and (min-width: 840px) and (max-width: 1090px) {
  h5 {
    font-size: 15px;
    margin-left: 0px;
  }

  p {
    font-size: 10px;
  }

  img {
    width: 300px;
    height: 300px;
  }
}

@media screen and (max-width: 840px) {
  .details {
    margin-left: -45px;
  }

  h5 {
    font-size: 20px;
    margin-left: 25px;
  }

  p {
    font-size: 15px;
  }

  .details-content {
    margin-left: 20px;
  }

  img {
    margin-left: 20px;
    width: 250px;
    height: 250px;
  }
}
</style>