<template>
  <div class="card shipment-status my-3">
    <form @submit.stop.prevent="handleSubmit">
      <div class="card-header d-flex justify-content-between">
        <p class="d-inline" style="color: #0085a5;">配送資料</p>
        <div id="shipment" class="status_btn d-flex">
          <div v-if="isEdit" class="status_btn d-flex">
            <button id="save" type="submit" class="btn btn-sm btn-success">儲存</button>
          </div>

          <div v-else class="status_btn d-flex" @click.stop.prevent="edit">
            <button id="edit" type="button" class="btn btn-sm btn-primary">編輯</button>
          </div>
        </div>
      </div>
      <div id="shipmentDetail" class="card-body">
        <!-- 發貨狀態 -->
        <div class="shipment-status-item my-1">
          <h6 class="font-weight-bold">發貨狀態</h6>
          <!-- 備貨中 -->
          <h5 v-if="lastshipments.ShipmentStatusId === 1">
            <span class="badge badge-secondary">備貨中</span>
          </h5>
          <!-- 發貨中 -->
          <h5 v-if="lastshipments.ShipmentStatusId === 2">
            <span class="badge badge-secondary">發貨中</span>
          </h5>
          <!-- 已發貨 -->
          <h5 v-if="lastshipments.ShipmentStatusId === 3">
            <span class="badge badge-primary">已發貨</span>
          </h5>
          <!-- 已到達 -->
          <h5 v-if="lastshipments.ShipmentStatusId === 4">
            <span class="badge badge-success">已到達</span>
          </h5>
          <!-- 已取貨 -->
          <h5 v-if="lastshipments.ShipmentStatusId === 5">
            <span class="badge badge-success">已取貨</span>
          </h5>
          <!-- 已退貨 -->
          <h5 v-if="lastshipments.ShipmentStatusId === 6">
            <span class="badge badge-warning">已退貨</span>
          </h5>
          <!-- 退貨中 -->
          <h5 v-if="lastshipments.ShipmentStatusId === 7">
            <span class="badge badge-warning">退貨中</span>
          </h5>

          <div v-if="isEdit" class="form-group">
            <select name="ShipmentStatusId" class="form-control" v-model="ShipmentStatusId">
              <option value selected disabled>--請選擇--</option>
              <option value="1">備貨中</option>
              <option value="2">發貨中</option>
              <option value="3">已發貨</option>
              <option value="4">已到達</option>
              <option value="5">已取貨</option>
              <option value="6">已退貨</option>
              <option value="7">退貨中</option>
            </select>
          </div>
        </div>
        <!-- 送貨方式 -->
        <div class="shipment-status-item my-1">
          <h6 class="font-weight-bold">送貨方法</h6>
          <!-- 宅配 -->
          <h5 v-if="lastshipments.ShipmentTypeId === 1">
            <span class="badge badge-secondary">宅配</span>
          </h5>
          <!-- 超商取貨 -->
          <h5 v-if="lastshipments.ShipmentTypeId === 2">
            <span class="badge badge-primary">超商取貨</span>
          </h5>
          <!-- 面交 -->
          <h5 v-if="lastshipments.ShipmentTypeId === 3">
            <span class="badge badge-warning">面交</span>
          </h5>
          <div v-if="isEdit" class="form-group">
            <select name="ShipmentTypeId" class="form-control" v-model="ShipmentTypeId">
              <option value selected disabled>--請選擇--</option>
              <option value="1">宅配</option>
              <option value="2">超商取貨</option>
              <option value="3">面交</option>
            </select>
          </div>
        </div>
        <!-- 收件人 -->
        <div class="shipment-status-item my-1">
          <h6 class="font-weight-bold">收件人</h6>
          <input v-if="isEdit" type="text" name="name" class="form-control" v-model="order.name" />
          <input v-else type="text" name="name" class="form-control" v-model="order.name" disabled />
        </div>
        <!-- 收件人電話號碼 -->
        <div class="shipment-status-item my-1">
          <h6 class="font-weight-bold">收件人電話號碼</h6>
          <input v-if="isEdit" type="text" name="phone" class="form-control" v-model="order.phone" />
          <input
            v-else
            type="text"
            name="phone"
            class="form-control"
            v-model="order.phone"
            disabled
          />
        </div>
        <!-- 送貨費用 -->
        <div class="shipment-status-item my-1">
          <h6 class="font-weight-bold">送貨費用</h6>
          <p>NT $ {{shippingFee}}</p>
        </div>
        <!-- 送貨地址 -->
        <div class="shipment-status-item my-1">
          <h6 class="font-weight-bold">送貨地址</h6>
          <input
            v-if="isEdit"
            type="text"
            name="address"
            class="form-control"
            v-model="order.address"
          />
          <input
            v-else
            type="text"
            name="address"
            class="form-control"
            v-model="order.address"
            disabled
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import AdminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";

export default {
  inject: ["reload"],
  props: {
    order: {
      type: Object,
      required: true
    },
    shipments: {
      type: Array,
      required: true
    },
    shippingFee: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      ShipmentStatusId: "",
      ShipmentTypeId: "",
      isEdit: false
    };
  },
  computed: {
    lastshipments() {
      return this.shipments.slice(-1)[0];
    }
  },
  methods: {
    edit() {
      this.isEdit = true;
    },
    async handleSubmit() {
      try {
        const { data, statusText } = await AdminAPI.putShipmentStatus({
          orderId: this.order.id,
          ShipmentStatusId: this.ShipmentStatusId,
          ShipmentTypeId: this.ShipmentTypeId,
          name: this.order.name,
          phone: this.order.phone,
          address: this.order.address
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.isEdit = false;
        this.reload();

        Toast.fire({
          type: "success",
          title: "已編輯配送資料"
        });
      } catch (error) {
        this.isEdit = false;
        Toast.fire({
          type: "error",
          title: "無法編輯配送資料，請稍後再試"
        });
      }
    }
  }
};
</script>

<style scoped>
@media screen and (min-width: 960px) and (max-width: 1040px) {
  h5 {
    font-size: 18px;
  }

  .card,
  button,
  h6,
  p,
  select,
  input {
    font-size: 15px;
  }
}

@media screen and (min-width: 840px) and (max-width: 960px) {
  h5 {
    font-size: 13px;
  }

  .card,
  button,
  h6,
  p,
  select,
  input {
    font-size: 10px;
  }
}

@media screen and (max-width: 840px) {
  h5 {
    font-size: 13px;
  }

  .card,
  button,
  h6,
  p,
  select,
  input {
    font-size: 10px;
  }
}
</style>