<template>
  <div class="activate-button" style="cursor: pointer">
    <span>Активировать за {{ props.price }}</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M7.54778 12.9728C7.41077 12.894 7.29112 12.7763 7.20599 12.6197L3.01748 4.91596C2.68873 4.31129 3.12496 3.57406 3.81151 3.57406H7.54778V12.9728Z" fill="#29A352"/>
      <path d="M12.9826 4.91595L8.79404 12.6197C8.70891 12.7763 8.58927 12.894 8.45225 12.9728V3.57406H12.1885C12.8751 3.57406 13.3113 4.31129 12.9826 4.91595Z" fill="#29A352"/>
    </svg>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  price: {
    type: Number,
    required: true,
  }
})
</script>

<style scoped lang="scss">
@import "activateButton";
</style>