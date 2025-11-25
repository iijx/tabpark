
import { ComputedRef } from 'vue';
import { ToDoItem, IMenuValue, TaskStatus, MenuValueArr } from '../../interface';
import { useMenu } from '../use-menu';
import { isTo7Days, isToday, isToMonth, isToWeek, isToYear } from '../util';
import {refreshTodoList, addItem, addCircleItem, state, repeatList, todoList, removeItem } from './state'; 

const MenuFilterItem = {
  [IMenuValue.Today]: () => {
    return todoList.value.filter((item) => isToday(item.deadline));
  },
  [IMenuValue.Week]: () => {
    return todoList.value.filter((item) => isToWeek(item.deadline));
  },
  [IMenuValue.NearWeek]: () => {
    return todoList.value.filter((item) => isTo7Days(item.deadline));
  },
  [IMenuValue.Month]: () => {
    return todoList.value.filter((item) => isToMonth(item.deadline));
  },
  [IMenuValue.Year]: () => {
    return todoList.value.filter((item) => isToYear(item.deadline));
  },
  [IMenuValue.Finished]: () => {
    return todoList.value.filter((item) => item.status === TaskStatus.finished);
  },
  [IMenuValue.Unfinish]: () => {
    return todoList.value.filter((item) => item.deadline <Date.now());
  },
  [IMenuValue.Circle]: () => {
    return repeatList.value;
  },
  [IMenuValue.Total]: () => {
    return todoList.value.filter((item) => item.status === TaskStatus.pending);
  },
}

const menuMapItems = computed(() => {
  return MenuValueArr.reduce((acc, cur) => {
    acc[cur] = MenuFilterItem[cur]();
    return acc;
  }, {} as any);
});

let renderTodoList: ComputedRef<ToDoItem[]>;

const initUserInfo = (userInfo: any) => {
  state.userId = userInfo.id;
  return userInfo.id ? Promise.resolve() : Promise.reject();
}

export const useTodo = () => {
  const { activeMenu, activeMenuValue } = useMenu();
  
  if (!renderTodoList) {
    renderTodoList = computed(() => {
      const menufilter = MenuFilterItem[activeMenuValue.value];
      if (menufilter) return menufilter() as ToDoItem[];
      else return [] as ToDoItem[];
    })
  }

  return {
    state,
    addCircleItem,
    menuMapItems,
    todoList,
    renderTodoList,
    addItem,
    removeItem,
    activeMenu,
    activeMenuValue,
    refreshTodoList,
    initUserInfo,
  }
}
