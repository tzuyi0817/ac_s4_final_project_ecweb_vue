<template>
  <div class="search-sort col-12 mt-2" style="display:flex; justify-content: center;">
    <div class="row">
      <span class="mt-2 ml-1">排序</span>
      <!-- 由新到舊 -->
      <template v-if="currentKey === createdAt && currentValue === desc">
        <router-link
          class="search-select btn"
          :to="{name: 'category-products', query: { key: createdAt, value: desc }, hash: '#pagination'}"
        >新到舊</router-link>
      </template>
      <template v-else>
        <router-link
          class="search btn"
          :to="{name: 'category-products', query: { key: createdAt, value: desc }, hash: '#pagination'}"
        >新到舊</router-link>
      </template>

      <!-- 由舊到新 -->
      <template v-if="currentKey === createdAt && currentValue === asc">
        <router-link
          class="search-select btn"
          :to="{name: 'category-products', query: { key: createdAt, value: asc }, hash: '#pagination'}"
        >舊到新</router-link>
      </template>
      <template v-else>
        <router-link
          class="search btn"
          :to="{name: 'category-products', query: { key: createdAt, value: asc }, hash: '#pagination'}"
        >舊到新</router-link>
      </template>

      <!-- 由高到低 -->
      <template v-if="currentKey === price && currentValue === desc">
        <router-link
          class="search-select btn"
          :to="{name: 'category-products', query: { key: price, value: desc }, hash: '#pagination'}"
        >價格: 高至低</router-link>
      </template>
      <template v-else>
        <router-link
          class="search btn"
          :to="{name: 'category-products', query: { key: price, value: desc }, hash: '#pagination'}"
        >價格: 高至低</router-link>
      </template>

      <!-- 由低到高 -->
      <template v-if="currentKey === price && currentValue === asc">
        <router-link
          class="search-select btn"
          :to="{name: 'category-products', query: { key: price, value: asc }, hash: '#pagination'}"
        >價格: 低至高</router-link>
      </template>
      <template v-else>
        <router-link
          class="search btn"
          :to="{name: 'category-products', query: { key: price, value: asc }, hash: '#pagination'}"
        >價格: 低至高</router-link>
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

<style lang="scss" scoped>
@mixin respond-and($upper) {
  @media screen and (max-width: $upper) {
    @content;
  }
}

.search-sort {
  font-weight: 400;
  background: linear-gradient(-40deg, #d2f0f5, #abe3ed) !important;
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
  padding: 16.25px 5px;
}

.search {
  background-color: white;
  color: #0085a5;
  font-size: 16px;
  margin-left: 10px;
  &:hover {
    background-color: #0085a5;
    color: white;
    transition: all 0.3s ease-in-out;
  }
}

%search-select-style {
  background-color: #0085a5;
  color: white;
  font-size: 16px;
  margin-left: 10px;
  transition: all 0.3s ease-in-out;
}

.search-select {
  @extend %search-select-style;
  &:hover {
    @extend %search-select-style;
  }
}

.search-select,
.search {
  @include respond-and(576px) {
    padding: 7.5px;
    margin-left: 7px;
  }
}

span {
  font-size: 16px;
  margin-right: 10px;
  @include respond-and(768px) {
    display: none;
  }
}
</style>