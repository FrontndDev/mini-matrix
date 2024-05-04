<template>
  <div class="boosters-cells">
    <div class="boosters-cells__header">
      <Tabs
          type="little"
          :tabs="tabs"
          :cells="true"
          @toggle-expose-tabs="selectTab"
      />
    </div>
    <div class="boosters-cells__container">
      <SmallCell
          type="chains-boost"
          cell-type="chains-boost"
          :show-cell-information="false"
          v-for="(cell, idx) in boostersPending?.list"
          :cell="cell"
          :key="idx"
          v-if="littleTabID === 3"
      />

      <SmallCell
          type="chains-boost"
          cell-type="chains-boost"
          :show-cell-information="false"
          v-for="(cell, idx) in boostersExposed?.list"
          :cell="cell"
          :key="idx"
          v-if="littleTabID === 4"
          @open-m-matrix-partner="openMMatrixPartner(cell)"
      />
    </div>
  </div>

  <EmptyCells
      v-if="boostersPending.list?.length === 0 && littleTabID === 3 || boostersExposed.list?.length === 0 && littleTabID === 4"
      :cellsType="'boosters'"
  />

  <Pagination
      :count="data.find(tab => tab.id === littleTabID)?.value?.totalPages"
      :selected-page="selectedPage"
      v-if="(data.find(tab => tab.id === littleTabID)?.value?.totalPages ?? 0) > 1"
      @select-page="selectPage"
  />
</template>

<script setup lang="ts">
import {
  computed,
  ComputedRef,
  reactive
} from "vue";

import SmallCell from "@/components/SmallCell/SmallCell.vue";
import Tabs from "@/components/UI/Tabs/Tabs.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
import EmptyCells from "@/components/EmptyCells/EmptyCells.vue";
import { useStore } from "vuex";
import { IPartners } from "@/interfaces/partners.interface.ts";
import { Matrix } from "@/interfaces/store.interface.ts";

const emit = defineEmits(['open-m-matrix-partner', 'select-matrix'])

const store = useStore()
const boostersPending: ComputedRef<IPartners> = computed(() => store.state.boosters.boostersPending)
const boostersExposed: ComputedRef<IPartners> = computed(() => store.state.boosters.boostersExposed)

const littleTabID: ComputedRef<number> = computed(() => store.state.littleTabID)

const levelIDOfBoosters = computed(() => store.state.boosters.levelID)

const selectedPage: ComputedRef<number> = computed(() => store.state.boosters.pageIdBooster)

const selectPage = (page: number) => {
  store.commit('boosters/SET_PAGE_ID_BOOSTERS', page)

  store.dispatch('boosters/getPendingBoosters', { changeTab: false, filter: levelIDOfBoosters.value })
  store.dispatch('boosters/getExposedBoosters', { changeTab: false, filter: levelIDOfBoosters.value })
}

const selectTab = () => {
  selectPage(1)
}

const tabs = reactive([
  {
    id: 3,
    name: 'В ожидании',
    value: computed(() => boostersPending.value.totalCount)
  },
  {
    id: 4,
    name: 'Выставленные',
    value: computed(() => boostersExposed.value.totalCount)
  },
]);

const data = reactive([
  {
    id: 3,
    value: computed(() => boostersPending.value)
  },
  {
    id: 4,
    value: computed(() => boostersExposed.value)
  },
])

const openMMatrixPartner = (matrix: Matrix) => {
  emit('open-m-matrix-partner')
  emit('select-matrix', matrix.uuid)
}
</script>

<style scoped lang="scss">
@import "boostersCells";
</style>