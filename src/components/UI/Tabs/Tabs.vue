<template>
  <div class="tabs-matrix" :class="[{ 'cells': props.cells }, props.type]">
    <Tab
        v-for="item in props.tabs"
        :key="item.id"
        :tab="item"
        :active="item.id === tab.id"
        :type="props.type"
        @tab="selectedTab => tab = selectedTab"
        @click="clickTab(item.id)"
        @set-checkbox-value="(value, id) => emit('set-checkbox-value', value, id)"
    />
<!--    <Search-->
<!--        v-if="cells"-->
<!--    />-->
  </div>
</template>

<script setup lang="ts">
import Tab from "@/components/UI/Tab/Tab.vue";
import {
  onBeforeMount,
  Ref,
  ref,
} from "vue";
import { useStore } from "vuex";
import { TabDefaults } from "@/interfaces/store.interface.ts";

const props = defineProps({
  type: {
    type: String,
    default: 'big',
  },
  tabs: {
    type: Array as any,
    required: true,
  },
  cells: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['open-cells', 'toggle-expose-tabs', 'set-checkbox-value'])

let tab: Ref<any> = ref(null);

const store = useStore()

const clickTab = (id: number) => {
  if (props.type === 'little') {
    store.commit('CHANGE_LITTLE_TAB', id)

    let namespace;

    switch (true) {
      case id === 1 || id === 2:
        namespace = 'partners';
        break;
      case id === 3 || id === 4:
        namespace = 'boosters';
        break;
      case id === 5 || id === 6:
        namespace = 'chains';
        break;
    }

    if (namespace) {
      store.commit(`${namespace}/SET_ACTIVE_LITTLE_TAB`, id);
    }


  } else if (props.type === 'big') {
    store.commit('CHANGE_BIG_TAB', id)

    const tabDefaults: TabDefaults = {
      1: { key: 'partners', defaultTabID: 1 },
      2: { key: 'boosters', defaultTabID: 3 },
      3: { key: 'chains', defaultTabID: 5 },
    };

    const { key, defaultTabID } = tabDefaults[id] || {};
    const activeTabID = key ? store.state[key].activeLittleTabID : null;

    store.commit('CHANGE_LITTLE_TAB', activeTabID || defaultTabID);

  }

  emit('open-cells', id)
  emit('toggle-expose-tabs', id)
}

onBeforeMount(() => tab.value = props.tabs[0])
</script>

<style scoped lang="scss">
@import "tabs";
</style>