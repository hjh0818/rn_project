import XgHttp from './xgHttp.js';

export default {
  // 获取电影信息首页
  getMovieOnInfoList: urlPar =>
    XgHttp('GET', '/ajax/movieOnInfoList', {urlParams: urlPar}),
  // 获取更多电影信息首页
  getMoreComingList: urlPar =>
    XgHttp('GET', '/ajax/moreComingList', {urlParams: urlPar}),
  // 获取近期最受期待电影信息
  getMostExpectedList: urlPar =>
    XgHttp('GET', '/ajax/mostExpected', {urlParams: urlPar}),
  // 获取即将上映电影id信息
  getComingList: urlPar =>
    XgHttp('GET', '/ajax/comingList', {urlParams: urlPar}),
  // 获取更多受欢迎的电影
  getMostExpected: urlPar =>
    XgHttp('GET', '/ajax/mostExpected', {urlParams: urlPar}),
};
