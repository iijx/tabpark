import { stringArringIsEqual } from "@/lib/util";
import { throttle } from "throttle-debounce";
import { Ref, onMounted } from "vue";

interface IOpt {
  targetClass: string;
  itemClass: string;
  isDisabled: Ref<boolean>;
}

export const useDragItem = (opt: IOpt) => {

  let targetEl: HTMLElement;
  let isClickItem = false;

  let rawItem: HTMLElement | null = null;
  let cloneItem: HTMLElement | null = null;
  let mouseDownPos = { x: 0, y: 0 };
  let isDragFlag = false;

  const { appState } = useApp();

  let mousedownPinds: string[] = [];

  const onMouseDown = (e: MouseEvent) => {
    isDragFlag = false;

    if (opt.isDisabled.value) return;

    mousedownPinds = appState.pinList.value.map(i => i.id);
    // 判断点击元素，是否是 itemSelector

    let curTarget = e.target as HTMLElement;
    while (curTarget !== targetEl && curTarget.parentNode) {
      if (curTarget.classList.contains(opt.itemClass)) {
        isClickItem = true;
        rawItem = curTarget;
        break;
      }
      curTarget = curTarget.parentNode as HTMLElement;
    }

    // 计算点击位置 在curTarget中的位置
    if (isClickItem && rawItem) {
      const rect = rawItem.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseDownPos = { x, y };
    }
  }

  const onMouseMove = (() => {
    let itemsEl: NodeListOf<Element>;
    let curItemsRect: { id: string, cx: number, cy: number }[] = [];
    let curPinId = '';

    const updatePos = throttle(60, (e) => {
      if (!cloneItem) return;

      const centerPoint = {
        x: e.clientX - mouseDownPos.x + (cloneItem as HTMLElement).offsetWidth / 2,
        y: e.clientY - mouseDownPos.y + (cloneItem as HTMLElement).offsetHeight / 2
      }
      // 判断 centerPoint 在 curWebSitesRect 中, 距离最近的 item
      let minDistance = 999999;
      let minDistanceItem = { id: '', cx: 0, cy: 0 };
      curItemsRect.forEach((item) => {
        const distance = Math.abs(centerPoint.x - item.cx);
        if (distance < minDistance) {
          minDistance = distance;
          minDistanceItem = item;
        }
      });
      // console.log("minDistanceItem", minDistanceItem);
      if (!minDistanceItem.id) return;
      // 如果还是当前位置，不做处理
      if (minDistanceItem.id === curPinId) return;

      
      // 1 判断是在 左边还是右边
      const isLeft = centerPoint.x < minDistanceItem.cx;
      const curPinList = appState.pinList.value;
      const idx1 = curPinList.findIndex(i => i.id === curPinId);
      const idx2 = curPinList.findIndex(i => i.id === minDistanceItem.id);
      if (isLeft) {
        if (idx2 - idx1 === 1) return;
        else {
          const item = curPinList.splice(idx1, 1)[0];
          curPinList.splice(idx2 > idx1 ? idx2 - 1 : idx2, 0, item);
        }
      } else {
        if (idx1 - idx2 === 1) return;
        else {
          const item = curPinList.splice(idx1, 1)[0];
          curPinList.splice(idx2 > idx1 ? idx2 : idx2 + 1, 0, item);
        }
      }
    });
    return throttle(10, (e: MouseEvent) => {
      isDragFlag = true;
  
      if (!isClickItem) return;
  
      if (!cloneItem) {
        cloneItem = (rawItem as HTMLElement).cloneNode(true) as HTMLElement;
        rawItem?.classList.add('dragging');
        cloneItem.style.position = 'absolute';
        cloneItem.style.backgroundColor = 'rgba(0, 0, 0, .4)';
        cloneItem.style.zIndex = '9999';
        document.body.appendChild(cloneItem);
        
        itemsEl = document.querySelectorAll(`.v-menu .${opt.itemClass}`);
        curPinId = cloneItem.getAttribute('data-id') || '';
        curItemsRect = Array.from(itemsEl || []).map((item) => {
          const rect = item.getBoundingClientRect();
          return {
            id: item.getAttribute('data-id') as string,
            cx: rect.x + rect.width / 2,
            cy: rect.y + rect.height / 2,
          }
        })
        // console.log(">>>", e.clientY - mouseDownPos.y, e.clientY, mouseDownPos.y)
        cloneItem.style.top = `${e.clientY - mouseDownPos.y }px`;
      }
  
      // 这里 cloneItem 一定有，写 if 仅仅是为了 ts 不报错
      if (cloneItem) {
        cloneItem.style.left = `${e.clientX - mouseDownPos.x }px`;
        // cloneItem.style.top = `${e.clientY - mouseDownPos.y }px`;
        updatePos(e);
      }
    });
  })();

  const onMouseUp = () => {
    if (!isClickItem) return;

    isClickItem = false;
    rawItem && rawItem.classList.remove('dragging');
    if(cloneItem) {
      cloneItem.parentNode?.removeChild(cloneItem);
      cloneItem = null;
    }
    const newPinIds = appState.pinList.value.map(i => i.id);
    if (stringArringIsEqual(mousedownPinds, newPinIds)) return;
    else {
      // Api.userReq.update(appState.userState.id,{
      //   pinIds: appState.pinList.value.map(i => i.id)
      // })
    }
  }

  const onClick = (e: MouseEvent) => {
    if (isDragFlag) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  onMounted(() => {
    targetEl = document.getElementsByClassName(opt.targetClass)[0] as HTMLElement; 
    targetEl.addEventListener('mousedown', onMouseDown);
    targetEl.addEventListener('click', onClick);
    document.documentElement.addEventListener('mousemove', onMouseMove);
    document.documentElement.addEventListener('mouseup', onMouseUp);
  });

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp
  }

}