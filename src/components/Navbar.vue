<template>
  <nav
    class="navbar navbar-expand-lg fixed-top navbar-light"
    style="display:flex; justify-content: center;"
  >
    <router-link class="navbar-title" to="/">MuseClub</router-link>

    <!-- 搜尋  -->
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
        <span class="fa fa-search ml-1">&nbsp;搜尋商品&nbsp;</span>
      </button>
    </form>

    <!-- cart -->
    <div class="cartIcon">
      <router-link to="/cart" class="nav-logo btn">
        <i class="fa fa-shopping-cart mr-1" aria-hidden="true"></i>
        <div v-if="cartItemNumber" class="badge badge-warning">{{cartItemNumber}}</div>
      </router-link>
    </div>

    <!-- profile -->
    <div class="user" v-if="isAuthenticated">
      <router-link :to="{name: 'UserProfile', params: { id: currentUser.id }}" class="nav-logo btn">
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
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      keyword: ""
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
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Pacifico&display=swap");

.navbar {
  font-family: "DFKai-sb";
  background-color: #d2f0f5;
  padding: 20px;
}

.navbar-title {
  font-family: "Pacifico", cursive;
  color: #0085a5;
  font-size: 25px;
  margin-right: 60px;
}

.navAvatar {
  width: 23px;
  border-radius: 50%;
}

.nav-logo {
  color: #0085a5;
}

.searchBtn {
  border-color: #00b2da;
  margin: 0 5px;
  background-color: #3ac4e2;
  color: white;
  font-size: 18px;
  border-radius: 5px;
  line-height: 30px;
  border-width: 2px;
  border-style: solid;
  cursor: pointer;
  padding: 3px;
  margin-right: 60px;
}

.searchKeyword {
  width: 350px;
}

.nav-logo:hover {
  background-color: #3ac4e2;
  color: white;
}

.badge {
  font-size: 75%;
  display: inline-block;
  color: gray;
}

@media screen and (min-width: 960px) and (max-width: 1040px) {
  .navbar-title {
    font-size: 22px;
  }

  .searchBtn {
    font-size: 16px;
  }

  .searchKeyword {
    width: 300px;
    font-size: 18px;
  }

  .btn-outline-success,
  .nav-logo {
    font-size: 18px;
  }
}

@media screen and (min-width: 768px) and (max-width: 960px) {
  .navbar-title {
    font-size: 17px;
    margin-right: 30px;
  }

  .searchBtn {
    font-size: 11px;
  }

  .searchKeyword {
    width: 250px;
    font-size: 13px;
  }

  .btn-outline-success,
  .nav-logo {
    font-size: 13px;
  }
}

@media screen and (max-width: 768px) {
  .navbar-title {
    margin-right: 10px;
  }

  .searchBtn {
    font-size: 10px;
    padding: 0px;
    margin-right: 0px;
  }

  .searchKeyword {
    width: 230px;
    font-size: 15px;
  }

  .btn-outline-success,
  .nav-logo {
    font-size: 15px;
  }
}
</style>