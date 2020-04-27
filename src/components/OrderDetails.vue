<template>
  <div class="card mt-4">
    <div class="card-header" style="text-align: center; background-color: #0085a5; color: white;">
      <h3>訂單資訊 - 編號({{order.id}})</h3>
    </div>

    <div class="card-body" style="background-color: #d2f0f5;">
      <h6 class="mt-5 ml-2">商品詳情：</h6>
      <li class="bg-light text-dark list-group-item mt-3 col-12">
        <div class="row">
          <div class="col-6">商品</div>
          <div class="col-3">數量</div>
          <div class="col-3">小計</div>
        </div>
      </li>
      <li v-for="item in items" :key="item.id" class="bg-white text-dark list-group-item col-12">
        <div class="row">
          <div class="col-6">{{item.name}}</div>
          <div class="col-3 quantity">{{item.Order_item.quantity}}</div>
          <div class="col-3">{{item.price}}</div>
        </div>
      </li>

      <div class="row">
        <div class="amount-box col-md-4">
          <h6 class="mt-5 ml-2">金額詳情：</h6>
          <div class="bg-light text-dark list-group-item mt-3">
            <div class="row">
              <div class="col">商品金額總計:</div>
              <div class="amount">{{originAmount}} 元</div>
            </div>
            <div class="row">
              <div class="col">運費:</div>
              <div class="amount">{{shippingFee}} 元</div>
            </div>
            <div class="row">
              <div class="col">折價券折抵:</div>
              <div class="amount">{{order.amount - subtotal }} 元</div>
            </div>
            <div class="row">
              <div class="col">金額總計:</div>
              <div class="amount" style="color: red;">{{order.amount}} 元</div>
            </div>
          </div>
        </div>

        <div class="customer-information col-md-8 mt-5">
          <h6>顧客資訊：</h6>
          <div class="bg-light text-dark list-group-item mt-3">
            <div>名字: &nbsp;{{order.name}}</div>
            <div>地址: &nbsp;{{order.address}}</div>
            <div>電話: &nbsp;{{order.phone}}</div>
          </div>
        </div>
      </div>

      <h6 class="mt-5 ml-2">出貨狀況：</h6>
      <div class="bg-light text-dark list-group-item mt-3 col-12">
        <div>訂單狀態: &nbsp;{{order.Order_status.orderStatus}}</div>
        <div>付款方式: &nbsp;{{lastpaymentType.paymentType}}</div>
        <div>付款狀況: &nbsp;{{lastPaymentStatus.paymentStatus}}</div>

        <div class="shipmentType row">
          <div>出貨方式: &nbsp;{{lastShipmentType.shipmentType}}</div>

          <div
            v-for="shipment in shipmentConvenienceStore"
            :key="shipment.id"
          >『{{shipment.branch}} - {{shipment.address}}』</div>
        </div>

        <div>出貨狀況: &nbsp;{{lastShipmentStatus.shipmentStatus}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    originAmount: {
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
    },
    order: {
      type: Object,
      required: true
    },
    paymentType: {
      type: Array,
      required: true
    },
    paymentStatus: {
      type: Array,
      required: true
    },
    shipmentType: {
      type: Array,
      required: true
    },
    shipmentStatus: {
      type: Array,
      required: true
    },
    shipmentConvenienceStore: {
      type: Array,
      required: true
    }
  },
  computed: {
    lastpaymentType() {
      return this.paymentType.slice(-1)[0];
    },
    lastPaymentStatus() {
      return this.paymentStatus.slice(-1)[0];
    },
    lastShipmentType() {
      return this.shipmentType.slice(-1)[0];
    },
    lastShipmentStatus() {
      return this.shipmentStatus.slice(-1)[0];
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin respond-and($upper) {
  @media screen and (max-width: $upper) {
    @content;
  }
}

.amount {
  float: right;
}

h6 {
  color: #0085a5;
}

.row,
.bg-light {
  font-size: 16px;
}

.list-group-item {
  padding: 15px 10px;
}

.col,
.customer-information,
.col-6 {
  padding: 0;
}

.amount-box {
  padding: 0 15px 0 0;
  @include respond-and(768px) {
    padding: 0;
  }
}
</style>