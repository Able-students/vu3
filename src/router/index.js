import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('../views/ContactsView.vue')
    },
    {

      path: '/counter',
      name: 'counter',
      component: () => import('../views/CounterView.vue')
    },
    {

      path: '/qr',
      name: 'qr',
      component: () => import('../views/QRView.vue')
    },
  ]
})

export default router
