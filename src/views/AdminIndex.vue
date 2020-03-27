<template>
  <div>
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="container-fluid admin_layout">
        <div class="row">
          <div class="navbar col-md-2 col-10 d-flex flex-column">
            <AdminNavbar />
          </div>

          <div class="col-md-9 col-11 d-flex flex-column bg-light p-1">
            <div class="row admin_fuctionBlock vh-100">
              <div class="col-12 indexmodel_storeinfo px-5">
                <form @submit.stop.prevent="handleSubmit">
                  <div class="row storeinfo_form py-4 my-5">
                    <!-- 商店logo -->
                    <div class="col-md-6 text-center">
                      <div class="logo">
                        <p>&nbsp;</p>
                        <p class="navbar-title mt-3">MuseClub</p>
                      </div>
                    </div>
                    <!-- 商店類別和名稱 -->
                    <div class="col-md-6 form-group mb-5">
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

.container-fluid {
  margin-top: -92px;
  margin-left: -89px;
  width: 115%;
  margin-bottom: 60px;
  @include respond-and(768px) {
    margin-top: 0px;
    margin-left: -60px;
    margin-bottom: 150px;
  }
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
  &:hover {
    background-color: #0c99bd;
  }
}

.logo {
  background-color: #d2f0f5;
  height: 150px;
  width: 300px;
  border-radius: 100px;
  margin-left: 60px;
  @media screen and (min-width: 960px) and (max-width: 1100px) {
    height: 110px;
    width: 200px;
  }
  @media screen and (min-width: 768px) and (max-width: 960px) {
    height: 90px;
    width: 150px;
  }
  @include respond-and(768px) {
    height: 110px;
    width: 200px;
    margin-left: 0px;
    margin-bottom: 20px;
  }
}

.row,
input,
textarea,
.navbar-title,
.btn {
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px) {
    font-size: 15px;
  }
}

.navbar {
  @include respond-and(768px) {
    margin-left: 25px;
  }
}
</style>