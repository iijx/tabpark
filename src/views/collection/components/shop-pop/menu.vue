<template>
  <section class="menu">
    <div v-for="(item, index) of menus" :key="index" class="item h-8" :class="{ active: activeIndex === index }" @click="handleMenuClick(index)">
      <icon-platte v-show="item.icon === 'platte'" />
      <icon-stickers v-show="item.icon === 'stickers'" />
      <icon-search v-show="item.icon === 'search'" />
      <icon-setting v-show="item.icon === 'setting'" />
      <icon-bookmark v-show="item.icon === 'bookmark'" />
      <span class="label">{{ item.title }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">

const emit = defineEmits(['update:activeIndex', 'customadd']);
defineProps({
  activeIndex: {
    type: Number,
    default: 0,
  },
});

const menus = ref([
  { icon: 'platte', title: '自定义', key: 'theme', showTitle: true },
  { icon: 'platte', title: '探索', key: 'theme', showTitle: true },
  { icon: 'stickers', title: '效率', key: 'wrapper', showTitle: false },
  { icon: 'search', title: '工具', key: 'search', showTitle: false },
  { icon: 'setting', title: '开发', key: 'desktop' },
  { icon: 'setting', title: '设计', key: 'setting' },
  { icon: 'bookmark', title: '娱乐', key: 'about', showTitle: true  },
  { icon: 'bookmark', title: '其他', key: 'about', showTitle: true  },
]);

const handleMenuClick = (index: number) => {
  // if (index === 0) {
  //   emit('customadd')
  // }
  // else 
  emit('update:activeIndex', index);
};


</script>

<style lang="less" scoped>
@import "tailwindcss";

.menu {
  @apply w-28;
  padding-right: 16px;
  > .item {
    padding: 12px 8px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
    color: var(--i-fg-2);
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