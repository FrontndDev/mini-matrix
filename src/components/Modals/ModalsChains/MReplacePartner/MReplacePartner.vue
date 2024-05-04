<template>
  <div class="replace-partner">
    <div class="replace-partner__content">
      <ModalHeader
          @close-modal="$emit('close-modal')"
          @open-general-chains="$emit('open-general-chains')"
          :modalHeader="'back'"
      >
        Заменить партнера
      </ModalHeader>
      <div class="replace-partner__container">
        <div
            class="replace-partner__overflow"
            :class="[{ 'four': chainDetails.length === 4 }, {'less-three': chainDetails.length < 4 }]"
        >

          <div v-for="cell in chainDetails" class="replace-partner__cell">
            <div class="replace-partner__block">
              <div class="replace-partner__level">D1</div>
              <SmallCell
                  :type="getTypeForCeil(cell)"
                  :cell-type="getTypeForCeil(cell)"
                  :cell="cell"
              />
              <div class="replace-partner__change-partner">
                <button
                    @click="$emit('open-change-partner')"
                >
                  Заменить на партнера
                </button>
                <span>Доступно (1)</span>
              </div>
            </div>
          </div>

        </div>
        <div class="replace-partner__container--line"></div>
        <ChainsButton>
          <span>Продолжить</span>
          <svg class="rotate-img" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.73355 12.3999C6.53829 12.5952 6.22171 12.5952 6.02645 12.3999L1.97978 8.35327C1.88601 8.25951 1.83333 8.13233 1.83333 7.99972C1.83333 7.86711 1.88601 7.73993 1.97978 7.64617L6.02645 3.5995C6.22171 3.40424 6.53829 3.40424 6.73355 3.5995C6.92881 3.79476 6.92881 4.11135 6.73355 4.30661L3.04044 7.99972L6.73355 11.6928C6.92881 11.8881 6.92881 12.2047 6.73355 12.3999Z" fill="#ffffff"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1665 7.99951C14.1665 8.27565 13.9426 8.49951 13.6665 8.49951H2.44646C2.17032 8.49951 1.94646 8.27565 1.94646 7.99951C1.94646 7.72337 2.17032 7.49951 2.44646 7.49951H13.6665C13.9426 7.49951 14.1665 7.72337 14.1665 7.99951Z" fill="#ffffff"/>
          </svg>
        </ChainsButton>
      </div>
    </div>
    <CopyLink />
  </div>
</template>

<script setup lang="ts">
import ModalHeader from "@/components/ModalHeader/ModalHeader.vue";
import CopyLink from "@/components/Views/Home/CopyLink/CopyLink.vue";
import ChainsButton from "@/components/UI/ChainsButton/ChainsButton.vue";
import SmallCell from "@/components/SmallCell/SmallCell.vue";

import {
  computed,
  ComputedRef,
} from "vue";
import { useStore } from "vuex";
import {
  Matrix,
} from "@/interfaces/store.interface.ts";

const store = useStore()

const chainDetails: ComputedRef<Matrix[]> = computed(() => store.state.chains.chainDetails.list)

const getTypeForCeil = (cell: Matrix) => {
  if (cell.is_booster) {
    return 'chains-boost'
  }

  return ''
}
</script>

<style scoped lang="scss">
@import "mReplacePartner";

.rotate-img {
  transform: rotate(180deg);
}
</style>