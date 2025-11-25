import { createApp } from 'vue'
import '../../assets/style/common.css';
import '../../assets/style/public.less';
import '../../assets/style/themes/index.less';
import PopupVue from './popup.vue';
import "@csstools/normalize.css";
import '@arco-design/web-vue/dist/arco.css';

import IInput from '@/components/input/index.vue';
import IFormItem from '@/components/form/form-item.vue';
import IButton from '@/components/button/index.vue';
const app = createApp(PopupVue);

app.component('IInput', IInput);
app.component('IFormItem', IFormItem);
app.component('IButton', IButton);

app.mount('#app');
