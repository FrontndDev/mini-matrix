<template>
  <div class="modal-partner-waiting-chains">
    <ModalHeader
        :partnerWaiting="true"
        @close-modal="emit('close-modal')"
        @open-m-add-partner="emit('open-add-partner-chains')"
    >
      Партнеры в ожидании
    </ModalHeader>
    <div
        class="modal-partner-waiting-chains__container"
        :class="{ 'less-four': cells?.length < 4 }"
    >
      <template v-if="cells">
        <div
            class="modal-partner-waiting-chains__block"
            :class="{ active: selectedCell?.id === cell.id }"
            v-for="(cell, idx) in cells"
            :key="cell.id"
        >
          <SmallCell
              :cell="cell"
              :tooltip-position="(idx + 1) % 4 === 0 ? 'left' : 'right'"
              @click="selectCell(cell)"
          />
        </div>
      </template>
      <Preloader :with-text="true" v-if="!cells"/>
    </div>
    <div class="modal-partner-waiting-chains__buttons">
      <template v-if="selectedCell">
        <CancelButton @click="emit('open-add-partner-chains')" />
        <ChainsButton @click="selectPartner">
          Выставить
        </ChainsButton>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import CancelButton from "@/components/UI/CancelButton/CancelButton.vue";
import ModalHeader from "@/components/ModalHeader/ModalHeader.vue";
import Preloader from "@/components/UI/Preloader/Preloader.vue";
import SmallCell from "@/components/SmallCell/SmallCell.vue";
import ChainsButton from "@/components/UI/ChainsButton/ChainsButton.vue";
import {
  computed,
  ComputedRef,
  // inject,
  ref,
  Ref
} from "vue";
import {
  // Ceil,
  Matrix
} from "@/interfaces/store.interface.ts";
import { useStore } from "vuex";

const emit = defineEmits([
  'close-modal',
  'open-add-partner-chains',
  'select-partner',
  'open-expose-partner',
])

const store = useStore()
const cells: ComputedRef<Matrix[]> = computed(() => store.state.partners.partnersPendingSecond?.list)

let selectedCell: Ref<Matrix | null> = ref(null)

const selectCell = (cell: Matrix) => {
  selectedCell.value = cell
}

const selectPartner = () => {
  emit('select-partner', selectedCell.value)
  emit('close-modal')
  emit('open-expose-partner')
}
</script>

<style scoped lang="scss">
@import "mPartnerWaitingChains";
</style>