<template>
  <div class="savings">
    <div class="savings__title">
      {{ getTitle }}
    </div>

    <div class="savings__partners savings__partners_mt-16">
      <!--   FIRST CEIL    -->
      <PartnerCell
          :type="getTypeForFirstCeil"
          :cell-type="getTypeForFirstCeil"
          :ceil="firstCeil.matrix"
          :fill-reward="firstCeil.fillRevard"
          :is-booster="firstCeil?.matrix.is_booster"
          :user-type="firstCeil?.informer.userType"
          v-if="firstCeil?.matrix && !firstCeil.queueId"
          @open-m-matrix-partner="openMMatrixPartner(firstCeil)"
      />
      <AddPartnerCell
          :automatic-placement="isAutomaticPlacement(firstCeil)"
          :type="getTypeForFirstCeil"
          :cell-type="getCellTypeFirstCeil"
          :ceil="firstCeil"
          :partners-count="partnersCount"
          :title="getTitleForFirstCell"
          :subtitle="getDisabledSubtitleForFirstCell"
          :disabled-subtitle="getCellTypeFirstCeil === 'freeze' ? 'Накопительная ячейка' : 'Доходная ячейка'"
          v-if="!firstCeil?.matrix || firstCeil.queueId"
          @open-m-add-partner="openMAddPartner(getPosition(firstCeil.depth, firstCeil.pos))"
      >
        <template #subtitleIcon v-if="(!firstCeil?.allowSniper || !partnersCount) && firstCeil?.allowBuyClone">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.08823 12.4278C7.69766 13.5451 9.302 13.5451 9.91143 12.4278L13.6345 5.60209C14.219 4.5306 13.4435 3.22419 12.2229 3.22419H4.77671C3.55619 3.22419 2.78066 4.5306 3.36511 5.60209L7.08823 12.4278ZM9.20563 12.0428L12.9287 5.21711C13.221 4.68137 12.8332 4.02816 12.2229 4.02816H8.90181V12.3557C9.02361 12.2858 9.12996 12.1816 9.20563 12.0428ZM7.79403 12.0428C7.8697 12.1816 7.97605 12.2858 8.09784 12.3557V4.02816H4.77671C4.16645 4.02816 3.77869 4.68137 4.07091 5.21711L7.79403 12.0428Z" fill="#7B879D"/>
          </svg>
        </template>
      </AddPartnerCell>

      <!--   SECOND CEIL    -->
      <PartnerCell
          :type="getTypeForSecondCeil"
          :cell-type="getTypeForSecondCeil"
          :ceil="secondCeil.matrix"
          :fill-reward="secondCeil.fillRevard"
          :is-booster="secondCeil?.matrix.is_booster"
          :user-type="secondCeil?.informer.userType"
          v-if="secondCeil?.matrix && !secondCeil.queueId"
          @open-m-matrix-partner="openMMatrixPartner(secondCeil)"
      />
      <AddPartnerCell
          :automatic-placement="isAutomaticPlacement(secondCeil)"
          :type="getTypeForSecondCeil"
          :cell-type="getCellTypeSecondCeil"
          :ceil="secondCeil"
          :partners-count="partnersCount"
          :title="getTitleForSecondCell"
          :subtitle="getSubtitleForSecondCell"
          :disabled-subtitle="getDisabledSubtitleForSecondCell"
          v-if="!secondCeil?.matrix || secondCeil.queueId"
          @open-m-add-partner="openMAddPartner(getPosition(secondCeil.depth, secondCeil.pos))"
      >
        <template #subtitleIcon v-if="(!secondCeil?.allowSniper || !partnersCount) && secondCeil?.allowBuyClone">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.08823 12.4278C7.69766 13.5451 9.302 13.5451 9.91143 12.4278L13.6345 5.60209C14.219 4.5306 13.4435 3.22419 12.2229 3.22419H4.77671C3.55619 3.22419 2.78066 4.5306 3.36511 5.60209L7.08823 12.4278ZM9.20563 12.0428L12.9287 5.21711C13.221 4.68137 12.8332 4.02816 12.2229 4.02816H8.90181V12.3557C9.02361 12.2858 9.12996 12.1816 9.20563 12.0428ZM7.79403 12.0428C7.8697 12.1816 7.97605 12.2858 8.09784 12.3557V4.02816H4.77671C4.16645 4.02816 3.77869 4.68137 4.07091 5.21711L7.79403 12.0428Z" fill="#7B879D"/>
          </svg>
        </template>
      </AddPartnerCell>
    </div>
  </div>
</template>

<script setup lang="ts">

import PartnerCell from "@/components/PartnerCell/PartnerCell.vue";
import AddPartnerCell from "@/components/AddPartnerCell/AddPartnerCell.vue";
import { useStore } from "vuex";
import {
  computed,
  ComputedRef,
} from "vue";
import {
  Ceil,
  Ceils,
  IMatrix,
} from "@/interfaces/store.interface.ts";
import { IPosition } from "@/interfaces/partners.interface.ts";

const emit = defineEmits([
  'open-m-matrix-partner',
  'open-m-add-partner',
  'set-position-for-partner',
  'select-matrix',
])

