<!-- Icon.vue -->
<template>
  <component :is="iconComponent" />
</template>

<script lang="ts" setup>
import IconToday from './icons/icon-today.vue';
import IconStar from './icons/icon-star.vue';
import IconPlan from './icons/icon-plan.vue';
import IconListFail from './icons/icon-list-fail.vue';
import IconListSuccess from './icons/icon-list-success.vue';

type IconType = keyof typeof icons;

const props = defineProps({
  type: { type: String as () => IconType, required: true }
})

// 根据传入的 type 动态确定要加载的图标组件
const icons = {
  IconToday,
  IconPlan,
  IconStar,
  IconListFail,
  IconListSuccess,
};
const iconComponent = icons[props.type];
</script>