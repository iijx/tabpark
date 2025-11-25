import { SearchEngineEnum } from './index';

export class SearchWebSite {
  cnName: string;
  name: string;
  searchEngineEnum: SearchEngineEnum;
  icon: string = '';
  iconColor: string = '';
  url: string = '';
  isActive: boolean = false;
  keywords: string[] = [];
  constructor(opt: any) {
      this.name = opt.name || '';
      this.icon = opt.icon || '';
      this.searchEngineEnum = opt.searchEngineEnum || '';
      this.url = opt.url || '';
      this.keywords = opt.keywords || [];
      this.isActive = false;
      this.iconColor = opt.iconColor || 'transparent';
      this.cnName = opt.cnName || '';
  }
  setCnName(name: string) {
      this.cnName = name;
      return this;
  }
  active(bool = true) {
      this.isActive = bool;
      return this;
  }
  setKeyword(keyword: string[]) {
      this.keywords = keyword;
      return this;
  }
}