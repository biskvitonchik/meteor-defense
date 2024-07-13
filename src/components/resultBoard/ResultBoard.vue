<template>
  <q-page class="result-board flex flex-center">
    <q-card class="bg-grey">
      <q-card-section>
        <h1 class="text-h4 text-center">Игра окончена</h1>
        <p class="text-h5 text-center">Ваш счет: {{ gameStore.score }}</p>
      </q-card-section>
      <q-card-section>
        <h2 class="text-h5">Таблица рекордов:</h2>
        <q-list>
          <q-item v-for="result in gameStore.gameResults" :key="result.id">
            <q-item-section>{{ result.playerName }}</q-item-section>
            <q-item-section side>{{ result.score }}</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions class="flex flex-center">
        <q-btn color="primary" label="Играть снова" @click="playAgain" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useGameStore } from "@/stores/gameStore";
import { useRouter } from "vue-router";

const gameStore = useGameStore();
const router = useRouter();

const playAgain = () => {
  gameStore.resetGame();
  router.push("/");
};
</script>

<style scoped lang="scss">
.result-board {
  background-image: url("images/background-game-over.jpg");
  background-size: cover;
  background-position: center;
}
</style>
