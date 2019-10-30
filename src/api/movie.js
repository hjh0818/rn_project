import XgHttp from './xgHttp.js';

export default {
  // 获取电影信息首页
  getMovieOnInfoList: urlPar =>
    XgHttp('GET', '/ajax/movieOnInfoList', {urlParams: urlPar}),
};
