<template>
  <div class="list-group">
    <router-link
      class="list-group-item list-group-item-action"
      :to="{ name: 'category-products', params: { id: category.id }}"
    >{{category.name}}</router-link>
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
.list-group-item {
  font-family: "DFKai-sb";
}

.list-group-item:hover {
  color: white;
  background-color: #0085a5;
}
</style>