<template>
  <div class="modal-matrix-partner">
    <ModalHeader
        modal-header="MMatrixPartner"
        :allowTop="matrixById?.allowTop"
        @open-m-matrix-partner="parentMatrix"
        @close-modal="$emit('close-modal')"
    >
      Матрица партнера
    </ModalHeader>
    <div class="modal-matrix-partner__container">
      <div class="modal-matrix-partner__overflow">
        <div class="modal-matrix-partner__cell">
          <!--     PARTNER CEIL      -->
          <PartnerCell
              type=""
              size="small"
              cellType="circle-avatar"
              :user-type="selectedPartner?.informer.userType"
              :ceil="selectedPartner?.matrix"
              v-if="selectedPartner?.matrix"
              @circle-avatar="getUser"
          />
          <AddPartnerCell
              size="small"
              type="loading"
              loading-subtitle="Идет загрузка"
              :ceil="selectedPartner"
              :partners-count="partnersCount"
              v-if="!selectedPartner?.matrix"
          />
        </div>
        <div class="modal-matrix-partner__block">

          <div class="modal-matrix-partner__savings">
            <div class="modal-matrix-partner__block-title">
              {{ getTitle }}
            </div>
            <div class="savings__partners savings__partners_mt-16">
              <!--       FIRST CEIL        -->
              <PartnerCell
                  size="small"
                  :type="getTypeForFirstCeil"
                  :ceil="firstCeil.matrix"
                  :is-booster="firstCeil?.matrix.is_booster"
                  :user-type="firstCeil?.informer.userType"
                  v-if="firstCeil?.matrix"
                  @open-m-matrix-partner="openMMatrixPartner(firstCeil)"
              />
              <AddPartnerCell
                  size="small"
                  :type="getTypeForFirstCeil"
                  :cell-type="getCellTypeFirstCeil"
                  :ceil="firstCeil"
                  :partners-count="partnersCount"
                  :title="(!firstCeil?.allowSniper || !partnersCount) && firstCeil?.allowBuyClone ? 'Купить <span>BOOST</span>' : 'Выставить партнера'"
                  :subtitle="(!firstCeil?.allowSniper || !partnersCount) && firstCeil?.allowBuyClone ? `${matrixById.matrixConfig.price}` : ''"
                  :disabled-subtitle="getCellTypeFirstCeil === 'freeze' ? 'Накопительная ячейка партнера' : 'Доходная ячейка партнера'"
                  :loading-subtitle="firstCeil?.queueId ? 'Идет активация' : 'Идет загрузка'"
                  v-if="!firstCeil?.matrix"
                  @open-m-add-partner="openMAddPartner(getPosition(1, 1))"
              >
                <template #subtitleIcon v-if="(!firstCeil?.allowSniper || !partnersCount) && firstCeil?.allowBuyClone && !firstCeil?.queueId">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.08823 12.4278C7.69766 13.5451 9.302 13.5451 9.91143 12.4278L13.6345 5.60209C14.219 4.5306 13.4435 3.22419 12.2229 3.22419H4.77671C3.55619 3.22419 2.78066 4.5306 3.36511 5.60209L7.08823 12.4278ZM9.20563 12.0428L12.9287 5.21711C13.221 4.68137 12.8332 4.02816 12.2229 4.02816H8.90181V12.3557C9.02361 12.2858 9.12996 12.1816 9.20563 12.0428ZM7.79403 12.0428C7.8697 12.1816 7.97605 12.2858 8.09784 12.3557V4.02816H4.77671C4.16645 4.02816 3.77869 4.68137 4.07091 5.21711L7.79403 12.0428Z" fill="#7B879D"/>
                  </svg>
                </template>
              </AddPartnerCell>

              <!--       SECOND CEIL        -->
              <PartnerCell
                  size="small"
                  :type="getTypeForSecondCeil"
                  :ceil="secondCeil.matrix"
                  :is-booster="secondCeil?.matrix.is_booster"
                  :user-type="secondCeil?.informer.userType"
                  v-if="secondCeil?.matrix"
                  @open-m-matrix-partner="openMMatrixPartner(secondCeil)"
              />
              <AddPartnerCell
                  size="small"
                  :type="getTypeForSecondCeil"
                  :cell-type="getCellTypeSecondCeil"
                  :ceil="secondCeil"
                  :partners-count="partnersCount"
                  :title="(!secondCeil?.allowSniper || !partnersCount) && secondCeil?.allowBuyClone ? 'Купить <span>BOOST</span>' : 'Выставить партнера'"
                  :subtitle="(!secondCeil?.allowSniper || !partnersCount) && secondCeil?.allowBuyClone ? `${matrixById.matrixConfig.price}` : ''"
                  :disabled-subtitle="!firstCeil?.matrix && (firstCeil?.allowSniper || firstCeil?.allowBuyClone) ?
                    'Заполните левую ячейку' : getCellTypeSecondCeil === 'freeze' ?
                    'Накопительная ячейка партнера' :
                    'Доходная ячейка партнера'
                  "
                  :loading-subtitle="secondCeil?.queueId ? 'Идет активация' : 'Идет загрузка'"
                  v-if="!secondCeil?.matrix"
                  @open-m-add-partner="openMAddPartner(getPosition(1, 2))"
              >
                <template #subtitleIcon v-if="(!secondCeil?.allowSniper || !partnersCount) && secondCeil?.allowBuyClone && !secondCeil?.queueId">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.08823 12.4278C7.69766 13.5451 9.302 13.5451 9.91143 12.4278L13.6345 5.60209C14.219 4.5306 13.4435 3.22419 12.2229 3.22419H4.77671C3.55619 3.22419 2.78066 4.5306 3.36511 5.60209L7.08823 12.4278ZM9.20563 12.0428L12.9287 5.21711C13.221 4.68137 12.8332 4.02816 12.2229 4.02816H8.90181V12.3557C9.02361 12.2858 9.12996 12.1816 9.20563 12.0428ZM7.79403 12.0428C7.8697 12.1816 7.97605 12.2858 8.09784 12.3557V4.02816H4.77671C4.16645 4.02816 3.77869 4.68137 4.07091 5.21711L7.79403 12.0428Z" fill="#7B879D"/>
                  </svg>
                </template>
              </AddPartnerCell>
            </div>
          </div>

          <div
              class="modal-matrix-partner__endless"
              :class="{ 'with-line': infinityPartnersCount && partnersCountOfPartner }"
              v-if="infinityPartnersCount || partnersCountOfPartner"
          >
            <CountOfPartners
                type="modal"
                title="Бесконечная"
                :partners-count="infinityPartnersCount"
                v-if="infinityPartnersCount"
                @open-modal="openMInfinityCell"
            />
            <CountOfPartners
                type="modal"
                title="В ожидании"
                :partners-count="partnersCountOfPartner"
                v-if="partnersCountOfPartner"
                @open-modal="openMPartnerWaiting"
            />
          </div>
        </div>
      </div>
      <CopyLink @click="useCopyLink(store.state.matrixById.matrix?.uuid, selectedPartner?.matrix?.type ?? '')"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import ModalHeader from "@/components/ModalHeader/ModalHeader.vue";
