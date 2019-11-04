import XgHttp from './xgHttp.js';

export default {
  // 获取电影信息首页
  getMovieOnInfoList: urlPar =>
    XgHttp('GET', '/ajax/movieOnInfoList', {urlParams: urlPar}),
  // 获取更多电影信息首页
  getMoreComingList: urlPar =>
    XgHttp('GET', '/ajax/moreComingList', {urlParams: urlPar}),
};
