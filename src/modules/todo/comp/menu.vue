<template>
  <nav class="nav shadow-sm">
    <div class="fold">
      <icon-hamburger-button theme="outline" size="24" fill="#333" :strokeWidth="2" />
    </div>

    <!-- 全部 -->
    <NavItem :num="menuMapItems[IMenuValue.Total].length" :active="activeMenuValue === IMenuValue.Total" :icon="MenuMap[IMenuValue.Total].icon" :label="MenuMap[IMenuValue.Total].label" @click="setActiveMenuValue(MenuMap[IMenuValue.Total].value)" />

    <!-- 看板：我的一天，本周，当月，今年 -->
    <div class="border-t my-2 mx-8"></div>
    <NavItem v-for="item of todoMenuList1" :key="item.value" :num="menuMapItems[item.value].length"  :active="activeMenuValue === item.value" :icon="item.icon" :label="item.label" @click="setActiveMenuValue(item.value)" />

    <!-- 循环任务 -->
    <div class="border-t my-2 mx-8"></div>
    <NavItem v-for="item of todoMenuList4" :key="item.value" :num="repeatList.length"  :active="activeMenuValue === item.value" :icon="item.icon" :label="item.label" @click="setActiveMenuValue(item.value)" />

    <!-- 未完成，已完成 -->
    <div class="border-t my-2 mx-8"></div>
    <NavItem v-for="item of todoMenuList3" :key="item.value" :num="menuMapItems[item.value].length"  :active="activeMenuValue === item.value" :icon="item.icon" :label="item.label" @click="setActiveMenuValue(item.value)" />
  </nav>
</template>

<script setup lang="ts">
import { useTodo } from '../use/use-todo';
import { repeatList } from '../use/use-todo/state';
import { IMenuValue, MenuMap } from '../interface';
import { useMenu } from '../use/use-menu';
import NavItem from './nav-item.vue';

const { menuMapItems } = useTodo();

const { todoMenuList1, todoMenuList3, todoMenuList4, activeMenuValue, setActiveMenuValue } = useMenu();
</script>


<style lang="less" scoped>
.nav {
  height: 100%;
  background-color: #fff;
  padding-top: 20px;
  box-sizing: border-box;
  .fold {
    padding-left: 34px;
    height: 60px;
    display: flex;
    align-items: center;
  }
  .item {
    border-left: 2px solid transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 32px;
    height: 44px;
    &.active {
      background-color: #eff6fc;
      font-weight: bold;
      color: #000;
      border-color: #2564cf;
    }
    .title {
      margin-left: 12px;
    }
  }
}
@media (min-width: 1010px) {
  .nav {
    width: 290px;
  }
}
</style>