const store = useStore()

const matrixByType: ComputedRef<IMatrix> = computed(() => store.state.matrixByType)

const onlyInfinityCell: ComputedRef<boolean> = computed(() => store.getters.onlyInfinityCell)

const partnersCount: ComputedRef<number> = computed(() => store.state.partners.partnersPending.totalCount)

const ceils: ComputedRef<Ceils> = computed(() => store.state.matrixByType?.ceilsCollection?.['1'])

const getTitle: ComputedRef<string> = computed(() => {
  const cells = matrixByType.value.matrix?.ceils['1']
  const cellsTypes = [cells?.['1'], cells?.['2']]

  switch (true) {
    case cellsTypes.includes('freeze') && cellsTypes.includes('profit'):
      return 'Основные'
    case cellsTypes.includes('profit') && !cellsTypes.includes('freeze'):
      return 'Доходные'
    case cellsTypes.includes('freeze') && !cellsTypes.includes('profit'):
      return 'Накопительные'
    default:
      return 'Накопительные'
  }
})

// FIRST AddPartnerCell

const getTitleForFirstCell = computed(() =>
    (!firstCeil.value?.allowSniper || !partnersCount) &&
    firstCeil.value?.allowBuyClone ? 'Купить <span>BOOST</span>' : 'Выставить партнера'
)

const getDisabledSubtitleForFirstCell = computed(() =>
    (!firstCeil.value?.allowSniper || !partnersCount) &&
    firstCeil.value?.allowBuyClone ? `${matrixByType.value.matrixConfig.price}` : ''
)

// SECOND AddPartnerCell

const getTitleForSecondCell = computed(() =>
    (!secondCeil.value?.allowSniper || !partnersCount) &&
    secondCeil.value?.allowBuyClone ? 'Купить <span>BOOST</span>' : 'Выставить партнера'
)

const getSubtitleForSecondCell = computed(() =>
    (!secondCeil.value?.allowSniper || !partnersCount) &&
    secondCeil.value?.allowBuyClone ? `${matrixByType.value.matrixConfig.price}` : ''
)

const getDisabledSubtitleForSecondCell = computed(() =>
    !firstCeil.value?.matrix &&
    (
        firstCeil.value?.allowSniper ||
        firstCeil.value?.allowBuyClone ||
        isAutomaticPlacement(firstCeil.value)
    ) ? 'Заполните левую ячейку' : getCellTypeSecondCeil.value === 'freeze' ? 'Накопительная ячейка' : 'Доходная ячейка'
)

const firstCeil: ComputedRef<Ceil> = computed(() => ceils.value?.['1'])
const secondCeil: ComputedRef<Ceil> = computed(() =>
    onlyInfinityCell.value ? ceils.value?.['1'] : ceils.value?.['2']
)

const isAutomaticPlacement = (cell: Ceil): boolean => {
  const valid = matrixByType.value.matrix?.type === 'dream-ton_6' && !cell.allowBuyClone && !cell.allowSniper
  switch (cell.pos) {
    case 1:
      return valid
    case 2:
      return valid && !!firstCeil.value?.matrix
    default:
      return false
  }
}

const getTypeForFirstCeil: ComputedRef<string> = computed(() => {
  if (onlyInfinityCell.value) {
    return 'disable3'
  }

  if (firstCeil.value.queueId) {
    return 'loading'
  }

  return matrixByType.value.matrix?.ceils['1']['1'] ?? ''
})

const getCellTypeFirstCeil: ComputedRef<string> = computed(() => {
  if (getTypeForFirstCeil.value === 'disable') {
    return matrixByType.value.matrix?.ceils['1']['1'] ?? ''
  } else {
    return getTypeForFirstCeil.value
  }
})

const getTypeForSecondCeil: ComputedRef<string> = computed(() => {
  if (onlyInfinityCell.value) {
    return 'disable3'
  }

  if (secondCeil.value.queueId) {
    return 'loading'
  }

  if (!secondCeil.value?.matrix && !firstCeil.value?.matrix) {
    return 'disable'
  }

  return matrixByType.value.matrix?.ceils['1']['2'] ?? ''
})

const getCellTypeSecondCeil: ComputedRef<string> = computed(() => {
  if (getTypeForSecondCeil.value === 'disable') {
    return matrixByType.value.matrix?.ceils['1']['2'] ?? ''
  } else {
    return getTypeForSecondCeil.value
  }
})

const getPosition = (depth: number, pos: number): IPosition => {
  return { depth, pos }
}

const openMAddPartner = (pos: IPosition) => {
  const ceil: Ceil = ceils.value[String(pos.pos)]
  if (!onlyInfinityCell.value && !ceil.queueId && (ceil.allowSniper || ceil.allowBuyClone)) {
    emit('open-m-add-partner')
    emit('set-position-for-partner', pos)
  }
}

const openMMatrixPartner = (ceil: Ceil) => {
  if (!ceil?.matrix?.is_booster) {
    emit('open-m-matrix-partner')
    emit('select-matrix', ceil?.matrix?.uuid)
  }
}
</script>

<style scoped lang="scss">
@import 'savings';
</style>