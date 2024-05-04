<template>
  <div class="partner-type" :class="[props.cellType, props.type, { 'boost': props.isBooster }]">
    <template v-if="showBoost">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M9.08377 1.33583C9.10725 1.33416 9.13118 1.33333 9.15511 1.33333V1.33458C9.15711 1.33458 9.15909 1.33458 9.16105 1.33458C9.16959 1.33459 9.17793 1.33466 9.18657 1.335C9.66427 1.3496 10.0458 1.71761 10.0458 2.16906C10.0458 2.23665 10.0374 2.30216 10.0205 2.36516L9.22468 6.28806L11.7829 6.29223C12.1166 6.29432 12.4206 6.47123 12.5712 6.75036C12.7214 7.02908 12.6926 7.36329 12.4968 7.61655L7.52483 14.3224C7.35289 14.544 7.12424 14.6667 6.84551 14.6667C6.72763 14.6667 6.60799 14.6445 6.4941 14.5987C6.11212 14.4447 5.89499 14.0625 5.97121 13.6791L6.77549 9.21708L4.21729 9.19956C3.88361 9.19706 3.57962 9.02015 3.42896 8.74101C3.27829 8.46188 3.30754 8.12809 3.5034 7.87482L8.46959 1.68631C8.48377 1.66712 8.49883 1.64834 8.51523 1.6304C8.57018 1.5699 8.63266 1.51733 8.7009 1.47477C8.82365 1.39717 8.92734 1.34751 9.08377 1.33583Z" fill="#A33FBC"/>
      </svg>
      BOOST
    </template>
    <template v-if="props.cellType === 'circle-avatar'">
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          @click="$emit('circle-avatar')"
      >
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99981 4.65369C7.06361 4.65369 6.31315 5.40884 6.31315 6.34035C6.31315 7.23954 7.01557 7.97269 7.90558 8.01929C7.9669 8.01428 8.03227 8.01384 8.09577 8.0192C8.98197 7.97185 9.68066 7.24154 9.68648 6.33894C9.68571 5.40906 8.92987 4.65369 7.99981 4.65369ZM5.31315 6.34035C5.31315 4.85854 6.50934 3.65369 7.99981 3.65369C9.48262 3.65369 10.6865 4.85754 10.6865 6.34035V6.34318C10.6783 7.78875 9.54127 8.97082 8.09685 9.02006C8.06752 9.02106 8.03816 9.01948 8.0091 9.01533C8.01197 9.01574 8.01254 9.0157 8.01069 9.01558C8.00897 9.01547 8.0061 9.01535 8.00231 9.01535C7.99412 9.01535 7.98656 9.0159 7.98183 9.01649C7.95561 9.01977 7.92918 9.02096 7.90278 9.02006C6.46089 8.97091 5.31315 7.79066 5.31315 6.34035Z" fill="#1A86E5"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.9644 11.6154C4.45094 11.9613 4.16393 12.357 4.0521 12.7331C5.12289 13.6298 6.49566 14.1664 7.99984 14.1664C9.50402 14.1664 10.8768 13.6298 11.9476 12.7331C11.8357 12.3568 11.5485 11.9609 11.0346 11.6149C10.2278 11.0753 9.13068 10.7898 8.00484 10.7898C6.87949 10.7898 5.77857 11.0751 4.9644 11.6154ZM8.00484 9.78975C9.28209 9.78975 10.5848 10.1108 11.5912 10.7842L11.5923 10.7849C12.3941 11.3244 12.9042 12.0567 12.9904 12.8669C13.0072 13.0248 12.948 13.1813 12.8309 13.2885C11.5557 14.4562 9.8631 15.1664 7.99984 15.1664C6.13658 15.1664 4.444 14.4562 3.16883 13.2885C3.05172 13.1813 2.99252 13.0248 3.00931 12.8669C3.0955 12.0567 3.6056 11.3244 4.40737 10.7849L4.40986 10.7833C5.42223 10.1108 6.72744 9.78975 8.00484 9.78975Z" fill="#1A86E5"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 1.83337C4.59424 1.83337 1.83333 4.59428 1.83333 8.00004C1.83333 11.4058 4.59409 14.1664 7.99984 14.1664C11.4056 14.1664 14.1667 11.4058 14.1667 8.00004C14.1667 4.59428 11.4058 1.83337 8 1.83337ZM0.833328 8.00004C0.833328 4.042 4.04195 0.833374 8 0.833374C11.958 0.833374 15.1667 4.042 15.1667 8.00004C15.1667 11.9581 11.9579 15.1664 7.99984 15.1664C4.0418 15.1664 0.833328 11.9581 0.833328 8.00004Z" fill="#1A86E5"/>
      </svg>
    </template>
    <template v-if="!['boost', 'chains-boost'].includes(props.type) && props.cellType !== 'circle-avatar' && !props.isBooster">
      <div
          class="partner-type__circle"
          :class="[getCircleFill(props.binstatus?.['1'], props.circles?.['1']), props.circles?.['1']]"
      >
        <span></span>
      </div>
      <div
          class="partner-type__circle"
          :class="[getCircleFill(props.binstatus?.['2'], props.circles?.['2']), props.circles?.['2']]"
      >
        <span></span>
      </div>
<!--      классы => ( fill-green, fill-orange, fill-blue, dashed-red, dashed-brown, dashed-mint  )  -->
<!--      В span передовать цифру при необходимости-->
    </template>
  </div>
</template>

<script setup lang="ts">
import { IObject } from "@/interfaces/store.interface.ts";
import { computed, PropType } from "vue";

const props = defineProps({
  binstatus: {
    type: Object,
    required: true,
  },
  cellType: {
    type: String,
    default: 'freeze'
    //freeze, profitable, boost, infinity, circle-avatar
  },
  isBooster: {
    type: Boolean,
    default: false,
  },
  circles: {
    type: Object as PropType<IObject>,
    //freeze, profitable
  },
  type: {
    type: String,
    default: ''
    //chains-boost,
  }
});

const showBoost = computed(() =>
    props.cellType === 'boost' ||
    props.cellType === 'chains-boost' ||
    props.type === 'chains-boost' ||
    props.isBooster
)

const getCircleFill = (binstatus: number, circleType?: string) => {
  switch (binstatus) {
    case 1:
      switch (circleType) {
        case 'freeze':
          return 'fill-blue'
        case 'profit':
          return 'fill-green'
        default:
          return 'fill-blue'
      }
    case 2:
      return 'dashed-red'
  }
}
</script>

<style scoped lang="scss">
@import "partnerType";
</style>