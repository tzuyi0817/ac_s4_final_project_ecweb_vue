<template>
  <table class="table col-12">
    <thead>
      <tr>
        <th>&nbsp;&nbsp;&nbsp;商品</th>
        <th>價格</th>
        <th>&nbsp;&nbsp;&nbsp;數量</th>
        <th>小計</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in items" :key="item.id">
        <!-- 商品 -->
        <td>
          <div style="display: flow-root;">
            <img :src="item.image" class="card-img" alt="..." />
            <span class="item-name">{{item.name}}</span>
          </div>
        </td>
        <!-- 價格 -->
        <td>
          <p class="mt-4">
            <span class="money-symbol">$</span>
            {{item.price}}
          </p>
        </td>
        <!-- 數量 -->
        <td>
          <div class="qyt-select mt-4" style="display: flex;">
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              @click.stop.prevent="subCartItemFrom(item.Cart_item.id)"
            >-</button>

            <span class="quantity">{{item.Cart_item.quantity}}</span>

            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              :disabled="overCount"
              @click.stop.prevent="addCartItemFrom(item.Cart_item.id, item.count, item.Cart_item.quantity)"
            >+</button>
          </div>
        </td>
        <!-- 小計 -->
        <td>
          <p class="Subtotal mt-4">
            <span class="money-symbol">$</span>
            {{item.price*item.Cart_item.quantity}}
          </p>
        </td>
        <!-- 刪除 -->
        <td>
          <button
            type="button"
            class="btn btn-link mt-3"
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
@mixin respond-between($lower, $upper) {
  @media screen and (min-width: $lower) and (max-width: $upper) {
    @content;
  }
}

@mixin respond-and($upper) {
  @media screen and (max-width: $upper) {
    @content;
  }
}

table {
  margin-left: -15px;
}

.card-img {
  width: auto;
  height: 100px;
  @include respond-between(960px, 1100px) {
    width: 100px;
    height: 80px;
  }
  @include respond-between(768px, 960px) {
    width: 80px;
    height: 60px;
  }
  @include respond-and(768px) {
    width: 60px;
    height: 40px;
    margin-top: 20px;
  }
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
p,
span,
.btn {
  @include respond-between(960px, 1100px) {
    font-size: 15px;
  }
  @include respond-between(768px, 960px) {
    font-size: 10px;
  }
  @include respond-and(768px) {
    font-size: 10px;
  }
}

.btn-outline-secondary {
  @include respond-between(960px, 1100px) {
    width: 28px;
    height: 28px;
  }
  @include respond-between(768px, 960px) {
    width: 28px;
    height: 28px;
  }
  @include respond-and(768px) {
    width: 20px;
    height: 28px;
  }
}

.money-symbol {
  @include respond-and(768px) {
    display: none;
  }
}

.btn-link {
  @include respond-and(768px) {
    margin-left: -35px;
  }
}

.qyt-select {
  @include respond-and(768px) {
    margin-left: -20px;
  }
}

.Subtotal {
  margin-left: -10px;
}
</style>