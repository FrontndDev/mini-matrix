<template>
  <div class="modal-infinity-cell">
    <ModalHeader
        @close-modal="$emit('close-modal')"
        @open-m-matrix-partner="$emit('open-m-matrix-partner')"
        :modalHeader="selectedType === 'id' ? 'back' : ''"
    >
      Бесконечная ячейка
    </ModalHeader>
    <div class="modal-infinity-cell__container" v-if="infinityPartners?.length">
      <PartnerCell
          size="small"
          type="infinity"
          v-for="matrix in infinityPartners"
          :key="matrix.id"
          :ceil="matrix"
          @open-m-matrix-partner="selectMatrix(matrix)"
      />
    </div>
    <Preloader :with-text="true" v-if="!infinityPartners?.length"/>
  </div>
</template>

<script setup lang="ts">
import ModalHeader from "@/components/ModalHeader/ModalHeader.vue";
import PartnerCell from "@/components/PartnerCell/PartnerCell.vue";
import {
  computed,
  ComputedRef,
  inject,
  Ref
} from "vue";
import { useStore } from "vuex";
import {
  Ceil,
  Matrix
} from "@/interfaces/store.interface.ts";
import Preloader from "@/components/UI/Preloader/Preloader.vue";

const emit = defineEmits([
  'close-modal',
  'open-m-matrix-partner',
  'select-matrix',
])

const store = useStore()

const selectedPartner = inject('selectedPartner') as Ref<Ceil>
const selectedType = inject('selectedType') as Ref<string>

const infinityPartners: ComputedRef<Matrix[]> = computed(() => {
  const partnersState = store.state.partners
  return selectedPartner.value ? partnersState.infinityPartnersSecond : partnersState.infinityPartners
})

const selectMatrix = (matrix: Matrix) => {
  if (matrix?.id) {
    emit('select-matrix', matrix.uuid)
    emit('open-m-matrix-partner')
  }
}
</script>

<style scoped lang="scss">
@import "mInfinityCell";
</style>