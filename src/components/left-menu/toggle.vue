
<template>
<svg width="32" height="128" viewBox="0 0 32 128" :fill="fill" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.5 0.5L20.8506 7.72117C27.2344 9.9864 31.5 16.0262 31.5 22.8V104.87C31.5 111.56 27.3375 117.544 21.0649 119.871L0.5 127.5" :stroke="stroke"/>
</svg>
</template>


<script setup lang="ts">

defineProps({
  stroke: {
    type: String,
    default: 'black'
  },
  fill: {
    type: String,
    default: 'none'
  }
})
</script>


