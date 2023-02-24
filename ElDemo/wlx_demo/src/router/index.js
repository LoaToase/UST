import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
  {
    path: '/',
    name: 'MainPage',
    component: ()=> import('../views/MainPage.vue')
  },
  {
    path: '/shoppingcar',
    name: 'ShoppingCar',
    component: ()=> import('../views/ShoppingCar.vue')
  },
  {
    path: '/auction',
    name: 'Auction',
    component: ()=> import('../views/Auction.vue')
  },
  {
    path: '/newgoods',
    name: 'NewGoods',
    component: ()=> import('../views/NewGoods.vue')
  },
  {
    path: '/allgoods',
    name: 'AllGoods',
    component: ()=> import('../views/AllGoods.vue')
  },
  
  {
    path: '/collection',
    name: 'Collection',
    component: ()=> import('../views/Collection.vue')
  },
  {
    path: '/goodsPage',
    name: 'goodsPage',
    beforeEnter: goodsPageRoot,
    // beforeRouteLeave:beforeleave,
    component: ()=> import('../views/pathViews/goodsPage.vue')
  },
  {
    path: '/seller',
    name: 'seller',
    beforeEnter: goodsPageRoot,
    // beforeRouteLeave:beforeleave,
    component: ()=> import('../views/ViewsChild/sellerInfo.vue')
  },
  {
    path: '/chatPage',
    name: 'chatPage',
    beforeEnter: goodsPageRoot,
    component: ()=> import('../views/ViewsChild/chatPage.vue')
  },
  {
    path: '/AuctionPage',
    name: 'AuctionPage',
    component: ()=> import('../views/pathViews/AuctionPage.vue')
  },
  {
    path: '/KindPage',
    name: 'KindPage',
    // beforeEnter: goodsPageRoot,
    // beforeRouteLeave:beforeleave,AuctionPage KindPage
    component: ()=> import('../views/pathViews/KindPage.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: ()=> import('../views/pathViews/admin.vue')
  },
]

//商品页面的守卫路由，需要有商品logo点击才能进入
function goodsPageRoot(to,from,next){
  let pass = router.app.$store?.state?.ifIntoGoodsPage
  if(pass){
    next()
  }else{
    next('/')
  }
}
// function beforeleave(to, from, next) {
//   // 导航离开该组件的对应路由时调用
//   // 可以访问组件实例 `this`
//   console.log('关闭loading')
//   // this.loading = false
// }

const router = new VueRouter({
  routes
})

export default router
