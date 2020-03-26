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
          <p class="mt-4">&nbsp;{{item.Cart_item.quantity}}</p>
        </td>
        <!-- 小計 -->
        <td>
          <p class="mt-4">
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

.table {
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
    width: 70px;
    height: 50px;
  }
}

.item-name {
  margin-left: 10px;
  @include respond-and(768px) {
    display: none;
  }
}

p,
span,
th {
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

.money-symbol {
  @include respond-and(768px) {
    display: none;
  }
}
</style>
