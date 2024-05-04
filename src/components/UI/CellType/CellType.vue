<template>
  <div class="cell-type" :class="[props.cellType, props.type, props.size]">
    <img :src="getIconPath" :alt="props.cellType">
  </div>
</template>

<script setup lang="ts">
import CumulativeIcon from '@/assets/svg/cumulative.svg';
import ProfitableIcon from '@/assets/svg/profitable.svg';
import InfinityIcon from '@/assets/svg/infinity.svg';
import BoosterIcon from '@/assets/svg/booster.svg';

import {
  computed,
  Ref
} from "vue";

const props = defineProps({
  cellType: {
    type: String,
    default: 'freeze'
  },
  type: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: ''
  }
});

const getIconPath: Ref<string> = computed(() => {
  switch (props.cellType) {
    case 'freeze':
      return CumulativeIcon;
    case 'profit':
      return ProfitableIcon;
    case 'infinity':
      return InfinityIcon;
    case 'boost':
      return BoosterIcon;
    default:
      return CumulativeIcon;
  }
});
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";
@import "@/assets/scss/mixins";

.cell-type {
  @include flex-center;
  width: 40px;
  height: 40px;
  border: 2px solid $border-base;
  border-radius: 12px;
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 8px;

  &.freeze,
  &.boost {
    background: $bg-blue;
  }

  &.profit {
    background: $bg-green;
  }

  &.infinity {
    background: $bg-orange;
  }

  &.disable,
  &.disable2 {
    background: #BFCCD9 !important;
  }

  &.small {
    top: 12px;
    right: 12px;
    width: 32px;
    height: 32px;
    border-radius: 8px;

    & > img {
      width: 16px;
      height: auto;
    }
  }

  &.boost {
    background: $bg-violet;
  }
}

@media (max-width: 992px) {
  .cell-type {
    @include flex-center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    top: 6px;
    right: 6px;

    & img {
      width: 16px;
      height: auto;
    }

    &.small {
      top: 6px;
      right: 6px;
    }
  }
}
</style>