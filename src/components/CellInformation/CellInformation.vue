<template>
  <div class="cell-information" @click.stop="">
    <div class="cell-information__body">
      <div class="cell-information__icon" @click="toggleMobileContent">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99972 1.14282C4.21263 1.14282 1.14258 4.21287 1.14258 7.99997C1.14258 9.4694 1.60348 10.8278 2.38868 11.9428C3.28406 13.2143 4.59923 14.1665 6.12894 14.5991C6.53013 14.7126 6.94662 14.7905 7.37502 14.8291C7.5805 14.8476 7.78885 14.8571 7.99972 14.8571C10.2741 14.8571 12.2899 13.751 13.5392 12.0425C14.368 10.9091 14.8569 9.5133 14.8569 7.99997C14.8569 4.21287 11.7868 1.14282 7.99972 1.14282ZM8.00564 10.677L9.1426 6.72529H8.81642L6.951 7.12009L6.88033 7.33698C6.95644 7.33336 7.02168 7.33156 7.07604 7.33156C7.19564 7.33156 7.28987 7.36228 7.35873 7.42373C7.42758 7.48518 7.46201 7.55567 7.46201 7.63519C7.46201 7.76171 7.42577 7.94968 7.35329 8.1991L6.59765 10.7909C6.53604 10.9969 6.50523 11.1668 6.50523 11.3006C6.50523 11.503 6.57409 11.6711 6.71181 11.8048C6.85315 11.935 7.04161 12 7.27718 12C7.89329 12 8.47497 11.5247 9.02222 10.574L8.83739 10.4656C8.60907 10.8162 8.41336 11.0584 8.25027 11.1921C8.18866 11.2463 8.12705 11.2734 8.06544 11.2734C8.0292 11.2734 7.99477 11.2572 7.96215 11.2247C7.92953 11.1885 7.91322 11.1505 7.91322 11.1108C7.91322 11.0421 7.94403 10.8975 8.00564 10.677ZM9.01071 5.1428C9.01071 5.57977 8.65647 5.93401 8.2195 5.93401C7.78253 5.93401 7.42829 5.57977 7.42829 5.1428C7.42829 4.70583 7.78253 4.35159 8.2195 4.35159C8.65647 4.35159 9.01071 4.70583 9.01071 5.1428Z" fill="white"/>
        </svg>
      </div>
      <div class="cell-information__content" ref="tooltip" :class="props.tooltipPosition ?? getTooltipPosition">
        <CellInformationItem
            v-for="item in Object.values(types).filter(type2 => type2?.value)"
            :key="item.value"
            :item="item"
        />
      </div>

      <ModalCellInformation
          :ceil="props.ceil"
          :type="props.type"
          :types="Object.values(types).filter(type2 => type2?.value)"
          v-if="showMobileContent"
          @close-modal="hideMobileContent"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  type Component,
  computed,
  ComputedRef,
  PropType,
  Ref,
  ref,
} from "vue";
import {
  ICellInformation,
  Matrix
} from "@/interfaces/store.interface.ts";

// Тип ячейки
// @ts-ignore
import ProfitableIcon from '@/assets/svg/cellInformation/profitable.svg?component' // @ts-ignore
import CumulativeIcon from '@/assets/svg/cellInformation/cumulative.svg?component' // @ts-ignore
import EndlessIcon from '@/assets/svg/cellInformation/endless.svg?component' // @ts-ignore
// Способ активации
import UpgradeIcon from '@/assets/svg/cellInformation/upgrade.svg?component' // @ts-ignore
import PurchaseIcon from '@/assets/svg/cellInformation/purchase.svg?component' // @ts-ignore
import BoosterIcon from '@/assets/svg/cellInformation/booster.svg?component' // @ts-ignore
import BonusIcon from '@/assets/svg/cellInformation/bonus.svg?component' // @ts-ignore
// Тип партнера
import OwnerIcon from '@/assets/svg/cellInformation/owner.svg?component' // @ts-ignore
import OverflowIcon from '@/assets/svg/cellInformation/overflow.svg?component' // @ts-ignore
import CompressionIcon from '@/assets/svg/cellInformation/compression.svg?component' // @ts-ignore
//
import CalendarIcon from '@/assets/svg/cellInformation/calendar.svg?component'
//
import { useGetLevel } from "@/composables/useGetLevel.ts";
import ModalCellInformation from "@/components/Modals/ModalCellInformation/ModalCellInformation.vue";
import CellInformationItem from "@/components/CellInformation/CellInformationItem/CellInformationItem.vue";
import { ITeleports } from "@/interfaces/chains.interface.ts";

