<template>
  <div class="endless">
    <div class="endless__title">Бесконечные</div>
    <div class="endless__menu endless__menu_mt-16">
      <AddPartnerCell
          cell-type="infinity"
          :automatic-placement="isAutomaticPlacement"
          :disabled-subtitle="getDisabledSubtitle"
          :type="getTypeForThirdCeil"
          :ceil="thirdCeil"
          :partners-count="partnersCount"
          @open-m-add-partner="openMAddPartner(getPosition(thirdCeil.depth, thirdCeil.pos))"
      />
      <InfinityPartnerCard
          :ceil="thirdCeil"
          :partners-count="matrixByType.countInInfinity"
          :loading="!!thirdCeil?.queueId"
          @open-m-infinity-cell="openMInfinityCell"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AddPartnerCell from "@/components/AddPartnerCell/AddPartnerCell.vue";
import InfinityPartnerCard from "@/components/InfinityPartnerCard/InfinityPartnerCard.vue";
import { useStore } from "vuex";
import {
  computed,
  Ref,
  ComputedRef
} from "vue";
import {
  Ceil,
  Ceils,
  IMatrix,
} from "@/interfaces/store.interface.ts";
import { IPosition } from "@/interfaces/partners.interface.ts";

const emit = defineEmits(['open-m-infinity-cell', 'open-m-add-partner', 'set-position-for-partner'])

const store = useStore()

const onlyInfinityCell: ComputedRef<boolean> = computed(() => store.getters.onlyInfinityCell)

const partnersCount: ComputedRef<number> = computed(() => store.state.partners.partnersPending.totalCount)

const matrixByType: ComputedRef<IMatrix> = computed(() => store.state.matrixByType)

const ceils: Ref<Ceils> = computed(() => store.state.matrixByType?.ceilsCollection['1'])

const thirdCeil: Ref<Ceil> = computed(() =>
    onlyInfinityCell.value ? ceils.value?.['1'] : ceils.value?.['3']
)

const getCells = computed(() => matrixByType.value.matrix?.ceils['1'])

const isAutomaticPlacement = computed(() =>
    matrixByType.value.matrix?.type === 'dream-ton_6' &&
    !thirdCeil.value.allowBuyClone &&
    !thirdCeil.value.allowSniper &&
    !!ceils.value?.['1']?.matrix &&
    !!ceils.value?.['2']?.matrix
)

const getDisabledSubtitle = computed(() => {
  const getText = () => {
    const cellsTypes = [getCells.value?.['1'], getCells.value?.['2']]

    switch (true) {
      case cellsTypes.includes('freeze') && cellsTypes.includes('profit'):
        return 'основные ячейки'
      case cellsTypes.includes('profit') && !cellsTypes.includes('freeze'):
        return 'доходные ячейки'
      case cellsTypes.includes('freeze') && !cellsTypes.includes('profit'):
        return 'ячейки накопления'
      default:
        return 'ячейки накопления'
    }
  }

  return isAutomaticPlacement.value ? '' : `Заполните ${getText()}`
})

const openMInfinityCell = () => {
  if (matrixByType.value?.matrix) {
    store.dispatch('partners/getInfinityPartners', {
      parentId: matrixByType.value.matrix.id
    })
    emit('open-m-infinity-cell')
  }
}

const getPosition = (depth: number, pos: number): IPosition => {
  return { depth, pos }
}

const getTypeForThirdCeil: ComputedRef<string> = computed(() => {
  if (thirdCeil.value.queueId) {
    return 'loading'
  }

  if (!thirdCeil.value?.allowSniper && !thirdCeil.value?.allowBuyClone) {
    return 'disable'
  }

  return 'infinity'
})

const openMAddPartner = (pos: IPosition) => {
  if (thirdCeil.value.allowSniper || thirdCeil.value.allowBuyClone) {
    emit('open-m-add-partner')
    emit('set-position-for-partner', pos)
  }
}
</script>

<style scoped lang="scss">
@import "endless";
</style>