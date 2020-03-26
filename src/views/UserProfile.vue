<template>
  <div class="container">
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="row">
        <div class="title col-md-4">
          <div class="mb-4">
            <h2 style="text-align:center">個人資料</h2>
          </div>

          <div class="card mb-5">
            <img class="round" :src="profile.image" alt="img" />
            <h3 class="mt-4">{{profile.name}}</h3>
            <p class="email mt-2">{{profile.email}}</p>
            <p>{{profile.address}}</p>
            <p>
              <span style="color: red;">{{orders.length}}</span> 筆購物紀錄
            </p>
            <router-link
              v-if="profile.id === currentUser.id"
              :to="{name: 'EditProfile', params: { id: profile.id }}"
              class="btn btn-select mt-2"
            >編輯個人資料</router-link>
          </div>
        </div>

        <div class="col-md-8">
          <div class="mb-4">
            <h2 style="text-align:center">購物記錄</h2>
          </div>
          <!-- 訂單詳情 -->
          <OrdersDetails v-for="order in orders" :key="order.id" :initial-order="order" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import OrdersDetails from "./../components/OrdersDetails";
import userAPI from "./../apis/users";
import Spinner from "./../components/Spinner";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  components: {
    OrdersDetails,
    Spinner
  },
  data() {
    return {
      profile: {},
      orders: [],
      isLoading: false
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

        const { data, statusText } = await userAPI.getUserProfile({ userId });

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.profile = data.profile;
        this.orders = data.orderInfo;

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "無法取得使用者資料，請稍後再試"
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

@mixin respond-and($upper, $font-size) {
  @media screen and (max-width: $upper) {
    font-size: $font-size;
  }
}

.card {
  align-items: center;
  background-color: #d2f0f5;
  border-radius: 5px;
  box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.75);
  color: #0085a5;
  padding-top: 30px;
  position: relative;
  width: 350px;
  max-width: 100%;
  text-align: center;
}

.round {
  border-radius: 50%;
  padding: 7px;
  width: 45%;
  border-radius: 50%;
  padding: 7px;
  border: 1px solid #0085a5;
}

h3 {
  margin: 10px 0;
  @include respond-between(960px, 1100px, 20px);
  @include respond-between(768px, 960px, 15px);
  @include respond-and(768px, 15px);
}

.email {
  color: grey;
  font-size: 18px;
  @include respond-between(960px, 1100px, 13px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px, 10px);
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

h2 {
  @include respond-between(960px, 1100px, 25px);
  @include respond-between(768px, 960px, 20px);
  @include respond-and(768px, 20px);
}

.row,
.btn {
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px, 10px);
}

.container {
  @media screen and (max-width: 768px) {
    margin-left: -45px;
  }
}

.title {
  @media screen and (max-width: 768px) {
    margin-top: 50px;
  }
}
</style>