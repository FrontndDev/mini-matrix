<template>
  <Teleport to="body">
    <transition name="modal" class="modal">
      <div v-if="props.toggleModalChains" class="modal__container">
        <div class="modal__content">
          <MGeneralChains
              v-if="props.openModalChains === 1"
              @close-modal="emit('close-modal')"
              @open-expose-partner="emit('open-expose-partner')"
              @open-add-partner-chains="emit('open-add-partner-chains')"

              @open-m-matrix-partner="emit('open-m-matrix-partner')"
              @select-matrix="matrixUUID => emit('select-matrix', matrixUUID)"

              @buy-booster="buyBooster"
          />
          <MReplacePartner
              v-if="props.openModalChains === 2"
              @close-modal="emit('close-modal')"
              @open-general-chains="emit('open-general-chains')"
              @open-change-partner="emit('open-change-partner')"
          />
          <MChangePartner
              v-if="props.openModalChains === 3"
              @close-modal="emit('close-modal')"
              @open-m-replace-partner="emit('open-m-replace-partner')"
              @open-expose-partner="emit('open-expose-partner')"
          />
          <MExposePartner
              v-if="props.openModalChains === 4"
              @close-modal="emit('close-modal')"
              @open-change-partner="emit('open-change-partner')"
              @open-general-chains="emit('open-general-chains')"
          />
          <MTeleport
              v-if="props.openModalChains === 5"
              @close-modal="emit('close-modal')"
          />
          <MAddPartnerChains
              v-if="props.openModalChains === 6"
              @close-modal="emit('close-modal')"
              @open-partner-waiting-chains="emit('open-partner-waiting-chains')"

              @buy-booster="buyBooster"
          />
          <MPartnerWaitingChains
              v-if="props.openModalChains === 7"
              @open-expose-partner="emit('open-expose-partner')"
              @open-add-partner-chains="emit('open-add-partner-chains')"

              @close-modal="emit('close-modal')"
              @select-partner="selectPartner"
              @buy-booster="buyBooster"
          />
        </div>
        <div class="modal__overlay" @click="emit('close-modal')"/>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import MGeneralChains from "./MGeneralChains/MGeneralChains.vue";
import MReplacePartner from "./MReplacePartner/MReplacePartner.vue";
import MChangePartner from "./MChangePartner/MChangePartner.vue";
import MExposePartner from "./MExposePartner/MExposePartner.vue";
import MTeleport from "./MTeleport/MTeleport.vue";
import MAddPartnerChains from "./MAddPartnerChains/MAddPartnerChains.vue";
import MPartnerWaitingChains from "./MPartnerWaitingChains/MPartnerWaitingChains.vue";
import {
  provide,
  ref,
  Ref
} from "vue";
import {
  Matrix,
} from "@/interfaces/store.interface.ts";

const props = defineProps({
  toggleModalChains: {
    type: Boolean,
    default: false
  },
  openModalChains: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits([
  'open-add-partner-chains',
  'open-change-partner',
  'open-general-chains',
  'open-expose-partner',
  'open-m-replace-partner',
  'open-partner-waiting-chains',
  'open-m-matrix-partner',
  'select-matrix',
  'close-modal',
])

const isBoosterForChain: Ref<boolean> = ref(false)
const selectedPartner: Ref<Matrix | null> = ref(null)

provide('isBoosterForChain', isBoosterForChain)
provide('selectedPartner', selectedPartner)

const buyBooster = (bool: boolean) => {
  isBoosterForChain.value = bool
  emit('open-expose-partner')
}

const selectPartner = (partner: Matrix) => {
  selectedPartner.value = partner
}
</script>

<style scoped lang="scss">
@import "modalChains";
</style>