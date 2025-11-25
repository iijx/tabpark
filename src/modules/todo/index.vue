<template>
  <main class="todo-module-container">
    <Menu />
    <MainList />
  </main>

</template>

<script setup lang="ts">
import Menu from './comp/menu.vue';
import MainList from './comp/main/index.vue';
import { useTodo } from './use/use-todo/index';

const { appState } = useApp();
const { initUserInfo, refreshTodoList } = useTodo();
const init = () => {
  initUserInfo(appState.userState).then(() => {
    refreshTodoList()
  }).catch((err) => {
    console.log('todo初始化用户信息失败')
  })
}

watch(appState.isLogin, v => {
  if (v) {
    init()
  }
})
</script>

<style lang="less" scoped>
.todo-module-container  {
  width: 100%;
  height: 100%;
  display: flex;
  background: #faf9f8;
}
.main {
  color: var(--font-color-primary);
  font-size: 1.4rem;
  font-weight: 500;
  font-family: "Microsoft Yahei","微软雅黑","STXihei","Meiryo UI","Meiryo","メイリオ","ＭＳ Ｐゴシック","MS PGothic","Hiragino Kaku Gothic Pro","Arial Unicode MS","Helvetica Neue","Helvetica","Arial",sans-serif;
  padding: 0;
  margin: 0;
  text-decoration: none;
  user-select: none;
  text-rendering: optimizeLegibility;
  scrollbar-width: thin;
  scrollbar-color: var(--bg-scrollbar) transparent;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}
</style>