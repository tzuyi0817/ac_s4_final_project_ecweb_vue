<template>
  <div class="container">
    <div class="card mt-4">
      <div class="card-body">
        <div style="text-align: center;">
          <h4>訂單資訊 - 編號({{order.id}})</h4>
        </div>
        <hr />
        <h6 class="ml-2">商品詳情：</h6>
        <li class="bg-light text-dark list-group-item ml-1 mt-3 col-12">
          <div class="row">
            <span class="col-6">商品</span>
            <span class="col-3">數量</span>
            <span class="col-3">小計</span>
          </div>
        </li>
        <li
          v-for="item in order.items"
          :key="item.id"
          class="bg-white text-dark list-group-item ml-1 col-12"
        >
          <div class="row">
            <span class="col-6">{{item.name}}</span>
            <span class="col-3">{{item.Order_item.quantity}}</span>
            <span class="col-3">{{item.price}}</span>
          </div>
        </li>

        <div class="row">
          <div class="col-5">
            <h6 class="mt-3 ml-2">金額詳情：</h6>
            <div class="bg-light text-dark list-group-item ml-1 mt-3">
              <span>金額總計:</span>
              <span style="color: red;">&nbsp;{{order.amount}} 元</span>
            </div>
          </div>

          <div class="col-7 mt-3">
            <h6>收貨人資訊：</h6>
            <div class="bg-light text-dark list-group-item mt-3">
              <span>名字: &nbsp;{{order.name}}</span>
              <br />
              <span>地址: &nbsp;{{order.address}}</span>
              <br />
              <span>電話: &nbsp;{{order.phone}}</span>
            </div>
          </div>
        </div>

        <h6 class="ml-2">出貨狀況：</h6>
        <div class="bg-light text-dark list-group-item ml-1 mt-3 col-12">
          <span>訂單狀態: &nbsp;{{order.Order_status.orderStatus}}</span>
          <br />
          <span>付款方式: &nbsp;{{lastpaymentType.paymentType}}</span>
          <br />
          <span>付款狀況: &nbsp;{{lastPaymentStatus.paymentStatus}}</span>
          <br />
          <span>出貨方式: &nbsp;{{lastShipmentType.shipmentType}}</span>
          <span
            v-if="shipmentConvenienceStore.length > 0"
          >&nbsp;-『{{lastShipmentConvenienceStore.branch}} - {{lastShipmentConvenienceStore.address}}』</span>
          <br />
          <span>出貨狀況: &nbsp;{{lastShipmentStatus.shipmentStatus}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialOrder: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      order: this.initialOrder,
      paymentType: this.initialOrder.PaymentType,
      paymentStatus: this.initialOrder.PaymentStatus,
      shipmentType: this.initialOrder.ShipmentType,
      shipmentConvenienceStore: this.initialOrder.ShipmentConvenienceStore,
      shipmentStatus: this.initialOrder.ShipmentStatus
    };
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
    lastShipmentConvenienceStore() {
      return this.shipmentConvenienceStore.slice(-1)[0];
    },
    lastShipmentStatus() {
      return this.shipmentStatus.slice(-1)[0];
    }
  }
};
</script>

<style scoped>
span {
  font-size: 18px;
}
</style>