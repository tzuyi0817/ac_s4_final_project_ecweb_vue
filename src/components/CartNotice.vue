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
                <div class="row">
                  <p style="color: red;">&nbsp;&nbsp;&nbsp;{{cartItemNumber}}&nbsp;</p>
                  <p style="color: #0085a5;">件商品</p>
                </div>
              </template>
              <template v-else>
                <div class="row">
                  <p style="color: red;">&nbsp;&nbsp;&nbsp;0&nbsp;</p>
                  <p style="color: #0085a5;">件商品</p>
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
  computed: {
    ...mapState(["cartItemNumber"])
  },
  mounted() {
    const cartNotice = document.querySelector(".cartNotice");

    window.addEventListener(
      "scroll",
      () => {
        this.scrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop ||
          document.querySelector(".element").scrollTop;

        if (this.scrollTop > 450 && this.scrollTop < 900) {
          cartNotice.style.top = "900px";
        } else if (this.scrollTop > 900 && this.scrollTop < 1350) {
          cartNotice.style.top = "1350px";
        } else if (this.scrollTop > 1350 && this.scrollTop < 1800) {
          cartNotice.style.top = "1800px";
        } else if (this.scrollTop > 1800 && this.scrollTop < 2250) {
          cartNotice.style.top = "2250px";
        } else if (this.scrollTop > 2250 && this.scrollTop < 2700) {
          cartNotice.style.top = "2700px";
        } else if (this.scrollTop > 2700 && this.scrollTop < 3150) {
          cartNotice.style.top = "3150px";
        } else if (this.scrollTop > 3150 && this.scrollTop < 3600) {
          cartNotice.style.top = "3600px";
        } else if (this.scrollTop > 3600 && this.scrollTop < 4050) {
          cartNotice.style.top = "4050px";
        } else if (this.scrollTop > 4050 && this.scrollTop < 4500) {
          cartNotice.style.top = "4500px";
        } else if (this.scrollTop > 4500 && this.scrollTop < 4950) {
          cartNotice.style.top = "4950px";
        } else if (this.scrollTop > 4950 && this.scrollTop < 5400) {
          cartNotice.style.top = "5400px";
        } else if (this.scrollTop > 5400 && this.scrollTop < 5850) {
          cartNotice.style.top = "5850px";
        } else if (this.scrollTop > 5850 && this.scrollTop < 6300) {
          cartNotice.style.top = "6300px";
        } else {
          cartNotice.style.top = "450px";
        }
      },
      true
    );
  }
};
</script>

<style scoped>
.cart-link {
  text-decoration: none;
}

hr {
  border-top: 1px solid gray;
}

p {
  font-family: "DFKai-sb";
  color: #0085a5;
  font-size: 17px;
}

.cartNotice {
  position: absolute;
  border: 1px;
  border-color: #000000;
}

.cartBG {
  width: 100px;
  border-spacing: 0px;
  text-align: center;
  height: 44px;
  border: 1pt solid #cccccc;
  padding: 1px;
  font-family: Arial, Helvetica, sans-serif, "新細明體";
  border-collapse: separate;
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  margin: 20px 0 5px 0;
}

.cartBG:hover {
  border: 1pt solid #0085a5;
  background-color: rgb(202, 245, 255);
  color: #0085a5;
}

.cartImage {
  text-align: center;
  vertical-align: bottom;
  border-bottom: 1px solid #ccc;
  padding: 0 0 8px 0;
  margin: 0;
}

.cartImage img {
  position: absolute;
  width: 100%;
  margin-top: -100px;
  background-color: transparent;
  -webkit-margin-start: 20px;
  left: -19px;
}

@media screen and (max-width: 1040px) {
  .cartNotice {
    width: 8%;
  }

  .cartImage img {
    margin-top: -80px;
  }

  p {
    font-size: 15px;
  }

  .cartBG {
    width: 90px;
  }
}
</style>