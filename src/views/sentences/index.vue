<template>
  <div class="sentences-container">
    <div class="bg"></div>
    <section class="main">
      <div class="bracket left">『</div>
      <div class="word">{{ info.hitokoto }}</div>
      <div class="bracket right">』</div>
      <div class="author">—— {{ info.from_who }}</div>
    </section>
  </div>
</template>

<script setup lang="ts">

const info = reactive({
  from_who: "",
  hitokoto: "",
})

const randomOne =  Math.floor(Math.random() * 5000);
// BaseApi.serviceSentencesReq.findBySkipLimit({ limit: 1, skip: randomOne, where: {} }).then((res: any) => {
//   console.log('sentencesReq res', res);
//   const item = res[0] as any;
//   Object.assign(info, item);
// })

</script>

<style lang="less">
.sentences-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.main {
  width: 55%;
  position: relative;
  color: #fff;
  .word {
    font-size: 2.3rem;
    text-align: center;
    line-height: 50px;
    word-break: normal;
    margin: 0;
    padding: 15px 50px;
    padding-bottom: 60px;
  }
  .bracket {
    font-size: 30px;
    position: absolute;
    &.left { left: 0; top: 0; }
    &.right { right: 0; bottom: 60px; }
  }

  .author {
    position: absolute;
    right: 0; bottom: 0;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.8);
    text-align: right;
  }
}

.bg {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  filter: brightness(0.6);
}
</style>