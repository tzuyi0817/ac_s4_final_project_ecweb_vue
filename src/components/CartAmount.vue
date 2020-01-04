<template>
  <div class="bg-light text-dark">
    <div class="row col-8">
      <div class="col">商品金額總計:</div>
      <div class="amount">{{totalPrice}} 元</div>
    </div>
    <div class="row col-8">
      <div class="col">運費:</div>
      <div class="amount">{{shippingFee}} 元</div>
    </div>
    <div class="row col-8">
      <div class="col">折價券折抵:</div>
      <div v-if="coupon" class="amount">- {{coupon.discount}} 元</div>
      <div v-else class="amount" style="float: right;">0 元</div>
    </div>
    <div class="row col-8">
      <div class="col">金額總計:</div>
      <div v-if="coupon" class="amount">{{subtotal - coupon.discount}} 元</div>
      <div v-else class="amount" style="float: right;">{{subtotal}} 元</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    coupon: {
      type: Object,
      required: true
    },
    totalPrice: {
      type: Number,
      default: -1
    },
    shippingFee: {
      type: Number,
      default: -1
    },
    subtotal: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.amount {
  float: right;
}

@media screen and (max-width: 1040px) {
  .row {
    font-size: 15px;
  }
}
</style>