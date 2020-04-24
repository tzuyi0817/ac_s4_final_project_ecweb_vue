<template>
  <div>
    <Spinner v-if="isLoading" />
    <template v-else>
      <!-- NavTabs -->
      <div class="row">
        <div class="card col-lg-2">
          <div class="card-header">
            <p>全站分類</p>
          </div>

          <ul class="list-group list-group-flush">
            <router-link class="list-group-item list-group-item-action active" to="/">首頁</router-link>

            <NavTabs
              v-for="category in categories"
              :key="category.id"
              :initial-category="category"
            />
          </ul>
        </div>
        <!-- 首頁圖片 -->
        <div class="index col-lg-10">
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            background="#ababab"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <b-carousel-slide v-for="image in images" :key="image.id" :text="image.text">
              <template v-slot:img>
                <img class="index-img" width="1024" :src="image.src" alt="image slot" />
              </template>
            </b-carousel-slide>

            <ol class="indicators">
              <li
                v-for="item in images"
                :key="item.id"
                :class="{ 'active' :item.id - 1 === slide }"
                @click="oncChange(item.id - 1)"
              >
                <i class="fa fa-circle" aria-hidden="true"></i>
              </li>
            </ol>
          </b-carousel>
        </div>
      </div>
      <!-- 網站簡介和商品類別 -->
      <div class="row mt-3">
        <!-- 網站簡介 -->
        <div class="col-12">
          <IndexTitle />
          <!-- 商品類別 -->
          <div class="categories row">
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
          text: "烘焙咖啡使咖啡生豆的化學與物理性質轉變為已烘焙的咖啡製品。",
          src:
            "https://tshop.r10s.com/6c5/98a/16cf/7ab6/c022/392a/ec81/1198e787262c600c7376cd.jpg"
        },
        {
          id: 2,
          text: "葡萄酒是用新鮮葡萄果實或葡萄汁，經過發酵釀製而成的酒精飲料。",
          src:
            "https://storage.googleapis.com/winentaste-assets/images/article/special/special_uksaywine_vinotypesec_00.jpg"
        },
        {
          id: 3,
          text:
            "不使用化學合成農藥、化學合成肥料、基因改造生物、動物及植物生長調節劑等非天然物質的農產品。",
          src:
            "https://1.bp.blogspot.com/-CrzR_prJz4E/WnGVeBp9U8I/AAAAAAAAz04/SRo1-GPHS1AFxsF3KcoCbLBVTHipHELTgCLcBGAs/s1600/vegetables-343837_960_720.jpg"
        },
        {
          id: 4,
          src:
            "https://jooshop.url.com.tw/website/uploads/website_225/zh-tw/prod_sort_imgs_518_0.jpg"
        }
      ],
      show: true,
      slide: 0,
      sliding: null
    };
  },
  created() {
    this.fetchCategories();
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
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    oncChange(i) {
      this.slide = i;
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  padding: 0;
}

.card-header {
  color: #0085a5;
}

.list-group-item {
  background-color: #0085a5;
  font-size: 17px;
}

.categories {
  padding: 50px 0;
}

.indicators {
  z-index: 15;
  position: relative;
  display: flex;
  list-style-type: none;
  justify-content: center;
  align-items: flex-end;
  margin-top: 46.5%;
  margin-right: 40px;
  li {
    margin-right: 10px;
    opacity: 0.3;
    &:hover {
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      color: #0085a5;
      opacity: 0.7;
    }
  }
  .active {
    color: #0085a5;
    opacity: 0.7;
  }
}

.index {
  @media screen and (max-width: 992px) {
    margin-top: 20px;
  }
}

.index-img {
  height: 480px;
  @media screen and (min-width: 992px) and (max-width: 1200px) {
    height: 450px;
  }
  @media screen and (min-width: 768px) and (max-width: 992px) {
    height: 371px;
  }
  @media screen and (min-width: 576px) and (max-width: 768px) {
    height: 287px;
  }
  @media screen and (min-width: 550px) and (max-width: 576px) {
    height: 302px;
  }
  @media screen and (min-width: 500px) and (max-width: 550px) {
    height: 287px;
  }
  @media screen and (min-width: 450px) and (max-width: 500px) {
    height: 265px;
  }
  @media screen and (max-width: 450px) {
    height: 242px;
  }
}
</style>