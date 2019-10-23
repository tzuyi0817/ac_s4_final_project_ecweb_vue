<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-light">
    <router-link class="navbar-title mr-5" to="/">MuseClub</router-link>

    <!-- 搜尋  -->
    <form action="/ESHOP/search">
      <input class="searchKeyword mr-1" type="text" name="keyword" value placeholder="請輸入 商品 關鍵字" />
      <button class="searchBtn mr-5" type="submit">
        <span class="fa fa-search ml-1">&nbsp;搜尋商品&nbsp;</span>
      </button>
    </form>

    <!-- cart -->
    <div class="cartIcon ml-2">
      <router-link to="/cart" class="nav-logo btn">
        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        購物車
        <span
          v-if="localcartItem"
          class="bg-danger text-white rounded-circle h-5 p-1"
        >{{localcartItem}}</span>
      </router-link>
    </div>

    <!-- profile -->
    <div class="user" v-if="isAuthenticated">
      <router-link to class="nav-logo btn">
        <img class="navAvatar" :src="currentUser.image" /> 我的帳號
      </router-link>
    </div>
    <div class="login" v-else>
      <router-link to="/users/logIn?redirect=/" class="nav-logo btn">
        <i class="fas fa-user"></i> 登入會員
      </router-link>
    </div>

    <!-- admin -->
    <div class="admin" v-if="isRole">
      <router-link href="/admin/index" class="nav-logo btn">
        <i class="fas fa-tasks"></i>
        後台管理
      </router-link>
    </div>

    <!-- logout -->
    <div class="logout" v-if="isAuthenticated">
      <router-link to="/users/logOut">
        <button class="btn btn-outline-success my-2 my-sm-0">登出</button>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Pacifico&display=swap");

.navbar {
  font-family: "DFKai-sb";
}

.navbar {
  background-color: #d2f0f5;
  padding: 20px;
}

.navbar-title {
  font-family: "Pacifico", cursive;
  color: #0085a5;
  margin-left: 100px;
  font-size: 25px;
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
}

.searchKeyword {
  width: 400px;
}

.nav-logo:hover {
  background-color: #3ac4e2;
  color: white;
}
</style>