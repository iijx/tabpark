<template>
  <div class="flow-layout">
    <section v-for="item of pageCount" :key="item">
      <slot :name="item" />
    </section>
  </div>
</template>

<script setup lang="ts">

defineProps({
  pageCount: {
    type: Number,
    default: 1
  }
})

</script>

<style lang="less">
.flow-layout {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>