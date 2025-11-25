<template>
  <div class="main-menu-container active">
    <main class="menu-list">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </main>

    <div class="pull-tab">

    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="less">
.main-menu-container {
  height: 100vh;
  border-right: 1px solid #ECECEC;
  transition: left 0.15s ease-in-out;
  z-index: 100;
  display: flex;
  align-items: center;
  
  &.active {
    left: 0;
  }
  .pull-tab {
    position: absolute;
    right: -31px;
    top: 50%;
    width: 31px;
    height: 127px;
    line-height: 127px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIxMzEiIHZpZXdCb3g9IjAgMCAzMiAxMzEiPgogICAgPHBhdGggZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiNFNEU0RTQiIGQ9Ik0yMy43NzUgMTYuMzQxTC0uNSAxLjA5NnYxMjguODA4bDI0LjI3NS0xNS4yNDVjNC44MDctMy4wMiA3LjcyNS04LjI5NyA3LjcyNS0xMy45NzNWMzAuMzE0YzAtNS42NzYtMi45MTgtMTAuOTU0LTcuNzI1LTEzLjk3M3oiLz4KPC9zdmc+Cg==);
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: contain;
    margin-top: -60px;
    text-align: center;
    color: #7f97a7;
    cursor: pointer;
    z-index: 1;
  }
}
.menu-list {
  max-height: 100%;
  overflow: auto;
  padding: 10px 15px;
  box-sizing: border-box;
  margin: auto;
  .item {
    background-size: contain;
    border-radius: 50%;
    display: block;
    width: 44px;
    height: 44px;
    border: 1px solid #ffffff;
    box-sizing: border-box;
    transition: all .15s ease-out;
    background-color: rebeccapurple;
    margin: 10px 0;
  }
}
</style>
