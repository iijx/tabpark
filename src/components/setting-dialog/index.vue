<template>
  <IDialog :value="appState.isShowSettingDialog.value" :header="false" :footer="false" width="auto" height="50vh" @cancel="handleHideDialog" customClass="main-setting-dialog">
    <template v-slot:content>
      <main class="main-content flex flex-row rounded-md">
        <!-- left -->
        <div class="grow-0 left-section relative">
          <section class="setting-item h-auto user-info" @click="handleLogin">
              <div class="avatar w-10">
                <img src="/boy.svg" />
              </div>
              <div v-if="!appState.isLogin.value" class="ml-2">立即登录</div>
              <div v-else class="ml-2">{{ (appState.userState.email || '').split('@')[0] }}</div>
          </section>

          <div v-for="(item, index) of menus" :key="index" class="setting-item h-8" :class="{ active: activeIndex === index }" @click="activeIndex = index">
            <icon-platte v-show="item.icon === 'platte'" />
            <icon-stickers v-show="item.icon === 'stickers'" />
            <icon-search v-show="item.icon === 'search'" />
            <icon-setting v-show="item.icon === 'setting'" />
            <icon-bookmark v-show="item.icon === 'bookmark'" />
            <span class="label">{{ item.title }}</span>
          </div>

          <!-- 退出登录 -->
          <div v-if="appState.isLogin.value" class="setting-item h-8 absolute bottom-0 right-0 w-full" @click="handleLogin">
            <icon-logout />
            <span class="label">退出登录</span>
          </div>
        </div>
    
        <!-- right -->
        <section class="grow right-section">
          <div v-show="curMenu?.showTitle" class="title">{{ curMenu?.title }}</div>
          <wrapper v-show="curMenu?.key === 'wrapper'"/>
          <theme v-show="curMenu?.key === 'theme'" />
          <search v-show="curMenu?.key === 'search'" />
          <user v-show="activeIndex === -1" />
        </section>
      </main>
    </template>
  </IDialog>

  <!-- <input type="checkbox" id="my-modal-6" class="modal-toggle" />
  <label for="my-modal-6" class="modal modal-bottom sm:modal-middle">
    <label for="" class="main-dialog flex flex-row rounded-md" >
      
    </label>
  </label> -->
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
  // { icon: 'bookmark', title: '关于', key: 'about', showTitle: true  },
]);
const activeIndex = ref(0);
const curMenu = computed(() => menus.value[activeIndex.value]);

const { appState, appAction } = useApp();
const handleHideDialog = () => appAction.setSettingDialog(false);
const handleLogin = () => {
  if (appState.isLogin.value) activeIndex.value = -1;
  else {
    appAction.setSettingDialog(false);
    appAction.setIsShowLoginDialog(true, false);
  }
}
</script>

<style lang="less" scoped>
@import "tailwindcss";

.main-content {
  display: flex;
  height: 100%;
}
.left-section {
  @apply w-40;
  padding-right: 16px;
  > .setting-item {
    padding: 12px 8px;
    margin-bottom: 8px;
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
    &.user-info {
      justify-content: center;
      margin-bottom: 12px;
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
  width: 50vw;
  min-width: 340px;
  max-width: 560px;
  > .title {
    font-weight: bold;
    margin-bottom: 12px;
    font-size: 14px;
  }
}

</style>

<style lang="less">
.i-dialog-root .main-setting-dialog {
  height: 28rem;
  padding: 18px 12px;
  // border: 1px solid var(--i-stroke-3);
  // background-color: rgb(from var(--i-bg-1) r g b / 60%);
  // background-color: color-mix(in srgb, var(--i-bg-3) 90%, transparent);
  // background-color: color-mix(in srgb, var(--i-primary-1) 90%, transparent);
  background-color: var(--i-primary-1);
  // background-color: fade(var(--i-fg-4), 20%);
  // background-color: rgba(#6B6B6B, 1);
  backdrop-filter: blur(4px);
  color: var(--i-fg-2);
}

</style>