<template>
  <div class="aside-container">
    <section class="v-menu">
      <div v-for="(item, index) of NavRootTree" :key="index" class="item" :class="{ active: activeIndex === index }" @click="handleMenuClick(index)">
        <!-- <icon-platte v-show="item.icon === MenuIcon[item.key]" />
        <icon-stickers v-show="item.icon ===  MenuIcon[item.key]" />
        <icon-search v-show="item.icon ===  MenuIcon[item.key]" />
        <icon-setting v-show="item.icon ===  MenuIcon[item.key]" />
        <icon-bookmark v-show="item.icon ===  MenuIcon[item.key]" /> -->
        <span class="label">{{ item.title }}</span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { NavRootTree } from "@/interface";
import useMenu from './compositions/use-menu';
const emit = defineEmits(['customadd', 'update:activeIndex']);

const { activeIndex } = useMenu();

const handleMenuClick = (index: number) => {
  activeIndex.value = index;
};


</script>

<style lang="less" scoped>
@import "tailwindcss";

.aside-container {
  // height: 100vh;
  // transform: translateX(-100%);
  // align-items: center;
  // 顶部导航
  // background-color: var(--i-bg-1);
  backdrop-filter: blur(20px);
}

.v-menu {
  padding-right: 16px;
  display: flex;
  justify-content: center;
  > .item {
    @apply w-30 h-12;
    padding: 12px 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
    color: var(--i-fg-2);
    color: #fff;
    &:hover {
      background-color: var(--i-bg-1-hover);
      background-color: var(--i-primary-hover);
    }
    &.active {
      color: var(--i-primary-7);
      background-color: color-mix(in srgb, var(--i-primary-6) 10%, transparent);
      font-weight: bold;
    }
    .label {
      margin-left: .2em;
    }
  }
}

</style>