export * from './interface';
export * from './models';

export class User {
  id = '';
  openid = '';
  nickname = '';
  avatar = '';
  email = '';
  code = '';
  inited = false;

  constructor(opt: any = {}) {
    this.id = opt.id || '';
      this.init(opt);
  }
  init(opt: any) {
    this.id = opt.id || '';
      this.openid = opt.openid || '';
      this.avatar = opt.avatar || '';
      this.nickname  = opt.nickname || '';
      this.email = opt.email || '';
  
      this.code = opt.code || '';
      this.inited = opt.inited || false;
  }
}

export class UserSetting {
  id = '';
  pinIds: string[] = [];
  uid: string = '';
  wrapperUrl: string = ''; // 壁纸url
  themeColor: string = ''; // 主题色
  darkMode: boolean = false; // 暗黑模式
  darkModeAuto: boolean = false; // 暗黑模式自动切换
  searchEngines: SearchEngineEnum[] = []; // 搜索引擎
  customWrapperUrls: string[] = []; // 自定义url
  constructor(opt: any = {}) {
    this.id = opt.id || '';
      this.init(opt);
  }
  init(opt: any) {
    this.id = opt.id || '';
    this.pinIds = opt.pinIds || [];
    this.uid = opt.uid || '';
      this.wrapperUrl = opt.wrapperUrl || '';
      this.themeColor = opt.themeColor || 'sky';
      this.darkMode = opt.darkMode || false;
      this.darkModeAuto = opt.darkModeAuto || false;
      this.searchEngines = opt.searchEngines || [
          SearchEngineEnum.Baidu,
          SearchEngineEnum.Bing,
          SearchEngineEnum.Google,
      ];
      this.customWrapperUrls = opt.customWrapperUrls || [];
  }
  toWebSite() {
      
  }
}

export class Mark {
  id = '';
  userId = '';
  pinId = '';
  webSiteId = '';
  memoTitle = '';
  memoUrl = ''
  constructor(opt: any = {}) {
    this.id = opt.id || '';
    this.userId = opt.userId || '';
    this.pinId = opt.pinId || '';
    this.webSiteId = opt.webSiteId || '';
    this.memoTitle = opt.memoTitle || '';
    this.memoUrl = opt.memoUrl || '';
  }
  init(opt: any) {
    this.id = opt.id || '';
    this.userId = opt.userId || '';
    this.pinId = opt.pinId || '';
    this.webSiteId = opt.webSiteId || '';
    this.memoTitle = opt.memoTitle || '';
    this.memoUrl = opt.memoUrl || '';
    return this;
  }
}


// 默认用户的 id
// 1. 前端未登录时，使用该 id
// 2. 控制台未登录时，使用该 id
export const DefaultUid = '2cc84e266406def90349c29e734e10b1';

// 导航目录 
export enum NavRootEnum {
  AI = 'A',
  Program = 'B', 
  Design = 'C',
  Movie = 'D',
  Music = 'E',
  Reading = 'F',
  Study = 'G',
  Other = 'Z',
}

export const NavRootLabel: {[key: string]: string} = {
  [NavRootEnum.AI]: 'AI',
  [NavRootEnum.Program]: '编程',
  [NavRootEnum.Design]: '设计',
  [NavRootEnum.Movie]: '电影',
  [NavRootEnum.Music]: '音乐',
  [NavRootEnum.Reading]: '阅读',
  [NavRootEnum.Study]: '学习',
  [NavRootEnum.Other]: '其他',
}

// 1. AI
export enum NavAIEnum {
  Chat = 'AA',   // 聊天
  Text = 'AB',   // 写作
  Prompt = 'AC', // 提示词
  Image = 'AD',  // 绘画
  Design = 'AE', // 设计
  Video = 'AF', // 视频
  Audio = 'AG', // 音频
}

export const NavAiTree = {
  key: NavRootEnum.AI,
  title: 'AI',
  children: [
    { key: NavAIEnum.Chat, title: 'AI · 聊天' },
    { key: NavAIEnum.Text, title: 'AI · 写作' },
    { key: NavAIEnum.Prompt, title: 'AI · 提示词' },
    { key: NavAIEnum.Image, title: 'AI · 绘画' },
    { key: NavAIEnum.Design, title: 'AI · 设计 ｜ 图像处理' },
    { key: NavAIEnum.Video, title: 'AI · 视频' },
    { key: NavAIEnum.Audio, title: 'AI · 音频' },
  ]
}
// 2. 编程
export enum NavProgramEnum {
  Blog = 'BA',   // 博客
  Community = 'BB',   // 社区
  Service = 'BC',   // 服务
  Software = 'BD',   // 软件
  Tool = 'BE',   // 工具
  Study = 'BF',   // 学习
}

export const NavProgramTree = {
  key: NavRootEnum.Program,
  title: '编程',
  children: [
    { key: NavProgramEnum.Blog, title: '博客' },
    { key: NavProgramEnum.Community, title: '社区' },
    { key: NavProgramEnum.Service, title: '服务' },
    { key: NavProgramEnum.Software, title: '软件' },
    { key: NavProgramEnum.Tool, title: '工具' },
    { key: NavProgramEnum.Study, title: '学习' },
  ]
}

