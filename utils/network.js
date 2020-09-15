/**
 * Created sqlnice 2020-04
 * 基于Promise的网络请求库
 */
import {
  APP_BASEURL
} from '../config/appConfig';
const app = getApp();
/**
 * 接口请求基类方法
 */
const request = function (config) {
  const isHeader = config.header //是否携带token
  const headers = {} //头部
  headers['Content-Type'] = 'application/json'
  if (isHeader) {
    headers['Authorization'] = 'Bearer ' + wx.getStorageSync('token')
  }
  //Promise
  return new Promise((resolve, reject) => {
    const response = {};
    wx.request({
      method: config.method,
      url: `${APP_BASEURL}${config.url}`,
      data: config.data,
      header: headers,
      success: (res) => response.success = res.data,
      fail: (error) => response.fail = error,
      complete(res) {
        const code = res.statusCode
        //判断状态码
        switch (code) {
          case 200:
            //请求正常
            resolve(response.success)
            break;
          case 401:
            //登录过期
            app.wxLogin()
            reject(response.fail)
            break;
          case 500:
            //服务器错误
            wx.showToast({
              title: '服务器内部错误！',
              icon: 'none',
              duration: 2000
            })
            reject(response.fail)
            break;
          default:
            //其他状态码
            wx.showToast({
              title: `请求出错，请重试`,
              icon: 'none',
              duration: 2000
            })
            reject(response.fail)
        }
      }
    });
  });
}
export default request