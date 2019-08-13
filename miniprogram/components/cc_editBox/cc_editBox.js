// components/cc_editorBox/cc_editorBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      type: String,
      value: '请输入...'
    },
    userInput:{
      type:String,
      value:''
    },
    maxlength:{
      type:String,
      value:"-1"
    },
    mark:{
      type:String,
      value:''
    }
  },
  data: {
    isShow:false
  },
  ready(){
  },
  methods: {
    toggle: function () {
      this.setData({
        isShow: !this.data.isShow
      });
    },
    changeValue: function (e) {
      let that = this;
      if (e.detail.value.textarea != '') {
        this.setData({
          userInput: e.detail.value.textarea
        });
        that.toggle();
        that.triggerEvent('saveData', { mark: that.data.mark, value: that.data.userInput });
      }
      else {
        wx.showToast({
          title: '请输入留言',
          icon: 'none',
          duration: 1000
        });
      }

    },
    clear: function () {
      this.setData({
        userInput: ''
      })
    },
    setValue(val){
      this.setData({
        userInput:val
      })
      this.toggle();
    },
    cancelSlide(){
      return
    }
  }
})
