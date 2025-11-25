<template>
  <div class="nav-park-container" @contextmenu.stop="handleOpenCollection">
    <AsideVue />
    <main class="main-container">
      <section class="content">
        <ContentVue />
      </section>
    </main>

    <!-- 回到主页 -->
    <!-- <section class="footer">
      <div class="back-index">回到主页</div>
    </section> -->

    <!-- <div class="bb"></div> -->
  </div>
</template>

<script setup lang="ts">
import AsideVue from './aside.vue';
import ContentVue from './content.vue';
const { appState } = useApp();


// 右键打开 collection 页面
const handleOpenCollection = (e: MouseEvent) => {
  appState.isShowPinPage.value = false;
  e.preventDefault();
  return false;
}
</script>

<style lang="less" scoped>
@adHeight: 46px;
.nav-park-container {
  height: 100vh;
  width: 100vw;
  backdrop-filter: blur(20px);
	background-color: color-mix(in srgb, var(--i-primary-5) 15%, black 60%);
  position: relative;
  padding-top: @adHeight;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .bb {
    height: @adHeight;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #000;
  }
}
.main-container {
  flex: 1;
  overflow: scroll;
  position: relative;
  // background: #fff;
  
  box-sizing: border-box;
  width: 100%;
}

.content {
  margin: 0 auto;
  padding: 32px;
  padding-top: 0;
}

@media screen and (min-width: 991px) {
  .content {
    width: 990px
  }
}
@media screen and (min-width: 1191px) {
  .content {
    width: 1190px
  }
}

// .footer {
//   position: fixed;
//   bottom: 0;
//   left: 0;
//   width: 100%;
//   height: 60px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   box-shadow: 0 -2px 4px rgba(0, 0, 0, .1);
//   z-index: 1;

//   .back-index {
//     @apply shadow-md;
//     padding: 8px 16px;
//     border-radius: 32px;
//     // background-color: var(--i-primary-5);
//     background-color: color-mix(in srgb, var(--i-primary-5) 15%, black 60%);
//     color: #fff;
//     cursor: pointer;
//   }
// }
</style>