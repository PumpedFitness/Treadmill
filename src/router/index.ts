import {createRouter, createWebHistory} from 'vue-router'
import { middleware } from '@/middleware.ts'
import HomeView from '@/views/home/HomeView.vue'
import MaintenanceModeView from '@/views/common/MaintenanceModeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DebugView from '@/views/debug/DebugView.vue'
import AppLayout from '@/layouts/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      component: AppLayout,
      children: [
        {
          path: "/training",
          name: "Training",
          component: HomeView
        },
        {
          path: "/home",
          name: "home",
          component: HomeView
        },
        {
          path: "/debug",
          name: "debug",
          component: DebugView
        },
      ]
    },
    {
      path: "/maintenance",
      name: "maintenance",
      component: MaintenanceModeView
    },
    {
      path: "/auth/login",
      name: "login",
      component: LoginView
    },
    {
      path: "/auth/register",
      name: "register",
      component: RegisterView
    },
  ],
})

router.beforeEach(async (to, from) => {
  return await middleware(to, from)
})

export default router
