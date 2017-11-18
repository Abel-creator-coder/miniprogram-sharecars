// pages/post-find-people/post-find-people.js
const util = require('../../utils/util.js')

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopToast: true,
    paymoney: '2',
    username:'',
    sex: '男',
    usersex: '',
    userphone:'',
    from_place: '',
    to_place: '',
    mid_place: '',
    date: util.formatTime(0, 'yyyy-MM-dd'),
    time: '',
    defaultCountOfSeats: 0,
    countOfSeats: ['请选择空位', '1', '2', '3', '4', '5', '6'],
    car:'',
    note:'',
    submitDisabled: true,
    checked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  closeTopToast: function () {
    this.setData({
      showTopToast: false
    })
  },
  onNameInput: function (e) {
    this.setData({
      username: e.detail.value
    });
  },
  showSexActionSheet: function () {
    var me = this,
      itemList = ['男', '女'];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#333',
      success: function (res) {
        if (!res.cancel) {
          me.setData({
            sex: itemList[res.tapIndex],
            usersex: res.tapIndex + 1
          });
        }
      }
    })
  },
  onPhoneInput: function (e) {
    this.setData({
      userphone: e.detail.value
    });
  },
  onFromPlace: function (e) {
    this.setData({
      from_place: e.detail.value
    });
  },
  onToPlace: function (e) {
    this.setData({
      to_place: e.detail.value
    });
  },
  onMidPlace: function (e) {
    this.setData({
      mid_place: e.detail.value
    });
  },
  dateChange: function (event) {
    this.setData({
      date: event.detail.value
    })
  },
  timeChange: function (event) {
    this.setData({
      time: event.detail.value
    })
  },
  countOfSeatsChange: function (event) {
    this.setData({
      defaultCountOfSeats: event.detail.value
    })
  },
  onCar: function (e) {
    this.setData({
      car: e.detail.value
    });
  },
  onNote: function (e) {
    this.setData({
      note: e.detail.value
    });
  },
  goStatement: function () {
    wx.navigateTo({
      url: '../statement/statement'
    })
  },
  checkboxChange: function (e) {
    if (e.detail.value[0] == "checked") {
      this.setData({ submitDisabled: false });
    } else {
      this.setData({ submitDisabled: true });
    }
  },
  postNow: function () {
      var me = this;
      if (!me.data.username || !me.data.userphone) {
          app.mag.alert('联系人信息不能为空');
          return;
      }
      if (!me.data.from_place) {
          app.mag.alert('出发地不能为空');
          return;
      }
      if (!me.data.to_place) {
          app.mag.alert('目的地不能为空');
          return;
      }
      if (!me.data.date) {
          app.mag.alert('出发日期不能为空');
          return;
      }
      if (!me.data.time) {
          app.mag.alert('出发时间不能为空');
          return;
      }
      if (parseInt(me.data.defaultCountOfSeats) == 0) {
          app.mag.alert('空位不能为空');
          return;
      }
      var params = {
          openid: wx.getStorageSync('openid'),
          name: me.data.username,
          phone: me.data.userphone,
          sex: me.data.usersex == 1 ? 1 : 2,
          from_place: me.data.from_place,
          to_place: me.data.to_place,
          mid_place: me.data.mid_place,
          car: me.data.car,
          start_time: me.data.date + ' ' + me.data.time,
          user_count: me.data.countOfSeats[me.data.defaultCountOfSeats],
          note: me.data.note,
          'type': 2,
          paySource: 1 // 1:小程序
      };
      app.mag.request('/findpeople/createpeople', 'POST',params, function (res) {
          var data = res.data;
          if (data.code) {
              var need_pay = data.need_pay;
              if (need_pay) {
                  var pay_params = data.pay_params;
                  wx.requestPayment({
                      'timeStamp': pay_params.timeStamp + '',
                      'nonceStr': pay_params.noncestr,
                      'package': pay_params.package_,
                      'signType': 'MD5',
                      'paySign': pay_params.sign,
                      'success': function (res) {
                          if (res.errMsg == 'requestPayment:ok') {
                              //支付成功
                              //缓存中写入发布成功标注
                              wx.setStorage({
                                  key: "publish",
                                  data: 1
                              });
                              wx.showToast({
                                  title: '发布成功',
                                  icon: 'success',
                                  duration: 1000,
                                  success: function () {
                                      wx.navigateBack();
                                  }
                              });
                          }
                      }
                  });

              } else {
                  wx.setStorage({
                      key: "publish",
                      data: 1
                  });
                  wx.showToast({
                      title: '发布成功',
                      icon: 'success',
                      duration: 1000,
                      success: function () {
                          wx.navigateBack();
                      }
                  });
              }
          } else {
              app.mag.alert(data.msg);
          }
      });
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