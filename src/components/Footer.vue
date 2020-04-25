<template>
  <footer id="footer">
    <div class="container">
      <div class="row">
        <div class="footer-title offset-md-2 col-md-4">
          <h6>各項連結</h6>
          <p>關於我們</p>
          <p>合作提案</p>
          <p>媒體版面</p>
          <p>新手上路 | 常見 Q&amp;A</p>
          <p>會員約定書</p>
        </div>

        <div class="footer-social-icon offset-md-1 col-md-5">
          <h6>連絡我們</h6>
          <div class="icon">
            <i class="fab fa-facebook-square"></i>
            <p>Facebook</p>
          </div>

          <div class="icon">
            <i class="fas fa-envelope"></i>
            <p>xxx@museclub.tw</p>
          </div>

          <div class="icon">
            <i class="fab fa-line"></i>
            <p>@xxxxxx</p>
          </div>

          <div class="icon">
            <i class="fab fa-facebook-messenger"></i>
            <p>私訊FB專頁</p>
          </div>

          <div class="icon">
            <i class="fas fa-phone-square-alt"></i>
            <p>(02)xxxx-xxxx (平日9:00~18:00)</p>
          </div>
        </div>

        <div class="footer-logistics col-12">
          <p>物流合作</p>
          <img
            style="width: 100px;"
            src="https://www.logolynx.com/images/logolynx/39/39a41016f188293d5de7ea4f854ff873.png"
          />
          &nbsp;
          <img
            style="width: 100px;"
            src="http://pic.pimg.tw/senseofvision/7937b7df062642055f33024a445972ca.jpg"
          />
        </div>

        <div class="footer-content mt-3 col-12">
          <p>&copy; 2019-2020 MuseClub | All Rights Reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  padding: 20px 0;
  text-align: center;
  background-color: #f7f8f8;
  color: rgb(112, 109, 109);
}

h6 {
  padding: 20px 0;
  text-align: left;
}

p {
  &:hover {
    transition: all 0.3s ease-in-out;
    color: #0085a5;
    cursor: pointer;
  }
}

.footer-title {
  p {
    text-align: left;
  }
}

.footer-content {
  p {
    line-height: 22px;
  }
}

.footer-social-icon {
  i {
    color: #0085a5;
    margin-right: 10px;
    margin-top: 4px;
  }
  .icon {
    display: flex;
  }
}
</style>