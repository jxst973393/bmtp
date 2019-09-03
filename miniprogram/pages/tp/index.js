const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
const regeneratorRuntime = require('../../utils/runtime')
const app = getApp()

Page({
  data: {
    isSearch: false,
    searchVal: '',
    slideData:'',
    p: 1,    //分页请求
    totalpage: null,    //总页数
    isloading: true,    //是否显示加载动画
    csnrr: [],    //数据
    // competitorList: [{
    //   "number": "001",
    //   name: '就看大家了',
    // }],
    slideData1: ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565343848654&di=bb26f6e0c2c2cde80f9288ae3364ee0a&imgtype=0&src=http%3A%2F%2Fwww.bauhinia.org%2Findex.php%2Fthumbnail%2Fassets%2Fimages%2Fimage%2Fcover-20160921.jpg%3Fw%3D500%26h%3D400", "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565344683335&di=7478131f0032012bec43a3f00c017752&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170427%2Fcd54220bd4634a198d1c2efddf01dd1a.gif",],
    // competitorList: [{
    //   "number": "001",
    //   name: '就看大家了',
    //   ballot: 999,
    //   image: 'http://dev.guotu.zsylife.cn/minidata/index01.png',
    //   isVote: false
    // }, {
    //   "number": "001",
    //   name: 'changchang的昵称',
    //   ballot: 999,
    //   image: 'http://dev.guotu.zsylife.cn/minidata/index02.png',
    //   isVote: false
    // }, {
    //   "number": "001",
    //   name: 'changchang的昵称',
    //   ballot: 999,
    //   image: 'http://dev.guotu.zsylife.cn/minidata/index03.png',
    //   isVote: false
    // }, {
    //   "number": "001",
    //   name: 'changchang的昵称',
    //   ballot: 999,
    //   image: 'http://dev.guotu.zsylife.cn/minidata/index01.png',
    //   isVote: false
    // },],
    countDown: {
      h: "72",
      m: "60",
      s: "72",
    }
  },
  onLoad() {
    this.xk();
    // wx.setNavigationBarColor({
    //   frontColor: '#ffffff',
    //   backgroundColor: '#757575',
    // });
    // const that = this

    // WXAPI.tpxq({
    //   id:13
    // }).then(function(res){
    //   console.log(res,'res1')
    //   that.setData({
    //     competitorList:res.data.voteItems
    //   })
    // })
    // WXAPI.tpjl({
    //   voteId: 13,
    //   token: wx.getStorageSync('token')
    // }).then(function(res){
    //   console.log(res.data,'tpjl')
    // })
    // WXAPI.tpcs({
    //   voteId:13
    // }).then(function(res){
    //   console.log(res.data,'recs')
    //   if (res.code === 700) {
    //     slideData:200
    //   }else{
    //     that.setData({
    //       slideData: res.data.result.length
    //     })
    //   }
      
    //   console.log(that.data.slideData,'slideData')
    // })
    // WXAPI.yuyueteam({
    //   yuyueId: 174,
    //   // pageSize:300
    //   pageSize: 10,
    //   page: this.data.p
    // }).then(function (res) {

    //   var newsArr = that.data.csnrr;
    //   for (var i = 0; i < res.data.result.length; i++) {
    //     newsArr.push(res.data.result[i])
    //     console.log(res.data.result[i], 'i')
    //   }
    //   that.setData({
    //     csnrr: newsArr,
    //     isloading: true,
    //     totalpage: res.data.totalPage
    //   })
    //   // var i = 0
    //   // for (i in res.data.result) {
    //   //   console.log(res.data.result[i].extJson['头像'], 'title')
    //   //   if (res.data.result[i].teamName === that.data.competitorList[i].title) {

    //   //     var newsArr = that.data.csnrr;
    //   //     for (var i = 0; i < res.data.result.length; i++) {
    //   //       newsArr.push(res.data.result[i])
    //   //       console.log(res.data.result[i],)
    //   //     }
    //   //     that.setData({
    //   //       csnrr: newsArr,
    //   //       isloading: true,
    //   //       totalpage: res.data.totalPage
    //   //     })
    //   //     // that.setData({
    //   //     //   csnr: res.data.result[i].extJson['参赛内容'],
    //   //     //   csnr1: res.data.result[i].extJson['头像'],
    //   //     //   csnrr:res.data.result
    //   //     // })
    //   //   }
    //   // }
    //   console.log(res.data.result, 'yuyueId')
    // })
  },
  xk:function (e) {
    const that = this

    WXAPI.tpxq({
      id: 13
    }).then(function (res) {
      console.log(res, 'res1')
      that.setData({
        competitorList: res.data.voteItems
      })
    })
    WXAPI.tpjl({
      voteId: 13,
      token: wx.getStorageSync('token')
    }).then(function (res) {
      console.log(res.data, 'tpjl')
    })
    WXAPI.tpcs({
      voteId: 13
    }).then(function (res) {
      console.log(res.data, 'recs')
      if (res.code === 700) {
        slideData: 200
      } else {
        that.setData({
          slideData: res.data.result.length
        })
      }

      console.log(that.data.slideData, 'slideData')
    })
    WXAPI.yuyueteam({
      yuyueId: 174,
      pageSize: 10,
      page: this.data.p
    }).then(function (res) {

      var newsArr = that.data.csnrr;
      for (var i = 0; i < res.data.result.length; i++) {
        newsArr.push(res.data.result[i])
      }
      that.setData({
        csnrr: newsArr,
        isloading: true,
        totalpage: res.data.totalPage
      })
      // var i = 0
      // for (i in res.data.result) {
      //   console.log(res.data.result[i].extJson['头像'], 'title')
      //   if (res.data.result[i].teamName === that.data.competitorList[i].title) {

      //     var newsArr = that.data.csnrr;
      //     for (var i = 0; i < res.data.result.length; i++) {
      //       newsArr.push(res.data.result[i])
      //       console.log(res.data.result[i],)
      //     }
      //     that.setData({
      //       csnrr: newsArr,
      //       isloading: true,
      //       totalpage: res.data.totalPage
      //     })
      //     // that.setData({
      //     //   csnr: res.data.result[i].extJson['参赛内容'],
      //     //   csnr1: res.data.result[i].extJson['头像'],
      //     //   csnrr:res.data.result
      //     // })
      //   }
      // }
      console.log(res.data.result, 'yuyueId')
    })
  },
  onReady: function () {
    // const that = this

    // WXAPI.tpxq({
    //   id: 13
    // }).then(function (res) {
    //   console.log(res.data, 'res')
    //   that.setData({
    //     competitorList: res.data.voteItems
    //   })
    // })
    // // console.log(that.data.competitorList,'voteItems')
    // WXAPI.yuyueteam({
    //   yuyueId: 174,
    //   pageSize:300,
    //   page: this.data.p
    // }).then(function (res) {
    //   var i = 0
    //   for (i in res.data.result) {
    //     console.log(res.data.result[i].extJson['头像'],'title')
    //     if (res.data.result[i].teamName === that.data.competitorList[i].title) {
    //       var newsArr = that.data.tx;
    //       for (var i = 0; i < res.data.result.length; i++) {
    //         newsArr.push(res.data.result[i])
    //       }
    //       that.setData({
    //         tx: newsArr,
    //         isloading: true,
    //         totalpage: res.data.totalPage
    //       })
    //       that.setData({
    //         csnr: res.data.result[i].extJson['参赛内容'],
    //         csnr1: res.data.result[i].extJson['头像'],
    //         csnrr: res.data.result
    //       })
    //     }
    //   }
    //   console.log(res.data.result[i].extJson['头像'], 'yuyueId')
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
  // toggleSearch() {
  //   const that = this;
  //   this.setData({
  //     isSearch: !that.data.isSearch
  //   });
  // },
  vote(e) {
    let dataset = e.currentTarget.dataset;
    console.log(dataset.index.voteNum,'vote');
    WXAPI.tpdw({
      voteId:13,
      items: dataset.index.id,
      token: wx.getStorageSync('token')
    }).then(function(res){
      console.log(res,'re')
      if (res.code == 10000){
        wx.showModal({
          title: "无需重复投票",
          content: "无需重复投票",
        })
      }
    })
    if (dataset.index.voteNum) {
      wx.showToast({
        title: '你已经为TA投过票了！',
        icon: 'none'
      })
      return
    }
    // let list = this.data.competitorList;
    // list[dataset.index].isVote = true;
    // this.setData({
    //   competitorList: list
    // }, function () {
    //   wx.showModal({
    //     title: '恭喜您',
    //     content: '给TA投票成功！',
    //     showCancel: false,
    //     confirmText: '好的'
    //   })
    // });
  },
  toMain:function(e) {
    console.log(e.currentTarget.dataset.item,'vot')
    console.log(app.globalData.param5,'vote2')
    app.globalData.param3 = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../main/main',
    })
  },
  toMain1:function(e) {
    console.log(e.currentTarget.dataset.item, 'vot1')
    app.globalData.param6 = e.currentTarget.dataset.item.id
    app.globalData.param5 = e.currentTarget.dataset.item.extJson['序号']
   
  },
  // activityIntr() {
  //   wx.showModal({
  //     title: '活动介绍',
  //     content: '本次投票是由.....对于 GET 方法的数据，会将数据转换成 query string（encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）对于 POST 方法lication/ json 的数据，会对数据进行 JSON 序列化对于 POST 方法且 headon/ x - www - form - urlencoded 的数据，会将数据转换成 query string （encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）',
  //     showCancel: false
  //   })
  // },

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
  onPullDownRefresh: function () {
    // this.xk();
    wx.showLoading({
      title: "刷新中",
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
    wx.stopPullDownRefresh();

  },
  searchInput(e) {
    this.setData({
      searchVal: e.detail.value
    });
  }
})
