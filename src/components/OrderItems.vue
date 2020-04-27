<template>
  <table class="table">
    <thead>
      <tr>
        <th>商品</th>
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
            <img :src="item.image" class="card-img" alt="..." />
            <span class="item-name">{{item.name}}</span>
          </div>
        </td>
        <!-- 價格 -->
        <td>
          <p class="mt-2">
            <span class="money-symbol">$</span>
            {{item.price}}
          </p>
        </td>
        <!-- 數量 -->
        <td>
          <p class="mt-2">&nbsp;{{item.Cart_item.quantity}}</p>
        </td>
        <!-- 小計 -->
        <td>
          <p class="mt-2">
            <span class="money-symbol">$</span>
            {{item.price*item.Cart_item.quantity}}
          </p>
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

span,
th {
  font-size: 16px;
}
</style>
