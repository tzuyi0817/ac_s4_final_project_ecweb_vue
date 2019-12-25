<template>
  <table class="table">
    <thead>
      <tr>
        <th>&nbsp;&nbsp;&nbsp;商品</th>
        <th>價格</th>
        <th>數量</th>
        <th>小計</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in items" :key="item.id">
        <!-- 商品 -->
        <td>
          <div style="display: flow-root;">
            <img :src="item.image" class="card-img" alt="..." style="height: 100px;width: auto;" />
            <span class="ml-3">{{item.name}}</span>
          </div>
        </td>
        <!-- 價格 -->
        <td>
          <p class="mt-4">$ {{item.price}}</p>
        </td>
        <!-- 數量 -->
        <td>
          <p class="mt-4">&nbsp;{{item.Cart_item.quantity}}</p>
        </td>
        <!-- 小計 -->
        <td>
          <p class="mt-4">$ {{item.price*item.Cart_item.quantity}}</p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
};
</script>
