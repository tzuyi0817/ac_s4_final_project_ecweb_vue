<template>
  <div>
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="container-fluid admin_layout mb-5">
        <div class="row">
          <div class="col-2 d-flex flex-column">
            <AdminNavbar />
          </div>

          <div class="col-9 d-flex flex-column bg-light p-1">
            <div class="row admin_fuctionBlock vh-100">
              <div class="col-12 indexmodel_storeinfo px-5">
                <form @submit.stop.prevent="handleSubmit">
                  <div class="row storeinfo_form py-4 my-5">
                    <!-- 商店logo -->
                    <div class="col-6 text-center">
                      <div class="logo ml-5">
                        <p>&nbsp;</p>
                        <p class="navbar-title mt-3">MuseClub</p>
                      </div>
                    </div>
                    <!-- 商店類別和名稱 -->
                    <div class="col-6 form-group mb-5">
                      <label for="storecategory">商店類別</label>
                      <input
                        v-model="storeData.Store_category.name"
                        type="text"
                        id="storecategory"
                        class="form-control mb-2"
                        disabled
                      />

                      <label for="storeName">商店名稱</label>
                      <input
                        v-model="storeData.name"
                        type="text"
                        name="name"
                        id="storeName"
                        class="form-control"
                        :disabled="isDisable"
                      />
                    </div>
                    <!-- 商店描述 -->
                    <div class="col-12 form-group">
                      <textarea
                        v-model="storeData.description"
                        class="form-control"
                        name="description"
                        cols="60"
                        rows="7"
                        :disabled="isDisable"
                      ></textarea>

                      <button
                        v-if="isDisable"
                        class="btn btn-select mt-3"
                        @click.stop.prevent="toUpdate()"
                      >編輯</button>

                      <button
                        v-else
                        class="btn btn-select mt-3"
                        type="submit"
                        :disabled="isProcessing"
                      >更新</button>
                    </div>
                  </div>
                </form>
              </div>
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
      storeData: {},
      isDisable: true,
      isLoading: false,
      isProcessing: false
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  created() {
    this.fetchIndex();
  },
  methods: {
    async fetchIndex() {
      try {
        this.isLoading = true;

        const { data, statusText } = await AdminAPI.getIndex();

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.storeData = data.storeData;

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "無法取得店家基本資料，請稍後再試"
        });
      }
    },
    toUpdate() {
      this.isDisable = false;
    },
    async handleSubmit() {
      try {
        this.isProcessing = true;

        const { data, statusText } = await AdminAPI.putStoreInfo({
          name: this.storeData.name,
          description: this.storeData.description
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.isProcessing = false;
        this.isDisable = true;

        Toast.fire({
          type: "success",
          title: "基本資料已修改成功"
        });
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

<style scoped>
.container-fluid {
  margin-top: -92px;
  margin-left: -89px;
  font-family: "DFKai-sb";
  width: 115%;
}

.navbar-title {
  font-family: "Pacifico", cursive;
  font-size: 25px;
  color: #0085a5;
}

.btn-select {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  background-color: #0085a5;
  color: white;
  text-align: center;
  width: 100%;
}

.btn-select:hover {
  background-color: #0c99bd;
}

.logo {
  background-color: #d2f0f5;
  height: 150px;
  width: 300px;
  border-radius: 100px;
}

@media screen and (min-width: 960px) and (max-width: 1040px) {
  .row,
  input,
  textarea,
  .navbar-title,
  .btn {
    font-size: 15px;
  }

  .logo {
    height: 110px;
    width: 200px;
  }
}

@media screen and (min-width: 840px) and (max-width: 960px) {
  .row,
  input,
  textarea,
  .navbar-title,
  .btn {
    font-size: 10px;
  }

  .logo {
    height: 90px;
    width: 150px;
  }
}
</style>