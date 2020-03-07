<template>
  <div class="categories col-md-5">
    <div class="mb-3">
      <router-link
        :to="{ name: 'category-products', params: { id: category.id }}"
        class="category-name"
      >
        <div class="card shadow-sm">
          <img
            class="card-img-top mb-3"
            :src="category.image"
            alt="Card image cap"
            width="320px"
            height="250px"
          />
          <h6>{{category.name}}</h6>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialCategory: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      category: this.initialCategory
    };
  }
};
</script>

<style scoped>
.category-name {
  text-decoration: none;
}

h6 {
  text-align: center;
  color: #0085a5;
  font-size: 25px;
  font-family: "DFKai-sb";
}

.card:hover {
  box-shadow: 0 16px 22px 0 rgba(90, 91, 95, 0.3);
  top: -5px;
}

@media screen and (min-width: 960px) and (max-width: 1040px) {
  h6 {
    font-size: 20px;
  }

  img {
    height: 150px;
  }
}

@media screen and (min-width: 768px) and (max-width: 960px) {
  h6 {
    font-size: 15px;
  }

  img {
    height: 125px;
  }
}

@media screen and (max-width: 768px) {
  h6 {
    font-size: 15px;
  }

  img {
    height: 125px;
  }

  .card {
    width: 300px;
  }

  .categories {
    margin-left: 8px;
  }
}
</style>