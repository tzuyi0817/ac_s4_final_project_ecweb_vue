<template>
  <div class="similar-products col-sm-5 col-md-5 col-lg-3" style="text-align: center;">
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

.price {
  margin-right: 30px;
}

@media screen and (min-width: 1090px) and (max-width: 1180px) {
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

@media screen and (min-width: 840px) and (max-width: 1090px) {
  h5 {
    font-size: 15px;
  }

  p {
    font-size: 10px;
  }

  .count {
    font-size: 9px;
  }

  .price {
    margin-right: 20px;
  }
}

@media screen and (max-width: 840px) {
  .similar-products {
    margin-left: 20px;
  }

  p {
    font-size: 15px;
  }

  .count {
    font-size: 14px;
  }

  .card-header {
    height: auto;
  }

  .card-body {
    height: 3rem;
  }

  .card {
    width: 250px;
  }

  img {
    height: 150px;
  }
}
</style>