<template>
  <div class="add-pop-up-container shadow-lg">
    <main class="main-dialog">
      <section class="flex">
        <div class="text-md font-bold leading-6 grow">{{ curTitle }}</div>
        <div @click="iconCloseClick" class="btn btn-xs btn-circle bg-base-300 border-base-300">✕</div>
      </section>
      <section class="relative">
        <form class="form-control">
          <div class="input-group mt-10">
            <span>https://</span>
            <input type="text" v-model.trim="urlInput" class="grow input input-bordered focus:outline-none"
              placeholder="www.tabpark.cn" />
            <span @click="getWebInfo">查找</span>
          </div>
          <section class="flex items-center mt-8">
            <!-- 网站图标 -->
            <section v-if="info.iconSrc" class="w-12 h-12 rounded-md shrink-0  mr-4"
              :style="{ backgroundColor: info.iconBgColor || '#dedede' }">
              <img v-if="info.iconSrc" :src="'https://cdn.pastecuts.cn/web-icons/' + info.iconSrc"
                class="w-full h-full block" alt="">
            </section>
            <input type="text" v-model.trim="info.title" class="grow input input-bordered focus:outline-none"
              placeholder="名称 - 留空自动获取" />
          </section>
        </form>
        <section class="w-full mx-auto mt-12">
          <button @click="operateBtn" class="btn btn-block" :class="{ 'btn-disabled': isDisabled }">{{ type === DialogType.ADD
            ? '添加' : '更新' }}</button>
        </section>
      </section>
    </main>
  </div>
</template>

<script setup name="AddPopup" lang="ts">
import { DialogType, WebSite } from '@/interface';
import { PropType } from 'vue';

const props = defineProps({
    isShow: Boolean,
    type: { type: String as PropType<DialogType>, default: DialogType.ADD },
})
const emits = defineEmits(['add', 'update', 'close'])
const curTitle = computed(() => `${props.type === DialogType.ADD ? '添加网站' : '更新网站'}`);
const info = reactive(new WebSite({}));

const isDisabled = computed(() => !info.url.trim() || !info.title);

let urlInput = ref('');
watch(() => urlInput.value, (val) => {
    info.url = `https://${val}`;
})
watch(() => info.url, (val) => {
    urlInput.value = val.replace('https://', '');
})
const getWebInfo = () => {
  Api.webSiteReq.findWebSiteByUrl(info.url).then((res: any) => {
    info.init(res);
  })
}

const operateBtn = (e: MouseEvent) => {
  if (isDisabled.value) return;
  emits(props.type === DialogType.ADD ? 'add' : 'update', { ...info });
}

const iconCloseClick = () => emits('close');
</script>

<style lang="less" scoped>
@import "tailwindcss";

.add-pop-up-container {
  position: fixed;
  z-index: 100;
  width: 25%;
  left: 37.5%;
  border: 1px solid rgba(#fff, .4);
  backdrop-filter: blur(20px); 
  box-sizing: border-box;
  @apply rounded-md overflow-hidden shadow-2xl;
}

.avatar {
    @apply w-16 h-16 rounded-md;
}
// .main-dialog-wrap {
//     background: rgba(#000, .4);
// }
.main-dialog {
    @apply py-6 px-10 w-full text-base-content;
    padding: 32px;
    // backdrop-filter: blur(20px);
    // background-color: rgba(#999, .8);
    background-color: rgba(#f1f6fb, .9);
}
</style>