import PartnerCell from "@/components/PartnerCell/PartnerCell.vue";
import CopyLink from "@/components/Views/Home/CopyLink/CopyLink.vue";
import AddPartnerCell from "@/components/AddPartnerCell/AddPartnerCell.vue";
import { useStore } from "vuex";
import {
  computed,
  ComputedRef,
  inject,
  onMounted,
  ref,
  Ref,
  watch,
} from "vue";
import {
  Ceil,
  Ceils,
  IMatrix,
} from "@/interfaces/store.interface.ts";
import {
  IPosition
} from "@/interfaces/partners.interface.ts";
import { useCopyLink } from "@/composables/useCopyLink.ts";
import {
  useRoute,
  useRouter
} from "vue-router";
import CountOfPartners from "@/components/UI/CountOfPartners/CountOfPartners.vue";

const emit = defineEmits([
  'open-m-add-partner',
  'open-m-infinity-cell',
  'open-m-matrix-partner',
  'open-partner-waiting',
  'convert-matrix-to-cell',
  'select-matrix',
  'set-partner-by',
  'close-modal',
])

const router = useRouter()
const route = useRoute()

const store = useStore()

const isDreamTon9: ComputedRef<boolean> = computed(() => matrixById.value.matrix?.type === 'dream-ton_9')

const matrixById: ComputedRef<IMatrix> = computed(() => store.state.matrixById)

const partnersCountOfPartner: ComputedRef<number> = computed(() => store.state.partners.partnersPendingSecond.totalCount)
const partnersCount: ComputedRef<number> = computed(() => store.state.partners.partnersPending.totalCount)
const infinityPartnersCount: ComputedRef<number> = computed(() => store.state.matrixById.countInInfinity)

const ceils: ComputedRef<Ceils> = computed(() => store.state.matrixById?.ceilsCollection?.['1'])

