<template>
  <section class="bg-white px-4 py-2 mb-4 shadow-sm">
    <ToDoItemVue :cardId="id" :id="id" />
  </section>
</template>

<script setup lang="ts">
import ToDoItemVue from './todo-item.vue';

defineProps({
  id: { type: String, default: '' },
})

</script>

<style lang="less" scoped>
</style>