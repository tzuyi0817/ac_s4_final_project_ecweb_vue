<template>
  <div class="productInformation col-lg-6">
    <div class="card-body">
      <div class="row">
        <!-- 商品名稱 -->
        <h5 class="card-title" style="text-align: center;">
          【
          <router-link
            class="categoryName"
            style="text-decoration: none; color: black;"
            :to="{ name: 'category-products', params: { id: product.ProductCategoryId }}"
          >{{product.Product_category.name}}</router-link>
          】{{product.name}}
          <span v-if="product.id === 27" class="badge badge-danger">促銷中</span>
        </h5>
      </div>

      <!-- 商品評分 -->
      <div class="rating-box row">
        <div v-if="Comments.length === 0" class="no-comment mb-2" style="color: red;">此商品尚未有人評價</div>
        <!-- 平均評分 -->
        <div v-else class="av-star row">
          <span class="stars d-flex align-items-center">
            <p class="mt-3" style="color: orange;">{{rating}}</p>&nbsp;
            <span class="star" :inner-html.prop="rating | star"></span>
          </span>
        </div>
        <p style="color: rgb(185, 179, 179);">|&nbsp;&nbsp;</p>
        <router-link class="rating" to="#evaluation" style="text-decoration: none;">
          {{Comments.length}}
          評價
        </router-link>
        <!-- facebook分享 -->
        <iframe
          :src="facebook"
          width="69"
          height="28"
          style="border:none;overflow:hidden"
          scrolling="no"
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media"
          class="facebook"
        ></iframe>
      </div>
      <!-- 商品單價 -->
      <div class="price-box row">
        <h5>新台幣</h5>
        <h3 class="price" style="color: #0085a5">{{product.price}}</h3>
        <h5>元</h5>
      </div>

      <hr />

      <h6 class="transport">運送費用</h6>

      <!-- 運費 -->
      <div class="freight-box row">
        <p class="freight ml-1">
          <i class="fa fa-truck mr-1" aria-hidden="true" style="color: #0085a5"></i> 運費
        </p>
        <p class="ml-3" style="color: #0085a5">$ 60</p>
      </div>

      <!-- 滿額免運費 -->
      <div class="free-box row">
        <img
          src="https://cdngarenanow-a.akamaihd.net/shopee/shopee-pcmall-live-sg/assets/9d21899f3344277e34d40bfc08f60bc7.png"
          width="35"
          height="20"
          class="mr-1"
        />
        <p class="free-content">
          滿$999，
          <span class="free" style="color: #ff5722;">免運費</span>
        </p>
      </div>

      <hr />

      <!-- 加入購物車 -->
      <form @submit.stop.prevent="handleCart">
        <div class="qty-box">
          <h6 class="qty-title">數量</h6>

          <input
            type="number"
            name="quantity"
            class="qty"
            min="1"
            :max="product.count"
            v-model.number="qty"
            @input="qtyValue"
          />

          <!-- 庫存數量 -->
          <p class="count mt-2">
            還剩 {{product.count}} 件
            <span v-if="product.count === 0" style="color: #ff5722;">『商品補貨中』</span>
          </p>
        </div>

        <div class="cartBtn">
          <!-- 無庫存 -->
          <b-button
            v-if="product.count === 0"
            v-b-modal.modal-1
            class="notice col-12"
            variant="primary"
          >
            <i class="fa fa-envelope" aria-hidden="true"></i>&nbsp;&nbsp;貨到通知
          </b-button>
          <!-- 有庫存 -->
          <input v-if="product.count > 0" type="hidden" name="productId" :value="product.id" />
          <button
            v-if="product.count > 0"
            type="submit"
            class="btn btn-success col-12"
            :disabled="isProcessing"
          >
            <i class="fas fa-shopping-cart"></i>&nbsp;&nbsp;加入購物車
          </button>
        </div>
      </form>

      <!-- 到貨通知 -->
      <b-modal id="modal-1" title="到貨通知" hide-footer>
        <div class="modalTitle">
          商品名稱：
          <p style="color: red;">【{{product.Product_category.name}}】{{product.name}}</p>
        </div>

        <form @submit.stop.prevent="handleNotice">
          <div class="email form-group">
            <label style="color: gray;" for="inputEmail">電子郵件：</label>
            <input type="text" name="email" class="form col-12" v-model="email" required autofocus />
          </div>

          <div class="email_confirm form-group">
            <label style="color: gray;" for="inputEmail">確認電子郵件：</label>
            <input
              type="text"
              name="email_confirm"
              class="form col-12"
              v-model="email_confirm"
              required
            />
          </div>

          <p class="warning" style="text-align: center; color: red;">此功能僅為貨到通知，無法保留商品喔。</p>

          <div class="mb-4" style="text-align: center;">
            <button
              class="modal-btn btn btn-primary col-12"
              :disabled="isProcessing"
            >{{ isProcessing ? "處理中..." : "送出" }}</button>
          </div>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { starFilter } from "./../utils/mixins";
