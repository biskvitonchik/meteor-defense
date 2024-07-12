<template>
  <q-page class="life-counter absolute">
    <q-icon
      v-for="n in 5"
      :key="n"
      :name="n <= gameStore.lives ? 'favorite' : 'favorite_border'"
      color="red"
      size="24px"
    />
  </q-page>
</template>

<script setup lang="ts">
import { useGameStore } from "@/stores/gameStore";

const gameStore = useGameStore();
</script>

<style scoped lang="scss">
.life-counter {
  top: 60px;
  left: 7px;
}
</style>
