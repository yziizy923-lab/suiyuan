import { createRouter, createWebHistory } from 'vue-router'
import VideoIntro from '../views/VideoIntro.vue'
import Liuhen from '../views/Liuhen.vue'
import Login from '../views/Login.vue'
import LoginForm from '../views/LoginForm.vue'
import Register from '../views/Register.vue'
import AboutUs from '../views/AboutUs.vue'
import Menu from '../views/Menu.vue'
import PersonalCenter from '../views/PersonalCenter.vue'
import Test from '../views/Test.vue'
import History from '../views/History.vue'

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
      path: '/loginform',
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
    {
      path: '/aboutus',
      name: 'aboutUs',
      component: AboutUs,
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu,
    },
    {
      path: '/personal',
      name: 'personal',
      component: PersonalCenter,
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
    },
    {
<<<<<<< Updated upstream
=======
      path: '/travel',
      name: 'travel',
      component: Travel,
    },
    {
      path: '/location',
      name: 'locationDetail',
      component: LocationDetail,
    },
    {
>>>>>>> Stashed changes
      path: '/history',
      name: 'history',
      component: History,
      children: [
        {
          path: '',
          redirect: '/history/life'
        },
        {
          path: 'life',
          name: 'historyLife',
          component: History,
        },
        {
          path: 'food',
          name: 'historyFood',
          component: History,
        },
        {
          path: 'poetry',
          name: 'historyPoetry',
          component: History,
        },
      ],
    },
  ],
})

export default router
