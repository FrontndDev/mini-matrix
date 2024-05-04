<template>
  <Teleport to="body">
    <transition name="modal" class="modal">
      <div v-if="props.toggleModalPaymentForm" class="modal__container">
        <div class="modal__content">
          <div class="modal-payment-form">
            <div v-html="store.state.paymentForm" />
            <Preloader :with-text="true" v-if="!store.state.paymentForm"/>
          </div>
          <div @click="$emit('close-modal')" class="modal__overlay"></div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import Preloader from "@/components/UI/Preloader/Preloader.vue";

const store = useStore()

const props = defineProps({
  toggleModalPaymentForm: {
    type: Boolean,
    default: false
  }
})

</script>

<style scoped lang="scss">
@import "modalPaymentForm";
</style>