<template>
  <div
    class="first-aid-kit"
    :style="{ transform: `translate(${x}px, ${y}px)` }"
    @click="useFirstAidKit"
  ></div>
</template>

<script setup lang="ts">
import { useGameStore } from "@/stores/gameStore";

const gameStore = useGameStore();

const props = defineProps<{
  x: number;
  y: number;
}>();

const useFirstAidKit = () => {
  gameStore.boostHealthPoints();
};
</script>

<style scoped lang="scss">
.first-aid-kit {
  position: absolute;
  top: 0;
  width: 50px;
  height: 50px;
  background-image: url("/images/first_aid_kit.png");
  background-size: contain;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  will-change: transform
}
</style>
