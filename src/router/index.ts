import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CompareView from '../views/CompareView.vue'
import DetailsView from '../views/DetailsView.vue' // Make sure this import is correct!

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/compare',
      name: 'compare',
      component: CompareView,
    },
    {
      path: '/details',
      name: 'details',
      component: DetailsView, // This is where you use the imported DetailsView
    },
  ],
})

export default router
