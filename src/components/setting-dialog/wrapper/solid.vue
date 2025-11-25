<template>
  <div class="solid-container">
    <div class="item" v-for="item of bgColorList" :key="item" @click="handleClick(item)" :style="{ backgroundColor: item }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const { appState } = useApp();
const bgColorList = ref([
'#000000',
'#16AFD0',
'#3B78DC',
'#6867AF',
'#8D24A0',
'#E16E79',
'#4154D6',
'#FDDBCA',
'#F2DEC9',
'#D4A656',
'#CD4B93',
'#EA3D24',
'#F6D3CD',
'#E3E4E5',
'#FCDDE5',
'#7A7B80',
'#BEBFC4',
'#545554',
'#007973',
'#6AC4A3',
'#FDB814'
]);

const handleClick = (color: string) => {
  appState.settingState.wrapperUrl = color;
  localStorage.setItem('wrapperUrl', color);
}
</script>

<style lang="less" scoped>
@import "tailwindcss";

.solid-container {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  overflow: scroll;
  justify-content: center;
  // display: grid;
  // grid-template-columns: repeat(auto-fill, minmax(128px,1fr));
  // grid-template-rows: 120px; // 每一行的高度
  // grid-auto-flow: row dense;
  // grid-gap: 12px;
  max-height: 100%;

  .item {
    width: 10rem;
    flex-grow: 1;
    aspect-ratio: 16 / 10;
    // padding-bottom: 62.5%; // 也就是 5/8 16:10
    flex-shrink: 0;
    @apply rounded-md cursor-pointer;
    // margin: 0.4rem;
    transition: transform ease;
    overflow: hidden;
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border: 4px solid transparent;
    background-attachment: local;
    box-sizing: border-box;
    border-color: transparent;
  }
}
</style>