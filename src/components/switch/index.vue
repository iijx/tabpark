<template>
  <input type="checkbox" class="i-toggle" :value="true" :checked="modelValue" @change="handleChange"/>
</template>

<script setup lang="ts" name="IToggle">
defineProps({
  modelValue: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])

const handleChange = (e: any) => {
  emit('update:modelValue', e.target.checked);  
  console.log(e.target.checked);  
}
</script>

<style lang="less">
.i-toggle {
  // --tglbg: hsl(var(--b1)); // 中间的背景色
  --tglbg: color-mix(in srgb, var(--i-primary-2) 90%, transparent); // 中间的背景色（最顶层）
  --handleoffset: 1.5rem;
  --handleoffsetcalculator: -1.5rem;
  --togglehandleborder: 0 0;
  --tw-border-opacity: 0.2;
}

.i-toggle {
  flex-shrink: 0;
  height: 1.5rem;
  width: 3rem;
  cursor: pointer;
  appearance: none;
  border-width: 1px;
  border-color: var(--i-primary); // hsl(var(--bc) / var(--tw-border-opacity));
  background-color: var(--i-primary); // 中间的背景色 （除圆的部分，其他区域会被覆盖）
  // background-color: red; // 中间的背景色 （除圆的部分，其他区域会被覆盖）
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 0.8rem;
  transition: background, box-shadow 0.2s ease-in-out;
  box-shadow: var(--handleoffsetcalculator) 0 0 2px var(--tglbg) inset, 0 0 0 2px var(--tglbg) inset, var(--togglehandleborder);
}
.i-toggle:focus-visible {
  outline: 2px solid hsl(var(--bc));
  outline-offset: 2px;
}
.i-toggle:checked,
  .i-toggle[checked="true"],
  .i-toggle[aria-checked=true] {
  --handleoffsetcalculator: var(--handleoffset);
  --tw-border-opacity: 1;
  opacity: 1;
}
.i-toggle:indeterminate {
  --tw-border-opacity: 1;
  box-shadow: calc(var(--handleoffset) / 2) 0 0 2px var(--tglbg) inset, calc(var(--handleoffset) / -2) 0 0 2px var(--tglbg) inset, 0 0 0 2px var(--tglbg) inset;
}
.i-toggle:disabled {
  cursor: not-allowed;
  --tw-border-opacity: 1;
  border-color: hsl(var(--bc) / var(--tw-border-opacity));
  background-color: transparent;
  opacity: 0.3;
  --togglehandleborder: 0 0 0 3px hsl(var(--bc)) inset, var(--handleoffsetcalculator) 0 0 3px hsl(var(--bc)) inset;
}
</style>


