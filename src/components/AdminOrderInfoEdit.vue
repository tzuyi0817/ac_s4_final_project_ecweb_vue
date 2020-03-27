<template>
  <!-- 訂單資料 -->
  <div class="card order-detail my-3">
    <form @submit.stop.prevent="handleSubmit">
      <div class="card-header d-flex justify-content-between">
        <p class="d-inline" style="color: #0085a5;">訂單資料</p>

        <div v-if="isEdit" class="status_btn d-flex">
          <button id="save" type="submit" class="btn btn-sm btn-success">儲存</button>
        </div>

        <div v-else class="status_btn d-flex" @click.stop.prevent="edit">
          <button id="edit" type="button" class="btn btn-sm btn-primary">編輯</button>
        </div>
      </div>
      <div class="card-body">
        <!-- 訂單號碼 -->
        <div class="order-detail-item my-1">
          <h6 class="font-weight-bold">訂單號碼</h6>
          <p>{{order.id}}</p>
        </div>
        <!-- 訂單日期 -->
        <div class="order-detail-item my-1">
          <h6 class="font-weight-bold">訂單日期</h6>
          <p>{{order.createdAt | fromNow}}</p>
        </div>
        <!-- 訂單狀態 -->
        <div class="order-detail-item my-3">
          <h6 class="font-weight-bold">訂單狀態</h6>
          <!-- 排程中 -->
          <h5 v-if="orderStatus === onSchedule">
            <span class="badge badge-secondary">{{orderStatus}}</span>
          </h5>
          <!-- 處理中 -->
          <h5 v-else-if="orderStatus === processing">
            <span class="badge badge-warning">{{orderStatus}}</span>
          </h5>
          <!-- 已完成 -->
          <h5 v-else-if="orderStatus === completed">
            <span class="badge badge-success">{{orderStatus}}</span>
          </h5>
          <!-- 已取消 -->
          <h5 v-else>
            <span class="badge badge-danger">已取消</span>
          </h5>

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
          <h6 class="font-weight-bold">訂單備註</h6>

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

h5 {
  @include respond-between(960px, 1100px, 18px);
  @include respond-between(768px, 960px, 13px);
  @include respond-and(768px, 13px);
}

.card,
button,
h6,
p,
select,
input {
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px, 10px);
}
</style>