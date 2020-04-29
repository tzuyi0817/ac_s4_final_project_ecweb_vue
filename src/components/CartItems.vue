<template>
  <table class="table col-12">
    <thead>
      <tr>
        <th>商品</th>
        <th>價格</th>
        <th class="qty-th">數量</th>
        <th>小計</th>
        <th>刪除</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in items" :key="item.id">
        <!-- 商品 -->
        <td>
          <div style="display: flow-root;">
            <img :src="item.image" class="card-img" :alt="item.name" />
            <span class="item-name">{{item.name}}</span>
          </div>
        </td>
        <!-- 價格 -->
        <td>
          <p class="price mt-2">
            <span class="money-symbol">$</span>
            {{item.price}}
          </p>
        </td>
        <!-- 數量 -->
        <td>
          <div class="qyt-select" style="display: flex;">
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary mt-1"
              @click.stop.prevent="subCartItemFrom(item.Cart_item.id)"
            >
              <i class="fas fa-minus"></i>
            </button>

            <span class="quantity mt-2">{{item.Cart_item.quantity}}</span>

            <button
              type="button"
              class="btn btn-sm btn-outline-secondary mt-1"
              :disabled="overCount"
              @click.stop.prevent="addCartItemFrom(item.Cart_item.id, item.count, item.Cart_item.quantity)"
            >
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </td>
        <!-- 小計 -->
        <td>
          <p class="Subtotal">
            <span class="money-symbol">$</span>
            {{item.price*item.Cart_item.quantity}}
          </p>
        </td>
        <!-- 刪除 -->
        <td>
          <button
            type="button"
            class="btn btn-link"
            @click.stop.prevent="deleteCartItemFrom(item.Cart_item.id, item.Cart_item.quantity)"
          >
            <i class="fas fa-trash" style="color: #0085a5;"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import cartAPI from "./../apis/cart";
import { Toast } from "./../utils/helpers";

export default {
  inject: ["reload"],
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      overCount: false
    };
  },
  methods: {
    async subCartItemFrom(cartItemId) {
      try {
        const { data, statusText } = await cartAPI.subCartItem({ cartItemId });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        let cartItemNumberInLocalStorage = Number(
          localStorage.getItem("cartItemNumber")
        );

        if (cartItemNumberInLocalStorage > 0) {
          cartItemNumberInLocalStorage -= 1;
          localStorage.setItem("cartItemNumber", cartItemNumberInLocalStorage);
        }

        this.$store.commit("setCartItemNumber");

        this.reload();
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法刪減商品數量，請稍後再試"
        });
      }
    },
    async addCartItemFrom(cartItemId, count, quantity) {
      try {
        if (quantity === count) {
          this.overCount = true;
          Toast.fire({
            type: "warning",
            title: "此商品已無額外庫存"
          });
          return;
        }

        const { data, statusText } = await cartAPI.addCartItem({ cartItemId });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        let cartItemNumberInLocalStorage = Number(
          localStorage.getItem("cartItemNumber")
        );

        cartItemNumberInLocalStorage++;
        localStorage.setItem("cartItemNumber", cartItemNumberInLocalStorage);

        this.$store.commit("setCartItemNumber");

        this.reload();
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法增加商品數量，請稍後再試"
        });
      }
    },
    async deleteCartItemFrom(cartItemId, quantity) {
      try {
        const { data, statusText } = await cartAPI.deleteCartItem({
          cartItemId
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        let cartItemNumberInLocalStorage = Number(
          localStorage.getItem("cartItemNumber")
        );

        if (cartItemNumberInLocalStorage > 0) {
          cartItemNumberInLocalStorage -= quantity;
          localStorage.setItem("cartItemNumber", cartItemNumberInLocalStorage);
        }

        this.$store.commit("setCartItemNumber");

        Toast.fire({
          type: "success",
          title: "已成功移除商品"
        });

        this.reload();
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法移除商品，請稍後再試"
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

.card-img {
  width: 60px;
  height: 60px;
}

.item-name {
  margin-left: 10px;
  @include respond-and(768px) {
    display: none;
  }
}

.quantity {
  margin: 0 20px;
  @include respond-and(768px) {
    margin: 0 10px;
  }
}

th,
span,
.btn {
  font-size: 16px;
}

.qty-th {
  @include respond-and(768px) {
    text-align: center;
  }
}

.fa-minus,
.fa-plus {
  font-size: 10px;
}

.btn-outline-secondary {
  border: none;
}

.money-symbol {
  @include respond-and(992px) {
    display: none;
  }
}

.Subtotal {
  margin-top: 10px;
}
</style>