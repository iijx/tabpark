<template>
  <div>
    <!-- 用户信息：头像 和 昵称 -->
    <div class="w-20 h-20 rounded-full mx-auto overflow-hidden">
        <img src="/boy.svg" />
    </div>
    <section v-if="appState.isLogin.value" class="w-full mt-4 mb-8 flex flex-col justify-center items-center grow leading-3 ">
        <span class="text-white">{{ appState.userState.nickname || '一枚安静的咸鸭蛋' }} </span>
    </section>
    <section v-else class="flex justify-center mt-4 mb-8 w-32 mx-auto">
        <label for="login-dialog" class="btn btn-sm">
            <button class="btn btn-outline btn-block" @click="loginBtn">注册/登录</button>
        </label>
    </section>

    <!-- 信息 -->
    <main class="i-block">
        <section class="item">
            <div class="label">昵称</div>
            <div class="flex items-center">
                <span class="mr-2">{{  appState.userState.nickname || '一枚安静的咸鸭蛋' }}</span>
                <icon-pencil theme="outline" size="18" fill="#fff" />
            </div>
        </section>
        <section class="item">
            <div class="label">邮箱</div>
            <div class="flex items-center">
                <span class="mr-2">{{  appState.userState.email }}</span>
                <icon-pencil theme="outline" size="18" fill="#fff" />
            </div>
        </section>
        <!-- <section class="item">
            <div class="label">手机号</div>
            <input type="checkbox" class="toggle" checked />
        </section> -->
    </main>
  </div>
</template>

<script lang="ts" setup>
const { appState, appAction } = useApp();

const loginBtn = () => appAction.setIsShowLoginDialog(true);
</script>


<style lang="less" scoped>
@import "tailwindcss";

.i-block {
    @apply bg-white bg-opacity-5 p-2 rounded-md;
}
.item {
    @apply flex items-center;
    font-size: 14px;
    .label {
        @apply flex-grow;
    }
}

</style>