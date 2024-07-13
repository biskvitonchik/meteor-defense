<template>
  <q-page>
    <PlayerName />
    <LifeCounter />
    <PlayerScore />
  </q-page>
</template>

<script setup lang="ts">
import PlayerName from "@/components/infoPanel/PlayerName.vue";
import LifeCounter from "@/components/infoPanel/LifeCounter.vue";
import PlayerScore from "@/components/infoPanel/PlayerScore.vue";
</script>
