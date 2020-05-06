<template>
  <div>
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="admin_layout">
        <div class="admin_layout-box row">
          <div class="navbar col-lg-2 col-12">
            <AdminNavbar />
          </div>

          <div class="col-lg-10 col-12 d-flex flex-column mt-3">
            <div class="productmodel_products mb-5">
              <div class="card">
                <div class="function_bar pt-3 px-3">
                  <div class="filter_btns row">
                    <!-- 顯示商品 -->
                    <div class="dropdown col-12">
                      <button
                        class="btn-select btn-sm dropdown-toggle"
                        id="dropdownMenuLink"
                        data-toggle="dropdown"
                      >顯示: 所有商品</button>

                      <div class="dropdown-menu">
                        <router-link
                          to="/admin/productmodel/product_mange"
                          class="dropdown-item"
                        >所有商品</router-link>
                        <router-link
                          to="/admin/productmodel/product_mange?launched=1"
                          class="dropdown-item"
                        >已上架</router-link>
                        <router-link
                          to="/admin/productmodel/product_mange?launched=0"
                          class="dropdown-item"
                        >已下架</router-link>
                      </div>

                      <!-- 新增商品 -->
                      <router-link
                        class="btn btn-create btn-sm ml-2"
                        to="/admin/productmodel/create"
                      >
                        <i class="fas fa-plus-circle"></i> 增加
                      </router-link>
                    </div>
                  </div>
                </div>

                <!-- 商品清單 -->
                <div class="productsTable mt-3">
                  <div class="products_table">
                    <table class="table">
                      <thead>
                        <tr style="background-color: #0085a5; color: white;">
                          <th scope="col">&nbsp;&nbsp;圖片</th>
                          <th scope="col">商品名稱</th>
                          <th scope="col" class="price">價格</th>
                          <th scope="col" class="count">數量</th>
                          <th scope="col">狀態</th>
                          <th scope="col">操作</th>
                        </tr>
                      </thead>
                      <transition name="fade" mode="out-in">
                        <tbody v-if="show">
                          <AdminProduct
                            v-for="product in shopProducts"
                            :key="product.id"
                            :initial-product="product"
                          />
                        </tbody>
                      </transition>
                    </table>
                  </div>
                </div>
              </div>

              <!-- 分頁標籤 -->
              <AdminProductsPagination
                v-if="totalPage > 1"
                :current-launched="currentLaunched"
                :current-page="currentPage"
                :total-page="totalPage"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import AdminNavbar from "./../components/AdminNavbar";
import AdminProduct from "./../components/AdminProduct";
import AdminProductsPagination from "./../components/AdminProductsPagination";
import AdminAPI from "./../apis/admin";
import Spinner from "./../components/Spinner";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  components: {
    AdminNavbar,
    AdminProduct,
    AdminProductsPagination,
    Spinner
  },
  data() {
    return {
      shopProducts: [],
      shopProductsCount: -1,
      currentLaunched: "",
      currentPage: 1,
      totalPage: -1,
      isLoading: true,
      show: false
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  // 使用 beforeRouteUpdate 方法取得使用者路由變化
  beforeRouteUpdate(to, from, next) {
    const { page, launched } = to.query;
    this.fetchAdminProducts({ page, launched });
    next();
  },
  created() {
    const { page, launched } = this.$route.query;
    this.fetchAdminProducts({ page, launched });
  },
  methods: {
    async fetchAdminProducts({ page = 1, launched = "" }) {
      try {
        this.show = false;
        const { data, statusText } = await AdminAPI.getProductManagePage({
          page,
          launched
        });

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.shopProducts = data.shopProducts;
        this.shopProductsCount = data.shopProductsCount;
        this.currentLaunched = data.launched;
        this.currentPage = data.page;
        this.totalPage = data.totalPage.length;

        this.isLoading = false;
        this.show = true;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "無法取得商品資料，請稍後再試"
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

.productmodel_products {
  padding: 0 0 0 20px;
  @include respond-and(992px) {
    padding: 0;
  }
}

.btn-select {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  background-color: #0085a5;
  color: white;
  text-align: center;
  width: 200px;
  &:hover {
    background-color: #0c99bd;
  }
  &:focus {
    background-color: #0085a5;
    color: white;
  }
}

.btn-create {
  background-color: #0085a5;
  color: white;
  text-align: center;
  &:hover {
    background-color: #0c99bd;
  }
}

.btn-select,
.dropdown-menu,
.btn,
.products_table {
  font-size: 16px;
}

.price,
.count {
  @include respond-and(992px) {
    display: none;
  }
}
</style>