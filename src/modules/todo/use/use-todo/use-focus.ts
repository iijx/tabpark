import { ref } from 'vue';

const focusedItemId = ref<string>('');

export const useFocus = () => {
  const setFocus = (id: string) => {
    focusedItemId.value = id;
  };

  return {
    focusedItemId,
    setFocus
  };
};


