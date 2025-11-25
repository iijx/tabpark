const state = {
  isShow: ref(false),
}

const hide = () => {
  state.isShow.value = false;
}

const show = () => {
  state.isShow.value = true;
}

export const useShopDialog = () => {
  return {
    state,
    hide,
    show,
  }
}

export default useShopDialog;