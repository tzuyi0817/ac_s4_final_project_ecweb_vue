<template>
  <div class="product">
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="product-title col-12 row">
        <router-link to="/">首頁&nbsp;</router-link>
        <h6>&nbsp;&gt;&nbsp;</h6>
        <router-link
          :to="{ name: 'category-products', params: { id: categoryId }}"
        >&nbsp;{{categoryName}}&nbsp;</router-link>
        <h6>&nbsp;&gt;&nbsp;</h6>
        <h6 style="color: black;">&nbsp;{{product.name}}</h6>
      </div>

      <transition name="fade" mode="out-in">
        <div v-if="show" class="index-box row mt-3 col-12">
          <!-- 選取圖片 -->
          <div class="select-img-box col-lg-1 col-2">
            <img
              class="select-img"
              :src="product.image"
              alt="image"
              @mouseover="changeImg(product.image)"
            />
            <img
              class="select-img"
              :src="product.imageI"
              alt="image"
              @mouseover="changeImg(product.imageI)"
            />
            <img
              class="select-img"
              :src="product.imageII"
              alt="image"
              @mouseover="changeImg(product.imageII)"
            />
          </div>

          <!-- 商品圖片 -->
          <div class="index col-lg-5 col-10 mb-5">
            <img
              :src="productImg === '' ? productImg = product.image : productImg"
              width="100%"
              height="400vh"
              alt="image"
            />
          </div>

          <!-- 商品資訊 -->
          <ProductInformation
            :initial-product="product"
            :key="product.id"
            :Comments="Comments"
            :ratingAve="ratingAve"
          />
        </div>
      </transition>

      <!-- 相似商品 -->
      <div class="similar-products-title mt-5">
        <h5>推薦相似商品</h5>
      </div>

      <div class="similar-products-box mt-5 mb-5 col-12">
        <transition name="fade" mode="out-in">
          <div v-if="show" class="similar-products">
            <SimilarProducts
              v-for="product in similarProducts"
              :key="product.id"
              :initial-similar-product="product"
              :category-name="categoryName"
            />
          </div>
        </transition>
      </div>

      <!-- 商品簡介 -->
      <ProductDetails :initial-product="product" :key="product.id" />

      <section id="evaluation"></section>

      <!-- 商品評價 -->
      <div class="comment-title mt-5">
        <h5>商品評價</h5>
      </div>

      <transition name="fade" mode="out-in">
        <div v-if="show" class="comment-content mt-5">
          <div class="card-header col-12 mt-3">
            <div class="comment row">
              <!-- 無評價 -->
              <p v-if="Comments.length === 0" class="ml-1 mt-4 mr-4" style="color: orange;">0 / 5</p>
              <!-- 有評價 -->
              <p v-else class="ml-1 mt-4 mr-4" style="color: orange;">{{ratingAve}} / 5</p>
              <p class="commit-title mt-4 ml-1">
                <span style="color: rgb(185, 179, 179);">|</span>
                &nbsp;&nbsp;共有&nbsp;
                <span
                  class="commit-total-number"
                >{{Comments.length}}</span> &nbsp;則評價
              </p>
            </div>

            <!-- 商品平均評分 -->
            <div class="ml-3 mb-4">
              <span class="stars d-flex align-items-center ml-1">
                <span class="star" :inner-html.prop="ratingAve | star"></span>
              </span>
            </div>
          </div>
          <!-- 商品評論 -->
          <ProductReview
            :comments-pagination="commentsPagination"
            @after-delete-comment="afterDeleteComment"
          />
        </div>
      </transition>

      <!-- 評價分頁 -->
      <transition name="fade" mode="out-in">
        <template v-if="show">
          <commentPagination
            v-if="totalPage > 1"
            :current-page="currentPage"
            :total-page="totalPage"
          />
        </template>
      </transition>

      <div
        class="no-comments mt-5"
        style="text-align: center;"
        v-if="commentsPagination.length < 1"
      >此商品暫時無評價</div>

      <!-- 新增評論 CreateComment -->
      <CreateComment
        v-if="isAuthenticated"
        :product-id="product.id"
        @after-create-comment="afterCreateComment"
      />

      <!-- 購物車通知 -->
      <CartNotice />
    </template>
  </div>
</template>

