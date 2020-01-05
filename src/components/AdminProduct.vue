<template>
  <tr>
    <th scope="row">
      <input type="checkbox" class="mt-4" />
    </th>
    <td style="width:10%">
      <img class="w-100 mt-4" :src="product.image" alt="產品圖片" />
    </td>
    <td>
      <p class="mt-4">{{product.name}}</p>
    </td>
    <td>
      <p class="mt-4">{{product.price}}</p>
    </td>
    <td>
      <p class="mt-4">{{product.count}}</p>
    </td>

    <td v-if="product.launched">
      <p class="mt-4">上架</p>
    </td>
    <td v-else>
      <p class="mt-4">下架</p>
    </td>

    <td>
      <div class="input-group">
        <div class="input-group-prepend">
          <router-link
            :to="{ name: 'AdminProductUpdate', params: {id: product.id} }"
            class="btn btn-outline-secondary mt-4"
          >編輯</router-link>

          <button
            type="button"
            class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split mt-4"
            data-toggle="dropdown"
          ></button>

          <div class="dropdown-menu">
            <template v-if="product.launched">
              <form @submit.stop.prevent="handleShelves(product.id, 0)">
                <button type="submit" class="dropdown-item" :disabled="isProcessing">下架</button>
              </form>
            </template>

            <template v-else>
              <form @submit.stop.prevent="handleShelves(product.id, 1)">
                <button type="submit" class="dropdown-item" :disabled="isProcessing">上架</button>
              </form>
            </template>

            <form @submit.stop.prevent="handleDelete(product.id)">
              <button class="dropdown-item" type="submit" :disabled="isProcessing">刪除</button>
            </form>
          </div>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import AdminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";

export default {
  inject: ["reload"],
  props: {
    initialProduct: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      product: this.initialProduct,
      isProcessing: false
    };
  },
  methods: {
    async handleShelves(productId, launched) {
      try {
        this.isProcessing = true;

        const { data, statusText } = await AdminAPI.putProductLaunched({
          productId,
          launched
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        if (launched === 0) {
          Toast.fire({
            type: "success",
            title: "商品已成功更改為下架"
          });
        } else {
          Toast.fire({
            type: "success",
            title: "商品已成功更改為上架"
          });
        }

        this.reload();

        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          type: "error",
          title: "商品無法上下架，請稍後再試"
        });
      }
    },
    async handleDelete(productId) {
      try {
        const { data, statusText } = await AdminAPI.deleteProduct({
          productId
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        Toast.fire({
          type: "success",
          title: "商品已成功刪除"
        });

        this.reload();
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "商品無法刪除，請稍後再試"
        });
      }
    }
  }
};
</script>

<style scoped>
@media screen and (min-width: 960px) and (max-width: 1040px) {
  .dropdown-menu,
  .input-group-prepend a,
  .btn {
    font-size: 15px;
  }
}

@media screen and (min-width: 840px) and (max-width: 960px) {
  .dropdown-menu,
  .input-group-prepend a,
  .btn {
    font-size: 10px;
  }
}
</style>