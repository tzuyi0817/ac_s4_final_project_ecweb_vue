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
          <p class="card-title">
            【{{product.Product_category.name}}】
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

p {
  font-size: 18px;
}

.count {
  font-size: 17px;
}

.price {
  margin-right: 30px;
}

@media screen and (min-width: 960px) and (max-width: 1290px) {
  p {
    font-size: 14px;
  }

  .count {
    font-size: 13px;
  }

  .price {
    margin-right: 20px;
  }

  img {
    height: 135px;
  }

  .card {
    width: 145px;
  }
}

@media screen and (min-width: 840px) and (max-width: 960px) {
  p {
    font-size: 10px;
  }

  .count {
    font-size: 10px;
  }

  .price {
    margin-right: 15px;
  }

  img {
    height: 90px;
  }

  .card {
    width: 125px;
  }
}
</style>