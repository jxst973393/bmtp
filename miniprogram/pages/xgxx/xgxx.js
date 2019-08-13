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

    multiIndex: [0, 0, 0],
    date: '2016-09-01',
    time: '12:01',
    region: ['河南省', '洛阳市', '西工区'],
    customItem: '全部'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {




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
  showTopTips: function (e) {
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
      // extJsonStr['参赛内容'] = nr,
      // extJsonStr['队伍职务'] = dwzw,
      // extJsonStr['地区'] = region,
      extJsonStr['头像'] = this.data.tempFilePaths,


        console.log(that.data.tempFilePaths,'number')

    WXAPI.dwxg({
      joinId: this.data.teamid,
      token: wx.getStorageSync('token'),
      extJsonStr: JSON.stringify(extJsonStr),
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
        } if (res.code == 700) {
          wx.showModal({
            title: '您非团队队长',
            content: '只有团队创建者才能修改',
          })
        } else {
          const token = wx.getStorageSync('token');
          if (token) {
            WXAPI.scoreSign(token).then(function (res) {
              // console.log(res.data.base.mobile, 'res')
            })
          }
          console.log(res,'code')
          wx.showModal({
            title: '修改成功',
            content: '修改成功',
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



    // let apiResult
    // if (that.data.id) {
    //   apiResult = WXAPI.yuyuebm({
    //     yuyueId: 149,
    //     extJsonStr:{
    //       name: name,
    //       age: age
    //     }

    //   })
    // }



    // wx.showModal({
    //   title: '报名成功',
    //   content: '报名成功',
    //   success(res) {
    //     if (res.confirm) {
    //       wx.navigateBack({
    //         delta: 1
    //       })
    //     } else if (res.cancel) {
    //       wx.navigateBack({
    //         delta: 1
    //       })
    //     }
    //   }
    // })
  },
  xgtx: function (e) {
    var that = this
    wx.chooseImage({
      count: 1,// 默认9
      sizeType: ['original', 'compressed'],// 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'],// 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths, 'tempFilePaths')
        that.setData({
          tempFilePaths: tempFilePaths
        })
        //这里是上传操作
        // wx.uploadFile({
        //   url: getApp().globalData.clientUrl + '/uploadAvatarUrl', //里面填写你的上传图片服务器API接口的路径 
        //   filePath: tempFilePaths[0],//要上传文件资源的路径 String类型 
        //   name: 'avatar',//按个人情况修改，文件对应的 key,开发者在服务器端通过这个 key 可以获取到文件二进制内容，(后台接口规定的关于图片的请求参数)
        //   header: {
        //     "Content-Type": "multipart/form-data"//记得设置
        //   },
        //   formData: {
        //     //和服务器约定的token, 一般也可以放在header中
        //     'session_token': wx.getStorageSync('session_token')
        //   },
        //   success: function (res) {
        //     //当调用uploadFile成功之后，再次调用后台修改的操作，这样才真正做了修改头像
        //     if (res.statusCode = 200) {
        //       // var data = res.data
        //       // var statusCode = res.statusCode
        //       // console.log("返回值1" + data);
        //       // console.log("返回值2" + statusCode)
        //       //这里调用后台的修改操作， tempFilePaths[0],是上面uploadFile上传成功，然后赋值到修改这里。
        //       wx.request({
        //         url: getApp().globalData.clientUrl + '/update?avatar=' + tempFilePaths[0], //真正修改操作,填写你们修改的API
        //         header: {
        //           'content-type': 'application/json',
        //         },
        //         method: 'POST',
        //         success: function (res) {
        //           if (res.data.code == 200) {
        //             wx.showToast({
        //               title: '修改成功',
        //               icon: 'success',
        //               duration: 2500
        //             })

        //             //wx.uploadFile自已有一个this，我们刚才上面定义的var _this = this 把this带进来
        //             _this.setData({
        //               "user.avatar": tempFilePaths[0]
        //             });
        //           }
        //         },
        //       })
        //     }
        //   }
        // })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      teamid: getApp().globalData.param4
    })
    console.log(this.data.teamid,'te')
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
    var that = this
    WXAPI.yuyueteams({
      teamId:this.data.teamid,
      token: wx.getStorageSync('token')
    }).then(function(res){
      console.log(res.data.extJson['姓名'],'res.data')
      that.setData({
        teambh:res.data.extJson,
        dwmc: res.data.joinInfo.teamName
      })
    })
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