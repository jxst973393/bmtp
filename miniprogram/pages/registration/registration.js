// pages/registration/registration.js
const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')

const regeneratorRuntime = require('../../utils/runtime')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    p: 1,    //分页请求
    totalpage: null,    //总页数
    isloading: true,    //是否显示加载动画
    tx: [],    //数据
    inputShowed: false,
    showHomeButton: false,//是否显示返回首页
    show: true,//是否显示导航
    fixed: true,
    touchStartY: 0,//触摸开始的Y坐标
    toggleBarShow: false,
  },

  xinxi: function (e) {
    console.log(e.currentTarget.dataset.item.id, 'e')
    getApp().globalData.param = e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '../userxinxi/userxinxi',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    // this.success();
    var self = this;
    this.xk();
    this.cq();
    console.log(wx.getStorageSync('token'))

    // WXAPI.yuyueid({
    //   token: wx.getStorageSync('token')
    // }).then(res  => {
    //   this.setData({
    //     id:res.data.result[0].id,
    //     userid: res.data.result[0].uid,
    //     tx: res.data.userMap[res.data.result[0].uid].avatarUrl
    //   })
    //   console.log(this.data.tx,'res.data.userMap')
    //   WXAPI.yuyuexq({
    //     joinId: this.data.id,
    //     token: wx.getStorageSync('token')
    //   }).then(res => {
    //     this.setData({
    //       baoming: res.data
    //     })
    //     console.log(res.data, 'res')
    //   })
    // })

  },

  cq: function (e) {
    // WXAPI.yuyuedw().then(res => {
    //   if (res.code === 0) {
    //     this.setData({
    //       baoming: res.data.result
    //     })
    //     console.log(res.data.result,'00')
    //   }
    //   console.log(this.data.baoming.extJo, 'goodsRecommend')
    // })
    console.log(this.data.id, 'id')
    // WXAPI.yuyuexq({
    //   joinId:this.data.id,
    //   token: wx.getStorageSync('token')
    // }).then(function(res){
    //   console.log(res,'res')
    // })
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

  xk: function () {
    // wx.request({
    //   url: 'https://user.api.it120.cc/login/key',
    //   method: 'post',
    //   data: {
    //     merchantKey: 'c78b11c192c318dd7e25bf5e76370dcd',
    //     merchantNo: 1907180549008131
    //   },
    //   header: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   success: (request) => {
    //     // resolve(request.data)
    //     let data = request.data
    //     if (data.code === 0) {

    //       this.success(data)
    //     }
    //     console.log(this.data.data, 'request.data')

    //   },
    //   fail(error) {
    //     reject(error)
    //   },
    //   complete(aaa) {

    //     // 加载完成
    //   }
    // })
    console.log(this.data.p, 'this[')
    const that = this
    WXAPI.yuyueteam({
      yuyueId: 174,
      pageSize: 10,
      page: this.data.p
      // yuyueId: 175
    }).then(function (res) {
      console.log(res.data, 're')
      // that.setData({
      //   tx: res.data.result,
      // })

      var newsArr = that.data.tx;
      for (var i = 0; i < res.data.result.length; i++) {
        newsArr.push(res.data.result[i])
      }
      that.setData({
        tx: newsArr,
        isloading: true,
        totalpage: res.data.totalPage
      })


      // console.log(res.data.result,'results')
      // var i = 0 
      // for (i in res.data.userMap){
      //   console.log(i,'i')
      //   that.setData({
      //     tx: res.data.result,
      //   })
      // }

    })
    // WXAPI.yuyueteam({
    //   yuyueId: 151
    // }).then(function (res) {
    //   console.log(res.data.result, 'res')
    //   WXAPI.yuyueteamdy({
    //     teamId: res.data.result[0].id,
    //     token: wx.getStorageSync('token')
    //   }).then(function (res) {
    //     // that.setData({
    //     //   tp: res.data,
    //     //   // txid: request.data.data.result
    //     // })
    //     console.log(res.data, 'rre')
    //   })
    //   WXAPI.yuyueteams({
    //     teamId: res.data.result[0].id
    //   }).then(function (res) {
    //     console.log(res.data, 'res')
    //     that.setData({
    //       tp: res.data
    //     })
    //   })
    // })
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
    console.log(this.data.xtoken.data, 'xt')
    wx.request({
      url: 'https://user.api.it120.cc/user/yuyueJoin/list',
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Token': this.data.xtoken.data
      },
      success: (request) => {
        var i = 0
        var that = this;
        WXAPI.userDetail(wx.getStorageSync('token')).then(function (res) {
          if (res.code == 0) {
            let _data = {}
            _data.apiUserInfoMap = res.data
          }
        })
        for (i in request.data.data.userMap) {
          console.log(i, 'i')
          this.setData({
            tx: request.data.data.userMap,
            // txid: request.data.data.result
          })

          console.log(request.data.data.userMap, 'txid')
          // let data = this.data.txid
          //   this.success1(data)


          // console.log(request.data.data,'baom')
        }
        // for (b in request.data.data.result){
        //   this.setData({
        //     // tx: request.data.data.userMap,
        //     txid: request.data.data.result[b]
        //   })
        // }
        // console.log(this.data.txid, 'txi1d')
        //   let data = this.data.txid
        //     this.success1(data)

        console.log(request.data.data.result, 'request.data11')

      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
    })

  },
  getCityDatas1() {
    let txid = wx.getStorage({
      key: 'txid',
      success: (res) => {
        this.setData({
          txid: res.data,
        })
      },
    })
  },

  success1(data) {

    wx.setStorage({
      key: 'txid',
      data,
    })
    this.setData({
      txid: data,
    })
    console.log(this.data.txid, 'xt1')

    var i = 0
    for (i in this.data.txid) {
      console.log(this.data.txid[i].id, 'io')
      wx.request({
        url: 'https://user.api.it120.cc/user/yuyueJoin/info',
        method: 'get',
        data: {
          id: this.data.txid[i].id
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Token': this.data.xtoken.data
        },
        success: (request) => {
          // var self = this;

          // var promise1 = request;


          // Promise.all([promise1]).then(function (values) {
          //   console.log(values['0'].data.data.extJson,'values');
          //   self.setData({
          //     tp: values['0'].data.data.extJson,
          //     tp1: values['0'].data.data.extJson
          //   })
          // });
          var i = {}
          // console.log(request,'iqoo')
          // this.setData({
          //     tp: request.data.data.extJson,
          //   })
          // for (i in request){
          //       console.log(i,'iqoop')
          //     }

          // for (i in request ){
          //   console.log(request[i],'iqoo')
          //   this.setData({
          //     tp: request[i].data.extJson,
          //   })
          // console.log(this.data.tp, 'request.datad5')

          // }

          // this.setData({
          //   tp: request.data.data.extJson,
          // })
          // console.log(request.data.data, 'request.datad5')

        },
        fail(error) {
          reject(error)
        },
        complete(aaa) {
          // 加载完成


          // var that = this
          //  that.setData({
          //   tp: aaa.data.data.extJson,
          // })
          console.log(aaa, 'aaa')
        }
      })

    }

    // wx.request({
    //   url: 'https://user.api.it120.cc/user/yuyueJoin/info',
    //   method: 'get',
    //   data:{
    //     id: this.data.txid.id
    //   },
    //   header: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'X-Token': this.data.xtoken.data
    //   },
    //   success: (request) => {

    //     this.setData({
    //       tp: request.data.data.extJson,
    //     })
    //     console.log(request.data.data, 'request.datad5')

    //   },
    //   fail(error) {
    //     reject(error)
    //   },
    //   complete(aaa) {
    //     // 加载完成
    //   }
    // })


    //   wx.setStorage({
    //     key: 'txid',
    //     data,
    //   })
    //   this.setData({
    //     txid: data,
    //   })
    // console.log(this.data.txid.id,'iqoo')
    // var ccc = this.data.txid.id

    //   return new Promise((resolve, reject) => {
    //     wx.request({
    //   url: 'https://user.api.it120.cc/user/yuyueJoin/info',
    //   method: 'get',
    //   data:{
    //     id: this.data.txid.id
    //   },
    //   header: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'X-Token': this.data.xtoken.data
    //   },
    //   success: (request) => {

    //     this.setData({
    //       tp: request.data,
    //     })
    //     console.log(request.data, 'request.data5')

    //   },
    //   fail(error) {
    //     reject(error)
    //   },
    //   complete(aaa) {
    //     // 加载完成
    //   }
    // })
    //   })

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
    wx.showNavigationBarLoading();    //在当前页面显示导航条加载动画
    this.onLoad();    //刷新页面
    setTimeout(function () {
      wx.hideNavigationBarLoading();    //在当前页面隐藏导航条加载动画
      wx.stopPullDownRefresh();    //停止下拉动作
    }, 2000)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '正在加载',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)

    var p = this.data.p;
    console.log(this.data.totalpage, 'totalpage')
    var totalpage = this.data.totalpage + 1;
    p++;
    if (p > totalpage) {
      // return;
      wx.showLoading({
        title: '加载完毕',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
      return;
    }
    this.setData({
      isloading: true,
      p: p,
      totalpage: totalpage
    })
    this.xk();
    console.log(this.data.p, 'thisp')
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})