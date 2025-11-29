<template>
  <section v-if="item" class="todo-item-wrap">
    <div 
      class="main-line group" 
      :class="{ 'is-finished': item.status === TaskStatus.finished }"
      :style="{ paddingLeft: `${item.indent * 24}px` }"
    >
      <div class="drag-handle cursor-move opacity-0 group-hover:opacity-100 transition-opacity mr-1 text-gray-400" v-if="!currentIsCard">
        <icon-drag theme="outline" size="16" fill="currentColor"/>
      </div>
      
      <a-checkbox 
        :checked="item.status === TaskStatus.finished" 
        @change="handleCheck"
        class="mr-2"
      />
      
      <input 
        ref="inputRef"
        v-model="item.title" 
        :placeholder="currentIsCard ? '任务标题' : '子任务'" 
        @blur="handleBlur" 
        class="js-input flex-1 h-full bg-transparent outline-none text-gray-700 text-base placeholder-gray-400 transition-colors" 
        @keyup.enter="handleEnter(item)" 
        @keydown="handleKeyDown" 
      />
      
      <div class="actions flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <a-date-picker 
          v-model="item.deadlinePickerValue" 
          placeholder="截止日期" 
          :disabledDate="disabledDate" 
          format="YYYY-MM-DD" 
          size="small"
          style="width: 130px;" 
          @change="handleBlur" 
        />

        <!-- 删除图标 -->
        <a-popconfirm content="确认删除此任务吗？" @ok="handleDelete()" v-if="!disabledDel">
          <a-button type="text" size="small" class="ml-1 text-gray-400 hover:text-red-500">
            <template #icon>
              <icon-delete-one theme="outline" size="16" fill="currentColor" :strokeWidth="3" />
            </template>
          </a-button>
        </a-popconfirm>
      </div>
    </div>

    <TransitionGroup name="list" tag="div" class="sub-list">
      <TodoItem 
        v-for="i of item.children" 
        :key="i.id" 
        :cardId="cardId" 
        :id="i.id" 
        :disabledDel="true" 
      />
    </TransitionGroup>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue';
import dayjs from 'dayjs';
import { ToDoItem, TaskStatus } from '../interface';
import { removeItem, todoList, tryUpdateToDoCardItem } from '../use/use-todo/state';
import { useFocus } from '../use/use-todo/use-focus';
import keycode from 'keycode';

const props = defineProps({
  id: { type: String, default: '' },
  cardId: { type: String, default: '' },
  disabledDel: { type: Boolean, default: false },
})

const { focusedItemId, setFocus } = useFocus();
const inputRef = ref<HTMLInputElement | null>(null);

const cardItem = todoList.value.find(i => i.id === props.cardId) as ToDoItem;
const item = props.cardId === props.id ? cardItem : cardItem.children.find(i => i.id === props.id) as ToDoItem;
const currentIsCard = props.cardId === props.id;

// 自动聚焦逻辑
watch(focusedItemId, (newId) => {
  if (newId === props.id) {
    nextTick(() => inputRef.value?.focus());
  }
}, { immediate: true });

const findIndex = () => cardItem.children.findIndex(i => i.id === item.id);

const handleDelete = () => removeItem(props.cardId, item.id);

const disabledDate = (current: Date) => dayjs(current).isBefore(dayjs(), 'day')

const handleCheck = () => {
  item.status = item.status === TaskStatus.finished ? TaskStatus.pending : TaskStatus.finished;
  handleBlur();
}

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
  tryUpdateToDoCardItem(item);
})

const handleDelBtn = () => {
  if (!item) return;
  // 只有当标题为空时，按 Backspace 才是删除
  if (item.title) return; 

  if (item.indent > 1) {
    item.indent--;
  } else {
    if (!currentIsCard) {
      const index = findIndex();
      const prevItem = index === 0 ? cardItem : cardItem.children[index - 1];
      setFocus(prevItem.id);
    }
    handleDelete();
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  const pressKeyCode = keycode(e);
  
  // Tab 键缩进
  if (pressKeyCode === 'tab') {
    handleTab();
    e.preventDefault();
  }
  // Backspace 键删除
  if (pressKeyCode === 'backspace') {
    handleDelBtn();
  }
  // 上箭头
  if (pressKeyCode === 'up') {
    if (currentIsCard) return;
    const index = findIndex();
    if (index === 0) {
      setFocus(cardItem.id);
    } else {
      const prevItem = cardItem.children[index - 1];
      setFocus(prevItem.id);
    }
  }
  // 下箭头
  if (pressKeyCode === 'down') {
    if (currentIsCard) {
      if (cardItem.children[0]) setFocus(cardItem.children[0].id);
    } else {
      const index = findIndex();
      const nextItem = cardItem.children[index + 1];
      if (nextItem) setFocus(nextItem.id);
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
  // 使用新的 focus 管理机制
  setFocus(newItem.id);
}
</script>

<style lang="less" scoped>
.todo-item-wrap {
  display: flex;
  flex-direction: column;
}

.main-line {
  position: relative;
  height: 44px;
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 6px;
  background-color: #fff;
  transition: all 0.2s ease;
  padding-right: 8px;
  margin-bottom: 4px;
  border: 1px solid transparent;

  &:hover {
    background-color: #f8fafc; // gray-50
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  }
  
  &:focus-within {
    background-color: #fff;
    border-color: var(--theme-color, #165DFF);
    box-shadow: 0 0 0 2px rgba(22, 93, 255, 0.1);
  }

  &.is-finished {
    opacity: 0.6;
    .js-input {
      text-decoration: line-through;
      color: #86909c;
    }
  }
}

/* List Transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>