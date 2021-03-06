<template>
  <div class="container mb-5">
    <Spinner v-if="isLoading" />
    <template v-else>
      <form @submit.stop.prevent="handleSubmit">
        <div class="edit-user-box row">
          <div class="mug-shot col-lg-5">
            <div class="form-group">
              <img
                v-if="user.image"
                :src="user.image"
                class="d-block img-thumbnail mb-3"
                alt="img"
                width="200"
                height="200"
              />

              <input
                type="file"
                class="form-control-file"
                id="image"
                name="image"
                accept="image/*"
                @change="handleFileChange"
              />
            </div>
          </div>

          <div class="user-info-box col-lg-7">
            <div class="form_group row">
              <label class="col-2">名字:</label>
              <div class="col-10">
                <input v-model="user.name" type="text" class="form-control" name="name" required />
              </div>
            </div>

            <div class="form-group row mt-4">
              <label class="col-2">email:</label>
              <div class="col-10">
                <input v-model="user.email" type="email" class="form-control" name="email" required />
              </div>
            </div>

            <div class="form-group row mt-4">
              <label class="col-2">地址:</label>
              <div class="col-10">
                <input
                  v-model="user.address"
                  type="address"
                  class="form-control"
                  name="address"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div class="form-group d-flex justify-content-between mt-4 mb-5">
          <button
            type="submit"
            class="btn btn-success col-12"
            :disabled="isProcessing"
          >{{ isProcessing ? "處理中..." : "儲存" }}</button>
        </div>
      </form>
    </template>
  </div>
</template>

<script>
import userAPI from "./../apis/users";
import Spinner from "./../components/Spinner";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  components: {
    Spinner
  },
  data() {
    return {
      user: {
        image: ""
      },
      isLoading: false,
      isProcessing: false
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  // 使用 beforeRouteUpdate 方法取得使用者路由變化
  beforeRouteUpdate(to, from, next) {
    const { id: userId } = to.params;
    this.fetchUser({ userId });
    next();
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchUser({ userId });
  },
  methods: {
    async fetchUser({ userId }) {
      try {
        this.isLoading = true;

        const { data, statusText } = await userAPI.getUserProfileEdit({
          userId
        });

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.user = data.user;

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "無法取得使用者資料，請稍後再試"
        });
      }
    },
    handleFileChange(e) {
      const files = e.target.files;
      if (!files.length) return; // 如果沒有檔案則離開此函式
      // 否則產生預覽圖...
      const imageURL = window.URL.createObjectURL(files[0]);
      this.user.image = imageURL;
    },
    async handleSubmit(e) {
      try {
        this.isProcessing = true;

        const form = e.target; // <form></form>
        const formData = new FormData(form);

        const { data, statusText } = await userAPI.postUserProfile({
          userId: this.user.id,
          formData
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.$router.push({
          name: "UserProfile",
          params: { id: this.user.id }
        });

        Toast.fire({
          type: "success",
          title: "資料修改成功"
        });

        this.isProcessing = false;
      } catch (error) {
        this.isLoading = false;
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

.edit-user-box {
  padding: 30px 0 10px 0;
}

.row,
.btn,
input {
  font-size: 16px;
}

.col-2 {
  padding: 5px 0;
}

.col-10 {
  padding: 0;
}

.user-info-box {
  @include respond-and(992px) {
    margin-top: 20px;
  }
}
</style>