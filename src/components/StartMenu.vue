<template>
  <q-page class="flex flex-center container">
    <q-card class="start-screen bg-grey">
      <q-form @submit="startGame">
        <q-card-section>
          <h1 class="text-h4 text-center">Метеоритная защита</h1>
        </q-card-section>

        <q-card-section>
          <p class="text-center">
            С неба падают метеориты. Защитите город, прикрепляя к ним парашюты!
            Кликните один раз по маленькому метеориту и два раза по большому. Не
            допустите падения метеоритов на землю!
          </p>
        </q-card-section>

        <q-card-section>
          <q-input filled v-model="playerName" label="Ваше имя" />
        </q-card-section>

        <q-card-actions class="justify-center">
          <q-btn
            type="submit"
            label="Старт"
            color="primary"
            :disable="!playerName.trim()"
            @click="startGame"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useGameStore } from "@/stores/gameStore";
import { useRouter } from "vue-router";

const router = useRouter();
const gameStore = useGameStore();

const playerName = ref<string>("");

const startGame = () => {
  gameStore.setPlayerName(playerName.value.trim());
  playerName.value = "";
  router.push("/game");
};
</script>

<style scoped lang="scss">
.start-screen {
  max-width: 400px;
}
.container {
  background-image: url("images/background-startScreen.jpg");
  background-size: cover;
  background-position: center;
  width: 100%;
}
</style>
