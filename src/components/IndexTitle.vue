<template>
  <div>
    <div class="title row"></div>
    <div class="overlay">
      <h2>
        <strong>都市人的餐酒坊</strong>
      </h2>
      <div class="Introduction row d-flex">
        <p
          class="content"
        >MuseClub是一間實體結合線上的餐酒館，在線上，我們提供你，南美莊園原豆、法國酒莊葡萄酒與台灣本地小農食材；在實體概念店，我們用我們的食材做成精美的料理，並每周舉辦料理工作坊將異國的食材，與自己做料理，成為你的生活風格。</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Long+Cang&display=swap");

.title {
  height: 70vh;
  background: url(https://windagainstcurrent.files.wordpress.com/2014/04/dsc_0056-cropped-small.jpg);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  opacity: 0.8;
}

.overlay {
  padding: 60px;
  height: 70vh;
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h2 {
  font-family: "Long Cang", cursive;
}

.Introduction {
  text-align: center;
  padding: 30px 0;
}

.content {
  font-size: 25px;
}
</style>