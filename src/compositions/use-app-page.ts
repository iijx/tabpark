import keycode from "keycode";

export const useAppPage = () => {
  const router = useRouter();
  // 键盘事件
  const handleKeyUp = (e: KeyboardEvent) => {
    const pressKeyCode = keycode(e);
    console.log('pressKeyCode', pressKeyCode);
    // 上
    if (pressKeyCode === 'up') {
      router.push({ path: '/sentences' })
    }
    // 下
    if (pressKeyCode === 'down') {
      router.push({ path: '/sentences' })
    }
  }

  onMounted(() => {
    document.addEventListener('keyup', handleKeyUp);
  })
  return {
    handleKeyUp
  }
};