import deliveryNoticeAPI from "./../apis/deliveryNotice";
import cartAPI from "./../apis/cart";
import { Toast } from "./../utils/helpers";

export default {
  mixins: [starFilter],
  inject: ["reload"],
  props: {
    initialProduct: {
      type: Object,
      required: true
    },
    Comments: {
      type: Array,
      required: true
    },
    ratingAve: {
      type: Number
    }
  },
  data() {
    return {
      product: this.initialProduct,
      rating: this.ratingAve,
      facebook: `https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Ftzuyi0817.github.io%2Fac_s4_final_project_ecweb_vue%2F%23%2Fproduct%2F${this.initialProduct.id}&layout=button&size=large&width=69&height=28&appId`,
      isDisable: true,
      qty: 1,
      minus: false,
      plus: false,
      isProcessing: false,
      email: "",
      email_confirm: ""
    };
  },
  methods: {
    qtyValue() {
      if (this.qty >= this.product.count)
        return (this.qty = this.product.count);
      else if (this.qty < 0) return (this.qty = 1);
    },
    async handleNotice() {
      try {
        if (this.email !== this.email_confirm) {
          Toast.fire({
            type: "warning",
            title: "請確認輸入的電子郵件是否相同"
          });
          return;
        }

        this.isProcessing = true;

        const { data, statusText } = await deliveryNoticeAPI.postDeliveryNotice(
          {
            ProductId: this.initialProduct.id,
            email: this.email,
            email_confirm: this.email_confirm
          }
        );

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.isProcessing = false;
        // 送出申請後,欄位清空
        this.email = "";
        this.email_confirm = "";
        this.reload();

        Toast.fire({
          type: "success",
          title: "已送出申請，待補充庫存後，相關人員會寄e-mail通知您"
        });
      } catch (error) {
        this.isProcessing = false;

        Toast.fire({
          type: "error",
          title: "無法申請貨到通知，請稍後再試"
        });
      }
    },
    async handleCart() {
      try {
        this.isProcessing = true;

        const { data, statusText } = await cartAPI.postCart({
          productId: this.initialProduct.id,
          quantity: this.qty
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        let cartItemNumberInLocalStorage = Number(
          localStorage.getItem("cartItemNumber")
        );

        if (cartItemNumberInLocalStorage > 0) {
          cartItemNumberInLocalStorage += this.qty;
          localStorage.setItem("cartItemNumber", cartItemNumberInLocalStorage);
        } else {
          localStorage.setItem("cartItemNumber", this.qty);
        }

        this.$store.commit("setCartItemNumber");

        this.isProcessing = false;
        // 加入購物車後
        this.qty = 1;

        Toast.fire({
          type: "success",
          title: "商品已加入購物車"
        });
      } catch (error) {
        this.isProcessing = false;

        Toast.fire({
          type: "error",
          title: "商品無法加入購物車，請稍後再試"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin respond-and($upper) {
  @media screen and (max-width: $upper) {
    @content;
  }
}

.card-body {
  padding: 0 0 0 50px;
  @media screen and (max-width: 992px) {
    padding: 0;
  }
}

.rating-box {
  padding: 20px 0;
}

.price-box {
  padding: 20px 0 0 0;
}

.price {
  padding: 0 10px;
  margin-top: -3px;
}

.free {
  font-size: 16px;
}

.transport,
.freight-box,
.qty-box {
  padding: 5px 0;
}

.free-content {
  margin: 0;
}

p,
h6 {
  color: #918b8b;
}

.no-comment {
  font-size: 16px;
  margin-right: 12px;
}

.rating {
  font-size: 16px;
  margin-right: 12px;
  color: rgb(112, 109, 109);
  &:hover {
    transition: all 0.3s ease-in-out;
    color: #0085a5;
  }
}

.btn {
  font-size: 16px;
}

.av-star,
.btn-success,
.btn-danger {
  margin-right: 12px;
}
/* ========= 數量增減 ========= */

.qty {
  width: 130px;
  height: 38px;
  font-size: 16px;
  padding: 0 0 0 16px;
  background-color: transparent;
  border: 1px solid #918b8b;
}

/* ========= 到貨通知 modal =========*/
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap");

.email,
.email_confirm,
.modalTitle,
.warning,
.modal-btn {
  font-family: "Noto Sans TC", sans-serif;
}

.modalTitle {
  padding: 10px 0;
  text-align: center;
  p {
    padding: 10px 0;
  }
}

label,
.email,
.email_confirm {
  font-size: 16px;
}
</style>

<style lang="scss">
/* ========= 評價星星 ========= */
.star {
  position: relative;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

.stars {
  display: inline-block;
  width: 50%;
  height: 25px;
  vertical-align: middle;
}

i.fa-star-gray {
  color: #cbcbcb;
}

.percent-star {
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}

i.fa-star-yellow {
  color: #fcb040;
}

.star > .fa {
  font-size: 25px;
}
</style>
