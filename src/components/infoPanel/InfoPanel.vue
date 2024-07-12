<template>
  <q-page>
    <PlayerName />
    <LifeCounter />
    <ScoreBoard />
  </q-page>
</template>

<script setup lang="ts">
import PlayerName from "@/components/infoPanel/PlayerName.vue";
import LifeCounter from "@/components/infoPanel/LifeCounter.vue";
import ScoreBoard from "@/components/infoPanel/ScoreBoard.vue";
</script>
