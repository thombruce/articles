import Vue from 'vue'
import VueRouter from 'vue-router'
import Articles from '../views/articles/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/articles'
  },
  {
    path: '/articles',
    name: 'Articles',
    component: Articles
  },
  {
    path: '/articles/new',
    name: 'NewArticle',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "newArticle" */ '../views/articles/New.vue')
  },
  {
    path: '/articles/:id',
    name: 'EditArticle',
    component: () => import(/* webpackChunkName: "showArticle" */ '../views/articles/Edit.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
