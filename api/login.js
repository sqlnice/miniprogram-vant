import request from '../utils/network';

export function onLogin(data) {
  return request({
    method: 'post',
    url: '/WX/Account/OnLogin',
    data,
    header: false
  })
}