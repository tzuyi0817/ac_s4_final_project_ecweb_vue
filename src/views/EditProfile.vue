<template>
  <div class="container">
    <Spinner v-if="isLoading" />
    <template v-else>
      <form @submit.stop.prevent="handleSubmit">
        <div class="row">
          <div class="mug-shot col-md-4">
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

          <div class="col-md-6">
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
            class="btn btn-select col-md-10"
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

.btn-select {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  background-color: #0085a5;
  color: white;
  text-align: center;
  width: 100%;
  margin-left: 60px;
  @include respond-and(768px) {
    margin-left: 0px;
  }
  &:hover {
    background-color: #0c99bd;
  }
}

.mug-shot {
  margin-left: 60px;
  @include respond-and(768px) {
    margin-left: 20px;
    margin-bottom: 10px;
    margin-top: 50px;
  }
}

.row,
.btn,
input {
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px) {
    font-size: 10px;
  }
}

.container {
  @include respond-and(768px) {
    margin-left: -45px;
  }
}
</style>