<template>
  <div class="chains-cells">
    <div class="chains-cells__header">
      <Tabs
          type="little"
          :tabs="tabs"
          :cells="true"
          @toggle-expose-tabs="selectTab"
          @set-checkbox-value="setCheckboxValue"
      />
    </div>
    <div class="chains-cells__container">
      <template v-if="showSkeletonLoader">
        <SmallCell v-for="item in 6" :key="item"/>
      </template>
      <ChainCell
          type="default"
          v-for="cell in chainsList?.list"
          :key="cell?.uuid"
          :uuid="cell?.uuid"
          :cost="cell.price?.amount"
          :reward="cell.profit?.amount ?? 0"
          :matrixStart="cell?.start"
          :matrixEnd="cell?.end"
          :countLinks="cell?.count_links"
          :avatar="cell?.initiator.photo"
          @open-general-chains="openGeneralChains"
          v-if="littleTabID === 5"
      />
      <ChainCell
          type="teleport"
          matrix-end="D4"
          v-for="cell in teleportList?.list"
          :key="cell.owner.id"
          :id="cell.owner.id"
          :reward="cell.profit.amount"
          :matrixStart="cell.startMatrix"
          :avatar="cell.owner.photo"
          @click="$emit('open-m-teleport', cell)"
          v-if="littleTabID === 6"
      />
    </div>
  </div>
  <EmptyCells
      cellsType="chains"
      v-if="littleTabID === 5 && chainsList.totalCount === 0 || littleTabID === 6 && teleportList.totalCount === 0"
  />
  <Pagination
      :count="data.find(tab => tab.id === littleTabID)?.value?.totalPages"
      :selected-page="selectedPage"
      v-if="(data.find(tab => tab.id === littleTabID)?.value?.totalPages ?? 0) > 1"
      @select-page="selectPage"
  />

  <ModalTeleportSettings
      :teleport-checkbox="teleportCheckbox"
      v-if="showTeleportSettingsModal"
      @set-teleport-checkbox-value="setCheckboxValue"
      @close-modal="showTeleportSettingsModal = false"
  />
</template>

<script setup lang="ts">
import Tabs from "@/components/UI/Tabs/Tabs.vue";
import {
  computed,
  ComputedRef,
  reactive,
  ref,
  provide,
  onMounted,
} from "vue";
import ChainCell from "@/components/ChainCell/ChainCell.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
import EmptyCells from "@/components/EmptyCells/EmptyCells.vue";
import {
  IChainsList,
  ITeleportList
} from "@/interfaces/chains.interface.ts";
import { useStore } from "vuex";
import ModalTeleportSettings from "@/components/Modals/ModalTeleportSettings/ModalTeleportSettings.vue";
import { ListOfTypes } from "@/interfaces/store.interface.ts";
import SmallCell from "@/components/SmallCell/SmallCell.vue";

const store = useStore()

const listOfTypes: ComputedRef<ListOfTypes> = computed(() => store.state.listOfTypes)

const chainsList: ComputedRef<IChainsList> = computed(() => store.state.chains.chainsList)
const teleportList: ComputedRef<ITeleportList> = computed(() => store.state.chains.teleportList)

const littleTabID: ComputedRef<number> = computed(() => store.state.littleTabID)

const emit = defineEmits([
  'open-general-chains',
  'open-m-teleport',
  'select-chain',
])

const selectedPage: ComputedRef<number> = computed(() => store.state.chains.pageIdChains)

const selectPage = (page: number) => {
  store.commit('chains/SET_PAGE_ID_CHAINS', page)
  switch (littleTabID.value) {
    case 5:
      store.dispatch('chains/getChainsList')
      break
    case 6:
      store.dispatch('chains/getTeleportList')
      break
  }
}

const selectTab = () => {
  selectPage(1)
}

const teleportCheckbox = ref(false)
const showTeleportSettingsModal = ref(false)

provide('teleportCheckbox', teleportCheckbox)

const hideCheckboxInTeleportTab = computed(() =>
    listOfTypes.value.opened.includes('dream-ton_4') || !listOfTypes.value.opened.includes('dream-ton_5')
)

const tabs = reactive([
  {
    id: 5,
    name: 'Прибыльные',
    value: computed(() => chainsList.value.totalCount)
  },
  {
    id: 6,
    name: 'Телепорт',
    value: computed(() => teleportList.value.totalCount),
    disabled: computed(() =>
        import.meta.env.VITE_CHAINS_TELEPORT ? import.meta.env.VITE_CHAINS_TELEPORT !== 'on' : false
    ),
    checkbox: !hideCheckboxInTeleportTab.value,
    tooltip: computed(() => `Ваш куратор ${teleportCheckbox.value ? 'может' : 'не может'} <br> использовать телепорт <br> новичка на вас`),
  },
]);

const data = reactive([
  {
    id: 5,
    value: computed(() => chainsList.value)
  },
  {
    id: 6,
    value: computed(() => teleportList.value)
  },
])

const openGeneralChains = (uuid: string) => {
  emit('select-chain', chainsList.value?.list?.find(chain => chain.uuid === uuid))
  console.log('chainsList.value?.list?.find(chain => chain.uuid === uuid)', chainsList.value?.list?.find(chain => chain.uuid === uuid))
  console.log('uuid', uuid)
  emit('open-general-chains')
}

const setCheckboxValue = (value: boolean, id: number) => {
  if (id === 6) {
    if (window.innerWidth <= 992 && !showTeleportSettingsModal.value) {
      showTeleportSettingsModal.value = true
    } else {
      teleportCheckbox.value = value
      store.dispatch('switchTeleport', { enable: value })
    }
  }
}

const showSkeletonLoader = computed(() =>
    !chainsList.value?.list && littleTabID.value === 5 || !teleportList.value?.list && littleTabID.value === 6
)

onMounted(() => {
  // @ts-ignore
  teleportCheckbox.value = !!window?.TELEPORT_ENABLE
})
</script>

<style scoped lang="scss">
@import "chainsCells";
</style>