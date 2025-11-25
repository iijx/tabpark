<template>
  <section class="i-form-item">
    <div class="i-label" :style="mainStyle">{{ label }}</div>
    <slot />
  </section>
</template>

<script lang="ts" setup>

const props = defineProps({
  label: { type: String, default: '' },
  labelWidth: { type: String, default: 'auto' },
})

const mainStyle = computed(() => ({
  width: props.labelWidth,
}));
</script>


<style lang="less" scoped>
.i-form-item {
  display: flex;
  align-items: center;
  .i-label {
    flex-shrink: 0;
    margin-right: 8px;
    // box-sizing: border-box;
    text-align: right;
  }
}
</style>