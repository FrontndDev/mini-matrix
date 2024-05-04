<template>
  <div class="matrix-modal-header">

    <button
        class="matrix-modal-header__back"
        @click="openHeader"
        v-if="'back' == props.modalHeader"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3535 2.36642C10.5487 2.56168 10.5487 2.87826 10.3535 3.07352L6.0068 7.42019C5.68873 7.73826 5.68873 8.26168 6.0068 8.57975L10.3535 12.9264C10.5487 13.1217 10.5487 13.4383 10.3535 13.6335C10.1582 13.8288 9.84163 13.8288 9.64636 13.6335L5.2997 9.28686C4.5911 8.57826 4.5911 7.42168 5.2997 6.71308L9.64636 2.36642C9.84163 2.17116 10.1582 2.17116 10.3535 2.36642Z" fill="#1A86E5"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3535 2.36642C10.5487 2.56168 10.5487 2.87826 10.3535 3.07352L6.0068 7.42019C5.68873 7.73826 5.68873 8.26168 6.0068 8.57975L10.3535 12.9264C10.5487 13.1217 10.5487 13.4383 10.3535 13.6335C10.1582 13.8288 9.84163 13.8288 9.64636 13.6335L5.2997 9.28686C4.5911 8.57826 4.5911 7.42168 5.2997 6.71308L9.64636 2.36642C9.84163 2.17116 10.1582 2.17116 10.3535 2.36642Z" fill="#1A86E5"/>
      </svg>
      <span>Назад</span>
    </button>

    <button
        class="matrix-modal-header__back"
        @click="$emit('open-m-matrix-partner')"
        v-else-if="'MMatrixPartner' == props.modalHeader && props.allowTop"
    >
      <svg class="matrix-rotate-90" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3535 2.36642C10.5487 2.56168 10.5487 2.87826 10.3535 3.07352L6.0068 7.42019C5.68873 7.73826 5.68873 8.26168 6.0068 8.57975L10.3535 12.9264C10.5487 13.1217 10.5487 13.4383 10.3535 13.6335C10.1582 13.8288 9.84163 13.8288 9.64636 13.6335L5.2997 9.28686C4.5911 8.57826 4.5911 7.42168 5.2997 6.71308L9.64636 2.36642C9.84163 2.17116 10.1582 2.17116 10.3535 2.36642Z" fill="#1A86E5"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3535 2.36642C10.5487 2.56168 10.5487 2.87826 10.3535 3.07352L6.0068 7.42019C5.68873 7.73826 5.68873 8.26168 6.0068 8.57975L10.3535 12.9264C10.5487 13.1217 10.5487 13.4383 10.3535 13.6335C10.1582 13.8288 9.84163 13.8288 9.64636 13.6335L5.2997 9.28686C4.5911 8.57826 4.5911 7.42168 5.2997 6.71308L9.64636 2.36642C9.84163 2.17116 10.1582 2.17116 10.3535 2.36642Z" fill="#1A86E5"/>
      </svg>
      <span>Наверх</span>
    </button>

    <div v-else />

    <div class="matrix-modal-header__title">
      <slot />
    </div>
    <button
        @click="closeModal"
        class="matrix-modal-header__close"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.64645 3.64645C3.84171 3.45118 4.15829 3.45118 4.35355 3.64645L8 7.29289L11.6464 3.64645C11.8417 3.45118 12.1583 3.45118 12.3536 3.64645C12.5488 3.84171 12.5488 4.15829 12.3536 4.35355L8.70711 8L12.3536 11.6464C12.5488 11.8417 12.5488 12.1583 12.3536 12.3536C12.1583 12.5488 11.8417 12.5488 11.6464 12.3536L8 8.70711L4.35355 12.3536C4.15829 12.5488 3.84171 12.5488 3.64645 12.3536C3.45118 12.1583 3.45118 11.8417 3.64645 11.6464L7.29289 8L3.64645 4.35355C3.45118 4.15829 3.45118 3.84171 3.64645 3.64645Z" fill="#7B879D"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.64645 3.64645C3.84171 3.45118 4.15829 3.45118 4.35355 3.64645L8 7.29289L11.6464 3.64645C11.8417 3.45118 12.1583 3.45118 12.3536 3.64645C12.5488 3.84171 12.5488 4.15829 12.3536 4.35355L8.70711 8L12.3536 11.6464C12.5488 11.8417 12.5488 12.1583 12.3536 12.3536C12.1583 12.5488 11.8417 12.5488 11.6464 12.3536L8 8.70711L4.35355 12.3536C4.15829 12.5488 3.84171 12.5488 3.64645 12.3536C3.45118 12.1583 3.45118 11.8417 3.64645 11.6464L7.29289 8L3.64645 4.35355C3.45118 4.15829 3.45118 3.84171 3.64645 3.64645Z" fill="#7B879D"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modalHeader: {
    type: String,
    default: ''
  },
  allowTop: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits([
  'open-m-matrix-partner',
  'open-general-chains',
  'open-m-replace-partner',
  'open-change-partner',
  'close-modal',
  'open-m-add-partner',
  'back',
])

const openHeader = () => {
  emit('open-m-matrix-partner')
  emit('open-general-chains')
  emit('open-m-replace-partner')
  emit('open-change-partner')
  emit('back')
}

const closeModal = () => {
  emit('close-modal')
}

</script>

<style scoped lang="scss">
@import "modalHeader";
</style>