<template>
  <div class="search-sort col-12 mt-2">
    <div class="row">
      <span class="mt-2 ml-2 mr-2">排序</span>
      <!-- 由新到舊 -->
      <template v-if="currentKey === createdAt && currentValue === desc">
        <router-link
          class="search-select btn ml-2"
          :to="{name: 'category-products', query: { key: createdAt, value: desc }, hash: '#pagination'}"
        >由新到舊</router-link>
      </template>
      <template v-else>
        <router-link
          class="search btn ml-2"
          :to="{name: 'category-products', query: { key: createdAt, value: desc }, hash: '#pagination'}"
        >由新到舊</router-link>
      </template>

      <!-- 由舊到新 -->
      <template v-if="currentKey === createdAt && currentValue === asc">
        <router-link
          class="search-select btn ml-2"
          :to="{name: 'category-products', query: { key: createdAt, value: asc }, hash: '#pagination'}"
        >由舊到新</router-link>
      </template>
      <template v-else>
        <router-link
          class="search btn ml-2"
          :to="{name: 'category-products', query: { key: createdAt, value: asc }, hash: '#pagination'}"
        >由舊到新</router-link>
      </template>

      <!-- 由高到低 -->
      <template v-if="currentKey === price && currentValue === desc">
        <router-link
          class="search-select btn ml-2"
          :to="{name: 'category-products', query: { key: price, value: desc }, hash: '#pagination'}"
        >價格: 由高至低</router-link>
      </template>
      <template v-else>
        <router-link
          class="search btn ml-2"
          :to="{name: 'category-products', query: { key: price, value: desc }, hash: '#pagination'}"
        >價格: 由高至低</router-link>
      </template>

      <!-- 由低到高 -->
      <template v-if="currentKey === price && currentValue === asc">
        <router-link
          class="search-select btn ml-2"
          :to="{name: 'category-products', query: { key: price, value: asc }, hash: '#pagination'}"
        >價格: 由低至高</router-link>
      </template>
      <template v-else>
        <router-link
          class="search btn ml-2"
          :to="{name: 'category-products', query: { key: price, value: asc }, hash: '#pagination'}"
        >價格: 由低至高</router-link>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentKey: {
      type: String,
      default: ""
    },
    currentValue: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      createdAt: "createdAt",
      desc: "desc",
      price: "price",
      asc: "asc"
    };
  }
};
</script>

<style scoped>
.search-sort {
  font-family: "DFKai-sb";
  font-weight: 400;
  background: #d2f0f5;
  padding: 0.8125rem 1.25rem;
  border-radius: 2px;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -moz-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.search {
  background-color: white;
  color: #0085a5;
}

.search:hover {
  background-color: #0085a5;
  color: white;
}

.search-select,
.search-select:hover {
  background-color: #0085a5;
  color: white;
}
</style>