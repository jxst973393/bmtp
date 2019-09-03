// pages/Applicants/Applicants.js
const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
const regeneratorRuntime = require('../../utils/runtime')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    piclists: undefined,
    multiIndex: [0, 0, 0],
    date: '2016-09-01',
    time: '12:01',
    region: ['河南省', '洛阳市', '西工区'],
    customItem: '全部'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const token = wx.getStorageSync('token');
    if (token) {
      var that = this
      WXAPI.userDetail(token).then(function (res) {
        console.log(res.data.base.avatarUrl, 'res')
        that.setData({
          avatarUrl: res.data.base.avatarUrl
        })
      })
    }
    WXAPI.yuyueteam({
      yuyueId: 174
    }).then(function (res) {
      var ccc = Number(res.data.result.length) - Number('1')
      var ccc = Number(res.data.result[0].extJson['序号']) + Number(1)
      console.log(res.data.result[0].extJson['序号'], 'res')
      that.setData({
        teambh: res.data.result[0].extJson['序号'],
        bianhao: ccc
      })
    })
    console.log(that.data.bianhao,'bainhao')

  },
  // getPhoneNumber: function(e) {
  //   if (!e.detail.errMsg || e.detail.errMsg != "getPhoneNumber:ok") {
  //     wx.showModal({
  //       title: '提示',
  //       content: '无法获取手机号码:' + e.detail.errMsg,
  //       showCancel: false
  //     })
  //     return;
  //   }
  //   var that = this;
  //   WXAPI.bindMobile({
  //     token: wx.getStorageSync('token'),
  //     encryptedData: e.detail.encryptedData,
  //     iv: e.detail.iv
  //   }).then(function(res) {
  //     if (res.code === 10002) {
  //       app.goLoginPageTimeOut()
  //       return
  //     }
  //     if (res.code == 0) {
  //       wx.showToast({
  //         title: '绑定成功',
  //         icon: 'success',
  //         duration: 2000
  //       })
  //       // that.getUserApiInfo();
  //     } else {
  //       wx.showModal({
  //         title: '提示',
  //         content: '绑定失败',
  //         showCancel: false
  //       })
  //     }
  //   })
  // },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  showTopTips: function(e) {
    WXAPI.addTempleMsgFormid({
      token: wx.getStorageSync('token'),
      type: 'form',
      formId: e.detail.formId
    })
    console.log(e.detail.formId, 'formId')
    var that = this;
    var name = e.detail.value.name;
    var age = e.detail.value.age;
    var gender = e.detail.value.gender
    var nr = e.detail.value.nr
    var dw = e.detail.value.dw
    var dwzw = e.detail.value.dwzw
    var phone = e.detail.value.phone
    var region = this.data.region



    // console.log(name, 'name')
    const extJsonStr = {}
    extJsonStr['姓名'] = name,
      extJsonStr['性别'] = gender,
      extJsonStr['年龄'] = age,
      extJsonStr['参赛内容'] = nr,
      extJsonStr['队伍职务'] = dwzw,
      extJsonStr['地区'] = region,
      extJsonStr['序号'] = this.data.bianhao
      extJsonStr['头像'] = this.data.tempFilePaths,


        console.log(this.data.tempFilePaths,'number')
     

      WXAPI.yuyuebm({
        yuyueId: 174,
        // yuyueId: 175,
        token: wx.getStorageSync('token'),
        extJsonStr: JSON.stringify(extJsonStr),
      teamName:dw
      }).then(function(res) {
        console.log(res.code,'res')
        let data = res.code
        if (data === 30000 ) {
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
    console.log(wx.getStorageSync('token'), 'token')


   

      console.log(this.data.tempFilePaths, 'number')


  },
  uploadFileList() {
    wx.showLoading({
      title: '加载中',
    })
    WXAPI.uploadFileList().then(res => {
      wx.hideLoading()
      console.log(res)
      if (res.code == 0) {
        this.setData({
          piclists: res.data
        })
      }
    })
  },
  chooseImage:function(e) {
    const token = wx.getStorageSync('token');
    const _this = this;
    var that = this
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      count: 1, // 最多选择几张图片
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        WXAPI.uploadFile(token, res.tempFilePaths[0]).then(_res => {
          console.log(_res.data.url,'hero')
          _this.setData({
            tempFilePaths:_res.data.url
          })
          that.setData({
            tempFilePaths: _res.data.url
          })
          _this.uploadFileList()
        })
      }
    })
  },

  uploadFileFromUrl() {
    if (!this.data.url) {
      wx.showToast({
        title: '地址不能空',
        icon: 'none'
      })
      return
    }
    WXAPI.uploadFileFromUrl(this.data.url, '.png').then(res => {
      console.log(res, 'herr')
      this.setData({
        url: null
      })
      this.uploadFileList()
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const token = wx.getStorageSync('token');
    if (token) {
      var that = this
      WXAPI.userDetail(token).then(function (res) {
        console.log(res.data.base.avatarUrl, 'res')
        that.setData({
          avatarUrl: res.data.base.avatarUrl
        })
      })
    }
    WXAPI.yuyueteam({
      yuyueId: 174
    }).then(function (res) {
      var ccc = Number(res.data.result.length) - Number('1')
      var ccc = Number(res.data.result[0].extJson['序号']) + Number(1)
      console.log(res.data.result[0].extJson['序号'],'res')
      that.setData({
        teambh: res.data.result[0].extJson['序号'],
        bianhao: ccc
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.uploadFileList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})