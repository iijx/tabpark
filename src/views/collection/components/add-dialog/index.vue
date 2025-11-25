<template>
  <Dialog :value="dialogState.isShow.value" :loading="dialogState.loading.value" :title="curTitle" :width="dialogWidth"
    @cancel="handleClose">
    <form class="form-control pt-8 pb-8">
      <!-- <div class="input-group mb-10" v-if="dialogState.type.value === DialogType.ADD">
            <span>https://</span>
            <input type="text" v-model.trim="form.url" class="grow input input-bordered focus:outline-none" placeholder="www.tabpark.cn"/>
            <span @click="getWebInfo">查找</span>
        </div> -->
      <IFormItem label="地址" class="mb-8" v-if="dialogState.type.value === DialogType.ADD">
        <IInput v-model.trim="form.url" size="bigger" placeholder="www.tabpark.cn" @enter="getWebInfo">
          <template #append>
            <span @click="getWebInfo" class="cursor-pointer">查找</span>
          </template>
        </IInput>
      </IFormItem>
      <!-- <span class="ml-20 mt-2 text-xs text-red-500">URL 输入有误</span> -->

      <IFormItem label="名称" class="mb-4">
        <section class="flex items-center w-full">
          <IInput v-model.trim="form.title" size="bigger" placeholder="网站名称 - 查找可自动获取" />
          <!-- 网站图标 -->
          <section v-if="dialogState.item.iconSrc" class="w-12 h-12 rounded-md shrink-0  ml-4"
            :style="{ backgroundColor: dialogState.item.iconBgColor || '#dedede' }">
            <img v-if="dialogState.item.iconSrc" :src="iconUrl" class="w-full h-full block" alt="">
          </section>
          <!-- <input type="text" v-model.trim="form.title" class="grow input input-bordered focus:outline-none" placeholder="名称 - 留空自动获取"/> -->
        </section>
      </IFormItem>

    </form>
    <template #footer>
      <section class="w-full mx-auto">
        <IButton :disabled="isDisabled" @click="handleOperateBtn" type="primary" block>{{ dialogState.type.value === DialogType.ADD ? '添加' : '更新' }}</IButton>
      </section>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { ALL_PIN_ID, DialogType, WebSite } from '@/interface';
import { Api } from '@/api';
import { useDialog } from './use-dialog';
import Dialog from '@/components/dialog/index.vue';

const { appState, appAction } = useApp();
const dialogState = useDialog();

const curTitle = computed(() => `${dialogState.type.value === DialogType.ADD ? '添加网站' : '更新网站名称'}`);
const dialogWidth = computed(() => `${dialogState.type.value === DialogType.ADD ? '420px' : '360px'}`);
const form = reactive({
  url: '',
  title: '',
})

const isDisabled = computed(() => {
  if (dialogState.type.value === DialogType.ADD) return form.title === '' || form.url === '';
  return false;
  //   if (dialogState.type.value === DialogType.EDIT) {
  //     const oldTitle = dialogState.item.title || dialogState.item.title;
  //     const oldUrl = dialogState.item.url.replace('https://', '').replace('http://', '');
  //     return form.title === oldTitle && form.url === oldUrl;
  //   }
});

watch(() => dialogState.item, (val) => {
  form.url = val.url.replace('https://', '').replace('http://', '');
  form.title = val.title;
}, { immediate: true, deep: true })

const getWebInfo = () => {
  if (!form.url) return appAction.message.warning('请输入网址');
  // url字符串是否带协议
  const isHasProtocol = form.url.indexOf('://') >= 0;
  dialogState.loading.value = true;
  Api.webSiteReq.findWebSiteByUrl(isHasProtocol ? form.url : `https://${form.url}`).then((res: any) => {
    console.log("[http] findWebSiteByUrl res", res);
    dialogState.item.init(res);
  }).catch(err => {
    console.log("[http] findWebItemByUrl err", err);
    appAction.message.error('未找到该网址');
  }).finally(() => {
    dialogState.loading.value = false;
  })
}

const handleOperateBtn = (e: MouseEvent) => {
  if (isDisabled.value) return;

  const newItem = dialogState.item;
  console.log("[handleOperateBtn] newItem", newItem)
  if (dialogState.type.value === DialogType.ADD) {
    // 1. 判断这个 webItem 是不是已经存在了
    const isExist = appState.webSiteList.value.findIndex(i => i.hostname === newItem.hostname);
    if (isExist !== -1) {
      return appAction.message.warning('这个网站已经加过啦');
    }
    // 2. 如果不存在，就添加
    return Api.markReq.createMark(appState.curPinId.value, newItem.id).then((res: any) => {
      console.log("[http] createMark res", res);
      appAction.addWebSite(res.webSite);
      appAction.addMark(res.mark);
      dialogState.hide();
    })
  }
  else if (dialogState.type.value === DialogType.EDIT) {
    Api.webSiteReq.update(dialogState.item.id, {
      title: form.title,
    }).then(() => {
      const webItem = appState.webSiteIdMap[dialogState.item.id];
      if (webItem) {
        webItem.title = form.title;
      } 
      dialogState.hide();
    })
  }
}

const iconUrl = computed(() => dialogState.item.iconSrc.indexOf('http') === 0 ? dialogState.item.iconSrc : `https://cdn.pastecuts.cn/web-icons/${dialogState.item.iconSrc}`);
const handleClose = () => dialogState.hide();


</script>

<style lang="less" scoped>
@import "tailwindcss";
@width: 220px;
@gutter-w: 32px;

.avatar {
  @apply w-16 h-16 rounded-md;
}

.main-dialog-wrap {
  background: rgba(#000, .1);
}

.main-dialog {
  // @apply bg-base-100 rounded-md;
  // @apply text-base-content;
  width: @width * 2 + @gutter-w;
}
</style>