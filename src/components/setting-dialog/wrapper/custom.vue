<template>
  <div class="custom-container">
    <main class="main">
      <!-- <div class="mb-2">您可以上传您喜欢壁纸</div>
      <IInput placeholder="输入图片链接" class="flex1" v-mode="inputUrl">
        <template #append>
          <div class="confirm-btn" @click="handleAddInputUrl">确定</div>
        </template>
      </IInput>
      <div class="my-4">2. 或上传您喜欢壁纸</div> -->
      <ISingleUpload dir="/custom-wrapper" type="img" :beforeUpload="beforeUpload" />

      <!-- 历史纪录 -->
      <!-- <section class="mt-8">
        <div class="title">历史纪录</div>
        <div class="history-list">
          <div class="item" v-for="item in settingState.customWrapperUrls" :key="item">
            <img :src="item" />
          </div>
          <div v-if="settingState.customWrapperUrls.length <= 0" class="no-data">暂无纪录</div>
        </div>
      </section> -->
    </main>
  </div>
</template>


<script name="CustomWrapper" setup lang="ts">

const { appState, appAction } = useApp();
const { settingState } = appState;

// const handleInputChange = (e) => {
//   console.log('e', e.target.files);
//   upload(e.target.files[0]);
// }

const inputUrl = ref('');
const handleAddInputUrl = () => {
  if (!inputUrl.value) return appAction.message.error('请输入图片链接');
  // 检查 url 的有效性

  // addCustomWrapperUrl()
}


const beforeUpload = () => {
  // 判断是否登录
  return appAction.loginCheck();
}

</script>

<style lang="less" scoped>
.custom-container {
  display: flex;
  height: 100%;
  flex-direction: column;

  .title {
    font-weight: bold;
    margin-top: 18px;
    margin-bottom: 12px;
    font-size: 14px;
  }
}

.main {
  flex: 1;
}
.input-row {
  display: flex;
  align-items: center;
}
.confirm-btn {
  cursor: pointer;
}

.i-footer {
  display: flex;
  justify-content: center;
  .footer-item {
    padding: 10px 10px;
    cursor: pointer;
    &.active {
      font-weight: bold;
      color: var(--i-primary);
    }
  }
}

.no-data {
  text-align: center;
  color: var(--i-fg-3);
  font-size: 14px;
}

</style>