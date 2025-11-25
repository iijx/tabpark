<template>
  <div class="custom-input-container">
    <form class="form form-control pt-8 pb-8">
        <!-- <div class="input-group mb-10" v-if="dialogState.type.value === DialogType.ADD">
            <span>https://</span>
            <input type="text" v-model.trim="form.url" class="grow input input-bordered focus:outline-none" placeholder="www.tabpark.cn"/>
            <span @click="getWebInfo">查找</span>
        </div> -->
        <IFormItem label="地址" class="mb-8">
            <IInput v-model.trim="form.url" size="bigger" placeholder="www.tabpark.cn">
                <!-- <template #prepend>
                    <span>https://</span>
                </template> -->
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
                <section v-if="item.iconSrc" class="w-12 h-12 rounded-md shrink-0  ml-4" > <!-- :style="{backgroundColor: dialogState.item.iconBgColor || '#dedede'}" -->
                    <img v-if="item.iconSrc" :src="iconUrl" class="w-full h-full block" alt="" >
                </section>
                <!-- <input type="text" v-model.trim="form.title" class="grow input input-bordered focus:outline-none" placeholder="名称 - 留空自动获取"/> -->
            </section>
        </IFormItem>

    </form>
  </div>
</template>

<script setup lang="ts" name="ShopCustomInput">
import { WebSite } from '@/interface';

const { appState, appAction } = useApp();

const form = reactive({
    url: '',
    title: '',
})

const item = reactive(new WebSite({}));
const iconUrl = computed(() => item.iconSrc.indexOf('http') === 0 ? item.iconSrc : `https://cdn.pastecuts.cn/web-icons/${item.iconSrc}`);

const getWebInfo = () => {
    if (!form.url) return appAction.message.warning('请输入网址');
    // url字符串是否带协议
    const isHasProtocol = form.url.indexOf('://') >= 0;
    // Api.serviceWebSite.findWebItemByUrl(isHasProtocol ? form.url : `https://${form.url}`).then((res: any) => {
    //     item.initByWebSite(res);
    // }).catch(err => {
    //     console.log("[http] findWebItemByUrl err", err);
    //     appAction.message.error('未找到该网址');
    // })
}
</script>

<style lang="less" scoped>
.custom-input-container {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;
  margin: 0 auto;
  .form {
    width: 80%;
  }
}

</style>