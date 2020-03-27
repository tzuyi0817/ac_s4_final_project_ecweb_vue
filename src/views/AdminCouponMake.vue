<template>
  <div>
    <div class="container-fluid admin_layout">
      <div class="row">
        <div class="navbar col-md-2 col-10 d-flex flex-column">
          <AdminNavbar />
        </div>

        <div class="coupon-make col-md-8 col-11 bg-light p-1">
          <div class="container my-5">
            <template v-if="isCoupon">
              <table class="table mt-5">
                <thead style="background-color: #0085a5; color: white;">
                  <tr>
                    <th scope="col">資料</th>
                    <th scope="col">詳情</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">折價券序號:</th>
                    <td>{{coupon.couponCode}}</td>
                  </tr>
                  <tr>
                    <th scope="row">店家Id:</th>
                    <td>{{coupon.StoreId}}</td>
                  </tr>
                  <tr>
                    <th scope="row">折價券種類:</th>
                    <td>{{coupon.Coupon_type.couponType}}</td>
                  </tr>
                  <tr>
                    <th scope="row">描述:</th>
                    <td>{{coupon.description}}</td>
                  </tr>
                  <tr>
                    <th scope="row">有效:</th>
                    <td>{{coupon.available}}</td>
                  </tr>
                  <tr>
                    <th scope="row">折扣面額:</th>
                    <td>{{coupon.discount}}</td>
                  </tr>
                </tbody>
              </table>
            </template>

            <template v-else>
              <form @submit.stop.prevent="handleSubmit">
                <div class="form-group">
                  <label for="store">輸入你的店家id</label>
                  <input
                    type="number"
                    name="storeId"
                    class="form-control"
                    id="store"
                    v-model="storeId"
                  />
                </div>

                <div class="form-group">
                  <label for="couponType">選擇你的折價券種類</label>
                  <select name="couponTypeId" id="couponType" class="ml-2" v-model="couponTypeId">
                    <option value selected disabled>--請選擇--</option>
                    <option value="1">會員專屬</option>
                    <option value="2">節日促銷</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="description">折價券備註</label>
                  <textarea
                    class="form-control"
                    name="CouponDescription"
                    rows="5"
                    id="description"
                    v-model="CouponDescription"
                  ></textarea>
                </div>

                <div class="form-group">
                  <label for="discount">輸入折價券的面額</label>
                  <input
                    type="number"
                    class="form-control"
                    id="discount"
                    name="CouponDiscount"
                    v-model="CouponDiscount"
                  />
                </div>

                <div class="form-group">
                  <label for="expiredDate">輸入折價券的到期日</label>
                  <input
                    type="date"
                    class="form-control"
                    id="expiredDate"
                    name="expiredDate"
                    v-model="expiredDate"
                  />
                </div>

                <div class="form-group">
                  <div class="form-group">
                    <button
                      class="btn btn-select mt-3 mb-5"
                      type="submit"
                      :disabled="isProcessing"
                    >提交</button>
                  </div>
                </div>
              </form>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from "./../components/AdminNavbar";
import AdminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  components: {
    AdminNavbar
  },
  data() {
    return {
      storeId: "",
      couponTypeId: "",
      CouponDiscount: "",
      CouponDescription: "",
      expiredDate: "",
      coupon: {},
      isCoupon: false,
      isProcessing: false
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  methods: {
    async handleSubmit() {
      try {
        this.isProcessing = true;

        const { data, statusText } = await AdminAPI.postCouponMake({
          storeId: this.storeId,
          couponTypeId: this.couponTypeId,
          CouponDiscount: this.CouponDiscount,
          CouponDescription: this.CouponDescription,
          expiredDate: this.expiredDate
        });

        this.coupon = data.coupon;

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.isProcessing = false;
        this.isCoupon = true;

        Toast.fire({
          type: "success",
          title: "已成功新增折價券"
        });
      } catch (error) {
        this.isProcessing = false;

        Toast.fire({
          type: "error",
          title: "無法新增折價券，請稍後再試"
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

.container-fluid {
  margin-top: -92px;
  margin-left: -89px;
  width: 115%;
  @include respond-and(768px) {
    margin-top: 0px;
    margin-left: -60px;
    margin-bottom: 150px;
  }
}

.coupon-make {
  margin-left: 60px;
  @include respond-and(768px) {
    margin-left: 0px;
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
  &:hover {
    background-color: #0c99bd;
  }
}

.container,
.btn,
input,
textarea {
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px) {
    font-size: 10px;
  }
}

.navbar {
  @include respond-and(768px) {
    margin-left: 25px;
  }
}
</style>