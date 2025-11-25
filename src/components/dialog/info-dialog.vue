<template>
  <IDialog :value="value" :theme="type" width="320px" footer-type="confirm" @confirm="handleConfirm" @cancel="handleCancel">
    <template #header>
      <div class="i-header">
        <icon-info v-if="type === 'info' || type === 'warning'" theme="filled" size="24" fill="currentColor"/>
        <div class="title">{{ title }}</div>
      </div>
    </template>

    <div class="i-content">{{ content }}</div>
  </IDialog>
</template>

<script setup lang="ts">

const props = defineProps({
  value: { type: Boolean, default: false },
  title: { type: String, default: '' },
  type: { type: String, default: 'info' },
  content: { type: String, default: '' },
  confirmText: { type: String, default: '确定' },
  cancelText: { type: String, default: '取消' },
})

const emits = defineEmits(['confirm', 'cancel'])

const handleCancel = () => emits('cancel');
const handleConfirm = () => emits('confirm');

</script>

<style lang="less" scoped>
.i-header {
  font-size: 14px;
  padding: 0 0 12px;
  font-weight: bold;
  display: flex;
  color: hsl(var(--i-info));
  .title {
    color: #fff;
    color: rgb(181, 186, 193);
    color: hsl(var(--i-base-content));
    margin-left: 6px;
  }
}

[theme-color="warning"] .i-header {
  color: var(--i-warning-6);
  background-color: transparent;
}
[theme-color="warning"] .i-content {
  color: var(--i-warning-7);
}

.i-footer {
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
}

.i-content {
  padding-left: 30px;
  padding-bottom: 32px;
}
</style>