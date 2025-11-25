<template>
  <section class="i-drawer-root">
    <transition name="i-fade">
      <div v-if="value" @click="handleMaskClick" class="i-mask"></div>
    </transition>

    <main class="i-drawer" :style="style">
      <slot />
    </main>
  </section>
</template>

<script lang="ts" setup name="IDrawer">
const props = defineProps({
  // 位置： left | right | top | bottom
  placement: { type: String, default: 'right' },
  width: { type: [String, Number], default: 250 },
  value: { type: Boolean, default: false },
});

const emits = defineEmits(['close'])

const style = computed(() => {
  const pos: any = {};
  if (props.placement === 'left' || props.placement === 'right') {
    pos['top'] = 0;
    pos['bottom'] = 0;
    if (props.placement === 'left') pos['left'] = 0;
    else pos['right'] = 0;
  }
  return {
    width: typeof props.width === 'number' ? `${props.width}px` : props.width,
    ...pos,
    transform: `translate(${props.value ? 0 : '100%'}, 0)`
  }
})

const handleMaskClick = () => {
  emits('close');
}
</script>

<style lang="less" scoped>

.i-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(#000, .2);
}

.i-drawer {
  position: fixed;
  z-index: 101;
  background: var(--i-primary-1);
  transition: transform .3s ease-in-out;
}
</style>