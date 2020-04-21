<template>
  <div>
    <Spinner v-if="isLoading" />
    <template v-else>
      <IndexTitle />
      <!-- NavTabs -->
      <div class="row mt-5">
        <div class="col-md-2 col-sm-9 col-9 mt-5">
          <div class="nav flex-column">
            <div class="list-group">
              <router-link class="list-group-item list-group-item-action active" to="/">首頁</router-link>
            </div>

            <NavTabs
              v-for="category in categories"
              :key="category.id"
              :initial-category="category"
            />
          </div>
        </div>
        <!-- 首頁圖片 -->
        <div class="index col-md-10 row" @mouseover="stop()" @mouseout="move()">
          <div class="prev" @click="prevHandler">&lsaquo;</div>

          <transition name="fade" mode="out-in">
            <img v-if="show" :src="images[currentIndex].src" width="80%" height="80%" alt="image" />
          </transition>

          <div class="next" @click="nextHandler">&rsaquo;</div>
        </div>
      </div>

      <div class="bullet mb-5">
        <span
          v-for="item in images"
          :class="{ 'active' :item.id -1 === currentIndex }"
          :key="item.id"
          @click="change(item.id - 1)"
          @mouseover="stop()"
          @mouseout="move()"
        >{{item.id}}</span>
      </div>
      <!-- 網站簡介和商品類別 -->
      <div class="row">
        <div class="empty col-md-2"></div>
        <!-- 網站簡介 -->
        <div class="col-md-10">
          <div class="Introduction row d-flex mb-5 col-9">
            <p
              class="content"
            >MuseClub是一間實體結合線上的餐酒館，在線上，我們提供你，南美莊園原豆、法國酒莊葡萄酒與台灣本地小農食材；在實體概念店，我們用我們的食材做成精美的料理，並每周舉辦料理工作坊將異國的食材，與自己做料理，成為你的生活風格</p>
          </div>
          <!-- 商品類別 -->
          <div class="row mb-5">
            <IndexCategories
              v-for="category in categories"
              :key="category.id"
              :initial-category="category"
            />
          </div>
        </div>
      </div>
      <!-- 購物車通知 -->
      <CartNotice />
    </template>
  </div>
</template>

<script>
import IndexTitle from "./../components/IndexTitle";
import NavTabs from "./../components/NavTabs";
import IndexCategories from "./../components/IndexCategories";
import CartNotice from "./../components/CartNotice";
import Spinner from "./../components/Spinner";
import categoriesAPI from "./../apis/categories";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    IndexTitle,
    NavTabs,
    IndexCategories,
    CartNotice,
    Spinner
  },
  data() {
    return {
      categories: [],
      isLoading: true,
      images: [
        {
          id: 1,
          src:
            "http://www.newsancai.com/wp-content/uploads/2018/04/20180412D-640x400.jpg"
        },
        {
          id: 2,
          src:
            "https://cw1.tw/CH/images/channel_master/ffc08fce-a894-4f38-89d5-683375b41c31.jpg"
        },
        {
          id: 3,
          src:
            "https://www.walkerland.com.tw/image/poi/p78749/m60497/c3b71fe2f38ee676cded94d0e751a433bd648544.jpg"
        }
      ],
      currentIndex: 0,
      timer: null,
      show: true
    };
  },
  created() {
    this.fetchCategories();
    this.play();
  },
  methods: {
    async fetchCategories() {
      try {
        const { data, statusText } = await categoriesAPI.getCategories();

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.categories = data.categories;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "無法取得類別資料，請稍後再試"
        });
      }
    },
    nextHandler() {
      this.currentIndex++;
      if (this.currentIndex > 2) this.currentIndex = 0;
      this.show = !this.show;
      setTimeout(() => {
        this.show = !this.show;
      }, 1000);
    },

    prevHandler() {
      this.currentIndex--;
      if (this.currentIndex < 0) this.currentIndex = 2;
      this.show = !this.show;
      setTimeout(() => {
        this.show = !this.show;
      }, 1000);
    },
    autoPlay() {
      this.currentIndex++;
      if (this.currentIndex > 2) this.currentIndex = 0;
      this.show = !this.show;
      setTimeout(() => {
        this.show = !this.show;
      }, 1000);
    },
    play() {
      this.timer = setInterval(this.autoPlay, 4000);
    },
    change(i) {
      this.currentIndex = i;
      this.show = !this.show;
      setTimeout(() => {
        this.show = !this.show;
      }, 1000);
    },
    stop() {
      clearInterval(this.timer);
    },
    move() {
      this.timer = setInterval(this.autoPlay, 4000);
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin respond-between($lower, $upper, $font-size) {
  @media screen and (min-width: $lower) and (max-width: $upper) {
    font-size: $font-size;
  }
}

@mixin respond-and($upper) {
  @media screen and (max-width: $upper) {
    @content;
  }
}

.list-group-item {
  background-color: #0085a5;
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px) {
    font-size: 15px;
  }
}

.content {
  font-size: 30px;
  @include respond-between(960px, 1100px, 25px);
  @include respond-between(768px, 960px, 18px);
  @include respond-and(768px) {
    font-size: 15px;
  }
}

.Introduction {
  margin-left: 12px;
  white-space: normal;
  font-family: "Long Cang", cursive;
}

%common {
  width: 4%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(63, 64, 65, 0.7);
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  opacity: 0.2;
  &:hover {
    opacity: 0.8;
    transition: all 0.3s ease-in-out;
  }
}

.index {
  display: flex;
  align-items: center;
  @include respond-and(768px) {
    margin-top: 20px;
  }
  .prev {
    @extend %common;
    @include respond-between(960px, 1100px, 1.5rem);
    @include respond-between(768px, 960px, 1.3rem);
    @include respond-and(768px) {
      font-size: 1rem;
    }
    @include respond-and(600px) {
      font-size: 0.5rem;
    }
  }
  .next {
    @extend %common;
    @include respond-between(960px, 1100px, 1.5rem);
    @include respond-between(768px, 960px, 1.3rem);
    @include respond-and(768px) {
      font-size: 1rem;
    }
    @include respond-and(600px) {
      font-size: 0.5rem;
    }
  }
}

.bullet {
  display: flex;
  justify-content: center;
  margin-top: -15px;
  @include respond-and(768px) {
    margin-right: 100px;
    margin-top: 0px;
  }
}

span {
  background-color: rgba(210, 213, 216, 0.7);
  color: rgba(63, 64, 65, 0.7);
  padding: 8px 12px;
  margin-left: 10px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    background: #0085a5;
    color: white;
  }
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px) {
    font-size: 10px;
    padding: 4px 6px;
  }
}

.active {
  background: #0085a5;
  color: white;
}

// vue動畫
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>