<template>
  <div class="modal-add-partner">
    <ModalHeader @close-modal="emit('close-modal')">
      {{ getTitle }}
    </ModalHeader>
    <div class="modal-add-partner__container" v-if="getTitle">
      <BuyBoostCell
          :price="matrixByType.matrixConfig.price"
          v-if="thirdCeil?.allowBuyClone"
          @click="showConfirmPayment = true"
      />
      <AddPartnerCell
          type="profit"
          :ceil="thirdCeil"
          :partners-count="partnersCount"
          v-if="thirdCeil.allowSniper && partnersCount"
          @click="emit('open-partner-waiting')"
      />
    </div>
    <EmptyCells
        class="modal-add-partner__empty"
        cellsType="partners"
        v-else
    />
    <MConfirmPayment
        :currency="matrixByType.matrixConfig.currency"
        :price="matrixByType.matrixConfig.price"
        v-if="showConfirmPayment"
        @cancel="closeConfirmPayment"
        @confirm="confirm"
        @close-modal="showConfirmPayment = false"
        @back="showConfirmPayment = false"

        @set-payment-type="setPaymentType"
    />
  </div>
</template>

<script setup lang="ts">
import ModalHeader from "@/components/ModalHeader/ModalHeader.vue";
import BuyBoostCell from "@/components/BuyBoostCell/BuyBoostCell.vue";
import AddPartnerCell from "@/components/AddPartnerCell/AddPartnerCell.vue";
import { useStore } from "vuex";
import {
  computed,
  ComputedRef,
  onMounted,
  ref,
  Ref,
} from "vue";
import {
  Ceil,
  Ceils,
  IBuyBoosterParams,
  IMatrix,
} from "@/interfaces/store.interface.ts";
import EmptyCells from "@/components/EmptyCells/EmptyCells.vue";
import MConfirmPayment from "@/components/Modals/ModalConfirmPayment/MConfirmPayment/MConfirmPayment.vue";

const emit = defineEmits(['close-modal', 'open-partner-waiting'])

const store = useStore()

const showConfirmPayment: Ref<boolean> = ref(false)
const confirmPaymentType = ref('')
// failure, success, loading

const onlyInfinityCell: ComputedRef<boolean> = computed(() => store.getters.onlyInfinityCell)

const matrixByType: ComputedRef<IMatrix> = computed(() => store.state.matrixByType)

const ceils: ComputedRef<Ceils> = computed(() => store.state.matrixByType?.ceilsCollection?.['1'])

const thirdCeil: ComputedRef<Ceil> = computed(() =>
    onlyInfinityCell.value ? ceils.value?.['1'] : ceils.value?.['3']
)
const partnersCount: ComputedRef<number> = computed(() => store.state.partners.partnersPending.totalCount)

const getTitle = computed(() => {
  switch (true) {
    case !thirdCeil.value?.allowBuyClone && thirdCeil.value?.allowSniper && !!partnersCount.value:
      return 'Выставить партнера'
    case thirdCeil.value?.allowBuyClone:
      return 'Купить BOOST'
    default:
      return ''
  }
})

const setPaymentType = (result: string) => confirmPaymentType.value = result

const closeConfirmPayment = () => {
  showConfirmPayment.value = false
  confirmPaymentType.value = ''
}

const buyBooster = async () => {
  if (matrixByType.value?.matrix?.id) {
    const data: IBuyBoosterParams = {
      matrix_id: +matrixByType.value.matrix.id,
      pos: 3,
      depth: 1
    }
    const response = await store.dispatch('buyBooster', data)
    const ceilsCollectionDepth = store.state.matrixByType.ceilsCollection['1']
    const ceilsCollectionPos = onlyInfinityCell.value ? ceilsCollectionDepth['1'] : ceilsCollectionDepth['3']
    ceilsCollectionPos.queueId = response.queueId
    emit('close-modal')
  }
}

const confirm = () => {
  switch (confirmPaymentType.value) {
    case 'success':
      buyBooster()
      break;
    case 'failure':
      window.location.href = window.location.origin + '/app/wallet'
      emit('close-modal')
      break;
    default:
      break;
  }

  closeConfirmPayment()
}

onMounted(() => {
  if (!thirdCeil.value?.allowBuyClone && thirdCeil.value?.allowSniper && partnersCount.value) {
    emit('open-partner-waiting')
  }
})
</script>

<style scoped lang="scss">
@import "mAddPartnerInfinity";
</style>