<template>
  <div class="todo-list-wrapper">
    <TransitionGroup name="list-complete" tag="div">
      <TodoItemCard v-for="item of renderTodoList" :key="item.id" :id="item.id" class="list-complete-item" />
    </TransitionGroup>
    
    <div class="h-8"></div>
    <a-divider :size="2" style="border-bottom-style: dotted; margin: 24px 0;" />
    
    <div class="add-task-wrapper group">
      <div class="add-icon">
        <icon-plus theme="outline" size="20" fill="#9ca3af" />
      </div>
      <input 
        v-model.trim="input" 
        placeholder="添加新的任务..." 
        class="task-input" 
        @keyup.enter="handleEnter" 
      />
      <div class="enter-tip" :class="{ 'opacity-100': input.length > 0 }">
        按 <kbd>Enter</kbd> 创建
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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
      input.value = '';
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
.todo-list-wrapper {
  padding-bottom: 40px;
}

.add-task-wrapper {
  position: relative;
  height: 56px;
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
  padding: 0 16px;

  &:focus-within {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--theme-color, #165DFF);
  }
}

.add-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.task-input {
  background-color: transparent;
  outline: none;
  width: 0;
  flex: 1;
  height: 100%;
  font-size: 16px;
  color: #1f2937;

  &::placeholder {
    color: #9ca3af;
  }
}

.enter-tip {
  font-size: 12px;
  color: #9ca3af;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
  
  kbd {
    background-color: #f3f4f6;
    padding: 2px 4px;
    border-radius: 4px;
    font-family: monospace;
    border: 1px solid #e5e7eb;
  }
}

/* List Animations */
.list-complete-item {
  transition: all 0.4s ease;
  display: inline-block; /* Required for transition */
  width: 100%;
}

.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute; /* Ensures smooth removal */
}
</style>