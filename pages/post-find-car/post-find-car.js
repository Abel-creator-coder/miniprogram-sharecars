// pages/post-find-car/post-find-car.js
const util = require('../../utils/util.js')

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopToast: true,
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
    checked:false
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