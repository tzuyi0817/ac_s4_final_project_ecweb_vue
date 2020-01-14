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
      type: Array,
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

<style scoped>
.list-group-item {
  font-family: "DFKai-sb";
}

.list-group-item:hover {
  color: white;
  background-color: #0085a5;
}

@media screen and (min-width: 960px) and (max-width: 1040px) {
  .list-group {
    font-size: 15px;
  }
}

@media screen and (min-width: 840px) and (max-width: 960px) {
  .list-group {
    font-size: 10px;
  }
}

@media screen and (max-width: 840px) {
  .list-group {
    font-size: 15px;
  }
}
</style>