<template>
  <div
      class="tab-matrix"
      :class="[{
        active: activeClass,
        'indicator-green': props.tab.indicator?.green,
        'indicator-orange': props.tab.indicator?.orange,
      }, props.type]"
      v-if="!props.tab.disabled"
      @mouseover="showTooltip"
      @mouseleave="hideTooltip"
      @click.stop="emit('tab', props.tab)"
  >
    {{ props.tab.name }} {{ props.tab.value }}
    <MyCheckbox
        :value="teleportCheckbox"
        v-if="props.tab?.checkbox"
        @set-value="value => emit('set-checkbox-value', value, props.tab.id)"
    />

    <MyTooltip
        :text="props.tab?.tooltip"
        v-if="props.tab?.tooltip && showMyTooltip"
    />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import {
  computed,
  PropType,
  ref,
  inject,
  Ref,
} from "vue";
import { ITab } from "@/interfaces/store.interface.ts";
import MyCheckbox from "@/components/UI/MyCheckbox/MyCheckbox.vue";
import MyTooltip from "@/components/UI/MyTooltip/MyTooltip.vue";

const props = defineProps(<any>{
  type: {
    type: String,
  },
  tab: {
    type: Object as PropType<ITab>,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['tab', 'set-checkbox-value']);

const store = useStore()

const showMyTooltip = ref(false)

const littleTabID = computed(() => store.state.littleTabID)

const activeClass = computed(() => props.type === 'little' ? littleTabID.value === props.tab.id : props.active)

const teleportCheckbox = inject('teleportCheckbox') as Ref<boolean>

const showTooltip = () => {
  if (window.innerWidth > 992) {
    showMyTooltip.value = true
  }
}

const hideTooltip = () => {
  showMyTooltip.value = false
}
</script>

<style scoped lang="scss">
@import "tab";
</style>