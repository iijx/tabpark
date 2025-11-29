import { WebSite } from '@/interface';
import { Http } from './http';

export const http = new Http();
const needLoginUrl = {
  '/app/getUserAppInfo': false,
  '/user/getLoginCodeByEmail': false,
  '/user/loginByEmailCode': false,
}
export const ApiIsNeedLogin = (url: string) => {
  return Boolean(needLoginUrl[url as keyof typeof needLoginUrl]);
}

export const Api = {
  getUserAppInfo: () => {
    return http.get('/app/getUserAppInfo');
  },
  getLoginCodeByEmail: (email: string) => {
    return http.post('/user/getLoginCodeByEmail', {
      email,
    });
  },
  loginByEmailCode: (email: string, code: string) => {
    return http.post('/user/loginByEmailCode', {
      email,
      code,
    });
  },
  pinReq: {
    createPin: (params: any) => {
      return http.post('/pin/createPin', params);
    },
    updatePin: (params: any) => {
      return http.post('/pin/updatePin', params);
    },
    deletePin: (pinId: string) => {
      return http.post('/pin/deletePin', { id: pinId });
    },
    getPinList: (params: any) => {
      return http.get('/pin/getPinList', params);
    },
    getPinById: (params: any) => {
      return http.get('/pin/getPinById', params);
    },
  },
  markReq: {
    createMark: (pinId: string, webSiteId: string) => {
      return http.post('/mark/createMark', { pinId, webSiteId });
    },
    findAll: () => {
      return http.get('/mark/findAll');
    }
  },
  navReq: {
    findAll: () => {
      return http.get('/nav/findAll');
    },
  },
  webSiteReq: {
    findWebSiteByUrl: (url: string) => {
      return http.post('/website/findWebSiteByUrl', { url });
    },
    update: (id: string, params: any) => {
      return http.post('/website/update', { id, ...params });
    },
    findAll: () => {
      return http.get('/website/findAll');
    }
  },
  todoReq: {
    create: (params: any) => {
      return http.post('/todo/create', params);
    },
    delete: (params: any) => {
      return http.post('/todo/delete', params);
    },
    updateById: (params: any) => {
      return http.post('/todo/updateById', params);
    },
    findById: (params: any) => {
      return http.post('/todo/addOrUpdateAsId', params);
    },
    findAllByUserId: () => {
      return http.get('/todo/findAllByUserId');
    }
  }
}