import { isHttp } from '@/utils';
import axios from 'axios';
import { isEncode, pkgVersion } from '../../config/defaultSettings';

const apiPrefix = `/api/v${pkgVersion}`;
const headers = { 'Content-Type': 'application/json;charset=UTF-8' };
const request = axios.create({
  baseURL: '',
  timeout: 100000,
  headers,
  withCredentials: true,
});
// 请求拦截器
request.interceptors.request.use(
  async (options) => {
    const url = isHttp(options.url) ? options.url : apiPrefix + options.url;
    console.log('url: ', url);
    const tokenID = sessionStorage.getItem('tokenID') ?? '';
    options.headers['x-sys-sessionid'] = tokenID;
    console.log('isEncode', isEncode, APP_VERSION);
    console.log('options: ', options);
    return {
      ...options,
      url,
    };
  },
  // 错误处理
  (error) => Promise.reject(error),
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    console.log('response: ', response);
    return response;
  },
  // 错误处理
  (error) => {
    console.log('error: ', error);
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

export default request;
