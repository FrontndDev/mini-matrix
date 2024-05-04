<template>
  <div class="general-chains">
    <div class="general-chains__content">
      <ModalHeader @close-modal="emit('close-modal')">
        Цепочка
      </ModalHeader>
      <div class="general-chains__container">
        <template v-if="chainDetails?.list?.length">
          <div
              class="general-chains__overflow"
              :class="{'less-five': chainDetails?.list?.length <= 4}"
          >
            <div
                class="general-chains__block"
                v-for="(matrix, idx) in chainDetails?.list"
                :key="idx"
            >
              <SmallCell
                  :cell="matrix"
                  @click="openMMatrixModal(matrix.uuid)"
              />
            </div>
          </div>
          <ChainsButton @click="activateTheChain">
            <span>Активировать цепочку</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.16668 4.66667C3.32282 4.66667 1.83334 6.15614 1.83334 8C1.83334 9.84386 3.32282 11.3333 5.16668 11.3333C7.01053 11.3333 8.50001 9.84386 8.50001 8C8.50001 7.72386 8.72387 7.5 9.00001 7.5C9.27615 7.5 9.50001 7.72386 9.50001 8C9.50001 10.3961 7.56282 12.3333 5.16668 12.3333C2.77053 12.3333 0.833344 10.3961 0.833344 8C0.833344 5.60386 2.77053 3.66667 5.16668 3.66667C5.44282 3.66667 5.66668 3.89052 5.66668 4.16667C5.66668 4.44281 5.44282 4.66667 5.16668 4.66667Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6667 4.5C8.73615 4.5 7.16668 6.06948 7.16668 8C7.16668 8.27614 6.94282 8.5 6.66668 8.5C6.39053 8.5 6.16668 8.27614 6.16668 8C6.16668 5.51719 8.18387 3.5 10.6667 3.5C13.1495 3.5 15.1667 5.51719 15.1667 8C15.1667 10.4828 13.1495 12.5 10.6667 12.5C10.3905 12.5 10.1667 12.2761 10.1667 12C10.1667 11.7239 10.3905 11.5 10.6667 11.5C12.5972 11.5 14.1667 9.93052 14.1667 8C14.1667 6.06948 12.5972 4.5 10.6667 4.5Z" fill="white"/>
            </svg>
          </ChainsButton>
        </template>

        <Preloader
            :with-text="true"
            v-else
        />
      </div>
    </div>
    <CopyLink
        name="Скопировать ссылку на цепочку"
        @click="useCopyLink(selectedChain.uuid, store.state.selectedType.type, 'chainUUID')"
    />
  </div>
</template>

<script setup lang="ts">
import ModalHeader from "@/components/ModalHeader/ModalHeader.vue";
import CopyLink from "@/components/Views/Home/CopyLink/CopyLink.vue";
import ChainsButton from "@/components/UI/ChainsButton/ChainsButton.vue";
import {
  computed,
  ComputedRef,
  inject,
  Ref,
  watch,
} from "vue";
import { useStore } from "vuex";
import SmallCell from "@/components/SmallCell/SmallCell.vue";
import {
  IChainDetails,
  IChains
} from "@/interfaces/chains.interface.ts";
import { IPartners } from "@/interfaces/partners.interface.ts";
import { useCopyLink } from "@/composables/useCopyLink.ts";
import Preloader from "@/components/UI/Preloader/Preloader.vue";

const emit = defineEmits([
  'close-modal',
  'open-expose-partner',
  'open-add-partner-chains',
  'open-m-matrix-partner',
  'select-matrix',
  'buy-booster',
])

const store = useStore()

const selectedChain = inject('selectedChain') as Ref<IChains>

const chainDetails: ComputedRef<IChainDetails> = computed(() => store.state.chains.chainDetails)

const partnersPending: ComputedRef<IPartners> = computed(() => store.state.partners.partnersPendingSecond)

const activateTheChain = () => {
  if (!partnersPending.value.totalCount) {
    emit('buy-booster', true)
    emit('open-expose-partner')
  } else {
    emit('open-add-partner-chains')
  }
}

const openMMatrixModal = (matrixUUID?: string) => {
  emit('close-modal')
  emit('select-matrix', matrixUUID)
  emit('open-m-matrix-partner')
}

watch(() => chainDetails.value?.list?.length, () => {
  store.dispatch('partners/getPendingPartners', {
    isPartnerMatrix: true,
    matrixType: chainDetails.value?.list[0].type
  })
})
</script>

<style scoped lang="scss">
@import "mGeneralChains";
</style>