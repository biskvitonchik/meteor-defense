<template>
  <q-page>
    <InfoPanel />
    <Meteor
      v-for="meteor in gameStore.meteors"
      :key="meteor.id"
      :is-big="meteor.isBig"
      :x="meteor.x"
      :y="meteor.y"
      :has-parachute="meteor.hasParachute"
    />
  </q-page>
</template>

<script setup lang="ts">
import { useGameStore } from "@/stores/gameStore";
import { onMounted } from "vue";
import InfoPanel from "./infoPanel/InfoPanel.vue";
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
