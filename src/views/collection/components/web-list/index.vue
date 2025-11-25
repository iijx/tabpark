<template>
  <!-- 收藏部分 -->
  <section class="web-list-container">
    <main class="main">
      <div class="page-line" :style="pageLineStyle">
        <section class="page" :id="`pinpage-${pin.id}`" v-for="pin of pinList" :key="pin.id" >
          <List :pinId="pin.id" @rightClick="handleRightClick" />
        </section>
      </div>
    </main>
    <!-- 添加按钮 -->
    <section v-show="isShowAddBtn && curPinId !== ALL_PIN_ID" ref="refAddBtn" class="add-item" @click.stop="handleAddBtnClick(DialogType.ADD)">
      <div class="img-wrap mr-2">
        <icon-plus></icon-plus>
      </div>
      <div class="name">点此添加</div>
    </section>

    <!-- 右击 popup menu -->
    <section
      v-show="popmenuInfo.isShow"
      class="v-popup-menu menu menu-compact rounded"
      :style="popmenuInfo.style"
      v-clickout="handlePopupClickout"
      @click.stop
    >
      <div class="item" @click="handleEditItem">更改标题</div>
      <div class="item">移动到</div>
      <div class="item-line"></div>
      <div class="item" @click="handleDeleteItem">删除</div>
    </section>


  </section>
</template>

<script setup lang="ts" name="WebList">
import { DialogType, ALL_PIN_ID, WebSite } from '@/interface';
import { Ref } from 'vue';
import List from './list.vue';
import { useDragItem } from '../../compositions/use-drag-item';
const emit = defineEmits(['add', 'edit'])

defineProps({
  isShowAddBtn: {
    type: Boolean,
    default: true,
  },
});

const { appState, appAction } = useApp();
const { pinList, curPinId } = appState;

const refAddBtn: Ref<HTMLElement | null> = ref(null);
const addPopupInfo = reactive({
  isShow: false,
  style: {
    bottom: '0px',
    transform: 'scale(0)'
  }
});

const handleAddBtnClick = (type: DialogType) => emit('add', type);

const pageLineStyle = computed(() => {
  const idx = pinList.value.findIndex(pin => pin.id === curPinId.value);
  return {
    transform: `translateX(-${idx * 100}%)`,
  }
});

const popmenuInfo = reactive({
  isShow: false,
  id: '',
  style: {
    left: '0px',
    top: '0px',
  }
})
const handleRightClick = (e: MouseEvent, id: string) => {
  popmenuInfo.isShow = true;
  popmenuInfo.style.left = `${e.pageX}px`;
  popmenuInfo.style.top = `${e.pageY}px`;
  popmenuInfo.id = id;
}

const handlePopupClickout = (e: MouseEvent) => {
  if (popmenuInfo.isShow) {
    popmenuInfo.isShow = false;
    e.stopPropagation();
  }
}

const handleDeleteItem = () => {
  const webSite = new WebSite(appState.webSiteIdMap[popmenuInfo.id]);
  popmenuInfo.isShow = false;
  // appAction.removeWebSite(webSite.id);
}

const handleEditItem = () => {
  popmenuInfo.isShow = false;
  if (appAction.loginCheck()) {
    emit('edit', popmenuInfo.id)
  }
}

useDragItem({
  targetClass: 'page-line',
  itemClass: 'item',
});

</script>

<style lang="less" scoped>
@import "tailwindcss";

.web-list-container {
  height: 100%;
  width: 100%;
  padding: 12px 0 0 0;
  box-sizing: border-box;
  > .main {
    position: relative;
    width: 100%;
    height: 70%;
    box-sizing: border-box;
    overflow: hidden;
    .page-line {
      display: flex;
      height: 100%;
      flex-wrap: nowrap;
      .page {
        // flex: 1;
        display: flex;
        width: 100%;
        height: 100%;
        flex-shrink: 0;
  
        min-height: 70%;
        max-height: 100%;
      }
    }
  }
  .add-item {
    // position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    // left: calc(50% - 60px);
    font-size: 14px;
    bottom: 0;
    // background-color: rgba(#999, .2);
    letter-spacing: 2px;
    cursor: pointer;
    border-radius: 10px;
    width: 120px;
    height: 48px;
    margin: 0 auto;
    padding: 0 12px;
    color: var(--i-primary-6);
    border-bottom: 1px dashed var(--i-primary-6);
    // .name {
    //     text-decoration: underline dotted;;
    // }
    transition: transform 100ms;
      &:hover {
        font-weight: bold;
        transform: scale(1.05);
      }
  }
}

.v-popup-menu {
  @apply fixed w-40 p-2 rounded shadow-lg border-slate-900;
  // background: rgba(17, 18, 20);
	// color: rgb(181, 186, 193);
  background: var(--i-bg-1);
  color: var(--i-fg-1);
  font-size: 13px;
  .item {
    @apply px-2 py-1 rounded;
    cursor: pointer;
    font-weight: bold;
    margin: 4px 0;

		&:hover {
			background-color: rgba(60, 69, 165);
			background-color: var(--i-bg-1-hover);
      color: var(--i-fg-2-hover);
      background-color: var(--i-primary-hover);
		}

  }
  .item-line {
    border-top: 1px solid rgba(#000, .3);
    border-top: 1px solid color-mix(in srgb, var(--i-fg-1) 20%, transparent);
    margin: 8px 0;
  }
}
</style>
