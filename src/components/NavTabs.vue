<template>
  <div class="list-group">
    <template v-if="category.id === categoryId">
      <router-link
        class="list-group-item list-group-item-action active"
        style="background-color: #0085a5;"
        :to="{ name: 'category-products', params: { id: category.id }}"
      >{{category.name}}</router-link>
    </template>
    <template v-else>
      <router-link
        class="list-group-item list-group-item-action"
        :to="{ name: 'category-products', params: { id: category.id }}"
      >{{category.name}}</router-link>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    initialCategory: {
      type: Object,
      required: true
    },
    categoryId: {
      type: Number,
      default: -1
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

@mixin respond-and($upper, $font-size) {
  @media screen and (max-width: $upper) {
    font-size: $font-size;
  }
}

.list-group {
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px, 15px);
  &-item:hover {
    color: white;
    background-color: #0085a5;
  }
}
</style>