import { NavRootTree } from "@/interface";

// 遍历枚举 MenuEnum，生成 menus
// const menus = ref(Object.values(NavRootEnum).map((key) => {
//   console.log("key", key);
//   return {
//     key,
//     label: NavRootLabel[key],
//     // icon: NavRootLabel[key],
//   }
// }));

const activeIndex = ref(0);
const curMenu = computed(() => NavRootTree[activeIndex.value]);

const useMenu = () => {
  return {
    activeIndex,
    curMenu
  };
}

export default useMenu;