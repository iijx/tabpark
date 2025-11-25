<template>
  <TransitionGroup tag="div" name="fade" class="web-list">
    <div v-for="(item, idx) of renderWebSites" :key="item.id" class="item-wrap">
      <WebSiteVue class="item" :item="item" @contextmenu.native="(e: MouseEvent) => handleRightClick(e, idx)" />
    </div>
    <section class="empty text-gray-400" v-if="renderWebSites.length === 0">暂无收藏</section>
  </TransitionGroup>
</template>

<script setup lang="ts" name="ListOnePage">
import WebSiteVue from '../web-site.vue';

const props = defineProps({
  pinId: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['rightClick'])

const { appState } = useApp();

const renderWebSites = computed(() => {
  const markIds = appState.pinList.value.find(i => i.id === props.pinId)?.markIds || [];
  const marks = appState.markList.value.filter(i => markIds?.includes(i.id)) || [];
  const webSiteIds = marks.map(i => i.webSiteId) || [];
  return appState.webSiteList.value.filter(i => webSiteIds?.includes(i.id)) || [];
});

console.log('renderWebSites', renderWebSites.value);

const handleRightClick = (e: MouseEvent, index: number) => {
  emit('rightClick', e, renderWebSites.value[index].id)
}
</script>

<style lang="less" scoped>
@import '../../var.less';

.web-list {
  // position: absolute;
  // left: 0;
  // top: 0;
  // right: 0;
  // min-height: 70%;
  // max-height: 100%;
  padding-bottom: 64px;
  box-sizing: border-box;
  // height: 100%;
  display: flex;
  // justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  .item-wrap {
    // padding: 15px 0;
    padding: @item-gap-h * 0.5 @item-gap-w * 0.5;
  }

  &>.empty {
    position: absolute;
    top: 20%;
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 1.6rem;
  }
}

// 屏幕尺寸 1024px 以上 // 1040 即两边也至少留 32px
// @media screen and (min-width: 1040px) {
//   .web-list-container {
//     .web-list {
//       >.item-wrap {
//         padding: @gutter-h @gutter-w;
//       }

//     }
//   }
// }

// // 屏幕尺寸 756px 以上
// @media screen and (min-width: 756px) and (max-width: 1039px) {
//   .web-list-container {
//     .web-list {
//       >.item-wrap {
//         padding: @gutter-h @gutter-w;
//       }
//     }
//   }
// }

// // 屏幕尺寸 756px 以上
// @media screen and (min-width: 536px) and (max-width: 755px) {
//   .web-list-container {
//     .web-list {
//       >.item-wrap {
//         padding: @gutter-h @gutter-w;
//       }
//     }
//   }
// }




</style>