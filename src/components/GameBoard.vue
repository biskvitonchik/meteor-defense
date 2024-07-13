<template>
  <div
    class="container"
    tabindex="0"
    @keydown.space.prevent="gameStore.togglePause"
    ref="gameBoard"
  >
    <InfoPanel />
    <Meteor
      v-for="meteor in gameStore.meteors"
      :key="meteor.id"
      :id="meteor.id"
      :is-big="meteor.isBig"
      :x="meteor.x"
      :y="meteor.y"
      :has-parachute="meteor.hasParachute"
      :opacity="meteor.opacity"
    />
    <FirstAidKit
      v-if="gameStore.firstAidKit"
      :x="gameStore.firstAidKit.x"
      :y="gameStore.firstAidKit.y"
    />
    <div v-if="gameStore.isPaused" class="pause">
      <h1>Пауза</h1>
      <p>Нажмите пробел, чтобы продолжить</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "@/stores/gameStore";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import InfoPanel from "@/components/infoPanel/InfoPanel.vue";
import Meteor from "@/components/gameObjects/Meteor.vue";
import FirstAidKit from "@/components/gameObjects/FirstAidKit.vue";

const gameStore = useGameStore();
const router = useRouter();
const gameBoard = ref<HTMLElement | null>(null);

let gameLoop: number;

const startGameLoop = () => {
  if (!gameStore.isPaused) {
    gameStore.gameStep();
  }
  gameLoop = requestAnimationFrame(startGameLoop);
};

onMounted(() => {
  gameStore.startGame();
  gameLoop = requestAnimationFrame(startGameLoop);
  if (gameBoard.value) {
    gameBoard.value.focus();
  }
});

onUnmounted(() => {
  cancelAnimationFrame(gameLoop);
  gameStore.endGame();
});

watch(
  () => gameStore.isGameOver,
  () => {
    cancelAnimationFrame(gameLoop);
    gameStore.endGame();
    gameStore.saveResult();
    router.push("/results");
  }
);
</script>

<style scoped lang="scss">
.contiuner {
  width: 100%;
  height: 100%;
  position: relative;
  outline: none;
}
.pause {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
}
</style>
