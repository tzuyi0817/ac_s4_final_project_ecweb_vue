<template>
  <div class="container">
    <div class="card mb-4">
      <div class="card-header" style="text-align: center; background-color: #0085a5; color: white;">
        <form>
          <button
            v-if="order.Order_status.orderStatus !== this.cancel"
            type="submit"
            class="btn btn-danger float-right"
            @click.stop.prevent="handleCancelButtonClick(order.id)"
          >取消訂單</button>
        </form>
        <h4>訂單資訊 - 編號({{order.id}})</h4>
      </div>
      <div class="card-body" style="background-color: #d2f0f5;">
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
          <span v-if="lastPayments.PaymentTypeId === 1">付款方式: &nbsp;信用卡</span>
          <span v-if="lastPayments.PaymentTypeId === 2">付款方式: &nbsp;貨到付款</span>
          <span v-if="lastPayments.PaymentTypeId === 3">付款方式: &nbsp;GOOGLEPAY</span>
          <span v-if="lastPayments.PaymentTypeId === 4">付款方式: &nbsp;匯款</span>
          <br />
          <span v-if="lastPayments.PaymentStatusId === 1">付款狀況: &nbsp;未付款</span>
          <span v-if="lastPayments.PaymentStatusId === 2">付款狀況: &nbsp;已付款</span>
          <span v-if="lastPayments.PaymentStatusId === 3">付款狀況: &nbsp;退款中</span>
          <span v-if="lastPayments.PaymentStatusId === 4">付款狀況: &nbsp;已退款</span>
          <br />
          <span v-if="lastShipments.ShipmentTypeId === 1">出貨方式: &nbsp;宅配</span>
          <span v-if="lastShipments.ShipmentTypeId === 2">出貨方式: &nbsp;超商取貨</span>
          <span v-if="lastShipments.ShipmentTypeId === 3">出貨方式: &nbsp;面交</span>
          <span
            v-if="shipmentConvenienceStore.length > 0"
          >&nbsp;-『{{lastShipmentConvenienceStore.branch}} - {{lastShipmentConvenienceStore.address}}』</span>
          <br />
          <span v-if="lastShipments.ShipmentStatusId === 1">出貨狀況: &nbsp;備貨中</span>
          <span v-if="lastShipments.ShipmentStatusId === 2">出貨狀況: &nbsp;發貨中</span>
          <span v-if="lastShipments.ShipmentStatusId === 3">出貨狀況: &nbsp;已發貨</span>
          <span v-if="lastShipments.ShipmentStatusId === 4">出貨狀況: &nbsp;已到達</span>
          <span v-if="lastShipments.ShipmentStatusId === 5">出貨狀況: &nbsp;已取貨</span>
          <span v-if="lastShipments.ShipmentStatusId === 6">出貨狀況: &nbsp;已退貨</span>
          <span v-if="lastShipments.ShipmentStatusId === 7">出貨狀況: &nbsp;退貨中</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ordersAPI from "./../apis/orders";
import { Toast } from "./../utils/helpers";

export default {
  inject: ["reload"],
  props: {
    initialOrder: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      order: this.initialOrder,
      payments: this.initialOrder.Payments,
      shipments: this.initialOrder.Shipments,
      shipmentConvenienceStore: this.initialOrder.ShipmentConvenienceStore,
      cancel: "已取消"
    };
  },
  computed: {
    lastPayments() {
      const payments = this.payments.sort((a, b) => a.id - b.id); // eslint-disable-line
      return payments.slice(-1)[0];
    },
    lastShipments() {
      const shipments = this.shipments.sort((a, b) => a.id - b.id); // eslint-disable-line
      return shipments.slice(-1)[0];
    },
    lastShipmentConvenienceStore() {
      const Store = this.shipmentConvenienceStore.sort((a, b) => a.id - b.id); // eslint-disable-line
      return Store.slice(-1)[0];
    }
  },
  methods: {
    async handleCancelButtonClick(orderId) {
      try {
        const { data, statusText } = await ordersAPI.cancelOrder({
          orderId
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.reload();

        Toast.fire({
          type: "success",
          title: "成功取消訂單"
        });
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法取消訂單，請稍後再試"
        });
      }
    }
  }
};
</script>

<style scoped>
span {
  font-size: 18px;
}

h6 {
  color: #0085a5;
}

@media screen and (min-width: 960px) and (max-width: 1040px) {
  h4 {
    font-size: 20px;
  }

  h6 {
    font-size: 18px;
  }

  .btn,
  span {
    font-size: 15px;
  }
}

@media screen and (min-width: 840px) and (max-width: 960px) {
  h4 {
    font-size: 15px;
  }

  h6 {
    font-size: 13px;
  }

  .btn,
  span {
    font-size: 10px;
  }
}
</style>