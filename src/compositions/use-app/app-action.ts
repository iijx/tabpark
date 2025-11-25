import { Mark, Pin, SearchEngineEnum, User, WebSite } from "@/interface";
import { appState } from "./app-state";
import { Message } from '@arco-design/web-vue';

export const appAction = {
  /******************* 全局 APP 相关 ****************/ 
  setSettingDialog: (bool: boolean) => {
    appState.isShowSettingDialog.value = bool;
  },

  /******************* 用户与登录相关 ****************/ 
  // 登陆检查
  loginCheck() {
    if (!appState.isLogin.value) {
      this.setIsShowLoginDialog(true);
      return false;
    } else return true;
  },
  setLoginInfo(token: string, user: User) {
    appState.token.value = token;
    localStorage.setItem('token', token);
    appState.isLogin.value = true;
    appState.userState.init(user);
  },
  getUserAppInfo() {
    Api.getUserAppInfo().then((res: any) => {
      console.log("[http] getUserAppInfo res", res);
      // 1. user
      if (res.userInfo && res.userInfo.id) {
        appState.isLogin.value = true;
        appState.userState.init(res.userInfo);
      }

      // 2. pins: 让 res.pin 数组按照 res.userInfo.pinIds 排序
      appState.pinList.value = res.pinList || [];
      
      appState.curPinId.value = appState.pinList.value[0]?.id || '';

      appState.webSiteList.value = res.webSiteList || [];
      appState.markList.value = res.markList || [];

      console.log('appState.pinList.value', appState.pinList.value);

      // 3. pinIdMapWebSites
      // appState.pinIdMapItemIds = computed(() => {
      //   return appState.pinList.value.reduce((acc: any, cur: Pin) => {
      //     acc[cur.id] = cur.list;
      //     return acc;
      //   }, {});
      // })

      // appState.allPinWebSites = computed(() => {
      //   const pinIds = Object.keys(appState.pinIdMapItemIds.value);
      //   const arr = pinIds.reduce((acc: string[], cur: string) => {
      //     return [...acc, ...appState.pinIdMapItemIds.value[cur]]
      //   }, []);
      //   return arr.map(i => {
      //     const item = appState.webSiteIdMap[i];
      //     if (!item) console.warn('appState.allPinWebItems: 未找到 webItem, webitemId => ', i)
      //     return item;
      //   }).filter(Boolean);
      // })

      // appState.pinIdMapItems = computed(() => {
      //   return appState.pinList.value.reduce((acc: any, cur: Pin) => {
      //     acc[cur.id] = cur.list.map(i => appState.webSiteIdMap[i]).filter(Boolean);
      //     return acc;
      //   }, {});
      // })
      
      // 4. userSetting
      appState.settingState.init({
        ...res.userSetting,
        searchEngines: res.userSetting.searchEngines.length ? res.userSetting.searchEngines : [SearchEngineEnum.Baidu, SearchEngineEnum.Google, SearchEngineEnum.Bing],
        wrapperUrl: res.userSetting.wrapperUrl || appState.settingState.wrapperUrl,
      });

    }).catch(err => {
      if (err.code === -1) {
        localStorage.removeItem('token');
        appAction.setIsShowLoginDialog(true);
      }
    });
  },
  setIsShowLoginDialog(isShowLoginDialog: boolean, isShowMessage = true) {
    if (isShowLoginDialog && isShowMessage) {
      Message.warning('请先登录后，再操作吧');
    }
    appState.isShowLoginDialog.value = isShowLoginDialog;
  },

  /********************* pin 相关  **************/ 
  setCurPinId(pinId: string) {
    appState.curPinId.value = pinId;
  },
  removePin(pinId: string) {
    const idx = appState.pinList.value.findIndex(pin => pin.id === pinId);
    appState.pinList.value.splice(idx, 1);
  },
  addPin(pin: Pin) {
    appState.pinList.value.push(pin);
  },

  /********************* webSite 相关  **************/ 
  addMark(mark: Mark) {
    appState.markList.value.push(mark);
    const pin = appState.pinList.value.find(i => i.id === mark.pinId);
    pin?.markIds.push(mark.id);
  },
  addWebSite(website: WebSite) {
    appState.webSiteList.value.push(website);
  },

  /******************* 工具类函数 ****************/ 
  message: Message,
  showInfoDialog(params: {title: string, content: string, type: 'info' | 'success' | 'warning' | 'error' }) {
    appState.infoDialog.title = params.title;
    appState.infoDialog.content = params.content;
    appState.infoDialog.type = params.type;
    appState.infoDialog.show = true;
    return new Promise((resolve, reject) => {
      appState.infoDialog.promiseResolve = resolve as any;
      appState.infoDialog.promiseReject = reject as any;
    })
  },
  waitTime: (time: number) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    })
  },
  pushRouter: (params: any) => {
    appState.router.push(params);
  }
}