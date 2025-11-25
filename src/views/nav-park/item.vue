<template>
  <section ref="refItem" :data-id="item.id" class="web-item-container shadow-lg" @click.stop="() => webClick(item)">
      <!-- draggable="true" @dragstart="dragstart" @dragend="dragend" @drag="drag" -->
      <div class="img-wrap">
          <img :src="icon" alt="" :style="{backgroundColor: item?.iconBgColor || 'transparent'}" draggable="false">
      </div>
      <div class="content">
          <div v-if="item?.title" class="name">{{ title }}</div>
          <div v-else class="name">&nbsp;</div>
          <div class="url">{{ item?.url }}</div>
      </div>
  </section>
</template>

<script setup lang="ts" name="WebSite">
import { computed, PropType } from 'vue';
import { WebSite } from '@/interface';

const props = defineProps({
  item: {
      type: Object as PropType<WebSite>,
      required: true,
  },
});

const webClick = (webSite: WebSite) => window.open(webSite.url);

const title = computed(() => {
  return (/^[^|\-/｜•—]+/.exec(props.item.title) || [])[0] || props.item.title || '';
});

const icon = computed(() => {
    if (props.item.iconSrc) {
        return props.item.iconSrc.indexOf('http') === 0 ? props.item.iconSrc : `https://cdn.pastecuts.cn/web-icons//${props.item.iconSrc}`
    } else {
        return `${props.item.url}/favicon.ico`;
    }
});

const refItem = ref<HTMLElement | null>(null);
let cloneItem: HTMLElement;
const dragstart = (e: DragEvent) => {
  const rawItem = refItem.value as HTMLElement;
  cloneItem = rawItem.cloneNode(true) as HTMLElement;
  e.dataTransfer?.setData('text/plain', JSON.stringify(props.item));
  (refItem.value as HTMLElement).classList.add('dragging');
  // cloneItem.classList.add
  cloneItem.style.position = 'absolute';
  cloneItem.style.top = rawItem.offsetTop + 'px';
  cloneItem.style.left = rawItem.offsetLeft + 'px';
  cloneItem.style.zIndex = '9999';
  document.body.appendChild(cloneItem);
};
const dragend = (e: DragEvent) => {
  cloneItem.parentNode?.removeChild(cloneItem);
  (refItem.value as HTMLElement).classList.remove('dragging');
};

const drag = (e: MouseEvent) => {
  if (e.clientX <= 0 || e.clientY <= 0) {
      cloneItem.style.left = '-999px';
      cloneItem.style.top = '-999px';
  } else {
      cloneItem.style.left = e.clientX + 'px';
      cloneItem.style.top = e.clientY + 'px';
  }
}
</script>

<style lang="less" scoped>

@item-width: 220px;
@item-height: 62px;
@item-gap-w: 32px;
@item-gap-h: 28px;
.web-item-container {
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 1.6;
  cursor: pointer;
  border-radius: 10px;
  width: @item-width;
  height: @item-height;
  padding: 0 12px;
  background-color: rgba(#999, .4);
  &.dragging {
      opacity: 0;
  }
  &.add-item {
      > .img-wrap {
          background-color: rgba(#000, .4);
      }
  }
  // &:hover {
  //     background-color: rgba(#000, .4);
  // }
  .img-wrap {
      width: 40px;
      height: 40px;
      margin-right: 12px;
      flex-shrink: 0;
      // overflow: hidden;
      // background: #fff;
      // background: rgba(0, 0, 0, .2);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;

      // @media not all and (hover: none) {
          animation: 2s ease 0s infinite normal none running blinking;
      // }

      transition-property: box-shadow, transform, border-radius, filter;
      /* transition-duration: 0.2s; */
      transition-timing-function: ease;
      // box-shadow: none;
      &:hover {
              filter: drop-shadow(0 0 2em #646cffaa)
          }
      img {
          display: block;
          width: 100%;
          height: 100%;
          
      }
      .icon {
          width: 24px;
          height: 24px;
          color: rgba(#fff, .6);
      }
  }
  .content {
      display: flex;
      flex-direction: column;
      color: #ededed;
      flex: 1;
      overflow: hidden;
      .name {
          font-size: 14px;
          font-weight: bold;
      }
      .url {
          font-size: 12px;
          color: #dedede;
          // 不换行，超出显示省略号
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
      }
  }
}
</style>