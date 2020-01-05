<template>
  <table class="table">
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
            <span class="ml-3">{{item.name}}</span>
          </div>
        </td>
        <!-- 價格 -->
        <td>
          <p class="mt-4">$ {{item.price}}</p>
        </td>
        <!-- 數量 -->
        <td>
          <div class="mt-4" style="display: flex;">
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              @click.stop.prevent="subCartItemFrom(item.Cart_item.id)"
            >-</button>

            <span style="margin: 0 20px;">{{item.Cart_item.quantity}}</span>

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
          <p class="mt-4">$ {{item.price*item.Cart_item.quantity}}</p>
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

        this.$store.commit("setCartItemNumber", -1);

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

        this.$store.commit("setCartItemNumber", 1);

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

        this.$store.commit("setCartItemNumber", -quantity);

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

<style scoped>
.card-img {
  width: auto;
  height: 100px;
}
@media screen and (min-width: 960px) and (max-width: 1040px) {
  th,
  p,
  span,
  .btn {
    font-size: 15px;
  }

  .btn-outline-secondary {
    width: 28px;
    height: 28px;
  }

  .card-img {
    width: 100px;
    height: 80px;
  }
}

@media screen and (min-width: 840px) and (max-width: 960px) {
  th,
  p,
  span,
  .btn {
    font-size: 10px;
  }

  .btn-outline-secondary {
    width: 28px;
    height: 28px;
  }

  .card-img {
    width: 80px;
    height: 60px;
  }
}
</style>