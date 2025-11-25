<template>
  <div class="left-menu-container">
    <!-- 头像 -->
    <!-- <div class="avatar-wrap" @click="() => appAction.setIsShowLoginDialog(true, false)">
      <div class="avatar">H</div>
    </div> -->

    <!-- 设置按钮 -->
    <div class="icon-setting-wrap" @click="appAction.setSettingDialog(true)">
      <icon-setting-config fill="#fff" size="22" />
    </div>
  </div>
</template>

<script lang="ts" setup name="LeftMenu">

const { appAction } = useApp();

</script>

<style lang="less" scoped>
@import "tailwindcss";

.avatar-wrap {
  @apply fixed w-12 cursor-pointer flex justify-center;
  padding-top: 12px;
  box-sizing: border-box;
  top: 0;
  left: 0;

  .avatar {
    @apply w-7 h-7;
    border-radius: 50%;
    background-color: yellowgreen;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.icon-setting-wrap {
    @apply absolute right-0 top-0 m-4 cursor-pointer;
}
</style>