<template>
  <div>
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="admin_layout">
        <div class="admin_layout-box row">
          <div class="navbar col-lg-2 col-12">
            <AdminNavbar />
          </div>

          <div class="col-lg-10 col-12 d-flex flex-column p-2">
            <div class="row admin_fuctionBlock mb-5 bg-light">
              <div class="col-12 indexmodel_storeinfo">
                <form @submit.stop.prevent="handleSubmit">
                  <div class="row storeinfo_form py-4">
                    <!-- 商店logo -->
                    <div class="logo-box col-lg-6">
                      <div class="logo">
                        <p>&nbsp;</p>
                        <h4 class="navbar-title">MuseClub</h4>
                      </div>
                    </div>
                    <!-- 商店類別和名稱 -->
                    <div class="col-lg-6 form-group mb-5">
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
                    <div class="store-description col-12 form-group">
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
                        class="btn btn-success mt-3 col-12"
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

<style lang="scss" scoped>
@mixin respond-and($upper) {
  @media screen and (max-width: $upper) {
    @content;
  }
}

.logo-box {
  display: flex;
  justify-content: center;
  @include respond-and(992px) {
    margin-bottom: 20px;
  }
}

.indexmodel_storeinfo {
  @include respond-and(992px) {
    padding: 0;
  }
}

.navbar-title {
  font-family: "Pacifico", cursive;
  color: #0085a5;
}

.logo {
  background-color: #d2f0f5;
  height: 24vh;
  width: 24vw;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  @include respond-and(992px) {
    height: 30vh;
    width: 90vw;
    border-radius: 20px;
  }
}

.row,
input,
textarea,
.btn {
  font-size: 16px;
}

textarea {
  padding: 20px;
}
</style>