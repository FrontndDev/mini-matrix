<template>
  <div class="home">
    <div class="container">
      <div class="home__content">
        <div class="home__matrices">
          <MatrixHeader style="grid-area: header;"/>

          <template v-if="Object.keys(matrixByType).length">
            <div class="home__matrices-inner" v-if="!matrixByType?.ctaText && !matrixIsTemporarilyUnavailable">
              <Savings
                  @open-m-matrix-partner="openModalPartner(2)"
                  @open-m-add-partner="openModalPartner(3)"
                  @set-position-for-partner="setPositionForPartner"
                  @select-matrix="selectMatrix"
              />
              <Endless
                  @open-m-infinity-cell="openModalPartner(1)"
                  @open-m-add-partner="openModalPartner(4)"
                  @set-position-for-partner="setPositionForPartner"
              />
            </div>

            <template v-if="!matrixByType?.in_queue">
              <NotActivatedMatrix
                  :matrix-by-type="matrixByType"
                  @open-payment-form="toggleModalPaymentForm = true"
                  v-if="matrixByType?.ctaText && !matrixIsTemporarilyUnavailable"
              />
              <TimeActivatedMatrix
                  v-if="matrixIsTemporarilyUnavailable"
              />
            </template>
            <template v-else>
              <MatrixActivationInProgress/>
            </template>

          </template>
          <div class="home__preloader" v-if="!Object.keys(matrixByType).length">
            <Preloader :with-text="true"/>
          </div>

          <CopyLink
              style="grid-area: copy-link;"
              v-if="!matrixByType?.ctaText && !matrixIsTemporarilyUnavailable && Object.keys(matrixByType).length"
              @click="useCopyLink(matrixByType.matrix?.uuid ?? '', matrixByType.matrix?.type ?? '')"
          />
        </div>
        <div class="home__info">
          <InfoHeader
              :infoHeader="isCells"
              @open-cells="openCells"
          />
          <PartnerCells
              v-if="isCells === 1"
              @open-m-matrix-partner="openModalPartner(2)"
              @select-matrix="selectMatrix"
          />
          <BoostersCells
              v-else-if="isCells === 2"
              @open-m-matrix-partner="openModalPartner(2)"
              @select-matrix="selectMatrix"
          />
          <ChainsCells
              @open-general-chains="openModalChain(1)"
              @open-m-teleport="openModalTeleport"
              @select-chain="selectChain"
              v-else-if="isCells === 3"
          />
        </div>
      </div>
    </div>
    <ModalsPartners
        :toggleModalPartners="toggleModalPartners"
        :openModalPartners="openModalPartners"
        @open-m-infinity-cell="openModalPartner(1)"
        @open-m-matrix-partner="openModalPartner(2)"
        @open-m-add-partner="openModalPartner(3)"
        @open-partner-waiting="openModalPartner(5)"
        @close-modal="closeModal"

        @convert-matrix-to-cell="matrix => selectedPartner = convertMatrixToCell(matrix)"
        @set-partner-by="setPartnerBy"
        @select-matrix="selectMatrix"
        @set-position-for-partner="setPositionForPartner"
        @set-type-waiting-modal="setTypeWaitingModal"
    />
    <ModalChains
        :toggleModalChains="toggleModalChains"
        :openModalChains="openModalChains"
        @open-general-chains="openModalChain(1)"
        @open-m-replace-partner="openModalChain(2)"
        @open-change-partner="openModalChain(3)"
        @open-expose-partner="openModalChain(4)"
        @open-add-partner-chains="openModalChain(6)"
        @open-partner-waiting-chains="openModalChain(7)"
        @open-m-matrix-partner="openModalPartner(2)"
        @select-matrix="selectMatrix"

        @close-modal="closeModal"
    />
    <ModalPaymentForm
        :toggleModalPaymentForm="toggleModalPaymentForm"
        @close-modal="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import Endless from "@/components/Views/Home/Endless/Endless.vue";
import CopyLink from "@/components/Views/Home/CopyLink/CopyLink.vue";
import MatrixHeader from "@/components/Views/Home/MatrixHeader/MatrixHeader.vue";
import Savings from "@/components/Views/Home/Savings/Savings.vue";
import InfoHeader from "@/components/Views/Home/InfoHeader/InfoHeader.vue";
import PartnerCells from "@/components/Views/Home/PartnerCells/PartnerCells.vue";
import ModalsPartners from "@/components/Modals/ModalsPartners/ModalsPartners.vue";

