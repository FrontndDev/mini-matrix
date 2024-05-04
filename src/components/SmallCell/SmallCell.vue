<template>
  <div
      class="small-cell"
      :class="props.type"
  >
    <div
        class="small-cell__avatar"
        :class="props.type"
        @click="emit('open-m-matrix-partner')"
    >
      <div>
        <img alt="avatar" :src="props.cell?.owner?.photo">
      </div>

      <LevelMatrix
          :type-title="selectedTypeTitle"
          :level="useGetLevel(props.cell?.owner?.lvl_insystem)"
          v-if="showLevelMatrix"
      />

      <CellInformation
          class="small"
          :type="props.type"
          :tooltip-position="props.tooltipPosition"
          :ceil="props.cell"
          :user-type="props.userType"
          v-if="props.showCellInformation && !time"
      />
    </div>
    <div class="small-cell__info">
      <span
          class="small-cell__name"
          @click="emit('open-m-matrix-partner')"
      >{{ props.cell?.owner?.fio }}</span>
      <div
          class="small-cell__id"
          @click="useCopy(props.cell?.owner.id)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.34949 6.69832C3.02686 7.02095 2.83721 7.56687 2.83721 8.50233V10.8465C2.83721 11.782 3.02686 12.3279 3.34949 12.6505C3.67211 12.9731 4.21803 13.1628 5.15349 13.1628H7.49767C8.43313 13.1628 8.97905 12.9731 9.30168 12.6505C9.6243 12.3279 9.81395 11.782 9.81395 10.8465V8.50233C9.81395 7.56687 9.6243 7.02095 9.30168 6.69832C8.97905 6.3757 8.43313 6.18605 7.49767 6.18605H5.15349C4.21803 6.18605 3.67211 6.3757 3.34949 6.69832ZM2.75749 6.10633C3.31394 5.54988 4.13546 5.34884 5.15349 5.34884H7.49767C8.51571 5.34884 9.33723 5.54988 9.89367 6.10633C10.4501 6.66278 10.6512 7.48429 10.6512 8.50233V10.8465C10.6512 11.8645 10.4501 12.6861 9.89367 13.2425C9.33723 13.799 8.51571 14 7.49767 14H5.15349C4.13546 14 3.31394 13.799 2.75749 13.2425C2.20104 12.6861 2 11.8645 2 10.8465V8.50233C2 7.48429 2.20104 6.66278 2.75749 6.10633Z" fill="#7B879D"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.69832 3.34949C6.3757 3.67211 6.18605 4.21803 6.18605 5.15349V5.34884H7.49767C8.51571 5.34884 9.33723 5.54988 9.89367 6.10633C10.4501 6.66278 10.6512 7.48429 10.6512 8.50233V9.81395H10.8465C11.782 9.81395 12.3279 9.6243 12.6505 9.30168C12.9731 8.97905 13.1628 8.43313 13.1628 7.49767V5.15349C13.1628 4.21803 12.9731 3.67211 12.6505 3.34949C12.3279 3.02686 11.782 2.83721 10.8465 2.83721H8.50233C7.56687 2.83721 7.02095 3.02686 6.69832 3.34949ZM6.10633 2.75749C6.66278 2.20104 7.48429 2 8.50233 2H10.8465C11.8645 2 12.6861 2.20104 13.2425 2.75749C13.799 3.31394 14 4.13546 14 5.15349V7.49767C14 8.51571 13.799 9.33723 13.2425 9.89367C12.6861 10.4501 11.8645 10.6512 10.8465 10.6512H10.2326C10.0014 10.6512 9.81395 10.4637 9.81395 10.2326V8.50233C9.81395 7.56687 9.6243 7.02095 9.30168 6.69832C8.97905 6.3757 8.43313 6.18605 7.49767 6.18605H5.76744C5.53625 6.18605 5.34884 5.99863 5.34884 5.76744V5.15349C5.34884 4.13546 5.54988 3.31394 6.10633 2.75749Z" fill="#7B879D"/>
        </svg>
        <span>{{ props.cell?.owner.id }}</span>
      </div>
      <PartnerType
          :binstatus="'binstatus' in props.cell ? props.cell.binstatus[1] : []"
          :cellType="props.cellType"
          :type="props.cellType"
          :circles="'ceils' in props.cell ? props.cell.ceils['1'] : {}"
          @click="emit('open-m-matrix-partner')"
          v-if="props.cellType && props.showPartnerType && !matrixTypeIsDreamTon9"
      />
    </div>
    <SmallCellType
        :cellType="props.type"
        :state="props.state"
        :time="time"
        v-if="['boost', 'infinity', 'chains-boost'].includes(props.type) || time"
    />
  </div>
</template>

<script setup lang="ts">
import PartnerType from "@/components/PartnerCell/PartnerType/PartnerType.vue";
import LevelMatrix from "@/components/UI/LevelMatrix/LevelMatrix.vue";
import SmallCellType from "@/components/UI/SmallCellType/SmallCellType.vue";
import {
  PropType,
  computed,
  ComputedRef
} from "vue";
import {
  Matrix,
  Type
} from "@/interfaces/store.interface.ts";
import { useGetLevel } from "@/composables/useGetLevel.ts";
import { useStore } from "vuex";
import { useCopy } from "@/composables/useCopy.ts";
import CellInformation from "@/components/CellInformation/CellInformation.vue";
import { ITeleports } from "@/interfaces/chains.interface.ts";

const props = defineProps({
  cell: {
    type: Object as PropType<Matrix | ITeleports>,
    required: true,
  },
  cellType: {
    type: String,
    default: 'freeze'
  },
  type: {
    type: String,
    default: 'partners'
    // partners, boost, chains-boost, chain-partner, teleport, profitable
  },
  userType: {
    type: String,
    default: ''
  },

  state: {
    type: String,
    default: 'exhibited'
  },
  showPartnerType: {
    type: Boolean,
    default: true,
  },
  showCellType: {
    type: Boolean,
    default: true,
  },
  showLevelMatrix: {
    type: Boolean,
    default: true,
  },
  showCellInformation: {
    type: Boolean,
    default: true,
  },
  tooltipPosition: {
    type: String,
    // right, left
  }
})

const emit = defineEmits(['open-m-matrix-partner'])

const store = useStore()

const selectedTypeTitle: ComputedRef<string> = computed(() =>
    store.state.listOfTypes?.types
        .find((type: Type) => 'type' in props.cell && props.cell.type === type.type)?.title
)

const matrixTypeIsDreamTon9: ComputedRef<boolean> = computed(() =>
    'type' in props.cell && props.cell.type === 'dream-ton_9'
)

const time = computed(() => {
  if (!('time_to_activate' in props.cell)) {
    return ''
  }

  const timeToActivate = props.cell?.time_to_activate

  switch (true) {
    case !!timeToActivate?.years:
      return timeToActivate?.years + 'y'
    case !!timeToActivate?.months:
      return timeToActivate?.months + 'm'
    case !!timeToActivate?.days:
      return timeToActivate?.days + 'd'
    case !!timeToActivate?.hours:
      return timeToActivate?.hours + 'h'
    case !!timeToActivate?.mins:
      return timeToActivate?.mins + 'm'
    default:
      return ''
  }
})
</script>

<style scoped lang="scss">
@import "smallCell";
</style>