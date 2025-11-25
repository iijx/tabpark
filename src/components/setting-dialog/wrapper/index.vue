<template>
  <section class="wrapper-container">
      <i-tabs :stateKey="tabKey" v-model:activeIndex="state.activeTabIndex.value" class="custom-tab"/>
      <ImgList v-show="state.activeTabIndex.value === 0" :list="systemImgs" />
      <ImgList ref="refBingContainer" v-show="state.activeTabIndex.value === 1" :list="bingImgs" />
      <Solid v-show="state.activeTabIndex.value === 2" />
      <Custom v-show="state.activeTabIndex.value === 3" />
  </section>
</template>

<script lang="ts" setup>
import ImgList from './img-list.vue';
import Custom from './custom.vue';
import { useInfiniteScroll } from '@vueuse/core'
import { useTabs } from '@/components/tabs/use-tabs';
import Solid from './solid.vue';

const bingImgs = ref<string[]>([]);
const refBingContainer = ref(null);
const { stateKey: tabKey, state } = useTabs('setting-wrapper');
state.list.value = [
  '默认壁纸',
  '必应壁纸',
  '纯色壁纸',
  '自定义'
].map((label) => ({ label, name: label, disabled: false }));
// const { load } = useApiCache(Api.serviceBingWarpper.findByPage.bind(Api.serviceBingWarpper));
// load({ pageNum: 1, pageSize: 99}).then((res: any) => {
//   console.log("res", res);
//   bingImgs.value = res.map((i: any) => `https://bing.pastecuts.cn/bing-wrapper/${i.cosDir}/1920x1080.jpg`);
// });

const pageNum = ref(0);
const isLoading = ref(false);
const loadMore = () => {
  if (isLoading.value) return;
  isLoading.value = true;
  pageNum.value++;
  // Api.serviceBingWarpper.findByPage({ pageNum: pageNum.value, pageSize: 99}).then((res: any) => {
  //   bingImgs.value.push(...res.map((i: any) => `https://bing.pastecuts.cn/bing-wrapper/${i.cosDir}/1920x1080.jpg`));
  //   isLoading.value = false;
  // })
}
useInfiniteScroll(refBingContainer, loadMore, { distance: 10 })
loadMore();
const systemImgs: string[] = [
  // '1.webp',
  // '2.webp',
  // '3.webp',
  '4.webp',
  '5.webp',
  '6.webp',
  '7.webp',
  '8.webp',
  '11-0-light.webp',
  '11-0-dark.webp',
  '11-1-light.webp',
  '11-1-dark.webp',
  '12-light.webp',
  '12-dark.webp',
  '13-light.webp',
  '13-dark.webp',
  '14-light.webp',
  '14-dark.webp',
].map(i => `https://bing.pastecuts.cn/default-wrapper/${i}?imageMogr2/thumbnail/300x`)
</script>

<style lang="less" scoped>
@import "tailwindcss";

.wrapper-container {
  position: relative;
  height: 100%;
  overflow: hidden;
  padding-top: 56px;
  box-sizing: border-box;
}
.custom-tab {
  position: absolute;
  top: 0;
  width: 100%;
}
.i-block {
  @apply rounded-md mb-4;
  // --bgColor: color-mix(in srgb, var(--i-primary) 20%, black);
  background-color: var(--bgColor);
}
.item {
  @apply flex items-center mb-2;
  font-size: 14px;
  .i-label {
      @apply flex-grow;
  }
}
// .img-list {
//   display: flex;
//   flex-wrap: wrap;
//   flex-shrink: 0;
//   .img-item {
//       @apply shadow-md rounded-lg overflow-hidden;
//       flex-shrink: 0;
//       width: 128px;
//       height: 82px;
//       margin-right: 12px;
//       @apply border-2 border-transparent;
//       transition: all .3s;
//       img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//       }
//       &.active {
//           border-color: var(--i-primary);
//       }
//   }
// }

</style>