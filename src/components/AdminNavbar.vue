<template>
  <div class="admin-navber-box">
    <router-link to="/admin/index">
      <img
        class="logo mt-3"
        src="https://mitjobs.s3.amazonaws.com/uploads/organization/520/cover_photo/shopline-logo-white-on-blue.png"
        alt
      />
    </router-link>

    <div class="col store_logo">
      <div class="logoName">
        <router-link class="text-center" to="/">
          <h5 class="navbar-title">MuseClub</h5>
          <h5 class="storename mt-2">繆斯俱樂部</h5>
        </router-link>
      </div>
    </div>

    <div class="w-100 store_nav">
      <button
        class="btn btn-dark btn-block"
        data-toggle="collapse"
        type="button"
        data-target="#saleModelNav"
      >
        <i class="fas fa-clone"></i> 商家資料
      </button>
      <div class="collapse bg-secondary" id="saleModelNav">
        <router-link
          to="/admin/index"
          class="btn btn-secondary btn-block nav_item text-white"
        >商店基本資料</router-link>
      </div>

      <button class="btn btn-dark btn-block" data-toggle="collapse" data-target="#productModelNav">
        <i class="fas fa-boxes"></i> 產品模組
      </button>
      <div class="collapse bg-secondary" id="productModelNav">
        <router-link
          class="btn btn-secondary btn-block nav_item text-white"
          to="/admin/productmodel/product_mange"
        >產品管理</router-link>
        <router-link
          class="btn btn-secondary btn-block nav_item text-white"
          to="/admin/productmodel/order_mange"
        >訂單管理</router-link>
        <router-link
          class="btn btn-secondary btn-block nav_item text-white"
          to="/admin/productmodel/deliveryNotice"
        >貨到通知管理</router-link>
        <router-link
          class="btn btn-secondary btn-block nav_item text-white"
          to="/admin/coupon/managePage"
        >折價券管理</router-link>
        <router-link
          class="btn btn-secondary btn-block nav_item text-white"
          to="/admin/coupon/makingPage"
        >新增折價券</router-link>
      </div>

      <button class="btn btn-dark btn-block" data-toggle="collapse" href="#marketingModelNav">
        <i class="fas fa-bullhorn"></i> 行銷模組
      </button>
      <div class="collapse bg-secondary" id="marketingModelNav">
        <router-link
          to="/admin/marketingmodel/track_code"
          class="btn btn-secondary btn-block nav_item text-white"
        >追蹤碼設定</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin respond-and($upper) {
  @media screen and (max-width: $upper) {
    @content;
  }
}

.logo {
  width: 100%;
  display: flex;
  justify-content: center;
  @include respond-and(992px) {
    display: none;
  }
}

.navbar-title,
.storename {
  font-family: "Pacifico", cursive;
  color: #0085a5;
}

h5:hover {
  color: #3ac4e2;
}

.store_logo {
  border-radius: 150px;
  background-color: #d2f0f5;
  margin: 30px 0;
  padding: 50px 0;
  @include respond-and(992px) {
    display: none;
  }
}

.store_nav {
  margin-bottom: 10px;
}

.btn-dark {
  @include respond-and(992px) {
    width: 80vw;
  }
}

.btn {
  font-size: 16px;
}
</style>