<template>
  <tr>
    <td>
      <img class="image" :src="product.image" alt="產品圖片" />
    </td>
    <td class="name">
      <div class="td-box">
        <p>{{substring(product.name)}}</p>
      </div>
    </td>
    <td class="price">
      <div class="td-box">
        <p>{{product.price}}</p>
      </div>
    </td>
    <td class="count">
      <div class="td-box">
        <p>{{product.count}}</p>
      </div>
    </td>

    <td v-if="product.launched">
      <div class="td-box">
        <p>上架</p>
      </div>
    </td>
    <td v-else>
      <div class="td-box">
        <p>下架</p>
      </div>
    </td>

    <td>
      <div class="td-box">
        <div class="input-group">
          <div class="input-group-prepend">
            <router-link
              :to="{ name: 'AdminProductUpdate', params: {id: product.id} }"
              class="btn btn-outline-secondary"
            >編輯</router-link>

            <button
              type="button"
              class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
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
      type: Object,
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
    },
    substring(s) {
      if (s.length > 23) {
        return s.substring(0, 23) + "...";
      } else return s;
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

.td-box {
  height: 60px;
  display: flex;
  align-items: center;
}

.image {
  width: 60px;
  height: 60px;
}

.name {
  max-width: 260px;
}

.dropdown-menu,
.input-group-prepend a,
.btn {
  font-size: 16px;
}

p {
  margin-bottom: 0px;
}

.price,
.count {
  @include respond-and(992px) {
    display: none;
  }
}
</style>