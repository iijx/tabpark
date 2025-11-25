<template>
  <a-modal v-model:visible="circleModalInfo.visible" @ok="handleConfirm" draggable title="循环任务设置">
    <a-input v-model="circleModalInfo.item.title" placeholder="输入任务" class="w-full h-full" />
    <a-select v-model="circleModalInfo.item.circleType">
      <a-option v-for="item of AllCircleTypes" value="item">{{ CircleTypesMap[item].label }}</a-option>
    </a-select>
  </a-modal>
</template>

<script setup lang="ts">
import { CircleType } from '../../interface';
import { circleModalInfo } from '../../use/use-swap-state';
import { getCurMonthLastTime, getCurWeekLastTime, getCurYearLastTime } from '../../use/util';

const AllCircleTypes = [
  CircleType.EveryDay,
  CircleType.EveryWeek,
  CircleType.EveryMonth,
  CircleType.EveryYear,
]

const CircleTypesMap = {
  [CircleType.EveryDay]: {
    label: '每天',
    deadLineLabel: '当天',
    value: () => {
      return new Date().setHours(23, 59, 59)
    }
  },
  [CircleType.EveryWeek]: {
    label: '每周',
    deadLineLabel: '周日晚',
    value: () => {
      return getCurWeekLastTime();
    }
  },
  [CircleType.EveryMonth]: {
    label: '每月',
    deadLineLabel: '每月',
    value: () => {
      return getCurMonthLastTime();
    }
  },
  [CircleType.EveryYear]: {
    label: '每年',
    deadLineLabel: '每年',
    value: () => {
      return getCurYearLastTime()
    }
  }
}


const handleSettingCircle = (item: any) => {
  circleModalInfo.visible = true;
}

const handleConfirm = () => {

}
</script>