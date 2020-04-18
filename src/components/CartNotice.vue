<template>
  <router-link to="/cart" class="cart-link">
    <div class="cartNotice" style="display: block; top: 450px; right: 30px; opacity: 1;">
      <table class="cartBG">
        <tbody>
          <tr>
            <td class="cartImage">
              <img src="https://trade.1111.com.tw/ProductImg/92/182392/182392_P_Pr9x5.jpg" />
              <br />
              <template v-if="cartItemNumber">
                <div class="row" style="display: flex; justify-content: center;">
                  <p style="color: red;">{{cartItemNumber}}&nbsp;</p>
                  <p>件商品</p>
                </div>
              </template>
              <template v-else>
                <div class="row" style="display: flex; justify-content: center;">
                  <p style="color: red;">0&nbsp;</p>
                  <p>件商品</p>
                </div>
              </template>
              <hr />
              <p>結帳去</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </router-link>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      scrolled: false
    };
  },
  computed: {
    ...mapState(["cartItemNumber"])
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const cartNotice = document.querySelector(".cartNotice");

      if (cartNotice) {
        this.scrolled = window.scrollY > 0;
        let scroll = window.scrollY;
        if (scroll > 250) {
          cartNotice.style.top = `${scroll + 200}px`;
        }
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

.cart-link {
  text-decoration: none;
  @include respond-and(768px) {
    display: none;
  }
}

hr {
  border-top: 1px solid gray;
}

p {
  color: #0085a5;
  font-size: 17px;
  @include respond-between(960px, 1100px) {
    font-size: 15px;
  }
  @include respond-between(768px, 960px) {
    font-size: 10px;
  }
}

.cartNotice {
  position: absolute;
  border: 1px;
  border-color: #000000;
  -moz-transition: all 1.5s;
  -webkit-transition: all 1.5s;
  -ms-transition: all 1.5s;
  -o-transition: all 1.5s;
  transition: all 1.5s;
  @include respond-between(960px, 1100px) {
    width: 8%;
  }
  @include respond-between(768px, 960px) {
    width: 6%;
  }
}

.cartBG {
  width: 100px;
  border-spacing: 0px;
  text-align: center;
  height: 44px;
  border: 1pt solid #cccccc;
  padding: 1px;
  border-collapse: separate;
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  margin: 20px 0 5px 0;
  @include respond-between(960px, 1100px) {
    width: 90px;
  }
  @include respond-between(768px, 960px) {
    width: 65px;
  }
  &:hover {
    border: 1.5pt solid #0085a5;
    background-color: #d2f0f5;
    transition: all 0.3s ease-in-out;
  }
}

.cartImage {
  text-align: center;
  vertical-align: bottom;
  border-bottom: 1px solid #ccc;
  padding: 0 0 8px 0;
  margin: 0;
  img {
    position: absolute;
    width: 100%;
    margin-top: -100px;
    background-color: transparent;
    -webkit-margin-start: 20px;
    left: -19px;
    @include respond-between(960px, 1100px) {
      margin-top: -80px;
    }
    @include respond-between(768px, 960px) {
      margin-top: -50px;
    }
  }
}
</style>