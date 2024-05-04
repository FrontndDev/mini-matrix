<template>
  <div class="pagination-matrix">
    <svg
        class="pagination-matrix__arrow-left"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        :class="{ 'arrow-active': selectedPage !== 1 }"
        @click="selectPage(selectedPage - 1)"
    >
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.73355 12.3999C6.53829 12.5952 6.22171 12.5952 6.02645 12.3999L1.97978 8.35327C1.88601 8.25951 1.83333 8.13233 1.83333 7.99972C1.83333 7.86711 1.88601 7.73993 1.97978 7.64617L6.02645 3.5995C6.22171 3.40424 6.53829 3.40424 6.73355 3.5995C6.92881 3.79476 6.92881 4.11135 6.73355 4.30661L3.04044 7.99972L6.73355 11.6928C6.92881 11.8881 6.92881 12.2047 6.73355 12.3999Z" fill="#C4CAD4"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1665 7.99951C14.1665 8.27565 13.9426 8.49951 13.6665 8.49951H2.44646C2.17032 8.49951 1.94646 8.27565 1.94646 7.99951C1.94646 7.72337 2.17032 7.49951 2.44646 7.49951H13.6665C13.9426 7.49951 14.1665 7.72337 14.1665 7.99951Z" fill="#C4CAD4"/>
    </svg>
    <div class="pagination-matrix__container">
      <template v-if="(getNumbers.at(-1) as number) > getNumbers2?.[0] - 2 && props.count > 11">
        <div
            class="pagination-matrix__tab"
            :class="{ 'active': num === props.selectedPage }"
            v-for="num in 5"
            :key="num"
            @click="selectPage(num)"
        >{{ num }}</div>
        <div class="pagination-matrix__tab">...</div>
      </template>
      <div
          class="pagination-matrix__tab"
          :class="{ 'active': num === props.selectedPage }"
          v-for="num in getNumbers"
          :key="num"
          @click="selectPage(num)"
      >{{ num }}</div>
      <template v-if="(getNumbers.at(-1) as number) < getNumbers2?.[0] - 1">
        <div class="pagination-matrix__tab">...</div>
        <div
            class="pagination-matrix__tab"
            :class="{ 'active': num === props.selectedPage }"
            v-for="num in getNumbers2"
            :key="num"
            @click="selectPage(num)"
        >{{ num }}</div>
      </template>
    </div>
    <svg
        class="pagination-matrix__arrow-right"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        :class="{ 'arrow-active': selectedPage !== props.count }"
        @click="selectPage(selectedPage + 1)"
    >
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.73355 12.3999C6.53829 12.5952 6.22171 12.5952 6.02645 12.3999L1.97978 8.35327C1.88601 8.25951 1.83333 8.13233 1.83333 7.99972C1.83333 7.86711 1.88601 7.73993 1.97978 7.64617L6.02645 3.5995C6.22171 3.40424 6.53829 3.40424 6.73355 3.5995C6.92881 3.79476 6.92881 4.11135 6.73355 4.30661L3.04044 7.99972L6.73355 11.6928C6.92881 11.8881 6.92881 12.2047 6.73355 12.3999Z" fill="#C4CAD4"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1665 7.99951C14.1665 8.27565 13.9426 8.49951 13.6665 8.49951H2.44646C2.17032 8.49951 1.94646 8.27565 1.94646 7.99951C1.94646 7.72337 2.17032 7.49951 2.44646 7.49951H13.6665C13.9426 7.49951 14.1665 7.72337 14.1665 7.99951Z" fill="#C4CAD4"/>
    </svg>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  ComputedRef
} from "vue";

const props = defineProps({
  selectedPage: {
    type: Number,
    default: 1,
  },
  count: {
    type: Number,
    default: 1,
  }
})

const emit = defineEmits(['select-page'])

const selectPage = (page: number) => {
  if (page <= props.count && page > 0) {
    emit('select-page', page)
  }
}

const getNumbers: ComputedRef<number[]> = computed(() => {
  let count = []

  for (let i = 0; i < props.count; i++) count.push(i + 1)
  const idx = count.indexOf(props.selectedPage)

  return props.count <= 11 ? count : count.slice(idx ? idx - 1 : idx, idx ? idx + 4 : idx + 5)
})

const getNumbers2: ComputedRef<number[]> = computed(() => {
  let numbersArray = [];

  for (let i = props.count; i >= props.count - 5; i--) {
    numbersArray.push(i);
  }

  return numbersArray.reverse()
})
</script>

<style scoped lang="scss">
@import "pagination";
</style>