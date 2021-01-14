import Vue from 'vue'
import VueRouter from 'vue-router'

import isElectron from 'is-electron'

import Articles from '../views/articles/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/articles',
    name: 'Articles',
    alias: '/',
    component: Articles,
    children: [
      {
        path: '/articles/:id',
        name: 'EditArticle',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "editArticle" */ '../views/articles/Edit.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: isElectron() ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
