import { appAction } from "./app-action";
import { appState } from "./app-state";

export const useApp = (() => {
  (window as any)['appState'] = appState;
  (window as any)['appAction'] = appAction;
  return () => ({
    appState,
    appAction
  })
})();

watch(() => appState.userState, () => {
  localStorage.setItem('user', JSON.stringify(appState.userState));
}, { deep: true });


export default useApp;