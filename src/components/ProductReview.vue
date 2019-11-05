<template>
  <div>
    <div class="list-group-item list-group-item-action ml-5 mt-2 col-10">
      <!-- <form
            action="/product/{{Product.id}}/rate/{{this.id}}?_method=DELETE"
            method="POST"
            style="float: right;"
          >
            <button type="submit" class="btn btn-danger">x</button>
      </form>-->

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
</template>

<script>
import { starFilter } from "./../utils/mixins";
import { fromNowFilter } from "./../utils/mixins";

export default {
  mixins: [starFilter, fromNowFilter],
  props: {
    initialComment: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      comment: this.initialComment
    };
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
</style>