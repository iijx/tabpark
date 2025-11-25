<template>
  <IDrawer :value="appState.isShowSettingDialog.value" :header="false" width="auto" @close="handleHideDialog">
    <section class="user-info">
        <div class="avatar w-10">
          <img src="/boy.svg" />
        </div>
        <IButton v-if="!appState.isLogin.value" type="primary" class="mt-4" size="mini" @click="handleLogin">注册/登录</IButton>
    </section>
    <main class="main-content">
      <!-- left -->
      <div class="grow-0 left-section">

        <div v-for="(item, index) of menus" :key="index" class="setting-item" :class="{ active: activeIndex === index }" @click="activeIndex = index">
          <icon-platte v-show="item.icon === 'platte'" size="22"/>
          <icon-stickers v-show="item.icon === 'stickers'" size="22"/>
          <icon-search v-show="item.icon === 'search'" size="22"/>
          <icon-setting v-show="item.icon === 'setting'" size="22"/>
          <icon-bookmark v-show="item.icon === 'bookmark'" size="22"/>
          <span class="label">{{ item.title }}</span>
        </div>
      </div>
  
      <!-- right -->
      <section class="grow right-section">
        <!-- <div class="title">{{  }}</div> -->
        <div class="content-wrap">
          <wrapper v-show="curMenu.key === 'wrapper'"/>
          <theme v-show="curMenu.key === 'theme'" />
          <search v-show="curMenu.key === 'search'" />
          <user v-show="activeIndex === -1" />
        </div>
      </section>
    </main>
  </IDrawer>
</template>

<script lang="ts" setup name="SettingDialog">
import wrapper from './wrapper/index.vue'
import theme from './theme.vue'
import search from './search.vue'
import user from './user.vue';

const menus = ref([
  { icon: 'platte', title: '主题', key: 'theme', showTitle: true },
  { icon: 'stickers', title: '壁纸', key: 'wrapper', showTitle: false },
  { icon: 'search', title: '搜索引擎', key: 'search', showTitle: false },
  // { icon: 'setting', title: '桌面图标', key: 'desktop' },
  // { icon: 'setting', title: '设置', key: 'setting' },
  { icon: 'bookmark', title: '关于', key: 'about', showTitle: true  },
]);
const activeIndex = ref(0);
const curMenu = computed(() => menus.value[activeIndex.value]);

const { appState, appAction } = useApp();
const handleHideDialog = () => appAction.setSettingDialog(false);
const handleLogin = () => {
  if (appState.isLogin.value) activeIndex.value = -1;
  else {
    appAction.setSettingDialog(false);
    appState.isShowLoginDialog.value = true;
  }
}

</script>

<style lang="less" scoped>
@import "tailwindcss";

.main-content {
  display: flex;
  height: 100%;
  width: 480px;
  box-sizing: border-box;
  // background-color: #fff;
  background: var(--i-primary-1);
}


.user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 18px 0 24px;
  span {
    cursor: pointer;
    color: var(--i-primary);
  }
}
.left-section {
  position: relative;
  padding: 0 12px;
  width: 142px;
  flex-shrink: 0;
  .setting-item-list {
    padding: 0 12px;
    padding-top: 12px;
  }
  .setting-item {
    padding: 4px 8px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
    color: var(--i-fg-2);
    .avatar {
      background-color: rgba(#000, .1);
      @apply rounded-full;
      overflow: hidden;
    }
    &:hover {
      background-color: var(--i-bg-1-hover);
      background-color: var(--i-primary-hover);
    }
    &.active {
      color: var(--i-primary-7);
      background-color: color-mix(in srgb, var(--i-primary-6) 10%, transparent);
      font-weight: bold;
    }
    .label {
      margin-left: .2em;
    }
  }
}
.right-section {
  height: 100%;
  flex: 1;
  // padding-top: 118px;
  box-sizing: border-box;
  position: relative;
  @gutter: 12px;
  > .title {
    position: absolute;
    top: 0;
    height: 118px;
    margin-bottom: 12px;
    font-size: 16px;
    // background-color: #fff;
    background: var(--i-primary-1);
    padding: 0 @gutter;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
  }
  >.content-wrap {
    // background: #999;
    background-color: #f1f0f5;
    background: var(--i-primary-1);
    border-top-left-radius: 8px;
    padding: 0 @gutter;
    height: 100%;
  }
}

</style>