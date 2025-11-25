import { stringArringIsEqual } from "@/lib/util";
import { throttle } from "throttle-debounce";
import { onMounted } from "vue";

interface IOpt {
  targetClass: string;
  itemClass: string;
}

export const useDragItem = (opt: IOpt) => {

  let targetEl: HTMLElement;
  let isClickItem = false;

  let rawItem: HTMLElement | null = null;
  let cloneItem: HTMLElement | null = null;
  let mouseDownPos = { x: 0, y: 0 };
  let isDragFlag = false;

  const { appState } = useApp();

  let mousedownWebIds: string[] = [];
  const onMouseDown = (e: MouseEvent) => {
    isDragFlag = false;
    const markIds = appState.pinList.value.find(i => i.id === appState.curPinId.value)?.markIds || [];
    const marks = appState.markList.value.filter(i => markIds.includes(i.id));
    const webSiteIds = marks.map(i => i.webSiteId);
    mousedownWebIds = appState.webSiteList.value.filter(i => webSiteIds?.includes(i.id)).map(i => i.id);
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
    let pageEl: HTMLElement;
    let curWebItemsEl: NodeListOf<Element>;
    let curWebItemsRect: { id: string, cx: number, cy: number }[] = [];
    let curWebItemId = '';

    const updatePos = throttle(60, (e) => {
      if (!cloneItem) return;
      const centerPoint = {
        x: e.clientX - mouseDownPos.x + (cloneItem as HTMLElement).offsetWidth / 2,
        y: e.clientY - mouseDownPos.y + (cloneItem as HTMLElement).offsetHeight / 2
      }
      // 判断 centerPoint 在 curWebItemsRect 中, 距离最近的 item
      let minDistance = 999999;
      let minDistanceItem = { id: '', cx: 0, cy: 0 };
      curWebItemsRect.forEach((item) => {
        const distance = Math.abs(centerPoint.x - item.cx) + Math.abs(centerPoint.y - item.cy);
        if (distance < minDistance) {
          minDistance = distance;
          minDistanceItem = item;
        }
      });
      // console.log("minDistanceItem", minDistanceItem);
      if (!minDistanceItem.id) return;
      // 如果还是当前位置，不做处理
      if (minDistanceItem.id === curWebItemId) return;

      // 如果不是当前位置，分不同情况处理
      // 1. 如果 y 值比最大的y 还要大，则认为是末尾插入
      // const curPinWebIds = appState.pinIdMapItemIds.value[appState.curPinId.value];
      const markIds = appState.pinList.value.find(i => i.id === appState.curPinId.value)?.markIds || [];
      const marks = appState.markList.value.filter(i => markIds.includes(i.id));
      const curPinWebIds = marks.map(i => i.webSiteId);
      if (centerPoint.y > (curWebItemsRect[curWebItemsRect.length - 1].cy + 64)) {
        console.log("末尾插入");
        // 把 appState.pinIdMapItemIds 数组里值为 curWebItemId，移动到数组末尾
        for (let i = 0; i < curPinWebIds.length; i++) {
          if (curPinWebIds[i] === curWebItemId) {
            let removed = curPinWebIds.splice(i, 1); // 从当前位置处删除此处的元素，并返回被删除的元素
            curPinWebIds.push(removed[0]); // 将被删除的元素添加到数组末尾

            // 更新格子位置 和 id 的关系
            break;
          }
        }
      }
      // 2. 如果 y 值比最小的y 还要小，则认为是首位插入
      else if (centerPoint.y < (curWebItemsRect[0].cy - 70)) {
        if (centerPoint.x < curWebItemsRect[0].cx) {
          console.log("首位插入");
          // 把 appState.pinIdMapItemIds 数组里值为 curWebItemId，移动到数组首位
          for (let i = 0; i < curPinWebIds.length; i++) {
            if (curPinWebIds[i] === curWebItemId) {
              let removed = curPinWebIds.splice(i, 1); // 从当前位置处删除此处的元素，并返回被删除的元素
              curPinWebIds.unshift(removed[0]); // 将被删除的元素添加到数组首位
              break;
            }
          }
        }
        // 这种情况不考虑
        else ;
      }
      // 3. 现在只考虑 y 值在中间的情况了
      else {
        // 3.1 判断是在 左边还是右边
        const isLeft = centerPoint.x < minDistanceItem.cx;
        const idx1 = curPinWebIds.indexOf(curWebItemId);
        const idx2 = curPinWebIds.indexOf(minDistanceItem.id);
        if (isLeft) {
          if (idx2 - idx1 === 1) return;
          else {
            curPinWebIds.splice(idx1, 1);
            curPinWebIds.splice(idx2 > idx1 ? idx2 - 1 : idx2, 0, curWebItemId);
          }
        } else {
          if (idx1 - idx2 === 1) return;
          else {
            curPinWebIds.splice(idx1, 1);
            curPinWebIds.splice(idx2 > idx1 ? idx2 : idx2 + 1, 0, curWebItemId);
          }
        }
      }
    });
    return (e: MouseEvent) => {
      isDragFlag = true;
  
      if (!isClickItem) return;
  
      if (!cloneItem) {
        cloneItem = (rawItem as HTMLElement).cloneNode(true) as HTMLElement;
        rawItem?.classList.add('dragging');
        cloneItem.style.position = 'absolute';
        // cloneItem.style.top = rawItem.offsetTop + 'px';
        // cloneItem.style.left = rawItem.offsetLeft + 'px';
        cloneItem.style.zIndex = '9999';
        document.body.appendChild(cloneItem);
        
        pageEl = document.querySelector(`#pinpage-${appState.curPinId.value}`) as HTMLElement;
        curWebItemsEl = pageEl.querySelectorAll(`.${opt.itemClass}`);
        curWebItemId = cloneItem.getAttribute('data-id') || '';
        curWebItemsRect = Array.from(curWebItemsEl || []).map((item) => {
          const rect = item.getBoundingClientRect();
          return {
            id: item.getAttribute('data-id') as string,
            cx: rect.x + rect.width / 2,
            cy: rect.y + rect.height / 2,
          }
        })
      }
  
      // 这里 cloneItem 一定有，写 if 仅仅是为了 ts 不报错
      if (cloneItem) {
        cloneItem.style.left = `${e.clientX - mouseDownPos.x }px`;
        cloneItem.style.top = `${e.clientY - mouseDownPos.y }px`;

        updatePos(e);
      }
    };
  })();

  const onMouseUp = () => {
    if (!isClickItem) return
    
    isClickItem = false;
    rawItem && rawItem.classList.remove('dragging');
    if(cloneItem) {
      cloneItem.parentNode?.removeChild(cloneItem);
      cloneItem = null;
    }

    // const newWebIds = appState.pinIdMapItemIds.value[appState.curPinId.value];
    // if (!stringArringIsEqual(mousedownWebIds, newWebIds) ) {
    //   Api.pinReq.update(appState.curPinId.value, {
    //     list: newWebIds
    //   })
    // }
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