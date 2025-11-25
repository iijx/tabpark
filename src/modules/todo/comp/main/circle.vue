<template>
  <div>
    <div v-for="item of repeatList" :key="item.createdAt" class="item p-2 my-4 shadow-sm">
      <input v-model="item.title" placeholder="输入任务" class="w-full h-full" />
      <!-- 循环图标 -->
      <a-button type="text" status="danger" class="ml-2" @click="handleSettingCircle">
        <template #icon>
          <icon-setting-config theme="outline" size="18" fill="#d93044"/>
          <!-- <icon-cycle-arrow theme="outline" size="18" fill="currentColor" :strokeWidth="2" /> -->
        </template>
      </a-button>
      <!-- 删除图标 -->
      <!-- <a-popconfirm content="确认删除此循环任务吗？" @ok="handleDelete(item)">
        <a-button type="text" class="ml-2">
          <template #icon>
            <icon-delete-one theme="outline" size="18" fill="currentColor" :strokeWidth="2" />
          </template>
        </a-button>
      </a-popconfirm> -->
    </div>
    <div class="h-2 my-8"></div>
    <div class="extra-note">
      <div>每天：每天 00:00 自动创建任务，截止时间为当天：23:59:59</div>
      <div>每周：每周一 00:00 自动创建任务，截止时间为星期天的23:59:59</div>
      <div>每工作日：每周一 00:00 自动创建任务，截止时间为星期五的23:59:59</div>
      <div>每周末：每周六 00:00 自动创建任务，截止时间为星期日的23:59:59</div>
      <div>每月：每周一 00:00 自动创建任务，截止时间为星期日的23:59:59</div>
      <div>每年：每年1月 1 日 00:00 自动创建任务，截止时间为星期日的23:59:59</div>
    </div>
    <CircleModal />
  </div>
</template>

<script setup lang="ts">
import { repeatList } from '../../use/use-todo/state';
import { circleModalInfo } from '../../use/use-swap-state';
import CircleModal from './circle-modal.vue';

const handleSettingCircle = () => {
  circleModalInfo.visible = true;
}

</script>