import NotActivatedMatrix from "@/components/NotActivatedMatrix/NotActivatedMatrix.vue";

import {
  computed,
  ComputedRef,
  onMounted,
  provide,
  Ref,
  ref,
  watch
} from "vue";
import TimeActivatedMatrix from "@/components/TimeActivatedMatrix/TimeActivatedMatrix.vue";
import ChainsCells from "@/components/Views/Home/ChainsCells/ChainsCells.vue";
import BoostersCells from "@/components/Views/Home/BoostersCells/BoostersCells.vue";
import ModalChains from "@/components/Modals/ModalsChains/ModalChains.vue";
import { useStore } from "vuex";
import Preloader from "@/components/UI/Preloader/Preloader.vue";
import ModalPaymentForm from "@/components/Modals/ModalPaymentForm/ModalPaymentForm.vue";
import { IPosition } from "@/interfaces/partners.interface";
import {
  Ceil,
  IMatrix,
  ListOfTypes,
  Matrix,
} from "@/interfaces/store.interface";
import {
  useRoute,
  useRouter
} from "vue-router";
import { useCopyLink } from "@/composables/useCopyLink";
import MatrixActivationInProgress from "@/components/MatrixActivationInProgress/MatrixActivationInProgress.vue";
import {
  IChains,
  ITeleports
} from "@/interfaces/chains.interface";
import { baseUrl } from "@/router";

const isCells = ref(1)

const toggleModalPartners = ref(false)
const openModalPartners = ref(0)

const toggleModalChains = ref(false)
const openModalChains = ref(0)

const toggleModalNotification = ref(false)

const toggleModalPaymentForm = ref(false)

const toggleModalConfirmPayment = ref(false)

const store = useStore()
const router = useRouter()
const route = useRoute()

const interval: Ref<number | null> = ref(null)

const selectedChain: Ref<IChains | null> = ref(null)
const selectedType: Ref<string> = ref('type')

const setPartnerBy = (type: string) => {
  selectedType.value = type
}

const selectChain = (chain: IChains, redirect = true) => {
  selectedChain.value = chain
  if (redirect) {
    router.push(route.path + `?chainUUID=${chain.uuid}`)
  }
}

const matrixIsInQueueForPublication: ComputedRef<boolean> = computed(() => {
  const ceilsCollection = store.state.matrixByType?.ceilsCollection?.['1']
  return ceilsCollection ? Object.values(ceilsCollection).map(ceil => !!(ceil as Ceil).queueId).includes(true) : false
})

const matrixByType: ComputedRef<IMatrix> = computed(() => store.state.matrixByType)

watch(() => matrixIsInQueueForPublication.value, () => {
  if (matrixIsInQueueForPublication.value) {
    interval.value = setInterval(() => {
      store.dispatch('getMatrixByType', store.state.selectedType.type);
    }, 3000);
  } else if (!matrixIsInQueueForPublication.value && interval.value) {
    clearInterval(interval.value);
  }
});

watch(() => matrixByType.value?.in_queue, () => {
  if (matrixByType.value?.in_queue) {
    interval.value = setInterval(() => {
      store.dispatch('getMatrixByType', store.state.selectedType.type);
    }, 3000);
  } else if (!matrixByType.value?.in_queue && interval.value) {
    clearInterval(interval.value);
  }
})

watch(() => store.state.chains.chainsList.list?.length, () => {
  openChainViaLink()
})

const listOfTypes: ComputedRef<ListOfTypes> = computed(() => store.state.listOfTypes)

const matrixIsTemporarilyUnavailable: ComputedRef<boolean> = computed(() => {
  const teamOpened = listOfTypes.value?.teamOpened
  if (teamOpened) {
    const key: string | undefined = Object.keys(teamOpened)?.find(type => route.params.type === type)
    return key ? !!teamOpened?.[key] : false
  }
  return false
})


const partnerPos: Ref<IPosition> = ref({ depth: 0, pos: 0 })

const selectedPartner: Ref<Ceil | null> = ref(null)
const selectedPartnerForTeleport: Ref<ITeleports | null> = ref(null)

const typeWaitingModal: Ref<'view' | undefined> = ref(undefined)

provide('partnerPos', partnerPos)
provide('selectedPartner', selectedPartner)
provide('selectedChain', selectedChain)
provide('selectedType', selectedType)
provide('selectedPartnerForTeleport', selectedPartnerForTeleport)
provide('typeWaitingModal', typeWaitingModal)

