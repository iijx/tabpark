import { createApp } from 'vue'
import '@arco-design/web-vue/dist/arco.css';
import "@csstools/normalize.css";
import './assets/style/common.css';
import './assets/style/public.less';
import './assets/style/themes/index.less';
import App from './App.vue'
import router from './router'

import './interface/index'
import { vOnClickOutside } from '@vueuse/components'

import IButton from '@/components/button/index.vue';
import IInput from '@/components/input/index.vue';
import IFormItem from '@/components/form/form-item.vue';
import IDialog from '@/components/dialog/index.vue';
import ISwitch from '@/components/switch/index.vue';
import ITabs from '@/components/tabs/index.vue';
import IDrawer from '@/components/common/drawer.vue';
import ISingleUpload from '@/components/common/upload/single-upload.vue';
import { http, ApiIsNeedLogin } from './api/index';

const app = createApp(App);

app.component('IButton', IButton);
app.component('IInput', IInput);
app.component('IFormItem', IFormItem);
app.component('IDialog', IDialog);
app.component('ISwitch', ISwitch);
app.component('ITabs', ITabs);
app.component('IDrawer', IDrawer);
app.component('ISingleUpload', ISingleUpload);

app.directive('clickout', vOnClickOutside);
app.use(router);

const { appAction } = useApp();

http.instance.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token');
  console.log(config);
  if (!token && ApiIsNeedLogin(config.url)) {
      appAction.setIsShowLoginDialog(true);
      return Promise.reject('no token: ');
  }
  return config;
})

http.instance.interceptors.response.use((res: any) => {
  if (res.success) return res.data;
  else {
    if (res.code === -1) {
      appAction.message.error('请先登录后再操作')
    }
    return Promise.reject(res)
  }
})
app.mount('#app');

