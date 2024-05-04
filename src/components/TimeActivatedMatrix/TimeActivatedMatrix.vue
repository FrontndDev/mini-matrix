<template>
  <div class="time-activated-matrix">
    <div class="time-activated-matrix__timer">
      <div class="time-activated-matrix__timer__number">{{ String(hours).padStart(2, '0') }}</div>
      <div class="time-activated-matrix__timer__dots">
        <div></div>
        <div></div>
      </div>
      <div class="time-activated-matrix__timer__number">{{ String(minutes).padStart(2, '0') }}</div>
      <div class="time-activated-matrix__timer__dots">
        <div></div>
        <div></div>
      </div>
      <div class="time-activated-matrix__timer__number">{{ String(seconds).padStart(2, '0') }}</div>
    </div>
    <div class="time-activated-matrix__text">
      <h3>Не упустите прибыль!</h3>
      <div class="text__column" v-html="matrixByType?.ctaText"/>
      <!--        <div>Ваш партнер <a> Иванов Иван </a>активировал матрицу D5.</div>-->
      <!--        <div>Заполните накопительные ячейки в предыдущей матрице или активируйте её, чтобы не упустить прибыль.</div>-->
    </div>
    <ActivateButton
        :price="selectedType.price"
        @click="openPaymentForm"
    />
  </div>
</template>

<script setup lang="ts">
import ActivateButton from "@/components/UI/ActivateButton/ActivateButton.vue";
import {
  computed,
  ComputedRef,
} from "vue";
import { useStore } from "vuex";
import {
  IMatrix,
  Type
} from "@/interfaces/store.interface.ts";

const store = useStore()

const selectedType: ComputedRef<Type> = computed(() => store.state.selectedType)
const matrixByType: ComputedRef<IMatrix> = computed(() => store.state.matrixByType)

const time: ComputedRef<number> = computed(() => store.state.listOfTypes.teamOpened[selectedType.value.type])

const hours = computed(() => Math.floor(time.value / 3600))
const remainingSeconds = computed(() => time.value % 3600)
const minutes = computed(() => Math.floor(remainingSeconds.value / 60))
const seconds = computed(() => remainingSeconds.value % 60)

const openPaymentForm = () => {
  store.dispatch('getPaymentForm', selectedType.value.type)
}
</script>

<style scoped lang="scss">
@import "timeActivatedMatrix";
</style>