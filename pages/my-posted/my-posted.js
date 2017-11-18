// pages/my-posted/my-posted.js
const app = getApp();
const util = require('../../utils/util.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        istop: true,
        type: 1,
        user_count: 2,
        expired: true,
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
        postdate: "2017-09-06 09:35",
        id: 123
      },
      {
        istop: false,
        type: 2,
        user_count: 3,
        expired: false,
        daytype: 2,
        from_place: "张家口",
        to_place: "北京",
        startday: "2017-09-06",
        start_time: "09:35",
        mid_place: "阳原",
        car: "大众",
        note: "不可以吸烟",
        sex: 2,
        name: "李占强",
        postdate: "2017-09-06 09:35",
        id: 123
      },
      {
        istop: true,
        type: 1,
        user_count: 2,
        expired: true,
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
        postdate: "2017-09-06 09:35",
        id: 123
      }
    ],
    loading:false,
    loaded:false,
    currentp:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestFirstPageList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },
  requestFirstPageList: function () {
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
          app.mag.request('/post/myposts', 'GET', { page: 1, openid: wx.getStorageSync('openid') }, function (res) {
              if (res.data.code && res.data.data.length) {
                  for (var item in res.data.data) {
                      // 今天 明天 数据处理
                      res.data.data[item].daytype = util.getDayType(res.data.data[item].start_time);
                      res.data.data[item].start_time = util.formatTime(res.data.data[item].start_time);
                    //   res.data.data[item].postdate = app.mag.formatTime(res.data.data[item].postdate);
                  }
                  me.setData({
                      list: res.data.data
                  });
              }
              wx.stopPullDownRefresh();
              wx.hideToast();
              me.setData({
                  loading: false,
                  loaded: false,
                  currentp: 1
              });
          });
      }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})