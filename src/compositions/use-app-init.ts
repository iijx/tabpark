import useSiteState from "./use-app/site-state";

export default function useAppInit() {
  const { appState, appAction } = useApp();
  const { init: initSite } = useSiteState();

  initSite();
  appAction.getUserAppInfo();
}