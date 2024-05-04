<template>
  <div class="link">{{ props.name }}</div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: 'Ссылка'
  }
});
</script>

<style scoped lang="scss">
@import "link";
</style>