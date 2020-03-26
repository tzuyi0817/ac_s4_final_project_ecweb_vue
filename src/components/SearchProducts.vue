<template>
  <div class="products col-sm-6 col-md-4 col-lg-4 col-xl-3 mt-3">
    <router-link
      :to="{ name: 'product', params: { id: product.id }}"
      style="text-decoration: none; color: black;"
    >
      <div class="card shadow-sm">
        <img
          class="card-img-top"
          :src="product.image"
          alt="Card image cap"
          width="80%"
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
@mixin respond-between($lower, $upper) {
  @media screen and (min-width: $lower) and (max-width: $upper) {
    @content;
  }
}

@mixin respond-and($upper) {
  @media screen and (max-width: $upper) {
    @content;
  }
}

.products {
  text-align: center;
}

.card {
  margin-bottom: 1rem !important;
  &:hover {
    box-shadow: 0 16px 22px 0 rgba(90, 91, 95, 0.3);
    top: -5px;
  }
}

.card-header {
  height: 5rem;
  background-color: white;
}

.card-body {
  height: 4rem;
}

p {
  font-size: 15px;
  @include respond-between(960px, 1100px) {
    font-size: 14px;
  }
  @include respond-between(768px, 960px) {
    font-size: 10px;
  }
  @include respond-and(768px) {
    font-size: 15px;
  }
}

.count {
  font-size: 14px;
  @include respond-between(960px, 1100px) {
    font-size: 13px;
  }
  @include respond-between(768px, 960px) {
    font-size: 10px;
  }
  @include respond-and(768px) {
    font-size: 14px;
  }
}

.price {
  margin-right: 30px;
}

// @media screen and (min-width: 960px) and (max-width: 1290px) {
//   .price {
//     margin-right: 20px;
//   }

//   img {
//     height: 135px;
//   }

//   .card {
//     width: 145px;
//   }
// }

// @media screen and (min-width: 768px) and (max-width: 960px) {
//   .price {
//     margin-right: 15px;
//   }

//   img {
//     height: 90px;
//   }

//   .card {
//     width: 125px;
//   }
// }

// @media screen and (max-width: 768px) {
//   .products {
//     margin-left: -25px;
//   }

//   .card-header {
//     height: auto;
//   }

//   .card-body {
//     height: 3rem;
//   }

//   .card {
//     width: 250px;
//   }

//   img {
//     height: 150px;
//   }
// }
//
</style>