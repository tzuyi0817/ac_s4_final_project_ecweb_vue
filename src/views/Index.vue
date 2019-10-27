<template>
  <div>
    <IndexTitle />
    <!-- NavTabs -->
    <div class="row mt-5">
      <div class="col-2">
        <div class="nav flex-column">
          <div class="list-group">
            <router-link class="list-group-item list-group-item-action active" to="/">首頁</router-link>
          </div>

          <NavTabs v-for="category in categories" :key="category.id" :initial-category="category" />
        </div>
      </div>
      <!-- 首頁圖片 -->
      <div class="index col-10 mb-3">
        <img
          src="http://www.hollandi.com/food-bakery/images/bakery-supplies/bread.jpg"
          width="80%"
          height="80%"
          alt="image"
        />
      </div>
    </div>
    <!-- 網站簡介和商品類別 -->
    <div class="row">
      <div class="col-2"></div>
      <!-- 網站簡介 -->
      <div class="col-10">
        <div class="row d-flex ml-1 mb-5">
          <p class="content">
            MuseClub是一間實體結合線上的餐酒館，
            <br />在線上，我們提供你，南美莊園原豆、法國酒莊葡萄酒
            <br />與台灣本地小農食材；在實體概念店，我們用我們的食
            <br />材做成精美的料理，並每周舉辦料理工作坊將異國的食
            <br />材，與自己做料理，成為你的生活風格
          </p>
        </div>
        <!-- 商品類別 -->
        <div class="row mb-5">
          <IndexCategories
            v-for="category in categories"
            :key="category.id"
            :initial-category="category"
          />
        </div>
      </div>
    </div>
    <!-- 購物車通知 -->
    <CartNotice />
  </div>
</template>

<script>
import IndexTitle from "./../components/IndexTitle";
import NavTabs from "./../components/NavTabs";
import IndexCategories from "./../components/IndexCategories";
import CartNotice from "./../components/CartNotice";
import categoriesAPI from "./../apis/categories";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    IndexTitle,
    NavTabs,
    IndexCategories,
    CartNotice
  },
  data() {
    return {
      categories: []
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const { data, statusText } = await categoriesAPI.getCategories();

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.categories = data.categories;
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法取得類別資料，請稍後再試"
        });
      }
    }
  }
};
</script>

<style scoped>
.list-group-item {
  background-color: #0085a5;
  font-family: "DFKai-sb";
}

.content {
  font-size: 30px;
  font-family: "DFKai-sb";
}
</style>