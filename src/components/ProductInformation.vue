<template>
  <div class="productInformation col-5 ml-3">
    <div class="card-body">
      <div class="row" style="display:flex; justify-content: center;">
        <!-- 商品名稱 -->
        <h5 class="card-title mb-4" style="text-align: center;">
          【
          <router-link
            class="categoryName"
            style="text-decoration: none; color: black;"
            :to="{ name: 'category-products', params: { id: product.ProductCategoryId }}"
          >{{product.Product_category.name}}</router-link>
          】{{product.name}}
        </h5>
      </div>

      <!-- 商品評分 -->
      <div class="row" style="display:flex; justify-content: center;">
        <div v-if="Comments.length === 0" class="no-comment mb-2 mr-3" style="color: red;">此商品尚未有人評價</div>
        <!-- 平均評分 -->
        <div v-else class="star row mr-5">
          <span class="stars d-flex align-items-center">
            <p class="mt-3" style="color: orange;">{{rating}}</p>&nbsp;
            <span class="star" :inner-html.prop="rating | star"></span>
          </span>
        </div>
        <router-link
          class="rating mr-3"
          to="#evaluation"
          style="text-decoration: none; color: black;"
        >
          |
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
      <h3 class="price mt-4 mb-5" style="text-align: center; color: #0085a5">$ {{product.price}}</h3>
      <!-- 滿額免運費 -->
      <div class="row" style="display:flex; justify-content: center;">
        <p class="mr-5" style="color: gray;">運送</p>
        <img
          src="https://cdngarenanow-a.akamaihd.net/shopee/shopee-pcmall-live-sg/assets/9d21899f3344277e34d40bfc08f60bc7.png"
          width="35"
          height="20"
          class="ml-2 mt-1"
        />
        <p class="ml-1">滿$999，</p>
        <p class="free mt-1" style="color: #ff5722;">免運費</p>
        <p class="ml-5">&nbsp;&nbsp;&nbsp;&nbsp;</p>
      </div>
      <!-- 運費 -->
      <div class="row mb-3" style="display:flex; justify-content: center;">
        <p>&nbsp;&nbsp;&nbsp;</p>
        <p class="ml-3 mr-5">
          <i class="fa fa-truck" aria-hidden="true" style="color: #0085a5"></i> 運費
        </p>
        <p class="ml-3">$ 60</p>
      </div>
      <!-- 加入購物車 -->
      <form @submit.stop.prevent="handleCart">
        <div class="row" style="display:flex; justify-content: center;">
          <p class="mr-5 mt-2" style="color: gray;">數量</p>

          <div class="selectQty mr-3">
            <input
              type="button"
              value="-"
              class="qtyMinus"
              field="quantity"
              @click="qtyMinus"
              :disable="minus"
            />
            <input type="text" name="quantity" class="qty" v-model.number="qty" @input="qtyValue" />
            <input
              type="button"
              value="+"
              class="qtyPlus"
              field="quantity"
              @click="qtyPlus"
              :disable="plus"
            />
          </div>
          <!-- 庫存數量 -->
          <p class="count mt-2" style="color: gray;">還剩 {{product.count}} 件</p>
        </div>

        <div class="cartBtn" style="display:flex; justify-content: center">
          <!-- 無庫存 -->
          <button v-if="product.count === 0" class="btn btn-danger mt-4 mr-2" :disabled="isDisable">
            <i class="fa fa-truck" aria-hidden="true"></i> 商品補貨中
          </button>
          <span v-if="product.count === 0" class="notice btn btn-primary mt-4">
            <i class="fa fa-envelope" aria-hidden="true"></i> 貨到通知我
          </span>
          <!-- 有庫存 -->
          <input v-if="product.count > 0" type="hidden" name="productId" :value="product.id" />
          <button
            v-if="product.count > 0"
            type="submit"
            class="btn btn-success mt-4 mr-2"
            :disabled="isProcessing"
          >
            <i class="fas fa-shopping-cart"></i> 加入購物車
          </button>
          <router-link v-if="product.count > 0" to="/cart" class="btn btn-primary mt-4">前往購物車 ></router-link>
        </div>
      </form>

      <!-- 到貨通知 -->
      <div class="modal">
        <div class="modal-content">
          <div style="float: right;">
            <span class="close">&times;</span>
          </div>

          <h5 class="mt-3" style="text-align: center; color: gray;">到貨通知</h5>

          <div class="modalTitle mt-2" style="text-align: center; color: gray;">
            商品名稱：
            <p style="color: red;">【{{product.Product_category.name}}】{{product.name}}</p>
          </div>

          <p>---------------------------------------</p>

          <form @submit.stop.prevent="handleNotice">
            <div class="email form-group row">
              <label style="color: gray;" for="inputEmail">電子郵件：&nbsp;</label>
              <input type="text" name="email" class="form" v-model="email" required autofocus />
            </div>
            <div class="email_confirm form-group row">
              <label style="color: gray;" for="inputEmail">確認電子郵件：&nbsp;</label>
              <input type="text" name="email_confirm" class="form" v-model="email_confirm" required />
            </div>

            <p>---------------------------------------</p>
            <p style="text-align: center; color: red;">*此功能僅為貨到通知，無法保留商品喔。</p>

            <div style="text-align: center;">
              <button
                class="btn btn-primary"
                :disabled="isProcessing"
              >{{ isProcessing ? "處理中..." : "送出" }}</button>
            </div>
          </form>
        </div>
      </div>
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
      type: Array,
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
    qtyMinus() {
      if (this.qty > 1) return this.qty--;
      return (this.minus = true);
    },
    qtyPlus() {
      if (this.qty >= this.product.count) return (this.plus = true);
      return this.qty++;
    },
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

        this.$store.commit("setCartItemNumber", this.qty);

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
  },
  mounted() {
    const modal = document.querySelector(".modal");
    const btn = document.querySelector(".notice");
    const span = document.querySelector(".close");

    // When the user clicks the button, open the modal
    btn.onclick = () => {
      modal.style.display = "block";
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = () => {
      modal.style.display = "none";
    };
  }
};
</script>

