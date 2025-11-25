<template>
  <div>
    <TodoItemCard v-for="item of renderTodoList" :key="item.createdAt" :id="item.id" />
    <div class="h-2 my-8"></div>
    <a-divider  :size="2" style="border-bottom-style: dotted" />
    <div class="item p-2 shadow-md">
      <input v-model.trim="input" placeholder="添加新的任务" class="w-full h-full" @keyup.enter="handleEnter" />
      <span class="enter-tip">输入完成后，按 Enter 键添加</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { appState } from '@/compositions/use-app/app-state';
import { IMenuValue } from '../../interface';
import { useTodo } from '../../use/use-todo';
import { appAction } from '@/compositions/use-app/app-action';
import TodoItemCard from '../todo-item-card.vue';

const { state, activeMenuValue, addCircleItem, addItem, renderTodoList } = useTodo();

const input = ref('');


const handleEnter = () => {
  const v = input.value;
  if (!v) return;
  if (activeMenuValue.value === IMenuValue.Circle) {
    if (!appState.isLogin.value) return appAction.message.warning('还没登录呢，无法创建循环任务！')
    else {
      addCircleItem(v);
    }
  }
  else {
    addItem(v, activeMenuValue.value);
    input.value = '';
    if (!state.userId) return appAction.message.warning('还没登录呢，数据要丢失啦！');
  }
}

</script>

<style lang="less" scoped>

.enter-tip {
  position: absolute;
  right: 32px;
  color: var(--i-bg-3-pressed);
}

input::placeholder {
  color: var(--i-fg-1);
}


.item {
  position: relative;
  height: 54px;
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  background-color: #fff;

  input {
    background-color: transparent;
    outline: none;
    width: 0;
    flex: 1;
    margin: 0 12px;
  }
}
</style>