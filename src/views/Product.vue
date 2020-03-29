<template>
  <div class="product">
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="row mt-5 col-12">
        <!-- 商品圖片 -->
        <div class="index col-md-4 mb-5">
          <img :src="product.image" width="100%" alt="image" />
        </div>

        <!-- 商品資訊 -->
        <ProductInformation
          :initial-product="product"
          :key="product.id"
          :Comments="Comments"
          :ratingAve="ratingAve"
        />
      </div>

      <hr class="col-10" />

      <!-- 商品規格 -->
      <ProductSpecifications :initial-product="product" :key="'spec-' + product.id" />

      <!-- 商品詳情 -->
      <ProductDetails :initial-product="product" :key="product.id" />

      <hr class="col-10" />
      <section id="evaluation"></section>

      <!-- 商品評價 -->
      <div class="comment-title mt-5">
        <h5>商品評價</h5>
      </div>

      <div class="comment-content mt-5">
        <div class="card-header col-md-9 col-10 mt-3">
          <div class="comment row">
            <!-- 無評價 -->
            <p v-if="Comments.length === 0" class="ml-1 mt-4 mr-4" style="color: orange;">0 / 5</p>
            <!-- 有評價 -->
            <p v-else class="ml-1 mt-4 mr-4" style="color: orange;">{{ratingAve}} / 5</p>
            <p class="mt-4 ml-1" style="color: #0085a5;">| 共有 {{Comments.length}} 則評價</p>
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

      <!-- 評價分頁 -->
      <commentPagination v-if="totalPage > 1" :current-page="currentPage" :total-page="totalPage" />

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

      <hr class="mt-5 col-10" />

      <!-- 相似商品 -->
      <div class="similar-products-title mt-5">
        <h5>相似商品</h5>
      </div>

      <div class="similar-products-box mt-5 mb-5 col-md-10">
        <div class="row">
          <SimilarProducts
            v-for="product in similarProducts"
            :key="product.id"
            :initial-similar-product="product"
            :category-name="categoryName"
          />
        </div>
      </div>
      <!-- 購物車通知 -->
      <CartNotice />
    </template>
  </div>
</template>

<script>
// import NavTabs from "./../components/NavTabs";
import ProductInformation from "./../components/ProductInformation";
import ProductSpecifications from "./../components/ProductSpecifications";
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
    ProductSpecifications,
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
      isLoading: true
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
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "無法取得商品資料，請稍後再試"
        });
      }
    },
    afterDeleteComment() {
      if (this.isLoading === false) {
        setTimeout(() => {
          window.scrollTo({
            top: 2200,
            behavior: "smooth"
          });
        }, 2000);
      }
    },
    afterCreateComment() {
      if (this.isLoading === false) {
        setTimeout(() => {
          window.scrollTo({
            top: 2200,
            behavior: "smooth"
          });
        }, 2000);
      }
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

.index {
  margin-left: 25px;
  @include respond-and(768px) {
    margin-left: 0px;
    margin-top: 20px;
  }
}

.list-group-item {
  &:hover {
    color: white;
    background-color: #0085a5;
  }
}

hr {
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid #0085a5;
  margin-left: 25px;
  @include respond-and(768px) {
    margin-left: 5px;
  }
}

.card-header {
  background-color: #d2f0f5;
  margin-left: 60px;
  @include respond-and(768px) {
    margin-left: 25px;
  }
}

h5 {
  margin-left: 60px;
  @include respond-between(960px, 1100px, 20px);
  @include respond-between(768px, 960px, 15px);
  @include respond-and(768px) {
    font-size: 20px;
    margin-left: 15px;
  }
}

.comment {
  margin-left: 60px;
}

.similar-products-box {
  margin-left: 60px;
  @include respond-and(768px) {
    margin-left: 0px;
  }
}

.comment-title {
  margin-left: 30px;
  @include respond-and(768px) {
    margin-left: 15px;
  }
}

.comment-content {
  margin-left: 30px;
  @include respond-and(768px) {
    margin-left: 0px;
  }
}

.similar-products-title {
  margin-left: 30px;
  @include respond-and(768px) {
    margin-left: 15px;
  }
}

.no-comments {
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px) {
    font-size: 15px;
  }
}

p {
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px) {
    font-size: 15px;
  }
}

.product {
  @include respond-and(768px) {
    margin-left: -65px;
  }
}
</style>