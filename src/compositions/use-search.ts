import { Ref, computed, ref } from "vue";
import { WEB_SITES_DEFAULT } from "../config";
import keycode from "keycode";
import { useDebounceFn } from '@vueuse/core'
import { SearchEngineEnum, SearchWebSite } from "@/interface";
import axios from "axios";

export const useSearch = (refViewer: Ref<HTMLElement>, refMain: Ref<HTMLElement>) => {
  const { settingState, isPlugin } = useApp().appState;
  const state = {
    // 搜索框 相关
    searchText: ref(''),            // 搜索框的文本

    // 搜索引擎 相关
    avaibleEngines: ref<SearchWebSite[]>([]), // 可用的搜索引擎,来自于设置
    curSearchEngineIndex: ref(0),   // 当前搜索引擎的索引
    isShowSearchSwitch: ref(false), // 是否显示搜索引擎切换悬浮框

    // 搜索建议 相关
    isShowSuggestion: ref(false),   // 是否显示搜索建议
    suggestions: ref<string[]>([]), // 搜索建议列表
    curSuggestionIndex: ref(-1),    // 当前选中的搜索建议索引
  }

  

  // 设置当前搜索引擎
  const setCurrentSearchEngineIndex = (index: number) => {
    state.curSearchEngineIndex.value = index;
    localStorage.setItem('currentSearchEngine', curSearchWeb.value.searchEngineEnum);
  }
  state.avaibleEngines.value = settingState.searchEngines.map((key: SearchEngineEnum) => WEB_SITES_DEFAULT.find(i => i.searchEngineEnum === key)).filter(Boolean) as SearchWebSite[];
  if (localStorage.getItem('currentSearchEngine')) {
    state.curSearchEngineIndex.value = state.avaibleEngines.value.findIndex(i => i.searchEngineEnum === localStorage.getItem('currentSearchEngine'));
  }
  // 当前搜索引擎
  const curSearchWeb = computed(() => state.avaibleEngines.value[state.curSearchEngineIndex.value]);


  watch(() => settingState.searchEngines, () => {
    // 先记录下当前使用的引擎
    const oldEngine = state.avaibleEngines.value[state.curSearchEngineIndex.value];
    // 根据当前设置，初始化引擎列表
    state.avaibleEngines.value = settingState.searchEngines.map((key: SearchEngineEnum) => WEB_SITES_DEFAULT.find(i => i.searchEngineEnum === key)).filter(Boolean) as SearchWebSite[];
    if (oldEngine) {
      const newIndex = state.avaibleEngines.value.findIndex(i => i.searchEngineEnum === oldEngine.searchEngineEnum);
      state.curSearchEngineIndex.value = newIndex === -1 ? 0 : newIndex;
    } else {
      state.curSearchEngineIndex.value = 0;
    }
  });

  const search = () => {
    window.open(`${curSearchWeb.value.url}${encodeURIComponent(state.searchText.value)}`);
  }

  onMounted(() => {
    refMain.value.addEventListener('keydown', function (e) {
      const pressKeyCode = keycode(e);
      if (pressKeyCode === 'tab') {
        // 1. 先判断
        const newIndex = state.curSearchEngineIndex.value < (settingState.searchEngines.length - 1) ? state.curSearchEngineIndex.value + 1 : 0;
        setCurrentSearchEngineIndex(newIndex);
        refViewer.value?.focus();
        e.preventDefault();
      }
    })
  })

  window['baidu'] = {
    sug: (data: any) => {
      state.suggestions.value = (data.g || []).map((i: any) => i.q);
      if (state.suggestions.value.length) state.isShowSuggestion.value = true;
      else state.isShowSuggestion.value = false;
      console.log("state.suggestions.value", state.isShowSuggestion.value);
    },
  }

  const loadSuggestions = useDebounceFn(() => {
    if (isPlugin) {
      axios.get(`https://www.baidu.com/sugrec?&prod=pc&wd=${encodeURIComponent(state.searchText.value)}`).then(res => {
        if (res.data) window.baidu.sug(res.data);
      })
    } else {
      // const script = document.createElement('script');
      // script.src = `https://www.baidu.com/sugrec?prod=pc&wd=${encodeURIComponent(state.searchText.value)}&cb=window.baidu.sug`;
      // document.body.appendChild(script);

      const script = document.createElement('script');
      script.src = `https://sg1.api.bing.com/qsonhs.aspx?type=cb&q=${encodeURIComponent(state.searchText.value)}&cb=window.bing.sug`;
      document.body.appendChild(script);
    }

  }, 60);

  watch(state.isShowSuggestion, () => {
    state.curSuggestionIndex.value = -1;
  })

  const handleEvent = (eventKey: string, params: any) => {
    if (eventKey === 'input') {
      if (state.searchText.value) {
        loadSuggestions();
      } else {
        state.isShowSuggestion.value = false;
        state.suggestions.value = [];
      }
    }
    if (eventKey === 'focusout') {
      setTimeout(() => {
        state.isShowSuggestion.value = false;
      }, 100);
    }
    if (eventKey === 'focusin') {
      if (state.suggestions.value.length) state.isShowSuggestion.value = true;
    }
    if (eventKey === 'suggest') {
      console.log("params", params);
      state.searchText.value = state.suggestions.value[params];
      search();
    }
    if (eventKey === 'switchSearchEngine') {
      state.isShowSearchSwitch.value = false;
      setCurrentSearchEngineIndex(params)
    }
  }

  // 键盘事件
  const handleKeyUp = (e: KeyboardEvent) => {
    const pressKeyCode = keycode(e);
    if (pressKeyCode === 'enter') {
      search();
    }
    // 上
    if (pressKeyCode === 'up') {
      if (state.curSuggestionIndex.value > 0) {
        state.curSuggestionIndex.value -= 1;
        state.searchText.value = state.suggestions.value[state.curSuggestionIndex.value];
      }
    }
    // 下
    if (pressKeyCode === 'down') {
      const maxIndex = state.suggestions.value.length - 1;
      if (state.curSuggestionIndex.value < maxIndex) {
        state.curSuggestionIndex.value += 1;
        state.searchText.value = state.suggestions.value[state.curSuggestionIndex.value];
      }
    }
  }

  return { state, curSearchWeb, handleEvent, handleKeyUp };
}