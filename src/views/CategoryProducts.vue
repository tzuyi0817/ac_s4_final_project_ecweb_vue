<template>
  <div class="mb-5">
    <Spinner v-if="isLoading" />
    <template v-else>
      <!-- NavTabs -->
      <div class="row mt-5">
        <div class="col-lg-2 col-md-3 col-sm-9 col-9 mb-2">
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
        <div class="col-md-1"></div>
        <div class="index col-lg-8 col-md-7">
          <img :src="category.image" width="75%" height="75%" alt="image" />
        </div>
      </div>

      <section id="pagination"></section>

      <div class="row mt-2">
        <!-- 類別名稱 -->
        <div class="title col-md-2">
          <h4 style="color:#0085a5">{{category.name}}</h4>
        </div>
        <!-- 排序 -->
        <div class="col-md-8 col-10">
          <Sort :current-key="currentKey" :current-value="currentValue" />
        </div>
      </div>

      <div class="row mt-5 mb-5">
        <!-- 商品 -->
        <div class="col-md-2"></div>
        <div class="all-products col-md-7 col-10">
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

      <div
        class="no-products mt-5"
        style="text-align: center;"
        v-if="products.length < 1"
      >此類別暫時無商品資料</div>
      <!-- 購物車通知 -->
      <CartNotice />
    </template>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs";
import Sort from "./../components/Sort";
import Products from "./../components/Products";
import ProductsPagination from "./../components/ProductsPagination";
import CartNotice from "./../components/CartNotice";
import Spinner from "./../components/Spinner";
import categoriesAPI from "./../apis/categories";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    NavTabs,
    Sort,
    Products,
    ProductsPagination,
    CartNotice,
    Spinner
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
      currentValue: "",
      isLoading: true
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
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "無法取得類別商品資料，請稍後再試"
        });
      }
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

@mixin respond-and($upper) {
  @media screen and (max-width: $upper) {
    @content;
  }
}

.list-group-item {
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px) {
    font-size: 15px;
  }
  &:hover {
    color: white;
    background-color: #0085a5;
  }
}

h4 {
  @include respond-between(960px, 1100px, 20px);
  @include respond-between(768px, 960px, 15px);
  @include respond-and(768px) {
    font-size: 15px;
  }
}

.no-products {
  padding: 75px;
}

.title {
  margin-left: 20px;
  @include respond-and(768px) {
    display: none;
  }
}

.all-products {
  margin-left: 65px;
  @media screen and (min-width: 960px) and (max-width: 1100px) {
    margin-left: 50px;
  }
  @media screen and (min-width: 768px) and (max-width: 960px) {
    margin-left: 35px;
  }
  @include respond-and(768px) {
    margin-left: -10px;
  }
}

.index {
  @include respond-and(768px) {
    margin-top: 20px;
  }
}

.nav {
  @include respond-and(768px) {
    margin-top: 30px;
  }
}
</style>