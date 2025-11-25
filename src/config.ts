import iconBing from './static/imgs/icon-bing.svg';
import iconBaidu from './static/imgs/icon-baidu.svg'
import iconGoogle from './static/imgs/icon-google.svg'
import iconZhihu from './static/imgs/icon-zhihu.png'
import iconDuckDuckGo from './static/imgs/icon-duckduckgo.svg'
import iconSougou from './static/imgs/icon-sougou.svg'
import iconJuejin from './static/imgs/icon-juejin.svg'
import iconGithub from './static/imgs/icon-github.svg'
import iconSegmentFault from './static/imgs/icon-segmentfault.svg';
import iconWeibo from './static/imgs/icon-weibo.svg';
import iconBilibili from './static/imgs/icon-bilibili.svg';

import { SearchEngineEnum, SearchWebSite } from '@/interface';

// 自动切换 的搜索引擎
export const WEB_SITES_DEFAULT = [
    new SearchWebSite({
        name: 'baidu',
        searchEngineEnum: SearchEngineEnum.Baidu,
        url: 'https://www.baidu.com/s?word=',
        icon: iconBaidu,
        cnName: '百度',
    }),
    new SearchWebSite({
        name: 'google',
        searchEngineEnum: SearchEngineEnum.Google,
        url: 'https://www.google.com/search?q=',
        cnName: '谷歌',
        icon: iconGoogle,
    }),
    new SearchWebSite({
        name: 'bing',
        searchEngineEnum: SearchEngineEnum.Bing,
        url: 'https://cn.bing.com/search?q=',
        cnName: '必应',
        icon: iconBing,
    }),
    new SearchWebSite({
        name: 'zhihu',
        searchEngineEnum: SearchEngineEnum.Zhihu,
        url: 'https://www.zhihu.com/search?q=',
        cnName: '知乎',
        icon: iconZhihu,
    }),
    // SearchEngineEnum.DuckDuckGo,
    new SearchWebSite({
        name: SearchEngineEnum.DuckDuckGo,
        searchEngineEnum: SearchEngineEnum.DuckDuckGo,
        url: 'https://duckduckgo.com/?q=',
        cnName: 'duckduckgo',
        icon: iconDuckDuckGo,
    }),
    // SearchEngineEnum.Sogou,
    new SearchWebSite({
        name: SearchEngineEnum.Sogou,
        searchEngineEnum: SearchEngineEnum.Sogou,
        url: 'https://www.sogou.com/web?query=',
        cnName: '搜狗',
        icon: iconSougou,
    }),
    // SearchEngineEnum.GitHub,
    new SearchWebSite({
        name: SearchEngineEnum.GitHub,
        searchEngineEnum: SearchEngineEnum.GitHub,
        url: '',
        cnName: 'GitHub',
        icon: iconGithub,
    }),
    // SearchEngineEnum.Juejin,
    new SearchWebSite({
        name: SearchEngineEnum.Juejin,
        searchEngineEnum: SearchEngineEnum.Juejin,
        url: '',
        cnName: '掘金',
        icon: iconJuejin
    }),
    // SearchEngineEnum.segmentfault,
    new SearchWebSite({
        name: SearchEngineEnum.Segmentfault,
        searchEngineEnum: SearchEngineEnum.Segmentfault,
        url: '',
        cnName: 'SegmentFault',
        icon: iconSegmentFault,
    }),
    // SearchEngineEnum.weibo,
    new SearchWebSite({
        name: SearchEngineEnum.Weibo,
        searchEngineEnum: SearchEngineEnum.Weibo,
        url: '',
        cnName: '微博',
        icon: iconWeibo,
    }),
    // SearchEngineEnum.bilibili,
    new SearchWebSite({
        name: SearchEngineEnum.Bilibili,
        searchEngineEnum: SearchEngineEnum.Bilibili,
        url: '',
        cnName: '哔哩哔哩',
        icon: iconBilibili,
    }),
    // SearchEngineEnum.jingdong,
    new SearchWebSite({
        name: SearchEngineEnum.Jingdong,
        searchEngineEnum: SearchEngineEnum.Jingdong,
        url: '',
        cnName: '京东',
        icon: 'https://cdn.pastecuts.cn/web-icons/fa548381-6162-4f85-9038-4861f4b450e2.svg',
        iconColor: '#ff0000',
    }),
    // SearchEngineEnum.taobao,
    new SearchWebSite({
        name: SearchEngineEnum.Taobao,
        searchEngineEnum: SearchEngineEnum.Taobao,
        url: '',
        cnName: '淘宝',
        icon: 'https://cdn.pastecuts.cn/web-icons/595d-1678540733558.svg',
        iconColor: '#eb6f2d',
    }),
    // SearchEngineEnum.douban,
    // new SearchWebSite({
    //     name: SearchEngineEnum.Douban,
    //     searchEngineEnum: SearchEngineEnum.Douban,
    //     url: '',
    //     cnName: '豆瓣',
    // }),
]
