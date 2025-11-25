<template>
  <IDialog :value="appState.isShowLoginDialog.value" width="386px" title="邮箱登录" :footer="false" @cancel="handleHide">
    <IFormItem label="邮箱" class="my-8" labelWidth="44px">
      <section class="relative w-full">
        <IInput size="bigger" id="login-email-input" placeholder="邮箱" v-model="email" @input="checkEmail" tabindex="1" autofocus />
        <div class="input-extra flex w-24 justify-center items-center">
          <a-spin :loading="isRequestingCode">
            <div v-show="isShowTip" class="tip">{{ emailTipText }}</div>
            <div v-show="!isShowTip" class="code-btn cursor-pointer" @click="codeBtn">{{ isSendingCode ?  `已发送 ${sendindCodeTime}` : '发送验证码' }}</div>
          </a-spin>
        </div>
      </section>
    </IFormItem>

    <IFormItem label="验证码" class="my-2" labelWidth="44px">
      <section class="relative w-full">
        <IInput size="bigger" placeholder="验证码" v-model="verificationCode" tabindex="2" />
      </section>
    </IFormItem>

    <section class="mt-8">
      <IButton type="primary" block @click="loginBtn" tabindex="3">注册/登录</IButton>
    </section>
  </IDialog>
</template>

<script lang="ts" setup>
import { Api } from '@/api'
const { appState, appAction } = useApp();

const email = ref('');
const isShowTip = ref(false);
const emailTipText = ref('');
const verificationCode = ref('');
const isSendingCode = ref(false);
const isRequestingCode = ref(false);
const sendindCodeTime = ref(0)

// 邮箱格式正则验证
const checkEmail = (() => {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  return () => {
    if (!email.value) emailTipText.value = '请输入邮箱';
    else if (!reg.test(email.value)) emailTipText.value = '邮箱格式有误';
    else emailTipText.value = '';

    isShowTip.value = Boolean(emailTipText.value);
    return !isShowTip.value;
  }
})();

const codeBtn = () => {
  if (isRequestingCode.value) return console.log('[codeBtn] 正在请求发送，请勿重复操作');
  if (isSendingCode.value) return console.log('[codeBtn] 请求成功，正发送中，请等待60s倒计时结束');
  // 邮箱格式正则验证
  if (!checkEmail()) return console.log('[codeBtn] 邮箱验证没有通过');
  // TODO: 发送验证码到邮箱
  isRequestingCode.value = true;
  Api.getLoginCodeByEmail(email.value).then(() => {
    appAction.message.success('发送成功');
    startCountDownTime();
  }).finally(() => {
    isRequestingCode.value = false;
  })
}

const startCountDownTime = () => {
  console.log('startCountDownTime', isSendingCode.value)
  if (isSendingCode.value) {
    if (sendindCodeTime.value <= 0) {
      isSendingCode.value = false;
      return;
    }
    else {
      sendindCodeTime.value--;
      setTimeout(() => {
        startCountDownTime();
      }, 1000);
    }
  } else {
    isSendingCode.value = true;
    sendindCodeTime.value = 60;
    startCountDownTime();
  }
}

const loginBtn = () => {
  // 检查邮箱：邮箱格式正则验证
  if (!checkEmail()) return appAction.message.error(emailTipText.value);
  // 检查验证码
  if (!verificationCode.value) {
    appAction.message.error('请输入验证码');
    return;
  }
  Api.loginByEmailCode(email.value, verificationCode.value).then((res: any) => {
    console.log('[login] res => ', res)
    if (res.token) {
      appAction.message.success('登录成功');
      appAction.setLoginInfo(res.token, res.user)
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      appAction.message.error('登录失败');
    }
  }).catch(err => {
    appAction.message.error(err.msg);
  })
}

const handleHide = () => {
  console.log("12");
  appAction.setIsShowLoginDialog(false);
}

</script>

<style lang="less" scoped>
.input-extra {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 8px;
  .tip {
    color: var(--i-warning-6);
  }
  .code-btn {
    color: var(--i-primary-8);
  }
}
</style>