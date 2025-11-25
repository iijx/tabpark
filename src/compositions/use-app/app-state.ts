import { Pin, User, WebSite, UserSetting, Mark } from '@/interface';
import { themeColor } from './theme-color-state';
import router from '../../router/index';

const pinEditState = {
  isAdding: ref(false),
  isEditing: ref(false),
  addInput: ref(''),
  editInput: ref(''),
  popInfo: reactive({ show: false, top: '', left: '', pinIndex: -1 }),
}

const settingState = reactive(new UserSetting({
  wrapperUrl: localStorage.getItem('wrapperUrl') || '',
}));

const userState = reactive(new User(JSON.parse(localStorage.getItem('user') || '{}')));

export const appState = {
  isPlugin: window['chrome'] && chrome.runtime && chrome.runtime.getURL('').startsWith('chrome-extension:'), // 是否是插件模式

  // 全局基本信息
  isShowSettingDialog: ref(false), // 是否显示设置弹窗
  isShowLoginDialog: ref(false), // 是否显示登录弹窗
  isShowPinPage: ref(false), // 是否显示 Pin 页面
  token: ref(localStorage.getItem('token') || null),
  isLogin: ref(false), // 是否登录，判断标准是 token 是否有效
  router,

  // user 相关
  userState,
  webSiteIdMap: reactive({} as { [key: string]: WebSite }),
  
  // pin 相关
  pinList: ref([] as Pin[]),
  curPinId: ref(''),
  pinEditState,

  // mark 相关
  markList: ref([] as Mark[]),

  // 当前用户全部 site
  webSiteList: ref([] as WebSite[]),

  // 设置相关
  settingState,

  // 全局提示
  infoDialog: reactive({
    show: false,
    title: '',
    content: '',
    type: 'info',
    promiseResolve: () => {},
    promiseReject: () => {},
  }),

  // themeColor
  themeColor,
}