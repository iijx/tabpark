<template>
  <div class="overflow-x-auto border">
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
        <th v-for="col of columns" :key="col.key">{{ col.label }}</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr v-for="(item, index) of data" :key="index">
        <th v-for="col of columns" :key="col.key">{{ item[col.key] }}</th>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script setup lang="ts">

defineProps<{
  columns: { key: string, label: string }[];
  data: Record<string, string>[];
}>();
</script>