<script>
import ProductInformation from "./../components/ProductInformation";
import ProductDetails from "./../components/ProductDetails";
import ProductReview from "./../components/ProductReview";
import CommentPagination from "./../components/CommentPagination";
import CreateComment from "./../components/CreateComment";
import SimilarProducts from "./../components/SimilarProducts";
import CartNotice from "./../components/CartNotice";
import Spinner from "./../components/Spinner";
import categoriesAPI from "./../apis/categories";
import { Toast } from "./../utils/helpers";
import { starFilter } from "./../utils/mixins";
import { mapState } from "vuex";

export default {
  mixins: [starFilter],
  components: {
    ProductInformation,
    ProductDetails,
    ProductReview,
    CommentPagination,
    CreateComment,
    SimilarProducts,
    CartNotice,
    Spinner
  },
  data() {
    return {
      categories: [],
      categoryId: -1,
      Comments: [],
      commentsPagination: [],
      ratingAve: -1,
      currentPage: 1,
      totalPage: -1,
      similarProducts: [],
      categoryName: "",
      product: {
        id: -1,
        ProductCategoryId: -1,
        name: "",
        image: "",
        imageI: "",
        imageII: "",
        price: -1,
        count: -1,
        description: "",
        Product_category: {
          name: ""
        }
      },
      isLoading: true,
      show: false,
      productImg: ""
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  // 使用 beforeRouteUpdate 方法取得使用者路由變化
  beforeRouteUpdate(to, from, next) {
    const { id: productId } = to.params;
    const { page } = to.query;
    this.fetchProduct({ productId, page });
    next();
  },
  created() {
    const { id: productId } = this.$route.params;
    const { page } = this.$route.query;
    this.fetchProduct({ productId, page });
  },
  methods: {
    async fetchProduct({ productId, page }) {
      try {
        this.show = false;
        const { data, statusText } = await categoriesAPI.getProduct({
          productId,
          page
        });

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.categories = data.categories;
        this.categoryId = data.categoryId;
        this.Comments = data.product.Comments;
        this.commentsPagination = data.comment;
        this.ratingAve = data.ratingAve;
        this.currentPage = data.page;
        this.totalPage = data.totalPage.length;
        this.similarProducts = data.productsFilter;
        this.categoryName = data.product.Product_category.name;
        this.product = {
          id: data.product.id,
          ProductCategoryId: data.product.ProductCategoryId,
          name: data.product.name,
          image: data.product.image,
          price: data.product.price,
          count: data.product.count,
          description: data.product.description,
          imageI: data.product.imageI,
          imageII: data.product.imageII
        };
        this.product.Product_category = {
          name: data.product.Product_category.name
        };
        this.isLoading = false;
        this.changeImg(data.product.image);
        this.show = true;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "無法取得商品資料，請稍後再試"
        });
      }
    },
    changeImg(img) {
      this.productImg = img;
    },
    afterDeleteComment() {
      if (this.isLoading === false) {
        setTimeout(() => {
          window.scrollTo({
            top: 1500,
            behavior: "auto"
          });
        }, 2000);
      }
    },
    afterCreateComment() {
      if (this.isLoading === false) {
        setTimeout(() => {
          window.scrollTo({
            top: 1500,
            behavior: "auto"
          });
        }, 2000);
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

.product {
  margin-bottom: 60px;
}

.index-box {
  padding: 0;
}

.index {
  @include respond-and(992px) {
    padding: 0 15px 0 5px;
  }
}

.card-header {
  background: linear-gradient(-40deg, #d2f0f5, #abe3ed) !important;
}

.similar-products-title,
.comment-title {
  padding: 0 0 0 15px;
}

.similar-products-box {
  padding: 0;
}

.similar-products {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
}

.commit-title {
  color: rgb(112, 109, 109);
}

.commit-total-number {
  color: #0085a5;
}

.no-comments {
  font-size: 16px;
}

.select-img-box {
  padding: 0;
}

.product-title {
  padding: 20px;
}

h6 {
  color: #918b8b;
  margin-top: 3px;
}

.select-img {
  margin-bottom: 15px;
  display: block;
  width: 70px;
  height: 53px;
  &:hover {
    border: 2px solid #0085a5;
    cursor: pointer;
  }
  @include respond-and(576px) {
    width: 65px;
    height: 48px;
    padding: 0 5px;
  }
}
</style>