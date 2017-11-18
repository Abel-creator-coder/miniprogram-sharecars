// pages/post-find-car/post-find-car.js
const util = require('../../utils/util.js')

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopToast: false,
    username: '',
    usersex: 1,
    sex: '男',
    userphone: '',
    from_place: '',
    to_place: '',
    date: util.formatTime(0, 'yyyy-MM-dd'),
    time: '',
    defaultCountOfPassagers: 0,
    countOfPassagers: ['请选择乘车人数', '1', '2', '3', '4', '5', '6'],
    from_place: '',
    to_place: '',
    note: '',
    submitDisabled: true,
    checked:false,
    editId:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var id = wx.getStorageSync('openid'),
          me = this;
      if (id) {
        //   me.setData({
        //       editId: id
        //   });
          app.mag.request('/findcar/getcar', 'GET',{ openid: id }, function (res) {
              if (res.data.code) {
                  me.setData({
                      date: util.formatTime(res.data.result.start_time, 'yyyy-MM-dd'),
                      time: util.formatTime(res.data.result.start_time, 'hh:mm'),
                      from_place: res.data.result.from_place,
                      to_place: res.data.result.to_place,
                      note: res.data.result.note,
                      defaultCountOfPassagers: parseInt(res.data.result.user_count)
                  });
                  me.formatUserinfo(res.data.result.name, res.data.result.sex, res.data.result.phone);
              } else {
                  app.mag.alert(res.data.msg);
              }
          });
      }
    //   me.loadUserInfo();
  },
  formatUserinfo: function (_uname, _usex, _uphone) {
      var _ushowname = '';
      if (_usex == 1) {
          _ushowname = _uname.substring(0, 1) + '先生';
      } else if (_usex == 2) {
          _ushowname = _uname.substring(0, 1) + '女士';
      }
      this.setData({
          usershowname: _ushowname,
          username: _uname,
          usersex: _usex,
          userphone: _uphone
      });
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
  countOfPassagersChange: function (event) {
    this.setData({
      defaultCountOfPassagers: event.detail.value
    })
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
  onNote: function (e) {
    this.setData({
      note: e.detail.value
    });
  },
  checkboxChange: function (e) {
    if (e.detail.value[0] == "checked") {
      this.setData({ submitDisabled: false });
    } else {
      this.setData({ submitDisabled: true });
    }
  },
  goStatement: function () {
    wx.navigateTo({
      url: '../statement/statement'
    })
  },
  postNow: function () {
      var me = this;
      if (!me.data.username) {
          app.mag.alert('联系人姓名不能为空');
          return;
      }
      if (!me.data.userphone) {
          app.mag.alert('联系人电话不能为空');
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
      if (parseInt(me.data.defaultCountOfPassagers) == 0) {
          app.mag.alert('乘车人数不能为空');
          return;
      }
      var params = {
          openid: wx.getStorageSync('openid'),
          name: me.data.username,
          phone: me.data.userphone,
          sex: me.data.usersex == 1 ? 1 : 2,
          from_place: me.data.from_place,
          to_place: me.data.to_place,
          start_time: me.data.date + ' ' + me.data.time,
          user_count: me.data.countOfPassagers[me.data.defaultCountOfPassagers],
          note: me.data.note,
          'type': 1,
          paySource: 1 // 1:小程序
      };
      app.mag.request('/findcar/createcar', 'POST',params, function (res) {
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