<template>
  <div>
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="row">
        <div class="search-title col-12 row">
          <router-link to="/">首頁&nbsp;</router-link>
          <h6>&nbsp;&gt;&nbsp;</h6>
          <h6 style="color: black;">搜尋結果</h6>
        </div>

        <!-- NavTabs -->
        <div class="nav-box col-lg-2">
          <div class="card-header">
            <p>全站分類</p>
          </div>

          <ul class="list-group list-group-flush">
            <router-link class="list-group-item list-group-item-action" to="/">首頁</router-link>
            <NavTabs
              v-for="category in categories"
              :key="category.id"
              :initial-category="category"
            />
          </ul>
        </div>
        <!-- 搜尋結果 -->
        <div class="search col-lg-10">
          <p class="ml-3">
            <i class="far fa-lightbulb mr-2" style="color:#0085a5"></i>
            「{{currentKeyword}}」搜尋到 {{products.length}} 件商品
          </p>
          <!-- 搜尋無結果 -->
          <div v-if="products < 1" class="undefined col-12 mt-5" style="text-align: center;">
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
            <transition name="fade" mode="out-in">
              <div v-if="show" class="products-box col-12 row">
                <SearchProducts
                  v-for="product in products"
                  :key="product.id"
                  :initial-product="product"
                />
              </div>
            </transition>
          </div>
          <!-- 分頁標籤 RestaurantsPagination -->
          <transition name="fade" mode="out-in">
            <template v-if="show">
              <SearchPagination
                v-if="totalPage > 1"
                :current-keyword="currentKeyword"
                :current-key="currentKey"
                :current-value="currentValue"
                :current-page="currentPage"
                :total-page="totalPage"
              />
            </template>
          </transition>
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
      isLoading: true,
      show: false
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
        this.show = false;

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
        this.show = true;
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

<style lang="scss" scoped>
@mixin respond-and($upper) {
  @media screen and (max-width: $upper) {
    @content;
  }
}

.nav-box,
.products-box {
  padding: 0;
}

.search {
  @include respond-and(992px) {
    padding: 0;
  }
}

.search-title {
  padding: 20px;
}

h6 {
  color: #918b8b;
  margin-top: 3px;
}

.card-header {
  color: #0085a5;
  border: 1px solid #cfcfcf;
}

.list-group-item {
  font-size: 17px;
  &:hover {
    color: white;
    background-color: #0085a5;
    transition: all 0.3s ease-in-out;
  }
}

.undefined {
  margin-bottom: 300px;
}

.help-block {
  font-size: 16px;
}

.search {
  @include respond-and(992px) {
    margin-top: 30px;
  }
}
</style>