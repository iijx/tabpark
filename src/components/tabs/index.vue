<template>
  <section class="i-tabs">
    <div v-for="(item, idx) of state.list.value" :key="idx" class="i-tab" :class="[`${state.activeTabIndex.value === idx ? 'active' : ''}`, `${size}`]" @click="handleItemClick(idx)">
      {{ item.label }}
    </div>
  </section>
</template>

<script lang="ts" setup name="ITabs">
import { useTabs } from './use-tabs'

const props = defineProps({
  stateKey: { type: String, default: '' },
  size: { type: String, default: 'default' },
})

const { state } = useTabs(props.stateKey);

const handleItemClick = (idx: number) => {
  state.activeTabIndex.value = idx
}


</script>

<style lang="less" scoped>
@import "tailwindcss";

.i-tabs {
  --i-tab-bg: rgba(0, 0, 0, .05);
  @apply flex;
  background: var(--i-tab-bg);
  padding: 0.25rem;
  border-radius: 8px;
  .i-tab {
    @apply flex-grow flex flex-row items-center justify-center cursor-pointer font-medium text-gray-500 transition-all;
    border-radius: 6px;
    padding: 0 1rem;
    color: var(--i-fg-2);
    // background-color: var(--i-primary-1);
    margin-right: .25rem;
    &:last-child {
      margin-right: 0;
    }
    &:hover {
      background-color: var(--i-primary-hover);
      color: var(--i-fg-2);
    }
    &.active {
      background-color: var(--i-primary-6);
      color: var(--i-primary-content);
    }

    &.default {
      @apply text-sm;
      height: 2rem; // 32px 16 * 2
    }
    &.large {
      @apply text-base;
      height: 2.5rem; // 40px 16 * 2.5
    }
    &.bigger {
      @apply text-lg;
      height: 3rem; // 48px 16 * 3
    }
  }
}
</style>