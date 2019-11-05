<template>
  <div class="mb-5">
    <!-- NavTabs -->
    <div class="row mt-5">
      <div class="col-2">
        <div class="nav flex-column">
          <div class="list-group">
            <router-link class="list-group-item list-group-item-action" to="/">首頁</router-link>
          </div>
          <NavTabs
            v-for="category in categories"
            :key="category.id"
            :initial-category="category"
            :category-id="categoryId"
          />
        </div>
      </div>
      <!-- 類別圖片 -->
      <div class="col-1"></div>
      <div class="index col-8">
        <img :src="category.image" class="h-75 w-75" alt="image" />
      </div>
    </div>

    <div class="row col-auto mt-3">
      <!-- 類別名稱 -->
      <div class="col-2 ml-5">
        <h3 style="color:#0085a5">{{category.name}}</h3>
      </div>
      <!-- 排序 -->
      <div class="col-7">
        <Sort :current-key="currentKey" :current-value="currentValue" />
      </div>
    </div>

    <div class="row mt-5 mb-5">
      <!-- 商品 -->
      <div class="col-2"></div>
      <div class="ml-5 col-7">
        <div class="row">
          <Products
            v-for="product in products"
            :key="product.id"
            :initial-product="product"
            :category="category"
          />
        </div>
      </div>
    </div>
    <!-- 分頁標籤 RestaurantsPagination -->
    <ProductsPagination
      v-if="totalPage > 1"
      :current-key="currentKey"
      :current-value="currentValue"
      :current-page="currentPage"
      :total-page="totalPage"
    />

    <div class="mt-5" style="text-align: center;" v-if="products.length < 1">此類別暫時無商品資料</div>
    <!-- 購物車通知 -->
    <CartNotice />
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs";
import Sort from "./../components/Sort";
import Products from "./../components/Products";
import ProductsPagination from "./../components/ProductsPagination";
import CartNotice from "./../components/CartNotice";
import categoriesAPI from "./../apis/categories";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    NavTabs,
    Sort,
    Products,
    ProductsPagination,
    CartNotice
  },
  data() {
    return {
      categories: [],
      products: [],
      category: {
        id: -1,
        name: "",
        image: ""
      },
      categoryId: -1,
      currentPage: 1,
      totalPage: -1,
      currentKey: "",
      currentValue: ""
    };
  },
  created() {
    const { id: categoryId } = this.$route.params;
    const { key, value, page } = this.$route.query;
    this.fetchCategories({ categoryId, key, value, page });
  },
  // 使用 beforeRouteUpdate 方法取得使用者路由變化
  beforeRouteUpdate(to, from, next) {
    const { id: categoryId } = to.params;
    const { key, value, page } = to.query;
    this.fetchCategories({ categoryId, key, value, page });
    next();
  },
  methods: {
    async fetchCategories({ categoryId, key, value, page }) {
      try {
        const { data, statusText } = await categoriesAPI.getCategory({
          categoryId,
          key,
          value,
          page
        });

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.categories = data.categories;
        this.products = data.products;
        this.category = {
          id: data.category.id,
          name: data.category.name,
          image: data.category.image
        };
        this.categoryId = data.categoryId;
        this.currentKey = data.key;
        this.currentValue = data.value;
        this.currentPage = data.page;
        this.totalPage = data.totalPage.length;
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法取得類別商品資料，請稍後再試"
        });
      }
    }
  }
};
</script>

<style scoped>
.list-group-item,
h3 {
  font-family: "DFKai-sb";
}

.list-group-item:hover {
  color: white;
  background-color: #0085a5;
}
</style>