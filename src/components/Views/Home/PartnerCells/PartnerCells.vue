<template>
  <div class="partners-cells">
    <div class="partners-cells__header">
      <Tabs
          type="little"
          :cells="true"
          :tabs="tabs"
          @toggle-expose-tabs="selectTab"
      />
    </div>
    <div class="partners-cells__container">
      <SmallCell
          v-for="(cell, idx) in partnersPending?.list"
          :key="idx"
          :cell="cell"
          :type="cell?.time_to_activate ? `time` : ''"
          :show-partner-type="!isDreamTon9"
          @open-m-matrix-partner="openMMatrixPartner(cell)"
          v-if="littleTabID === 1"
      />
      <SmallCell
          v-for="(cell, idx) in partnersExposed?.list"
          :key="idx"
          :cell="cell"
          :type="cell?.time_to_activate ? `time` : ''"
          :show-partner-type="!isDreamTon9"
          @open-m-matrix-partner="openMMatrixPartner(cell)"
          v-if="littleTabID === 2"
      />
    </div>
  </div>
  <EmptyCells
      cellsType="partners"
      v-if="partnersPending?.list?.length === 0 && littleTabID === 1 || partnersExposed?.list?.length === 0 && littleTabID === 2"
  />

  <Pagination
      :count="data.find(tab => tab.id === littleTabID)?.value?.totalPages"
      :selected-page="selectedPage"
      v-if="(data.find(tab => tab.id === littleTabID)?.value?.totalPages ?? 0) > 1"
      @select-page="selectPage"
  />
</template>

<script setup lang="ts">
import Tabs from "@/components/UI/Tabs/Tabs.vue";
import {
  reactive,
  computed,
  ComputedRef
} from "vue";
import SmallCell from "@/components/SmallCell/SmallCell.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
import EmptyCells from "@/components/EmptyCells/EmptyCells.vue";
import { useStore } from "vuex";
import { IPartners } from "@/interfaces/partners.interface.ts";
import {
  Matrix
} from "@/interfaces/store.interface.ts";

const emit = defineEmits(['open-m-matrix-partner', 'select-matrix'])

const store = useStore()

const isDreamTon9: ComputedRef<boolean> = computed(() => store.state.newTypeMatrix === 'dream-ton_9')

const partnersExposed: ComputedRef<IPartners> = computed(() => store.state.partners.partnersExposed)
const partnersPending: ComputedRef<IPartners> = computed(() => store.state.partners.newPartnersPending)

const littleTabID: ComputedRef<number> = computed(() => store.state.littleTabID)

const selectedPage: ComputedRef<number> = computed(() => store.state.partners.pageIdPartners)

const tabs = reactive([
  {
    id: 1,
    name: 'В ожидании',
    value: computed(() => partnersPending.value?.totalCount)
  },
  {
    id: 2,
    name: 'Выставленные',
    value: computed(() => partnersExposed.value?.totalCount)
  },
]);


const data = reactive([
  {
    id: 1,
    name: 'В ожидании',
    value: computed(() => partnersPending.value)
  },
  {
    id: 2,
    name: 'Выставленные',
    value: computed(() => partnersExposed.value)
  },
])

const levelIDOfPartners = computed(() => store.state.partners.levelID)

const selectPage = (page: number) => {
  store.commit('partners/SET_PAGE_ID_PARTNERS', page)

  switch (littleTabID.value) {
    case 1:
      store.dispatch('partners/getNewPendingPartners', { filter: levelIDOfPartners.value || 1, changeTab: false })
      break
    case 2:
      store.dispatch('partners/getExposedPartners', { filter: levelIDOfPartners.value || 1, changeTab: false })
      break
  }
}

const selectTab = () => {
  selectPage(1)
}

const openMMatrixPartner = (matrix: Matrix) => {
  emit('open-m-matrix-partner')
  emit('select-matrix', matrix.uuid)
}
</script>

<style scoped lang="scss">
@import "partnerCells";
</style>