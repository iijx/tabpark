import { WebSite } from "@/interface";

const LocalSiteKey = 'sites';

const localSites = JSON.parse(localStorage.getItem(LocalSiteKey) || "[]");

const webSites = ref<WebSite[]>(localSites);

const setSites = (_sites: WebSite[]) => {
  webSites.value = _sites;
  localStorage.setItem(LocalSiteKey, JSON.stringify(_sites));
}

const init = () => {
  // Api.serviceWebSite.findAll().then(res => {
  //   console.log('[site] res', res);
  // });
}

export const useSiteState = () => {

  return {
    webSites,
    setSites,
    init,
  }
}

export default useSiteState;
