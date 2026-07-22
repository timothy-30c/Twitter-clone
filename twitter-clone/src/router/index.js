import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TimeLine from '../views/TimeLine.vue'
import LoginView from '../views/LoginView.vue'
import UserRegister from '../views/UserRegister.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: TimeLine,
    },
    {
      path: '/register',
      name: 'register',
      component: UserRegister
    }
  ],
})

export default router