<template>
  <div class="left-menu-container">
    <!-- 主要部分 -->
     <!-- :style="{background: menuBgColor}" -->
    <main class="main" :class="{ show: isShowMenu }" @mouseleave="handleMouseLeave" >
      <div class="avatar-wrap" :class="{ active: isShowMenu }" @click="appAction.setSettingDialog(true)" @mouseover="handleMouseOver" >
        <div class="avatar w-10">
          <img src="/boy.svg" />
        </div>
      </div>
      <!-- 我的信息 -->
      <section class="content">
        <div class="item" v-for="item of list" :key="item.key">
          <icon-planet v-if="item.icon === 'planet'" theme="outline" size="26" :fill="color"/>
          <icon-add-one v-if="item.icon === 'add-one'" theme="outline" size="26" :fill="color"/>
        </div>
      </section>
      <!-- footer -->
      <section class="v-footer">
        <div class="icon-wrap">
        </div>
        <!-- <div class="line"></div> -->
        <!-- 赞赏按钮 -->
        <!-- <div class="icon-wrap">
          <icon-coffee-machine theme="outline" size="26" :fill="color"/>
        </div> -->
        <!-- 设置按钮 -->
        <div class="icon-wrap"  @click="appAction.setSettingDialog(true)">
          <icon-setting-config :fill="color" size="22"/>
        </div>
      </section>

      <section class="switch-slider" @click="handleToogleMenu">
        <!-- <div class="top"></div>
        <div class="middle"></div>
        <div class="bottom"></div> -->
        <div class="icon-arrow-wrap" :class="{reverse: !isShowMenu}">
          <!-- :fill="appState.themeColor['--i-bg-1']" -->
          <icon-left theme="outline" size="24" :fill="color"/>
        </div>
        <div class="toggle-warp">
          <!-- :fill="menuBgColor" -->
          <ToggleVue  :stroke="toggleColor.stroke" />
        </div>
      </section>
    </main>

  </div>
</template>

<script lang="ts" setup name="LeftMenu">
import ToggleVue from './toggle.vue';

const { appState, appAction } = useApp();
// const menuBgColor = 'rgba(0, 0, 0, .5)';
const menuBgColor = appState.themeColor['--i-bg-10'];
const color = ref(appState.themeColor['--i-fg-2']);

const toggleColor = computed(() => ({
  fill: appState.themeColor['--i-primary-1'],
  stroke: appState.themeColor['--i-primary'],
}))

const isShowMenu = ref(false);
const switchIsShow = () => {
  isShowMenu.value = !isShowMenu.value;
}
const handleToogleMenu = () => {
  isShowMenu.value = !isShowMenu.value;
}

const handleMouseOver = () => {
  isShowMenu.value = true;
}
const handleMouseLeave = () => {
  // isShowMenu.value = false;
  console.log('handleMouseOut');
}

const list = [
  { key: '1', icon: 'planet' },
  { key: '2', icon: 'add-one' }
]

</script>

<style lang="less" scoped>
@import "tailwindcss";
@AvatarWrapHeight: 6.4rem;
@SwitchSliderHeight: 127px;

.main {
  @apply absolute left-0 top-0 bottom-0 w-16 flex flex-col;
  z-index: 11;
  // padding-top: @AvatarWrapHeight;
  // background-color: var(--i-primary-1);
  // background-color: rgba(0, 0, 0, .7);
  backdrop-filter: blur(4px);
  transform: translate(-100%, 0);
  transition: transform .2s ease;
  flex: 1;
  flex-direction: column;
  &:before,&:after {
    position: absolute;
    content: '';
    width: 1px;
    height: calc((100% - @SwitchSliderHeight) / 2);
    right: 0;
    background-color: var(--i-primary)
  }
  &:before { top: 0; }
  &:after { bottom: 0; }
  &.show {
    transform: translate(0, 0);
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .item {
      @apply flex items-center justify-center w-12 h-12 my-2 cursor-pointer;
      border-radius: 6px;
      &:hover {
        background-color: rgba(255, 255, 255, .3);
      }
    }
  }
}
.v-footer {
  @apply flex flex-col items-center justify-center ;
  .line {
    @apply w-full bg-white bg-opacity-20;
    transform: scale(.8);
    height: 1px;
    margin: 10px 0;
  }
  .icon-wrap {
    @apply cursor-pointer;
    margin: 12px 0;
  }
}

.avatar-wrap {
  @apply w-full cursor-pointer;
  z-index: 11;
  // position: fixed;
  padding-top: 12px;
  box-sizing: border-box;
  top: 0;
  left: 0;
  height: @AvatarWrapHeight;
  display: flex;
  justify-content: center;
  .avatar {
    @apply w-8 h-8;
    border-radius: 50%;
    background-color: yellowgreen;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform .3s ease-in-out;
    transform: rotateZ(90deg);
  }
  &.active {
    .avatar {
      transform: rotateZ(0deg);
    }
  }
}

.switch-slider {
  @width: 31px;
  @tri: @width - 3px;
  @fixed: 4px;
  cursor: pointer;
  position: absolute;
  width: @width;
  height: 127px;
  top: 50%;
  transform: translate(0, -50%);
  right: -30px;
  box-sizing: border-box;
  // backdrop-filter: blur(4px);
  // background-color: rgba(0, 0, 0, .1);
  
  .icon-arrow-wrap {
    @apply absolute;
    top: 50%;
    left: 2px;
    margin-top: -12px;
    width: 24px;
    height: 24px;
    transition: transform .1s ease-in-out;
    &.reverse {
      transform: rotateZ(180deg);
      left: 5px;
    }
  }
  .top {
    position: absolute;
    width: 0;
    height: 0;
    top: -1 * @tri + @fixed;
    border-left: @tri solid skyblue;
    border-top: @tri solid transparent;
    border-bottom: @tri solid transparent;
  }
  .middle {
    height: 100%;
    width: 100%;
    background-color: yellowgreen;
    border-radius: 0 12px 12px 0;
  }
  .bottom {
    position: absolute;
    width: 0;
    height: 0;
    bottom: -1 * @tri + @fixed;
    border-left: @tri solid skyblue;
    border-top: @tri solid transparent;
    border-bottom: @tri solid transparent;
  }
}

.toggle-warp {
  backdrop-filter: blur(4px);

}
</style>