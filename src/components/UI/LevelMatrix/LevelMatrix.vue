<template>
  <div class="level-matrix" :class="{ 'without-level': props.level <= 0 }">
    <div>{{ typeTitle }}</div>
    <div v-if="props.level > 0">
      {{ props.level }}
      <span>lvl</span>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  typeTitle: {
    type: String,
    default: ''
  },
  level: {
    type: Number,
    default: 0
  },
})
</script>

<style scoped lang="scss">
@import "levelMatrix";
</style>