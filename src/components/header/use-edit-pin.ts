import { DialogType, Pin } from "@/interface"

const useEditPin = () => {
  const { appState, appAction } = useApp();

  const editState = reactive({
    isEditing: false,
    type: DialogType.ADD,
    input: '',
    title: '',
  })

  const popInfo = reactive({
    show: false,
    pinIndex: 0,
    style: {
      left: '0px',
      top: '0px',
    }
  })

  const handleEditPin = () => {
    popInfo.show = false;

    // 如果未登陆，弹出登陆框
		if (!appState.isLogin.value) {
			appAction.setIsShowLoginDialog(true);
			return;
		}

		editState.isEditing = true;

    const curPin = appState.pinList.value[popInfo.pinIndex];
    editState.input = curPin.name.trim() || '';
    editState.type = DialogType.EDIT;
    editState.title = '更新名称';
    
		setTimeout(() => {
			const el = document.querySelector('.v-menu .item.active input') as HTMLInputElement;
			el?.focus();
		}, 0)
  }

	// 删除 pin
	const handleDeletePin = () => {
		// 如果未登陆，弹出登陆框
		if (!appState.isLogin.value) {
			appAction.setIsShowLoginDialog(true);
			return;
		}

		popInfo.show = false;
		const curPin = appState.pinList.value[popInfo.pinIndex];
		
		appAction.showInfoDialog({
			title: '确认删除',
			content: `您确定要删除「${curPin.name}」该收藏夹吗？`,
			type: 'warning'
		}).then(() => {
			console.log("confirm delete");
			Api.pinReq.deletePin(curPin.id).then(() => {
				appAction.removePin(curPin.id);
				// 如果当前 pin 是选中状态，那么切换到第一个 pin
				if (appState.curPinId.value === curPin.id) {
					appAction.setCurPinId(appState.pinList.value[0].id);
				}

			});
		})
		.catch(() => { // 取消删除
			console.log("cancel delete");
		})
	}

  // 新增 pin
	const handleAddPinBtn = () => {
		// 如果未登陆，弹出登陆框
		if (!appState.isLogin.value) {
			appAction.setIsShowLoginDialog(true);
			return;
		}
		// 如果显示了编辑 pop，那么先隐藏 pop
		// if (state.popInfo.show) state.popInfo.show = false;

    editState.input = '';
    editState.type = DialogType.ADD;
    editState.title = '新增分类';
		editState.isEditing = true;
		setTimeout(() => {
			document.getElementById('AddPinInputId')?.focus();
		}, 0)
	}

  // 编辑
	const handlePinRightClick = (e: MouseEvent, index: number) => {
		console.log("e", e);
		// 如果当前不是收藏夹页面，不显示右键菜单
		if (!appState.isShowPinPage.value) return;

		// handlePinClick(state.list.value[index].id || '');
		let target = e.target as HTMLElement;
		// 从 target 开始，往上查找，直至找到 class 为 item 的元素
		while (target && !target.classList.contains('pin-item')) {
			target = target.parentElement as HTMLElement;
		}
		popInfo.show = true;
		popInfo.style.left = `${target.offsetLeft + e.offsetX + 20}px`;
		popInfo.style.top = `${target.offsetTop + e.offsetY + 16}px`;
		popInfo.pinIndex = index;
		return false;
	}

  const handlePopupClickout = (e: MouseEvent) => {
    if (popInfo.show) {
      popInfo.show = false;
      e.stopPropagation();
    }
  }

	const handleEditConfirm = () => {
		const name = editState.input.trim();

		// 1. 空值检测
		if (!name) return appAction.message.error('名称不能为空');
		
		// 2. 更改
		if (editState.type === DialogType.EDIT) {
			const curPin = appState.pinList.value[popInfo.pinIndex];
			// 2.1 没有更改，关闭弹窗，无需处理
			if (name.trim() === curPin.name.trim()) return editState.isEditing = false;

      Api.pinReq.updatePin({ id: curPin.id, name }).then(() => {
        curPin.name = name;
      })
		} 
		// 3. 新增
		else {
			Api.pinReq.createPin({ name }).then((res: any) => {
        console.log("[http] createPin res", res);
				appAction.addPin(new Pin(res));
				appAction.setCurPinId(res.id);
			})
		}
		editState.isEditing = false
	}

  return {
    editState,
    popInfo,
    handleEditPin,
    handleDeletePin,
    handleAddPinBtn,
    handlePinRightClick,
    handlePopupClickout,
    handleEditConfirm
  }
}

export default useEditPin;