<template>
  <div class="i-input-container" :class="classes">
    <div v-if="hasPrepend" class="i-prepend">
      <slot name="prepend">
      </slot>
    </div>
    
    <slot name="prefix"></slot>

    <input
      type="text"
      class="i-input"
      :class="classes"
      :value="modelValue"
      :placeholder="placeholder"
      :autofocus="autofocus"
      @input="handleInput"
      @keydown.enter="handleEnter"
    />

    <slot name="suffix"></slot>

    <div class="i-append" v-show="hasAppend">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script setup lang="ts" name="IInput">

const hasPrepend = !!useSlots().prepend;
const hasAppend = !!useSlots().append;

const emit = defineEmits(['update:modelValue', 'enter']);
const props = defineProps({
  type: { type: String, default: 'text' },
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '请输入' },
  size: { type: String, default: 'default' },
  autofocus: { type: Boolean, default: false },
})

const handleInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
}

const handleEnter = () => {
  emit('enter');
}

const classes = computed(() => {
  return [
    props.size,
  ]
})
</script>

<style lang="less" scoped>
@import "tailwindcss";
.i-input-container {
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid var(--i-primary-6);
  background-color: hsla(var(--i-base-content), .04);
  border-radius: 5px;
  .i-prepend {
    height: 100%;
    padding: 0 1em;
    border-right: 1px solid var(--i-primary-6);
    display: flex;
    align-items: center;
  }
  .i-append {
    height: 100%;
    padding: 0 1em;
    border-left: 1px solid var(--i-primary-6);
    display: flex;
    align-items: center;
  }

  &.mini {
    height: 32px;
    font-size: 12px;
    border-radius: 2px;
  }
  &.small {
    height: 36px;
    font-size: 13px;
    border-radius: 3px;
  }
  &.default {
    height: 40px;
    font-size: 14px;
    border-radius: 4px;
  }
  &.large {
    height: 44px;
    font-size: 15px;
    border-radius: 6px;
  }
  &.bigger {
    height: 48px;
    font-size: 16px;
    border-radius: 0.5em;
  }
}
.i-input {
  @apply focus:outline-none;
  width: 0;
  flex: 1;
  outline: none;
  background-color: transparent;
	border: none;
	outline: none;
  
	box-sizing: border-box;
  height: 100%;
  font-size: 14px;
  padding: 0 1em;
  line-height: 1;
  

  &::placeholder {
    // opacity: .4;
  }
}
</style>