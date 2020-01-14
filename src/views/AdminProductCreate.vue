<template>
  <div>
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="container-fluid admin_layout">
        <div class="row">
          <div class="col-md-2 d-flex flex-column">
            <AdminNavbar />
          </div>

          <div class="col-md-8 bg-light p-1 ml-5">
            <div class="productmodel_editproduct col-12 py-3">
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

                      <div class="row">
                        <div class="col p-5">
                          <img
                            class="d-block img-thumbnail mb-3"
                            v-if="product.image"
                            :src="product.image"
                            alt="產品圖片"
                          />
                          <input
                            type="file"
                            name="images"
                            accept="image/*"
                            class="form-control-file"
                            id="image"
                            @change="handleFileChange"
                          />
                        </div>

                        <div class="col p-5">
                          <img
                            class="d-block img-thumbnail mb-3"
                            v-if="product.imageI"
                            :src="product.imageI"
                            alt="產品圖片"
                          />
                          <input
                            type="file"
                            name="images"
                            accept="image/*"
                            class="form-control-file"
                            id="image"
                            @change="handleFileIChange"
                          />
                        </div>

                        <div class="col p-5">
                          <img
                            class="d-block img-thumbnail mb-3"
                            v-if="product.imageII"
                            :src="product.imageII"
                            alt="產品圖片"
                          />
                          <input
                            type="file"
                            name="images"
                            accept="image/*"
                            class="form-control-file"
                            id="image"
                            @change="handleFileIIChange"
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
                      <input type="hidden" name="StoreId" :value="storeId" id="name" />
                      <div class="product_title form-group">
                        <label for="product_name">商品狀態</label>

                        <select class="form-control" name="launched" id="CategoryId" required>
                          <option value selected disabled>--請選擇--</option>
                          <option value="0">下架</option>
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
                        class="btn btn-primary col-12 mt-3 mb-3"
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
      storeId: -1,
      product: {
        name: "",
        image: "",
        imageI: "",
        imageII: "",
        ProductCategoryId: "",
        description: "",
        price: "",
        count: ""
      },
      isLoading: true,
      isProcessing: false
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  created() {
    this.fetchAdminProductCreate();
  },
  methods: {
    async fetchAdminProductCreate() {
      try {
        const { data, statusText } = await AdminAPI.getProductCreatePage();

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.categories = data.categories;
        this.storeId = data.storeId;

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "無法取得類別資料，請稍後再試"
        });
      }
    },
    handleFileChange(e) {
      const files = e.target.files;
      if (!files.length) return; // 如果沒有檔案則離開此函式
      // 否則產生預覽圖...
      const imageURL = window.URL.createObjectURL(files[0]);
      this.product.image = imageURL;
    },
    handleFileIChange(e) {
      const files = e.target.files;
      if (!files.length) return; // 如果沒有檔案則離開此函式
      // 否則產生預覽圖...
      const imageURL = window.URL.createObjectURL(files[0]);
      this.product.imageI = imageURL;
    },
    handleFileIIChange(e) {
      const files = e.target.files;
      if (!files.length) return; // 如果沒有檔案則離開此函式
      // 否則產生預覽圖...
      const imageURL = window.URL.createObjectURL(files[0]);
      this.product.imageII = imageURL;
    },
    async handleSubmit(e) {
      try {
        this.isProcessing = true;

        const form = e.target; // <form></form>
        const formData = new FormData(form);

        const { data, statusText } = await AdminAPI.postProduct({
          formData
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        Toast.fire({
          type: "success",
          title: "商品新增成功"
        });

        this.isProcessing = false;
        this.$router.push("/admin/productmodel/product_mange");
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "無法新增商品，請稍後再試"
        });
      }
    }
  }
};
</script>

<style scoped>
.container-fluid {
  margin-top: -92px;
  margin-left: -89px;
  font-family: "DFKai-sb";
  width: 115%;
}

a,
p {
  color: #0085a5;
}

a:hover {
  color: #0c99bd;
}

.btn-primary {
  background-color: #0085a5;
}

.btn-primary:hover {
  background-color: #0c99bd;
}

.img-thumbnail {
  height: 230px;
}

@media screen and (min-width: 960px) and (max-width: 1040px) {
  .card,
  select,
  input,
  textarea,
  .btn {
    font-size: 15px;
  }

  .img-thumbnail {
    height: 180px;
  }
}

@media screen and (min-width: 840px) and (max-width: 960px) {
  .card,
  select,
  input,
  textarea,
  .btn {
    font-size: 10px;
  }

  .img-thumbnail {
    height: 130px;
  }
}

@media screen and (max-width: 840px) {
  .container-fluid {
    margin-top: 0px;
    margin-left: -60px;
    margin-bottom: 150px;
  }

  .card {
    margin-left: -55px;
    width: 260px;
  }

  .card,
  select,
  input,
  textarea,
  .btn {
    font-size: 10px;
  }

  .img-thumbnail {
    height: 130px;
  }
}
</style>
