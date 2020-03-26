<template>
  <div class="categories col-md-5 col-10">
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
            width="80%"
            height="80%"
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
@mixin respond-between($lower, $upper, $font-size) {
  @media screen and (min-width: $lower) and (max-width: $upper) {
    font-size: $font-size;
  }
}

@mixin respond-and($upper) {
  @media screen and (max-width: $upper) {
    @content;
  }
}

.category-name {
  text-decoration: none;
}

h6 {
  text-align: center;
  color: #0085a5;
  font-size: 25px;

  @include respond-between(960px, 1100px, 20px);
  @include respond-between(768px, 960px, 15px);
  @include respond-and(768px) {
    font-size: 15px;
  }
}

.card:hover {
  box-shadow: 0 16px 22px 0 rgba(90, 91, 95, 0.3);
  top: -10px;
}
</style>