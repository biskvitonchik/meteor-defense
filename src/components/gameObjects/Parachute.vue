<template>
  <div :class="['parachute', { 'parachute--big': isBig }]"></div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isBig: boolean;
}>();
</script>

<style scoped lang="scss">
.parachute {
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/images/parachute-small.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  pointer-events: none;

  &--big {
    background-image: url("/images/parachute-big.png");
  }
}
</style>
