import { Ref } from "vue"

interface ITabList {
  label: string,
  name: string,
  disabled?: boolean
}

class TabState {
  list: Ref<ITabList[]> = ref([]);
  activeTabIndex: Ref<number> = ref(0);
}

const TabStateMap: {
  [key: string]: TabState
} = {}


export const useTabs = (_key?: string) => {
  const key = _key || new Date().getTime().toString();
  if (!TabStateMap[key]) {
    TabStateMap[key] = new TabState()
  }

  return {
    stateKey: key,
    state: TabStateMap[key]
  }
}