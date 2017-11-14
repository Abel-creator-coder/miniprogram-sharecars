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