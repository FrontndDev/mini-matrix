<template>
  <Teleport to="body">
    <transition name="modal" class="modal">
      <div class="modal__container">
        <div class="modal__content">
          <div class="modal-cell-information">
            <div class="modal-cell-information__content">
              <ModalHeader @close-modal="$emit('close-modal')">
                Информация о ячейке
              </ModalHeader>
              <div class="modal-cell-information__container">
                <PartnerCell
                    size="small"
                    :type="props.type"
                    :cell-type="props.type"
                    :ceil="props.ceil"
                    :is-booster="'is_booster' in props.ceil && props.ceil.is_booster"
                    :show-cell-information="false"
                    v-if="props.ceil"
                />

                <div class="modal-cell-information__items">
                  <CellInformationItem
                      padding="12px 16px"
                      theme="light"
                      v-for="item in Object.values(props.types).filter(type2 => type2?.value)"
                      :key="item.value"
                      :item="item"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div @click="$emit('close-modal')" class="modal__overlay"/>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import PartnerCell from "@/components/PartnerCell/PartnerCell.vue";
import {
  ICellInformationItem,
  Matrix
} from "@/interfaces/store.interface.ts";
import ModalHeader from "@/components/ModalHeader/ModalHeader.vue";
import CellInformationItem from "@/components/CellInformation/CellInformationItem/CellInformationItem.vue";
import {
  PropType
} from "vue";
import { ITeleports } from "@/interfaces/chains.interface.ts";

const props = defineProps({
  ceil: {
    type: Object as PropType<Matrix | ITeleports>,
  },
  type: {
    type: String,
  },
  types: {
    type: Array as PropType<ICellInformationItem[]>,
    required: true,
  }
})
</script>

<style scoped lang="scss">
@import "modalCellInformation";
</style>