import { ComputedRef } from "vue";
import { IMenu, IMenuValue, MenuArr, MenuMap } from "../interface";

export const todoMenuList1: IMenu[] = [
  MenuMap[IMenuValue.Today],
  MenuMap[IMenuValue.Week],
  MenuMap[IMenuValue.Month],
  MenuMap[IMenuValue.Year],
]
const todoMenuList4 = [MenuMap[IMenuValue.Circle]]
const todoMenuList3: IMenu[] = [
  MenuMap[IMenuValue.Unfinish],
  MenuMap[IMenuValue.Finished],
]

const setActiveMenuValue = (v: IMenuValue) => {
  activeMenuValue.value = v;
}

const activeMenuValue = ref(IMenuValue.Total)

const activeMenu: ComputedRef<IMenu | undefined> = computed(() => {
  return MenuArr.find(i => i.value === activeMenuValue.value)
})

export const useMenu = () => {
  return {
    activeMenuValue,
    todoMenuList1,
    todoMenuList3,
    todoMenuList4,
    setActiveMenuValue,
    activeMenu
  }
}