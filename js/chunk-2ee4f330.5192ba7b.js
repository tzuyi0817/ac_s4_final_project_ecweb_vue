(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2ee4f330"],{"27a6":function(t,e,a){},"7d03":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"admin-navber-box"},[a("router-link",{attrs:{to:"/admin/index"}},[a("img",{staticClass:"logo mt-3",attrs:{src:"https://mitjobs.s3.amazonaws.com/uploads/organization/520/cover_photo/shopline-logo-white-on-blue.png",alt:""}})]),a("div",{staticClass:"col store_logo"},[a("div",{staticClass:"logoName"},[a("router-link",{staticClass:"text-center",attrs:{to:"/"}},[a("h5",{staticClass:"navbar-title"},[t._v("MuseClub")]),a("h5",{staticClass:"storename mt-2"},[t._v("繆斯俱樂部")])])],1)]),a("div",{staticClass:"w-100 store_nav"},[t._m(0),a("div",{staticClass:"collapse bg-secondary",attrs:{id:"saleModelNav"}},[a("router-link",{staticClass:"btn btn-secondary btn-block nav_item text-white",attrs:{to:"/admin/index"}},[t._v("商店基本資料")])],1),t._m(1),a("div",{staticClass:"collapse bg-secondary",attrs:{id:"productModelNav"}},[a("router-link",{staticClass:"btn btn-secondary btn-block nav_item text-white",attrs:{to:"/admin/productmodel/product_mange"}},[t._v("產品管理")]),a("router-link",{staticClass:"btn btn-secondary btn-block nav_item text-white",attrs:{to:"/admin/productmodel/order_mange"}},[t._v("訂單管理")]),a("router-link",{staticClass:"btn btn-secondary btn-block nav_item text-white",attrs:{to:"/admin/productmodel/deliveryNotice"}},[t._v("貨到通知管理")]),a("router-link",{staticClass:"btn btn-secondary btn-block nav_item text-white",attrs:{to:"/admin/coupon/managePage"}},[t._v("折價券管理")]),a("router-link",{staticClass:"btn btn-secondary btn-block nav_item text-white",attrs:{to:"/admin/coupon/makingPage"}},[t._v("新增折價券")])],1),t._m(2),a("div",{staticClass:"collapse bg-secondary",attrs:{id:"marketingModelNav"}},[a("router-link",{staticClass:"btn btn-secondary btn-block nav_item text-white",attrs:{to:"/admin/marketingmodel/track_code"}},[t._v("追蹤碼設定")])],1)])],1)},o=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("button",{staticClass:"btn btn-dark btn-block",attrs:{"data-toggle":"collapse",type:"button","data-target":"#saleModelNav"}},[a("i",{staticClass:"fas fa-clone"}),t._v(" 商家資料\n    ")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("button",{staticClass:"btn btn-dark btn-block",attrs:{"data-toggle":"collapse","data-target":"#productModelNav"}},[a("i",{staticClass:"fas fa-boxes"}),t._v(" 產品模組\n    ")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("button",{staticClass:"btn btn-dark btn-block",attrs:{"data-toggle":"collapse",href:"#marketingModelNav"}},[a("i",{staticClass:"fas fa-bullhorn"}),t._v(" 行銷模組\n    ")])}],n=(a("8d17"),a("2877")),s={},i=Object(n["a"])(s,r,o,!1,null,"34d57d9e",null);e["a"]=i.exports},"884b":function(t,e,a){"use strict";var r=a("8efc"),o=a.n(r);o.a},"8d17":function(t,e,a){"use strict";var r=a("27a6"),o=a.n(r);o.a},"8efc":function(t,e,a){},be6c:function(t,e,a){"use strict";a("6b54"),a("7f7f");var r=a("2fa3");e["a"]={getIndex:function(){return r["b"].get("/admin/index")},putStoreInfo:function(t){var e=t.name,a=t.description;return r["b"].put("/admin/index",{name:e,description:a})},getProductManagePage:function(t){var e=t.page,a=t.launched,o=new URLSearchParams({page:e,launched:a});return r["b"].get("/admin/productmodel/product_mange?".concat(o.toString()))},putProductLaunched:function(t){var e=t.productId,a=t.launched;return r["b"].put("/admin/productmodel/update?productId=".concat(e,"&launched=").concat(a),{productId:e,launched:a})},deleteProduct:function(t){var e=t.productId;return r["b"].delete("/admin/productmodel/delete/".concat(e),{productId:e})},getProduct:function(t){var e=t.productId;return r["b"].get("/admin/productmodel/update/".concat(e),{productId:e})},putProduct:function(t){var e=t.productId,a=t.formData;return r["b"].put("/admin/productmodel/update/".concat(e),a)},getProductCreatePage:function(){return r["b"].get("/admin/productmodel/create")},postProduct:function(t){var e=t.formData;return r["b"].post("/admin/productmodel/create",e)},getOrderManagePage:function(t){var e=t.page,a=t.orderstatusid,o=t.paymentstatusid,n=t.shipmentstatusid,s=t.orderer,i=new URLSearchParams({page:e,orderstatusid:a,paymentstatusid:o,shipmentstatusid:n,orderer:s});return r["b"].get("/admin/productmodel/order_mange?".concat(i.toString()))},getOrder:function(t){var e=t.orderId;return r["b"].get("/admin/productmodel/order_mange/".concat(e),{orderId:e})},putOrderStatus:function(t){var e=t.orderId,a=t.memo,o=t.OrderStatusId;return r["b"].put("/admin/productmodel/order_mange/".concat(e,"/oderstatus"),{orderId:e,memo:a,OrderStatusId:o})},putPaymentStatus:function(t){var e=t.orderId,a=t.PaymentTypeId,o=t.PaymentStatusId;return r["b"].put("/admin/productmodel/order_mange/".concat(e,"/payment_status"),{orderId:e,PaymentTypeId:a,PaymentStatusId:o})},putShipmentStatus:function(t){var e=t.orderId,a=t.ShipmentStatusId,o=t.ShipmentTypeId,n=t.name,s=t.phone,i=t.address;return r["b"].put("/admin/productmodel/order_mange/".concat(e,"/shipment_status"),{orderId:e,ShipmentStatusId:a,ShipmentTypeId:o,name:n,phone:s,address:i})},getDeliveryNotice:function(){return r["b"].get("/admin/productmodel/deliveryNotice")},deleteDeliveryNotice:function(t){var e=t.deliveryNoticeId;return r["b"].delete("/admin/productmodel/deliveryNotice/".concat(e),{deliveryNoticeId:e})},getCouponManagePage:function(){return r["b"].get("/admin/coupon/managePage")},getCouponEditPage:function(t){var e=t.couponId;return r["b"].get("/admin/coupon/managePage/".concat(e,"/edit"),{couponId:e})},postCouponEdit:function(t){var e=t.couponId,a=t.StoreId,o=t.couponTypeId,n=t.CouponDiscount,s=t.CouponDescription,i=t.available,c=t.expiredDate;return r["b"].post("/admin/coupon/edit",{couponId:e,StoreId:a,couponTypeId:o,CouponDiscount:n,CouponDescription:s,available:i,expiredDate:c})},postCouponMake:function(t){var e=t.storeId,a=t.couponTypeId,o=t.CouponDiscount,n=t.CouponDescription,s=t.expiredDate;return r["b"].post("/admin/coupon/make",{storeId:e,couponTypeId:a,CouponDiscount:o,CouponDescription:n,expiredDate:s})},getTrackCodePage:function(){return r["b"].get("/admin/marketingmodel/track_code")},putGaTrackCode:function(t){var e=t.storeId,a=t.trackGA;return r["b"].put("/admin/marketingmodel/track_code/ga_trackcode",{storeId:e,trackGA:a})}}},c5ee:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.isLoading?a("Spinner"):[a("div",{staticClass:"container-fluid admin_layout"},[a("div",{staticClass:"row"},[a("div",{staticClass:"navbar col-10 col-md-2 d-flex flex-column"},[a("AdminNavbar")],1),a("div",{staticClass:"editproduct col-md-8 col-11 bg-light p-1"},[a("div",{staticClass:"productmodel_editproduct col-12 py-3"},[a("form",{on:{submit:function(e){return e.stopPropagation(),e.preventDefault(),t.handleSubmit(e)}}},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[a("ul",{staticClass:"nav nav-tabs card-header-tabs",attrs:{id:"myTab",role:"tablist"}},[a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link active",attrs:{href:"#productImg","data-toggle":"tab",role:"tab"}},[t._v("主要圖片")])]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#productDetail","data-toggle":"tab",role:"tab"}},[t._v("商品資訊")])]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#productMountPrice","data-toggle":"tab",role:"tab"}},[t._v("價格與庫存數")])])])]),a("div",{staticClass:"card-body tab-content"},[a("div",{staticClass:"tab-pane fade show active",attrs:{id:"productImg",role:"tabpanel"}},[a("p",[t._v("商品主要圖片")]),a("hr"),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[t.product.image?a("img",{staticClass:"d-block img-thumbnail mb-3",attrs:{src:t.product.image,alt:"產品圖片"}}):t._e()]),a("div",{staticClass:"col"},[t.product.imageI?a("img",{staticClass:"d-block img-thumbnail mb-3",attrs:{src:t.product.imageI,alt:"產品圖片"}}):t._e()]),a("div",{staticClass:"col"},[t.product.imageII?a("img",{staticClass:"d-block img-thumbnail mb-3",attrs:{src:t.product.imageII,alt:"產品圖片"}}):t._e()])]),a("hr"),a("div",{staticClass:"img_preview"})]),a("div",{staticClass:"tab-pane fade",attrs:{id:"productDetail",role:"tabpanel"}},[a("p",[t._v("商品資訊")]),a("hr"),a("div",{staticClass:"product_title form-group"},[a("label",{attrs:{for:"product_name"}},[t._v("商品狀態")]),t.product.launched?a("select",{staticClass:"form-control",attrs:{name:"launched",id:"CategoryId",required:""}},[a("option",{attrs:{value:"",selected:"",disabled:""}},[t._v("--請選擇--")]),a("option",{attrs:{value:"0"}},[t._v("下架")]),a("option",{attrs:{value:"1",selected:"1"}},[t._v("上架")])]):a("select",{staticClass:"form-control",attrs:{name:"launched",id:"CategoryId"}},[a("option",{attrs:{value:"",selected:"",disabled:""}},[t._v("--請選擇--")]),a("option",{attrs:{value:"0",selected:"0"}},[t._v("下架")]),a("option",{attrs:{value:"1"}},[t._v("上架")])])]),a("div",{staticClass:"product_title form-group"},[a("label",{attrs:{for:"product_name"}},[t._v("商品類別")]),a("select",{directives:[{name:"model",rawName:"v-model",value:t.product.ProductCategoryId,expression:"product.ProductCategoryId"}],staticClass:"form-control",attrs:{name:"ProductCategoryId",id:"ProductCategoryId",required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.product,"ProductCategoryId",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:"",selected:"",disabled:""}},[t._v("--請選擇--")]),t._l(t.categories,(function(e){return a("option",{key:e.id,domProps:{value:e.id}},[t._v(t._s(e.name))])}))],2)]),a("div",{staticClass:"product_title form-group"},[a("label",{attrs:{for:"product_name"}},[t._v("商品名稱")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.product.name,expression:"product.name"}],staticClass:"form-control",attrs:{type:"text",name:"name",id:"name"},domProps:{value:t.product.name},on:{input:function(e){e.target.composing||t.$set(t.product,"name",e.target.value)}}})]),a("div",{staticClass:"product_description form-group"},[a("label",{attrs:{for:"product_description"}},[t._v("商品描述")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.product.description,expression:"product.description"}],staticClass:"form-control",attrs:{name:"description",id:"description",cols:"30",rows:"5"},domProps:{value:t.product.description},on:{input:function(e){e.target.composing||t.$set(t.product,"description",e.target.value)}}})])]),a("div",{staticClass:"tab-pane fade",attrs:{id:"productMountPrice",role:"tabpanel"}},[a("p",[t._v("價格和庫存數")]),a("hr"),a("div",{staticClass:"form-group price"},[a("label",{attrs:{for:""}},[t._v("價格")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.product.price,expression:"product.price"}],staticClass:"form-control",attrs:{name:"price",type:"text"},domProps:{value:t.product.price},on:{input:function(e){e.target.composing||t.$set(t.product,"price",e.target.value)}}})]),a("div",{staticClass:"form-group product_amount"},[a("label",{attrs:{for:""}},[t._v("數量")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.product.count,expression:"product.count"}],staticClass:"form-control",attrs:{name:"count",type:"text"},domProps:{value:t.product.count},on:{input:function(e){e.target.composing||t.$set(t.product,"count",e.target.value)}}})]),a("button",{staticClass:"btn btn-primary col-12 mt-3 mb-3",attrs:{type:"submit",disabled:t.isProcessing}},[t._v(t._s(t.isProcessing?"處理中...":"送出"))])])])])])])])])])]],2)},o=[],n=(a("8e6e"),a("ac6a"),a("456d"),a("96cf"),a("3b8d")),s=a("bd86"),i=a("7d03"),c=a("be6c"),d=a("2375"),u=a("2fa3"),l=a("2f62");function p(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function m(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?p(a,!0).forEach((function(e){Object(s["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):p(a).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var v={components:{AdminNavbar:i["a"],Spinner:d["a"]},data:function(){return{categories:[],product:{},isLoading:!0,isProcessing:!1}},computed:m({},Object(l["b"])(["currentUser","isAuthenticated"])),beforeRouteUpdate:function(t,e,a){var r=t.params.id;this.fetchAdminProduct({productId:r}),a()},created:function(){var t=this.$route.params.id;this.fetchAdminProduct({productId:t})},methods:{fetchAdminProduct:function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){var a,r,o,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.productId,t.prev=1,t.next=4,c["a"].getProduct({productId:a});case 4:if(r=t.sent,o=r.data,n=r.statusText,"OK"===n){t.next=9;break}throw new Error(n);case 9:this.product=o.product,this.categories=o.categories,this.isLoading=!1,t.next=18;break;case 14:t.prev=14,t.t0=t["catch"](1),this.isLoading=!1,u["a"].fire({type:"error",title:"無法取得商品資料，請稍後再試"});case 18:case"end":return t.stop()}}),t,this,[[1,14]])})));function e(e){return t.apply(this,arguments)}return e}(),handleSubmit:function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){var a,r,o,n,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,this.isProcessing=!0,a=e.target,r=new FormData(a),t.next=6,c["a"].putProduct({productId:this.product.id,formData:r});case 6:if(o=t.sent,n=o.data,s=o.statusText,"OK"===s&&"success"===n.status){t.next=11;break}throw new Error(s);case 11:u["a"].fire({type:"success",title:"資料修改成功"}),this.isProcessing=!1,this.$router.push("/admin/productmodel/product_mange"),t.next=20;break;case 16:t.prev=16,t.t0=t["catch"](0),this.isProcessing=!1,u["a"].fire({type:"error",title:"無法修改資料，請稍後再試"});case 20:case"end":return t.stop()}}),t,this,[[0,16]])})));function e(e){return t.apply(this,arguments)}return e}()}},b=v,g=(a("884b"),a("2877")),f=Object(g["a"])(b,r,o,!1,null,"2580b6ef",null);e["default"]=f.exports}}]);
//# sourceMappingURL=chunk-2ee4f330.5192ba7b.js.map