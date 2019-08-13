const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
const HTAPI = require('../../wxapi/ht')

const regeneratorRuntime = require('../../utils/runtime')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideData: ["http://dev.guotu.zsylife.cn/minidata/index01.png", "http://dev.guotu.zsylife.cn/minidata/index01.png", "http://dev.guotu.zsylife.cn/minidata/index01.png", "http://dev.guotu.zsylife.cn/minidata/index01.png"],
    messageData: [{
      avatar: 'http://dev.guotu.zsylife.cn/minidata/index01.png',
      name: '小葱',
      time: '4月27日',
      comment: '希望你能得到好票数~！'
    }, {
      avatar: 'http://dev.guotu.zsylife.cn/minidata/index01.png',
      name: '小葱',
      time: '4月27日',
      comment: '希望你能得到好票数~！'
    }],
    isVote: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    that.editBox = this.selectComponent("#editBox");
    that.setData({
      competitorList: getApp().globalData.param3
    })

    WXAPI.yuyueteam({
      yuyueId:174
    }).then(function(res){
      var i = 0 
      console.log(res.data.result[0], 'sss')

      for (i in res.data.result) {
        if (res.data.result[i].teamName == getApp().globalData.param3.title){
          that.setData({
            csnr: res.data.result[i].extJson['参赛内容'],
            csnr1: res.data.result[i].extJson['头像']
          })
        }
      }
      console.log(res.data,'yuyueId')
    })
    console.log(that.data.competitorList, 'competitorList')
    console.log(that.data.csnr,'csnr')
  },
  vote(e) {
    let dataset = e.currentTarget.dataset;
    console.log(this.data.competitorList.id);
    WXAPI.tpdw({
      voteId: 10,
      items: this.data.competitorList.id,
      token: wx.getStorageSync('token')
    }).then(function (res) {
      console.log(res, 're')
      if (res.code == 10000) {
        wx.showModal({
          title: "无需重复投票",
          content: "无需重复投票",
        })
      }
    })
    if (this.data.competitorList.voteNum) {
      wx.showToast({
        title: '你已经投过票了！',
        icon: 'none'
      })
      return
    }
    this.setData({
      voteNum: true
    });
  },
  message() {
    this.editBox.toggle();
  },
  addMessage(e) {
    if (e.detail.value != '') {
      const that = this;
      let data = this.data.messageData;
      let comment = {
        avatar: app.globalData.userInfo.avatarUrl,
        name: app.globalData.userInfo.nickName,
        time: (new Date().getMonth()) + 1 + '月' + (new Date().getDate()) + '日',
        comment: e.detail.value
      }
      if (!comment.avatar || !comment.name) {
        wx.showModal({
          title: '警告',
          content: '你未授权登录，请先登录',
          showCancel: false,
          confirmText: '知道了'
        })
        return
      }
      data.unshift(comment);
      this.setData({
        messageData: data
      }, function () {
        that.editBox.clear();
        wx.showModal({
          title: '恭喜您',
          content: '留言成功，快去查看吧~！',
          showCancel: false,
          confirmText: '好的'
        });
      });

    }
  }
})