const props = defineProps({
  ceil: {
    type: Object as PropType<Matrix | ITeleports>,
    required: true,
  },
  type: {
    type: String,
    default: ''
  },
  userType: {
    type: String,
    required: true,
  },
  tooltipPosition: {
    type: String,
    // right, left
  }
})

const showMobileContent = ref(false)

const tooltip: Ref<HTMLDivElement | null> = ref(null)

const getTooltipPosition = computed(() => {
  const container = document.querySelector('.home__content') as HTMLDivElement
  return (tooltip.value?.getClientRects()[0]?.x ?? 0) + (tooltip.value?.clientWidth ?? 0) > container.clientWidth ? 'left' : 'right'
})

const toggleMobileContent = () => {
  if (window.innerWidth < 992) {
    showMobileContent.value = !showMobileContent.value
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
  }
}

const hideMobileContent = () => {
  showMobileContent.value = false
  document.body.style.overflow = 'auto'
  document.documentElement.style.overflow = 'auto'
}

const getIconAndValueForCeilType: ComputedRef<[Component, string] | undefined> = computed(() => {
  switch (props.type) {
    case 'profit':
    case 'booster':
      return [ProfitableIcon, 'Доходная']
    case 'freeze':
      return [CumulativeIcon, 'Накопительная']
    case 'infinity':
      return [EndlessIcon, 'Бесконечная']
  }
})

const getIconAndValueForActivationMethod: ComputedRef<[Component, string] | undefined> = computed(() => {
  const ceil = props.ceil

  switch (true) {
    case ('prev_type_matrix_id' in ceil && ceil.prev_type_matrix_id) ?? 0 > 0:
      return [UpgradeIcon, 'Апгрейд']
    case 'prev_type_matrix_id' in ceil && !ceil.prev_type_matrix_id && !ceil?.is_bonus:
      return [PurchaseIcon, 'Покупка']
    case 'is_bonus' in ceil && ceil.is_bonus:
      return [BonusIcon, 'Бонусный']
    case 'is_booster' in ceil && ceil.is_booster:
      return [BoosterIcon, 'Бустер']
    default:
      return [PurchaseIcon, 'Покупка']
  }
})

const getIconAndValueForPartnerType: ComputedRef<[Component, string] | undefined> = computed(() => {
  switch (props.userType) {
    case 'referal':
      return [OwnerIcon, 'Личник']
    case 'overflow':
      return [OverflowIcon, 'Перелив']
    case 'deep':
      return [CompressionIcon, `Компрессия <span>(${useGetLevel(props.ceil?.owner?.lvl_insystem)} lvl)</span>`]
    case 'owner':
      return [OwnerIcon, 'Вы']
    default:
      return [OwnerIcon, 'Личник']
  }
})

const types: ComputedRef<ICellInformation> = computed(() => {
  if ('is_booster' in props.ceil && props.ceil.is_booster) {
    // Информер для Бустера
    return {
      ceilType: {
        icon: getIconAndValueForCeilType.value?.[0],
        title: 'Тип ячейки',
        value: getIconAndValueForCeilType.value?.[1],
        // Доходная, Накопительная
      },
      activationMethod: {
        icon: getIconAndValueForActivationMethod.value?.[0],
        title: 'Способ активации',
        value: getIconAndValueForActivationMethod.value?.[1],
        // Покупка, Бонусный, Телепорт новичка, Закрытие цепочки
      },
      createDate: {
        icon: CalendarIcon,
        title: 'Дата активации',
        value: props.ceil.create_date
      },
    } as ICellInformation
  } else {
    // Информер для партнера
    return {
      ceilType: {
        icon: getIconAndValueForCeilType.value?.[0],
        title: 'Тип ячейки',
        value: getIconAndValueForCeilType.value?.[1],
        // Доходная, Накопительная, Бесконечная, В ожидании
      },
      activationMethod: {
        icon: getIconAndValueForActivationMethod.value?.[0],
        title: 'Способ активации',
        value: getIconAndValueForActivationMethod.value?.[1],
        // Апгрейд, Покупка, Бустер
      },
      createDate: {
        icon: CalendarIcon,
        title: 'Дата активации',
        value: (props.ceil as Matrix).create_date
      },
      partnerType: {
        icon: getIconAndValueForPartnerType.value?.[0],
        title: 'Тип партнера',
        value: getIconAndValueForPartnerType.value?.[1],
        // Личник, Перелив, Компрессия
      },
    } as ICellInformation
  }
})
</script>

<style scoped lang="scss">
@import "cellInformation";
</style>