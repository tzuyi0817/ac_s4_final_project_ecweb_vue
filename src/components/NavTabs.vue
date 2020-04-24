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
.list-group {
  font-size: 16px;
  &-item:hover {
    transition: all 0.3s ease-in-out;
    color: white;
    background-color: #0085a5;
  }
}
</style>