const openModalPartner = (num: number) => {
  toggleModalPartners.value = true
  openModalPartners.value = num
  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'
}

const openModalChain = (num: number) => {
  toggleModalChains.value = true
  openModalChains.value = num
  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'
}

const openCells = (id: number) => {
  isCells.value = id
}

const openModalTeleport = (cell: ITeleports) => {
  selectedPartnerForTeleport.value = cell
  toggleModalChains.value = true
  openModalChains.value = 5
  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'
}

const closeModal = (url = route.path) => {
  router.push(url)
  store.commit('SET_MATRIX_BY_ID', {})
  selectedPartner.value = null
  selectedPartnerForTeleport.value = null
  selectedType.value = 'type'

  toggleModalPartners.value = false
  toggleModalChains.value = false
  toggleModalNotification.value = false
  toggleModalPaymentForm.value = false
  toggleModalConfirmPayment.value = false
  document.body.style.overflow = 'auto'
  document.documentElement.style.overflow = 'auto'
  setTypeWaitingModal(undefined)
}

const setPositionForPartner = (pos: IPosition) => {
  store.dispatch('getWallets')
  partnerPos.value = pos
}

const setTypeWaitingModal = (type?: 'view') => {
  typeWaitingModal.value = type
}

const selectMatrix = (matrixUUID?: string) => {
  if (matrixUUID) {
    console.log('selectMatrix', route.path + `?uuid=${matrixUUID}`)
    router.push(route.path + `?uuid=${matrixUUID}`)
  }
}

const convertMatrixToCell = (matrix: Matrix) => ({
  depth: 0,
  pos: 0,
  queueId: null,
  matrix: matrix,
  allowBuyClone: false,
  allowSniper: false,
  fillRevard: [],
  isInfinity: false,
  informer: {
    activationType: '',
    ceilType: '',
    userType: ''
  }
})

const loadMMatrixPartnerModal = async () => {
  selectedPartner.value = null

  const query = route.query
  console.log('query', query)
  const matrixId = query.uuid ?? query.id
  if (matrixId) {
    store.commit('SET_MATRIX_BY_ID', {})

    let response = null;

    switch (true) {
      case !!query.uuid:
        response = await store.dispatch('getMatrixByUUID', matrixId)
        break;
      case !!query.id:
        response = await store.dispatch('getMatrixByID', matrixId)
    }

    if (response?.error_code !== undefined) {
      closeModal()
    }

    // Получаем партнеров в ожидании "Матрицы партнёра"
    store.commit('partners/SET_PENDING_PARTNERS_SECOND', {})
    await store.dispatch('partners/getPendingPartners', {
      isPartnerMatrix: true,
      matrixUUID: response?.data?.matrix?.uuid,
      ownerID: response?.data.matrix.owner.id,
    })

    await store.dispatch('partners/getPendingPartners', {
      matrixUUID: response?.data?.matrix?.uuid,
    })

    if (response?.data?.matrix && !response?.data.matrix.is_booster) {
      console.log('response.data', response)
      selectedPartner.value = convertMatrixToCell(response?.data.matrix)
      selectedType.value = 'id'

      openModalPartner(2)
    }
  } else if (toggleModalPartners.value) {
    closeModal(route.fullPath)
  }
}

const openChainViaLink = () => {
  const query = route.query

  if (query.chainUUID && store.state.chains.chainsList?.list?.length) {
    const chain = store.state.chains.chainsList.list.find((chain: IChains) => chain.uuid === route.query.chainUUID)
    if (chain) {
      store.dispatch('chains/getChainDetail', chain.uuid)
      selectChain(chain, false)
      openModalChain(1)
    }
  } else if (toggleModalChains.value) {
    closeModal(route.fullPath)
  }
}

const loadDependencies = () => {
  loadMMatrixPartnerModal()
  openChainViaLink()
}

const setType = () => {
  store.commit('SET_NEW_TYPE_MATRIX', null)
  const typeFromRoute = route.path.split(`${baseUrl}/`)?.[1]
  const selectedType = listOfTypes.value.types.find(type => type.type === typeFromRoute)
  store.commit('SET_SELECTED_TYPE', selectedType)
}

watch(() => route.fullPath, () => {
  console.log('changeRoute')
  loadDependencies()
})

watch(() => route.path, () => {
  setType()
})

onMounted(() => {
  setType()
  loadDependencies()
})
</script>

<style scoped lang="scss">
@import "home";
</style>