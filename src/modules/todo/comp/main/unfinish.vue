<template>
  <div>
    <TodoItemCard v-for="item of renderTodoList" :key="item.createdAt" :id="item.id" />
  </div>
</template>

<script setup lang="ts">
import { useTodo } from '../../use/use-todo';
import TodoItemCard from '../todo-item-card.vue';

const { renderTodoList } = useTodo();

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