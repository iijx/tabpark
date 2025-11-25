import { IMenuValue, ToDoItem, RepeatTodoItem } from "../../interface";

/* *********************** 下载数据 
 * cloud ---> todoList
 * *********************** 操作数据
 * add: todoListUIList
 * remove: todoListUIList
 * update: todoListUIList
*/

export const todoList = ref<ToDoItem[]>([]);
export const repeatList = ref<RepeatTodoItem[]>([]);
export const state = {
  userId: '',
  isInited: false,
}
let backupTodoList: ToDoItem[] = [];

// 增加一个待办事项
export const addItem = (v: string, menu?: IMenuValue) => {
  const item = new ToDoItem(new ToDoItem().setTitle(v));
  item.tpUserId = state.userId;
  if (menu) item.setMenu(menu);
  todoList.value.push(item);

  const params = JSON.parse(JSON.stringify(item))
  delete params.id;
  Api.todoReq.create({ data: params })
}

export const addCircleItem = (v: string) => {
  const item = new RepeatTodoItem().setTitle(v);
  repeatList.value.push(item);
}

// 删除一个待办事项
export const removeItem = (cardId: string, subId?: string) => {
  const index = todoList.value.findIndex((item) => item.id === cardId);
  if (index !== -1) {
    if (subId && subId !== cardId) {
      const subIndex = todoList.value[index].children.findIndex((item) => item.id === subId);
      if (subIndex!== -1) {
        todoList.value[index].children.splice(subIndex, 1);
      }
    } else {
      todoList.value.splice(index, 1);
    }
  }

  Api.todoReq.delete({ id: cardId });
}

const updateToDoCardItem = (item: ToDoItem) => {
  const params = JSON.parse(JSON.stringify(item))
  params.id = params.id || params.id;

  Api.todoReq.updateById(params)
}
const checkToDoCardIsChange = (item: ToDoItem) => {
  const rawItem = backupTodoList.find((i: ToDoItem) => i.id === item.id);
  if (!rawItem) return; // 理论上不会出现

  if (item.title !== rawItem.title || item.deadline!== rawItem.deadline || item.status !== rawItem.status) {
    return true;
  }
  const len = item.children.length;
  for (let i = 0; i < len; i++) {
    const subItem = item.children[i];
    const rawSubItem = rawItem.children[i]
    
    if (!rawSubItem || subItem.title!== rawSubItem.title || subItem.deadline!== rawSubItem.deadline) {
      return true;
    }
  }
  return false;
}

export const tryUpdateToDoCardItem = (item: ToDoItem) => {
  const isChange = checkToDoCardIsChange(item);
  if (isChange) {
    updateToDoCardItem(item);
  }
}

export const refreshTodoList = () => {
  return Api.todoReq.findAllByUserId({ tpUserId: state.userId }).then((res: any) => {
    todoList.value = res.map((item: any) => {
      const i = new ToDoItem(item);
      return i;
    });
    backupTodoList = JSON.parse(JSON.stringify(todoList.value));
    repeatList.value = JSON.parse(res.repeatListStr);
    state.isInited = true;
  }).catch(err => {
    // 说明是新用户，没有数据，也认为是初始化了
    // if (err.code === ApiErrorCode.NOT_FOUND && state.userId) {
    //   Api.todoReq.create({
    //     tabparkUserId: state.userId,
    //     todoListStr: ''
    //   })
    //   state.isInited = true;
    // }
  })
}
