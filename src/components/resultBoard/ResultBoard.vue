<template>
  <q-page class="result-board flex flex-center">
    <q-card class="bg-grey">
      <CurrentResult />
      <q-separator />
      <ResultsTable />
      <BtnGameAgain @click="playAgain"/>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import CurrentResult from "@/components/resultBoard/CurrentResult.vue";
import ResultsTable from "@/components/resultBoard/ResultsTable.vue";
import BtnGameAgain from "@/components/resultBoard/BtnGameAgain.vue";
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
