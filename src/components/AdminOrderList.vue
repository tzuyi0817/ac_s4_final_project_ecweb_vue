<template>
  <tr>
    <th scope="row">
      <input type="checkbox" />
    </th>
    <td>
      <router-link :to="{name: 'AdminOrder', params: {id: order.id}}" class="orderId">{{order.id}}</router-link>
    </td>
    <td>{{order.orderDate}}</td>

    <td>
      <!-- 排程中 -->
      <h5 v-if="order.orderStatus === onSchedule">
        <span class="badge badge-secondary">{{order.orderStatus}}</span>
      </h5>
      <!-- 處理中 -->
      <h5 v-else-if="order.orderStatus === processing">
        <span class="badge badge-warning">{{order.orderStatus}}</span>
      </h5>
      <!-- 已完成 -->
      <h5 v-else-if="order.orderStatus === completed">
        <span class="badge badge-success">{{order.orderStatus}}</span>
      </h5>
      <!-- 已取消 -->
      <h5 v-else>
        <span class="badge badge-danger">已取消</span>
      </h5>
    </td>

    <td>
      <!-- 未付款 -->
      <h5 v-if="order.paymentStatusId === 1">
        <span class="badge badge-secondary">未付款</span>
      </h5>
      <!-- 已付款 -->
      <h5 v-if="order.paymentStatusId === 2">
        <span class="badge badge-success">已付款</span>
      </h5>
      <!-- 退款中 -->
      <h5 v-if="order.paymentStatusId === 3">
        <span class="badge badge-warning">退款中</span>
      </h5>
      <!-- 已退款 -->
      <h5 v-if="order.paymentStatusId === 4">
        <span class="badge badge-secondary">已退款</span>
      </h5>
    </td>

    <td>
      <!-- 備貨中 -->
      <h5 v-if="order.shipmentStatus === InStock">
        <span class="badge badge-secondary">{{order.shipmentStatus}}</span>
      </h5>
      <!-- 發貨中 -->
      <h5 v-if="order.shipmentStatus === shipping">
        <span class="badge badge-secondary">{{order.shipmentStatus}}</span>
      </h5>
      <!-- 已發貨 -->
      <h5 v-if="order.shipmentStatus === shipped">
        <span class="badge badge-primary">{{order.shipmentStatus}}</span>
      </h5>
      <!-- 已到達 -->
      <h5 v-if="order.shipmentStatus === arrived">
        <span class="badge badge-success">{{order.shipmentStatus}}</span>
      </h5>
      <!-- 已取貨 -->
      <h5 v-if="order.shipmentStatus === pickedUp">
        <span class="badge badge-success">{{order.shipmentStatus}}</span>
      </h5>
      <!-- 已退貨 -->
      <h5 v-if="order.shipmentStatus === returned">
        <span class="badge badge-warning">{{order.shipmentStatus}}</span>
      </h5>
      <!-- 退貨中 -->
      <h5 v-if="order.shipmentStatus === returning">
        <span class="badge badge-warning">{{order.shipmentStatus}}</span>
      </h5>
    </td>
    <td>{{order.User.name}}({{order.User.email}})</td>
    <td>NT${{order.amount}}</td>
  </tr>
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

<style scoped>
.orderId {
  color: #0085a5;
}

.orderId:hover {
  color: #0c99bd;
  text-decoration: none;
}

@media screen and (max-width: 1040px) {
  h5 {
    font-size: 15px;
  }
}
</style>