<template>
  <div class="container">
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
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "@/stores/gameStore";
import { onMounted, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import InfoPanel from "@/components/infoPanel/InfoPanel.vue";
import Meteor from "@/components/gameObjects/Meteor.vue";
import FirstAidKit from "@/components/gameObjects/FirstAidKit.vue";

const gameStore = useGameStore();
const router = useRouter();

let gameLoop: number;

const startGameLoop = () => {
  gameStore.gameStep();
  gameLoop = requestAnimationFrame(startGameLoop);
};

onMounted(() => {
  gameStore.startGame();
  gameLoop = requestAnimationFrame(startGameLoop);
});

onUnmounted(() => {
  cancelAnimationFrame(gameLoop);
  gameStore.endGame;
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
</style>
