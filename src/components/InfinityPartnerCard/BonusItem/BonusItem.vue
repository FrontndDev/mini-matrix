<template>
  <div
      class="bonus-item"
      :class="[props.type, getWidth]"
      :style="props.type === 'boost' && values.length === 1 ? 'max-width: 67px' : ''"
  >
    <div class="bonus-item__icon">
      <TonIcon v-if="props.type === 'cashout'"/>
      <BoostIcon v-if="props.type === 'boost'"/>
      <AutoIcon v-if="props.type === 'custom'"/>
    </div>
    <div class="bonus-item__values" v-if="values.length > 1">
      <div
          class="bonus-item__value"
          v-for="value in values"
          :key="value"
          :title="String(value)"
      >{{ value }}</div>
    </div>
    <div
        class="bonus-item__value"
        :class="getWidth"
        :title="String(values[0])"
        v-if="values.length === 1"
    >{{ values[0] }}</div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import TonIcon from '@/assets/svg/bonuses/ton.svg?component';
// @ts-ignore
import BoostIcon from '@/assets/svg/bonuses/boost.svg?component';
// @ts-ignore
import AutoIcon from '@/assets/svg/bonuses/auto.svg?component';

import {
  computed,
  PropType,
  Ref
} from "vue";

const props = defineProps({
  type: {
    type: String,
    default: 'ton'
    //ton, boost, auto
  },
  values: {
    type: Array as PropType<(string | number)[]>,
    required: true,
  }
});

const getWidth: Ref<string> = computed(() => {
  if (props.values?.length === 1) {
    return 'width-first'
  } else if (props.values?.length === 2) {
    return 'width-second'
  } else {
    return 'width-third'
  }
})
</script>

<style scoped lang="scss">
@import "bonusItem";
</style>