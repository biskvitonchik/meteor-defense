<template>
  <div
    :class="['meteor', { 'meteor--big': isBig }]"
    :style="{ top: `${y}px`, left: `${x}px`, opacity }"
    @click="handleClickForParachute"
  >
    <Parachute v-if="hasParachute" :is-big="isBig" />
  </div>
</template>

<script setup lang="ts">
import Parachute from "@/components/gameObjects/Parachute.vue";
import { useGameStore } from "@/stores/gameStore";

const gameStore = useGameStore();

const props = defineProps<{
  id: number;
  isBig: boolean;
  x: number;
  y: number;
  hasParachute: boolean;
  opacity: number;
}>();

const handleClickForParachute = () => {
  if (!props.hasParachute) {
    gameStore.increaseCountForParachute(props.id);
  }
};
</script>

<style scoped lang="scss">
.meteor {
  position: absolute;
  width: 50px;
  height: 50px;
  background-image: url("/images/meteorit-small.png");
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;

  &--big {
    width: 80px;
    height: 80px;
    background-image: url("/images/meteorit-big.png");
  }
}
</style>
