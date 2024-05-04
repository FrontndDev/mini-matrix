<template>
  <div class="modal-teleport">
    <div class="modal-teleport__head">
      <ModalHeader
          @close-modal="$emit('close-modal')"
      >
        Телепорт новичка
      </ModalHeader>
      <div class="modal-teleport__info">
        <span class="modal-teleport__text">
          Мгновенно откройте матрицы
          <span
              v-for="(matrixTitle, idx) in selectedPartnerForTeleport.openList"
          >
            {{ matrixTitle }}<template v-if="selectedPartnerForTeleport.openList.length !== idx + 1">,&nbsp;</template>
          </span>
          <br>
          для выбранного партнера
        </span>
        <button class="modal-teleport__btn" @click="moreDetails">
          <span>Подробнее</span>
          <svg class="rotate-img" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.73355 12.3999C6.53829 12.5952 6.22171 12.5952 6.02645 12.3999L1.97978 8.35327C1.88601 8.25951 1.83333 8.13233 1.83333 7.99972C1.83333 7.86711 1.88601 7.73993 1.97978 7.64617L6.02645 3.5995C6.22171 3.40424 6.53829 3.40424 6.73355 3.5995C6.92881 3.79476 6.92881 4.11135 6.73355 4.30661L3.04044 7.99972L6.73355 11.6928C6.92881 11.8881 6.92881 12.2047 6.73355 12.3999Z" fill="#1A86E5"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1665 7.99951C14.1665 8.27565 13.9426 8.49951 13.6665 8.49951H2.44646C2.17032 8.49951 1.94646 8.27565 1.94646 7.99951C1.94646 7.72337 2.17032 7.49951 2.44646 7.49951H13.6665C13.9426 7.49951 14.1665 7.72337 14.1665 7.99951Z" fill="#1A86E5"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="modal-teleport__block">
      <SmallCell
          type="teleport"
          :show-level-matrix="false"
          :cell="selectedPartnerForTeleport"
      />
    </div>
    <div class="modal-teleport__buttons">
      <CancelButton @click="cancel"/>
      <ChainsButton @click="teleport">
        <span>Телепортировать</span>
        <svg class="rotate-img" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.73355 12.3999C6.53829 12.5952 6.22171 12.5952 6.02645 12.3999L1.97978 8.35327C1.88601 8.25951 1.83333 8.13233 1.83333 7.99972C1.83333 7.86711 1.88601 7.73993 1.97978 7.64617L6.02645 3.5995C6.22171 3.40424 6.53829 3.40424 6.73355 3.5995C6.92881 3.79476 6.92881 4.11135 6.73355 4.30661L3.04044 7.99972L6.73355 11.6928C6.92881 11.8881 6.92881 12.2047 6.73355 12.3999Z" fill="#ffffff"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1665 7.99951C14.1665 8.27565 13.9426 8.49951 13.6665 8.49951H2.44646C2.17032 8.49951 1.94646 8.27565 1.94646 7.99951C1.94646 7.72337 2.17032 7.49951 2.44646 7.49951H13.6665C13.9426 7.49951 14.1665 7.72337 14.1665 7.99951Z" fill="#ffffff"/>
        </svg>
      </ChainsButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import ModalHeader from "@/components/ModalHeader/ModalHeader.vue";
import ChainsButton from "@/components/UI/ChainsButton/ChainsButton.vue";
import SmallCell from "@/components/SmallCell/SmallCell.vue";
import { useStore } from "vuex";
import {
  inject,
  Ref
} from "vue";
import CancelButton from "@/components/UI/CancelButton/CancelButton.vue";
import { ITeleports } from "@/interfaces/chains.interface.ts";

const emit = defineEmits(['close-modal'])

const store = useStore()

const selectedPartnerForTeleport = inject('selectedPartnerForTeleport') as Ref<ITeleports>

const moreDetails = () => {
  window.location.href = '/app/page/teleport'
}

const cancel = () => {
  emit('close-modal')
}

const teleport = () => {
  store.dispatch('chains/teleportPartner', {
    partnerId: selectedPartnerForTeleport.value.owner.id
  })
  emit('close-modal')
}
</script>

<style scoped lang="scss">
@import "mTeleport";
</style>