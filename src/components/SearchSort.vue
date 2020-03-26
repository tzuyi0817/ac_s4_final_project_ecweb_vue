<template>
  <div
    class="search-sort col-10 col-sm-10 col-md-12 mt-2 mb-2"
    style="display:flex; justify-content: center;"
  >
    <div class="row">
      <span class="mt-2">排序</span>
      <!-- 由新到舊 -->
      <template v-if="currentKey === createdAt && currentValue === desc">
        <router-link
          class="search-select btn ml-2"
          :to="{name: 'search', query: { keyword: currentKeyword, key: createdAt, value: desc }}"
        >新到舊</router-link>
      </template>
      <template v-else>
        <router-link
          class="search btn ml-2"
          :to="{name: 'search', query: { keyword: currentKeyword, key: createdAt, value: desc }}"
        >新到舊</router-link>
      </template>

      <!-- 由舊到新 -->
      <template v-if="currentKey === createdAt && currentValue === asc">
        <router-link
          class="search-select btn ml-2"
          :to="{name: 'search', query: { keyword: currentKeyword, key: createdAt, value: asc }}"
        >舊到新</router-link>
      </template>
      <template v-else>
        <router-link
          class="search btn ml-2"
          :to="{name: 'search', query: { keyword: currentKeyword, key: createdAt, value: asc }}"
        >舊到新</router-link>
      </template>

      <!-- 由高到低 -->
      <template v-if="currentKey === price && currentValue === desc">
        <router-link
          class="search-select btn ml-2"
          :to="{name: 'search', query: { keyword: currentKeyword, key: price, value: desc }}"
        >價格: 高至低</router-link>
      </template>
      <template v-else>
        <router-link
          class="search btn ml-2"
          :to="{name: 'search', query: { keyword: currentKeyword, key: price, value: desc }}"
        >價格: 高至低</router-link>
      </template>

      <!-- 由低到高 -->
      <template v-if="currentKey === price && currentValue === asc">
        <router-link
          class="search-select btn ml-2"
          :to="{name: 'search', query: { keyword: currentKeyword, key: price, value: asc }}"
        >價格: 低至高</router-link>
      </template>
      <template v-else>
        <router-link
          class="search btn ml-2"
          :to="{name: 'search', query: { keyword: currentKeyword, key: price, value: asc }}"
        >價格: 低至高</router-link>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentKeyword: {
      type: String,
      default: ""
    },
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
@mixin respond-between($lower, $upper, $font-size) {
  @media screen and (min-width: $lower) and (max-width: $upper) {
    font-size: $font-size;
    @content;
  }
}

@mixin respond-and($upper) {
  @media screen and (max-width: $upper) {
    @content;
  }
}

.search-sort {
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

%hover-style {
  background-color: #0085a5;
  color: white;
}

.search {
  background-color: white;
  color: #0085a5;
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px) {
    font-size: 15px;
    margin-top: 5px;
  }
  &:hover {
    @extend %hover-style;
    @include respond-between(960px, 1100px, 15px);
    @include respond-between(768px, 960px, 10px);
    @include respond-and(768px) {
      font-size: 15px;
      margin-top: 5px;
    }
  }
}

.search-select {
  @extend %hover-style;
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px) {
    font-size: 15px;
    margin-top: 5px;
  }
  &:hover {
    @extend %hover-style;
    @include respond-between(960px, 1100px, 15px);
    @include respond-between(768px, 960px, 10px);
    @include respond-and(768px) {
      font-size: 15px;
      margin-top: 5px;
    }
  }
}

span {
  margin-right: 10px;
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px) {
    display: none;
  }
}
</style>