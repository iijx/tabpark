<template>
  <div class="main-list-container">
    <main class="max-w-4xl relative">
      <section class="page-header-wrap">
        <div class="page-header" v-if="activeMenu">
          <Icon :type="activeMenu.icon" />
          <div class="page-title">{{ activeMenu.label }}</div>
        </div>
        <!-- <div v-if="getMenuDateInfo" class="info">{{ getMenuDateInfo }}</div> -->
      </section>

      <!-- 循环任务 -->
      <Total v-show="activeMenuValue === IMenuValue.Total" />
      <UnFinish v-show="activeMenuValue === IMenuValue.Unfinish" />
      <Circle v-show="activeMenuValue === IMenuValue.Circle" />
      <Today v-show="activeMenuValue === IMenuValue.Today" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { IMenuValue } from '../../interface';
import Icon from '../../comp/todo-icon.vue';
import Circle from './circle.vue';
import Total from './total.vue'
import UnFinish from './unfinish.vue';
import Today from './today.vue';
import { useTodo } from '../../use/use-todo/index';
const { activeMenu, activeMenuValue, state, addCircleItem, renderTodoList,  addItem } = useTodo();

const weekdays = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
const getMenuDateInfo = computed(() => {
  const now = new Date();
  const month = now.getMonth() + 1; // getMonth() 返回的月份是从 0 开始的，所以需要加 1
  const day = now.getDate(); // 获取当前日期（一个月中的第几天）
  const weekday = now.getDay(); // （0 表示星期天，1 表示星期一，以此类推）

  if (activeMenuValue.value === IMenuValue.Today) {
    return `${month}月${day}日 ${weekdays[weekday]}`
  }
  if (activeMenuValue.value === IMenuValue.Week) {
    return `${weekdays[weekday]}`
  }
  if (activeMenuValue.value === IMenuValue.Month) {
    return `${month}月`
  }
  if (activeMenuValue.value === IMenuValue.Year) {
    return `${now.getFullYear()}年`
  }
  else return ''
})

</script>

<style lang="less" scoped>
.main-list-container {
  flex-basis: 0;
  flex-grow: 1;
  min-height: 60vh;
  padding: 32px;
  box-sizing: border-box;
  position: relative;
  padding-bottom: 120px;
}

.page-header-wrap {
  padding-bottom: 16px;
  .page-header {
    display: flex;
    align-items: center;
    color: #323130;
    font-size: 20px;
    padding-bottom: 10px;

    .page-title {
      font-size: 20px;
      margin-left: 6px;
      font-weight: bold;
    }
  }

  .info {
    font-size: 14px;
    color: var(--i-fg-1);
  }

}

</style>
