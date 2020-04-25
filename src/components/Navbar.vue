<template>
  <div>
    <nav class="navbar navbar-expand-lg fixed-top navbar-light" style="display:flex;">
      <div class="container">
        <div class="navber-title-box col-lg-3 col-6">
          <router-link class="navbar-title btn" to="/">MuseClub . 繆斯</router-link>
        </div>

        <!-- search -->
        <div class="nav-search-box col-6">
          <form @submit.prevent="handleSearch(keyword)" class="keyword">
            <div class="input-group">
              <input
                class="form-control form-control-inline"
                type="text"
                id="keyword"
                v-model="keyword"
                name="keyword"
                placeholder="請輸入 商品 關鍵字"
                aria-label="Search"
              />
              <div class="input-group-append">
                <button class="input-group-text searchBtn lighten-3" type="submit">
                  <i class="fas fa-search text-grey" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </form>
        </div>

        <!-- icon-lg -->
        <div class="icon-lg">
          <router-link to="/cart" class="nav-logo btn">
            <i class="fa fa-shopping-cart mr-1" aria-hidden="true"></i>
            <div v-if="cartItemNumber" class="badge badge-warning">{{cartItemNumber}}</div>
          </router-link>

          <i class="fa fa-search nav-logo btn" @click.prevent.stop="checked"></i>
        </div>

        <!-- sidebar -->
        <div class="toggler">
          <b-button
            v-b-toggle.sidebar-right
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            @click.prevent.stop
          >
            <i class="fa fa-bars" aria-hidden="true"></i>
          </b-button>

          <b-sidebar id="sidebar-right" title="會員管理" right shadow>
            <div class="sidebar-text px-3 py-2">
              <!-- profile -->
              <div class="user-sidebar" v-if="isAuthenticated">
                <router-link
                  :to="{name: 'UserProfile', params: { id: currentUser.id }}"
                  class="account-item"
                >
                  <img class="navAvatar mr-1" :src="currentUser.image" />
                </router-link>

                <router-link
                  :to="{name: 'UserProfile', params: { id: currentUser.id }}"
                  class="account-item"
                >
                  <p class="account-item">我的帳號</p>
                </router-link>
              </div>

              <!-- signup -->
              <div v-else>
                <div class="signup-sidebar">
                  <router-link to="/users/signUp" class="account-item">
                    <i class="fa fa-user-plus mr-2" aria-hidden="true"></i>
                  </router-link>

                  <router-link to="/users/signUp" class="account-item">
                    <p>註冊</p>
                  </router-link>
                </div>

                <!-- login -->
                <div class="login-sidebar">
                  <router-link to="/users/logIn?redirect=/" class="account-item"></router-link>
                  <i class="fa fa-user mr-2" aria-hidden="true"></i>
                  <router-link to="/users/logIn?redirect=/" class="account-item">
                    <p>登入</p>
                  </router-link>
                </div>
              </div>

              <!-- admin -->
              <div class="admin-sidebar" v-if="currentUser.role === 1">
                <router-link to="/admin/index" class="account-item">
                  <i class="fas fa-tasks mr-2 mt-1"></i>
                </router-link>

                <router-link to="/admin/index" class="account-item">
                  <p class="admin-title">後台管理</p>
                </router-link>
              </div>

              <!-- logout -->
              <div class="logout-sidebar" v-if="isAuthenticated">
                <i class="fa fa-share mr-2" aria-hidden="true" @click.prevent.stop="logout"></i>
                <p class="account-item" @click.prevent.stop="logout">登出</p>
              </div>
            </div>
          </b-sidebar>
        </div>

        <div id="navbarSupportedContent" class="navbar-collapse collapse">
          <div class="ml-auto d-flex align-items-center">
            <!-- cart -->
            <div class="cartIcon">
              <router-link to="/cart" class="nav-logo btn">
                <i class="fa fa-shopping-cart mr-1" aria-hidden="true"></i>
                <div v-if="cartItemNumber" class="badge badge-warning">{{cartItemNumber}}</div>
                <p class="cart-title">購物車</p>
              </router-link>
            </div>

            <!-- admin -->
            <div class="admin mr-2" v-if="currentUser.role === 1">
              <router-link to="/admin/index" class="nav-logo btn">
                <i class="fas fa-tasks"></i>
                <p class="admin-title">後台管理</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="navbar-account">
      <div class="container">
        <div class="account">
          <!-- profile -->
          <div class="user" v-if="isAuthenticated">
            <router-link
              :to="{name: 'UserProfile', params: { id: currentUser.id }}"
              class="account-item"
            >
              <img class="navAvatar mr-1" :src="currentUser.image" />
            </router-link>

            <router-link
              :to="{name: 'UserProfile', params: { id: currentUser.id }}"
              class="account-item"
            >
              <p class="account-item">我的帳號</p>
            </router-link>

            <p class="account-mid">&nbsp;&nbsp;|&nbsp;&nbsp;</p>

            <!-- logout -->
            <p class="account-item" @click.prevent.stop="logout">登出</p>
          </div>
          <div class="login row" v-else>
            <router-link to="/users/signUp" class="account-item">
              <p>註冊</p>
            </router-link>

            <p class="account-mid">&nbsp;&nbsp;|&nbsp;&nbsp;</p>

            <router-link to="/users/logIn?redirect=/" class="account-item">
              <p>登入</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- search-checked -->
    <ul v-show="open" class="checked-nav">
      <li>
        <div class="nav-search col-12">
          <form @submit.prevent="handleSearch(keyword)" class="keyword">
            <div class="input-group">
              <input
                class="form-control form-control-inline"
                type="text"
                id="keyword"
                v-model="keyword"
                name="keyword"
                placeholder="請輸入 商品 關鍵字"
                aria-label="Search"
              />
              <div class="input-group-append">
                <button class="input-group-text searchBtn lighten-3" type="submit">
                  <i class="fas fa-search text-grey" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "./../utils/helpers";

