<template>
  <q-page class="score-board absolute text-white"> Игрок: {{ gameStore.playerName }} </q-page>
</template>

<script setup lang="ts">
import { useGameStore } from "@/stores/gameStore";

const gameStore = useGameStore();
</script>

<style scoped lang="scss">
.score-board {
  top: 5px;
  left: 10px;
  font-size: 20px;
  text-shadow: 1px 1px 2px black;
}</style>
