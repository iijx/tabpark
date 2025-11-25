<template>
  <teleport to='body'>
    <section class="i-dialog-root" :theme-color="theme" :dark-mode="darkMode">
      <transition name="i-fade">
        <div v-if="isEnabledMask && value" class="i-mask"></div>
      </transition>

      <transition name="i-fade-zoom">
        <div v-if="value" class="main-dialog-container" @click="handleMaskClick">
          <main class="main-dialog" :class="customClass" :style="mainStyle" @click.stop>
            <slot name="header">
              <div v-if="header" class="i-header">
                <div class="title">{{ title }}</div>
                <div v-if="isEnableCloseIcon" @click="handleCancel" class="icon-close">✕</div>
              </div>
            </slot>

            <slot name="content">
              <div class="content">
                <slot />
              </div>
            </slot>
  
            <slot name="footer">
              <div class="i-footer i-confirm" v-if="footer && footerType === 'confirm'">
                <I-Button ghost :type="confirmBtnTheme" @click.native="handleCancel">{{ cancelText }}</I-Button>
                <I-Button class="ml-2" :type="confirmBtnTheme" @click.native="handleConfirm">{{ confirmText }}</I-Button>
              </div>
              <div class="i-footer i-alert" v-if="footer && footerType === 'alert'">
                <I-Button :type="confirmBtnTheme" block @click.native="handleConfirm">{{ confirmText }}</I-Button>
              </div>
            </slot>

            <!-- loading -->
            <div class="loading-container" v-show="loading">
              <span class="loading loading-ring loading-lg"></span>
            </div>

          </main>
        </div>
      </transition>
    </section>
  </teleport>
</template>

<script lang="ts" setup name="IDialog">
import IButton from '../button/index.vue';
const props = defineProps({
  isEnabledMask: { type: Boolean, default: true },
  header: { type: Boolean, default: true },
  loading: { type: Boolean, default: false },
  maskClickClose: { type: Boolean, default: true },
  isEnableCloseIcon: { type: Boolean, default: true },
  value: { type: Boolean, default: false },
  width: { type: String, default: '520px' },
  height: { type: String, default: 'auto' },
  title: { type: String, default: '' },
  theme: { type: String, default: 'dark' },
  darkMode: { type: Boolean, default: true },
  confirmText: { type: String, default: '确定' },
  cancelText: { type: String, default: '取消' },
  footer: { type: Boolean, default: true },
  footerType: { type: String, default: 'alert' }, // confirm, alert
  customClass: { type: String, default: '' },
})

const emits = defineEmits(['confirm', 'cancel'])

const mainStyle = computed(() => ({
  width: props.width,
  height: props.height,
}));

const handleConfirm = () => emits('confirm');
const handleCancel = () => emits('cancel');
const handleMaskClick = () => {
  if (props.maskClickClose) emits('cancel');
}

const confirmBtnTheme = computed(() => {
  if (["info", "warning", "error"].includes(props.theme)) {
    return props.theme
  }
  return "primary"
})
</script>


<style lang="less" scoped>
@import "tailwindcss";

.main-dialog-container {

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  background-color: transparent;
}

.i-mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(#000, .2);
  // background-color: color-mix(in srgb, var(--i-primary-6) 10%, transparent);
}
[data-theme="info"] .main-dialog {
  background-color: var(--i-info-2);
}
[data-theme="warning"] .main-dialog {
  background-color: var(--i-warning-1);
}

.main-dialog {
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgba(17, 18, 20);
  // background: var(--i-base-200);
  background: var(--i-primary-1);
  @apply rounded-xl;
  border: 1px solid var(--i-primary-1);
  padding: 16px 18px 20px;
  overflow: hidden;

  > .i-header {
    font-size: 14px;
    padding: 0 0 10px;
    
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    background-color: transparent;
    .title {
      // color: rgb(181, 186, 193);
      // color: var(--i-base-content);
      color: var(--i-primary-10);
    }
    .icon-close {
      @apply rounded-full p-0 w-6 h-6 text-xs;
      color: var(--i-fg-3);
      background-color: var(--i-primary-1);
      border: none;
      cursor: pointer;
      &:hover {
        // background-color: rgba(#000, .3);
        background-color: var(--i-primary-8);
        color: var(--i-primary-1);
      }

    }
  }

  > .content {
    flex: 1;
    overflow: hidden;
    padding: 0;
    // color: rgb(181, 186, 193);
    // color: var(--i-text-1);
  }

  >.i-footer {
    &.i-confirm {
      flex-shrink: 0;
      display: flex;
      justify-content: flex-end;
    }
    &.i-alert {
      flex-shrink: 0;
      display: flex;
      justify-content: flex-end;
    }
  }
}
.loading-container {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background-color: rgba(#fff, .2);
  align-items: center;
  justify-content: center;
}
</style>