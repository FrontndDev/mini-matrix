<template>
  <Teleport to="body">
    <transition name="modal" class="modal">
      <div v-if="props.toggleModalConfirmPayment" class="modal__container">

        <div class="modal__content">
          <MConfirmPayment
              currency="currency"
              :price="-1"
          />
          <div @click="$emit('close-modal')" class="modal__overlay"></div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import MConfirmPayment from "./MConfirmPayment/MConfirmPayment.vue";

const props = defineProps({
  toggleModalConfirmPayment: {
    type: Boolean,
    default: false
  },
})
</script>

<style scoped lang="scss">
@import "modalConfirmPayment";
</style>