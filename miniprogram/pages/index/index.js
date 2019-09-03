//index.js
const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
const HTAPI = require('../../wxapi/ht')

const regeneratorRuntime = require('../../utils/runtime')
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    imgUrls: [
      'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4031315063,3052203776&fm=26&gp=0.jpg',
      'http://lc-tk0l23h1.cn-n1.lcfile.com/7ab1b70150ee020835f6/未命名.png',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562494850394&di=ca0f852fe21d2015440ad00312f0c039&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F06%2F20180706134506_wujyc.jpg',
      'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=920618607,1797917132&fm=26&gp=0.jpg'
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    merchantKey: '',
    merchantNo: '',
  },

  onLoad: function () {

    // const token = wx.getStorageSync('token');
    // if (token) {
    //   WXAPI.userDetail(token).then(function (res) {
    //     console.log(res.data.base.mobile,'res')
    //   })
    // }

  this.xk();


    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // this.vido();

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })

  },
  
  xk:function() {
    wx.request({
      url: 'https://user.api.it120.cc/login/key',
      method: 'post',
      data: {
        merchantKey: 'c78b11c192c318dd7e25bf5e76370dcd',
        merchantNo: 1907180549008131
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (request) => {
        // resolve(request.data)
        let data = request.data
        if (data.code === 0) {
         
          this.success(data)
        }
        console.log(this.data.data, 'request.data')

      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  },

  getCityDatas() {
    let xtoken = wx.getStorage({
      key: 'xtoken',
      success: (res) => {
        this.setData({
          xtoken: res.data,
        })
      },
    })
  },
  success(data) {
   
    wx.setStorage({
      key: 'xtoken',
      data,
    })
    this.setData({
      xtoken: data,
    })
    // var that = this

    // console.log(this.data.xtoken.data,'123')

    // return new Promise(function (resolve, reject) {
    //   wx.request({
    //     url: 'https://user.api.it120.cc/user/yuyueInfo/save',
    //     method: 'post',
    //     // header:('Access-Control-Allow-Headers:x-requested-with,content-type,X-Token'),
    //     header: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //       'X-Token': 'adada342-30d4-4a83-9072-f5050cf4a9ad'
    //     },
    //     success: (request) => {
    //       // resolve(request.data)

    //       console.log(request, 'request.data')

    //     },
    //     fail(error) {
    //       reject(error)
    //     },
    //     complete(aaa) {
    //       // 加载完成
    //     }
    //   })
    // })
    
    // // HTAPI.baom().then(function(res){
    // //   console.log(res,'ress')
    // // })
   
    // console.log(this.data.xtoken,'rrr')
  },

  // add:function(){
  //   console.log(this.data.xtoken,'this.data.xtoken')
  //   HTAPI.baom({
  //     xtoken: this.data.xtoken
  //   }).then(function (res) {
  //     console.log(res, 'res')
  //   })
  // },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  vido: function (e) {
    // var _this = this
    // var url = 'https://v.qq.com/txp/iframe/player.html?vid=y0144szs2ip'
    // //通过正则表达式拿到分享地址中vid的值
    // if (url.includes("vid=")) {
    //   var vid = takeParam(url, "vid");

    // }
    // //此函数为获取url中指定参数的函数
    // function takeParam(url, key) {

    //   var a = url;
    //   var b = key;
    //   try {
    //     var reg = new RegExp(b + "=[0-9a-zA-z-_]{0,}");
    //     return reg.exec(a).toString().split("=")[1];
    //   } catch (e) {
    //     console.log(e);
    //     console.log("正则表达式取参数值错误" + key);
    //   }
    //   return "";
    // }

    // //通过以下接口拿到视频的详细参数 通过正则拼装成一个可以在小程序中使用的URl
    // wx.request({
    //   url: "https://vv.video.qq.com/getinfo?vid=" + vid + "&platform=101001&charge=0&otype=json",
    //   method: 'get',
    //   header: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {

    //     var dataJson = res.data.replace(/QZOutputJson=/, '') + "qwe";
    //     var dataJson1 = dataJson.replace(/;qwe/, '');
    //     var data = JSON.parse(dataJson1);
    //     var url = data.vl.vi[0].ul.ui[0].url
    //     var url2 = url.replace(/http/, "https"); //把'http'替换为https
    //     var fu = data.vl.vi[0].fn
    //     var fvkey = data.vl.vi[0].fvkey
    //     var a = url2 + fu + '?vkey=' + fvkey
    //     _this.setData({
    //       url: a
    //     })
    //     console.log(a)
    //   }
    // })
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  onReady: function () {
    
  },
  registration: function (e) {
    wx.navigateTo({
      url: '../registration/registration',
    })
  },
  csqy: function (e) {
    wx.navigateTo({
      url: '../csqy/csqy',
    })
  },

  Applicants: function (e) {
    
    wx.navigateTo({
      url: '../Applicants/Applicants',
    })
  },
  zyjz: function (e) {
    wx.navigateTo({
      url: '../zyjz/zyjz',
    })
  },

  onPullDownRefresh: function () {
    // this.vido();
    this.xk();
    wx.showLoading({
      title: "刷新中",
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
    wx.stopPullDownRefresh();

  },
  onShareAppMessage: function () {
    return {
      title: wx.getStorageSync('mallName') + '" ' + CONFIG.shareProfile,
      path: '/pages/index/index?inviter_id=' + wx.getStorageSync('uid')
    }
    const token = wx.getStorageSync('token');
    if (token) {
      WXAPI.scoreSign(token).then(function (res) {
        console.log(res.data, 'res')
      })
    }
  },
})
