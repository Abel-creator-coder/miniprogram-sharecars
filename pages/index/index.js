//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bannerTitle: "《拼车免责声明》",
    bannerImgSrc:"/images/banner.jpg",
    currentType: 0,
    list: [{
      istop: true,
      type: 1,
      user_count: 2,
      daytype: 1,
      from_place: "张家口",
      to_place: "北京",
      startday: "2017-09-06",
      start_time: "09:35",
      mid_place: "阳原",
      car: "大众",
      note: "不可以吸烟",
      sex: 1,
      name: "李占强",
      phone: "18131359269",
      id: 123
    },
    {
      istop: true,
      type: 1,
      user_count: 2,
      daytype: 1,
      from_place: "张家口",
      to_place: "北京",
      startday: "2017-09-06",
      start_time: "09:35",
      mid_place: "阳原",
      car: "大众",
      note: "不可以吸烟",
      sex: 1,
      name: "李占强",
      phone: "18131359269",
      id: 124
    }]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  refreshList: function (event) {
  },
  makeCall: function (event) {
    var id = event.currentTarget.id,
      list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        let phone = list[i].phone;
        wx.showModal({
          title: '提示',
          content: '确定拨打电话：' + phone,
          cancelColor: '#26B83E',
          confirmText: '立即拨打',
          confirmColor: '#26B83E',
          success: function (res) {
            if (res.confirm) {
              wx.makePhoneCall({
                phoneNumber: "18131359269",
                success: function (res) {
                  console.log(res, 'phone call success');
                },
                fail: function () {
                  console.log('phone call fail');
                }
              })
            }
          }
        })
      }
    }
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  tapBroadcastTitle: function () {
    wx.navigateTo({
      url: './statement/statement'
    })
  },
  goUserPost: function () {
    wx.navigateTo({
      url: '../my-posted/my-posted'
    })
  },
  goFindCar: function () {
    wx.navigateTo({
      url: '../post-find-car/post-find-car'
    })
  },
  goFindPeople: function () {
    wx.navigateTo({
      url: '../post-find-people/post-find-people'
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
