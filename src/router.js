import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/NotFound.vue'
import SignIn from './views/SignIn.vue'
import Index from './views/Index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/index'
    },
    {
      path: '/signin',
      name: 'sign-in',
      component: SignIn
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
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ]
})
