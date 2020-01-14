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

<style scoped>
.card-img {
  width: auto;
  height: 100px;
}

.item-name {
  margin-left: 10px;
}

@media screen and (min-width: 960px) and (max-width: 1040px) {
  p,
  span,
  th {
    font-size: 15px;
  }

  .card-img {
    width: 100px;
    height: 80px;
  }
}

@media screen and (min-width: 840px) and (max-width: 960px) {
  p,
  span,
  th {
    font-size: 10px;
  }

  .card-img {
    width: 80px;
    height: 60px;
  }
}

@media screen and (max-width: 840px) {
  .table {
    margin-left: -10px;
  }

  th,
  p,
  span,
  .btn {
    font-size: 10px;
  }

  .btn-outline-secondary {
    width: 26px;
    height: 26px;
  }

  .card-img {
    width: 70px;
    height: 50px;
  }

  .item-name {
    margin-left: 0px;
  }

  .money-symbol {
    display: none;
  }
}
</style>
