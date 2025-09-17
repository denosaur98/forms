import { createWebHistory, createRouter } from 'vue-router'

import HomePage from '/src/pages/HomePage.vue'

const routes = [
  { path: '/', component: HomePage },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})