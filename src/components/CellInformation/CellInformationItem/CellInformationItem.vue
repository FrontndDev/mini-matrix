<template>
  <div class="cell-information-item" :class="theme" :style="{ padding: props.padding }">
    <div class="cell-information-item__icon">
      <component :is="props.item?.icon"/>
    </div>
    <div class="cell-information-item__content">
      <div class="cell-information-item__title">{{ props.item.title }}</div>
      <div class="cell-information-item__value" v-html="props.item?.value"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PropType
} from "vue";
import { ICellInformationItem } from "@/interfaces/store.interface.ts";

const props = defineProps({
  theme: {
    type: String,
    default: 'dark'
    // dark, light
  },
  item: {
    type: Object as PropType<ICellInformationItem>,
    required: true,
  },
  padding: {
    type: String,
    default: '12px',
  }
})
</script>

<style scoped lang="scss">
@import "cellInformationItem";
</style>