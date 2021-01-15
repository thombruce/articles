import Vue from 'vue'
import VueRouter from 'vue-router'

import isElectron from 'is-electron'

import Notes from '../views/notes/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/notes',
    name: 'Notes',
    alias: '/',
    component: Notes,
    children: [
      {
        path: '/notes/:id',
        name: 'EditNote',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "editNote" */ '../views/notes/Edit.vue')
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
