<template>
  <div class="row">
    <router-link to="/admin/index">
      <img
        class="logo mt-3 ml-3"
        style="display:flex; justify-content: center;"
        src="https://mitjobs.s3.amazonaws.com/uploads/organization/520/cover_photo/shopline-logo-white-on-blue.png"
        alt
      />
    </router-link>

    <div class="col store_logo mt-5 mb-5" style="display:flex; justify-content: center;">
      <div class="logoName">
        <router-link class="text-center" to="/">
          <p>&nbsp;</p>
          <p class="navbar-title">MuseClub</p>
          <p class="storename mt-2">繆斯俱樂部</p>
        </router-link>
      </div>
    </div>

    <div class="w-100 store_nav d-flex flex-column flex-nowrap vh-80 ml-3 mr-3 mb-5">
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

.logo {
  width: 85%;
  @media screen and (min-width: 960px) and (max-width: 1100px) {
    width: 75%;
  }
  @media screen and (min-width: 768px) and (max-width: 960px) {
    width: 75%;
  }
}

.navbar-title {
  font-family: "Pacifico", cursive;
  color: #0085a5;
  font-size: 25px;
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px) {
    font-size: 25px;
  }
}

.text-center {
  text-decoration: none;
}

p:hover {
  color: #3ac4e2;
}

.storename {
  color: #0085a5;
  font-size: 25px;
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px) {
    font-size: 25px;
  }
}

.logoName {
  background-color: #d2f0f5;
  height: 180px;
  width: 180px;
  border-radius: 100px;
  @media screen and (min-width: 960px) and (max-width: 1100px) {
    height: 140px;
    width: 140px;
  }
  @media screen and (min-width: 768px) and (max-width: 960px) {
    height: 120px;
    width: 120px;
  }
  @include respond-and(768px) {
    height: 200px;
    width: 200px;
  }
}

.btn {
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px) {
    font-size: 15px;
  }
}
</style>