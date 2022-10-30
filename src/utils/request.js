import axios from 'axios';
// import { Message, MessageBox } from 'element-ui';
import merge from 'lodash/merge';
import qs from 'qs';
import { getToken } from './auth';
import dayjs from 'dayjs';

// create an axios instance
const service = axios.create({
  // baseURL: 'https://api.open.crossevery.com', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000 * 60 * 10, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    if (getToken()) {
      // config.headers['token'] = getToken() // 请求头带上token
      config.url =
        config.url +
        (config.url.indexOf('?') >= 0 ? '&' : '?' + 'token=' + getToken() + '&_t=' + dayjs().valueOf()); // 连接带上token
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    if (res.code && res.code !== 200) {
      // 401:非法的token;
      if (res.code === 401 || res.code === 501 || res.code === 502) {
        return Promise.reject('error');
      }
      if ((res.code === 500 || res.code === -1) && res.msg) {
        return Promise.reject(res.msg);
      }
      return response.data;
    } else {
      return response.data;
    }
  },
  (error) => {
    console.log('err' + error); // for debug
    if (error.response && error.response.status === 401) {
      const res = error.response.data;
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  },
);

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefaultParams 是否开启默认参数?
 */
service.adornParams = (params = {}, openDefaultParams = true) => {
  const defaults = {
    _t: new Date().getTime(),
  };
  return openDefaultParams ? merge(defaults, params) : params;
};

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefaultData 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
service.adornData = (data = {}, openDefaultData = true, contentType = 'json') => {
  const defaults = {
    t: new Date().getTime(),
  };
  data = openDefaultData ? merge(defaults, data) : data;
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data);
};

export default service;
