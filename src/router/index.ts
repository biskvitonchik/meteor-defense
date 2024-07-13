import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import StartScreen from '@/pages/StartScreen.vue'
import GameScreen from '@/pages/GameScreen.vue'
import ResultScreen from '@/pages/ResultScreen.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Start', component: StartScreen },
  { path: '/game', name: 'Game', component: GameScreen },
  { path: '/results', name: 'Results', component: ResultScreen },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
