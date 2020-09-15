//app.js
import {
  onLogin
} from './api/login'
App({
  onLaunch: function () {
    //检查更新
    this.update_vision()
    //微信登录
    this.wxLogin()
  },
  //登录
  wxLogin() {
    return new Promise((resolve, reject) => {
      // 判断是否已授权
      wx.getSetting({
        success: res => {
          const status = res.authSetting['scope.userInfo']
          if (status) {
            wx.login({
              success: res => {
                // 发送code，没有注册过，调用userInfoRole获取用户信息，注册过就直接取
                const code = res.code
                if (!code) return
                //登录接口，用code换消息
                onLogin({
                  "code": code
                }).then((res) => {
                  //console.log('res',res)
                  const userInfo = res.data.data
                  wx.setStorageSync('token', userInfo.token);
                  resolve(res.data)
                }).catch((error) => {
                  reject(error)
                })
              }
            })
          } else {
            //console.log('未授权')
          }
        }
      })
    })
  },
  //检测更新版本
  update_vision: function () {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      //console.log(res.hasUpdate)
    });
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showLoading({
        title: '新的版本下载失败',
      })
    })
  },
  globalData: {
    userType: null,
  }
})