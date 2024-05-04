<template>
  <div class="add-partner-cell" :class="[props.type, props.size]">
    <div class="add-partner-cell__plus" :class="[props.type, automaticPlacement ? props.cellType : '' ]" @click="openMAddPartner">
      <svg v-if="props.type === 'loading'" class="add-partner-cell__plus__loader" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M31.9999 9.33325C27.5169 9.33325 23.1345 10.6626 19.407 13.1533C15.6795 15.6439 12.7742 19.184 11.0587 23.3258C9.34307 27.4675 8.8942 32.0251 9.7688 36.422C10.6434 40.8189 12.8022 44.8577 15.9722 48.0277C19.1422 51.1976 23.181 53.3564 27.5779 54.231C31.9748 55.1056 36.5323 54.6568 40.6741 52.9412C44.8159 51.2256 48.3559 48.3203 50.8466 44.5928C53.3372 40.8653 54.6666 36.483 54.6666 31.9999C54.6666 30.8953 55.562 29.9999 56.6666 29.9999C57.7711 29.9999 58.6666 30.8953 58.6666 31.9999C58.6666 37.2741 57.1026 42.4298 54.1724 46.8151C51.2423 51.2004 47.0775 54.6184 42.2048 56.6367C37.3321 58.655 31.9703 59.1831 26.7975 58.1542C21.6247 57.1252 16.8731 54.5855 13.1437 50.8561C9.41435 47.1267 6.8746 42.3751 5.84566 37.2023C4.81672 32.0295 5.34481 26.6677 7.36314 21.795C9.38148 16.9223 12.7994 12.7576 17.1847 9.82739C21.57 6.89722 26.7258 5.33325 31.9999 5.33325C33.1045 5.33325 33.9999 6.22868 33.9999 7.33325C33.9999 8.43782 33.1045 9.33325 31.9999 9.33325Z" fill="#7B879D"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M31.9999 9.33325C27.5169 9.33325 23.1345 10.6626 19.407 13.1533C15.6795 15.6439 12.7742 19.184 11.0587 23.3258C9.34307 27.4675 8.8942 32.0251 9.7688 36.422C10.6434 40.8189 12.8022 44.8577 15.9722 48.0277C19.1422 51.1976 23.181 53.3564 27.5779 54.231C31.9748 55.1056 36.5323 54.6568 40.6741 52.9412C44.8159 51.2256 48.3559 48.3203 50.8466 44.5928C53.3372 40.8653 54.6666 36.483 54.6666 31.9999C54.6666 30.8953 55.562 29.9999 56.6666 29.9999C57.7711 29.9999 58.6666 30.8953 58.6666 31.9999C58.6666 37.2741 57.1026 42.4298 54.1724 46.8151C51.2423 51.2004 47.0775 54.6184 42.2048 56.6367C37.3321 58.655 31.9703 59.1831 26.7975 58.1542C21.6247 57.1252 16.8731 54.5855 13.1437 50.8561C9.41435 47.1267 6.8746 42.3751 5.84566 37.2023C4.81672 32.0295 5.34481 26.6677 7.36314 21.795C9.38148 16.9223 12.7994 12.7576 17.1847 9.82739C21.57 6.89722 26.7258 5.33325 31.9999 5.33325C33.1045 5.33325 33.9999 6.22868 33.9999 7.33325C33.9999 8.43782 33.1045 9.33325 31.9999 9.33325Z" fill="#7B879D"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="65" height="64" viewBox="0 0 65 64" fill="none" v-else>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M32.5 6C33.6046 6 34.5 6.89543 34.5 8V56C34.5 57.1046 33.6046 58 32.5 58C31.3954 58 30.5 57.1046 30.5 56V8C30.5 6.89543 31.3954 6 32.5 6Z"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M58.5 32C58.5 33.1046 57.6046 34 56.5 34L8.5 34C7.39543 34 6.5 33.1046 6.5 32C6.5 30.8954 7.39543 30 8.5 30L56.5 30C57.6046 30 58.5 30.8954 58.5 32Z"/>
      </svg>
<!--      <Reward includeCar="include-car" />-->
      <Reward
          :freeze="fillReward.freeze"
          :custom="fillReward.custom"
          v-if="!['disable2', 'disable3', 'infinity', 'loading'].includes(props.type) && props.cellType !== 'infinity'"
      />
    </div>

    <div v-if="props.automaticPlacement" class="add-partner-cell__title add-partner-cell__title_mt-8">Автоматическая расстановка</div>
    <div v-else-if="props.type === 'disable3'" class="add-partner-cell__title add-partner-cell__title_mt-8">Недоступно</div>
    <div v-else-if="props.type === 'loading'" class="add-partner-cell__title add-partner-cell__title_mt-8">Недоступно</div>
    <div v-else-if="props.type === 'disable' && props.disabledTitle" class="add-partner-cell__title add-partner-cell__title_mt-8">
      {{ disabledTitle }}
    </div>
    <div
        class="add-partner-cell__title add-partner-cell__title_mt-8"
        v-html="props.title"
        v-else
        @click="openMAddPartner"
    />


    <div class="add-partner-cell__subtitle" @click="openMAddPartner">
      <div v-if="props.type === 'disable3'">На этой матрице нет накопительных ячеек</div>
      <div v-else-if="props.type === 'loading'">{{ props.loadingSubtitle }}</div>
      <div v-else-if="props.type === 'disable'">{{ props.disabledSubtitle }}</div>
      <div v-else-if="!props.automaticPlacement">{{ props.subtitle ? props.subtitle : `Доступно (${props.partnersCount ?? '-'})` }}</div>
      <slot name="subtitleIcon"/>
    </div>

    <CellType
        :size="props.size"
        :cell-type="props.cellType"
        :type="props.cellType"
        v-if="!['disable2', 'disable3'].includes(props.type) && props.cellType"
    />
  </div>
</template>

<script setup lang="ts">
import Reward from "@/components/UI/Reward/Reward.vue";
import CellType from "@/components/UI/CellType/CellType.vue";
import {
  computed,
  PropType
} from "vue";
import { Ceil } from "@/interfaces/store.interface.ts";

const props = defineProps({
  ceil: {
    type: Object as PropType<Ceil>,
    required: true,
  },
  partnersCount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    default: 'freeze',
    //freeze, profit, boost, infinity ,disable, disable2, loading
  },
  automaticPlacement: {
    type: Boolean,
    default: false,
  },
  cellType: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: 'Выставить партнера',
  },
  disabledSubtitle: {
    type: String,
    default: 'Доходная ячейка'
  },
  disabledTitle: {
    type: String,
    default: 'Недоступно'
  },
  loadingSubtitle: {
    type: String,
    default: 'Идет активация'
  },
  subtitle: {
    type: String,
  }
});

const emit = defineEmits(['open-m-add-partner'])

const openMAddPartner = () => {
  if (props.type === 'disable') return
  emit('open-m-add-partner')
}

const fillReward = computed(() => {
  const getFilteredRewards = (event: string) => props.ceil?.fillRevard.find(reward => reward.event === event)

  return {
    'custom': getFilteredRewards('custom')?.value.title,
    'freeze': getFilteredRewards('freeze')?.value.amount ?? getFilteredRewards('cashout')?.value.amount
  }
})
</script>

<style scoped lang="scss">
@import "addPartnerCell";
</style>