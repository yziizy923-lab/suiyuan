import { createRouter, createWebHistory } from 'vue-router'
import VideoIntro from '../views/VideoIntro.vue'
import Liuhen from '../views/Liuhen.vue'
import Login from '../views/Login.vue'
import LoginForm from '../views/LoginForm.vue'
import Register from '../views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'videoIntro',
      component: VideoIntro,
    },
    {
      path: '/liuhen',
      name: 'liuhen',
      component: Liuhen,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/login-form',
      name: 'loginForm',
      component: LoginForm,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
