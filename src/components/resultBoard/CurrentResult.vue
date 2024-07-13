<template>
  <q-card-section>
    <h1 class="text-h4 text-center">Игра окончена</h1>
    <p class="text-h5 text-center">Ваш счет: {{ gameStore.score }}</p>
  </q-card-section>
</template>

<script setup lang="ts">
import { useGameStore } from "@/stores/gameStore";

const gameStore = useGameStore();
</script>