// 3. 设计
export enum NavDesignEnum {
  // 设计
  Design = 'CA',
  // 素材
  Image = 'CB',
  // 视频素材
  Video = 'CC',
  // 灵感
  Inspiration = 'CD',

  // 综合
  Other = 'CZ',
}
export const NavDesignTree = {
  key: NavRootEnum.Design,
  title: '设计',
  children: [
    { key: NavDesignEnum.Design, title: '设计' },
    { key: NavDesignEnum.Image, title: '素材' },
    { key: NavDesignEnum.Video, title: '视频素材' },
    { key: NavDesignEnum.Inspiration, title: '灵感' },
    { key: NavDesignEnum.Other, title: '综合' },
  ]
}


// 4. 电影
export enum NavMovieEnum {
  // 电影
  Movie = 'DA',
  // 影评
  Review = 'DB',
  // 预告片
  Trailer = 'DC',
  // 推荐
  Recommendation = 'DD',

  // 综合
  Other = 'DZ',
}

export const NavMovieTree = {
  key: NavRootEnum.Movie,
  title: '电影',
  children: [
    { key: NavMovieEnum.Movie, title: '电影' },
    { key: NavMovieEnum.Review, title: '影评' },
    { key: NavMovieEnum.Trailer, title: '预告片' },
    { key: NavMovieEnum.Recommendation, title: '推荐' },
    { key: NavMovieEnum.Other, title: '综合' },
  ]
}

// 5. 音乐
export enum NavMusicEnum {
  // 音乐
  Music = 'EA',
  // 歌单
  Playlist = 'EB',
  // 歌词
  Lyrics = 'EC',
  // 推荐
  Recommendation = 'ED',

  // 综合
  Other = 'EZ',
}

export const NavMusicTree = {
  key: NavRootEnum.Music,
  title: '音乐',
  children: [
    { key: NavMusicEnum.Music, title: '音乐' },
    { key: NavMusicEnum.Playlist, title: '歌单' },
    { key: NavMusicEnum.Lyrics, title: '歌词' },
    { key: NavMusicEnum.Recommendation, title: '推荐' },
    { key: NavMusicEnum.Other, title: '综合' },
  ]
}

// 6. 阅读
export enum NavReadingEnum {
  // 书籍
  Book = 'FA',
  // 杂志
  Magazine = 'FB',
  // 文章
  Article = 'FC',
  // 推荐
  Recommendation = 'FD',

  // 综合
  Other = 'FE',
}

export const NavReadingTree = {
  key: NavRootEnum.Reading,
  title: '阅读',
  children: [
    { key: NavReadingEnum.Book, title: '书籍' },
    { key: NavReadingEnum.Magazine, title: '杂志' },
    { key: NavReadingEnum.Article, title: '文章' },
    { key: NavReadingEnum.Recommendation, title: '推荐' },
    { key: NavReadingEnum.Other, title: '综合' },
  ]
}


// 其他
export enum NavOtherEnum {
  // 其他
  Other = 'ZZ',
}
export const NavOtherTree = {
  key: NavRootEnum.Other,
  title: '其他',
  children: [
    { key: NavOtherEnum.Other, title: '其他' },
  ]
}

// 导航目录树
// 禁止修改key，否则会导致用户数据丢失
export const NavRootTree = [
  NavAiTree,
  NavProgramTree,
  NavDesignTree,
  NavMovieTree,
  NavMusicTree,
  NavReadingTree,
  NavOtherTree,
]


export enum SearchEngineEnum {
  Baidu = 'baidu',
  Google = 'google',
  Bing = 'bing',
  DuckDuckGo = 'duckduckgo',
  Sogou = 'sogou',
  GitHub = 'github',
  Zhihu = 'zhihu',
  Juejin = 'juejin',
  Segmentfault = 'segmentfault',
  CSDN = 'csdn',
  V2ex = 'v2ex',
  Weibo = 'weibo',
  Douban = 'douban',
  Tieba = 'tieba',
  Weixin = 'weixin',
  Bilibili = 'bilibili',
  Taobao = 'taobao',
  Jingdong = 'jingdong',
}


export class WebSite {
  id = '';
  title = '';
  iconSrc = '';
  iconBgColor = '';
  url = '';
  desc = '';
  hostname = '';
  type = '';
  constructor(opt: any) {
      this.init(opt);
  }
  init(opt: any) {
    this.id = opt.id || '';
    this.title = opt.title || '';
    this.desc = opt.desc || '';
    this.iconSrc = opt.iconSrc || '';
    this.iconBgColor = opt.iconBgColor || '';
    this.hostname = opt.hostname || '';
    this.type = opt.type || '';
    this.url = opt.url || '';
  }
}

export class Pin {
  id = '';
  userId = '';
  name = '';
  markIds: string[] = [];
  static build(item: Pin) {
      return new Pin(item);
  }
  constructor(opt: any) {
      this.init(opt);
  }
  init (opt: any) {
    this.id = opt.id || '';
    this.userId = opt.userId || '';
    this.name = opt.name || '';
    this.markIds = opt.markIds || [];
  }
}