<template>
  <div class="card payment-status my-3">
    <form @submit.stop.prevent="handleSubmit">
      <div class="card-header d-flex justify-content-between">
        <p class="d-inline" style="color: #0085a5;">付款資料</p>

        <div v-if="isEdit" class="status_btn d-flex">
          <button id="save" type="submit" class="btn btn-sm btn-success">儲存</button>
        </div>

        <div v-else class="status_btn d-flex" @click.stop.prevent="edit">
          <button id="edit" type="button" class="btn btn-sm btn-primary">編輯</button>
        </div>
      </div>
      <div class="card-body">
        <!-- 付款狀態 -->
        <div id="paymentDetail" class="payment-status-item my-1">
          <h6 class="font-weight-bold">付款狀態</h6>

          <h5 v-if="lastPayments.PaymentStatusId === 1">
            <span class="badge badge-secondary">未付款</span>
          </h5>

          <h5 v-if="lastPayments.PaymentStatusId === 2">
            <span class="badge badge-success">已付款</span>
          </h5>

          <h5 v-if="lastPayments.PaymentStatusId === 3">
            <span class="badge badge-warning">退款中</span>
          </h5>

          <h5 v-if="lastPayments.PaymentStatusId === 4">
            <span class="badge badge-secondary">已退款</span>
          </h5>

          <div v-if="isEdit" class="form-group">
            <select name="PaymentStatusId" class="form-control" v-model="PaymentStatusId">
              <option value selected disabled>--請選擇--</option>
              <option value="1">未付款</option>
              <option value="2">已付款</option>
              <option value="3">退款中</option>
              <option value="4">已退款</option>
            </select>
          </div>
        </div>
        <!-- 付款方法 -->
        <div class="payment-status-item my-1">
          <h6 class="font-weight-bold">付款方法</h6>

          <h5 v-if="lastPayments.PaymentTypeId === 1">
            <span class="badge badge-secondary">信用卡</span>
          </h5>

          <h5 v-if="lastPayments.PaymentTypeId === 2">
            <span class="badge badge-secondary">貨到付款</span>
          </h5>

          <h5 v-if="lastPayments.PaymentTypeId === 3">
            <span class="badge badge-secondary">GOOGLEPAY</span>
          </h5>

          <h5 v-if="lastPayments.PaymentTypeId === 4">
            <span class="badge badge-secondary">匯款</span>
          </h5>

          <div v-if="isEdit" class="form-group">
            <select name="PaymentTypeId" class="form-control" v-model="PaymentTypeId">
              <option value selected disabled>--請選擇--</option>
              <option value="1">信用卡</option>
              <option value="2">貨到付款</option>
              <option value="3">GOOGLEPAY</option>
              <option value="4">匯款</option>
            </select>
          </div>
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
    payments: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      PaymentTypeId: "",
      PaymentStatusId: "",
      isEdit: false
    };
  },
  computed: {
    lastPayments() {
      return this.payments.slice(-1)[0];
    }
  },
  methods: {
    edit() {
      this.isEdit = true;
    },
    async handleSubmit() {
      try {
        const { data, statusText } = await AdminAPI.putPaymentStatus({
          orderId: this.order.id,
          PaymentTypeId: this.PaymentTypeId,
          PaymentStatusId: this.PaymentStatusId
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.isEdit = false;
        this.reload();

        Toast.fire({
          type: "success",
          title: "已編輯付款資料"
        });
      } catch (error) {
        this.isEdit = false;
        Toast.fire({
          type: "error",
          title: "無法編輯付款資料，請稍後再試"
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
  select {
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
  select {
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
  select {
    font-size: 10px;
  }
}
</style>