<template>
  <q-card-section>
    <h2 class="text-h5">Таблица рекордов:</h2>
    <q-list>
      <q-item v-for="result in gameStore.gameResults" :key="result.id">
        <q-item-section>{{ result.playerName }}</q-item-section>
        <q-item-section side>{{ result.score }}</q-item-section>
      </q-item>
    </q-list>
  </q-card-section>
</template>

<script setup lang="ts">
import { useGameStore } from "@/stores/gameStore";

const gameStore = useGameStore();
</script>
