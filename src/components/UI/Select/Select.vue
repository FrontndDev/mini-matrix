<template>
  <div class="select-matrix" :tabindex="1" @blur="showDropdown = false">
    <div class="select-matrix__up" :class="{ opened: showDropdown }" @click="showDropdown = !showDropdown">
      <div class="select-matrix__text">
        {{ props.selectedItem?.[props.keyObj] }}
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.36648 5.61324C2.56174 5.41798 2.87832 5.41798 3.07359 5.61324L7.42025 9.95991C7.73832 10.278 8.26174 10.278 8.57981 9.95991L12.9265 5.61324C13.1217 5.41798 13.4383 5.41798 13.6336 5.61324C13.8288 5.80851 13.8288 6.12509 13.6336 6.32035L9.28692 10.667C8.57832 11.3756 7.42174 11.3756 6.71315 10.667L2.36648 6.32035C2.17122 6.12509 2.17122 5.80851 2.36648 5.61324Z" fill="#576175"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.36648 5.61324C2.56174 5.41798 2.87832 5.41798 3.07359 5.61324L7.42025 9.95991C7.73832 10.278 8.26174 10.278 8.57981 9.95991L12.9265 5.61324C13.1217 5.41798 13.4383 5.41798 13.6336 5.61324C13.8288 5.80851 13.8288 6.12509 13.6336 6.32035L9.28692 10.667C8.57832 11.3756 7.42174 11.3756 6.71315 10.667L2.36648 6.32035C2.17122 6.12509 2.17122 5.80851 2.36648 5.61324Z" fill="#576175"/>
      </svg>
    </div>

    <div class="select-matrix__down" v-if="showDropdown">
      <div
          class="select-matrix__item"
          :class="{ active: item?.[props.keyOfID] === props.selectedItem?.[props.keyOfID] }"
          v-for="item in props.items"
          :key="item[props.keyOfID]"
          @click="selectItem(item)"
      >
        {{ item[props.keyObj] }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PropType,
  ref,
} from "vue";

const props = defineProps({
  keyObj: {
    type: String,
    default: 'name'
  },
  keyOfID: {
    type: String,
    default: 'id'
  },
  data: {
    type: String
  },
  items: {
    type: Array as PropType<any>,
    required: true
  },
  selectedItem: {
    type: Object,
    default: null
  },
  defaultValue: {
    type: Object as PropType<any>,
  },
  route: {
    type: String
  }
});

const emit = defineEmits(['select']);

const showDropdown = ref(false);

const selectItem = (item: any) => {
  emit('select', item);
  showDropdown.value = false
}
</script>

<style scoped lang="scss">
@import "select";
</style>