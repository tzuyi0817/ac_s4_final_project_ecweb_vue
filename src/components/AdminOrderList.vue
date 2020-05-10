<template>
  <tr>
    <td>
      <router-link :to="{name: 'AdminOrder', params: {id: order.id}}" class="orderId">{{order.id}}</router-link>
    </td>
    <td>{{order.orderDate}}</td>

    <td>
      <!-- 排程中 -->
      <h6 v-if="order.orderStatus === onSchedule">
        <span class="badge badge-secondary">{{order.orderStatus}}</span>
      </h6>
      <!-- 處理中 -->
      <h6 v-else-if="order.orderStatus === processing">
        <span class="badge badge-warning">{{order.orderStatus}}</span>
      </h6>
      <!-- 已完成 -->
      <h6 v-else-if="order.orderStatus === completed">
        <span class="badge badge-success">{{order.orderStatus}}</span>
      </h6>
      <!-- 已取消 -->
      <h6 v-else>
        <span class="badge badge-danger">已取消</span>
      </h6>
    </td>

    <td class="payment-status">
      <!-- 未付款 -->
      <h6 v-if="order.paymentStatusId === 1">
        <span class="badge badge-secondary">未付款</span>
      </h6>
      <!-- 已付款 -->
      <h6 v-if="order.paymentStatusId === 2">
        <span class="badge badge-success">已付款</span>
      </h6>
      <!-- 退款中 -->
      <h6 v-if="order.paymentStatusId === 3">
        <span class="badge badge-warning">退款中</span>
      </h6>
      <!-- 已退款 -->
      <h6 v-if="order.paymentStatusId === 4">
        <span class="badge badge-secondary">已退款</span>
      </h6>
    </td>

    <td class="shipment-status">
      <!-- 備貨中 -->
      <h6 v-if="order.shipmentStatus === InStock">
        <span class="badge badge-secondary">{{order.shipmentStatus}}</span>
      </h6>
      <!-- 發貨中 -->
      <h6 v-if="order.shipmentStatus === shipping">
        <span class="badge badge-secondary">{{order.shipmentStatus}}</span>
      </h6>
      <!-- 已發貨 -->
      <h6 v-if="order.shipmentStatus === shipped">
        <span class="badge badge-primary">{{order.shipmentStatus}}</span>
      </h6>
      <!-- 已到達 -->
      <h6 v-if="order.shipmentStatus === arrived">
        <span class="badge badge-success">{{order.shipmentStatus}}</span>
      </h6>
      <!-- 已取貨 -->
      <h6 v-if="order.shipmentStatus === pickedUp">
        <span class="badge badge-success">{{order.shipmentStatus}}</span>
      </h6>
      <!-- 已退貨 -->
      <h6 v-if="order.shipmentStatus === returned">
        <span class="badge badge-warning">{{order.shipmentStatus}}</span>
      </h6>
      <!-- 退貨中 -->
      <h6 v-if="order.shipmentStatus === returning">
        <span class="badge badge-warning">{{order.shipmentStatus}}</span>
      </h6>
    </td>
    <td class="orderer">
      {{order.User.name}}
      <span class="orderer-email">({{order.User.email}})</span>
    </td>
    <td class="amount">NT${{order.amount}}</td>
  </tr>
</template>

<script>
export default {
  props: {
    initialOrder: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      order: this.initialOrder,
      onSchedule: "排程中",
      processing: "處理中",
      completed: "已完成",
      InStock: "備貨中",
      shipping: "發貨中",
      shipped: "已發貨",
      arrived: "已到達",
      pickedUp: "已取貨",
      returned: "已退貨",
      returning: "退貨中"
    };
  }
};
</script>

<style lang="scss" scoped>
@mixin respond-and($upper) {
  @media screen and (max-width: $upper) {
    @content;
  }
}

.orderId {
  color: #0085a5;
  &:hover {
    color: #0c99bd;
    text-decoration: none;
  }
}

.orderer-email {
  @include respond-and(992px) {
    display: none;
  }
}

.payment-status,
.shipment-status,
.orderer-email {
  @include respond-and(768px) {
    display: none;
  }
}

.amount {
  @include respond-and(576px) {
    display: none;
  }
}
</style>