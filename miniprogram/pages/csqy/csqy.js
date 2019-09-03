const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
const regeneratorRuntime = require('../../utils/runtime')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562580086396&di=aab81e9ef34eb8f160a1576200eb74cf&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3Df210772799504fc2a25fb00dd5dde7f0%2Fd5f5ab86c9177f3eba37072272cf3bc79f3d565f.jpg'
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.cmsxq();
  },

  cmsxq:function (e) {
    var that = this
    WXAPI.cmsxq({
      id: 15313
    }).then(function (res) {
      let richText = res.data.content;
      /* 去除富文本中的html标签 */
      /* *、+限定符都是贪婪的，因为它们会尽可能多的匹配文字，只有在它们的后面加上一个?就可以实现非贪婪或最小匹配。*/
      let content = richText.replace(/<.+?>/g, '');
      console.log(content);
      /* 去除  */
      content = content.replace(/ /ig, '');
      console.log(content);
      /* 去除空格 */
      content = content.replace(/\s/ig, '');
      console.log(content);
      that.setData({
        cmsxq: res.data,
        richText: content
      })
      
      console.log(res.data, 'res')
    })
  },

  bsxq:function (e) {
   wx.showModal({
     title: '暂无详情',
     content: '暂无详情',
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