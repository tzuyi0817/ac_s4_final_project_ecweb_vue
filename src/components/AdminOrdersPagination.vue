<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination mt-5 mb-5">
      <!-- 回到上一頁 previousPage -->
      <li v-show="previousPage" class="page-item">
        <router-link
          class="page-link"
          aria-label="Previous"
          style="color: #0085a5;"
          :to="{name: 'AdminOrders', query: { orderstatusid: currentOrderStatusId, 
          paymentstatusid: currentPaymentStatusId, 
          shipmentstatusid: currentShipmentStatusId, 
          page: previousPage }}"
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
          :to="{name: 'AdminOrders', query: { orderstatusid: currentOrderStatusId, 
          paymentstatusid: currentPaymentStatusId, 
          shipmentstatusid: currentShipmentStatusId, 
          page }}"
        >{{ page }}</router-link>
      </li>

      <!-- 前往下一頁 nextPage -->
      <li v-show="nextPage" class="page-item">
        <router-link
          class="page-link"
          style="color: #0085a5;"
          :to="{name: 'AdminOrders', query: { orderstatusid: currentOrderStatusId, 
          paymentstatusid: currentPaymentStatusId, 
          shipmentstatusid: currentShipmentStatusId, 
          page: nextPage }}"
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
    currentOrderStatusId: {
      type: String,
      default: ""
    },
    currentPaymentStatusId: {
      type: String,
      default: ""
    },
    currentShipmentStatusId: {
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
</style>