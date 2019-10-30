// 请求服务器host
const host = 'http://m.maoyan.com';

/**
 * 发送网络请求
 * @param method            HTTP 请求方法
 * @param url               URL
 * @param bodyParams        HTTP Body
 * @param urlParams         URL Params
 */
export default async function(method, url, {bodyParams = {}, urlParams = {}}) {
  // 将url参数写入URL
  let urlParStr = '';
  const urlParArr = Object.keys(urlParams);
  if (urlParArr.length) {
    urlParArr.forEach(element => {
      urlParStr += `${element}=${urlParams[element]}&`;
    });
    urlParStr = `?${urlParStr}`.slice(0, -1); //去除最后&符号
  }

  const res = await fetch(`${host}${url}${urlParStr}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: method === ('GET' || 'HEAD') ? null : JSON.stringify(bodyParams),
  });
  if (res.status < 200 || res.status > 299) {
    console.log(`出错啦：${res.status}`);
  } else {
    return res.json();
  }
}
