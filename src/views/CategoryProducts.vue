<template>
  <div class="mb-5">
    <Spinner v-if="isLoading" />
    <template v-else>
      <!-- 類別圖片 -->
      <div class="index col-12">
        <transition name="fade" mode="out-in">
          <img v-if="show" :src="category.image" alt="image" />
        </transition>
      </div>

      <div class="index-title col-12 row">
        <router-link to="/">首頁&nbsp;</router-link>
        <h6>&nbsp;&gt;&nbsp;</h6>
        <router-link
          :to="{ name: 'category-products', params: { id: category.id }}"
          class="index-title-name"
        >&nbsp;{{category.name}}</router-link>
      </div>

      <section id="pagination"></section>

      <!-- NavTabs -->
      <div class="row">
        <div class="card col-lg-2">
          <div class="card-header">
            <p>全站分類</p>
          </div>

          <ul class="list-group list-group-flush">
            <router-link class="list-group-item list-group-item-action" to="/">首頁</router-link>
            <NavTabs
              v-for="category in categories"
              :key="category.id"
              :initial-category="category"
              :category-id="categoryId"
            />
          </ul>
        </div>

        <div class="sort-box col-lg-10">
          <!-- 類別名稱 -->
          <div class="title col-12">
            <h4 style="color:#0085a5">{{category.name}}</h4>
          </div>
          <!-- 排序 -->
          <div class="sort col-12">
            <Sort :current-key="currentKey" :current-value="currentValue" />
          </div>

          <div class="all-products-box row col-12">
            <!-- 商品 -->
            <div class="all-products col-12">
              <transition name="fade" mode="out-in">
                <div v-if="show" class="row">
                  <Products
                    v-for="product in products"
                    :key="product.id"
                    :initial-product="product"
                    :category="category"
                  />
                </div>
              </transition>
            </div>
          </div>

          <!-- 分頁標籤 RestaurantsPagination -->
          <transition name="fade" mode="out-in">
            <template v-if="show">
              <ProductsPagination
                v-if="totalPage > 1"
                :current-key="currentKey"
                :current-value="currentValue"
                :current-page="currentPage"
                :total-page="totalPage"
              />
            </template>
          </transition>
        </div>
      </div>

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
      isLoading: true,
      show: false
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
        this.show = false;
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
        this.show = true;
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
@mixin respond-and($upper) {
  @media screen and (max-width: $upper) {
    @content;
  }
}

.list-group-item {
  font-size: 17px;
  &:hover {
    color: white;
    background-color: #0085a5;
    transition: all 0.3s ease-in-out;
  }
}

.card {
  padding: 0;
  border: none;
}

.card-header {
  color: #0085a5;
  border: 1px solid #cfcfcf;
}

.no-products {
  padding: 75px;
}

.nav {
  @include respond-and(768px) {
    margin-top: 30px;
  }
}

.index {
  padding: 0;
  img {
    width: 100%;
    height: 55vh;
  }
}

.index-title {
  padding: 20px;
}

h6 {
  color: #918b8b;
  margin-top: 3px;
}

.index-title-name {
  color: rgb(112, 109, 109);
  &:hover {
    transition: all 0.3s ease-in-out;
    color: #0085a5;
    cursor: pointer;
  }
}

.title {
  text-align: center;
  @include respond-and(992px) {
    margin-top: 30px;
  }
}

.sort {
  padding: 20px 0;
}

.sort-box {
  @include respond-and(992px) {
    padding: 0;
  }
}

.all-products-box,
.all-products {
  padding: 0;
}
</style>