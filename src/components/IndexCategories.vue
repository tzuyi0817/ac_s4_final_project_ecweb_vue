<template>
  <div class="col-lg-6 col-12">
    <div class="category-box mb-3">
      <router-link
        :to="{ name: 'category-products', params: { id: category.id }}"
        class="category-name"
      >
        <div class="card shadow">
          <img class="card-img-top mb-3" :src="category.image" alt="Card image cap" width="100%" />
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
      type: Object,
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

<style lang="scss" scoped>
.category-name {
  text-decoration: none;
  &:hover {
    box-shadow: 0 16px 22px 0 rgba(90, 91, 95, 0.3);
    top: -5px;
  }
}

h6 {
  text-align: center;
  color: #0085a5;
}

.category-box {
  transition: all 0.3s ease-in-out;
  top: 0;
  left: 0;
  &:hover {
    box-shadow: 0 16px 22px 0 rgba(90, 91, 95, 0.3);
    top: -5px;
  }
}

.card {
  transition: all 0.3s ease-in-out;
  top: 0;
  left: 0;
  &:hover {
    top: -5px;
  }
}
</style>