<style scoped>
.productInformation {
  font-family: "DFKai-sb";
}

.free {
  font-size: 16px;
}

/* ========= 數量增減按鍵 ========= */
.selectQty {
  text-align: center;
  padding: 5px;
  margin: 5px;
}

.qty {
  width: 70px;
  height: 30px;
  text-align: center;
  border: transparent;
  background-color: transparent;
}

input.qtyPlus,
input.qtyMinus {
  width: 33px;
  height: 33px;
  background-color: transparent;
  border: 1px solid rgb(182, 178, 178);
  border-radius: 5px;
}

input.qtyPlus {
  font-family: FontAwesome;
}

input.qtyPlus:hover,
input.qtyMinus:hover {
  cursor: pointer;
  background-color: #0085a5;
  transition: background-color 0.5s;
  color: white;
}

input.qtyPlus:active,
input.qtyMinus:active {
  background-color: #0085a5;
  box-shadow: 0 5px rgb(172, 169, 169);
  transform: translateY(4px);
}

/* ========= 到貨通知 modal =========*/
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
}

label {
  font-size: 16px;
}

.email {
  margin-left: 62px;
}

.email_confirm {
  margin-left: 30px;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

@media screen and (max-width: 1040px) {
  .facebook {
    margin-top: 5px;
  }

  .price {
    font-size: 30px;
  }

  .free {
    font-size: 12px;
  }

  h5 {
    font-size: 20px;
  }

  p,
  .btn-primary,
  button,
  input,
  .rating,
  .no-comment,
  .modalTitle,
  label {
    font-size: 15px;
  }

  input.qtyPlus,
  input.qtyMinus {
    width: 25px;
  }

  .modal {
    width: 115%;
    height: 100%;
  }

  label {
    font-size: 13px;
  }

  .email {
    margin-left: 45px;
  }

  .email_confirm {
    margin-left: 20px;
  }
}
</style>

<style>
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
