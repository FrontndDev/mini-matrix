<template>
  <div class="matrix-activation-in-progress">
    <Preloader
        text="Идёт активация..."
        :with-text="true"
    />
  </div>
</template>

<script setup lang="ts">
import Preloader from "@/components/UI/Preloader/Preloader.vue";
</script>

<style scoped lang="scss">
@import "matrixActivationInProgress";
</style>