<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination mt-5">
      <!-- 回到上一頁 previousPage -->
      <li v-show="previousPage" class="page-item">
        <router-link
          class="page-link"
          aria-label="Previous"
          style="color: #0085a5;"
          :to="{name: 'product', query: { page: previousPage }, hash: '#evaluation'}"
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
          :to="{name: 'product', query: { page }, hash: '#evaluation'}"
        >{{ page }}</router-link>
      </li>

      <!-- 前往下一頁 nextPage -->
      <li v-show="nextPage" class="page-item">
        <router-link
          class="page-link"
          style="color: #0085a5;"
          :to="{name: 'product', query: { page: nextPage }, hash: '#evaluation'}"
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

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.page-link {
  color: #0085a5;
  height: 37px;
  padding: 7px 20px;
}

.page-link span {
  color: #0085a5;
}

.page-link:hover,
.page-link:hover span {
  color: white;
  background-color: #0085a5;
}

.page-link:active {
  background-color: #0085a5;
}

.page-item.active .page-link {
  color: white;
  background-color: #0085a5;
}

@media screen and (max-width: 1040px) {
  nav {
    font-size: 15px;
  }
}
</style>