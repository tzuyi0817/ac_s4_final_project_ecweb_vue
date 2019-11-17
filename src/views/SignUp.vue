<template>
  <div class="container w-100 mb-5">
    <article class="half">
      <h1>Museclub</h1>
      <div class="tabs">
        <span class="tab signin">
          <router-link to="/users/logIn">登入</router-link>
        </span>
        <span class="tab signup active">
          <router-link to="/users/signUp">註冊</router-link>
        </span>
      </div>
      <div class="content">
        <div class="signin-cont cont">
          <form class="form-login" style="width: 100%;" @submit.prevent.stop="handleSubmit">
            <input
              v-model="name"
              type="name"
              name="name"
              id="name"
              class="inpt"
              placeholder="name"
              required
              autofocus
            />
            <label for="name">name</label>

            <input
              v-model="email"
              type="email"
              name="email"
              id="email"
              class="inpt"
              placeholder="email"
              required
            />
            <label for="email">email</label>

            <input
              v-model="password"
              type="password"
              name="password"
              id="password"
              class="inpt"
              placeholder="password"
              required
            />
            <label for="password">password</label>

            <input
              v-model="passwordConfirm"
              type="password"
              name="password_confirm"
              id="password_confirm"
              class="inpt"
              placeholder="password_confirm"
              required
            />
            <label for="password_confirm">password_confirm</label>

            <div class="submit-wrap">
              <input type="submit" value="註冊" class="submit" :disabled="isProcessing" />
            </div>
          </form>
        </div>
      </div>
    </article>
    <div class="half bg mb-5">
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
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      isProcessing: false
    };
  },
  methods: {
    async handleSubmit(e) {
      try {
        // 如果 name、email、passwordCheck 或 password 為空，則使用 Toast 提示
        // 然後 return 不繼續往後執行
        if (
          !this.name ||
          !this.email ||
          !this.password ||
          !this.passwordConfirm
        ) {
          Toast.fire({
            type: "warning",
            title: "請填入 name、email 和 password"
          });
          return;
        }

        // 如果 password 和 passwordConfirm 不相同，則使用 Toast 提示
        // 然後 return 不繼續往後執行
        if (this.password !== this.passwordConfirm) {
          // 將密碼欄位清空
          this.password = "";
          this.passwordConfirm = "";
          Toast.fire({
            type: "warning",
            title: "請確認 password 和 password_confirm 是否相同"
          });
          return;
        }

        this.isProcessing = true;

        const { data, statusText } = await authorizationAPI.signUp({
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirm: this.passwordConfirm
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.$router.push("/users/logIn");
      } catch (error) {
        // 將密碼欄位清空
        this.password = "";
        this.passwordConfirm = "";
        // 顯示錯誤提示
        Toast.fire({
          type: "warning",
          title: "您輸入的信箱已經註冊"
        });
        this.isProcessing = false;
      }
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Pacifico&display=swap");

.container {
  font-family: "DFKai-sb";
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;
}

h1 {
  font-family: "Pacifico", cursive;
  color: #0085a5;
  font-size: 35px;
  font-weight: 700;
  margin-bottom: 23px;
  text-align: center;
}

.half {
  float: left;
  width: 50%;
  height: 100%;
  padding: 58px 40px 0;
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

.tab a {
  font-size: 20px;
  text-decoration: none;
  text-transform: uppercase;
  color: gray;
  transition: all 0.1s ease-in-out;
}

a:hover,
.tab.active a {
  color: #0085a5;
}

.tab.active {
  border-bottom: 1px solid #0085a5;
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
}

input:focus {
  border-color: #0085a5;
}

input.submit {
  font-size: 20px;
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
}

input.submit:hover {
  background-color: #0085a5;
  color: #d9d9d9;
}

.more {
  color: gray;
}
</style>