const getTitle: ComputedRef<string> = computed(() => {
  const cells = matrixById.value.matrix?.ceils['1']
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

const selectedPartner = inject('selectedPartner') as Ref<Ceil>

const firstCeil: ComputedRef<Ceil> = computed(() => ceils.value?.['1'])
const secondCeil: ComputedRef<Ceil> = computed(() =>
    isDreamTon9.value ? ceils.value?.['1'] : ceils.value?.['2']
)

const interval: Ref<number | null> = ref(null)

const matrixIsInQueueForPublication: ComputedRef<boolean> = computed(() => {
  const ceilsCollection = store.state.matrixById?.ceilsCollection?.['1']
  return ceilsCollection ? Object.values(ceilsCollection).map(ceil => !!(ceil as Ceil).queueId).includes(true) : false
})

const loadMatrix = () => {
  if (matrixIsInQueueForPublication.value) {
    interval.value = setInterval(() => {
      store.dispatch('getMatrixByUUID', matrixById.value.matrix?.uuid);
    }, 3000);
  } else if (!matrixIsInQueueForPublication.value && interval.value) {
    clearInterval(interval.value);
  }
}

watch(() => matrixIsInQueueForPublication.value, () => {
  loadMatrix()
})

const getTypeForFirstCeil: ComputedRef<string> = computed(() => {
  if (isDreamTon9.value) {
    return 'disable3'
  }

  if (!matrixById.value?.matrix || firstCeil.value?.queueId) {
    return 'loading'
  }

  if (!firstCeil.value?.matrix && !firstCeil.value?.allowBuyClone && !firstCeil.value?.allowSniper) {
    return 'disable'
  }

  return matrixById.value.matrix.ceils['1']['1']
})

const getCellTypeFirstCeil: ComputedRef<string> = computed(() => {
  if (getTypeForFirstCeil.value === 'disable') {
    return matrixById.value.matrix?.ceils['1']['1'] ?? ''
  } else {
    return getTypeForFirstCeil.value
  }
})

const getTypeForSecondCeil: ComputedRef<string> = computed(() => {
  if (isDreamTon9.value) {
    return 'disable3'
  }

  if (!matrixById.value?.matrix || secondCeil.value?.queueId) {
    return 'loading'
  }

  if (
      !secondCeil.value?.matrix &&
      (!firstCeil.value?.matrix || !secondCeil.value?.allowBuyClone && !secondCeil.value?.allowSniper)
  ) {
    return 'disable'
  }

  return matrixById.value.matrix.ceils['1']['2']
})

const getCellTypeSecondCeil: ComputedRef<string> = computed(() => {
  if (getTypeForSecondCeil.value === 'disable') {
    return matrixById.value.matrix?.ceils['1']['2'] ?? ''
  } else {
    return getTypeForSecondCeil.value
  }
})

const getPosition = (depth: number, pos: number): IPosition => {
  return { depth, pos }
}

const openMInfinityCell = () => {
  store.dispatch('partners/getInfinityPartners', {
      parentId: store.state.matrixById.matrix?.id,
      isPartnerMatrix: true
  })
  emit('set-partner-by', 'id')
  emit('open-m-infinity-cell')
}

const openMPartnerWaiting = () => {
  emit('open-partner-waiting', 'view')
}

const openMAddPartner = (pos: IPosition) => {
  const ceil: Ceil = ceils.value[String(pos.pos)]
  if (!isDreamTon9.value && !ceil.queueId && (ceil?.allowSniper || ceil?.allowBuyClone)) {
    // emit('select-partner', null)
    emit('set-partner-by', 'id')
    emit('open-m-add-partner', pos)
  }
}

const openMMatrixPartner = (ceil: Ceil) => {
  if (!ceil?.matrix?.is_booster) {
    emit('set-partner-by', 'id')
    emit('open-m-matrix-partner')
    emit('select-matrix', ceil.matrix?.uuid)
  }
}

const getUser = () => {
  // @ts-ignore
  getUserInfo(selectedPartner.value.matrix?.owner.id)
}

const parentMatrix = async () => {
  const parentMatrixUUID = selectedPartner.value?.matrix?.parent_matrix_uuid
  if (parentMatrixUUID) {
    await router.push(route.path + `?uuid=${parentMatrixUUID}`)
    emit('select-matrix', null)
    store.commit('SET_MATRIX_BY_ID', {})

    const response = await store.dispatch('getMatrixByUUID', parentMatrixUUID)

    if (response?.error_code !== undefined) {
      emit('close-modal')
    }

    if (response?.data?.matrix) {
      emit('convert-matrix-to-cell', response.data.matrix)
    }
  }
}

onMounted(() => {
  loadMatrix()
})
</script>

<style scoped lang="scss">
@import "mMatrixPartner";
</style>