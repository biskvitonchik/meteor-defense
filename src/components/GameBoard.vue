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
import { onMounted } from "vue";
import InfoPanel from "./infoPanel/InfoPanel.vue";
import Meteor from "@/components/gameObjects/Meteor.vue";
import FirstAidKit from "@/components/gameObjects/FirstAidKit.vue";

const gameStore = useGameStore();

let gameLoop: number;

const startGameLoop = () => {
  gameStore.gameStep();
  gameLoop = requestAnimationFrame(startGameLoop);
};

onMounted(() => {
  gameLoop = requestAnimationFrame(startGameLoop);
});
</script>

<style scoped lang="scss">
.contiuner {
  width: 100%;
  height: 100%;
  position: relative;
  outline: none;
}
</style>
