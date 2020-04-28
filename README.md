<h1 align="center">MuseClub</h1>
<p align="center">
  
  <br>
  <a href="https://tzuyi0817.github.io/ac_s4_final_project_ecweb_vue/#/"><strong>DEMO</strong></a>
  <br>
</p>

# About MuseClub project

E-commerce platform for single-brand stores.


# How to use

**1. Clone the project**
```
Click Clone or download on the upper right and copy URL
```
**2. Install the project**
```
Open the terminal and enter git clone 'URL just copied', and press enter
```
**3. Enter the project folder**
```
$ cd ac_s4_final_project_ecweb_vue
```
**4. Install packages via npm**
```
$ npm install
```
**5. Compiles and hot-reloads for development**
```
$ npm run serve
```


# User story

- **Front End**

  - Users can see all categories on the homepage
  - When users click on the category, they can see all the products in the category
  - Users can sort commodities according to the time they are available and the price
  - Users can share products to their Facebook wall
  - Users can comment and comment on products
  - Users can delete their own reviews and comments
  - Users can apply for arrival notification when the product is out of stock
  - Users can decide to increase the number of products to be added to the shopping cart on the single product page
  - The user can decide to reduce the number of products to be added to the shopping cart on the single product page

  **Cart**

  - Users can click on the shopping cart ICON to browse the shopping cart (products added to the shopping cart)
  - Users can put products into the shopping cart
  - Users can increase the number of products in the shopping cart on the shopping cart page
  - Users can reduce the number of products in the shopping cart on the shopping cart page
  - Users can delete items in the shopping cart on the shopping cart page
  - Users can input coupon serial number to discount the total price
  - When users want to pay, they need to log in first

  **Order**

  - Users can click on the shopping cart page to select the payment and shipping method to enter the order editing page
  - Users can modify the shipping information on the order editing page
  - Users can choose the payment method, online payment or cash on delivery
  - Users can pay online with a credit card
  - Users can choose the shipping method, home delivery or super business pick up
  - Users can choose the 7-11 storefront to pick up when they choose to pick up from the supermarket
  - Users can click checkout to generate orders
  - Users can see information about the order on the order establishment page
  - Users can see the order details on the profile page (current shipping status)
  - Users can cancel the order in the order details
  - After checking out, users will receive an email (confirm the order is established)

  **Registration and login**

  - User can register account
  - User can enter account and password to login


- **Admin** 

  - Users can view and edit business information
  - Users can get on and off products
  - Users can check products on the shelves
  - Users can add products
  - Users can modify product information
  - Users can view all orders
  - Users can filter by order status
  - Users can modify order information
  - Users can view the delivery notification application
  - Users can view discount coupon information
  - User can modify discount coupon information
  - Users can add discount coupons
  - User can set GA tracking code


# Project images

**Login page**
![image](https://github.com/tzuyi0817/ac_s4_final_project_ecweb_vue/blob/master/src/assets/登入頁面.png)

**Home page**
![image](https://github.com/tzuyi0817/ac_s4_final_project_ecweb_vue/blob/master/src/assets/首頁頁面.png)

**Product page**
![image](https://github.com/tzuyi0817/ac_s4_final_project_ecweb_vue/blob/master/src/assets/產品頁面.png)

**Back End page**
![image](https://github.com/tzuyi0817/ac_s4_final_project_ecweb_vue/blob/master/src/assets/後台頁面.png)

**Back End discount coupon page**
![image](https://github.com/tzuyi0817/ac_s4_final_project_ecweb_vue/blob/master/src/assets/後台折價券頁面.png)

**Back End discount coupon creation page**
![image](https://github.com/tzuyi0817/ac_s4_final_project_ecweb_vue/blob/master/src/assets/後台折價券建立頁面.png)


### Project files

Within the API document you will find the following directories and files:

```text
dist/
├── admin/
│   ├── getIndex
│   ├── putStoreInfo
│   ├── getProductManagePage
│   ├── putProductLaunched
│   ├── deleteProduct
│   ├── getProduct
│   ├── putProduct
│   ├── getProductCreatePage
│   ├── postProduct
│   ├── getOrderManagePage
│   ├── getOrder
|   ├── putOrderStatus
|   ├── putPaymentStatus
│   ├── putShipmentStatus
│   ├── getDeliveryNotice
|   ├── deleteDeliveryNotice
|   ├── getCouponManagePage
|   ├── getCouponEditPage
|   ├── postCouponEdit
│   ├── postCouponMake
│   ├── getTrackCodePage
|   └── putGaTrackCode
└── authorization/
│   ├── logIn
│   └── signUp
└── cart/
│   ├── postCart
│   ├── getCart
│   ├── addCartItem
│   ├── subCartItem
│   └── deleteCartItem
└── categories/
│   ├── getCategories
│   ├── getCategory
│   ├── getSearch
│   └── getProduct
└── comments/
│   ├── createComment
│   └── deleteComment
└── coupons/
│   ├── checkCoupon
│   └── getCouponOrderEdit
└── deliveryNotice/
│   ├── postDeliveryNotice
└── orders/
│   ├── getOrder
│   ├── postOrder
│   ├── getOrderSuccess
│   ├── getPayment
│   ├── getBranchSelection
│   └── cancelOrder
└── users/
    ├── getCurrentUser
    ├── getUserProfile
    ├── getUserProfileEdit
    └── postUserProfile
```
