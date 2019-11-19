<template>
  <div>
    <div class="ml-4 mt-5">
      <h5 class="ml-5">留下您的評價：</h5>
    </div>

    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group col-10 mt-3 ml-5">
        <textarea
          class="form-control"
          v-model="comment"
          id="comment"
          name="comment"
          rows="5"
          placeholder="請在此輸入內容"
          required
        ></textarea>
      </div>

      <p class="mb-3 ml-4 d-flex align-items-center">
        <span class="text-secondary ml-5">商品評分：</span>
        <span class="starrating risingstar d-flex justify-content-center flex-row-reverse">
          <input v-model="rating" type="radio" id="star5" name="rating" value="5" />
          <label for="star5" title="5分">
            <span class="fa fa-star"></span>
          </label>

          <input v-model="rating" type="radio" id="star4" name="rating" value="4" />
          <label for="star4" title="4分">
            <span class="fa fa-star"></span>
          </label>

          <input v-model="rating" type="radio" id="star3" name="rating" value="3" />
          <label for="star3" title="3分">
            <span class="fa fa-star"></span>
          </label>

          <input v-model="rating" type="radio" id="star2" name="rating" value="2" />
          <label for="star2" title="2分">
            <span class="fa fa-star"></span>
          </label>

          <input v-model="rating" type="radio" id="star1" name="rating" value="1" />
          <label for="star1" title="1分">
            <span class="fa fa-star"></span>
          </label>
        </span>
      </p>

      <div class="col-11 mt-2">
        <div class="d-flex align-items-center justify-content-between">
          <div class="col-10"></div>
          <div class="col-2">
            <button type="submit" class="btn btn-primary" :disabled="isProcessing">送出評價</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import commentsAPI from "./../apis/comments";
import { Toast } from "./../utils/helpers";

export default {
  inject: ["reload"],
  props: {
    productId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      comment: "",
      rating: -1,
      isProcessing: false
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.comment || !this.rating === -1) {
          Toast.fire({
            type: "warning",
            title: "您尚未填寫任何評論或評價"
          });
          return;
        }

        this.isProcessing = true;

        const { data, statusText } = await commentsAPI.createComment({
          ProductId: this.productId,
          comment: this.comment,
          rating: this.rating
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.reload();

        this.$emit("after-create-comment", {
          commentId: data.commentId,
          ProductId: this.productId,
          comment: this.comment,
          rating: this.rating
        });

        this.isProcessing = false;
        this.comment = ""; // 將表單內的資料清空
        this.rating = -1;

        Toast.fire({
          type: "success",
          title: "成功新增評論"
        });
      } catch (error) {
        this.isProcessing = false;

        Toast.fire({
          type: "error",
          title: "無法新增評論，請稍後再試"
        });
      }
    }
  }
};
</script>

<style scoped>
.starrating > input {
  display: none;
}

.fa-star {
  margin: 2px;
  font-size: 30px;
  display: inline-block;
}

.starrating > label {
  color: #cbcbcb;
}

.starrating > input:checked ~ label {
  color: #ffca08;
}

.starrating > input:hover ~ label {
  color: #ffca08;
}

.btn-primary {
  background-color: #0085a5;
}

.btn-primary:hover {
  background-color: #0c99bd;
}
</style>