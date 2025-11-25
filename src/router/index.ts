import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/app-index.vue';
import NavPark from '@/views/nav-park/index.vue';
import Sentences from '@/views/sentences/index.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/nav-park',
    name: 'NavPark',
    component: NavPark,
    meta: { transition: 'slide-left' },
  },
  {
    path: '/sentences',
    name: 'Sentences',
    component: Sentences,
    meta: { transition: 'slide-right' },
  },
];


// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

// 导航守卫：防止直接刷新进入 nav-park
router.beforeEach((to, from, next) => {
  // 如果目标路由是 NavPark，且没有来源路由（即直接刷新或输入URL访问）
  if (to.name === 'NavPark' && !from.name) {
    // 重定向到首页
    next({ name: 'Home' });
  } else {
    // 正常导航
    next();
  }
});

export default router;
