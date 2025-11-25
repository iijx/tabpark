<template>
  <button class="i-btn" :class="classes" @click="handleClick">
    <slot />
  </button>
</template>

<script lang="ts" setup name="IButton">

const emit = defineEmits(['click'])
const props = defineProps({
  size: { type: String, default: 'default' },
  type: { type: String, default: 'default' },
  ghost: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

const classes = computed(() => {
  return [
    props.size,
    props.type,
    props.ghost ? 'ghost' : '',
    props.block ? 'block' : '',
    props.disabled ? 'disabled' : ''
  ]
})

const handleClick = () => {
  if (props.disabled) return;
  emit('click')
}

</script>

<style lang="less" scoped>

.i-btn {
  font-weight: bold;
  position: relative;
  border-radius: 3px;
  height: 32px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  font-size: 12px;
  justify-content: center;
  min-width: 60px;
  cursor: pointer;

  &.disabled {
    opacity: .6;
    cursor: not-allowed;
  }

  &:active:hover,
  &:active:focus {
    animation: none;
  }
  &:active:hover:not(.disabled),
  &:active:focus:not(.disabled) {
    transform: scale(0.95);
  }

  &.block {
    width: 100%;
  }

  &.default {
    background-color: var(--i-base-200);
    color: var(--i-neutral);
    &:hover, &:active {
      background-color: var(--i-base-300);
    }
  }
  &.primary {
    background-color: var(--i-primary);
    color: #fff;
    &:hover, &:active {
      background-color: var(--i-primary-focus);
    }
  }

  &.secondary {
    background-color: var(--i-secondary);
    &:hover, &:active {
      background-color: var(--i-secondary-focus);
    }
  }

  &.success {
    background-color: var(--i-success);

  }

  &.error {
    background-color: var(--i-error);
  }

  &.info {
    background-color: var(--i-info);
  }

  &.warning {
    background-color: var(--i-warning-6);
    color: var(--i-warning-content);
    &:hover, &:active {
      background-color: var(--i-warning-7);
    }
  }

  &.ghost {
    background-color: transparent;
    border-color: transparent;
    border: 0.5px solid rgba(#fff, .2);
    &:hover, &:active {
      background-color: var(--i-base-300);
    }
    &.warning {
      border-color: transparent;
      color: var(--i-warning-6);
      &:hover, &:active {
        background-color: var(--i-warning-1);
      }
    }
  }


  &.mini {
    height: 28px;
    font-size: 12px;
    border-radius: 2px;
  }
  &.small {
    height: 32px;
    font-size: 13px;
    border-radius: 2px;
  }
  &.default {
    height: 36px;
    font-size: 14px;
    border-radius: 3px;
  }
  &.large {
    height: 40px;
    font-size: 15px;
    border-radius: 4px;
  }
  &.bigger {
    height: 44px;
    font-size: 16px;
    border-radius: 6px;
  }
}
</style>