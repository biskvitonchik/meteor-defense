<template>
  <div class="flex flex-center container">
    <Meteor
      v-for="meteor in gameStore.meteors"
      :key="meteor.id"
      :is-big="meteor.isBig"
      :x="meteor.x"
      :y="meteor.y"
      :has-parachute="meteor.hasParachute"
    />
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "@/stores/gameStore";
import { onMounted } from "vue";
import Meteor from "@/components/gameObjects/Meteor.vue";

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
.container {
  width: 100%;
  height: 100vh;
  background-image: url("/images/city.svg");
  background-size: cover;
  background-position: bottom;
  position: relative;
  overflow: hidden;
}
</style>
