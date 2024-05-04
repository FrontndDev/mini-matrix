<template>
  <div class="infinity-partner-card" :class="props.modal">
    <CountOfPartners
        :partners-count="props.partnersCount"
        v-if="!props.loading"
        @open-modal="openInfinityPartnersModal"
    />
    <div
        class="infinity-partner-card__loading"
        :class="props.modal"
        v-if="props.loading"
    >
      <div class="infinity-partner-card__loading-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9999 5.83325C17.198 5.83325 14.459 6.66411 12.1293 8.22077C9.79965 9.77742 7.98387 11.9899 6.91163 14.5786C5.83939 17.1672 5.55884 20.0156 6.10547 22.7637C6.65209 25.5118 8.00134 28.036 9.98258 30.0173C11.9638 31.9985 14.4881 33.3478 17.2361 33.8944C19.9842 34.441 22.8327 34.1604 25.4213 33.0882C28.0099 32.016 30.2224 30.2002 31.7791 27.8705C33.3357 25.5408 34.1666 22.8018 34.1666 19.9999C34.1666 19.3096 34.7262 18.7499 35.4166 18.7499C36.1069 18.7499 36.6666 19.3096 36.6666 19.9999C36.6666 23.2963 35.6891 26.5186 33.8577 29.2594C32.0264 32.0002 29.4234 34.1364 26.378 35.3979C23.3325 36.6594 19.9814 36.9894 16.7484 36.3463C13.5154 35.7033 10.5457 34.1159 8.21481 31.785C5.88394 29.4542 4.29659 26.4844 3.6535 23.2514C3.01042 20.0184 3.34047 16.6673 4.60193 13.6219C5.86339 10.5764 7.9996 7.97345 10.7404 6.14209C13.4812 4.31073 16.7036 3.33325 19.9999 3.33325C20.6903 3.33325 21.2499 3.8929 21.2499 4.58325C21.2499 5.27361 20.6903 5.83325 19.9999 5.83325Z" fill="#7B879D"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9999 5.83325C17.198 5.83325 14.459 6.66411 12.1293 8.22077C9.79965 9.77742 7.98387 11.9899 6.91163 14.5786C5.83939 17.1672 5.55884 20.0156 6.10547 22.7637C6.65209 25.5118 8.00134 28.036 9.98258 30.0173C11.9638 31.9985 14.4881 33.3478 17.2361 33.8944C19.9842 34.441 22.8327 34.1604 25.4213 33.0882C28.0099 32.016 30.2224 30.2002 31.7791 27.8705C33.3357 25.5408 34.1666 22.8018 34.1666 19.9999C34.1666 19.3096 34.7262 18.7499 35.4166 18.7499C36.1069 18.7499 36.6666 19.3096 36.6666 19.9999C36.6666 23.2963 35.6891 26.5186 33.8577 29.2594C32.0264 32.0002 29.4234 34.1364 26.378 35.3979C23.3325 36.6594 19.9814 36.9894 16.7484 36.3463C13.5154 35.7033 10.5457 34.1159 8.21481 31.785C5.88394 29.4542 4.29659 26.4844 3.6535 23.2514C3.01042 20.0184 3.34047 16.6673 4.60193 13.6219C5.86339 10.5764 7.9996 7.97345 10.7404 6.14209C13.4812 4.31073 16.7036 3.33325 19.9999 3.33325C20.6903 3.33325 21.2499 3.8929 21.2499 4.58325C21.2499 5.27361 20.6903 5.83325 19.9999 5.83325Z" fill="#7B879D"/>
        </svg>
      </div>
      <span class="infinity-partner-card__loading-title">Обновление</span>
    </div>
    <div class="infinity-partner-card__awards" v-if="props.modal !== 'm-matrix-partner'">
      <div class="infinity-partner-card__awards-title">Награды</div>
      <div class="infinity-partner-card__awards-bonuses infinity-partner-card__awards-bonuses_mt-8">
        <BonusItem type="cashout" :values="fillReward.cashout" v-if="fillReward.cashout.length"/>
        <BonusItem type="custom" :values="fillReward.custom" v-if="fillReward.custom.length"/>
        <BonusItem type="boost" :values="fillReward.boost" v-if="fillReward.boost.length"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BonusItem from "./BonusItem/BonusItem.vue";
import {
  computed,
  ComputedRef,
  PropType,
} from "vue";
import {
  Ceil,
  Type
} from "@/interfaces/store.interface.ts";
import { useStore } from "vuex";
import CountOfPartners from "@/components/UI/CountOfPartners/CountOfPartners.vue";

const props = defineProps({
  ceil: {
    type: Object as PropType<Ceil>,
    required: true,
  },
  partnersCount: {
    type: Number,
    required: true,
  },
  modal: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['open-m-infinity-cell'])

const store = useStore()

const types: ComputedRef<Type[]> = computed(() => store.state.listOfTypes.types)

const fillReward = computed(() => {
  const getFilteredRewards = (event: string) => props.ceil?.fillRevard.filter(reward => reward.event === event)

  return {
    'boost': getFilteredRewards('boost')
        .map(reward => types.value.find(type => type.type === reward.value?.type)?.title) as string[],
    'cashout': getFilteredRewards('cashout').map(reward => reward.value.amount) as number[],
    'custom': getFilteredRewards('custom').map(reward => reward.value.title) as string[],
  }
})

const openInfinityPartnersModal = () => {
  if (props.partnersCount) {
    emit('open-m-infinity-cell')
  }
}
</script>

<style scoped lang="scss">
@import "infinityPartnerCard";
</style>