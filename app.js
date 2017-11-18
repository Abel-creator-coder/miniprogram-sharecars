//app.js
const util = require('/utils/util.js');

App({
  onLaunch: function () {
      var self = this;
    //   wx.checkSession({
    //       success: function () {
    //           console.log("登录状态未过期");
    //           try {
    //               var value = wx.getStorageSync('token');
    //               if (value) {
    //                   console.log(value, "token存在且未过期");
    //               }
    //               else{
    //                   throw "token不存在";
    //               }
    //           } catch (e) {
    //               self.login();
    //           }
    //       },
    //       fail: function () {
    //           //登录态过期
    //           // 登录
    //           self.login();
    //       }
    //   })
      self.login();      
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  login: function () {
      var self = this;
      wx.login({
          success: function (res) {
              if (res.code) {
                  console.log(res, "wx.login");
                  wx.request({
                      url: 'https://example/user/login',
                      header: {
                          'content-type': 'application/x-www-form-urlencoded',
                          'Authorization': 'Basic bXlfYXBwOm15X3NlY3JldA=='
                      },
                      method: 'POST',
                      data: {
                          'grant_type': 'password',
                          'username': res.code,
                          'password': 'azar'
                      },
                      success: function (res) {
                          console.log(res.data, "user/login");
                          wx.setStorageSync('token', res.data.access_token);
                          wx.setStorageSync('openid', res.data.openid);
                      }
                  })
              } else {
                  console.log('获取用户登录态失败！' + res.errMsg)
              }
          },
          fail: function () {
              console.log("wx.login网络错误");
          }
      });
  },
  mag: {
      apiHost: 'https://example',
      'token': wx.getStorageSync('token'),
      request: function (url, method, data, suc, fail) {
          var me = this;
          wx.request({
              url: me.apiHost + url,
              data: data,
              header: {
                  'content-type': 'application/x-www-form-urlencoded',
                  'Authorization': 'Bearer ' + wx.getStorageSync('token')
              },
              method: method || 'GET',
              success: function (res) {
                  if (suc) {
                      suc(res);
                  }
              },
              fail: function (res) {
                  if (fail) {
                      fail(res);
                  }
              }
          });
      },
      alert: function (msg) {
          wx.showModal({
              title: '提示',
              content: msg,
              success: function (res) {
              }
          });
      },
      toast: function (msg) {
          wx.showToast({
              title: msg,
              icon: 'success',
              duration: 1000
          });
      },
      loading: function (msg, duration) {
          if (!duration) {
              duration = 2000;
          }
          wx.showToast({
              title: msg,
              icon: 'loading',
              duration: duration
          });
      }
  },
  globalData: {
    userInfo: null
  }
})