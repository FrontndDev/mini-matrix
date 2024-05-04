<template>
  <div class="change-partner">
    <div class="change-partner__content">
      <ModalHeader
          :modalHeader="'back'"
          @close-modal="$emit('close-modal')"
          @open-m-replace-partner="$emit('open-m-replace-partner')"
      >
        Цепочка
      </ModalHeader>
      <div class="change-partner__container">
        <div
            class="change-partner__overflow"
            :class="{'less-four': cells.length < 4}"
        >
          <div v-for="cell in cells" class="change-partner__block">
            <SmallCell :type="cell.type" :cell="firstCeil"/>
          </div>
        </div>
        <ChainsButton
            @click="$emit('open-expose-partner')"
        >
          Выбрать
        </ChainsButton>
      </div>
    </div>
    <CopyLink />
  </div>
</template>

<script setup lang="ts">
import ModalHeader from "@/components/ModalHeader/ModalHeader.vue";
import CopyLink from "@/components/Views/Home/CopyLink/CopyLink.vue";
import SmallCell from "@/components/SmallCell/SmallCell.vue";
import ChainsButton from "@/components/UI/ChainsButton/ChainsButton.vue";
import {
  computed,
  Ref,
  ref
} from "vue";
import { useStore } from "vuex";
import { Ceils } from "@/interfaces/store.interface.ts";

const cells = ref([
  { type: 'chains-partner' , id: 0},
  { type: 'chains-boost' , id: 1},
  { type: 'chains-boost' , id: 2},
  { type: 'chains-boost' , id: 3},
])

const store = useStore()

const ceils: Ref<Ceils> = computed(() => store.state.matrixByType?.ceilsCollection?.['1'])

const firstCeil: Ref = computed(() => ceils.value?.['1'])
</script>

<style scoped>
@import "_mChangePartner.scss";
</style>