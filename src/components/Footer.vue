<template>
  <footer id="footer">
    <div class="container mt-4">
      <p>YOUTUBE| 客服信箱 | 運費說明 | 常見QA | 隱私權及版權聲明</p>
      <div class="footer-logistics">
        <p>物流合作</p>
        <img
          style="width: 100px;"
          src="https://www.logolynx.com/images/logolynx/39/39a41016f188293d5de7ea4f854ff873.png"
        />
        <img
          style="width: 100px;"
          src="http://pic.pimg.tw/senseofvision/7937b7df062642055f33024a445972ca.jpg"
        />
      </div>

      <div class="footer-social-icon mt-3">
        <p>關注我們</p>
        <router-link to>
          <i class="fab fa-facebook-f"></i>
        </router-link>
        <router-link to>
          <i class="fab fa-twitter"></i>
        </router-link>
        <router-link to>
          <i class="fab fa-github-alt"></i>
        </router-link>
        <router-link to>
          <i class="fab fa-skype"></i>
        </router-link>
        <router-link to>
          <i class="fab fa-linkedin-in"></i>
        </router-link>
      </div>

      <div class="footer-content mt-3">
        <p>&copy; 2019-20 MuseClub | All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@mixin respond-between($lower, $upper, $font-size) {
  @media screen and (min-width: $lower) and (max-width: $upper) {
    font-size: $font-size;
  }
}

@mixin respond-and($upper, $font-size) {
  @media screen and (max-width: $upper) {
    font-size: $font-size;
  }
}

p {
  color: #0085a5;
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px, 15px);
}

footer {
  padding: 20px 0;
  text-align: center;
  background: linear-gradient(-40deg, #d2f0f5, #abe3ed) !important;
  color: #0085a5;
}

.footer-content {
  p {
    line-height: 22px;
  }
}

.footer-social-icon {
  a {
    i {
      color: #0085a5;
      display: inline-block;
      font-size: 20px;
      line-height: 20px;
      margin-right: 15px;
    }
  }
}
</style>