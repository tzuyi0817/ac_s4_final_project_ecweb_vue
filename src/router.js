import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/NotFound.vue'
import LogIn from './views/LogIn.vue'
import SignUp from './views/SignUp.vue'
import Index from './views/Index.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/index'
    },
    {
      path: '/users/logIn',
      name: 'logIn',
      component: LogIn
    },
    {
      path: '/users/signUp',
      name: 'signUp',
      component: SignUp
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/Category/:id',
      name: 'category-products',
      component: () => import('./views/CategoryProducts')
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('./views/Product')
    },
    {
      path: '/ESHOP/search',
      name: 'search',
      component: () => import('./views/Search')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('./views/Cart')
    },
    {
      path: '/orderEdit',
      name: 'OrderEdit',
      component: () => import('./views/OrderEdit')
    },
    {
      path: '/couponOrder/:id',
      name: 'CouponOrder',
      component: () => import('./views/CouponOrder')
    },
    {
      path: '/order/:id/success',
      name: 'OrderSuccess',
      component: () => import('./views/OrderSuccess')
    },
    {
      path: '/order/:id/payment',
      name: 'Payment',
      component: () => import('./views/Payment')
    },
    {
      path: '/order/:id/branchselection',
      name: 'BranchSelection',
      component: () => import('./views/BranchSelection')
    },
    {
      path: '/user/:id/profile',
      name: 'UserProfile',
      component: () => import('./views/UserProfile')
    },
    {
      path: '/user/:id/editProfile',
      name: 'EditProfile',
      component: () => import('./views/EditProfile')
    },
    {
      path: '/admin/index',
      name: 'AdminIndex',
      component: () => import('./views/AdminIndex')
    },
    {
      path: '/admin/productmodel/product_mange',
      name: 'AdminProducts',
      component: () => import('./views/AdminProducts')
    },
    {
      path: '/admin/productmodel/create',
      name: 'AdminProductCreate',
      component: () => import('./views/AdminProductCreate')
    },
    {
      path: '/admin/productmodel/update/:id',
      name: 'AdminProductUpdate',
      component: () => import('./views/AdminProductUpdate')
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ],
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      if (to.hash === '#evaluation') return { y: 2200 }
      if (to.hash === '#pagination') return { y: 550 }
      return {
        selector: to.hash
      };
    } else {
      return { x: 0, y: 0 };
    }
  }
})

router.beforeEach(async (to, from, next) => {
  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated

  // 比較 localStorage 和 store 中的 token 是否一樣
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  // 對於不需要驗證 token 的頁面
  const pathsWithoutAuthentication = ['index', 'signUp', 'category-products', 'product', 'search', 'cart']
  if (pathsWithoutAuthentication.includes(to.name)) {
    next()
    return
  }

  // 如果 token 無效則轉址到登入頁
  if (!isAuthenticated && to.name !== 'logIn') {
    next('/users/logIn')
    return
  }

  // 如果 token 有效則轉址到首頁
  if (isAuthenticated && to.name === 'logIn') {
    next('/index')
    return
  }

  next()
})

export default router
