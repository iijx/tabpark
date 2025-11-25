<template>
  <!-- px-4 py-2 mt-4 shadow-sm -->
  <section v-if="item" class="todo-item">
    <div class="main-line" :id="item.id" :style="{ paddingLeft: `${item.indent * 24}px` }">
      <a-checkbox :checked="item.status === TaskStatus.finished" @change="handleBlur" />
      <input v-model="item.title" :placeholder="currentIsCard ? '输入任务' : '输入子任务'" @blur="handleBlur" class="js-input w-full h-full" @keyup.enter="handleEnter(item)" @keydown="handleKeyDown" />
      <a-date-picker v-model="item.deadlinePickerValue" placeholder="截止日期" :disabledDate="disabledDate" format="YYYY-MM-DD" style="width: 130px;" @change="handleBlur" />

      <!-- 删除图标 -->
      <a-popconfirm content="确认删除此任务吗？" @ok="handleDelete()" v-if="!disabledDel">
        <a-button type="text" class="ml-2">
          <template #icon>
            <icon-delete-one theme="outline" size="18" fill="currentColor" :strokeWidth="2" />
          </template>
        </a-button>
      </a-popconfirm>
      <div v-else class="w-10"></div>
    </div>

    <TodoItem v-for="i of item.children" :key="i.id" :cardId="cardId" :id="i.id" :disabledDel="true" />
  </section>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { ToDoItem, TaskStatus } from '../interface';
import { removeItem, todoList, tryUpdateToDoCardItem } from '../use/use-todo/state';
import keycode from 'keycode';

const props = defineProps({
  id: { type: String, default: '' },
  cardId: { type: String, default: '' },
  disabledDel: { type: Boolean, default: false },
})

const cardItem = todoList.value.find(i => i.id === props.cardId) as ToDoItem;
const item = props.cardId === props.id ? cardItem : cardItem.children.find(i => i.id === props.id) as ToDoItem;
const currentIsCard = props.cardId === props.id;

const findIndex = () => cardItem.children.findIndex(i => i.id === item.id);

const handleDelete = () => removeItem(props.cardId, item.id);

const disabledDate = (current: any) => dayjs(current).isBefore(dayjs(), 'day')

const handleTab = () => {
  if (!item) return;
  if (currentIsCard) return; // 根任务不能缩进

  const index = cardItem.children.findIndex(i => i.id === item.id);
  if (index === 0) return; // 第一个任务也不能缩进

  const prevItem = cardItem.children[index - 1];
  // 尝试缩进一下，但最多比上一项 多缩进 1 个单位
  item.indent = Math.min(prevItem.indent + 1, item.indent + 1);
}

const handleBlur = () => {
  tryUpdateToDoCardItem(item);
}

watch(() => item.status, () => {
  tryUpdateToDoCardItem(item);
})
watch(() => item.deadlinePickerValue, () => {
  console.log('item.deadlinePickerValue', item.deadlinePickerValue)
  tryUpdateToDoCardItem(item);
})


const handleDelBtn = () => {
  if (!item) return;
  if (item.title) return; // 有值也不用管（item.title 是按下之前的值）

  if (item.indent > 1) {
    item.indent--;
  } else {
    if (!currentIsCard) {
      const index = findIndex();
      const prevItem = index === 0 ? cardItem : cardItem.children[index - 1];
      const prevItemDom = document.getElementById(prevItem.id);
      if (prevItemDom) {
        const input = prevItemDom.getElementsByClassName('js-input')[0] as HTMLInputElement;
        if (input) setTimeout(() => input.focus());
      }
    }
    handleDelete();
  }
}

const focusItem = (item: ToDoItem) => {
  if (!item) return console.log("focus", item);
  const itemDom = document.getElementById(item.id);
  if (itemDom) {
    const input = itemDom.getElementsByClassName('js-input')[0] as HTMLInputElement;
    if (input) {
      input.focus();
    }
  }
}

const handleKeyDown = (e: any) => {
  const pressKeyCode = keycode(e);
  console.log('pressKeyCode', pressKeyCode)
  // 如果是 tab 键
  if (pressKeyCode === 'tab') {
    handleTab();
    e.preventDefault();
  }
  // 如果是 backspace 键
  if (pressKeyCode === 'backspace') {
    handleDelBtn();
  }
  // 上
  if (pressKeyCode === 'up') {
    if (currentIsCard) return;
    const index = findIndex();
    if (index === 0) focusItem(cardItem)
    const prevItem = cardItem.children[index - 1];
    focusItem(prevItem)
  }
  // 下
  if (pressKeyCode === 'down') {
    if (currentIsCard) {
      cardItem.children[0] && focusItem(cardItem.children[0])
    } else {
      const index = findIndex();
      const nextItem = cardItem.children[index + 1];
      nextItem && focusItem(nextItem)
    }
  }
}

const handleEnter = (item: ToDoItem) => {
  const newItem = new ToDoItem();
  if (currentIsCard) {
    newItem.indent = 1;
    cardItem.children.unshift(newItem);
  } else {
    newItem.indent = item.indent;
    const index = cardItem.children.findIndex(i => i.id === item.id);
    cardItem.children.splice(index + 1, 0, newItem);
  }
  nextTick(() => focusItem(newItem))
}
</script>

<style lang="less" scoped>
.todo-item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .sub {
    width: 100%;
    border-radius: 4px;
    background-color: #fff;
    display: flex;
    height: 40px;
    align-items: center;
  }
  input {
    background-color: transparent;
    outline: none;
    width: 0;
    flex: 1;
    margin: 0 12px;
  }
}
.main-line {
  position: relative;
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  background-color: #fff;

  input {
    background-color: transparent;
    outline: none;
    width: 0;
    flex: 1;
    margin: 0 12px;
  }
}
</style>