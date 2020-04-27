<template>
  <div class="login-box row col-12">
    <article class="half col-lg-6">
      <h1>Museclub</h1>
      <div class="tabs">
        <span class="tab signin active">
          <router-link to="/users/logIn">登入</router-link>
        </span>
        <span class="tab signup">
          <router-link to="/users/signUp">註冊</router-link>
        </span>
      </div>
      <div class="content">
        <div class="signin-cont cont">
          <form class="form-login" style="width: 100%;" @submit.prevent.stop="handleSubmit">
            <input
              v-model="email"
              type="email"
              name="email"
              id="email"
              class="inpt"
              placeholder="Your email"
              required
              autofocus
            />
            <label for="email">Your email</label>

            <input
              v-model="password"
              type="password"
              name="password"
              id="password"
              class="inpt"
              placeholder="Your password"
              required
            />
            <label for="password">Your password</label>

            <input type="hidden" name="redirectUrl" v-model="redirectUrl" />

            <div class="submit-wrap mt-5">
              <input type="submit" value="登入" class="submit" :disabled="isProcessing" />
            </div>
          </form>
        </div>
      </div>
    </article>
    <div class="half bg col-lg-6">
      <img src="https://pbs.twimg.com/media/EHGMmkhW4Acstmt.jpg" />
    </div>
  </div>
</template>

<script>
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";

export default {
  data() {
    return {
      email: "",
      password: "",
      redirectUrl: "",
      isProcessing: false
    };
  },
  methods: {
    async handleSubmit() {
      try {
        // 如果 email 或 password 為空，則使用 Toast 提示
        // 然後 return 不繼續往後執行
        if (!this.email || !this.password) {
          Toast.fire({
            type: "warning",
            title: "請填入 email 和 password"
          });
          return;
        }

        this.isProcessing = true;

        const { data, statusText } = await authorizationAPI.logIn({
          email: this.email,
          password: this.password,
          redirectUrl: this.redirectUrl
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        // 將 token 存放在 localStorage 內
        localStorage.setItem("token", data.token);

        // 將資料傳到 Vuex 中
        this.$store.commit("setCurrentUser", data.user);

        // 返回購物車
        if (this.$route.query.redirect === "cart") {
          this.$router.push("/cart");
          return;
        }

        // 前往首頁
        this.$router.push("/index");

        Toast.fire({
          type: "success",
          title: "已成功登入"
        });
      } catch (error) {
        // 將密碼欄位清空
        this.password = "";
        // 顯示錯誤提示
        Toast.fire({
          type: "warning",
          title: "請確認您輸入的帳號密碼是否有誤"
        });
        this.isProcessing = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Pacifico&display=swap");

.login-box {
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;
  padding: 75px 0;
  margin-bottom: 50px;
}

h1 {
  font-family: "Pacifico", cursive;
  color: #0085a5;
  font-weight: 700;
  margin-bottom: 23px;
  text-align: center;
}

.tabs {
  width: 100%;
  margin-bottom: 29px;
  border-bottom: 1px solid #d9d9d9;
}

.tab {
  display: inline-block;
  margin-bottom: -1px;
  padding: 20px 15px 10px;
  cursor: pointer;
  letter-spacing: 0;
  border-bottom: 1px solid #d9d9d9;
  transition: all 0.1s ease-in-out;
}

.tab {
  a {
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    color: gray;
    transition: all 0.1s ease-in-out;
  }
}

a:hover,
.tab.active a {
  color: #0085a5;
  transition: all 0.8s ease-in-out;
}

.tab.active,
.tab:hover {
  border-bottom: 1px solid #0085a5;
  transition: all 0.8s ease-in-out;
}

form {
  position: relative;
  height: 287px;
}

label {
  display: none;
}

input {
  font-size: 16px;
  display: block;
  width: 100%;
  height: 50px;
  margin-bottom: 12px;
  padding: 16px 13px;
  color: #0085a5;
  border: 1px solid #d9d9d9;
  background: transparent;
  &:focus {
    border-color: #0085a5;
  }
}

input.submit {
  font-size: 16px;
  display: block;
  width: 100%;
  height: 55px;
  cursor: pointer;
  text-align: center;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #0085a5;
  border: 1px solid #0085a5;
  background: transparent;
  &:hover {
    background-color: #0085a5;
    color: #d9d9d9;
    transition: all 0.5s ease-in-out;
  }
}

.more {
  color: gray;
}

img {
  width: 100%;
}
</style>