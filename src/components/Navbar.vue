<template>
  <div>
    <nav class="navbar navbar-expand-md fixed-top navbar-light" style="display:flex;">
      <div class="col-2">
        <router-link class="navbar-title btn" to="/">MuseClub</router-link>
      </div>

      <!-- 搜尋  -->
      <div class="nav-search-box col-6">
        <form @submit.prevent="handleSearch(keyword)">
          <input
            class="searchKeyword mr-1"
            type="text"
            id="keyword"
            v-model="keyword"
            name="keyword"
            placeholder="請輸入 商品 關鍵字"
          />
          <button class="searchBtn" type="submit">
            <span class="fa fa-search">&nbsp;搜尋商品&nbsp;</span>
          </button>
        </form>
      </div>

      <div class="icon-md row">
        <router-link to="/cart" class="nav-logo btn">
          <i class="fa fa-shopping-cart mr-1" aria-hidden="true"></i>
          <div v-if="cartItemNumber" class="badge badge-warning">{{cartItemNumber}}</div>
        </router-link>

        <div class="search-icon">
          <b-button v-b-toggle.collapse-2 class="fa fa-search nav-logo"></b-button>
        </div>
      </div>

      <div class="toggler">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click.prevent.stop="checked"
        >
          <span class="navbar-toggler-icon" />
        </button>
      </div>

      <div id="navbarSupportedContent" class="navbar-collapse collapse">
        <div class="ml-auto d-flex align-items-center">
          <!-- cart -->
          <div class="cartIcon">
            <router-link to="/cart" class="nav-logo btn">
              <i class="fa fa-shopping-cart mr-1" aria-hidden="true"></i>
              <div v-if="cartItemNumber" class="badge badge-warning">{{cartItemNumber}}</div>
            </router-link>
          </div>

          <!-- profile -->
          <div class="user" v-if="isAuthenticated">
            <router-link
              :to="{name: 'UserProfile', params: { id: currentUser.id }}"
              class="nav-logo btn"
            >
              <img class="navAvatar" :src="currentUser.image" />
            </router-link>
          </div>
          <div class="login" v-else>
            <router-link to="/users/logIn?redirect=/" class="nav-logo btn">
              <i class="fas fa-user"></i> 登入會員
            </router-link>
          </div>

          <!-- admin -->
          <div class="admin mr-2" v-if="currentUser.role === 1">
            <router-link to="/admin/index" class="nav-logo btn">
              <i class="fas fa-tasks"></i>
            </router-link>
          </div>

          <!-- logout -->
          <div class="logout" v-if="isAuthenticated">
            <button class="btn btn-outline-success my-2 my-sm-0" @click="logout">登出</button>
          </div>
        </div>
      </div>
    </nav>

    <b-collapse id="collapse-2" style="margin-top: 80px; text-align: center;">
      <b-card>
        <form @submit.prevent="handleSearch(keyword)" class="mt-2">
          <input
            class="searchKeyword mr-1"
            type="text"
            id="keyword"
            v-model="keyword"
            name="keyword"
            placeholder="請輸入 商品 關鍵字"
          />
          <button class="searchBtn" type="submit">
            <span class="fa fa-search">&nbsp;搜尋商品&nbsp;</span>
          </button>
        </form>
      </b-card>
    </b-collapse>

    <ul v-show="open" class="checked-nav">
      <li @click.prevent.stop="checked">
        <div class="user" v-if="isAuthenticated">
          <router-link
            :to="{name: 'UserProfile', params: { id: currentUser.id }}"
            class="nav-logo btn"
          >
            <img class="navAvatar" :src="currentUser.image" />
          </router-link>
        </div>
        <div class="login" v-else>
          <router-link to="/users/logIn?redirect=/" class="nav-logo btn">
            <i class="fas fa-user"></i> 登入會員
          </router-link>
        </div>
      </li>

      <li @click.prevent.stop="checked">
        <router-link to="/admin/index" class="nav-logo btn">
          <i class="fas fa-tasks"></i>
        </router-link>
      </li>

      <li @click.prevent.stop="checked">
        <div class="logout" v-if="isAuthenticated">
          <button class="btn btn-outline-success my-2 my-sm-0" @click="logout">登出</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

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

@mixin respond-between($lower, $upper, $font-size) {
  @media screen and (min-width: $lower) and (max-width: $upper) {
    font-size: $font-size;
    @content;
  }
}

@mixin respond-and($upper) {
  @media screen and (max-width: $upper) {
    @content;
  }
}

%hover {
  background-color: #3ac4e2;
  color: white;
  transition: all 0.3s ease-in-out;
}

.navbar-toggler-icon {
  color: #0085a5;
}

.navbar {
  background: linear-gradient(-40deg, #d2f0f5, #abe3ed) !important;
  padding: 20px;
  &-title {
    font-family: "Pacifico", cursive;
    color: #0085a5;
    font-size: 25px;
    margin-right: 60px;
    @include respond-between(960px, 1100px, 22px);
    @include respond-between(768px, 960px, 17px) {
      margin-right: 30px;
    }
    @include respond-and(768px) {
      margin-right: 10px;
    }
    &:hover {
      @extend %hover;
      text-decoration: none;
    }
  }
}

.navAvatar {
  width: 23px;
  border-radius: 50%;
}

.nav-logo {
  color: #0085a5;
  @include respond-between(960px, 1100px, 18px);
  @include respond-between(768px, 960px, 13px);
  &:hover {
    @extend %hover;
  }
}

.searchBtn {
  background-color: #3ac4e2;
  color: white;
  cursor: pointer;
  padding: 3px;
  font-size: 18px;
  line-height: 30px;
  margin: 0 5px;
  margin-right: 60px;
  border: {
    radius: 5px;
    width: 2px;
    style: solid;
  }
  @include respond-between(960px, 1100px, 16px);
  @include respond-between(768px, 960px, 11px) {
    margin-right: 20px;
  }
  @include respond-and(768px) {
    font-size: 10px;
    padding: 0px;
    margin-right: 0px;
  }
}

.searchKeyword {
  width: 325px;
  @include respond-between(960px, 1100px, 18px) {
    width: 250px;
  }
  @include respond-between(768px, 960px, 13px) {
    width: 190px;
  }
  @include respond-and(768px) {
    width: 250px;
  }
}

.badge {
  font-size: 75%;
  display: inline-block;
  color: gray;
}

.btn-outline-success {
  transition: all 0.3s ease-in-out;
  @include respond-between(960px, 1100px, 18px);
  @include respond-between(768px, 960px, 13px);
  @include respond-and(768px) {
    font-size: 15px;
  }
}

.nav-search-box {
  display: flex;
  justify-content: center;
  @include respond-and(768px) {
    display: none;
  }
}

.icon-md {
  margin-left: 60px;
  @media screen and (min-width: 768px) {
    display: none;
  }
}

.fa-search {
  background: transparent;
  border: none;
  margin-top: 7px;
}

.checked-nav {
  position: fixed;
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  margin-top: -78px;
  margin-right: 15px;
  list-style-type: none;
  width: 100%;
  padding: 15px 0 0;
  text-align: center;
  background: white;
  right: 0;
  border: 0.2px solid rgb(185, 179, 179);
  li {
    margin-top: 5px;
    padding: 10px;
  }
}
</style>