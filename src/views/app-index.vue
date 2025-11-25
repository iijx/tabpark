<template>
  <div class="search-page" @contextmenu.stop="handleOpenCollection">
    <!-- 顶部收藏栏(包括整个收藏页) -->
    <Collection oncontextmenu="return false" @contextmenu.stop />

    <!-- 搜索部分 -->
    <main class="main" ref="refMain">
      <div class="input-container" :class="{'with-suggestion': state.isShowSuggestion.value }" ref="inputContainer">
        <div class="icon-wrap" @click.stop.prevent="state.isShowSearchSwitch.value = true">
          <img class="icon" :src="curSearchWeb.icon" alt="" />
        </div>
        <div class="input-wrap">
          <input
            ref="refInput"
            class="i-input"
            type="text"
            v-model.trim="state.searchText.value"
            placeholder="" 
            @input="(e: any) => handleEvent('input', e)"
            @focusout="(e: any) => handleEvent('focusout', e)"
            @focusin="(e: any) => handleEvent('focusin', e)"
            @keyup="handleKeyUp"
          />
        </div>
        <div class="append">
          <icon-search theme="outline" size="22" fill="currentColor" />
        </div>

        <!-- 搜索建议 -->
        <section class="suggestion-wrap" v-if="state.isShowSuggestion.value">
          <div class="item" :class="{ active: state.curSuggestionIndex.value === index }" v-for="(item, index) of state.suggestions.value" :key="item" @click="e => handleEvent('suggest', index)">
            <div class="icon-wrap">
              <icon-search />
            </div>
            <span>{{ item }}</span>
          </div>
        </section>

        <!-- 搜索引擎 -->
        <section class="search-switch" :style="{ height: state.isShowSearchSwitch.value ? '88px' : 0}" v-clickout="handleSearchSwitchClickOut">
          <div class="item" v-for="(item, index) of state.avaibleEngines.value" :key="item.name" @click="() => handleEvent('switchSearchEngine', index)">
            <img class="icon" :src="item.icon" alt="" />
            <span class="item-name">{{ item.cnName }}</span>
          </div>
        </section>
      </div>
    </main>

    <!-- 官方导航 -->
    <!-- <div class="more-nav" v-show="!appState.isShowPinPage.value" @click="handleToNavPark">
      <div class="icon-wrap">
        <icon-more-four fill="#fff" size="22" />
      </div>
      <span class="label">官方导航</span>
    </div> -->
  </div>
</template>

<script lang="ts" setup name="SearchIndex">
import { useSearch } from '@/compositions/use-search';
import Collection from './collection/index.vue';

const { appState, appAction } = useApp();
const refInput = ref();
const refMain = ref();
const { state, curSearchWeb, handleEvent, handleKeyUp } = useSearch(refInput, refMain);

const handleSearchSwitchClickOut = () => {
  if (state.isShowSearchSwitch.value) {
    state.isShowSearchSwitch.value = false;
  }
}

// 右键打开 collection 页面
const handleOpenCollection = (e: MouseEvent) => {
  appState.isShowPinPage.value = true;
  e.preventDefault();
  return false;
}

defineEmits(["focus", 'blur'])
defineProps({
  isFocus: {
    type: Boolean,
    default: false,
  },
});

const handleToNavPark = () => {
  appAction.pushRouter({
    path: '/nav-park',
  });
  // 打开新的窗口
  // const win = window.open('/#nav-park', '_blank');
}
</script>

<style lang="less" scoped>
@import "tailwindcss";
@searchHeight: 48px;

.search-page {
  width: 100vw;
  height: 100vh;
  position: relative;
}

.main {
  width: 80%;
  height: 100%;
  min-width: 580px;
  max-width: 596px;
  margin: 0 auto;
  position: relative;

}
.input-container {
  background-color: #fff;
  position: absolute;
  height: @searchHeight;
  box-sizing: border-box;
  white-space: nowrap;
  top: 25vh;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  width: 100%;
  display: flex;
  @apply shadow-lg;
  &.with-suggestion {
    border-radius: 10px 10px 0 0;
  }

  .icon-wrap {
    flex-shrink: 0;
    height: @searchHeight;
    width: @searchHeight;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      background-color: color-mix(in srgb, var(--i-fg-1) 10%, transparent 90%);
    }

    >.icon {
      width: 24px;
      height: 24px;
      opacity: .8;
      display: block;
    }
  }

  >.input-wrap {
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    color: black;

    >.i-input {
      display: block;
      border-radius: 8px;
      height: 100%;
      width: 100%;
      background-color: transparent;
      border: none;
      color: black;
      border: none;
      outline: none;
      font-size: 16px;

      &::-webkit-input-placeholder {
        text-align: left;
        color: black;
        font-size: 15px;
      }
    }
  }

  > .append {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    padding: 0 12px;
    color: var(--i-primary-5);
    cursor: pointer;
  }

  .suggestion-wrap {
    position: absolute;
    background-color: #fff;
    box-shadow: none;
    left: 0;
    top: 100%;
    right: 0;
    border-radius: 0 0 10px 10px;
    overflow: hidden;
    border-top: 1px solid rgba(#000, .2);
    .item {
      // padding-left: @searchHeight;
      height: 40px;
      display: flex;
      align-items: center;
      cursor: pointer;
      color: var(--i-fg-1);
      &:hover, &.active {
        background-color: @--i-gray-92;
      }
    }
  }
}
[dark-mode="true"] .input-container {
  background-color: rgba(0, 0, 0, .7);
  > .input-wrap {
    color: white;
    >.i-input {
      color: white;
      &::-webkit-input-placeholder {
        color: white;
      }
    }
  }
  .suggestion-wrap {
    background-color: rgba(0, 0, 0, .7);
    border-top: 1px solid rgba(#fff, .1);
    .item {
      &:hover, &.active {
        background-color: rgba(#fff, .2);
      }
    }
    
  }
}

.search-switch {

  position: absolute;
  background-color: #fff;
  box-shadow: none;
  left: 0;
  top: 100%;
  transform: translateY(12px);
  right: 0;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 12px;
  .item {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    width: 64px;
    height: 64px;
    padding-top: 4px;
    border-radius: 8px;
    .icon {
      width: 24px;
      height: 24px;
      margin-bottom: 4px;
    }
    &:hover {
      background-color: @--i-gray-92;
    }
  }
}

.more-nav {
  @height: 36px;
  position: absolute;
  left: 50%;
  bottom: 220px;
  z-index: 1000;
  cursor: pointer;
  width: 220px;
  height: @height;
  border-radius: @height;
  overflow: hidden;
  
  .icon-wrap {
    // position: absolute;
    // z-index: 1002;
    overflow: hidden;
    border-radius: 50%;
    background-color: rgba(#000, .4);
    width: @height;
    height: @height;
    display: flex;
    align-items: center;
    justify-content: center;
    .i-icon {
      transition: transform .2s ease;
      &:hover {
        transform: scale(1.1) rotate(90deg);
      }
    }
  }
  .label {
    position: absolute;
    z-index: -1;
    // width: 1px;
    left: 0;
    top: 0;
    height: 36px;
    border-radius: 18px;
    padding-right: 12px;
    padding-left: @height + 8px;
    transition: all .3s ease;
    background-color: rgba(#000, .4);
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(-100%);
    opacity: 0;
    color: rgba(#fff, 0);
    font-size: 14px;
  }
  &:hover {
    .label {
      transform: translateX(0);
      opacity: 1;
      color: rgba(#fff, 1);
    }
  }
  &:active {
    opacity: .7;
  }
  
}
</style>