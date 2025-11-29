import { v4 as uuidv4 } from 'uuid';
import { getCurWeekLastTime, getCurMonthLastTime, getCurYearLastTime } from './use/util';
import dayjs from 'dayjs';

export class RepeatTodoItem {
  id = uuidv4();
  title = '';
  cycleTime = CircleType.EveryDay; // 循环周期
  stday = 0;                       // 循环周期里的第几天（从 0 开始）
  createdAt = Date.now();
  isDel = false;
  constructor(obj: any = {}) {
    Object.assign(this, obj);
  }
  setTitle(v: string) {
    this.title = v;
    return this;
  }
}

export class ToDoItem {
  id = uuidv4();
  title = '';
  tpUserId = '';
  status = TaskStatus.pending;
  
  parentId: string | null = null;
  sortOrder = 0; 
  isAllDay = false;

  fromCircle = false; // 来自循环任务的创建
  deadline = 0; // 时间戳格式, 0 表示未设置时间
  createdAt = Date.now();
  indent = 0; // 缩进，用于表示子任务，兼容旧逻辑，后续可移除
  children: ToDoItem[] = [];
  isDel = false;
  menu = IMenuValue.Today; // 待移除：视图状态不应持久化
  deadlinePickerValue = ''; // 待移除：纯UI状态

  constructor(obj?: Partial<ToDoItem>) {
    if (obj) {
      Object.assign(this, obj);
      // 兼容逻辑：如果后端返回了 children，递归实例化
      if (obj.children && Array.isArray(obj.children)) {
        this.children = obj.children.map(i => new ToDoItem(i));
      }
      
      // UI 状态初始化
      if (this.deadline) {
        this.deadlinePickerValue = dayjs(this.deadline).format('YYYY-MM-DD')
      }
      
      // 动态计算过期状态 (仅在前端展示时计算，不修改数据源)
      if (this.status !== TaskStatus.finished && this.deadline && this.deadline < Date.now()) {
        // 注意：这里不直接修改 this.status，避免污染数据回传给后端。
        // 实际 UI 渲染时应该判断 deadline < now
      }
    }
  }
  
  // ... existing methods ...
  setTitle(v: string) {
    this.title = v;
    return this;
  }
  
  addSubTodo() {
    const item = new ToDoItem();
    item.parentId = this.id; // 设置父ID
    this.children.push(item);
    return this;
  }

  setMenu(v: IMenuValue) {
    // ... 保持现有逻辑用于兼容 ...
    this.menu = v;
    if ([IMenuValue.Today, IMenuValue.Week, IMenuValue.Month, IMenuValue.Year].includes(v)) {
      this.autoSetDeadline();
    }
    return this;
  }
  
  // ... existing methods ...
  autoSetDeadline() {
     // ... existing logic ...
    // 设置为今天 23:59:59 的时间戳
    if (this.menu === IMenuValue.Today) {
      this.deadline = new Date().setHours(23, 59, 59)
    }
    // 设置为本周的最后一天 23:59:59 的时间戳
    else if (this.menu === IMenuValue.Week) {
      this.deadline = getCurWeekLastTime();
    }
    // 设置为本月最后一天 23:59:59 的时间戳
    else if (this.menu === IMenuValue.Month) {
      this.deadline = getCurMonthLastTime();
    }
    // 设置为本年的最后一天 23:59:59 的时间戳
    else if (this.menu === IMenuValue.Year) {
      this.deadline = getCurYearLastTime()
    }
  }

  trans2ToDoItem() {
    return new ToDoItem(this);
  }
}

export enum TaskStatus {
  pending = 1,
  unfinish = 2,
  finished = 3,
}

export enum IMenuValue {
  Total = 99,
  Today = 1,
  Week = 2,
  NearWeek = 22,
  Month = 3,
  Year = 4,
  Finished = 5,
  Unfinish = 6,
  Circle = 7,
}
export const MenuValueArr = [
  IMenuValue.Today,
  IMenuValue.Week,
  IMenuValue.Month,
  IMenuValue.Year,
  IMenuValue.Total,
  IMenuValue.Finished,
  IMenuValue.Unfinish,
  IMenuValue.Circle,
]

export enum CircleType {
  EveryDay = 1,
  EveryWeek = 2,
  EveryMonth = 3,
  EveryYear = 4,
}

export interface IMenu {
  value: IMenuValue,
  label: string,
  icon: string,
}

export enum DeadLineEnum {
  Toady,
  WorkDay,
  Weekend,
  Month,
}

const MenuTotal:IMenu = {
  value: IMenuValue.Total,
  icon: 'planing',
  label: '任务',
}

const MenuToday:IMenu = {
  value: IMenuValue.Today,
  icon: 'sun',
  label: '今天',
}
const MenuWeek:IMenu = {
  value: IMenuValue.Week,
  icon: 'week',
  label: '这周',
}
const MenuNearWeek:IMenu = {
  value: IMenuValue.Week,
  icon: 'week',
  label: '近 7 天',
}

const MenuMonth:IMenu = {
  value: IMenuValue.Month,
  icon: 'month',
  label: '本月',
}

const MenuYear:IMenu = {
  value: IMenuValue.Year,
  icon: 'year',
  label: '今年',
}

const MenuCircle: IMenu = {
  value: IMenuValue.Circle,
  icon: 'circle',
  label: '循环任务',
}
const MenuFinished:IMenu = {
  value: IMenuValue.Finished,
  icon: 'finish',
  label: '已完成',
}
const MenuUnfinish:IMenu = {
  value: IMenuValue.Unfinish,
  icon: 'fail',
  label: '未完成',
}

export const MenuMap = {
  [IMenuValue.Today]: MenuToday,
  [IMenuValue.Total]: MenuTotal,
  [IMenuValue.Week]: MenuWeek,
  [IMenuValue.NearWeek]: MenuNearWeek,
  [IMenuValue.Month]: MenuMonth,
  [IMenuValue.Year]: MenuYear,
  [IMenuValue.Circle]: MenuCircle,
  [IMenuValue.Finished]: MenuFinished,
  [IMenuValue.Unfinish]: MenuUnfinish,
}

export const MenuArr = [
  MenuToday,
  MenuWeek,
  MenuNearWeek,
  MenuMonth,
  MenuYear,
  MenuTotal,
  MenuCircle,
  MenuFinished,
  MenuUnfinish
]