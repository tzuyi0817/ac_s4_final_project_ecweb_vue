<template>
  <div class="bg-light text-dark">
    <div class="row col-md-8">
      <div class="col">商品金額總計:</div>
      <div class="amount">{{totalPrice}} 元</div>
    </div>
    <div class="row col-md-8">
      <div class="col">運費:</div>
      <div class="amount">{{shippingFee}} 元</div>
    </div>
    <div class="row col-md-8">
      <div class="col">折價券折抵:</div>
      <div v-if="coupon" class="amount">- {{coupon.discount}} 元</div>
      <div v-else class="amount" style="float: right;">0 元</div>
    </div>
    <div class="row col-md-8">
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
      type: Object
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

.amount {
  float: right;
}

.row {
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px, 10px);
}
</style>