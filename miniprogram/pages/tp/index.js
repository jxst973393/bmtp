const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
const regeneratorRuntime = require('../../utils/runtime')
const app = getApp()

Page({
  data: {
    isSearch: false,
    searchVal: '',
    slideData:'',
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
    // wx.setNavigationBarColor({
    //   frontColor: '#ffffff',
    //   backgroundColor: '#757575',
    // });
    const that = this

    WXAPI.tpxq({
      id:9
    }).then(function(res){
      console.log(res,'res')
      that.setData({
        competitorList:res.data.voteItems
      })
    })
    WXAPI.tpjl({
      voteId:10,
      token: wx.getStorageSync('token')
    }).then(function(res){
      console.log(res.data,'tpjl')
    })
    WXAPI.tpcs({
      voteId:10
    }).then(function(res){
      console.log(res.data.result.length,'recs')
      that.setData({
        slideData: res.data
      })
      console.log(slideData,'slideData')
    })
  },
  onReady() {
    const that = this

    WXAPI.tpxq({
      id: 10
    }).then(function (res) {
      console.log(res.data, 'res')
      that.setData({
        competitorList: res.data.voteItems
      })
    })
    // console.log(that.data.competitorList,'voteItems')
    WXAPI.yuyueteam({
      yuyueId: 174
    }).then(function (res) {
      var i = 0
      for (i in res.data.result) {
        if (res.data.result[i].teamName == that.data.competitorList[i].title) {
          that.setData({
            csnr: res.data.result[i].extJson['参赛内容'],
            csnr1: res.data.result[i].extJson['头像']
          })
        }
      }
      console.log(that.data.csnr1, 'yuyueId')
    })
  }
  ,
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
    console.log(dataset.index.voteNum);
    WXAPI.tpdw({
      voteId:10,
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
    console.log(e.currentTarget.dataset.item)
    app.globalData.param3 = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../main/main',
    })
  },
  // activityIntr() {
  //   wx.showModal({
  //     title: '活动介绍',
  //     content: '本次投票是由.....对于 GET 方法的数据，会将数据转换成 query string（encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）对于 POST 方法lication/ json 的数据，会对数据进行 JSON 序列化对于 POST 方法且 headon/ x - www - form - urlencoded 的数据，会将数据转换成 query string （encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）',
  //     showCancel: false
  //   })
  // },
  searchInput(e) {
    this.setData({
      searchVal: e.detail.value
    });
  }
})
