<template>
  <div class="popup-container">
    <IFormItem label="地址" class="mb-8">
      <IInput v-model.trim="form.url" size="bigger" placeholder="www.tabpark.cn" />
    </IFormItem>
    <IFormItem label="名称" class="mb-4">
      <section class="flex items-center w-full">
        <IInput v-model.trim="form.title" size="bigger" placeholder="网站名称 - 查找可自动获取" />
      </section>
    </IFormItem>

    <section class="w-full mx-auto">
      <IButton :disabled="isDisabled" @click="operateBtn" type="primary" block>添加</IButton>
    </section>

    <!-- <section class="flex">
      <IButton @click="handleClickHome" type="text" block>打开主页</IButton>
      <IButton @click="handleClickHome" type="text" block>快速登录</IButton>
    </section> -->
  </div>
</template>

<script setup lang="ts" name="App">
import useApp from '@/compositions/use-app';
import { WebSite } from '@/interface';
import { ref, reactive, computed, watch } from 'vue';

const form = reactive({
  url: '',
  title: '',
  icon: ''
})

const isDisabled = computed(() => {
  return form.title === '' || form.url === '';
});

chrome.runtime.sendMessage({action: 'getCurrentTabUrl'}, function(response) {
  console.log('当前网页链接: ' + response.url, response);
  form.url = response.url;
  form.title = response.title;
  form.icon = response.favIconUrl;
  // 这里可以添加更多代码来处理获取到的URL
});

const operateBtn = (e: MouseEvent) => {
  
}
const { appState, appAction } = useApp();

watch(() => appState.settingState, () => {
  document.documentElement.setAttribute('theme-color', appState.settingState.themeColor);
  document.documentElement.setAttribute('dark-mode', String(appState.settingState.darkMode));
}, { immediate: true, deep: true });

const handleClickHome = () => {
  chrome.tabs.create({});
}
</script>

<style lang="less" scoped>
.popup-container {
  padding: 32px 24px;
  width: 400px;
  color: var(--i-fg-1);
  background: var(--i-primary-1);
  border: 1px solid var(--i-primary-1);
}
</style>