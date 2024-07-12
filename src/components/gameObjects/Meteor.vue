<template>
  <div
    :class="['meteor', { 'meteor--big': isBig }]"
    :style="{ top: `${y}px`, left: `${x}px` }"
  ></div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isBig: boolean;
  x: number;
  y: number;
  hasParachute: boolean;
}>();
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