export default {
  data() {
    return {
      keyword: "",
      open: false
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated", "cartItemNumber"])
  },
  methods: {
    handleSearch(keyword) {
      this.$router.push({ path: "/ESHOP/search", query: { keyword } });
      // 清空搜尋欄位
      this.keyword = "";
    },
    logout() {
      this.$store.commit("revokeAuthentication");

      Toast.fire({
        type: "success",
        title: "已成功登出"
      });

      this.$router.push("/users/logIn");
    },
    checked() {
      this.open = !this.open;
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Pacifico&display=swap");

%hover {
  background-color: #3ac4e2;
  color: white;
  transition: all 0.3s ease-in-out;
}

.navber-title-box {
  padding: 0;
}

.nav-search-box {
  padding: 0;
  @media screen and (max-width: 992px) {
    display: none;
  }
}

.navbar {
  background: linear-gradient(-40deg, #d2f0f5, #abe3ed) !important;
  padding: 20px;
  &-title {
    font-family: "Pacifico", cursive;
    color: #0085a5;
    font-size: 25px;
    &:hover {
      @extend %hover;
      text-decoration: none;
    }
    @media screen and (max-width: 576px) {
      font-size: 20px;
    }
  }
}

.keyword {
  width: 100%;
}

.form-control-inline {
  font-size: 18px;
}

.navAvatar {
  width: 23px;
  border-radius: 50%;
}

.nav-logo {
  color: #0085a5;
  &:hover {
    @extend %hover;
  }
  @media screen and (max-width: 576px) {
    font-size: 16px;
  }
}

.searchBtn {
  cursor: pointer;
  &:hover {
    @extend %hover;
  }
}

.cart-title,
.admin-title,
p {
  margin-bottom: 0;
}

.icon-lg {
  @media screen and (min-width: 992px) {
    display: none;
  }
}

.badge {
  font-size: 75%;
  display: inline-block;
  color: gray;
}

.navbar-account {
  background-color: white;
  position: fixed;
  margin-top: -70px;
  border-bottom: 1px solid rgb(209, 208, 208);
  width: 100%;
  z-index: 50;
  padding: 10px 20px;
  @media screen and (max-width: 992px) {
    display: none;
  }
}

.account {
  text-align: right;
  padding: 0 20px;
  display: flex;
  justify-content: flex-end;
}

.account-item {
  color: rgb(112, 109, 109);
  &:hover {
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    color: #0085a5;
    cursor: pointer;
  }
}

.account-mid {
  color: rgb(185, 179, 179);
}

.user {
  display: flex;
  align-items: center;
}

.user-sidebar,
.signup-sidebar,
.login-sidebar,
.admin-sidebar,
.logout-sidebar {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgb(209, 208, 208);
}

.navbar-toggler {
  border: 2px solid #0085a5;
  &:focus {
    background-color: transparent;
  }
}

.fa-bars {
  color: #0085a5;
}

.checked-nav {
  position: fixed;
  z-index: 100;
  margin-top: -93px;
  background: linear-gradient(-40deg, #d2f0f5, #abe3ed) !important;
  width: 100%;
  padding: 20px;
  list-style-type: none;
}
</style>