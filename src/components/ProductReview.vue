<template>
  <div class="comments col-md-9 col-10">
    <div v-for="comment in commentsPagination" :key="comment.id">
      <div class="list-group-item list-group-item-action mt-2">
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
            <p class="ml-5 mr-5 mt-2">{{comment.User.name}}</p>

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
  inject: ["reload"],
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

        this.reload();

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

<style lang="scss" scoped>
@mixin respond-between($lower, $upper, $font-size) {
  @media screen and (min-width: $lower) and (max-width: $upper) {
    font-size: $font-size;
  }
}

@mixin respond-and($upper) {
  @media screen and (max-width: $upper) {
    @content;
  }
}

.comments {
  margin-left: 60px;
  @include respond-and(768px) {
    margin-left: 30px;
  }
}

/* ====== User 的評論大頭照 ====== */
.avatar {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 50px;
  height: 50px;
  display: block;
  border-radius: 50%;
  @media screen and (min-width: 960px) and (max-width: 1100px) {
    width: 45px;
    height: 45px;
  }
  @media screen and (min-width: 768px) and (max-width: 960px) {
    width: 40px;
    height: 40px;
  }
  @include respond-and(768px) {
    width: 45px;
    height: 45px;
  }
}

small {
  color: gray;
  @include respond-between(960px, 1100px, 10px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px) {
    font-size: 10px;
  }
}

p {
  font-size: 18px;
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px) {
    font-size: 15px;
  }
}
</style>