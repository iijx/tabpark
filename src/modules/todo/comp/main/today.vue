<template>
  <div>
    <a-timeline :reverse="true">
      <a-timeline-item label="2017-03-10" v-for="item of renderTodoList">
        <div>{{ item.deadlinePickerValue }}</div>
      </a-timeline-item>
    </a-timeline>
  </div>
</template>

<script setup lang="ts">
import { useTodo } from '../../use/use-todo';

const { renderTodoList } = useTodo();

</script>