<template>
  <q-page class="container">
    <GameBoard />
  </q-page>
</template>

<script setup lang="ts">
import GameBoard from "@/components/GameBoard.vue";
</script>
<style>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url("/images/city.svg");
  background-size: cover;
  background-position: bottom;
  overflow: hidden;
}
</style>
