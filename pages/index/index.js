//index.js
//获取应用实例
const util = require('../../utils/util.js')

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
    list:[],
    // list: [{
    //   istop: true,
    //   type: 1,
    //   user_count: 2,
    //   daytype: 1,
    //   from_place: "张家口",
    //   to_place: "北京",
    //   startday: "2017-09-06",
    //   start_time: "09:35",
    //   mid_place: "阳原",
    //   car: "大众",
    //   note: "不可以吸烟",
    //   sex: 1,
    //   name: "李占强",
    //   phone: "18131359269",
    //   id: 123
    // },
    // {
    //   istop: true,
    //   type: 1,
    //   user_count: 2,
    //   daytype: 1,
    //   from_place: "张家口",
    //   to_place: "北京",
    //   startday: "2017-09-06",
    //   start_time: "09:35",
    //   mid_place: "阳原",
    //   car: "大众",
    //   note: "不可以吸烟",
    //   sex: 1,
    //   name: "李占强",
    //   phone: "18131359269",
    //   id: 124
    // }],
    filterOptions:{},
    loading:false,
    loaded:false,
    currentp:1
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
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
      this.requestFirstPageList({
          type: this.data.currentType
      });
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
  refreshList: function (event) {
      this.setData({
          filterOptions: {}
      });
      this.requestFirstPageList({
          type: event.currentTarget.dataset.type
      });
  },
  requestFirstPageList: function (options) {
      var me = this;
      if (!me.data.loading) {
          wx.showToast({
              title: '加载中...',
              icon: 'loading',
              duration: 10000
          });
          me.setData({
              loading: true
          });
          options.page = 1;
          app.mag.request('/post/myposts','GET', options, function (res) {
              var newlist = [];
              if (res.data.code && res.data.data.length) {
                  wx.hideToast();
                  newlist = res.data.data;
                  for (var item in newlist) {
                      // 今天 明天 数据处理
                      newlist[item].daytype = util.getDayType(newlist[item].start_time);
                      newlist[item].start_time = util.formatTime(newlist[item].start_time);
                    //   newlist[item].postdate = util.formatTime(newlist[item].postdate);
                  }
                  me.setData({
                      list: newlist
                  });
              } else {
                  wx.showToast({
                      title: '没有更多了~',
                      icon: 'success',
                      duration: 1000
                  });
              }
              me.setData({
                  loading: false,
                  loaded: false,
                  currentp: 1,
                  currentType: parseInt(options.type)
              });
              wx.stopPullDownRefresh()
          });
      }
  },
  onReachBottom: function () {
      var me = this;
      if (me.data.loaded) {
          wx.showToast({
              title: '没有更多了~',
              icon: 'success',
              duration: 1000
          });
          return;
      }
      if (!me.data.loading) {
          wx.showToast({
              title: '加载中...',
              icon: 'loading',
              duration: 10000
          });
          me.setData({
              loading: true
          });
          var page = me.data.currentp;
          me.setData({ currentp:page++});
          me.data.filterOptions.page = me.data.currentp;
          me.data.filterOptions.type = me.data.currentType;
          app.mag.request('/post/myposts', 'GET',me.data.filterOptions, function (res) {
              var list = me.data.list,
                  newlist = [];
              if (res.data.code && res.data.data.length) {
                  wx.hideToast();
                  newlist = res.data.data;
                  for (var item in newlist) {
                      // 今天 明天 数据处理
                      newlist[item].daytype = app.mag.getDayType(newlist[item].start_time);
                      newlist[item].start_time = app.mag.formatTime(newlist[item].start_time);
                    //   newlist[item].postdate = app.mag.formatTime(newlist[item].postdate);
                  }
                  for (var i = 0; i < newlist.length; i++) {
                      list.push(newlist[i]);
                  }
                  me.setData({
                      list: list,
                      loading: false
                  });
              } else {
                  me.setData({
                      loading: false,
                      loaded: true
                  });
                  wx.showToast({
                      title: '没有更多了~',
                      icon: 'success',
                      duration: 1000
                  });
              }
          });
      }
  },
  onPullDownRefresh: function () {
      this.requestFirstPageList({
          type: this.data.currentType
      });
  }
})
