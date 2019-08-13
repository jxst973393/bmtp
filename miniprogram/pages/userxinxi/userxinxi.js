// pages/userxinxi/userxinxi.js
const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
const regeneratorRuntime = require('../../utils/runtime')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamid:'',
    inputShowed: false,
    showHomeButton: false,//是否显示返回首页
    show: true,//是否显示导航
    fixed: true,
    touchStartY: 0,//触摸开始的Y坐标
    toggleBarShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      teamid: getApp().globalData.param
    })
    this.teamcx();
    console.log(getApp().globalData.param, 'rr')

  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({

    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });

    console.log(e.detail.value, "valr")
  },

  teamcx:function(e){

    console.log(this.data.teamid,'teamid')
    WXAPI.yuyueteams({
      teamId:this.data.teamid,
      token: wx.getStorageSync('token'),
    }).then(function(res){
        that.setData({
          competitorList: res.data,
          csnr1: res.data.extJson['头像']
        })
      console.log(res.data.extJson['头像'],'competitorList')
    })
   
    var that = this
    WXAPI.yuyueteamdy({
      teamId: this.data.teamid,
      token: wx.getStorageSync('token'),
    }).then(function (res) {
      that.setData({
        tx: res.data.userMap,
      })

      console.log(res.data.userMap, 'res.data.userMap')
      
      
      // console.log(res.data, 'rtt')
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      teamid: getApp().globalData.param
    })
    this.teamcx();
    console.log(getApp().globalData.param, 'rr')
  },
  jiaru:function(e){
    // console.log(this.data.teamid, 'e')
    // getApp().globalData.param2 = this.data.teamid,
    // wx.navigateTo({
    //   url: '../userbm/userbm',
    // })
    WXAPI.yuyuebm({
      yuyueId: 174,
      // yuyueId: 175,
      token: wx.getStorageSync('token'),
      teamId: this.data.teamid
    }).then(function (res) {
      console.log(res.code, 'res')
      let data = res.code
      if (data === 30000) {
        wx.showModal({
          title: '报名失败',
          content: '报名失败，您可能没有授权',
        })
        wx.navigateTo({
          url: "/pages/authorize/index"
        })
      } else {
        const token = wx.getStorageSync('token');
        if (token) {
          WXAPI.scoreSign(token).then(function (res) {
            // console.log(res.data.base.mobile, 'res')
          })
        }
        wx.showModal({
          title: '报名成功',
          content: '报名成功',
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            } else if (res.cancel) {
              wx.navigateBack({
                delta: 1
              })

            }
          }
        })
      }
    })
  },
  xgxx:function(e) {
    console.log(this.data.teamid,'teamid')
    getApp().globalData.param4 = this.data.teamid,
    wx.navigateTo({
      url: '../xgxx/xgxx',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.teamcx();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.teamcx();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.teamcx();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.teamcx();
    wx.showLoading({
      title: "刷新中",
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
    wx.stopPullDownRefresh();
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
    return {
      title: '"' + wx.getStorageSync('mallName') + '" ' + CONFIG.shareProfile,
      path: '/pages/userxinxi/userxinxi?inviter_id=' + wx.getStorageSync('uid')
    }
  }
})