<template>
  <div class="modal-add-partner-chains">
    <ModalHeader @close-modal="$emit('close-modal')">
      Выставить партнера
    </ModalHeader>
    <div class="modal-add-partner-chains__container">
      <BuyBoostCell
          :price="boostPrice"
          @click="buyBooster(true)"
      />
      <AddPartnerCell
          type="freeze"
          :ceil="getCeil"
          :partners-count="partnersCount"
          @click="openPartnerWaitingChains"
          v-if="partnersCount"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ModalHeader from "@/components/ModalHeader/ModalHeader.vue";
import AddPartnerCell from "@/components/AddPartnerCell/AddPartnerCell.vue";
import BuyBoostCell from "@/components/BuyBoostCell/BuyBoostCell.vue";
import {
  computed,
  ComputedRef
} from "vue";
import {
  IChainDetails,
} from "@/interfaces/chains.interface.ts";
import { useStore } from "vuex";
import {
  Ceil,
} from "@/interfaces/store.interface.ts";

const emit = defineEmits([
    'buy-booster',
    'select-partner',
    'open-partner-waiting-chains',
    'close-modal',
])

const store = useStore()

const chainsDetails: ComputedRef<IChainDetails> = computed(() => store.state.chains.chainDetails)
const partnersCount: ComputedRef<number> = computed(() => store.state.partners.partnersPendingSecond.totalCount)
const boostPrice: ComputedRef<number> = computed(() => chainsDetails.value.price.amount)

const getCeil: ComputedRef<Ceil> = computed(() => {
  return {
    depth: 0,
    pos: 0,
    queueId: null,
    matrix: chainsDetails.value.list[0],
    allowBuyClone: false,
    allowSniper: false,
    fillRevard: [],
    isInfinity: false,
    informer: {
      activationType: '',
      ceilType: '',
      userType: '',
    }
  }
})

const buyBooster = (bool: boolean) => {
  emit('buy-booster', bool)
}

const openPartnerWaitingChains = () => {
  buyBooster(false)
  emit('open-partner-waiting-chains')
}
</script>

<style scoped lang="scss">
@import "mAddPartnerChains";
</style>