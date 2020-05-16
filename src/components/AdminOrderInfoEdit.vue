<template>
  <!-- 訂單資料 -->
  <div class="card order-detail my-3">
    <form @submit.stop.prevent="handleSubmit">
      <div class="card-header d-flex justify-content-between">
        <p class="d-inline" style="color: #0085a5;">訂單資料</p>

        <div v-if="isEdit" class="status_btn d-flex">
          <button id="save" type="submit" class="btn btn-sm btn-info">儲存</button>
        </div>

        <div v-else class="status_btn d-flex" @click.stop.prevent="edit">
          <button id="edit" type="button" class="btn btn-sm btn-primary">編輯</button>
        </div>
      </div>
      <div class="card-body">
        <!-- 訂單號碼 -->
        <div class="order-detail-item my-1">
          <p class="font-weight-bold">訂單號碼</p>
          <p>{{order.id}}</p>
        </div>
        <!-- 訂單日期 -->
        <div class="order-detail-item my-1">
          <p class="font-weight-bold">訂單日期</p>
          <p>{{order.createdAt | fromNow}}</p>
        </div>
        <!-- 訂單狀態 -->
        <div class="order-detail-item my-3">
          <p class="font-weight-bold">訂單狀態</p>
          <!-- 排程中 -->
          <h6 v-if="orderStatus === onSchedule">
            <span class="badge badge-secondary">{{orderStatus}}</span>
          </h6>
          <!-- 處理中 -->
          <h6 v-else-if="orderStatus === processing">
            <span class="badge badge-warning">{{orderStatus}}</span>
          </h6>
          <!-- 已完成 -->
          <h6 v-else-if="orderStatus === completed">
            <span class="badge badge-success">{{orderStatus}}</span>
          </h6>
          <!-- 已取消 -->
          <h6 v-else>
            <span class="badge badge-danger">已取消</span>
          </h6>

          <div v-if="isEdit" class="input-group">
            <select
              v-model="order.OrderStatusId"
              name="OrderStatusId"
              class="form-control"
              id="OrderStatusId"
            >
              <option v-if="orderStatus === onSchedule" value="1" selected>排程中</option>
              <option v-else value="1">排程中</option>

              <option v-if="orderStatus === processing" value="2" selected>處理中</option>
              <option v-else value="2">處理中</option>

              <option v-if="orderStatus === completed" value="3" selected>已完成</option>
              <option v-else value="3">已完成</option>
            </select>
          </div>
        </div>

        <!-- 訂單備註 -->
        <div class="order-detail-item my-1">
          <p class="font-weight-bold">訂單備註</p>

          <input
            v-if="isEdit"
            id="memo"
            name="memo"
            type="text"
            class="form-control"
            v-model="order.memo"
          />

          <input
            v-else
            id="memo"
            name="memo"
            type="text"
            class="form-control"
            v-model="order.memo"
            disabled
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { fromNowFilter } from "./../utils/mixins";
import AdminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";

export default {
  mixins: [fromNowFilter],
  inject: ["reload"],
  props: {
    order: {
      type: Object,
      required: true
    },
    orderStatus: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      onSchedule: "排程中",
      processing: "處理中",
      completed: "已完成",
      isEdit: false
    };
  },
  methods: {
    edit() {
      this.isEdit = true;
    },
    async handleSubmit() {
      try {
        const { data, statusText } = await AdminAPI.putOrderStatus({
          orderId: this.order.id,
          memo: this.order.memo,
          OrderStatusId: this.order.OrderStatusId
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.isEdit = false;
        this.reload();

        Toast.fire({
          type: "success",
          title: "已編輯訂單資料"
        });
      } catch (error) {
        this.isEdit = false;
        Toast.fire({
          type: "error",
          title: "無法編輯訂單資料，請稍後再試"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.card,
button,
p,
select,
input {
  font-size: 16px;
}
</style>