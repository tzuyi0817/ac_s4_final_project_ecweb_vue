<template>
  <div>
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="admin_layout">
        <div class="admin_layout-box row">
          <div class="navbar col-lg-2 col-12">
            <AdminNavbar />
          </div>

          <div class="editproduct col-lg-10 col-12 mt-2">
            <div class="productmodel_editproduct col-12 bg-light">
              <!-- 商品編輯表單 -->
              <form @submit.stop.prevent="handleSubmit">
                <div class="card">
                  <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                      <li class="nav-item">
                        <a
                          class="nav-link active"
                          href="#productImg"
                          data-toggle="tab"
                          role="tab"
                        >主要圖片</a>
                      </li>

                      <li class="nav-item">
                        <a class="nav-link" href="#productDetail" data-toggle="tab" role="tab">商品資訊</a>
                      </li>

                      <li class="nav-item">
                        <a
                          class="nav-link"
                          href="#productMountPrice"
                          data-toggle="tab"
                          role="tab"
                        >價格與庫存數</a>
                      </li>
                    </ul>
                  </div>

                  <div class="card-body tab-content">
                    <!-- 商品照片 -->
                    <div id="productImg" class="tab-pane fade show active" role="tabpanel">
                      <p>商品主要圖片</p>
                      <hr />

                      <div class="images-box row">
                        <div class="image-box col">
                          <img
                            class="d-block img-thumbnail mb-3"
                            v-if="product.image"
                            :src="product.image"
                            alt="產品圖片"
                          />
                        </div>

                        <div class="image-box col">
                          <img
                            class="d-block img-thumbnail mb-3"
                            v-if="product.imageI"
                            :src="product.imageI"
                            alt="產品圖片"
                          />
                        </div>

                        <div class="image-box col">
                          <img
                            class="d-block img-thumbnail mb-3"
                            v-if="product.imageII"
                            :src="product.imageII"
                            alt="產品圖片"
                          />
                        </div>
                      </div>
                      <hr />
                      <!-- 照片預覽區 -->
                      <div class="img_preview"></div>
                    </div>

                    <!-- 編輯商品 -->
                    <div id="productDetail" class="tab-pane fade" role="tabpanel">
                      <p>商品資訊</p>
                      <hr />
                      <div class="product_title form-group">
                        <label for="product_name">商品狀態</label>

                        <select
                          v-if="product.launched"
                          class="form-control"
                          name="launched"
                          id="CategoryId"
                          required
                        >
                          <option value selected disabled>--請選擇--</option>
                          <option value="0">下架</option>
                          <option value="1" selected="1">上架</option>
                        </select>

                        <select v-else class="form-control" name="launched" id="CategoryId">
                          <option value selected disabled>--請選擇--</option>
                          <option value="0" selected="0">下架</option>
                          <option value="1">上架</option>
                        </select>
                      </div>

                      <div class="product_title form-group">
                        <label for="product_name">商品類別</label>
                        <select
                          class="form-control"
                          v-model="product.ProductCategoryId"
                          name="ProductCategoryId"
                          id="ProductCategoryId"
                          required
                        >
                          <option value selected disabled>--請選擇--</option>
                          <option
                            v-for="category in categories"
                            :key="category.id"
                            :value="category.id"
                          >{{category.name}}</option>
                        </select>
                      </div>

                      <div class="product_title form-group">
                        <label for="product_name">商品名稱</label>
                        <input
                          type="text"
                          class="form-control"
                          name="name"
                          id="name"
                          v-model="product.name"
                        />
                      </div>

                      <div class="product_description form-group">
                        <label for="product_description">商品描述</label>
                        <textarea
                          class="form-control"
                          name="description"
                          v-model="product.description"
                          id="description"
                          cols="30"
                          rows="5"
                        ></textarea>
                      </div>
                    </div>

                    <!-- 商品庫存數和價格 -->
                    <div id="productMountPrice" class="tab-pane fade" role="tabpanel">
                      <p>價格和庫存數</p>
                      <hr />
                      <!-- 商品價格 -->
                      <div class="form-group price">
                        <label for>價格</label>
                        <input
                          class="form-control"
                          v-model="product.price"
                          name="price"
                          type="text"
                        />
                      </div>

                      <!-- 商品庫存數 -->
                      <div class="form-group product_amount">
                        <label for>數量</label>
                        <input
                          class="form-control"
                          v-model="product.count"
                          name="count"
                          type="text"
                        />
                      </div>

                      <button
                        type="submit"
                        class="btn btn-success col-12 mt-3 mb-3"
                        :disabled="isProcessing"
                      >{{ isProcessing ? "處理中..." : "送出" }}</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import AdminNavbar from "./../components/AdminNavbar";
import AdminAPI from "./../apis/admin";
import Spinner from "./../components/Spinner";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  components: {
    AdminNavbar,
    Spinner
  },
  data() {
    return {
      categories: [],
      product: {},
      isLoading: true,
      isProcessing: false
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  // 使用 beforeRouteUpdate 方法取得使用者路由變化
  beforeRouteUpdate(to, from, next) {
    const { id: productId } = to.params;
    this.fetchAdminProduct({ productId });
    next();
  },
  created() {
    const { id: productId } = this.$route.params;
    this.fetchAdminProduct({ productId });
  },
  methods: {
    async fetchAdminProduct({ productId }) {
      try {
        const { data, statusText } = await AdminAPI.getProduct({
          productId
        });

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.product = data.product;
        this.categories = data.categories;

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "無法取得商品資料，請稍後再試"
        });
      }
    },
    async handleSubmit(e) {
      try {
        this.isProcessing = true;

        const form = e.target; // <form></form>
        const formData = new FormData(form);

        const { data, statusText } = await AdminAPI.putProduct({
          productId: this.product.id,
          formData
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        Toast.fire({
          type: "success",
          title: "資料修改成功"
        });

        this.isProcessing = false;
        this.$router.push("/admin/productmodel/product_mange");
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          type: "error",
          title: "無法修改資料，請稍後再試"
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

.editproduct {
  padding-left: 20px;
  margin-bottom: 60px;
  @include respond-and(992px) {
    padding: 0 15px;
  }
}

.productmodel_editproduct {
  padding: 35px 15px;
}

.images-box {
  display: flex;
  @include respond-and(768px) {
    flex-direction: column;
  }
}

.image-box {
  padding: 60px 15px;
}

.nav-link {
  @include respond-and(576px) {
    padding: 10px;
  }
}

a,
p {
  color: #0085a5;
}

a:hover {
  color: #0c99bd;
}

.card,
select,
input,
textarea,
.btn {
  font-size: 16px;
}
</style>

