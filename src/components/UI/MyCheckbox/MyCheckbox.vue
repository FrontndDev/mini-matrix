<template>
  <div
      class="my-checkbox"
      :class="{ active: props.value }"
      @click.stop="setValue"
  >
    <div class="my-checkbox__circle"/>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['set-value'])

const setValue = () => {
  emit('set-value', !props.value)
}
</script>

<style scoped lang="scss">
@import "myCheckbox";
</style>