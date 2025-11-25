<template>
  <IDialog :value="state.isShow.value" :footer="false" :header="false" @cancel="hide"  width="auto" height="50vh" >
    <main class="main">
      <!-- @customadd="handleCustomAdd" -->
      <Menu v-model:activeIndex="activeIndex" />
      <section class="content">
        <!-- 自定义搜索 -->
        <CustomInput v-show="activeIndex === 0" />
        <!-- 其他模块 -->
      </section>
    </main>
  </IDialog>
</template>

<script setup lang="ts" name="ShopPopIndex">
import Menu from './menu.vue';
import CustomInput from './custom-input.vue';
import useShopDialog from './use-shop-dialog';
const { state, hide, show } = useShopDialog();

const activeIndex = ref(1);

const emit = defineEmits(['customAdd']);
// const handleCustomAdd = () => {
//   emit('customAdd')
//   // activeIndex.value = 0;
// }

</script>


<style lang="less" scoped>
.shop-pop-container {
  position: absolute;
  bottom: 18px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .3);
  height: 38vh;
  border-radius: 10px;
  padding: 12px;
  border: 1px solid #fff;
}
.main {
  display: flex;
  height: 100%;
  .content {
    height: 100%;
    width: 50vw;
    min-width: 340px;
    max-width: 560px;
  }
  
}
</style>