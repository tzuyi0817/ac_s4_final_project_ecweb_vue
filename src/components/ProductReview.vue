<template>
  <div>
    <div v-for="comment in commentsPagination" :key="comment.id">
      <div class="list-group-item list-group-item-action ml-5 mt-2 col-10">
        <button
          v-if="comment.User.id === currentUser.id"
          type="button"
          class="btn btn-danger float-right"
          @click.stop.prevent="handleDeleteButtonClick(comment.id)"
        >x</button>

        <div class="row">
          <div class="col-2 ml-2">
            <img class="avatar" :src="comment.User.image" />
          </div>

          <div class="col-10">
            <p class="ml-5 mr-5 mt-2" style="font-size: 18px;">{{comment.User.name}}</p>

            <div>
              <span class="stars d-flex mb-3 mt-2 ml-5">
                <span class="star" :inner-html.prop="comment.rating | star"></span>
              </span>
            </div>
          </div>
        </div>

        <p class="ml-5 mt-4">{{comment.comment}}</p>
        <small class="ml-5">{{comment.createdAt | fromNow}}</small>
      </div>
    </div>
  </div>
</template>

<script>
import { starFilter } from "./../utils/mixins";
import { fromNowFilter } from "./../utils/mixins";
import commentsAPI from "./../apis/comments";
import { mapState } from "vuex";
import { Toast } from "./../utils/helpers";

export default {
  mixins: [starFilter, fromNowFilter],
  props: {
    commentsPagination: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState(["currentUser"])
  },
  methods: {
    async handleDeleteButtonClick(commentId) {
      try {
        const { data, statusText } = await commentsAPI.deleteComment({
          ProductId: this.ProductId,
          commentId
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.$emit("after-delete-comment", commentId);

        Toast.fire({
          type: "success",
          title: "成功刪除評論"
        });
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法刪除評論，請稍後再試"
        });
      }
    }
  }
};
</script>

<style scoped>
/* ====== User 的評論大頭照 ====== */
.avatar {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 50px;
  height: 50px;
  display: block;
  border-radius: 50%;
}

.list-group-item:hover,
.list-group-item:hover small {
  color: #0085a5;
  background-color: #d2f0f5;
}

small {
  color: gray;
}
</style>