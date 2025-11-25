
export const useApiCache = <T extends (...args: any[]) => Promise<any>> (api: T) => {
  const cache = new Map();
  const loading = ref(false)
  let error;

  const load = async (...args: Parameters<T>) => {
    loading.value = true
    const key = JSON.stringify(args)
    console.log("result cache", cache.get(key));
    if (cache.get(key)) return cache.get(key);
    
    try {
      const result = await api(...args)
      cache.set(key, result)
      console.log("result", result);
      return result
    } catch (e) {
      console.log("error", e);
      error = e
    } finally {
      console.log("finally");
      loading.value = false
    }
  }

  const clear = () => {
    cache.clear()
    error = undefined
  }

  return {
    cache,
    loading,
    error,
    load,
    clear,
  }
}