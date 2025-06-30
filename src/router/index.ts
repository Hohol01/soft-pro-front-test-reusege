import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import Collections from "@/pages/Collections.vue";



const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Collections
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
