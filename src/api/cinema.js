import XgHttp from './xgHttp.js';

export default {
  // 获取影院信息首页
  getCinemaList: urlPar =>
    XgHttp('GET', '/ajax/cinemaList', {urlParams: urlPar}),
};
