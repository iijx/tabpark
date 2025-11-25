<template>
  <div ref="refAppLayout" class="app-layout">
    <section class="page-content" :style="style">
      <div class="page left-page">
        <slot name="left-page" />
      </div>
      <main class="page main-page">
        <slot v-for="item of flowPageCount" :key="item" :name="`flow${item}`" />

        <section class="main-menu-layout">
          <slot name="main-menu" />
        </section>
      </main>
      <div class="page right-page">
        <slot name="right-page" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useAppPage } from '@/compositions/use-app-page';

const props = defineProps({
  flowPageCount: {
    type: Number,
    default: 1
  }
})
// useAppPage();

const currentPage = ref(0);
const leftRightPage = ref(0);
const style = reactive({
  left: leftRightPage.value === 0 ? `-100%` : (leftRightPage.value === 1 ? `-200` : (leftRightPage.value === -1 ? 0 : 0)),
  top: `-${currentPage.value * 100}%`,
});

let startMouseWheelTime = 0;
let isMovePage = false;
const handleWheel = (e: any) => {
  e.preventDefault(); // 阻止默认滚动行为
  if (Math.abs(e.deltaY) < 5 && Math.abs(e.deltaX) < 5) return; // 滚动距离小于10，忽略

  // 可以认为是一次全新的滚动
  const now = Date.now();
  if (now - startMouseWheelTime > 1000) {
    startMouseWheelTime = now;
    isMovePage = false;
    e.preventDefault(); // 阻止默认滚动行为
    return;
    
  } else {
    // 200ms 内的触发，都忽略，不然感觉一碰就滚，太灵敏了
    if (now - startMouseWheelTime < 30) return;

    if (isMovePage) return; // 这一次已经滚动过了，就忽略 
    isMovePage = true;
    // 判断滚动方向
    const maxDxy = Math.max(Math.abs(e.deltaX), Math.abs(e.deltaY));
    const isY = maxDxy === Math.abs(e.deltaY);
    console.log('滚动方向:', isY, e.deltaY, e.deltaX);
    if (isY) {
      if (leftRightPage.value !== 0) return; // 不是中间的页面流，就不用处理 Y 方向滚动
      // console.log('滚动方向：向下', e.deltaY);
      if (e.deltaY > 0 && currentPage.value < (props.flowPageCount - 1)) currentPage.value++;
      // console.log('滚动方向：向上', e.deltaY);
      else if (e.deltaY < 0 && currentPage.value >= 1) currentPage.value--;
    } else {
      // 页面右滚动（手指向左滑）
      console.log('111', e.deltaX > 0, leftRightPage.value !== 1);
      if (e.deltaX > 0 && leftRightPage.value !== 1) leftRightPage.value++;
      // 页面左滚动（手指向右滑）
      else if (e.deltaX < 0 && leftRightPage.value !== -1) leftRightPage.value--;
    }
    console.log('222', leftRightPage.value, leftRightPage.value === 0 ? `-100%` : (leftRightPage.value === 1 ? `-200` : (leftRightPage.value === -1 ? 0 : 0)));
    style.top = leftRightPage.value !== 0 ? '0%' : `-${currentPage.value * 100}%`;
    style.left = leftRightPage.value === 0 ? `-100%` : (leftRightPage.value === 1 ? `-200%` : (leftRightPage.value === -1 ? 0 : 0));
  }
}
const refAppLayout = ref<HTMLElement>();
onMounted(() => {
  refAppLayout.value?.addEventListener('wheel', handleWheel, { passive: false });
  // refAppLayout.value?.addEventListener('mousedown', () => console.log('mousedown'));
  // refAppLayout.value?.addEventListener('mousemove', () => console.log('mousemove'));
  // refAppLayout.value?.addEventListener('mouseup', () => console.log('mouseup'));
})

</script>

<style lang="less" scoped>
.app-layout {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  overscroll-behavior: none;
  .page-content {
    position: absolute;
    width: 300%;
    height: 100%;
    display: flex;
    transition: all .3s ease; // cubic-bezier(0.165, 0.84, 0.44, 1);
    .page {
      flex-basis: 0;
      height: 100%;
      flex: 1;
    }
  }
  .left-page, .right-page  {
    height: 100%;
  }
  .left-page { left: -100%; }
  .right-page { left: 100%; background-color: green; }
}
.main-page {
  position: relative;
  height: 100%;
  box-sizing: border-box;
}

.main-menu-layout {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
  z-index: 100;
}

</style>