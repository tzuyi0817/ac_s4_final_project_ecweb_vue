<template>
  <div>
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="container-fluid admin_layout">
        <div class="row">
          <div class="navbar col-md-2 col-10 d-flex flex-column">
            <AdminNavbar />
          </div>

          <div class="col-md-9 col-11 bg-light p-1 mt-4 mb-4 ml-3">
            <div class="admin_traceCode col-md-11">
              <form @submit.stop.prevent="handleSubmit">
                <!-- GA追蹤碼 -->
                <div class="card m-3">
                  <div class="card-header">
                    <p class="font-weight-bold d-inline-block" style="color: #0085a5;">GA 追蹤碼</p>
                    <button
                      class="btn btn-select float-right"
                      type="submit"
                      :disabled="isProcessing"
                    >更新</button>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <p>將GA追蹤碼貼在右側空白處即可，輸入"UA-"後方字串</p>
                      </div>
                      <div class="col">
                        <textarea name="trackGA" cols="50" rows="10" v-model="storedata.trackGA"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <!-- FB追蹤碼 -->
              <div class="card m-3">
                <div class="card-header">
                  <p class="font-weight-bold" style="color: #0085a5;">FB 像素</p>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <p>將FB像素，貼在右側空白處即可</p>
                    </div>
                    <div class="col">
                      <textarea name id cols="50" rows="10" disabled>功能開發中</textarea>
                    </div>
                  </div>
                </div>
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
      storedata: {},
      isLoading: true,
      isProcessing: false
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  created() {
    this.fetchAdminTrackCode();
  },
  methods: {
    async fetchAdminTrackCode() {
      try {
        const { data, statusText } = await AdminAPI.getTrackCodePage();

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.storedata = data.storedata;

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "無法取得資料，請稍後再試"
        });
      }
    },
    async handleSubmit() {
      try {
        this.isProcessing = true;

        const { data, statusText } = await AdminAPI.putGaTrackCode({
          storeId: 1,
          trackGA: this.storedata.trackGA
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.isProcessing = false;

        Toast.fire({
          type: "success",
          title: "資料修改成功"
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
  @include respond-and(768px) {
    margin-top: 0px;
    margin-left: -60px;
    margin-bottom: 150px;
  }
}

.btn-select {
  background-color: #0085a5;
  color: white;
  text-align: center;
  &:hover {
    background-color: #0c99bd;
  }
}

.admin_traceCode,
.btn {
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px) {
    font-size: 10px;
  }
}

textarea {
  @include respond-and(768px) {
    width: 200px;
  }
}

.navbar {
  @include respond-and(768px) {
    margin-left: 25px;
  }
}
</style>