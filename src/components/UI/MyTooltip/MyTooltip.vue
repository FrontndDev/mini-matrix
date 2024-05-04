<template>
  <div class="my-tooltip" v-html="props.text"/>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: 'Подсказка'
  }
})
</script>

<style scoped lang="scss">
@import 'myTooltip';
</style>