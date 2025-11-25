<!-- Icon.vue -->
<template>
  <div>
    <icon-sun v-if="type === 'sun'" theme="filled" :size="size" :fill="fill" :strokeWidth="1" />
    <icon-calendar v-if="type === 'week'" theme="outline" :size="size" :fill="fill" :strokeWidth="1" />
    <icon-calendar-thirty v-if="type === 'month'" theme="outline" :size="size" :fill="fill" :strokeWidth="1" />
    <icon-earth v-if="type === 'year'" theme="outline" :size="size" :fill="fill" :strokeWidth="1"/>
    <!-- <icon-plan v-if="type === 'planing'" theme="outline" :size="size" :fill="fill" :strokeWidth="1"/> -->
    <icon-table v-if="type === 'planing'" theme="outline" :size="size" :fill="fill" :strokeWidth="1"/>
    <icon-list-fail v-if="type === 'fail'" theme="outline" :size="size" :fill="fill" :strokeWidth="1"/>
    <icon-list v-if="type === 'finish'" theme="outline" :size="size" :fill="fill" :strokeWidth="1"/>
    <icon-cycle-arrow v-if="type === 'circle'" theme="outline" size="24" fill="#333" :strokeWidth="1"/>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  type: { type: String, default: '' },
  size: { type: Number, default: 22 },
  fill: { type: String, default: 'currentColor' }, 
})
</script>