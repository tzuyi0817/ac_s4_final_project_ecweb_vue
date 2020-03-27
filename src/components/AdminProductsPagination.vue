<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination mt-5 mb-5">
      <!-- 回到上一頁 previousPage -->
      <li v-show="previousPage" class="page-item">
        <router-link
          class="page-link"
          aria-label="Previous"
          style="color: #0085a5;"
          :to="{name: 'AdminProducts', query: { launched: currentLaunched, page: previousPage }}"
        >
          <span aria-hidden="true">&laquo;</span>
        </router-link>
      </li>
      <!-- 頁碼 -->
      <li
        v-for="page in totalPage"
        :key="page"
        class="page-item"
        :class="['page-item', { active: currentPage === page }]"
      >
        <router-link
          class="page-link"
          :to="{name: 'AdminProducts', query: { launched: currentLaunched, page }}"
        >{{ page }}</router-link>
      </li>

      <!-- 前往下一頁 nextPage -->
      <li v-show="nextPage" class="page-item">
        <router-link
          class="page-link"
          style="color: #0085a5;"
          :to="{name: 'AdminProducts', query: { launched: currentLaunched, page: nextPage }}"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    currentLaunched: {
      type: String,
      default: ""
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalPage: {
      type: Number,
      default: -1
    }
  },
  computed: {
    previousPage() {
      return this.currentPage === 1 ? null : this.currentPage - 1;
    },
    nextPage() {
      return this.currentPage + 1 > this.totalPage
        ? null
        : this.currentPage + 1;
    }
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

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

%hover-style {
  color: white;
  background-color: #0085a5;
}

.page-link {
  color: #0085a5;
  height: 37px;
  padding: 7px 20px;
  &:hover {
    @extend %hover-style;
    span {
      @extend %hover-style;
    }
  }
  &:active {
    background-color: #0085a5;
  }
  span {
    color: #0085a5;
  }
}

.page-item.active .page-link {
  @extend %hover-style;
}

nav {
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px, 10px);
}
</style>