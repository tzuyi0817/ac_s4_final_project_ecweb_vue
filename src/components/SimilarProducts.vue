<template>
  <div class="col-md-3" style="text-align: center;">
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
          <p class="card-title">
            【{{CategoryName}}】
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
    initialSimilarProduct: {
      type: Array,
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

<style scoped>
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

p {
  font-size: 18px;
}

.count {
  font-size: 17px;
}

@media screen and (max-width: 1040px) {
  h5 {
    font-size: 20px;
  }

  p {
    font-size: 15px;
  }

  .count {
    font-size: 14px;
  }
}
</style>