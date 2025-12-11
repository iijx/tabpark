<template>
  <div ref="refAppLayout" class="app-layout">
    <section class="page-content" :style="style">
      <div class="page left-page">
        <slot name="left-page" />
      </div>
      <main class="page main-page" :style="{height: `${flowPageCount * 100}%`, top: `-${currentPage * 100}%`}">
        <slot v-for="item of flowPageCount" :key="item" :name="`flow${item}`" />

        <section class="main-menu-layout">
          <slot name="main-menu" />
        </section>
      </main>
      <div class="page right-page">
        <slot name="right-page" />
      </div>
    </section>

    <!-- Navigation Arrows -->
    <div class="nav-arrow left-arrow" @click="goLeftPages" v-show="leftRightPage > -1">
      <left theme="outline" size="24" fill="#333"/>
    </div>
    <div class="nav-arrow right-arrow" @click="goRightPages" v-show="leftRightPage < 1">
      <right theme="outline" size="24" fill="#333"/>
    </div>
    <div class="nav-arrow down-arrow" @click="goBottomPage" v-show="currentPage < props.flowPageCount - 1">
      <down theme="outline" size="24" fill="#333"/>
    </div>
    <div class="nav-arrow up-arrow" @click="goTopPage" v-show="currentPage > 0">
      <up theme="outline" size="24" fill="#333"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Left, Right, Up, Down } from '@icon-park/vue-next';

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


const refAppLayout = ref<HTMLElement>();
onMounted(() => {

  // refAppLayout.value?.addEventListener('mousedown', () => console.log('mousedown'));
  // refAppLayout.value?.addEventListener('mousemove', () => console.log('mousemove'));
  // refAppLayout.value?.addEventListener('mouseup', () => console.log('mouseup'));
})

const goLeftPages = () => {
   if (leftRightPage.value > -1) {
     leftRightPage.value--;
     updateStyle();
   }
}

const goRightPages = () => {
   if (leftRightPage.value < 1) {
     leftRightPage.value++;
     updateStyle();
   }
}

const updateStyle = () => {
    style.top = leftRightPage.value !== 0 ? '0%' : `-${currentPage.value * 100}%`;
    style.left = leftRightPage.value === 0 ? `-100%` : (leftRightPage.value === 1 ? `-200%` : (leftRightPage.value === -1 ? 0 : 0));
}

const goTopPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
    updateStyle();
  }
}

const goBottomPage = () => {
  if (currentPage.value < props.flowPageCount - 1) {
    currentPage.value++;
    updateStyle();
  }
} 

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

.nav-arrow {
  position: absolute;
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 200;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
  opacity: 0.4;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-50%) scale(1.1);
  }

  &.left-arrow {
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
  }

  &.right-arrow {
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
  &.down-arrow {
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    &:hover {
        transform: translateX(-50%) scale(1.1);
    }
  }
  &.up-arrow {
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    &:hover {
        transform: translateX(-50%) scale(1.1);
    }
  }

  :deep(.i-icon) {
    display: flex; /* Fix for icon centering */
  }
}

</style>