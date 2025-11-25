<template>
  <div class="img-list">
    <div class="img-item" v-for="(img, index) of list" :key="index" :style="{backgroundImage: `url(${img})`}" @click="handleClick(index)">
    </div>
  </div>
</template>


<script setup lang="ts" name="WrapperImgList">
import { PropType } from 'vue';
const { appState } = useApp();

const props = defineProps({
  list: { type: Array as PropType<string[]>, default: () => [] },
})

const handleClick = (index: number) => {
  const img = props.list[index];
  // Api.userReq.update(appState.userState.id, {
  //   wrapperUrl: img.split("?")[0]
  // });
  appState.settingState.wrapperUrl = img.split("?")[0];
  localStorage.setItem('wrapperUrl', img.split("?")[0]);
}

</script>

<style lang="less" scoped>
@import "tailwindcss";

.img-list {
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  justify-content: center;
  // display: grid;
  // grid-template-columns: repeat(auto-fill, minmax(128px,1fr));
  // grid-template-rows: 120px; // 每一行的高度
  // grid-auto-flow: row dense;
  // grid-gap: 12px;
  max-height: 100%;

  .img-item {
    width: 10rem;
    flex-grow: 1;
    aspect-ratio: 16 / 10;
    // padding-bottom: 62.5%; // 也就是 5/8 16:10
    flex-shrink: 0;
    @apply rounded-md cursor-pointer;
    // margin: 0.4rem;
    // margin-bottom: 8px;
    transition: transform ease;
    overflow: hidden;
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border: 4px solid transparent;
    box-sizing: border-box;
    background-attachment: local;
    img {
      position: absolute;
      @apply left-1 right-1 block w-full h-full rounded-md;
    }
    &.active {
      // border-color: var(--i-primary);
    }
    &:hover {
      // opacity: .5;
      // transform: scale(0.96);
      // border-color: var(--i-primary-4);
    }
  }
}
</style>