import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import StartScreen from '@/pages/StartScreen.vue'
import GameScreen from '@/pages/GameScreen.vue'
import ScoreScreen from '@/pages/ScoreScreen.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Start', component: StartScreen },
  { path: '/game', name: 'Game', component: GameScreen },
  { path: '/score', name: 'Score', component: ScoreScreen },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
