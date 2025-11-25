<template>
  <div class="item" :class="{ active }" @click="setActiveMenuValue">
    <Icon v-if="icon" :type="icon" />
    <div class="title">{{ label }}</div>
    <div v-if="num" class="num">{{ num  }}</div>
  </div>
</template>

<script setup lang="ts">
import Icon from './todo-icon.vue';

defineProps({
  icon: { type: String, default: '' },
  label: { type: String, default: '' },
  num: { type: Number, default: 0 },
  active: { type: Boolean, default: false },
})

const emit = defineEmits(['click'])

const setActiveMenuValue = () => {
  emit('click')
}
</script>

<style lang="less" scoped>

.item {
    border-left: 2px solid transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 32px;
    height: 44px;
    &.active {
      background-color: #eff6fc;
      font-weight: bold;
      color: #000;
      border-color: #2564cf;
    }
    .title {
      margin-left: 12px;
      flex: 1;
    }
  }
</style>
