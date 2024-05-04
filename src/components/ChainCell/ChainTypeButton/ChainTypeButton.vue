<template>
  <button v-if="props.type === 'default'" @click="$emit('open-general-chains')" class="chain-type-button">
    <span>Купить за {{ props.cost }}</span>
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.08838 12.4279C7.69782 13.5452 9.30215 13.5452 9.91159 12.4279L13.6347 5.60218C14.2192 4.53069 13.4436 3.22428 12.2231 3.22428H4.77687C3.55635 3.22428 2.78082 4.53069 3.36526 5.60218L7.08838 12.4279ZM9.20578 12.0429L12.9289 5.2172C13.2211 4.68146 12.8334 4.02825 12.2231 4.02825H8.90197V12.3558C9.02376 12.2859 9.13011 12.1816 9.20578 12.0429ZM7.79418 12.0429C7.86985 12.1816 7.9762 12.2859 8.098 12.3558V4.02825H4.77687C4.16661 4.02825 3.77884 4.68146 4.07107 5.2172L7.79418 12.0429Z" fill="#1A86E5"/>
    </svg>
  </button>
  <button @click="$emit('open-m-teleport')" v-else class="chain-type-button">
    <span>Телепорт</span>
    <svg class="arrow-rotate" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.73355 12.3999C6.53829 12.5952 6.22171 12.5952 6.02645 12.3999L1.97978 8.35327C1.88601 8.25951 1.83333 8.13233 1.83333 7.99972C1.83333 7.86711 1.88601 7.73993 1.97978 7.64617L6.02645 3.5995C6.22171 3.40424 6.53829 3.40424 6.73355 3.5995C6.92881 3.79476 6.92881 4.11135 6.73355 4.30661L3.04044 7.99972L6.73355 11.6928C6.92881 11.8881 6.92881 12.2047 6.73355 12.3999Z" fill="#1A86E5"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1665 7.99951C14.1665 8.27565 13.9426 8.49951 13.6665 8.49951H2.44646C2.17032 8.49951 1.94646 8.27565 1.94646 7.99951C1.94646 7.72337 2.17032 7.49951 2.44646 7.49951H13.6665C13.9426 7.49951 14.1665 7.72337 14.1665 7.99951Z" fill="#1A86E5"/>
    </svg>
  </button>
</template>

<script setup lang="ts">

const props = defineProps({
  type: {
    type: String,
    default: 'default'
  },
  cost: {
    type: Number,
    default: 0
  }
})

</script>

<style scoped lang="scss">
@import "chainTypeButton";
</style>