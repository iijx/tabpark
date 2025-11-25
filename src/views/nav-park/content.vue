<template>
  <div class="content-container">
    <!-- <div class="page-title">{{ curMenu.title }}导航</div> -->
    
    <main class="menu-content">
      <!-- <section class="card">
        <div class="menu-title">推荐｜ 最近使用</div>
      </section> -->

      <section class="card" v-for="item of curMenu.children" :key="item.key">
        <div class="menu-title">{{ item.title }}</div>
        <div class="card-content">
          <div class="item-wrap" v-for="i of navList[item.key]"  :key="item.key">
            <Item :item="i" />
          </div>
        </div>
      </section>
    </main>
    
  </div>
</template>

<script setup lang="ts">
import { WebSite } from '@/interface';
import useMenu from './compositions/use-menu';
import Item from './item.vue';

const { curMenu } = useMenu()

const navList = ref<{ [key: string]: WebSite[]}>({});
Api.navReq.findAll().then((res) => {
  const allWebItemIds = (res as any).reduce((acc: string[], cur: {list: string[]}) => [...acc, ...cur.list], []).filter(Boolean);
  // Api.serviceWebSite.findByIds(allWebItemIds).then((webitemRes:any) => {
  //   navList.value = (res as any).reduce((acc: {[key: string]: WebSite[]}, cur: {key: string, list: string[]}) => {
  //     acc[cur.key] = cur.list.filter(Boolean).map(i => (webitemRes as WebSite[]).find(o => o.id === i)).filter(Boolean) as WebSite[];
  //     return acc;
  //   }, {});
  // })
})
</script>

<style lang="less" scoped>
.content-container {
  padding-top: 40px;
  color: #fff;
  overflow: scroll;
}
.page-title {
  font-size: 32px;
  font-weight: bold;
}

.menu-content {
  .menu-title {
    font-size: 14px;
    // color: var(--i-primary-5);
    color: #fff;
  }
}

.card {
  padding: 12px;
  background: rgba(#000, .2);
  margin-bottom: 12px;
  .card-content {
    margin-top: 12px;
    display: flex;
    flex-wrap: wrap;
    .item-wrap {
      margin-right: 12px;
      margin-bottom: 12px;
    }
  }
}
</style>
