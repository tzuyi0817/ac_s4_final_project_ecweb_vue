<template>
  <div class="coupon mt-5">
    <hr />

    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="couponCode">如果要使用折扣碼，請在此填入</label>
        <input
          v-model="coouponCode"
          type="text"
          class="form-control"
          id="coouponCode"
          name="couponCode"
          placeholder="您的折價券序號"
        />
        <div class="row">
          <p class="col">&nbsp;</p>

          <!-- 未登入 -->
          <router-link
            v-if="!isAuthenticated"
            class="btn btn-success mt-3 mr-3 mb-1"
            to="/users/logIn?redirect=cart"
          >使用折價券</router-link>

          <!-- 已登入 -->
          <button
            v-else
            type="submit"
            class="btn btn-success mt-3 mr-3 mb-1"
            :disabled="isProcessing"
          >使用折價券</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import couponAPI from "./../apis/coupons";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  props: {
    totalPrice: {
      type: Number,
      default: -1
    }
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  data() {
    return {
      coouponCode: "",
      isProcessing: false
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.isProcessing = true;

        // 未輸入折價券序號
        if (!this.coouponCode) {
          Toast.fire({
            type: "warning",
            title: "請輸入折價券序號"
          });
          this.isProcessing = false;
          return;
        }

        const { data, statusText } = await couponAPI.checkCoupon({
          couponCode: this.coouponCode
        });

        const couponId = data.couponId;
        const available = data.available;
        const discount = data.discount;

        // 折價券過期
        if (available === false) {
          Toast.fire({
            type: "warning",
            title: "此序號已過期"
          });
          this.isProcessing = false;
          return;
        }

        // 折扣金額超過購買金額
        if (discount > this.totalPrice) {
          Toast.fire({
            type: "warning",
            title: "無法折抵超過您所消費的金額"
          });
          this.isProcessing = false;
          return;
        }

        // 折價券序號不存在
        if (!couponId) {
          Toast.fire({
            type: "warning",
            title: "此序號不存在"
          });
          this.isProcessing = false;
          return;
        }

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        Toast.fire({
          type: "success",
          title: "已成功使用折價券"
        });

        this.$router.push({ path: "/cart", query: { couponId } });

        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;

        Toast.fire({
          type: "error",
          title: "無法使用折價券，請稍後再試"
        });
      }
    }
  }
};
</script>

<style scoped>
hr {
  border: 0;
  border-top: 2px solid rgb(212, 210, 210);
}

.btn-success {
  float: right;
  background-color: #0085a5;
}

.btn-success:hover {
  background-color: #0c99bd;
}

@media screen and (min-width: 960px) and (max-width: 1040px) {
  label,
  input,
  .btn {
    font-size: 15px;
  }
}

@media screen and (min-width: 840px) and (max-width: 960px) {
  label,
  input,
  .btn {
    font-size: 10px;
  }
}

@media screen and (max-width: 840px) {
  label,
  input,
  .btn {
    font-size: 10px;
  }
}
</style>