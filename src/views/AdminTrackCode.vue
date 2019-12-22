<template>
  <div>
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="container-fluid admin_layout">
        <div class="row">
          <div class="col-2 d-flex flex-column">
            <AdminNavbar />
          </div>

          <div class="col-9 bg-light p-1 mt-4 mb-4 ml-3">
            <div class="admin_traceCode col-11">
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

<style scoped>
.container-fluid {
  margin-top: -92px;
  margin-left: -89px;
  font-family: "DFKai-sb";
  width: 115%;
}

.btn-select {
  background-color: #0085a5;
  color: white;
  text-align: center;
}

.btn-select:hover {
  background-color: #0c99bd;
}
</style>