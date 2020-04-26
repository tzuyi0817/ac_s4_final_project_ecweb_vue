<template>
  <router-link to="/cart" class="cart-link">
    <div class="cartNotice" style="display: block; top: 450px; right: 30px; opacity: 1;">
      <table class="cartBG">
        <tbody>
          <tr>
            <td class="cartImage">
              <img
                src="https://thumbs.dreamstime.com/b/d-man-shopping-cart-trolley-illustration-pushing-empty-metal-rendering-human-people-character-57785129.jpg"
              />
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
@mixin respond-and($upper) {
  @media screen and (max-width: $upper) {
    @content;
  }
}

.cart-link {
  text-decoration: none;
  @include respond-and(1400px) {
    display: none;
  }
}

hr {
  border-top: 1px solid gray;
}

p {
  color: #0085a5;
  font-size: 16px;
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
    margin-top: -110px;
    background-color: transparent;
    -webkit-margin-start: 20px;
    left: -19px;
  }
}
</style>