<template>
  <div>
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="row">
        <!-- NavTabs -->
        <div class="nav-box col-md-2">
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
        <!-- 搜尋結果 -->
        <div class="search col-md-9 mb-5">
          <p class="ml-1">
            <i class="far fa-lightbulb mr-2" style="color:#0085a5"></i>
            「{{currentKeyword}}」搜尋到 {{products.length}} 件商品
          </p>
          <!-- 搜尋無結果 -->
          <div v-if="products < 1" class="undefined col-12 mb-5 mt-5" style="text-align: center;">
            <h1>
              <i class="far fa-file-excel" style="color:#0085a5"></i>
            </h1>
            <h5>抱歉，找不到您所查詢的「{{currentKeyword}}」相關商品</h5>
            <div class="help-block mb-5">建議您，檢查輸入字詞是否有誤或使用其他相關的字詞再搜尋</div>
          </div>
          <!-- 搜尋成功 -->
          <div v-else class="row">
            <!-- 排序 -->
            <SearchSort
              :current-keyword="currentKeyword"
              :current-key="currentKey"
              :current-value="currentValue"
            />
            <!-- 商品 -->
            <div class="col-md-11 row">
              <SearchProducts
                v-for="product in products"
                :key="product.id"
                :initial-product="product"
              />
            </div>
          </div>
          <!-- 分頁標籤 RestaurantsPagination -->
          <SearchPagination
            v-if="totalPage > 1"
            :current-keyword="currentKeyword"
            :current-key="currentKey"
            :current-value="currentValue"
            :current-page="currentPage"
            :total-page="totalPage"
          />
        </div>
      </div>
      <!-- 購物車通知 -->
      <CartNotice />
    </template>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs";
import SearchSort from "./../components/SearchSort";
import SearchProducts from "./../components/SearchProducts";
import SearchPagination from "./../components/SearchPagination";
import CartNotice from "./../components/CartNotice";
import Spinner from "./../components/Spinner";
import categoriesAPI from "./../apis/categories";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    NavTabs,
    SearchSort,
    SearchProducts,
    SearchPagination,
    CartNotice,
    Spinner
  },
  data() {
    return {
      categories: [],
      products: [],
      currentKeyword: "",
      currentKey: "",
      currentValue: "",
      currentPage: 1,
      totalPage: -1,
      isLoading: true
    };
  },
  created() {
    const { keyword, key, value, page } = this.$route.query;
    this.fetchSearch({ keyword, key, value, page });
  },
  // 使用 beforeRouteUpdate 方法取得使用者路由變化
  beforeRouteUpdate(to, from, next) {
    const { keyword, key, value, page } = to.query;
    this.fetchSearch({ keyword, key, value, page });
    next();
  },
  methods: {
    async fetchSearch({ keyword, key, value, page }) {
      try {
        const { data, statusText } = await categoriesAPI.getSearch({
          keyword,
          key,
          value,
          page
        });

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.categories = data.categories;
        this.products = data.products;
        this.currentKeyword = data.keyword;
        this.currentKey = data.key;
        this.currentValue = data.value;
        this.currentPage = data.page;
        this.totalPage = data.totalPage.length;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "無法取得搜尋商品資料，請稍後再試"
        });
      }
    }
  }
};
</script>

<style>
.list-group-item,
.row {
  font-family: "DFKai-sb";
}

.list-group-item:hover {
  color: white;
  background-color: #0085a5;
}

@media screen and (min-width: 960px) and (max-width: 1290px) {
  .list-group-item {
    font-size: 15px;
  }

  p,
  .help-block {
    font-size: 15px;
  }

  h1 {
    font-size: 30px;
  }

  h5 {
    font-size: 20px;
  }
}

@media screen and (min-width: 768px) and (max-width: 960px) {
  .list-group-item {
    font-size: 10px;
  }

  p,
  .help-block {
    font-size: 10px;
  }

  h1 {
    font-size: 25px;
  }

  h5 {
    font-size: 15px;
  }
}

@media screen and (max-width: 768px) {
  .nav-box {
    display: none;
  }

  .search {
    margin-top: 20px;
  }

  .undefined {
    margin-left: -25px;
  }

  p,
  .help-block {
    font-size: 15px;
  }

  h1 {
    font-size: 30px;
  }

  h5 {
    font-size: 20px;
  }
}
</style>