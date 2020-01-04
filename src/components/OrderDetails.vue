<template>
  <div class="card mt-4">
    <div class="card-header" style="text-align: center; background-color: #0085a5; color: white;">
      <h2>訂單資訊 - 編號({{order.id}})</h2>
    </div>

    <div class="card-body" style="background-color: #d2f0f5;">
      <h4 class="mt-5 ml-2">商品詳情：</h4>
      <li class="bg-light text-dark list-group-item ml-3 mt-3 col-11">
        <div class="row">
          <div class="col">商品</div>
          <div class="col">數量</div>
          <div class="col">小計</div>
        </div>
      </li>
      <li
        v-for="item in items"
        :key="item.id"
        class="bg-white text-dark list-group-item ml-3 col-11"
      >
        <div class="row">
          <div class="col">{{item.name}}</div>
          <div class="col ml-3">{{item.Order_item.quantity}}</div>
          <div class="col">{{item.price}}</div>
        </div>
      </li>

      <div class="row">
        <div class="col-4">
          <h4 class="mt-5 ml-2">金額詳情：</h4>
          <div class="bg-light text-dark list-group-item ml-3 mt-3">
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

        <div class="col-7 ml-3 mt-5">
          <h4>顧客資訊：</h4>
          <div class="bg-light text-dark list-group-item ml-2 mt-3">
            <div>名字: &nbsp;{{order.name}}</div>
            <div>地址: &nbsp;{{order.address}}</div>
            <div>電話: &nbsp;{{order.phone}}</div>
          </div>
        </div>
      </div>

      <h4 class="mt-5 ml-2">出貨狀況：</h4>
      <div class="bg-light text-dark list-group-item ml-3 mt-3 col-11">
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

<style scoped>
hr {
  border: 0;
  border-top: 2px solid rgb(212, 210, 210);
}

.amount {
  float: right;
}

.shipmentType {
  margin-left: 0px;
}

h4 {
  color: #0085a5;
}

@media screen and (max-width: 1040px) {
  h2 {
    font-size: 25px;
  }

  h4 {
    font-size: 20px;
  }

  .row,
  .bg-light {
    font-size: 15px;
  }
}
</style>