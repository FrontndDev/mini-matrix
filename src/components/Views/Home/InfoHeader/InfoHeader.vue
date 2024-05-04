<template>
  <div class="header-info">
    <Tabs
        :tabs="tabs"
        @open-cells="openCells"
    />
    <div class="header-info__selects">
      <div v-show="props.infoHeader === 1">
        <Select
            data="static"
            :items="selectItemsPartners"
            :selected-item="itemInfoHeaderFirst"
            @select="changeLineOfPartners"
        />
      </div>
      <div v-show="props.infoHeader === 2">
        <Select
            data="static"
            :items="selectItemsBoosters"
            :selected-item="itemInfoHeaderSecond"
            @select="changeLineOfBoosters"
        />
      </div>
      <div v-show="props.infoHeader !== 3">
        <Select
            keyObj="title"
            keyOfID="type"
            route="types"
            :items="listOfTypes?.types"
            :selected-item="itemInfoHeaderThird"
            @select="changeMatrixType"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tabs from "@/components/UI/Tabs/Tabs.vue";
import {
  computed,
  onMounted,
  reactive,
  ref,
  Ref,
  watch
} from "vue";
import Select from "@/components/UI/Select/Select.vue";
import { useStore } from "vuex";
import { ListOfTypes, Type } from "@/interfaces/store.interface.ts";
import { ILineOfPartners } from "@/interfaces/partners.interface.ts";

const props = defineProps({
  infoHeader: {
    type: Number,
    default: 1
  }
})

const store = useStore()
const emit = defineEmits(['open-cells'])

const listOfTypes: Ref<ListOfTypes> = computed(() => store.state.listOfTypes)

const levelIDOfPartners = computed(() => store.state.partners.levelID)
const levelIDOfBoosters = computed(() => store.state.boosters.levelID)

const itemInfoHeaderFirst: Ref<any> = ref(null)
const itemInfoHeaderSecond: Ref<any> = ref(null)
const itemInfoHeaderThird: Ref<any> = ref(null)

const changeLineOfPartners = (item: ILineOfPartners) => {
  itemInfoHeaderFirst.value = item
  store.dispatch('partners/getExposedPartners', { filter: item.id })
  store.dispatch('partners/getNewPendingPartners', { filter: item.id })
}

const changeLineOfBoosters = (item: ILineOfPartners) => {
  itemInfoHeaderSecond.value = item
  store.dispatch('boosters/getPendingBoosters', { filter: item.id })
  store.dispatch('boosters/getExposedBoosters', { filter: item.id })
}

const changeMatrixType = (item: Type) => {
  itemInfoHeaderThird.value = item
  store.commit('SET_NEW_TYPE_MATRIX', item.type)

  store.dispatch('partners/getExposedPartners', { filter: levelIDOfPartners.value })
  store.dispatch('partners/getNewPendingPartners', { filter: levelIDOfPartners.value })

  store.dispatch('boosters/getPendingBoosters', { filter:  levelIDOfBoosters.value })
  store.dispatch('boosters/getExposedBoosters', { filter:  levelIDOfBoosters.value })
}

const openCells = (id: number) => {
  emit('open-cells', id)
}

watch(() => store.state.selectedType, () => {
  store.dispatch('partners/getExposedPartners', { filter: levelIDOfPartners.value || 1, changeTab: true })

  store.dispatch('partners/getNewPendingPartners', { filter: levelIDOfPartners.value || 1, changeTab: true })

  store.dispatch('boosters/getPendingBoosters', { filter: levelIDOfBoosters.value || 0, changeTab: true })

  store.dispatch('boosters/getExposedBoosters', { filter: levelIDOfBoosters.value || 0, changeTab: true })

  store.dispatch('chains/getChainsList')

  store.dispatch('chains/getTeleportList')
})

const tabs = reactive([
  {
    id: 1,
    name: 'Партнеры',
    indicator: {
      green: computed(() => store.state.partners.newPartnersPending?.totalCount > 0),
      orange: computed(() => listOfTypes.value?.pending ? Object.keys(listOfTypes.value.pending).includes(store.state.selectedType.type) : false),
    },
  },
  {
    id: 2,
    name: 'Бустеры',
    indicator: false,
  },
  {
    id: 3,
    name: 'Цепочки',
    indicator: false,
    disabled: computed(() => import.meta.env.VITE_MATRIX_VERSION === 'no_chains')
  },
]);

const selectItemsPartners = reactive([
  {
    id: -1,
    name: 'Вся структура'
  },
  {
    id: 1,
    name: '1 линия'
  },
  {
    id: 2,
    name: '2 линия'
  },
  {
    id: 3,
    name: '3 линия'
  },
  {
    id: 4,
    name: '4 линия'
  },
  {
    id: 5,
    name: '5 линия'
  },
  {
    id: 6,
    name: '6 линия'
  },
  {
    id: 7,
    name: '7 линия'
  },
  {
    id: 8,
    name: '8 линия'
  },
  {
    id: 9,
    name: '9 линия'
  },
]);

const selectItemsBoosters = reactive([
  {
    id: -1,
    name: 'Вся структура'
  },
  {
    id: 0,
    name: 'Мои бустеры'
  },
  {
    id: 1,
    name: '1 линия'
  },
  {
    id: 2,
    name: '2 линия'
  },
  {
    id: 3,
    name: '3 линия'
  },
  {
    id: 4,
    name: '4 линия'
  },
  {
    id: 5,
    name: '5 линия'
  },
  {
    id: 6,
    name: '6 линия'
  },
  {
    id: 7,
    name: '7 линия'
  },
  {
    id: 8,
    name: '8 линия'
  },
  {
    id: 9,
    name: '9 линия'
  },
]);

const setItems = () => {
  itemInfoHeaderFirst.value = selectItemsPartners[1]
  itemInfoHeaderSecond.value = selectItemsBoosters[1]
  itemInfoHeaderThird.value = store.state.selectedType
}

watch(() => store.state.selectedType, () => {
  setItems()
})

onMounted(() => {
  setItems()
})
</script>

<style scoped lang="scss">
@import "infoHeader";
</style>